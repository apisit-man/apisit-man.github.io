const SHEET_NAMES = {
  car: 'CarExpenses',
  personal: 'PersonalExpenses'
};

const DEFAULT_SPREADSHEET_ID = '1fDZ7-vJTw24meRWS1QrsA8cB4-rQveLOT2RPokZ37yM';

const HEADERS = [
  'id', 'date', 'entryType', 'category', 'amount', 'paymentMethod',
  'merchant', 'note', 'receiptUrl', 'odometer', 'liters',
  'pricePerLiter', 'createdAt'
];

function doGet() {
  return jsonResponse({ ok: true, service: 'expense-admin', message: 'Service is running' });
}

function doPost(event) {
  try {
    const body = JSON.parse((event.postData && event.postData.contents) || '{}');
    const action = String(body.action || '');

    if (action === 'login') return handleLogin(body.pin);
    if (action === 'verify') {
      requireSession(body.token);
      return jsonResponse({ ok: true });
    }

    requireSession(body.token);
    if (action === 'createExpense') return createExpense(body.expenseType, body.record || {});
    if (action === 'listExpenses') return listExpenses(body.expenseType, body.limit);
    if (action === 'deleteExpense') return deleteExpense(body.expenseType, body.id);
    return jsonResponse({ ok: false, message: 'ไม่รู้จักคำสั่งที่ส่งมา' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: error.message || 'เกิดข้อผิดพลาดที่ระบบจัดเก็บข้อมูล' });
  }
}

function handleLogin(pin) {
  const cache = CacheService.getScriptCache();
  const failures = Number(cache.get('login_failures') || 0);
  if (failures >= 10) throw new Error('มีการใส่รหัสผิดหลายครั้ง กรุณารอ 10 นาที');

  const expectedPin = PropertiesService.getScriptProperties().getProperty('ADMIN_PIN');
  if (!expectedPin) throw new Error('ยังไม่ได้ตั้งค่า ADMIN_PIN ใน Script Properties');
  if (String(pin || '') !== expectedPin) {
    cache.put('login_failures', String(failures + 1), 600);
    throw new Error('รหัส PIN ไม่ถูกต้อง');
  }

  cache.remove('login_failures');
  const token = Utilities.getUuid() + Utilities.getUuid();
  cache.put('session_' + token, 'authorized', 21600);
  return jsonResponse({ ok: true, token: token, expiresIn: 21600 });
}

function requireSession(token) {
  if (!token || CacheService.getScriptCache().get('session_' + token) !== 'authorized') {
    throw new Error('เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง');
  }
  CacheService.getScriptCache().put('session_' + token, 'authorized', 21600);
}

function createExpense(expenseType, record) {
  const sheet = getExpenseSheet(expenseType);
  const amount = Number(record.amount);
  if (!record.date || !record.category || !Number.isFinite(amount) || amount <= 0) {
    throw new Error('กรุณากรอกวันที่ หมวดหมู่ และจำนวนเงินให้ถูกต้อง');
  }

  const id = Utilities.getUuid();
  const receiptUrl = saveReceipt(record, id, expenseType);
  const row = [
    id,
    safeText(record.date, 40),
    expenseType === 'personal' && record.entryType === 'income' ? 'income' : 'expense',
    safeText(record.category, 100),
    amount,
    safeText(record.paymentMethod, 80),
    safeText(record.merchant, 120),
    safeText(record.note, 500),
    receiptUrl,
    safeNumber(record.odometer),
    safeNumber(record.liters),
    safeNumber(record.pricePerLiter),
    new Date().toISOString()
  ];
  sheet.appendRow(row);
  return jsonResponse({ ok: true, id: id });
}

function listExpenses(expenseType, requestedLimit) {
  const sheet = getExpenseSheet(expenseType);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: true, records: [] });

  const limit = Math.min(Math.max(Number(requestedLimit) || 100, 1), 500);
  const startRow = Math.max(2, lastRow - limit + 1);
  const values = sheet.getRange(startRow, 1, lastRow - startRow + 1, HEADERS.length).getValues();
  const records = values.reverse().map(row => {
    const item = {};
    HEADERS.forEach((header, index) => {
      const value = row[index];
      item[header] = value instanceof Date ? value.toISOString() : value;
    });
    return item;
  });
  return jsonResponse({ ok: true, records: records });
}

function deleteExpense(expenseType, id) {
  if (!id) throw new Error('ไม่พบรหัสรายการ');
  const sheet = getExpenseSheet(expenseType);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) throw new Error('ไม่พบรายการ');

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  const index = ids.findIndex(row => row[0] === String(id));
  if (index < 0) throw new Error('ไม่พบรายการที่ต้องการลบ');
  sheet.deleteRow(index + 2);
  return jsonResponse({ ok: true });
}

function getExpenseSheet(expenseType) {
  const name = SHEET_NAMES[expenseType];
  if (!name) throw new Error('ประเภทค่าใช้จ่ายไม่ถูกต้อง');
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getSpreadsheet() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID;
  if (id) return SpreadsheetApp.openById(id);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('กรุณาตั้งค่า SPREADSHEET_ID ใน Script Properties');
  return active;
}

function saveReceipt(record, id, expenseType) {
  if (!record.fileData || !record.filename || !record.mimeType) return '';
  const bytes = Utilities.base64Decode(record.fileData);
  if (bytes.length > 5 * 1024 * 1024) throw new Error('ไฟล์ใบเสร็จมีขนาดเกิน 5 MB');
  const safeName = String(record.filename).replace(/[^a-zA-Z0-9ก-๙._-]/g, '_').slice(-120);
  const blob = Utilities.newBlob(bytes, String(record.mimeType), expenseType + '_' + id + '_' + safeName);
  const folder = getReceiptFolder();
  return folder.createFile(blob).getUrl();
}

function getReceiptFolder() {
  const properties = PropertiesService.getScriptProperties();
  const configuredId = properties.getProperty('RECEIPT_FOLDER_ID');
  if (configuredId) return DriveApp.getFolderById(configuredId);
  const folder = DriveApp.createFolder('Expense Receipts');
  properties.setProperty('RECEIPT_FOLDER_ID', folder.getId());
  return folder;
}

function safeNumber(value) {
  if (value === '' || value === null || value === undefined) return '';
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : '';
}

function safeText(value, maxLength) {
  let text = String(value || '').trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupExpenseSheets() {
  getExpenseSheet('car');
  getExpenseSheet('personal');
  return 'สร้างตารางเรียบร้อยแล้ว';
}

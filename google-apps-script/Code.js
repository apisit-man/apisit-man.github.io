const SHEET_NAMES = {
  car: 'CarExpenses',
  personal: 'PersonalExpenses'
};

const SESSION_IDLE_SECONDS = 30 * 60;
const SESSION_ABSOLUTE_SECONDS = 6 * 60 * 60;
const FAILED_LOGIN_WINDOW_SECONDS = 10 * 60;
const MAX_FAILED_LOGINS = 10;
const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = {
  'image/png': true,
  'image/jpeg': true,
  'image/webp': true,
  'application/pdf': true
};

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
    if (action === 'logout') {
      revokeSession(body.token);
      return jsonResponse({ ok: true });
    }
    
    // Public Actions
    if (action === 'chatWithExpert') return handleChatWithExpert(body.message, body.history);

    // Protected Actions
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
  const expectedPin = PropertiesService.getScriptProperties().getProperty('ADMIN_PIN');
  if (!expectedPin) throw new Error('ยังไม่ได้ตั้งค่า ADMIN_PIN ใน Script Properties');

  const cache = CacheService.getScriptCache();
  if (!constantTimeEqual(String(pin || ''), expectedPin)) {
    const failures = Number(cache.get('login_failures') || 0);
    if (failures < MAX_FAILED_LOGINS) {
      cache.put('login_failures', String(failures + 1), FAILED_LOGIN_WINDOW_SECONDS);
    }
    if (failures + 1 >= MAX_FAILED_LOGINS) {
      throw new Error('มีการใส่รหัสผิดหลายครั้ง กรุณารอ 10 นาที');
    }
    throw new Error('รหัส PIN ไม่ถูกต้อง');
  }

  // A correct PIN always bypasses the failed-attempt lock. This prevents an
  // attacker from locking the real administrator out by submitting bad PINs.
  cache.remove('login_failures');
  const token = Utilities.getUuid() + Utilities.getUuid();
  const now = Date.now();
  cache.put(sessionKey(token), JSON.stringify({ createdAt: now, lastSeen: now }), SESSION_IDLE_SECONDS);
  return jsonResponse({
    ok: true,
    token: token,
    idleExpiresIn: SESSION_IDLE_SECONDS,
    absoluteExpiresIn: SESSION_ABSOLUTE_SECONDS
  });
}

function requireSession(token) {
  const cache = CacheService.getScriptCache();
  const key = sessionKey(token);
  const rawSession = key ? cache.get(key) : null;
  if (!rawSession) throw sessionExpiredError();

  let session;
  try {
    session = JSON.parse(rawSession);
  } catch (_error) {
    cache.remove(key);
    throw sessionExpiredError();
  }

  const now = Date.now();
  const absoluteAge = now - Number(session.createdAt || 0);
  const idleAge = now - Number(session.lastSeen || 0);
  if (
    absoluteAge < 0 ||
    absoluteAge >= SESSION_ABSOLUTE_SECONDS * 1000 ||
    idleAge < 0 ||
    idleAge >= SESSION_IDLE_SECONDS * 1000
  ) {
    cache.remove(key);
    throw sessionExpiredError();
  }

  session.lastSeen = now;
  const absoluteRemaining = Math.max(
    1,
    Math.floor((SESSION_ABSOLUTE_SECONDS * 1000 - absoluteAge) / 1000)
  );
  cache.put(key, JSON.stringify(session), Math.min(SESSION_IDLE_SECONDS, absoluteRemaining));
}

function revokeSession(token) {
  const key = sessionKey(token);
  if (key) CacheService.getScriptCache().remove(key);
}

function sessionKey(token) {
  const value = String(token || '');
  if (!/^[a-f0-9-]{72}$/i.test(value)) return '';
  return 'session_' + sha256Hex(value);
}

function sessionExpiredError() {
  return new Error('เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง');
}

function constantTimeEqual(left, right) {
  const leftDigest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, left, Utilities.Charset.UTF_8);
  const rightDigest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, right, Utilities.Charset.UTF_8);
  let difference = 0;
  for (let index = 0; index < leftDigest.length; index += 1) {
    difference |= leftDigest[index] ^ rightDigest[index];
  }
  return difference === 0;
}

function sha256Hex(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(byte => (byte + 256).toString(16).slice(-2))
    .join('');
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
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('กรุณาตั้งค่า SPREADSHEET_ID ใน Script Properties');
  return active;
}

function saveReceipt(record, id, expenseType) {
  if (!record.fileData || !record.filename || !record.mimeType) return '';
  const mimeType = String(record.mimeType).toLowerCase();
  if (!ALLOWED_RECEIPT_TYPES[mimeType]) throw new Error('ชนิดไฟล์ใบเสร็จไม่รองรับ');

  const encodedData = String(record.fileData);
  if (encodedData.length > Math.ceil(MAX_RECEIPT_BYTES / 3) * 4 + 4) {
    throw new Error('ไฟล์ใบเสร็จมีขนาดเกิน 5 MB');
  }

  let bytes;
  try {
    bytes = Utilities.base64Decode(encodedData);
  } catch (_error) {
    throw new Error('ข้อมูลไฟล์ใบเสร็จไม่ถูกต้อง');
  }
  if (bytes.length > MAX_RECEIPT_BYTES) throw new Error('ไฟล์ใบเสร็จมีขนาดเกิน 5 MB');
  const safeName = String(record.filename).replace(/[^a-zA-Z0-9ก-๙._-]/g, '_').slice(-120);
  const blob = Utilities.newBlob(bytes, mimeType, expenseType + '_' + id + '_' + safeName);
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

// ==========================================
// AI Chat Handler
// ==========================================
function handleChatWithExpert(message, history) {
  let apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) throw new Error('System error: GEMINI_API_KEY not configured. กรุณาตั้งค่า API Key ใน Script Properties');
  apiKey = apiKey.trim(); // Prevent newline issues

  // Use the most compatible and robust model (gemini-pro)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const systemPrompt = `คุณคือ "Prompt Design Expert" ผู้เชี่ยวชาญระดับโลกด้าน Prompt Engineering
หน้าที่ของคุณคือช่วยเหลือผู้ใช้ในการเขียน กำหนดโครงสร้าง และเกลาคำสั่ง (Prompt) เพื่อนำไปใช้งานกับ AI ให้ได้ผลลัพธ์ที่ดีที่สุด
ให้คำแนะนำสั้นๆ กระชับ เป็นมิตร และใช้ภาษาไทยเป็นหลัก
หากผู้ใช้ต้องการให้เกลา Prompt ให้คุณจัดโครงสร้างให้ชัดเจน (Role, Task, Context, Format) และใส่ใน Markdown code block เพื่อให้ก็อปปี้ง่าย`;

  // Remove system_instruction from root to prevent compatibility issues
  // Instead, inject it as the first context message
  const payload = {
    contents: [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'รับทราบครับ ผมพร้อมช่วยเหลือคุณในการออกแบบและเกลา Prompt แล้วครับ' }] }
    ]
  };

  if (history && Array.isArray(history)) {
    history.forEach(msg => {
      payload.contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });
  }

  payload.contents.push({
    role: 'user',
    parts: [{ text: message || 'สวัสดี' }]
  });

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseData = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200) {
    throw new Error(responseData.error?.message || 'Failed to communicate with AI');
  }

  if (!responseData.candidates || responseData.candidates.length === 0) {
    throw new Error('AI did not return a response');
  }

  const reply = responseData.candidates[0].content.parts[0].text;
  
  return jsonResponse({
    ok: true,
    reply: reply
  });
}

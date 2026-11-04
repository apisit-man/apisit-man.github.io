/**
 * Visitor Counter API - Google Apps Script Backend
 * สำหรับเก็บสถิติผู้เข้าชมเว็บไซต์ https://apisit-man.github.io
 * 
 * ฟังก์ชันหลัก:
 * - บันทึกและดึงข้อมูลยอดผู้เข้าชมรวม (Total Views) และยอดวันนี้ (Today Views)
 * - บันทึกประวัติสถิติรายวันลงชีต Daily_Stats อัตโนมัติ
 * - บันทึก Log การเข้าชมเบื้องต้นลงชีต Visits_Log (พร้อมระบุหน้า และ Referrer)
 * - รองรับทั้ง CORS Fetch JSON และ JSONP
 */

function doGet(e) {
  // รองรับ CORS
  var lock = LockService.getScriptLock();
  
  try {
    // ล็อคเพื่อป้องกัน race condition เมื่อมีคนเข้าชมพร้อมกัน
    lock.waitLock(10000); // รอได้สูงสุด 10 วินาที

    var params = e ? e.parameter : {};
    var action = (params.action || 'hit').toLowerCase(); // 'hit' (นับเพิ่ม) หรือ 'get' (อ่านอย่างเดียว)
    var page = (params.page || 'home').trim();
    var ref = (params.ref || '').trim();
    var ua = (e && e.contextPath) ? '' : (params.ua || '');
    var callback = params.callback || '';

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var now = new Date();
    var timeZone = 'Asia/Bangkok';
    var todayStr = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd');
    var timestampStr = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');

    // 1. ตรวจสอบหรือสร้างชีต Summary
    var summarySheet = getOrCreateSummarySheet(ss, todayStr, timestampStr);
    
    // อ่านค่าปัจจุบันจาก Summary Sheet
    // แถวที่ 2: Total_Views, แถวที่ 3: Today_Date, แถวที่ 4: Today_Views
    var currentTotal = Number(summarySheet.getRange('B2').getValue()) || 0;
    var rawDateVal = summarySheet.getRange('B3').getValue();
    var recordedDate = '';
    if (rawDateVal instanceof Date) {
      recordedDate = Utilities.formatDate(rawDateVal, timeZone, 'yyyy-MM-dd');
    } else {
      recordedDate = String(summarySheet.getRange('B3').getDisplayValue() || rawDateVal || '').trim();
    }
    var currentToday = Number(summarySheet.getRange('B4').getValue()) || 0;

    // ตรวจสอบการขึ้นวันใหม่
    if (recordedDate !== todayStr) {
      // บันทึกสถิติของวันที่ผ่านมาลง Daily_Stats ถ้ายังไม่มี
      if (recordedDate && currentToday > 0) {
        recordDailyStat(ss, recordedDate, currentToday);
      }
      // รีเซ็ตยอดวันนี้สำหรับวันใหม่
      currentToday = 0;
      recordedDate = todayStr;
      summarySheet.getRange('B3').setNumberFormat('@').setValue(todayStr);
      summarySheet.getRange('B4').setValue(0);
    }

    // 2. ประมวลผล Action
    if (action === 'hit') {
      currentTotal += 1;
      currentToday += 1;

      // บันทึกค่าใหม่ลง Summary
      summarySheet.getRange('B2').setValue(currentTotal);
      summarySheet.getRange('B4').setValue(currentToday);
      summarySheet.getRange('B5').setValue(timestampStr);

      // บันทึกลง Visits_Log
      recordVisitLog(ss, timestampStr, page, ref, ua);
      
      // อัปเดตชีต Daily_Stats ของวันปัจจุบันแบบเรียลไทม์
      updateCurrentDailyStat(ss, todayStr, currentToday);
    }

    var result = {
      ok: true,
      total: currentTotal,
      today: currentToday,
      date: todayStr,
      action: action,
      timestamp: timestampStr
    };

    return formatOutput(result, callback);

  } catch (err) {
    var errorResult = {
      ok: false,
      error: err.toString()
    };
    return formatOutput(errorResult, (e && e.parameter) ? e.parameter.callback : null);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Helper จัดเตรียมชีต Summary
 */
function getOrCreateSummarySheet(ss, todayStr, timestampStr) {
  var sheet = ss.getSheetByName('Summary');
  if (!sheet) {
    sheet = ss.insertSheet('Summary', 0);
    var initialData = [
      ['Metric', 'Value', 'Description'],
      ['Total_Views', 0, 'ยอดเข้าชมสะสมทั้งหมด'],
      ['Today_Date', todayStr, 'วันที่ปัจจุบัน'],
      ['Today_Views', 0, 'ยอดเข้าชมเฉพาะวันนี้'],
      ['Last_Updated', timestampStr, 'วันเวลาที่อัปเดตล่าสุด']
    ];
    sheet.getRange(1, 1, 5, 3).setValues(initialData);
    sheet.getRange('A1:C1').setFontWeight('bold').setBackground('#E2E8F0');
    sheet.setColumnWidth(1, 140);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(3, 220);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Helper บันทึกลง Daily_Stats
 */
function recordDailyStat(ss, dateStr, views) {
  var sheet = ss.getSheetByName('Daily_Stats');
  if (!sheet) {
    sheet = ss.insertSheet('Daily_Stats');
    sheet.appendRow(['วันที่ (Date)', 'ยอดเข้าชม (Views)']);
    sheet.getRange('A1:B1').setFontWeight('bold').setBackground('#E2E8F0');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([dateStr, views]);
}

/**
 * Helper อัปเดตยอดของวันปัจจุบันใน Daily_Stats
 */
function updateCurrentDailyStat(ss, todayStr, todayViews) {
  var sheet = ss.getSheetByName('Daily_Stats');
  if (!sheet) {
    sheet = ss.insertSheet('Daily_Stats');
    sheet.appendRow(['วันที่ (Date)', 'ยอดเข้าชม (Views)']);
    sheet.getRange('A1:B1').setFontWeight('bold').setBackground('#E2E8F0');
    sheet.setFrozenRows(1);
  }
  
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var rawLastVal = sheet.getRange(lastRow, 1).getValue();
    var lastDate = (rawLastVal instanceof Date)
      ? Utilities.formatDate(rawLastVal, 'Asia/Bangkok', 'yyyy-MM-dd')
      : String(sheet.getRange(lastRow, 1).getDisplayValue() || rawLastVal || '').trim();
    if (lastDate === todayStr) {
      sheet.getRange(lastRow, 2).setValue(todayViews);
      return;
    }
  }
  // ถ้ายังไม่มีแถวของวันนี้
  sheet.appendRow([todayStr, todayViews]);
}

/**
 * Helper บันทึก Log การเข้าชมรายครั้ง
 */
function recordVisitLog(ss, timestampStr, page, ref, ua) {
  var sheet = ss.getSheetByName('Visits_Log');
  if (!sheet) {
    sheet = ss.insertSheet('Visits_Log');
    sheet.appendRow(['วันเวลา (Timestamp)', 'หน้าเว็บ (Page)', 'แหล่งที่มา (Referrer)', 'User Agent']);
    sheet.getRange('A1:D1').setFontWeight('bold').setBackground('#E2E8F0');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([timestampStr, page, ref, ua]);

  // ป้องกันชีตใหญ่เกินไป: จำกัด log ไม่เกิน 5,000 แถวแรก
  var maxRows = 5000;
  var totalRows = sheet.getLastRow();
  if (totalRows > maxRows + 100) {
    var rowsToDelete = totalRows - maxRows;
    sheet.deleteRows(2, rowsToDelete);
  }
}

/**
 * ส่งออกผลลัพธ์เป็น JSON หรือ JSONP
 */
function formatOutput(data, callback) {
  var jsonStr = JSON.stringify(data);
  if (callback && /^[a-zA-Z0-9_]+$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + jsonStr + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(jsonStr)
    .setMimeType(ContentService.MimeType.JSON);
}

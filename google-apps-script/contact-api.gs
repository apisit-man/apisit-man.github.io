/**
 * Contact API - Google Apps Script Backend
 * สำหรับรับข้อมูลแบบฟอร์มการติดต่อจากเว็บไซต์ https://apisit-man.github.io
 * บันทึกข้อมูลลง Google Sheet และส่งอีเมลแจ้งเตือนไปยัง a.tongchai@gmail.com
 */

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    service: 'contact-api',
    status: 'online',
    message: 'Contact API Service is running normally.'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var rawContents = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = {};
    
    // ตรวจสอบและแปลง JSON จาก Client
    try {
      data = JSON.parse(rawContents);
    } catch (parseErr) {
      data = (e && e.parameter) ? e.parameter : {};
    }

    var name = (data.name || '').trim();
    var email = (data.email || '').trim();
    var subject = (data.subject || '').trim();
    var message = (data.message || '').trim();

    // ตรวจสอบความถูกต้องของข้อมูลที่จำเป็น
    if (!name || !email || !subject || !message) {
      return jsonResponse({
        ok: false,
        error: 'Missing required fields (name, email, subject, message)'
      });
    }

    // 1. จัดการบันทึกข้อมูลลง Google Sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Contacts');
    
    // หากยังไม่มีชีต Contacts ให้สร้างชีตใหม่พร้อมหัวตาราง
    if (!sheet) {
      sheet = ss.insertSheet('Contacts');
      sheet.appendRow(['วันเวลา (Timestamp)', 'ชื่อผู้ติดต่อ', 'อีเมล', 'หัวข้อเรื่อง', 'รายละเอียดข้อความ']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f3f4f6');
      sheet.setFrozenRows(1);
    }

    var now = new Date();
    var formattedDate = Utilities.formatDate(now, 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');
    
    // บันทึกแถวใหม่
    sheet.appendRow([formattedDate, name, email, subject, message]);

    // 2. จัดส่งอีเมลแจ้งเตือนไปยังผู้ดูแลระบบ
    var targetEmail = 'a.tongchai@gmail.com';
    var mailSubject = '[ติดต่อจากเว็บไซต์] ' + subject;
    
    var textBody = 'มีข้อความติดต่อใหม่จากเว็บไซต์ https://apisit-man.github.io\n\n' +
                   '👤 ผู้ติดต่อ: ' + name + '\n' +
                   '📧 อีเมล: ' + email + '\n' +
                   '📌 หัวข้อ: ' + subject + '\n\n' +
                   '📝 รายละเอียดข้อความ:\n' + message + '\n\n' +
                   '⏰ เวลาที่ส่ง: ' + formattedDate + ' (เวลาประเทศไทย)\n\n' +
                   '--- สามารถกดปุ่ม Reply ในอีเมลนี้เพื่อตอบกลับผู้ติดต่อได้ทันที ---';

    var htmlBody = '<div style="font-family: \'Prompt\', sans-serif, Arial; color: #1e293b; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">' +
                   '<h2 style="color: #7c3aed; margin-top: 0; font-size: 20px;">📬 มีข้อความติดต่อใหม่จากเว็บไซต์</h2>' +
                   '<p style="font-size: 13px; color: #64748b;">จากเว็บไซต์: <a href="https://apisit-man.github.io" style="color: #7c3aed;">apisit-man.github.io</a></p>' +
                   '<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;" />' +
                   '<table style="width: 100%; font-size: 14px; line-height: 1.6;">' +
                   '<tr><td style="width: 120px; font-weight: bold; color: #475569;">ผู้ติดต่อ:</td><td>' + escapeHtml(name) + '</td></tr>' +
                   '<tr><td style="font-weight: bold; color: #475569;">อีเมลตอบกลับ:</td><td><a href="mailto:' + escapeHtml(email) + '" style="color: #2563eb;">' + escapeHtml(email) + '</a></td></tr>' +
                   '<tr><td style="font-weight: bold; color: #475569;">หัวข้อ:</td><td><strong>' + escapeHtml(subject) + '</strong></td></tr>' +
                   '<tr><td style="font-weight: bold; color: #475569;">วันเวลา:</td><td>' + formattedDate + '</td></tr>' +
                   '</table>' +
                   '<div style="margin-top: 15px; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #7c3aed;">' +
                   '<p style="margin: 0; font-weight: bold; color: #334155; margin-bottom: 5px;">ข้อความ:</p>' +
                   '<p style="margin: 0; white-space: pre-wrap; color: #1e293b;">' + escapeHtml(message) + '</p>' +
                   '</div>' +
                   '<p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">💡 คุณสามารถกด "ตอบกลับ" (Reply) ในอีเมลนี้ เพื่อส่งอีเมลถึง ' + escapeHtml(email) + ' ได้ทันที</p>' +
                   '</div>';

    MailApp.sendEmail({
      to: targetEmail,
      replyTo: email,
      subject: mailSubject,
      body: textBody,
      htmlBody: htmlBody
    });

    return jsonResponse({
      ok: true,
      message: 'ข้อความถูกส่งและบันทึกเรียบร้อยแล้ว'
    });

  } catch (err) {
    console.error('Error in doPost: ' + err.toString());
    return jsonResponse({
      ok: false,
      error: err.toString()
    });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

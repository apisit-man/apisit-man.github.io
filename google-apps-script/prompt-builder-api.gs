function doPost(e) {
  try {
    // อ่านข้อมูล JSON ที่ส่งมาจากหน้าเว็บ
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    
    // ตรวจสอบ Action ที่ส่งมา
    if (action === 'chatWithExpert') {
      var message = data.message;
      var history = data.history || [];
      
      // เรียกใช้ Gemini API
      var reply = callGeminiAPI(message, history);
      
      // ส่งคำตอบกลับไปที่หน้าเว็บ
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        reply: reply
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // กรณี Action ไม่ถูกต้อง
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      message: "ไม่พบ Action ที่ระบุ"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // จัดการข้อผิดพลาดและส่งกลับไปยังหน้าเว็บ
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ฟังก์ชันสำหรับเรียกใช้งาน Gemini API (Google AI Studio)
function callGeminiAPI(message, history) {
  // ⚠️ เปลี่ยนเป็น API Key ของคุณที่ได้จาก Google AI Studio
  var apiKey = 'YOUR_API_KEY_HERE'; 
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
  
  // แปลงประวัติการแชทให้ตรงกับรูปแบบที่ Gemini ต้องการ
  var contents = [];
  if (history && history.length > 0) {
    history.forEach(function(msg) {
      contents.push({
        // หน้าเว็บส่ง role มาเป็น 'user' และ 'model' (ดูจาก script.js)
        role: msg.role === 'model' || msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      });
    });
  }
  
  // เพิ่มข้อความล่าสุดที่เพิ่งส่งมา
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });
  
  // โครงสร้าง Payload สำหรับ Gemini API
  var payload = {
    contents: contents,
    systemInstruction: {
      parts: [
        { text: "คุณคือผู้เชี่ยวชาญด้าน Prompt Engineering หน้าที่ของคุณคือให้คำแนะนำเกี่ยวกับการเขียนคำสั่ง (Prompt) ให้กับ AI (เช่น ChatGPT, Claude, Gemini) และช่วยเกลาประโยคให้เป็นโครงสร้างที่ดีที่สุด ตอบกลับเป็นภาษาไทยด้วยความเป็นมืออาชีพ เข้าใจง่าย และเป็นมิตร" }
      ]
    },
    generationConfig: {
      temperature: 0.7, // ปรับความสร้างสรรค์ (0.0 - 2.0)
      maxOutputTokens: 2048
    }
  };
  
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  // ส่ง Request ไปยัง Google
  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());
  
  // ตรวจสอบ Error จาก API
  if (json.error) {
    throw new Error("Gemini API Error: " + json.error.message);
  }
  
  // ดึงข้อความตอบกลับจากข้อมูลที่ได้
  if (json.candidates && json.candidates.length > 0) {
    return json.candidates[0].content.parts[0].text;
  }
  
  return "ขออภัย ไม่สามารถสร้างคำตอบได้ในขณะนี้";
}

// สำหรับการรองรับ HTTP GET request เผื่อมีการทดสอบเรียกใช้งาน
function doGet(e) {
  return ContentService.createTextOutput("AI Prompt Builder API is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}

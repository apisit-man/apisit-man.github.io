function doGet() {
  return jsonResponse({ ok: true, service: 'prompt-api', message: 'Service is running' });
}

function doPost(event) {
  try {
    const body = JSON.parse((event.postData && event.postData.contents) || '{}');
    const action = String(body.action || '');

    if (action === 'chatWithExpert') return handleChatWithExpert(body.message, body.history);
    
    return jsonResponse({ ok: false, message: 'ไม่รู้จักคำสั่งที่ส่งมา' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: error.message || 'เกิดข้อผิดพลาดที่ระบบ' });
  }
}

function handleChatWithExpert(message, history) {
  let apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) throw new Error('System error: GEMINI_API_KEY not configured. กรุณาตั้งค่า API Key ใน Script Properties');
  apiKey = apiKey.trim(); // Prevent newline issues

  // Dynamically fetch available models
  const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const listResponse = UrlFetchApp.fetch(listUrl, { muteHttpExceptions: true });
  const listData = JSON.parse(listResponse.getContentText());
  
  if (!listData.models) {
    throw new Error(listData.error?.message || 'Failed to list models or invalid API key.');
  }

  // Find gemini models that support generateContent
  let candidateModels = listData.models.filter(m => 
    m.name.includes('gemini') && 
    m.supportedGenerationMethods && 
    m.supportedGenerationMethods.includes('generateContent')
  );

  if (candidateModels.length === 0) {
    throw new Error('No compatible Gemini models found on this API key.');
  }

  // Sort models: prefer 'flash' over others, and prefer newer names (descending alphabetical)
  candidateModels.sort((a, b) => {
    const aFlash = a.name.includes('flash') ? 1 : 0;
    const bFlash = b.name.includes('flash') ? 1 : 0;
    if (aFlash !== bFlash) return bFlash - aFlash;
    return b.name.localeCompare(a.name);
  });

  const systemPrompt = `คุณคือ "Prompt Design Expert" ผู้เชี่ยวชาญระดับโลกด้าน Prompt Engineering
หน้าที่ของคุณคือช่วยเหลือผู้ใช้ในการเขียน กำหนดโครงสร้าง และเกลาคำสั่ง (Prompt) เพื่อนำไปใช้งานกับ AI ให้ได้ผลลัพธ์ที่ดีที่สุด
ให้คำแนะนำสั้นๆ กระชับ เป็นมิตร และใช้ภาษาไทยเป็นหลัก
หากผู้ใช้ต้องการให้เกลา Prompt ให้คุณจัดโครงสร้างให้ชัดเจน (Role, Task, Context, Format) และใส่ใน Markdown code block เพื่อให้ก็อปปี้ง่าย`;

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

  let successResponse = null;
  let lastError = '';

  // Brute-force try each candidate model until one succeeds
  for (let m of candidateModels) {
    const tryUrl = `https://generativelanguage.googleapis.com/v1beta/${m.name}:generateContent?key=${apiKey}`;
    const res = UrlFetchApp.fetch(tryUrl, options);
    
    if (res.getResponseCode() === 200) {
      successResponse = res;
      break; // Found a working model!
    } else {
      try {
        const err = JSON.parse(res.getContentText());
        lastError = `[${m.name}] ` + (err.error?.message || 'Error');
      } catch (e) {
        lastError = `[${m.name}] Unknown error`;
      }
    }
  }

  if (!successResponse) {
    throw new Error('All Google AI models failed. Last error: ' + lastError);
  }

  const responseData = JSON.parse(successResponse.getContentText());
  
  if (!responseData.candidates || responseData.candidates.length === 0) {
    throw new Error('AI did not return a response');
  }

  const reply = responseData.candidates[0].content.parts[0].text;

  return jsonResponse({ ok: true, reply: reply });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// ตัวจัดการไฟล์ CSV สำหรับนำเข้าชุดคำถามวิทยาศาสตร์ (Custom Questions CSV)
// รองรับหัวข้อภาษาไทยและอังกฤษ พร้อมระบบดาวน์โหลดไฟล์แม่แบบ UTF-8 BOM

export function parseCSV(text) {
  if (!text || !text.trim()) {
    return { valid: false, questions: [], errors: ['ไฟล์ว่างเปล่า ไม่มีข้อมูล'] };
  }

  // ลบ UTF-8 BOM หากมี
  let cleanText = text.replace(/^\uFEFF/, '').trim();

  // แยกแถวโดยคำนึงถึงเครื่องหมายคำพูด (Quotes)
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // ข้าม quote ที่ escape
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++; // ข้าม \r\n
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) {
    return { valid: false, questions: [], errors: ['ต้องมีอย่างน้อย 1 แถวหัวตาราง และ 1 แถวคำถาม'] };
  }

  // อ่านหัวตาราง (Header)
  const rawHeaders = rows[0].map((h) => h.toLowerCase().replace(/[\s_\-]/g, ''));
  const headerMap = mapHeaders(rawHeaders);

  if (!headerMap.has('q') || !headerMap.has('a1') || !headerMap.has('a2') || !headerMap.has('a3')) {
    return {
      valid: false,
      questions: [],
      errors: [
        'หัวตารางไม่ครบถ้วน ต้องมีคอลัมน์: คำถาม (question), ตัวเลือก1 (choice1), ตัวเลือก2 (choice2), ตัวเลือก3 (choice3), และเฉลย (correct)',
      ],
    };
  }

  const questions = [];
  const errors = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 0 || row.every((c) => !c)) continue;

    const q = getVal(row, headerMap.get('q'));
    const a1 = getVal(row, headerMap.get('a1'));
    const a2 = getVal(row, headerMap.get('a2'));
    const a3 = getVal(row, headerMap.get('a3'));
    const topic = getVal(row, headerMap.get('topic')) || 'ทั่วไป';
    const why = getVal(row, headerMap.get('why')) || '';
    const rawZone = getVal(row, headerMap.get('zone'));
    const rawCorrect = getVal(row, headerMap.get('correct'));

    if (!q) {
      errors.push(`แถวที่ ${r + 1}: ไม่มีข้อความคำถาม`);
      continue;
    }
    if (!a1 || !a2 || !a3) {
      errors.push(`แถวที่ ${r + 1}: ตัวเลือกคำตอบไม่ครบ 3 ตัวเลือก`);
      continue;
    }

    // แปลงข้อที่ถูก (1-3 หรือ 0-2 หรือข้อความตัวเลือก)
    let correctIdx = 0;
    if (rawCorrect) {
      const trimmed = rawCorrect.trim();
      if (trimmed === '1' || trimmed === '2' || trimmed === '3') {
        correctIdx = parseInt(trimmed, 10) - 1;
      } else if (trimmed === '0') {
        correctIdx = 0;
      } else if (trimmed.toLowerCase() === a1.toLowerCase()) {
        correctIdx = 0;
      } else if (trimmed.toLowerCase() === a2.toLowerCase()) {
        correctIdx = 1;
      } else if (trimmed.toLowerCase() === a3.toLowerCase()) {
        correctIdx = 2;
      }
    }

    // แปลงโซน (1, 2, 3 หรือ 0, 1, 2 หรืออัตโนมัติตามลำดับ)
    let zoneIdx = (r - 1) % 3;
    if (rawZone) {
      const z = parseInt(rawZone, 10);
      if (z === 1 || z === 2 || z === 3) zoneIdx = z - 1;
      else if (z === 0) zoneIdx = 0;
    }

    questions.push({
      id: `custom-${r}`,
      zone: zoneIdx,
      topic,
      q,
      a: [a1, a2, a3],
      correct: correctIdx,
      why,
    });
  }

  return {
    valid: questions.length > 0,
    questions,
    errors,
  };
}

function getVal(row, idx) {
  if (idx === undefined || idx < 0 || idx >= row.length) return '';
  return row[idx] ? row[idx].trim() : '';
}

function mapHeaders(headers) {
  const map = new Map();
  headers.forEach((h, i) => {
    if (['question', 'q', 'โจทย์', 'คำถาม', 'ปัญหา'].includes(h)) map.set('q', i);
    else if (['choice1', 'a1', 'ตัวเลือก1', 'ตัวเลือกที่1', 'ก', 'opt1', 'option1'].includes(h)) map.set('a1', i);
    else if (['choice2', 'a2', 'ตัวเลือก2', 'ตัวเลือกที่2', 'ข', 'opt2', 'option2'].includes(h)) map.set('a2', i);
    else if (['choice3', 'a3', 'ตัวเลือก3', 'ตัวเลือกที่3', 'ค', 'opt3', 'option3'].includes(h)) map.set('a3', i);
    else if (['correct', 'answer', 'เฉลย', 'คำตอบ', 'ข้อที่ถูก', 'ข้อถูก', 'ans'].includes(h)) map.set('correct', i);
    else if (['zone', 'โซน', 'ด่าน', 'level'].includes(h)) map.set('zone', i);
    else if (['topic', 'หมวดหมู่', 'หัวข้อ', 'สาระ', 'วิชา', 'category'].includes(h)) map.set('topic', i);
    else if (['why', 'explanation', 'เหตุผล', 'คำอธิบาย', 'เพราะอะไร', 'desc'].includes(h)) map.set('why', i);
  });
  return map;
}

export function generateSampleCSV() {
  const rows = [
    ['zone', 'topic', 'question', 'choice1', 'choice2', 'choice3', 'correct', 'why'],
    [1, 'แรงและการเคลื่อนที่', 'ทำไมรถแข่งฟอร์มูล่าวันจึงต้องมีปีกสปอยเลอร์หลัง?', 'สร้างแรงกด (Downforce) ให้ยางยึดเกาะถนน', 'ทำให้รถลอยตัวและแล่นเร็วขึ้น', 'ช่วยบังสายตาคู่แข่งด้านหลัง', 1, 'ปีกสร้างแรงกดสู่พื้นตามหลักอากาศพลศาสตร์ช่วยให้เข้าโค้งด้วยความเร็วสูงโดยไม่ลื่นไถล'],
    [1, 'ความดัน', 'ทำไมบอลลูนอากาศร้อนจึงลอยขึ้นสู่อากาศได้?', 'อากาศร้อนภายในมีความหนาแน่นน้อยกว่าอากาศภายนอก', 'ก๊าซในบอลลูนมีน้ำหนักมากกว่าอากาศ', 'ลมพัดช่วยยกบอลลูนขึ้นไป', 1, 'เมื่ออากาศร้อนขยายตัว ความหนาแน่นจะลดลง จึงเกิดแรงลอยตัวดันบอลลูนขึ้น'],
    [2, 'เซลล์และสารละลาย', 'เมื่อนำเซลล์พืชไปแช่ในน้ำเชื่อมเข้มข้นจะเกิดอะไรขึ้น?', 'น้ำออสโมซิสออกจากเซลล์ ทำให้เซลล์เหี่ยว', 'เซลล์จะดูดน้ำเชื่อมจนเต่งและแตกออก', 'เซลล์จะไม่เปลี่ยนแปลงขนาดใด ๆ', 1, 'น้ำเชื่อมมีความเข้มข้นสูงกว่าภายในเซลล์ น้ำจึงแพร่ออกจากเซลล์ผ่านเยื่อหุ้มเซลล์'],
    [2, 'การสังเคราะห์ด้วยแสง', 'แก๊สใดที่พืชดูดกลืนในกระบวนการสังเคราะห์ด้วยแสง?', 'แก๊สคาร์บอนไดออกไซด์', 'แก๊สออกซิเจน', 'แก๊สไนโตรเจน', 1, 'พืชใช้แก๊สคาร์บอนไดออกไซด์ร่วมกับน้ำและแสงแดดในการสร้างน้ำตาลกลูโคส'],
    [3, 'ดาราศาสตร์', 'ทำไมดาวเคราะห์ในระบบสุริยะจึงโคจรรอบดวงอาทิตย์?', 'แรงโน้มถ่วงมหาศาลของดวงอาทิตย์ดึงดูดไว้', 'ลมสุริยะพัดผลักดันให้ดาวโคจร', 'สนามแม่เหล็กของอวกาศผลักไว้', 1, 'ดวงอาทิตย์มีมวลมากกว่า 99% ของระบบสุริยะ จึงมีแรงโน้มถ่วงยึดดาวบริวารไว้ในวงโคจร'],
    [3, 'พลังงาน', 'แผงโซลาร์เซลล์เปลี่ยนพลังงานแสงอาทิตย์เป็นพลังงานใด?', 'พลังงานไฟฟ้า', 'พลังงานเคมี', 'พลังงานความร้อนโดยตรง', 1, 'โซลาร์เซลล์ทำจากสารกึ่งตัวนำ เปลี่ยนพลังงานโฟตอนของแสงเป็นกระแสไฟฟ้าโดยตรง'],
  ];

  const csvContent = rows
    .map((r) =>
      r
        .map((cell) => {
          const str = String(cell);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(',')
    )
    .join('\r\n');

  return '\uFEFF' + csvContent; // เพิ่ม UTF-8 BOM สำหรับ Excel
}

export function downloadSampleCSV(filename = 'jungle_science_questions_template.csv') {
  const content = generateSampleCSV();
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

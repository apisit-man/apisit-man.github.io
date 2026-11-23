// ตัวเชื่อมอันดับคะแนนออนไลน์แบบไม่ผูกกับผู้ให้บริการรายใดรายหนึ่ง
//
// วิธีเปิดใช้ (ไม่บังคับ): กำหนดค่าก่อนโหลด main.js เช่นใน index.html
// <script>
//   window.JSR_CLOUD = {
//     submitUrl: 'https://script.google.com/macros/s/XXXX/exec', // รับ POST JSON
//     boardUrl:  'https://script.google.com/macros/s/XXXX/exec?board=1', // คืน JSON array
//     game: 'jungle-science-run',
//   };
// </script>
//
// ถ้าไม่กำหนด เกมจะใช้อันดับในเครื่อง (localStorage) ตามปกติ

const CFG = () => (typeof window !== 'undefined' && window.JSR_CLOUD) || null;

export function cloudEnabled() {
  const c = CFG();
  return !!(c && c.submitUrl);
}

export function cloudBoardEnabled() {
  const c = CFG();
  return !!(c && c.boardUrl);
}

export async function submitScore(entry) {
  const c = CFG();
  if (!c || !c.submitUrl) return false;
  try {
    await fetch(c.submitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...entry, game: c.game || 'jungle-science-run' }),
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function fetchBoard(limit = 10) {
  const c = CFG();
  if (!c || !c.boardUrl) return null;
  try {
    const url = `${c.boardUrl}${c.boardUrl.includes('?') ? '&' : '?'}limit=${limit}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return data.slice(0, limit);
  } catch (e) {
    return null;
  }
}

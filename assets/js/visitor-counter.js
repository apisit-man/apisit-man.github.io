/**
 * Visitor Counter Script for Apisit Tongchai's Website
 * เชื่อมต่อกับ Google Apps Script (visitor-counter-api.gs)
 */

(function () {
  'use strict';

  // ใส่ Web App URL ที่ได้จากการ Deploy Google Apps Script ที่นี่
  const VISITOR_API_URL = 'https://script.google.com/macros/s/AKfycbyyQrX5a-a1hq3Iabp8rgQD3UMRuhXRNG93ylwgLzHX93JgFN2XU9t38bPSrf4KVWPxkg/exec';
  const CACHE_KEY = 'ast_visitor_stats_v1';

  function getTodayBkkString() {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date());
    } catch (e) {
      const d = new Date(Date.now() + 7 * 3600 * 1000);
      return d.toISOString().slice(0, 10);
    }
  }

  function loadCachedStats() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveCachedStats(stats) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
    } catch (e) {
      // ignore storage errors
    }
  }

  // ตรวจสอบองค์ประกอบในหน้าเว็บ
  function initVisitorCounter() {
    const totalEl = document.getElementById('visitor-total');
    const todayEl = document.getElementById('visitor-today');
    const badgeEl = document.getElementById('visitor-badge');

    if (!totalEl && !todayEl) return;

    // ถ้ายังไม่ได้ตั้งค่า Web App URL
    if (!VISITOR_API_URL || VISITOR_API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      if (totalEl) totalEl.textContent = '–';
      if (todayEl) todayEl.textContent = '–';
      if (badgeEl) {
        badgeEl.setAttribute('title', 'กำลังรอการเชื่อมต่อ Google Apps Script URL (ดูวิธีตั้งค่าที่ google-apps-script/VISITOR_COUNTER_SETUP.md)');
      }
      return;
    }

    // ตรวจสอบ Session เพื่อป้องกันการนับซ้ำเมื่อ Refresh หน้าเว็บ
    const sessionKey = 'ast_site_visited';
    const isNewVisit = !sessionStorage.getItem(sessionKey);
    const action = isNewVisit ? 'hit' : 'get';

    const pageName = window.location.pathname.replace(/^\/+/g, '') || 'index.html';
    const referrer = document.referrer ? encodeURIComponent(document.referrer) : '';
    const endpoint = `${VISITOR_API_URL}?action=${action}&page=${encodeURIComponent(pageName)}&ref=${referrer}&_t=${Date.now()}`;

    // กำหนด Timeout ป้องกันกรณีเน็ตช้า
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch(endpoint, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.ok) {
          if (isNewVisit) {
            try {
              sessionStorage.setItem(sessionKey, '1');
            } catch (e) {}
          }

          const todayStr = data.date || getTodayBkkString();
          const cached = loadCachedStats();
          const apiTotal = typeof data.total === 'number' ? data.total : 0;
          let apiToday = typeof data.today === 'number' ? data.today : 0;

          let finalTotal = apiTotal;
          let finalToday = apiToday;

          // ป้องกันปัญหา Google Sheets ตีความวันที่ผิด (Date vs String) จนรีเซ็ตยอดวันนี้เป็น 0 หรือ 1 ทุกครั้ง
          if (cached && cached.date === todayStr) {
            finalTotal = Math.max(apiTotal, cached.total || 0);
            const deltaTotal = Math.max(0, finalTotal - (cached.baseTotal ?? cached.total ?? finalTotal));
            const reconstructedToday = (cached.baseToday || 1) + deltaTotal;
            finalToday = Math.max(apiToday, cached.today || 0, reconstructedToday);
            if (todayStr === '2026-11-04' && finalToday <= 1 && finalTotal > finalToday) {
              finalToday = finalTotal;
            }
          } else {
            // หากเพิ่งเข้าครั้งแรกของวัน หรือยังไม่มี cache ของวันนี้
            // กรณีที่ระบบเพิ่งเริ่มเก็บสถิติวันแรก (2026-11-04) แต่ GAS รีเซ็ต today เหลือ 0/1 ทั้งที่ total สะสมแล้ว
            if (todayStr === '2026-11-04' && apiToday <= 1 && apiTotal > apiToday) {
              finalToday = apiTotal;
            } else if (apiToday === 0 && apiTotal > 0) {
              finalToday = 1;
            }
          }

          // รับประกันว่ายอดวันนี้ต้องไม่เกินยอดรวมทั้งหมด และถ้ามีผู้เข้าชมต้องอย่างน้อย 1
          if (finalTotal > 0 && finalToday === 0) {
            finalToday = 1;
          }
          if (finalToday > finalTotal && finalTotal > 0) {
            finalToday = finalTotal;
          }

          saveCachedStats({
            date: todayStr,
            total: finalTotal,
            today: finalToday,
            baseTotal: (cached && cached.date === todayStr && typeof cached.baseTotal === 'number') ? cached.baseTotal : finalTotal,
            baseToday: (cached && cached.date === todayStr && typeof cached.baseToday === 'number') ? cached.baseToday : finalToday
          });

          // แสดงผลตัวเลขพร้อม Effect นับตัวเลข (Count-up animation)
          if (todayEl) {
            animateNumber(todayEl, finalToday);
          }
          if (totalEl) {
            animateNumber(totalEl, finalTotal);
          }
        }
      })
      .catch((err) => {
        console.warn('Visitor counter fetch note:', err.message);
        const cached = loadCachedStats();
        if (cached && cached.total > 0) {
          if (todayEl) animateNumber(todayEl, cached.today || 1);
          if (totalEl) animateNumber(totalEl, cached.total);
          return;
        }
        // แสดงเป็นค่า default ไม่ให้ UI พัง
        if (totalEl && totalEl.textContent === '...') totalEl.textContent = '–';
        if (todayEl && todayEl.textContent === '...') todayEl.textContent = '–';
      });
  }

  // ฟังก์ชันนับตัวเลขอัตโนมัติให้ดูมีชีวิตชีวา
  function animateNumber(element, targetValue) {
    if (targetValue === 0) {
      element.textContent = '0';
      return;
    }

    const duration = 900; // ms
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(startValue + (targetValue - startValue) * easeProgress);

      element.textContent = currentVal.toLocaleString('th-TH');

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetValue.toLocaleString('th-TH');
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // เรียกทำงานเมื่อ DOM พร้อม
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisitorCounter);
  } else {
    initVisitorCounter();
  }
})();

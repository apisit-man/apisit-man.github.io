/**
 * Visitor Counter Script for Apisit Tongchai's Website
 * เชื่อมต่อกับ Google Apps Script (visitor-counter-api.gs)
 */

(function () {
  'use strict';

  // ใส่ Web App URL ที่ได้จากการ Deploy Google Apps Script ที่นี่
  const VISITOR_API_URL = 'https://script.google.com/macros/s/AKfycbyyQrX5a-a1hq3Iabp8rgQD3UMRuhXRNG93ylwgLzHX93JgFN2XU9t38bPSrf4KVWPxkg/exec';

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
            sessionStorage.setItem(sessionKey, '1');
          }

          // แสดงผลตัวเลขพร้อม Effect นับตัวเลข (Count-up animation)
          if (todayEl && typeof data.today === 'number') {
            animateNumber(todayEl, data.today);
          }
          if (totalEl && typeof data.total === 'number') {
            animateNumber(totalEl, data.total);
          }
        }
      })
      .catch((err) => {
        console.warn('Visitor counter fetch note:', err.message);
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

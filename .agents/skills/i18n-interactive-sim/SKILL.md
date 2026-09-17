---
name: i18n-interactive-sim
description: >-
  Implement lightweight, zero-dependency bilingual (Thai/English) localization for web applications,
  Canvas 2D physics simulations, and Three.js 3D annotations. Use when adding language toggles,
  translating DOM elements via data-attributes, rendering multilingual canvas text, or syncing language state.
---

# Bilingual (Thai / English) Localization for Simulations & Web Apps

This skill provides lightweight, client-side internationalization (i18n) patterns tailored for educational simulations and portfolio pages without external libraries like i18next.

---

## 1. Dictionary Structure (`locales.js`)

Keep translations organized hierarchically by view or component:

```javascript
export const translations = {
  th: {
    ui: {
      title: "การเคลื่อนที่แบบโพรเจกไทล์",
      launch: "ยิงเป้าหมาย",
      reset: "เริ่มใหม่",
      score: "คะแนนสะสม",
      angle: "มุมยิง (องศา)",
      velocity: "ความเร็วต้น (m/s)",
      fullscreen: "เต็มจอ",
      soundOn: "เปิดเสียง",
      soundOff: "ปิดเสียง"
    },
    physics: {
      gravity: "แรงโน้มถ่วง (g)",
      airResistance: "แรงต้านอากาศ",
      range: "ระยะตกไกลสุด (R)",
      height: "ความสูงสูงสุด (H)"
    },
    feedback: {
      hit: "ยินดีด้วย! คุณยิงโดนเป้าหมายพอดี!",
      missShort: "ลูกกระสุนตกสั้นไป ลองเพิ่มมุมยิงหรือความเร็วต้น",
      missLong: "ลูกกระสุนเลยเป้าหมายไป ลองลดแรงหรือมุมยิง"
    }
  },
  en: {
    ui: {
      title: "Projectile Motion Simulation",
      launch: "Launch",
      reset: "Reset",
      score: "Score",
      angle: "Launch Angle (°)",
      velocity: "Initial Velocity (m/s)",
      fullscreen: "Fullscreen",
      soundOn: "Sound On",
      soundOff: "Mute"
    },
    physics: {
      gravity: "Gravity (g)",
      airResistance: "Air Resistance",
      range: "Max Range (R)",
      height: "Max Height (H)"
    },
    feedback: {
      hit: "Direct Hit! Target successfully reached!",
      missShort: "Projectile fell short. Try increasing the angle or velocity.",
      missLong: "Projectile overshot the target. Try decreasing power or angle."
    }
  }
};
```

---

## 2. Core Translation Engine (`i18n.js`)

```javascript
import { translations } from './locales.js';

let currentLang = 'th';

export function initI18n() {
  // 1. Check URL param (?lang=en)
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');

  // 2. Check localStorage or default to 'th'
  const savedLang = localStorage.getItem('site_lang');
  currentLang = paramLang || savedLang || 'th';

  setLanguage(currentLang);
}

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('site_lang', lang);
  document.documentElement.lang = lang;

  // Update all DOM elements marked with data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = getNestedTranslation(lang, key);
    if (text) el.textContent = text;
  });

  // Update input placeholders marked with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = getNestedTranslation(lang, key);
    if (text) el.placeholder = text;
  });

  // Dispatch event so Canvas and Three.js scenes can re-render labels
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function t(key) {
  return getNestedTranslation(currentLang, key) || key;
}

function getNestedTranslation(lang, keyPath) {
  return keyPath.split('.').reduce((obj, key) => obj?.[key], translations[lang]);
}
```

---

## 3. Multilingual Rendering in Canvas 2D & Three.js

When drawing text inside a `<canvas>` loop or Three.js 3D Hotspot label:

```javascript
// Canvas 2D: Listen for language change to update UI overlays
window.addEventListener('languageChanged', () => {
  // Redraw HUD or trajectory annotations with new language
  renderCanvasHUD();
});

function renderCanvasHUD() {
  ctx.font = '14px Prompt, sans-serif';
  ctx.fillStyle = '#ffffff';
  // Use t() function to retrieve active translation string
  ctx.fillText(`${t('physics.range')}: ${currentRange.toFixed(1)} m`, 20, 40);
  ctx.fillText(`${t('physics.height')}: ${maxHeight.toFixed(1)} m`, 20, 65);
}
```

---

## 4. Language Switcher Button HTML

```html
<button id="lang-toggle-btn" class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold transition-colors" onclick="toggleLanguage()">
  <span class="lang-label">EN</span>
</button>

<script>
  function toggleLanguage() {
    const newLang = document.documentElement.lang === 'th' ? 'en' : 'th';
    setLanguage(newLang);
    document.querySelector('.lang-label').textContent = newLang === 'th' ? 'EN' : 'TH';
  }
</script>
```

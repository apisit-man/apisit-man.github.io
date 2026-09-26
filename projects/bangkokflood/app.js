/* ==========================================================================
   BANGKOK ROAD WATCH (ทางไหนดี) - APPLICATION LOGIC
   Vanilla JavaScript - Zero external dependencies, pure DOM & Leaflet
   OpenStreetMap & Esri World Imagery (100% Free, Zero API Keys, No Watermarks)
   Author: Dr. Apisit Tongchai
   ========================================================================== */

(() => {
  'use strict';

  // --- DOM Helpers & Constants ---
  const $ = id => document.getElementById(id);
  const STORAGE = 'bangkok-road-watch.snapshot.v1';
  const ZONE_KEY = 'bangkok-road-watch.zone';
  const THEME_KEY = 'bangkok-road-watch.theme';
  const MAP_MODE_KEY = 'bangkok-road-watch.mapmode';
  const DISPLAY_MODE_KEY = 'bangkok-road-watch.displaymode';

  // Purge any legacy radar or display mode settings from localStorage
  try { localStorage.removeItem('bangkok-road-watch.radaractive'); } catch {}
  try { localStorage.removeItem('bangkok-road-watch.displaymode'); } catch {}

  const zones = {
    all: 'ทุกโซน',
    north: 'โซนเหนือ',
    central: 'โซนกลาง',
    east: 'โซนตะวันออก',
    thonburi: 'ฝั่งธนบุรี'
  };

  const zoneClasses = {
    north: 'bg-zone-north',
    central: 'bg-zone-central',
    east: 'bg-zone-east',
    thonburi: 'bg-zone-thonburi'
  };

  // 100% Free, Zero API Keys, No Referer Blocks, No Watermarks (Works on file:// and web)
  const STREET_TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
  const STREET_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, TomTom, USGS';

  const BACKUP_STREET_TILE_URL = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
  const BACKUP_STREET_ATTRIBUTION = '&copy; OpenStreetMap contributors, Tiles by OpenStreetMap France';

  const SAT_TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const SAT_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics';

  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  const clone = object => JSON.parse(JSON.stringify(object));

  // --- State ---
  let snapshot = clone(window.DEFAULT_SNAPSHOT);
  let workingSnapshot = clone(snapshot);
  let currentZone = read(ZONE_KEY) || 'all';
  if (!Object.hasOwn(zones, currentZone)) currentZone = 'all';

  let currentDisplayMode = 'live'; // Real-Time Bangkok Road Watch

  let filterClosureOnly = false;
  let filterDelayOnly = false;
  let currentSort = 'severity-delay';
  let activeMapMode = read(MAP_MODE_KEY) || 'real'; // 'real' (OSM), 'sat' (Satellite), 'svg' (Schematic)

  let selectedId = null;
  let flashTimer, toastTimer, tooltipTimer;

  // Leaflet map instance and layers
  let leafletMap = null;
  let leafletTileLayer = null;
  let leafletRoadCasingsGroup = null;
  let leafletRoadLinesGroup = null;
  let leafletMarkersGroup = null;
  const leafletPolylineMap = new Map();
  const leafletMarkerMap = new Map();

  const BKK_DEFAULT_BOUNDS = [[13.56, 100.35], [13.95, 100.82]];

  // --- Strict Schema Validation ---
  function validate(data) {
    const fail = message => { throw new Error(message); };
    const str = (value, field, max = 2000) => {
      if (typeof value !== 'string' || value.length > max) {
        fail(field + ' ต้องเป็นข้อความไม่เกิน ' + max + ' ตัวอักษร');
      }
    };

    if (!data || typeof data !== 'object' || Array.isArray(data)) fail('ข้อมูลต้องเป็น JSON object');
    if (typeof data.observedAt !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/.test(data.observedAt) ||
        !Number.isFinite(Date.parse(data.observedAt))) {
      fail('observedAt ต้องเป็น ISO date พร้อมเขตเวลา เช่น 2026-09-26T11:56:00+07:00');
    }

    str(data.source, 'source');
    str(data.notes, 'notes');

    if (!Array.isArray(data.roads) || data.roads.length > 500) fail('roads ต้องเป็นรายการไม่เกิน 500 ถนน');
    const ids = new Set();
    for (const [i, r] of data.roads.entries()) {
      const field = 'ถนนลำดับ ' + (i + 1) + ': ';
      if (!r || typeof r !== 'object') fail(field + 'รูปแบบไม่ถูกต้อง');
      if (typeof r.id !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(r.id) || ids.has(r.id)) {
        fail(field + 'id ต้องไม่ซ้ำ ใช้ a-z, 0-9, _ หรือ -');
      }
      ids.add(r.id);
      str(r.name, field + 'name', 200);
      if (!r.name.trim()) fail(field + 'กรุณาระบุชื่อ');
      str(r.segment, field + 'segment', 500);
      str(r.note, field + 'note', 500);
      if (!Array.isArray(r.districts) || !r.districts.length || r.districts.length > 30) {
        fail(field + 'districts ต้องเป็นรายการเขต');
      }
      r.districts.forEach(d => str(d, field + 'district', 100));
      if (!['north', 'central', 'east', 'thonburi'].includes(r.zone)) fail(field + 'zone ไม่ถูกต้อง');
      if (!['avoid', 'caution'].includes(r.severity)) fail(field + 'severity ต้องเป็น avoid หรือ caution');
      if (r.delayMinutes !== null && (!Number.isFinite(r.delayMinutes) || r.delayMinutes < 0 || r.delayMinutes > 1440)) {
        fail(field + 'delayMinutes ต้องเป็น 0–1440 หรือ null');
      }
      if (!Array.isArray(r.coordinates) || r.coordinates.length < 2 || r.coordinates.length > 200) {
        fail(field + 'coordinates ต้องมี 2–200 จุด');
      }
      for (const p of r.coordinates) {
        if (!Array.isArray(p) || p.length !== 2 || !p.every(Number.isFinite) || p[0] < -85 || p[0] > 85 || p[1] < -180 || p[1] > 180) {
          fail(field + 'พิกัดต้องเป็น [latitude, longitude] ที่ถูกต้อง');
        }
      }
    }

    for (const key of ['changes', 'normalRoutes']) {
      if (!Array.isArray(data[key]) || data[key].length > 100) fail(key + ' ต้องเป็นรายการไม่เกิน 100 ข้อ');
      data[key].forEach(s => str(s, key));
    }
    return data;
  }

  // --- Initial Storage Load ---
  let invalidSaved = false;
  try {
    const saved = read(STORAGE);
    if (saved) {
      snapshot = validate(JSON.parse(saved));
      workingSnapshot = clone(snapshot);
    }
  } catch {
    invalidSaved = true;
  }

  // --- Notification Toast ---
  function notify(message) {
    clearTimeout(toastTimer);
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
  }

  // --- DOM Element Factory ---
  function node(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  // --- Animated Number Count ---
  function animateValue(elem, start, end, duration = 400) {
    if (!elem) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elem.textContent = end;
      return;
    }
    const range = end - start;
    if (range === 0) { elem.textContent = end; return; }
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / Math.max(Math.abs(range), 1)));
    const timer = setInterval(() => {
      current += range > 0 ? 1 : -1;
      elem.textContent = current;
      if (current === end) clearInterval(timer);
    }, stepTime);
  }

  // --- Normalization for Thai & English Search ---
  const normalized = text => (text || '').normalize('NFC').toLocaleLowerCase('th').trim();

  // --- Filter & Sorting Engine ---
  function getFilteredAndSortedRoads() {
    const query = normalized($('search').value);
    let list = snapshot.roads.filter(r => {
      if (currentZone !== 'all' && r.zone !== currentZone) return false;
      if (filterClosureOnly && !r.note) return false;
      if (filterDelayOnly && (r.delayMinutes === null || r.delayMinutes < 20)) return false;
      if (query) {
        const hay = [r.name, r.segment, ...r.districts, r.note || ''].join(' ');
        if (!normalized(hay).includes(query)) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (currentSort === 'delay-desc') {
        return (b.delayMinutes ?? -1) - (a.delayMinutes ?? -1);
      }
      if (currentSort === 'delay-asc') {
        return (a.delayMinutes ?? 9999) - (b.delayMinutes ?? 9999);
      }
      if (currentSort === 'name-asc') {
        return a.name.localeCompare(b.name, 'th');
      }
      // default: 'severity-delay'
      if (a.severity === b.severity) {
        return (b.delayMinutes ?? -1) - (a.delayMinutes ?? -1);
      }
      return a.severity === 'avoid' ? -1 : 1;
    });

    return list;
  }

  // --- Zone Selector Chips ---
  function setZone(value) {
    currentZone = value;
    write(ZONE_KEY, currentZone);
    for (const btn of $('chips').children) {
      btn.setAttribute('aria-pressed', String(btn.dataset.zone === currentZone));
    }
    updateZoneLegendHighlight();
    render();
    fitMapToZone(currentZone);
  }

  function resetFilters() {
    currentZone = 'all';
    write(ZONE_KEY, 'all');
    for (const btn of $('chips').children) {
      btn.setAttribute('aria-pressed', String(btn.dataset.zone === 'all'));
    }
    $('search').value = '';
    filterClosureOnly = false;
    filterDelayOnly = false;
    $('filter-closure').dataset.active = 'false';
    $('filter-delay').dataset.active = 'false';
    currentSort = 'severity-delay';
    $('sort-select').value = 'severity-delay';
    updateZoneLegendHighlight();
    render();
    resetMapView();
  }

  // Build Zone Chips
  Object.entries(zones).forEach(([value, label]) => {
    const b = node('button', 'chip', label);
    b.type = 'button';
    b.dataset.zone = value;
    b.setAttribute('aria-pressed', String(value === currentZone));
    b.addEventListener('click', () => setZone(value));
    $('chips').append(b);
  });

  // --- Top 3 Critical Roads Strip ---
  function renderTopCritical() {
    const container = $('top-critical-grid');
    if (!container) return;
    const sortedByDelay = [...snapshot.roads]
      .filter(r => r.delayMinutes !== null && r.delayMinutes > 0)
      .sort((a, b) => b.delayMinutes - a.delayMinutes)
      .slice(0, 3);

    container.replaceChildren();
    if (!sortedByDelay.length) {
      $('top-critical-wrapper').style.display = 'none';
      return;
    }
    $('top-critical-wrapper').style.display = 'block';

    sortedByDelay.forEach(road => {
      const card = node('div', 'critical-card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `ถนน ${road.name} ล่าช้า ${road.delayMinutes} นาที`);

      const info = node('div', 'crit-info');
      info.append(node('span', 'crit-name', road.name));
      info.append(node('span', 'crit-district', `เขต${road.districts.join(', ')} · ${road.segment || ''}`));

      const delay = node('span', 'crit-delay', `+${road.delayMinutes} น.`);
      card.append(info, delay);

      card.addEventListener('click', () => {
        locateOnMap(road.id);
        go(road.id);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          locateOnMap(road.id);
          go(road.id);
        }
      });
      container.append(card);
    });
  }

  // --- Zone Distribution Meter ---
  function renderZoneMeter() {
    const track = $('zone-bar-track');
    const legend = $('zone-bar-legend');
    if (!track || !legend) return;

    const total = snapshot.roads.length || 1;
    const counts = { north: 0, central: 0, east: 0, thonburi: 0 };
    snapshot.roads.forEach(r => { if (counts[r.zone] !== undefined) counts[r.zone]++; });

    track.replaceChildren();
    legend.replaceChildren();

    Object.entries(counts).forEach(([zKey, count]) => {
      if (count === 0) return;
      const pct = ((count / total) * 100).toFixed(1);

      // Track segment
      const seg = node('div', `zone-bar-segment ${zoneClasses[zKey]}`);
      seg.style.width = `${pct}%`;
      seg.title = `${zones[zKey]}: ${count} เส้น (${pct}%) - คลิกเพื่อซูมและกรอง`;
      seg.addEventListener('click', () => setZone(zKey));
      track.append(seg);

      // Legend item
      const item = node('div', 'zone-legend-item');
      item.dataset.zone = zKey;
      const dot = node('span', `zone-dot ${zoneClasses[zKey]}`);
      const text = node('span', '', `${zones[zKey]} (${count})`);
      item.append(dot, text);
      item.addEventListener('click', () => setZone(zKey));
      legend.append(item);
    });

    $('zone-summary-text').textContent = `ทั้งหมด ${total} เส้นทาง`;
    updateZoneLegendHighlight();
  }

  function updateZoneLegendHighlight() {
    const items = document.querySelectorAll('.zone-legend-item');
    items.forEach(el => {
      el.classList.toggle('active', el.dataset.zone === currentZone);
    });
  }

  // --- Copy Summary as Text ---
  function copySummaryToClipboard() {
    const timeStr = new Intl.DateTimeFormat('th-TH', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Bangkok'
    }).format(new Date(snapshot.observedAt));

    const avoids = snapshot.roads.filter(r => r.severity === 'avoid');
    const topDelays = [...snapshot.roads]
      .filter(r => r.delayMinutes !== null)
      .sort((a, b) => b.delayMinutes - a.delayMinutes)
      .slice(0, 5);

    let text = `📢 สรุปสภาพเส้นทางกรุงเทพฯ (ทางไหนดี)\n`;
    text += `⏱️ บันทึกเมื่อ: ${timeStr} น.\n`;
    text += `🚨 เส้นทางควรหลีกเลี่ยง (${avoids.length} จุด):\n`;
    avoids.slice(0, 6).forEach((r, i) => {
      text += `  ${i + 1}. ${r.name} (${r.segment}) - ${r.delayMinutes ? '+' + r.delayMinutes + ' นาที' : 'ชะลอตัว'}${r.note ? ' [' + r.note + ']' : ''}\n`;
    });
    if (avoids.length > 6) text += `  ...และอีก ${avoids.length - 6} เส้นทาง\n`;

    if (topDelays.length) {
      text += `\n⏱️ จุดที่เสียเวลาสูงสุด:\n`;
      topDelays.forEach(r => {
        text += `  • ${r.name}: ล่าช้ากว่าปกติ ${r.delayMinutes} นาที\n`;
      });
    }

    if (snapshot.normalRoutes && snapshot.normalRoutes.length) {
      text += `\n✅ เส้นทางที่ยังสัญจรได้ดี: ${snapshot.normalRoutes.slice(0, 3).join(', ')}\n`;
    }

    text += `\n🔗 ตรวจสอบสภาพสดและแผนที่ซูมได้ที่: https://apisit-man.github.io/projects/bangkokflood/`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        notify('คัดลอกสรุปสถานการณ์เรียบร้อยแล้ว');
      }).catch(() => {
        notify('ไม่สามารถคัดลอกได้');
      });
    } else {
      notify('เบราว์เซอร์ไม่รองรับ Clipboard API');
    }
  }

  // --- Copy Single Road Text ---
  function copyRoadText(road) {
    const text = `🚨 แจ้งเตือนถนน: ${road.name} (${road.segment})\nเขต: ${road.districts.join(', ')}\nสถานะ: ${road.severity === 'avoid' ? 'หลีกเลี่ยง' : 'ขับช้าระวัง'} (${road.delayMinutes ? '+' + road.delayMinutes + ' นาที' : 'ไม่ระบุเวลา'})\nหมายเหตุ: ${road.note || '-'}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        notify(`คัดลอกข้อมูล ${road.name} แล้ว`);
      });
    }
  }

  // --- Road Card Component ---
  function card(road, rank) {
    const li = node('li', 'road-card');
    li.id = 'road-' + road.id;
    li.dataset.severity = road.severity;
    li.tabIndex = -1;

    const bar = node('span', 'road-bar');
    bar.setAttribute('aria-hidden', 'true');

    const body = node('div', 'road-body');
    const title = node('h3', 'road-name');
    const number = node('span', 'road-num', rank);
    title.append(number, document.createTextNode(road.name));
    body.append(title, node('p', 'segment', road.segment || ''));

    const meta = node('div', 'metadata');
    road.districts.forEach(d => meta.append(node('span', 'district-chip', 'เขต' + d)));
    if (road.note) meta.append(node('span', 'flag', '⚠️ ' + road.note));
    body.append(meta);

    const side = node('div', 'road-side');
    const tag = node('span', 'tag ' + road.severity, road.severity === 'avoid' ? '⛔ หลีกเลี่ยง' : '⚠️ ระวัง');

    const delay = node('span', 'delay');
    if (road.delayMinutes !== null) {
      delay.append('ช้ากว่าปกติ ', node('b', '', road.delayMinutes), ' นาที');
    } else {
      delay.textContent = 'ไม่ระบุเวลาล่าช้า';
    }

    const cardActions = node('div', 'card-actions');

    // Locate button (view on map)
    const btnLocate = node('button', 'btn-locate', '📍 ซูมดู');
    btnLocate.type = 'button';
    btnLocate.title = 'ซูมดูตำแหน่งบนแผนที่';
    btnLocate.addEventListener('click', e => {
      e.stopPropagation();
      locateOnMap(road.id);
    });

    // Copy road button
    const btnCopy = node('button', 'btn-locate', '📋');
    btnCopy.type = 'button';
    btnCopy.title = 'คัดลอกข้อมูลถนนนี้';
    btnCopy.addEventListener('click', e => {
      e.stopPropagation();
      copyRoadText(road);
    });

    // Google Maps link with live traffic layer
    const link = node('a', 'maps-link', '🚦 จราจรสด ↗');
    const query = road.name.replace(/\s*\([^)]*\)/g, '') + ' ' + (road.districts[0] || '') + ' กรุงเทพ';
    link.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query) + '&layer=t';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'ดูสภาพการจราจรสด ' + road.name + ' ใน Google Maps');

    cardActions.append(btnLocate, btnCopy, link);
    side.append(tag, delay, cardActions);
    li.append(bar, body, side);

    // Two-way interaction: Hovering card highlights map
    li.addEventListener('mouseenter', () => highlightOnMap(road.id, true));
    li.addEventListener('mouseleave', () => highlightOnMap(road.id, false));

    return li;
  }

  function fillList(id, values, empty) {
    const list = $(id);
    if (!list) return;
    list.replaceChildren(...(values.length ? values : [empty]).map(text => node('li', '', text)));
  }

  // --- Live Clock & Real-time Management ---
  function updateLiveClock() {
    const now = new Date();
    const observedEl = $('observed');
    if (!observedEl) return;
    observedEl.dateTime = now.toISOString();
    observedEl.textContent = new Intl.DateTimeFormat('th-TH', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'Asia/Bangkok'
    }).format(now) + ' น. (สด)';
  }

  function setDisplayMode() {
    currentDisplayMode = 'live';

    const heroTitle = $('hero-title');
    const leadText = $('lead-text');
    const topAlertTitle = $('top-alert-title');
    const stampLabel = $('stamp-label');
    const ageEl = $('age');

    if (heroTitle) {
      heroTitle.innerHTML = `เช็กถนนและสภาพจราจร กทม. แบบ Real-Time<br><span class="accent" id="total">${snapshot.roads.length} เส้น</span> จุดเฝ้าระวังน้ำท่วมขัง`;
    }
    if (leadText) {
      leadText.textContent = 'สำรวจ 31 จุดเฝ้าระวังน้ำท่วมซ้ำซากทั่วกรุง ซูมดูถนนจริง สี่แยก คลอง และทางด่วนได้ แตะเส้นทางเพื่อดูข้อมูลเชิงลึก พร้อมกดเปิด Google Maps สภาพจราจรสดและเรดาร์ตรวจฝนได้ทันที';
    }
    if (topAlertTitle) {
      topAlertTitle.textContent = '🔥 จุดเฝ้าระวังสำคัญที่มีประวัติน้ำท่วมขังสูง (Top Watchlist)';
    }
    if (stampLabel) stampLabel.textContent = 'เวลาตรวจสอบสด:';
    if (ageEl) {
      ageEl.className = 'age-badge badge-live';
      ageEl.textContent = '🟢 สด (Live Real-Time)';
    }
    updateLiveClock();
  }

  // --- Metadata & Header Statistics ---
  function metadata() {
    updateLiveClock();

    $('source-text').textContent = snapshot.source;

    // Animated count values
    const avoidCount = snapshot.roads.filter(r => r.severity === 'avoid').length;
    const cautionCount = snapshot.roads.filter(r => r.severity === 'caution').length;

    animateValue($('total'), 0, snapshot.roads.length);
    $('total').textContent = snapshot.roads.length + ' เส้น';
    animateValue($('all-avoid'), 0, avoidCount);
    animateValue($('all-caution'), 0, cautionCount);

    fillList('closure-list', snapshot.roads.filter(r => r.note).map(r => r.name + ' — ' + r.note), 'ไม่มีหมายเหตุถนนในบันทึกนี้');
    fillList('changes-list', snapshot.changes, 'ยังไม่มีข้อมูลเปรียบเทียบ');
    fillList('normal-list', snapshot.normalRoutes, 'ยังไม่มีเส้นทางปกติที่บันทึกไว้');

    renderTopCritical();
    renderZoneMeter();
  }

  function refreshLiveData() {
    updateLiveClock();
    notify('🔄 รีเฟรชเวลาตรวจสอบสดล่าสุดแล้ว');
  }

  // ==========================================================================
  // REAL-WORLD LEAFLET INTERACTIVE MAP IMPLEMENTATION (100% Free, No Watermark)
  // ==========================================================================

  function initLeafletMap() {
    if (typeof L === 'undefined') {
      setMapMode('svg');
      $('btn-mode-real').style.display = 'none';
      $('btn-mode-sat').style.display = 'none';
      return;
    }

    try {
      leafletMap = L.map('leaflet-map', {
        center: [13.7563, 100.56],
        zoom: 11,
        minZoom: 9,
        maxZoom: 19,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // Default basemap: Esri World Street Map (Zero API Key, No 403 Blocks, No Watermark)
      leafletTileLayer = L.tileLayer(STREET_TILE_URL, {
        attribution: STREET_ATTRIBUTION,
        maxZoom: 19
      }).addTo(leafletMap);

      let tileErrorCount = 0;
      let hasSwitchedToBackup = false;
      leafletTileLayer.on('tileerror', function() {
        tileErrorCount++;
        if (tileErrorCount >= 4 && !hasSwitchedToBackup && activeMapMode === 'real') {
          hasSwitchedToBackup = true;
          console.warn('Esri Street Map connection issue. Switched to OpenStreetMap mirror.');
          leafletTileLayer.setUrl(BACKUP_STREET_TILE_URL);
          leafletTileLayer.options.attribution = BACKUP_STREET_ATTRIBUTION;
        }
      });

      leafletRoadCasingsGroup = L.layerGroup().addTo(leafletMap);
      leafletRoadLinesGroup = L.layerGroup().addTo(leafletMap);
      leafletMarkersGroup = L.layerGroup().addTo(leafletMap);

      leafletMap.fitBounds(BKK_DEFAULT_BOUNDS, { padding: [15, 15] });

      setTimeout(() => leafletMap.invalidateSize(), 300);
    } catch (e) {
      console.warn('Leaflet initialization failed, falling back to SVG:', e);
      setMapMode('svg');
    }
  }

  function setTileSource(type) {
    if (!leafletTileLayer) return;
    const mapEl = $('leaflet-map');
    if (type === 'sat') {
      leafletTileLayer.setUrl(SAT_TILE_URL);
      leafletTileLayer.options.attribution = SAT_ATTRIBUTION;
      mapEl.classList.add('satellite-active');
    } else {
      leafletTileLayer.setUrl(STREET_TILE_URL);
      leafletTileLayer.options.attribution = STREET_ATTRIBUTION;
      mapEl.classList.remove('satellite-active');
    }
  }

  function renderLeafletRoads(shownSet, ranks) {
    if (!leafletMap) return;

    leafletRoadCasingsGroup.clearLayers();
    leafletRoadLinesGroup.clearLayers();
    leafletMarkersGroup.clearLayers();
    leafletPolylineMap.clear();
    leafletMarkerMap.clear();

    const isDark = document.documentElement.dataset.theme === 'dark';
    const casingColor = isDark && activeMapMode !== 'sat' ? '#0f172a' : '#ffffff';

    snapshot.roads.forEach(r => {
      const isVisible = shownSet.has(r.id);
      const color = r.severity === 'avoid' ? '#e11d48' : '#f59e0b';
      const rank = ranks.get(r.id) || 1;

      // Outer Casing Polyline
      const casing = L.polyline(r.coordinates, {
        color: casingColor,
        weight: r.severity === 'avoid' ? 10 : 8,
        opacity: isVisible ? 0.95 : 0.2,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false
      });
      leafletRoadCasingsGroup.addLayer(casing);

      // Inner Colored Route Line
      const line = L.polyline(r.coordinates, {
        color: color,
        weight: r.severity === 'avoid' ? 6 : 5,
        opacity: isVisible ? 0.95 : 0.2,
        lineCap: 'round',
        lineJoin: 'round'
      });

      // Tooltip on line hover
      line.bindTooltip(`
        <strong>${r.name}</strong><br>
        <span style="font-size:11px;">${r.severity === 'avoid' ? '⛔ หลีกเลี่ยง' : '⚠️ ระวัง'} ${r.delayMinutes ? '(+' + r.delayMinutes + ' นาที)' : ''}</span>
      `, { sticky: true, opacity: 0.95 });

      line.on('click', () => go(r.id));
      line.on('mouseover', () => {
        if (!isVisible) return;
        line.setStyle({ weight: 9, opacity: 1 });
        highlightOnMap(r.id, true);
      });
      line.on('mouseout', () => {
        line.setStyle({ weight: r.severity === 'avoid' ? 6 : 5, opacity: isVisible ? 0.95 : 0.2 });
        highlightOnMap(r.id, false);
      });

      leafletRoadLinesGroup.addLayer(line);
      leafletPolylineMap.set(r.id, line);

      // Marker Badge at midpoint
      const k = Math.floor((r.coordinates.length - 1) / 2);
      const a = r.coordinates[k];
      const b = r.coordinates[k + 1] || a;
      const midCoord = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

      const markerHtml = `
        <div class="leaflet-road-marker ${r.severity} ${isVisible ? '' : 'faded'}" id="leaflet-marker-${r.id}">
          <span>${rank}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(midCoord, { icon: customIcon });

      // Popup Content
      const query = r.name.replace(/\s*\([^)]*\)/g, '') + ' ' + (r.districts[0] || '') + ' กรุงเทพ';
      const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);

      const popupContent = `
        <div class="popup-road-card">
          <div class="popup-road-title">${rank}. ${r.name}</div>
          <div class="popup-road-meta">
            ${r.segment ? r.segment + '<br>' : ''}
            เขต: ${r.districts.join(', ')}<br>
            สถานะ: <strong>${r.severity === 'avoid' ? 'หลีกเลี่ยง' : 'ขับช้าระวัง'}</strong>
            ${r.delayMinutes ? `(+${r.delayMinutes} นาที)` : ''}
            ${r.note ? `<br><span style="color:#e11d48;">⚠️ ${r.note}</span>` : ''}
          </div>
          <div style="display:flex; gap:6px; margin-top:6px;">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="popup-road-btn">
              Google Maps ↗
            </a>
          </div>
        </div>
      `;
      marker.bindPopup(popupContent, { maxWidth: 260 });

      marker.on('click', () => go(r.id));
      leafletMarkersGroup.addLayer(marker);
      leafletMarkerMap.set(r.id, marker);
    });
  }

  function fitMapToZone(zoneName) {
    if (!leafletMap || activeMapMode === 'svg') return;

    if (zoneName === 'all') {
      leafletMap.fitBounds(BKK_DEFAULT_BOUNDS, { padding: [15, 15], animate: true, duration: 0.8 });
      return;
    }

    const filtered = snapshot.roads.filter(r => r.zone === zoneName);
    if (!filtered.length) return;

    const coords = filtered.flatMap(r => r.coordinates);
    const bounds = L.latLngBounds(coords);
    leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 13, animate: true, duration: 1 });
  }

  function resetMapView() {
    if (leafletMap && activeMapMode !== 'svg') {
      leafletMap.fitBounds(BKK_DEFAULT_BOUNDS, { padding: [15, 15], animate: true, duration: 0.8 });
    }
  }

  // Set Multi Map Mode: 'real' (OSM), 'sat' (Satellite), 'svg' (Schematic)
  function setMapMode(mode) {
    activeMapMode = mode;
    write(MAP_MODE_KEY, mode);

    const isSvg = mode === 'svg';
    $('leaflet-map').style.display = isSvg ? 'none' : 'block';
    $('map').style.display = isSvg ? 'block' : 'none';

    $('btn-mode-real').classList.toggle('active', mode === 'real');
    $('btn-mode-sat').classList.toggle('active', mode === 'sat');
    $('btn-mode-svg').classList.toggle('active', mode === 'svg');

    $('map-zoom-hint').style.display = isSvg ? 'none' : 'inline-block';

    if (mode === 'real') {
      $('map-mode-label').textContent = 'แผนที่ถนนความละเอียดสูง (ESRI STREET MAP • ไม่มีลายน้ำ)';
      setTileSource('real');
    } else if (mode === 'sat') {
      $('map-mode-label').textContent = 'ภาพถ่ายดาวเทียมความละเอียดสูง (ESRI WORLD IMAGERY)';
      setTileSource('sat');
    } else {
      $('map-mode-label').textContent = 'ผังแผนที่เชิงเรขาคณิต (SCHEMATIC MAP)';
    }

    if (!isSvg && leafletMap) {
      leafletMap.invalidateSize();
    }
  }

  $('btn-mode-real').addEventListener('click', () => setMapMode('real'));
  $('btn-mode-sat').addEventListener('click', () => setMapMode('sat'));
  $('btn-mode-svg').addEventListener('click', () => setMapMode('svg'));
  $('btn-reset-map-view').addEventListener('click', resetMapView);

  // ==========================================================================
  // SCHEMATIC SVG MAP (FALLBACK / ALTERNATIVE VIEW)
  // ==========================================================================

  const river = [
    [13.94, 100.505], [13.86, 100.498], [13.82, 100.510], [13.80, 100.515],
    [13.775, 100.505], [13.755, 100.492], [13.735, 100.494], [13.72, 100.510],
    [13.705, 100.527], [13.692, 100.540], [13.696, 100.557], [13.700, 100.575],
    [13.686, 100.583], [13.668, 100.567], [13.652, 100.552], [13.62, 100.556]
  ];

  const context = [
    [[13.744, 100.557], [13.722, 100.585], [13.705, 100.601], [13.681, 100.609], [13.64, 100.62]],
    [[13.733, 100.515], [13.722, 100.555], [13.713, 100.590]],
    [[13.757, 100.566], [13.752, 100.600], [13.748, 100.640]],
    [[13.765, 100.548], [13.803, 100.558], [13.845, 100.565], [13.887, 100.579]],
    [[13.873, 100.605], [13.845, 100.660], [13.815, 100.720], [13.806, 100.720]],
    [[13.766, 100.643], [13.790, 100.690], [13.806, 100.720]],
    [[13.722, 100.475], [13.716, 100.40]],
    [[13.780, 100.492], [13.780, 100.40]],
    [[13.690, 100.480], [13.668, 100.455], [13.645, 100.425]],
    [[13.67, 100.62], [13.66, 100.70], [13.66, 100.80]]
  ];

  const districts = [
    ['ฝั่งธนบุรี', 13.825, 100.437], ['ดอนเมือง', 13.924, 100.585],
    ['หลักสี่', 13.878, 100.530], ['บางเขน', 13.865, 100.635],
    ['จตุจักร', 13.830, 100.53], ['ลาดพร้าว', 13.831, 100.617],
    ['ห้วยขวาง', 13.782, 100.594], ['ดินแดง', 13.787, 100.535],
    ['ปทุมวัน', 13.733, 100.525], ['บางกะปิ', 13.778, 100.661],
    ['สวนหลวง', 13.718, 100.617], ['ประเวศ', 13.690, 100.678],
    ['บางนา', 13.655, 100.61], ['มีนบุรี', 13.839, 100.745],
    ['ลาดกระบัง', 13.750, 100.775]
  ];

  function svgNode(tag, attributes = {}, text) {
    const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attributes)) e.setAttribute(key, String(value));
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function drawMap(shown, ranks) {
    // 1. Render Real Leaflet Map
    if (leafletMap) {
      renderLeafletRoads(shown, ranks);
    }

    // 2. Render SVG Schematic Map
    const points = snapshot.roads.flatMap(r => r.coordinates);
    const west = Math.min(100.38, ...points.map(p => p[1] - 0.012));
    const east = Math.max(100.82, ...points.map(p => p[1] + 0.012));
    const south = Math.min(13.62, ...points.map(p => p[0] - 0.012));
    const north = Math.max(13.94, ...points.map(p => p[0] + 0.012));

    const project = ([lat, lng]) => [
      ((lng - west) / (east - west)) * 840,
      ((north - lat) / (north - south)) * 640
    ];

    const path = coords => coords.map((p, i) => (i ? 'L' : 'M') + project(p).map(v => v.toFixed(1)).join(',')).join(' ');

    const svg = $('map');
    svg.replaceChildren();

    const defs = svgNode('defs');
    const riverGrad = svgNode('linearGradient', { id: 'riverGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    riverGrad.append(
      svgNode('stop', { offset: '0%', 'stop-color': 'var(--river-grad-1)' }),
      svgNode('stop', { offset: '100%', 'stop-color': 'var(--river-grad-2)' })
    );
    defs.append(riverGrad);
    svg.append(defs);

    svg.append(svgNode('title', {}, 'แผนผังถนนกรุงเทพฯ คลิกหมายเลขเพื่ออ่านรายละเอียด'));

    context.forEach(coords => {
      svg.append(svgNode('path', {
        d: path(coords),
        fill: 'none',
        stroke: 'var(--context)',
        'stroke-width': 2.5,
        'stroke-linecap': 'round'
      }));
    });

    svg.append(svgNode('path', {
      d: path(river),
      fill: 'none',
      stroke: 'url(#riverGrad)',
      'stroke-width': 11,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }));

    districts.forEach(([name, lat, lng]) => {
      const [x, y] = project([lat, lng]);
      svg.append(svgNode('text', { x, y, class: 'map-label', 'text-anchor': 'middle' }, name));
    });

    [
      ['✈ ท่าอากาศยานดอนเมือง', 13.908, 100.627],
      ['✈ ท่าอากาศยานสุวรรณภูมิ', 13.688, 100.764]
    ].forEach(([name, lat, lng]) => {
      const [x, y] = project([lat, lng]);
      svg.append(svgNode('text', { x, y, class: 'map-landmark', 'text-anchor': 'middle' }, name));
    });

    svg.append(svgNode('text', { x: 805, y: 32, fill: 'var(--muted)', 'font-size': 13, 'font-weight': 'bold', 'text-anchor': 'middle' }, 'N ↑'));

    const lines = svgNode('g', { id: 'svg-road-lines' });
    const badges = svgNode('g', { id: 'svg-road-badges' });
    const placed = [];

    const ordered = [...snapshot.roads].sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'caution' ? -1 : 1));

    ordered.forEach(r => {
      const color = r.severity === 'avoid' ? 'var(--red)' : 'var(--amber-line)';
      const faded = !shown.has(r.id);
      const d = path(r.coordinates);

      const group = svgNode('g', { class: (faded ? 'faded' : '') + ' svg-road-group', id: 'svg-road-' + r.id });
      group.append(svgNode('path', { d, class: 'road-line-casing', stroke: 'var(--land)', 'stroke-width': 12, fill: 'none' }));

      const line = svgNode('path', {
        d,
        class: 'road-line',
        id: 'svg-line-' + r.id,
        stroke: color,
        'stroke-width': r.severity === 'avoid' ? 6.5 : 5.5,
        fill: 'none'
      });
      line.append(svgNode('title', {}, `${r.name} · ${r.segment}`));

      line.addEventListener('click', () => go(r.id));
      line.addEventListener('mouseenter', e => showMapTooltip(r, e));
      line.addEventListener('mouseleave', hideMapTooltip);

      group.append(line);
      lines.append(group);

      const k = Math.floor((r.coordinates.length - 1) / 2);
      const a = r.coordinates[k];
      const b = r.coordinates[k + 1] || a;
      const [anchorX, anchorY] = project([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
      let x = anchorX, y = anchorY;

      for (let step = 0; step < 90 && placed.some(p => Math.hypot(p[0] - x, p[1] - y) < 32); step++) {
        const angle = step * 2.4;
        const radius = 12 + step * 0.9;
        x = Math.max(25, Math.min(815, anchorX + Math.cos(angle) * radius));
        y = Math.max(25, Math.min(615, anchorY + Math.sin(angle) * radius));
      }
      placed.push([x, y]);

      if (Math.hypot(x - anchorX, y - anchorY) > 8) {
        lines.append(svgNode('line', {
          x1: anchorX, y1: anchorY, x2: x, y2: y,
          stroke: color,
          'stroke-width': 1.5,
          class: (faded ? 'faded' : '') + ' road-pointer-line'
        }));
      }

      const badge = svgNode('g', {
        class: 'road-marker' + (faded ? ' faded' : ''),
        id: 'svg-marker-' + r.id,
        transform: `translate(${x},${y})`,
        role: 'button',
        tabindex: 0,
        'aria-label': `${ranks.get(r.id)} ${r.name}`,
        'data-road-id': r.id
      });

      badge.append(
        svgNode('circle', { r: 14, fill: color, stroke: 'var(--map-marker-stroke)', 'stroke-width': 2.5 }),
        svgNode('text', { fill: r.severity === 'avoid' ? '#ffffff' : '#35290e' }, ranks.get(r.id))
      );

      badge.addEventListener('click', () => go(r.id));
      badge.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          go(r.id);
        }
      });
      badge.addEventListener('mouseenter', e => showMapTooltip(r, e));
      badge.addEventListener('mouseleave', hideMapTooltip);

      badges.append(badge);
    });

    svg.append(lines, badges);
  }

  // --- SVG Map Tooltip ---
  function showMapTooltip(road, event) {
    clearTimeout(tooltipTimer);
    const tooltip = $('map-tooltip');
    if (!tooltip) return;

    const mapSection = $('map-section');
    const rect = mapSection.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    tooltip.style.left = `${mouseX}px`;
    tooltip.style.top = `${mouseY}px`;
    tooltip.innerHTML = `
      <div class="map-tooltip-title">${road.name}</div>
      <div class="map-tooltip-meta">
        ${road.severity === 'avoid' ? '⛔ หลีกเลี่ยง' : '⚠️ ระวัง'} ·
        ${road.delayMinutes ? '+' + road.delayMinutes + ' นาที' : 'ชะลอตัว'}
        ${road.note ? '<br>📌 ' + road.note : ''}
      </div>
    `;
    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');
  }

  function hideMapTooltip() {
    const tooltip = $('map-tooltip');
    if (!tooltip) return;
    tooltipTimer = setTimeout(() => {
      tooltip.classList.remove('visible');
      tooltip.setAttribute('aria-hidden', 'true');
    }, 100);
  }

  // --- Two-Way Highlight Map <-> Card ---
  function highlightOnMap(id, active) {
    // 1. Highlight on SVG
    const svgMarker = $('svg-marker-' + id);
    const svgLine = $('svg-line-' + id);
    if (svgMarker) svgMarker.classList.toggle('active', active);
    if (svgLine) svgLine.classList.toggle('highlighted-road', active);

    // 2. Highlight on Leaflet
    const leafletMarkerEl = $('leaflet-marker-' + id);
    if (leafletMarkerEl) leafletMarkerEl.classList.toggle('active', active);

    const leafletPolyline = leafletPolylineMap.get(id);
    if (leafletPolyline) {
      if (active) {
        leafletPolyline.setStyle({ weight: 9, opacity: 1 });
        leafletPolyline.bringToFront();
      } else {
        const road = snapshot.roads.find(r => r.id === id);
        leafletPolyline.setStyle({ weight: road?.severity === 'avoid' ? 6 : 5, opacity: 0.95 });
      }
    }
  }

  function locateOnMap(id) {
    const road = snapshot.roads.find(r => r.id === id);
    if (!road) return;

    $('map-section').scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (activeMapMode !== 'svg' && leafletMap) {
      const k = Math.floor((road.coordinates.length - 1) / 2);
      const a = road.coordinates[k];
      const b = road.coordinates[k + 1] || a;
      const midCoord = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

      leafletMap.flyTo(midCoord, 14, { duration: 1.2 });
      setTimeout(() => {
        const marker = leafletMarkerMap.get(id);
        if (marker) marker.openPopup();
        highlightOnMap(id, true);
        setTimeout(() => highlightOnMap(id, false), 2200);
      }, 900);
    } else {
      highlightOnMap(id, true);
      setTimeout(() => highlightOnMap(id, false), 2200);
    }
  }

  // --- Navigation & Flash Selection ---
  function go(id) {
    clearTimeout(flashTimer);
    if (selectedId) $('road-' + selectedId)?.classList.remove('flash');

    if (!$('road-' + id)) resetFilters();
    const targetCard = $('road-' + id);
    if (!targetCard) return;

    selectedId = id;
    targetCard.focus({ preventScroll: true });
    targetCard.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
    targetCard.classList.add('flash');
    highlightOnMap(id, true);

    flashTimer = setTimeout(() => {
      targetCard.classList.remove('flash');
      highlightOnMap(id, false);
    }, 1800);
  }

  // --- Render Function ---
  function render() {
    const ordered = getFilteredAndSortedRoads();
    const allOrdered = [...snapshot.roads].sort((a, b) => (a.severity === b.severity ? ((b.delayMinutes ?? -1) - (a.delayMinutes ?? -1)) : a.severity === 'avoid' ? -1 : 1));
    const ranks = new Map(allOrdered.map((r, i) => [r.id, i + 1]));

    for (const severity of ['avoid', 'caution']) {
      const group = ordered.filter(r => r.severity === severity);
      $(severity + '-count').textContent = group.length + ' เส้น';
      $(severity + '-list').replaceChildren(
        ...(group.length ? group.map(r => card(r, ranks.get(r.id))) : [node('li', 'empty', 'ไม่พบถนนตามเงื่อนไขนี้ ลองเปลี่ยนคำค้นหาหรือตัวกรอง')])
      );
    }

    $('result-count').textContent = `แสดง ${ordered.length} จาก ${snapshot.roads.length} เส้นทาง`;
    $('clear').hidden = !$('search').value;

    drawMap(new Set(ordered.map(r => r.id)), ranks);
  }

  // --- Search & Sorter Event Listeners ---
  $('search').addEventListener('input', render);
  $('clear').addEventListener('click', () => {
    $('search').value = '';
    render();
    $('search').focus();
  });
  $('reset-filters').addEventListener('click', resetFilters);

  $('filter-closure').addEventListener('click', () => {
    filterClosureOnly = !filterClosureOnly;
    $('filter-closure').dataset.active = String(filterClosureOnly);
    render();
  });

  $('filter-delay').addEventListener('click', () => {
    filterDelayOnly = !filterDelayOnly;
    $('filter-delay').dataset.active = String(filterDelayOnly);
    render();
  });

  $('sort-select').addEventListener('change', e => {
    currentSort = e.target.value;
    render();
  });

  $('copy-summary').addEventListener('click', copySummaryToClipboard);

  // Mobile toggle button
  let mobileViewMap = false;
  $('mobile-toggle-btn').addEventListener('click', () => {
    mobileViewMap = !mobileViewMap;
    if (mobileViewMap) {
      $('map-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('mobile-toggle-btn').querySelector('.toggle-icon').textContent = '📋';
      $('mobile-toggle-btn').querySelector('.toggle-text').textContent = 'สลับดูรายการ';
    } else {
      $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('mobile-toggle-btn').querySelector('.toggle-icon').textContent = '🗺️';
      $('mobile-toggle-btn').querySelector('.toggle-text').textContent = 'สลับดูแผนที่';
    }
  });

  // --- Theme Controller ---
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $('theme').setAttribute('aria-label', theme === 'dark' ? 'เปลี่ยนเป็นธีมสว่าง' : 'เปลี่ยนเป็นธีมมืด');
  }

  setTheme(read(THEME_KEY) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  $('theme').addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    write(THEME_KEY, nextTheme);
    render();
  });

  // --- Editor Dialog Management (Form Mode + Raw JSON) ---
  const editorModal = $('editor');
  const tabFormBtn = $('tab-form-btn');
  const tabJsonBtn = $('tab-json-btn');
  const panelForm = $('panel-form');
  const panelJson = $('panel-json');
  const roadSelectEdit = $('road-select-edit');
  const btnDeleteRoad = $('btn-delete-road');

  tabFormBtn.addEventListener('click', () => {
    tabFormBtn.classList.add('active');
    tabFormBtn.setAttribute('aria-selected', 'true');
    tabJsonBtn.classList.remove('active');
    tabJsonBtn.setAttribute('aria-selected', 'false');
    panelForm.hidden = false;
    panelJson.hidden = true;
    syncWorkingFromJson();
    populateRoadSelect();
  });

  tabJsonBtn.addEventListener('click', () => {
    tabJsonBtn.classList.add('active');
    tabJsonBtn.setAttribute('aria-selected', 'true');
    tabFormBtn.classList.remove('active');
    tabFormBtn.setAttribute('aria-selected', 'false');
    panelJson.hidden = false;
    panelForm.hidden = true;
    $('json-editor').value = JSON.stringify(workingSnapshot, null, 2);
  });

  function syncWorkingFromJson() {
    try {
      const parsed = JSON.parse($('json-editor').value);
      workingSnapshot = validate(parsed);
      $('editor-error').textContent = '';
    } catch (e) {
      // Keep workingSnapshot intact if JSON is invalid
    }
  }

  function populateRoadSelect() {
    roadSelectEdit.replaceChildren();
    const newOpt = node('option', '', '+ เพิ่มถนนเส้นใหม่');
    newOpt.value = 'new';
    roadSelectEdit.append(newOpt);

    workingSnapshot.roads.forEach(r => {
      const opt = node('option', '', `${r.name} (${r.districts.join(', ')})`);
      opt.value = r.id;
      roadSelectEdit.append(opt);
    });

    roadSelectEdit.value = 'new';
    clearRoadForm();
    btnDeleteRoad.style.display = 'none';
  }

  function clearRoadForm() {
    $('form-road-id').value = '';
    $('form-road-id').disabled = false;
    $('form-road-name').value = '';
    $('form-road-segment').value = '';
    $('form-road-districts').value = '';
    $('form-road-zone').value = 'central';
    $('form-road-severity').value = 'avoid';
    $('form-road-delay').value = '';
    $('form-road-note').value = '';
    $('form-road-coords').value = '';
    $('btn-save-road-item').textContent = 'เพิ่มถนนนี้เข้าสู่รายการ';
  }

  roadSelectEdit.addEventListener('change', () => {
    const selId = roadSelectEdit.value;
    if (selId === 'new') {
      clearRoadForm();
      btnDeleteRoad.style.display = 'none';
    } else {
      const r = workingSnapshot.roads.find(road => road.id === selId);
      if (!r) return;
      $('form-road-id').value = r.id;
      $('form-road-id').disabled = true;
      $('form-road-name').value = r.name;
      $('form-road-segment').value = r.segment || '';
      $('form-road-districts').value = r.districts.join(', ');
      $('form-road-zone').value = r.zone;
      $('form-road-severity').value = r.severity;
      $('form-road-delay').value = r.delayMinutes !== null ? r.delayMinutes : '';
      $('form-road-note').value = r.note || '';
      $('form-road-coords').value = JSON.stringify(r.coordinates);
      $('btn-save-road-item').textContent = 'บันทึกการแก้ไขถนนนี้';
      btnDeleteRoad.style.display = 'inline-block';
    }
  });

  $('road-form').addEventListener('submit', e => {
    e.preventDefault();
    try {
      const rId = $('form-road-id').value.trim();
      const rName = $('form-road-name').value.trim();
      const rSeg = $('form-road-segment').value.trim();
      const rDist = $('form-road-districts').value.split(',').map(s => s.trim()).filter(Boolean);
      const rZone = $('form-road-zone').value;
      const rSev = $('form-road-severity').value;
      const rDelay = $('form-road-delay').value.trim() !== '' ? parseInt($('form-road-delay').value, 10) : null;
      const rNote = $('form-road-note').value.trim();

      let coords = [];
      const coordsRaw = $('form-road-coords').value.trim();
      if (coordsRaw) {
        coords = JSON.parse(coordsRaw);
      } else {
        coords = [[13.75, 100.5], [13.76, 100.51]];
      }

      const roadObj = {
        id: rId,
        name: rName,
        segment: rSeg,
        districts: rDist,
        zone: rZone,
        severity: rSev,
        delayMinutes: rDelay,
        note: rNote,
        coordinates: coords
      };

      const existingIndex = workingSnapshot.roads.findIndex(r => r.id === rId);
      if (existingIndex >= 0) {
        workingSnapshot.roads[existingIndex] = roadObj;
      } else {
        workingSnapshot.roads.push(roadObj);
      }

      validate(workingSnapshot);
      $('json-editor').value = JSON.stringify(workingSnapshot, null, 2);
      populateRoadSelect();
      roadSelectEdit.value = rId;
      $('editor-error').textContent = 'บันทึกถนนสำเร็จ อย่าลืมกด "บันทึกทั้งหมดลงเบราว์เซอร์"';
    } catch (err) {
      $('editor-error').textContent = err.message;
    }
  });

  btnDeleteRoad.addEventListener('click', () => {
    const selId = roadSelectEdit.value;
    if (selId === 'new') return;
    if (confirm(`คุณต้องการลบถนน "${$('form-road-name').value}" ออกจากรายการใช่หรือไม่?`)) {
      workingSnapshot.roads = workingSnapshot.roads.filter(r => r.id !== selId);
      $('json-editor').value = JSON.stringify(workingSnapshot, null, 2);
      populateRoadSelect();
      $('editor-error').textContent = 'ลบถนนเรียบร้อยแล้ว';
    }
  });

  $('manage').addEventListener('click', () => {
    workingSnapshot = clone(snapshot);
    $('json-editor').value = JSON.stringify(snapshot, null, 2);
    $('editor-error').textContent = '';
    populateRoadSelect();
    editorModal.showModal();
  });

  $('close-editor').addEventListener('click', () => editorModal.close());

  $('btn-save-all').addEventListener('click', () => {
    try {
      let candidate;
      if (!panelJson.hidden) {
        candidate = validate(JSON.parse($('json-editor').value));
      } else {
        candidate = validate(workingSnapshot);
      }
      if (!write(STORAGE, JSON.stringify(candidate))) {
        throw new Error('เบราว์เซอร์ไม่อนุญาตให้บันทึก (Quota หรือ Private Mode) กรุณาดาวน์โหลดสำรองแทน');
      }
      snapshot = clone(candidate);
      metadata();
      render();
      editorModal.close();
      notify('บันทึกข้อมูลทั้งหมดลงในเบราว์เซอร์นี้แล้ว');
    } catch (err) {
      $('editor-error').textContent = err.message;
    }
  });

  $('btn-reset-default').addEventListener('click', () => {
    if (confirm('คุณต้องการรีเซ็ตข้อมูลกลับเป็นค่าตัวอย่างเริ่มต้นใช่หรือไม่? ข้อมูลที่คุณแก้ไขในเบราว์เซอร์จะถูกแทนที่')) {
      workingSnapshot = clone(window.DEFAULT_SNAPSHOT);
      $('json-editor').value = JSON.stringify(workingSnapshot, null, 2);
      populateRoadSelect();
      $('editor-error').textContent = 'คืนค่าเริ่มต้นแล้ว กรุณากด "บันทึกทั้งหมดลงเบราว์เซอร์" เพื่อยืนยัน';
    }
  });

  $('export').addEventListener('click', () => {
    try {
      syncWorkingFromJson();
      const candidate = validate(workingSnapshot);
      const blob = new Blob([JSON.stringify(candidate, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = node('a');
      a.href = url;
      a.download = `bangkok-roads-${candidate.observedAt.slice(0, 10)}.json`;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      $('editor-error').textContent = '';
      notify('ดาวน์โหลดไฟล์สำรองเรียบร้อย');
    } catch (err) {
      $('editor-error').textContent = err.message;
    }
  });

  $('import').addEventListener('click', () => $('import-file').click());
  $('import-file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('ไฟล์มีขนาดใหญ่เกิน 2 MB');
      const data = validate(JSON.parse(await file.text()));
      workingSnapshot = clone(data);
      $('json-editor').value = JSON.stringify(data, null, 2);
      populateRoadSelect();
      $('editor-error').textContent = 'นำเข้าไฟล์สำเร็จแล้ว ตรวจสอบข้อมูลแล้วกดบันทึก';
      notify('นำเข้าข้อมูลสำเร็จ');
    } catch (err) {
      $('editor-error').textContent = err.message;
    } finally {
      e.target.value = '';
    }
  });

  // --- Event Listeners for Live Refresh ---
  $('btn-refresh-live')?.addEventListener('click', refreshLiveData);
  $('btn-refresh-top')?.addEventListener('click', refreshLiveData);

  // --- Initial Mount & Execution ---
  initLeafletMap();
  setMapMode(activeMapMode);
  setDisplayMode(currentDisplayMode);
  metadata();
  render();
  setInterval(metadata, 60000);
  setInterval(updateLiveClock, 1000);

  if (invalidSaved) {
    notify('ข้อมูลที่เคยบันทึกไม่ถูกต้อง จึงเปิดข้อมูลตัวอย่างแทน');
  }
})();

---
name: leaflet-webmap-troubleshooting
description: >-
  Troubleshooting, resilient basemap architecture, live data integration, and deployment
  workflow for Leaflet web maps, real-time weather radar dashboards, and static GIS applications.
  Use when diagnosing tile errors (such as 'Zoom Level Not Supported'), replacing fragile
  third-party radar/traffic tile APIs with official external portals and high-res Esri basemaps,
  purging stale client-side localStorage state, enforcing cache-busting on GitHub Pages, and
  synchronizing standalone single-file builds.
---

# Leaflet Web Map Troubleshooting & Deployment Pipeline

A comprehensive reference and operational procedure for diagnosing, debugging, hardening, and deploying interactive Leaflet web maps, live weather radar monitors, and GIS applications hosted on static environments (such as GitHub Pages).

---

## 1. Overview & Common Failure Modes

Leaflet applications deployed on static web hosts commonly suffer from three primary categories of failure:

1. **Third-Party Tile Deprecation & Zoom Clamping:**
   - Free raster tile services (e.g., RainViewer, OpenStreetMap public tiles, Mapbox free tiers) frequently introduce strict zoom level caps (e.g., capping public tiles at zoom $\le 7$).
   - When users zoom into city street levels (zoom 11–19), the server returns placeholder error PNGs with burned-in watermarks (such as `"Zoom Level Not Supported"`), polluting the map canvas with gray boxes.
2. **Client-Side Cache & LocalStorage Lag:**
   - If an application saves user preferences in `localStorage` (such as `radarActive: true`), existing visitors will automatically re-activate deprecated or broken tile layers upon revisiting the site, even if the default was changed in the codebase.
   - Static hosting platforms (like GitHub Pages and Cloudflare) apply strong caching headers, causing browsers to serve stale JavaScript bundles without cache-busting.
3. **Standalone Single-File Desynchronization:**
   - When projects maintain both a modular multi-file structure (`index.html`, `styles.css`, `data.js`, `app.js`) and an offline single-file bundle (`standalone.html`), editing only the modular files leaves `standalone.html` outdated.

---

## 2. Standard Resilient Architecture

### A. Recommended High-Availability Basemaps

Avoid unauthenticated or rate-limited tile layers. Standardize on battle-tested Esri and CartoDB basemap providers that provide full zoom ranges (0–19), high performance, zero watermark boxes, and support both HTTP/HTTPS and `file:///` protocols:

```javascript
// 1. Esri World Street Map (Clean, high-detail city streets, roads, and waterways)
const esriStreetLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
  }
);

// 2. Esri World Imagery (High-resolution satellite view)
const esriSatelliteLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
);

// 3. CartoDB Positron / Dark Matter (For specialized UI themes)
const cartoDarkLayer = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  {
    subdomains: 'abcd',
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
);
```

### B. Live Weather Radar: The Authoritative Portal Link Strategy

Attempting to reverse-engineer or embed fragile third-party weather radar tile layers into client-side Leaflet canvases frequently breaks when upstream APIs restrict rate limits or zoom thresholds. 

**Best Practice:**
- Instead of brittle raster overlays on street-level maps, implement **direct 1-click external action buttons** in the quick tools bar that launch the official, authoritative government portal:
  - **Bangkok BMA Radar:** `https://weather.bangkok.go.th/radar/` (Official Nong Chok & Nong Khaem radar stations, Department of Drainage and Sewerage).
  - **Thai TMD Radar:** `https://weather.tmd.go.th/`
  - **Google Maps Live Traffic:** `https://www.google.com/maps/@{lat},{lng},{zoom}z/data=!5m1!1e1`

```html
<!-- Live Quick Tools Bar Example -->
<div class="live-quick-bar" id="live-quick-bar">
  <span class="quick-title">⚡ ตรวจสอบสด:</span>
  <a href="https://weather.bangkok.go.th/radar/" target="_blank" rel="noopener noreferrer" class="button button-radar-link quick-link" title="เปิดเรดาร์ตรวจจับกลุ่มฝนสด กรุงเทพมหานคร (สถานีหนองจอก-หนองแขม)">
    🌧️ เรดาร์ฝน กทม. สด ↗
  </a>
  <a href="https://www.google.com/maps/@13.7563,100.5018,12z/data=!5m1!1e1" target="_blank" rel="noopener noreferrer" class="button button-subtle quick-link" title="เปิดแผนที่ Google Maps สภาพการจราจรสด">
    🚦 Google Maps จราจรสด ↗
  </a>
</div>
```

---

## 3. Step-by-Step Troubleshooting & Maintenance Workflow

### Step 1: Diagnose Broken Tile Layers
When reported that a map exhibits "Zoom Level Not Supported" or broken tile images:
1. Open DevTools Network tab and filter by `png`, `jpg`, or `/tile/`.
2. Inspect the HTTP status and response payload. If the server returns HTTP 200 with an image containing an error message or HTTP 403/429, the upstream tile provider has enforced rate limits or zoom level restrictions.
3. If the layer is a non-essential overlay (e.g. weather radar), eliminate the raster tile overlay completely rather than trying to patch `maxNativeZoom`.

### Step 2: Purge Legacy LocalStorage Keys
When removing or changing a feature that users might have toggled on previously, always add an explicit purge script on app mount:

```javascript
// Purge deprecated settings from previous versions
try {
  localStorage.removeItem('bangkok-road-watch.radaractive');
  localStorage.removeItem('bangkok-road-watch.legacy-layer');
} catch (e) {
  console.warn('LocalStorage migration warning:', e);
}
```

### Step 3: Implement Cache-Busting on Static Hosting
GitHub Pages caches static assets. Whenever JavaScript or CSS is updated, increment the version query parameter in `index.html`:

```html
<!-- Cache-busting version query string -->
<link rel="stylesheet" href="styles.css?v=3.0">
...
<script src="data.js?v=3.0"></script>
<script src="app.js?v=3.0"></script>
```

### Step 4: Synchronize Standalone Single-File Bundle
If the repository provides a standalone offline version (e.g., `build_standalone.py`), run it immediately:

```bash
python build_standalone.py
```

Verify that `standalone.html` compiles cleanly and contains the updated CSS and JS.

### Step 5: Verification & Syntax Checks
Before committing:
1. **JavaScript Syntax Check:**
   ```bash
   node -c data.js; node -c app.js
   ```
2. **Search for Stale References:**
   ```bash
   git grep -i "rainviewer" projects/bangkokflood/
   ```
   Ensure no obsolete API endpoints or unused variables remain.

### Step 6: Atomic Git Deployment
Stage **only** the relevant project folder, commit with a semantic commit message, and push to `origin main`:

```bash
git add projects/bangkokflood/
git commit -m "fix(bangkokflood): remove faulty radar tile layer and link directly to official BMA radar"
git push origin main
```

---

## 4. Common Mistakes & Pitfalls

- ❌ **Relying on `maxNativeZoom` to rescue restricted tile layers:** Even if Leaflet scales lower-zoom tiles up, if users pan or zoom rapidly, or if the server changes tile policies, broken tiles can still leak through. For critical dashboards, use official portal links instead.
- ❌ **Forgetting client-side LocalStorage:** Changing default code to `active = false` does not help users whose browsers have already stored `true`. Always add explicit `localStorage.removeItem()` migrations.
- ❌ **Omitting Cache-Busting (`?v=X.X`):** Users testing immediately after a GitHub push will often see cached versions of old JS/CSS files unless version strings are updated.
- ❌ **Forgetting to rebuild `standalone.html`:** Always run `python build_standalone.py` to maintain 100% parity between modular source files and offline distribution files.

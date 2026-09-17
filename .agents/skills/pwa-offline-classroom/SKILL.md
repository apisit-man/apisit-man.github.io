---
name: pwa-offline-classroom
description: >-
  Transform web simulations, 3D showcases, and educational games into installable, 100% offline-ready
  Progressive Web Apps (PWAs). Use when configuring Service Workers, web app manifests, caching Three.js
  assets/models/audio, or supporting offline classrooms on school tablets and Chromebooks.
---

# PWA & Offline Classroom Architecture Guide

This skill provides step-by-step implementations for transforming web applications in this repository into reliable Progressive Web Apps that operate completely without an internet connection in remote or low-bandwidth classrooms.

---

## 1. Web App Manifest (`manifest.webmanifest`)

Place this in the app root and link via `<link rel="manifest" href="manifest.webmanifest">`:

```json
{
  "name": "Physics Simulation Suite - Dr. Apisit",
  "short_name": "PhysicsSim",
  "description": "Interactive Physics and STEM Simulations for Science Classrooms",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#7c3aed",
  "orientation": "any",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## 2. Production Service Worker (`sw.js`)

A dual caching strategy:
* **Cache-First**: Heavy binary assets (GLB models, Draco decoders, KaTeX fonts, sound clips, Three.js modules).
* **Network-First with Cache Fallback**: Core HTML pages and dynamic quiz definitions.

```javascript
const CACHE_NAME = 'edtech-cache-v1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  // Offline Draco & Three.js dependencies
  './draco/draco_decoder.wasm',
  './draco/draco_decoder.js',
  './draco/draco_wasm_wrapper.js',
  // KaTeX assets if used locally
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js'
];

// Install: Cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: Cache-first for models & assets, Network-first for docs
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first for large static assets (3D models, wasm, audio)
  if (url.pathname.endsWith('.glb') || url.pathname.endsWith('.wasm') || url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
```

---

## 3. Registering Service Worker & In-App Install Prompt

In your `app.js` or `index.html`:

```javascript
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
      .catch((err) => console.warn('Service Worker registration failed:', err));
  });
}

// In-app Install Button UI
let deferredPrompt = null;
const installBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'flex';
    installBtn.addEventListener('click', async () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User install response: ${outcome}`);
      deferredPrompt = null;
    });
  }
});
```

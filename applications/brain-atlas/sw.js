/**
 * Brain Atlas 3D - Offline Classroom Service Worker
 * Enables 100% offline capability on school tablets, Chromebooks, and low-connectivity classrooms.
 */

const CACHE_NAME = 'brain-atlas-3d-v1.7';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './bundle.js',
  './manifest.json',
  './models/brain-atlas.glb',
  './models/brain-model-data.js'
];

// Install: Pre-cache core shell & 3D model
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Pre-caching offline classroom assets...');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[PWA SW] Pre-cache partial fail (some dynamic assets may load on demand):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Purge stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA SW] Removing outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache-First for 3D binary assets, Network-first with cache fallback for pages
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first for GLB 3D models, fonts, audio, and scripts
  if (
    url.pathname.endsWith('.glb') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        }).catch(() => {
          // Fallback if offline
          return caches.match(event.request);
        });
      })
    );
    return;
  }

  // Network-First with Cache Fallback for HTML documents
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match('./index.html')))
  );
});

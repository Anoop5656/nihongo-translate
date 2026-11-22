// NihongoTranslate Service Worker
// Resolve assets relative to this service-worker scope for GitHub Pages
// project sites such as /nihongo-translate/.

const CACHE_NAME = 'nihongo-translate-v2';
const APP_ASSETS = ['index.html', 'style.css', 'translator.js', 'manifest.json'];
const ASSETS = APP_ASSETS.map(path => new URL(path, self.registration.scope).href);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate' || event.request.destination === 'document') {
          return caches.match(new URL('index.html', self.registration.scope));
        }
        return undefined;
      });
    })
  );
});

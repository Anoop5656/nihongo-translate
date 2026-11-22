
const CACHE_NAME = 'nihongo-translate-v3';

const APP_ASSETS = [
  'index.html',
  'style.css',
  'translator.js',
  'bleu_engine.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

const ASSETS = APP_ASSETS.map(
  path => new URL(path, self.registration.scope).href
);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, copy))
            .catch(error => console.warn(
              '[PWA] Cache update failed:', error
            ));
        }

        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);

        if (cached) return cached;

        if (
          event.request.mode === 'navigate' ||
          event.request.destination === 'document'
        ) {
          const fallback = await caches.match(
            new URL('index.html', self.registration.scope).href
          );

          if (fallback) return fallback;
        }

        return Response.error();
      })
  );
});

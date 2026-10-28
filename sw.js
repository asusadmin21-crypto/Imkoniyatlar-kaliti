const CACHE_NAME = 'imkoniyatlar-kaliti-24-7-v5';
const ASSETS = [
  './',
  './index.html',
  './css/style.css?v=5',
  './js/i18n.js?v=5',
  './js/data-telecom.js?v=5',
  './js/data-subjects.js?v=5',
  './js/data-extra.js?v=5',
  './js/app.js?v=5',
  './assets/logo.png',
  './assets/bg-education.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});

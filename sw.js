// Podo 데모용 서비스워커 (설치 가능 + 간단 캐시)
const CACHE = 'podo-demo-v1';
const ASSETS = [
  '.', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

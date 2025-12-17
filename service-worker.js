const CACHE_NAME = 'jx-service-v1';
// 這裡列出所有「必須」被存起來的檔案
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app_v22.js',
  './lib/tailwindcss.js',
  './lib/lucide.js',
  './lib/qrcode.min.js',
  './lib/html5-qrcode.min.js',
  './lib/jspdf.umd.min.js',
  './lib/html2canvas.min.js'
];

// 1. 安裝與快取
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all files');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 攔截請求 (有網路用網路，沒網路用快取)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取有，直接回傳快取 (離線模式)
      if (response) {
        return response;
      }
      // 如果快取沒有，去網路抓
      return fetch(event.request);
    })
  );
});

// 3. 清除舊快取 (當您更新版本時)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
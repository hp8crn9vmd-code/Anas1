
const CACHE_NAME = 'anas-portfolio-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Oswald:wght@500;700&display=swap'
];

// 1. Install Event: Cache critical assets immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Event: Serve from Cache first, then Network (Blazing Fast)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// 3. Activate Event: Clean up old caches
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

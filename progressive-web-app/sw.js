/**
 * @param cacheName the cache name set
 */
let cacheName = "pwa01";

/**
 * @param filesToCache files to keep in cache
 */
let filesToCache = ["index.html", "css/style.css", "js/main.js"];

/**
 * Start service worker and cache all the app content
 */
self.addEventListener(install, (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

/**
 * Serve cache when offline
 */
self.addEventListener(fetch, (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

/*
  girl dinner — offline helper ("service worker")
  ------------------------------------------------------
  Saves a copy of the app on the phone the first time it opens,
  so it still works with no internet connection.

  After changing any app file, bump CACHE_NAME (v1 -> v2) so
  phones pick up the new version.
*/
const CACHE_NAME = "whatsfordinner-v3";
const APP_FILES = [
  "./",
  "index.html",
  "style.css",
  "recipes.js",
  "app.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png"
];

// First visit: save the app files.
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

// New version: throw away old saved copies.
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Every request: use the saved copy if there is one, otherwise go online
// (and save fonts and other extras for next time).
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(saved => {
      if (saved) return saved;
      return fetch(event.request).then(response => {
        if (response.ok || response.type === "opaque") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => {
        // Offline and not saved: for page loads, show the app anyway.
        if (event.request.mode === "navigate") return caches.match("index.html");
      });
    })
  );
});

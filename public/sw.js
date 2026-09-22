// Minimal offline-capable service worker for NOWYES PWA frontend-only prototype
const CACHE_NAME = "nowyes-v1";
const CORE_ASSETS = ["/", "/index.html", "/manifest.json", "/nowyes-logo.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (e) => {
  // Network first for HTML, cache first for assets
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});

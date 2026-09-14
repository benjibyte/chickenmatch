const CACHE_NAME = "chicken-match-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const base = new URL("./", self.registration.scope).pathname;
      return cache.addAll([
        base,
        `${base}index.html`,
        `${base}manifest.webmanifest`,
        `${base}icons/chicken-match-192.png`,
        `${base}icons/chicken-match-512.png`,
      ]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        const responseCopy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseCopy);
        });
        return networkResponse;
      });
    }),
  );
});
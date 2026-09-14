const chicken_match_v2 = "chicken-match-v2";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(chicken_match_v2).then((cache) => {
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
          .filter((cacheName) => cacheName !== chicken_match_v2)
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
        caches.open(chicken_match_v2).then((cache) => {
          cache.put(event.request, responseCopy);
        });
        return networkResponse;
      });
    }),
  );
});
const cacheName = "PostsPWA";

const assets = [
    "/",
    "/reg-service-worker.js",
    "/style.css",
    "/functions.js",
    "/ApiCrud.js",
    "/search.js",
    "/index.html",
    "/timeOut.html",
    "/public/manifest.json",
    "/public/icon512_maskable.png",
    "/public/icon512_rounded.png"
];

self.addEventListener("install", (installedEvent) => {
    installedEvent.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets)
        }).catch((err) => console.log("Caching failed", err))
    );
});

this.addEventListener("activate", (activatedEvent) => {
    activatedEvent.waitUntil(
        caches.keys().then((cacheKeys) => {
            return Promise.all(
                cacheKeys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
            );
        })
    );
});
self.addEventListener("fetch", (fetchedEvent) => {
    const request = fetchedEvent.request;
    const url = new URL(request.url);

    // Handle API requests separately
    if (url.hostname.includes("jsonplaceholder.typicode.com")) {
        fetchedEvent.respondWith(
            caches.open("api-cache").then(cache => {
                return fetch(request)
                    .then(response => {
                        let responseClone = response.clone();
                        cache.put(request, responseClone);
                        return response;
                    })
                    .catch(() => caches.match(request)); // Serve cached API response if offline
            })
        );
        return;
    }
    // Handle other requests (HTML, CSS, JS, etc.)
    fetchedEvent.respondWith(
        caches.match(request).then(response => {
            return response || fetch(request) // Try network if not in cache
                .then(networkResponse => {
                    return caches.open("static-cache").then(cache => {
                        cache.put(request, networkResponse.clone()); // Cache new response
                        return networkResponse;
                    });
                })
                .catch(() => caches.match("/index.html")); // Fallback to index.html if offline
        })
    );
});


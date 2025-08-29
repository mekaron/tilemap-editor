const cacheName = "1629829956916";

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/src/tilemap-editor.js',
      '/src/styles.css',
    ])),
  );
});

self.addEventListener('message',  (e) => {
    if (e.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('imgur') || e.request.url.startsWith('chrome-extension://')) {
        return;
    }

    e.respondWith(
        caches.open(cacheName).then((cache) => {
            return cache.match(e.request).then((response) => {
                const fetchPromise = fetch(e.request).then((networkResponse) => {
                    // If we got a valid response, clone it and update the cache
                    if (networkResponse && networkResponse.status === 200) {
                        console.log(`[SW] Caching new resource: ${e.request.url}`);
                        cache.put(e.request, networkResponse.clone());
                    }
                    return networkResponse;
                });

                if (response) {
                    console.log(`[SW] Serving from cache: ${e.request.url}`);
                } else {
                    console.log(`[SW] Fetching from network: ${e.request.url}`);
                }

                // Return the cached response if it exists, otherwise wait for the network
                return response || fetchPromise;
            });
        }),
    );
});

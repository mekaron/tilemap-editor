const cacheName = "1629829956916";

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/src/main.jsx',
      '/src/App.jsx',
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
        fetch(e.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && e.request.method === 'GET') {
                console.log(`[SW] Caching new resource: ${e.request.url}`);
                const clone = networkResponse.clone();
                caches.open(cacheName).then((cache) => cache.put(e.request, clone));
            }
            console.log(`[SW] Serving from network: ${e.request.url}`);
            return networkResponse;
        }).catch(() => {
            return caches.match(e.request).then((response) => {
                if (response) {
                    console.log(`[SW] Serving from cache: ${e.request.url}`);
                } else {
                    console.log(`[SW] No cache found for: ${e.request.url}`);
                }
                return response;
            });
        })
    );
});

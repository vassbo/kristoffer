// src: https://deanhume.com/create-a-really-really-simple-offline-page-using-service-workers/

var version = '1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('offline' + version).then(cache =>
      cache.addAll([
        'frakoblet.html',
        '/assets/css/main.css',
        '/assets/favicons/apple-touch-icon.png',
        '/assets/favicons/favicon-32x32.png',
        '/assets/favicons/favicon-16x16.png'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate')
    event.respondWith(fetch(event.request.url).catch(e => caches.match('frakoblet.html')));
  else
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
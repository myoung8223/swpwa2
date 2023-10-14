// define the files to cache
const CACHE_NAME = 'v1';

const FILES_TO_CACHE = [
    './index.html',
    './manifest.json',
    './icon.png',
    './styles.css',
    './stopwatch.js',
    './beep1.wav',
    './beep2.wav',
    './beep3.wav',
    './beep4.wav'
];

// cache the files on install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// serve cached files or fetch new ones
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
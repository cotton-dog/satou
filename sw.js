const CACHE_NAME = "satou-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./lockscreen.html",
    "./manifest.webmanifest"
];


/* =========================
   安装
========================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))

    );

    self.skipWaiting();

});


/* =========================
   激活
========================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))

            )

        )

    );

    self.clients.claim();

});


/* =========================
   请求
========================= */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(cached => {

            return cached || fetch(event.request);

        })

    );

});
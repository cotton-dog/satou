const CACHE_NAME = "satou-v1";

const CACHE_FILES = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


/* =========================
   安装
========================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        CACHE_FILES
                    );

                })

        );

        self.skipWaiting();

    }
);


/* =========================
   激活
========================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(keys => {

                    return Promise.all(

                        keys.map(key => {

                            if(
                                key !== CACHE_NAME
                            ){

                                return caches.delete(
                                    key
                                );

                            }

                            return null;

                        })

                    );

                })

        );

        self.clients.claim();

    }
);


/* =========================
   网络请求
========================= */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches
                .match(event.request)
                .then(cached => {

                    if(cached){

                        return cached;

                    }

                    return fetch(
                        event.request
                    );

                })

        );

    }
);
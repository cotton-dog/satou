const CACHE_NAME = "satou-v1";

const FILES = [

    "./",
    "./index.html",
    "./manifest.webmanifest",

    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-original.png"

];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(FILES);

                })

        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys().then(keys => {

                return Promise.all(

                    keys
                        .filter(key =>
                            key !== CACHE_NAME
                        )
                        .map(key =>
                            caches.delete(key)
                        )

                );

            })

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
                .then(cached => {

                    if(cached){
                        return cached;
                    }

                    return fetch(event.request);

                })
                .catch(() => {

                    return caches.match(
                        "./index.html"
                    );

                })

        );

    }
);
//Asignar nombre y versión al caché

const CACHE_NAME = 'v1_cache_102';

//Archivos a guardar

var urlsToCache = [
    './icons/1.png',
    './icons/2.png',
    './icons/3.png',
    './icons/4.png',
    './icons/5.png',
    './icons/6.png',
    './icons/facebook.png',
    './icons/favicon.png',
    './icons/icon128.png',
    './icons/icon256.png',
    './icons/icon512.png',
    './icons/instagram.png',
    './icons/twitter.png',
    './',
    './styles/styles.css',
    './input.css',
    './jquery.js',
    './main.js',
    '/manifest.json',
    './package-lock.json',
    './package.json',
    './sw.js',
    './tailwind.config.js'
];

//Install - Instalación del SW
self.addEventListener('install', e => {      
    e.waitUntil(
        caches.open(CACHE_NAME)   
        .then(cache => {
            cache.addAll(urlsToCache) 
            .then(() =>{
                self.skipWaiting();
            })
        })
        .catch(err => {
            console.log('El becario borró la base de datos!', err);
        })
    )
});

//Activar

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhitelist.indexOf(cacheName) == -1){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
})

//Fetch

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    return res;
                }
                return fetch(e.request);
            })
    );
});


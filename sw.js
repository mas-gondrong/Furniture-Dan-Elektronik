const CACHE_NAME = 'furnitek-cache-v1';
const assetsToCache = [
  './',
  './index.html',
  './style.css',
  './manifest.json'
];

// Tahap Install: Menyimpan aset penting ke dalam cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache dan menyimpan aset');
        return cache.addAll(assetsToCache);
      })
  );
});

// Tahap Fetch: Mengambil data dari cache jika sedang offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan aset cache. Jika tidak, ambil dari jaringan internet
        return response || fetch(event.request);
      })
  );
});

// Tahap Aktivasi: Membersihkan cache lama jika ada pembaruan kode
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

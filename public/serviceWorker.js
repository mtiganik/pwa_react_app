  const CACHE_NAME = 'version-1';
  const urlsToCache = ['index.html', 'offline.html'];

  const self = this;
  // install SW
  self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache);
    }))
  });

  // listen for request
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
      .then(() => {
        return fetch(event.request)
        .catch((err) => caches.match('offline.html'))
      })
    )
  });

  // activate the sw
  self.addEventListener('activate', (event) => {
    const cachedWhitelist = [];
    cachedWhitelist.push(CACHE_NAME);
    event.waitUntil(
      caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if(!cachedWhitelist.includes(cacheName)){
            return caches.delete(cacheName);
          }
        })
      ))
    )
  });

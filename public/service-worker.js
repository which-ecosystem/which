const CACHE_NAME = 'v1.2.4'; // Per-version requests cache
const IMAGES_CACHE_NAME = 'images' // Long-term images cache

const isS3Url = url => url.includes('amazonaws.com');

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(['index.html']))
      .catch(e => console.log(e))
  );
})

this.addEventListener('fetch', event => {
  if (isS3Url(event.request.url)) {
    event.respondWith(
      caches.open(IMAGES_CACHE_NAME)
        .then(cache => cache.match(event.request)
          .then(match => match || fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response;
            })
          )
          .catch(e => console.log(`Error ${e}`))
        )
    );
  } else {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request))
        )
    );
  }
});

this.addEventListener('activate', event => {
  const cacheWhiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (cacheWhiteList.indexOf(key) === -1) return caches.delete(key);
        })
      ))
  );
});


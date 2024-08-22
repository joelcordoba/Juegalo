// Asignar un nombre y versión al cache
const CACHE_NAME = 'Juegalo-v1',
  urlsToCache = [
    '/',
    '/index.html',
    '/css/bootstrap.min.css',
    '/css/home.css',

    '/js/bootstrap.bundle.min.js',
    '/js/jquery-3.6.0.js',

    'https://github.com/joelcordoba/Juegalo/blob/main/regist_serviceWorker.js',
    'https://lh3.googleusercontent.com/-WUo9faOdmXQ/ZgCtQlefliI/AAAAAAAAXOE/yPmn9BTJJXwGmmkdBaeVpvBUlme1DU6GgCNcBGAsYHQ/icon-512x512.png',
    'https://lh3.googleusercontent.com/-UGSiegmn1hI/ZgCtRML_jvI/AAAAAAAAXOI/18WCsBXu26AtXWqUzNcAIOJ5fTsuQ0pxwCNcBGAsYHQ/icon-72x72.png'
  ];

// Durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting());
      })
      .catch(err => console.log('Falló registro de cache', err))
  );
});

// Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

// Cuando el navegador recupera una URL
self.addEventListener('fetch', e => {
  // Responder ya sea con el objeto en caché o continuar y buscar la URL real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          // Recuperar del cache
          return res;
        }
        // Recuperar de la petición a la URL
        return fetch(e.request);
      })
  );
});

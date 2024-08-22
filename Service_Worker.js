// Asignar un nombre y versión al cache
const CACHE_NAME = 'JuegaloCache-v1',
  urlsToCache = [
    './',
    './index.html',
    'https://www.juegalo.com.co/css/bootstrap.min.css',
    'https://www.juegalo.com.co/css/home.css',
    'https://www.juegalo.com.co/js/bootstrap.bundle.min.js',
    'https://www.juegalo.com.co/js/jquery-3.6.0.js',
    'https://www.juegalo.com.co/regist_serviceWorker.js',
    'https://lh3.googleusercontent.com/-WUo9faOdmXQ/ZgCtQlefliI/AAAAAAAAXOE/yPmn9BTJJXwGmmkdBaeVpvBUlme1DU6GgCNcBGAsYHQ/icon-512x512.png',
    'https://lh3.googleusercontent.com/-kSQOmmu_MpE/ZgCtQD9o0CI/AAAAAAAAXOA/zSGpuJ5k-CcCaPjPu_r5a0ukd2raACtbQCNcBGAsYHQ/icon-384x384.png',
    'https://lh3.googleusercontent.com/-C5t9FcqPQts/ZgCtPqcjYzI/AAAAAAAAXN8/8B0Qtqe9L-AGThI_wNbuGsypdgnvfk2BACNcBGAsYHQ/icon-256x256.png',
    'https://lh3.googleusercontent.com/-q8YhAwrNdaM/ZgCtOwxLkaI/AAAAAAAAXN4/5wVfkDugBso_C9qYVmnjNJElswCABFx3ACNcBGAsYHQ/icon-192x192.png',
    'https://lh3.googleusercontent.com/-NkxnZxIWFvM/ZgCtOuuARrI/AAAAAAAAXNw/wf2So2Y3tuAiL_o2R1dXBGtAyLW6rEL1QCNcBGAsYHQ/icon-152x152.png',
    'https://lh3.googleusercontent.com/-x9Cy7M8dXdw/ZgCtOorzqYI/AAAAAAAAXN0/wPNLPdX-H9cDbwti-YJYtqbjaEahePxgACNcBGAsYHQ/icon-144x144.png',
    'https://lh3.googleusercontent.com/-xiYAb6t4bRs/ZgCtOnshEBI/AAAAAAAAXNs/8keUTGq1CwY-tY_QED9L1O4Vu2TO76naQCNcBGAsYHQ/icon-128x128.png',
    'https://lh3.googleusercontent.com/-VwcD-C0dHRw/ZgCtRsJ8MzI/AAAAAAAAXOM/nn_P00yyQO8uvQAnvYa3zvSJ6fUBjdNKACNcBGAsYHQ/icon-96x96.png',
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

<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('https://raw.githubusercontent.com/joelcordoba/Juegalo/main/Service_Worker.js')
        .then(reg => console.log('Service Worker registrado:', reg))
        .catch(err => console.log('Error al registrar el Service Worker:', err));
    });
  }
</script>

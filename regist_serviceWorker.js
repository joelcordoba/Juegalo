if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./Service_Worker.js')
      .then(reg => console.log('Registro de Service Worker exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el Service Worker', err));
  });
}

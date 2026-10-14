// ============================================================
// Tema claro / oscuro
// Se carga en el <head> (antes de dibujar la página) para que no haya
// un destello blanco al abrir en modo oscuro.
//   - Por defecto sigue la preferencia del dispositivo.
//   - El botón 🌙/☀️ de la cabecera la cambia y se recuerda en el dispositivo.
// ============================================================
(function () {
  var CLAVE = 'tema';
  var raiz = document.documentElement;
  var sistema = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function elegido() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }
  function aplicar() {
    var tema = elegido() || (sistema && sistema.matches ? 'oscuro' : 'claro');
    raiz.setAttribute('data-tema', tema);
    var boton = document.querySelector('.boton-tema');
    if (boton) {
      boton.textContent = tema === 'oscuro' ? '☀️' : '🌙';
      boton.setAttribute('aria-label', tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      boton.title = boton.getAttribute('aria-label');
    }
  }

  aplicar();
  // Si el dispositivo cambia de modo (y el usuario no eligió uno), se sigue el cambio
  if (sistema && sistema.addEventListener) sistema.addEventListener('change', aplicar);

  // Botón en la cabecera
  document.addEventListener('DOMContentLoaded', function () {
    var contenedor = document.querySelector('.cabecera .contenedor');
    if (!contenedor) return;
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton-tema';
    boton.addEventListener('click', function () {
      var nuevo = raiz.getAttribute('data-tema') === 'oscuro' ? 'claro' : 'oscuro';
      try { localStorage.setItem(CLAVE, nuevo); } catch (e) { /* sin almacenamiento: solo esta visita */ }
      aplicar();
      if (!elegido()) raiz.setAttribute('data-tema', nuevo);
    });
    // Va antes de la zona del equipo / Salir (que otras partes de la página reemplazan)
    var extra = contenedor.querySelector('.cabecera-extra');
    if (extra) contenedor.insertBefore(boton, extra);
    else contenedor.append(boton);
    aplicar();
  });
})();

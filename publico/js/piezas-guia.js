// ============================================================
// Piezas compartidas por la guía y la galería de animaciones:
// resaltado de código con botón Copiar y carga de animaciones.
// ============================================================
import { el } from './comun.js';
import { resaltarArduino, copiarTexto } from './resaltado.js';

// Código: colores y botón Copiar
export function prepararCodigo(raiz) {
  raiz.querySelectorAll('.bloque-codigo').forEach((bloque) => {
    const codigo = bloque.querySelector('code');
    const texto = codigo.textContent;
    if (['arduino', 'ino', 'cpp', 'c', 'c++'].includes(codigo.dataset.lenguaje)) {
      codigo.innerHTML = resaltarArduino(texto);
    }
    const boton = bloque.querySelector('.boton-copiar');
    boton.addEventListener('click', async () => {
      const ok = await copiarTexto(texto);
      boton.textContent = ok ? '¡Copiado! ✓' : 'Selecciónalo a mano';
      boton.classList.toggle('copiado', ok);
      setTimeout(() => { boton.textContent = 'Copiar'; boton.classList.remove('copiado'); }, 2000);
    });
  });
}

// Animaciones: cada tipo está en /js/animaciones/<tipo>.js
// "contexto" permite a una animación leer respuestas del equipo (p. ej. la tabla de la rutina)
export function cargarAnimaciones(raiz, contexto = {}) {
  raiz.querySelectorAll('.animacion[data-tipo]').forEach(async (contenedor) => {
    const tipo = contenedor.dataset.tipo;
    let config = {};
    try { config = JSON.parse(contenedor.dataset.config || '{}'); } catch { /* sin configuración */ }
    try {
      const modulo = await import(`./animaciones/${tipo}.js`);
      contenedor.replaceChildren();
      modulo.default(contenedor, config, contexto);
    } catch (error) {
      console.error(`Animación "${tipo}":`, error);
      contenedor.replaceChildren(el('p', { class: 'animacion-cargando' }, `La animación "${tipo}" todavía no está disponible.`));
    }
  });
}

// ============================================================
// Galería de animaciones: muestra todas las animaciones con su
// bloque de Markdown (contenido/_galeria/animaciones.md).
// ============================================================
import { api, el } from './comun.js';
import { prepararCodigo, cargarAnimaciones } from './piezas-guia.js';

const pagina = document.getElementById('pagina');
const indice = document.getElementById('indice');

async function cargar() {
  try {
    const galeria = await api('/api/galeria');
    // ?ver=puente muestra solo las secciones con ese tipo de animación (o esa palabra en el título)
    const ver = new URLSearchParams(location.search).get('ver');
    const coincide = (parte) => !ver || parte.html.includes(`data-tipo="${ver}"`) ||
      parte.titulo.toLowerCase().includes(ver.toLowerCase());
    galeria.partes = galeria.partes.filter(coincide);
    const secciones = galeria.partes.map((parte, i) => el('section', { id: `animacion-${i + 1}`, class: 'seccion-galeria' },
      el('h2', {}, parte.titulo),
      el('div', { class: 'contenido-guia', html: parte.html })));
    pagina.replaceChildren(...secciones);
    indice.replaceChildren(...galeria.partes.map((parte, i) =>
      el('a', { class: 'anim-boton', href: `#animacion-${i + 1}` }, parte.titulo)));
    prepararCodigo(pagina);
    cargarAnimaciones(pagina, { respuestas: {}, guia: 0 });
  } catch (error) {
    pagina.replaceChildren(el('p', { class: 'mensaje-error' }, error.message));
  }
}

cargar();

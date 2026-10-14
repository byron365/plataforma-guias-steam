// ============================================================
// Animación "matriz-confusion": la matriz de confusión del equipo, coloreada.
// Lee la tabla (filas = color real, columnas = color detectado) y pinta cada
// casilla más oscura mientras más piezas tenga. La diagonal (aciertos) va
// con borde. Se actualiza mientras escriben.
// No dice qué colores se confunden más: eso lo concluye el equipo.
//
// En la guía:
//   :::animacion tipo="matriz-confusion" tabla="g12-confusion"
//   :::
// ============================================================
import { svg } from './comun/svg.js';
import { buscarTablaDelEquipo, leerNumero } from './comun/grafica.js';
import { el } from '../comun.js';

const sinTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const CELDA = 86; const X0 = 130; const Y0 = 70;

export default function montar(contenedor, config, contexto = {}) {
  const idTabla = typeof config.tabla === 'string' ? config.tabla : config.campo;
  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 500 380', class: 'matriz-svg', role: 'img', 'aria-label': 'Matriz de confusión' }, capa);
  const resumen = el('p', { class: 'anim-estado', 'aria-live': 'polite' }, 'Buscando la tabla…');
  contenedor.append(el('div', { class: 'anim-matriz' }, raiz,
    el('p', { class: 'texto-ayuda' }, 'Más oscuro = más piezas. Las casillas con borde son la diagonal: los aciertos.'), resumen));

  function graficar(tabla) {
    const columnas = tabla.encabezados.slice(1);
    const filas = tabla.filas.filter((f) => String(f[0] || '').trim());
    const valores = filas.map((f) => columnas.map((_, j) => leerNumero(f[j + 1])));
    const maximo = Math.max(1, ...valores.flat().filter(Number.isFinite));
    const partes = [
      svg('text', { x: X0 + (columnas.length * CELDA) / 2, y: 22, class: 'grafica-eje', 'text-anchor': 'middle' }, 'Detectado →'),
      svg('text', { x: 18, y: Y0 + (filas.length * CELDA) / 2, class: 'grafica-eje', transform: `rotate(-90 18 ${Y0 + (filas.length * CELDA) / 2})`, 'text-anchor': 'middle' }, 'Color real ↓'),
    ];
    columnas.forEach((c, j) => partes.push(svg('text', { x: X0 + j * CELDA + CELDA / 2, y: Y0 - 12, class: 'grafica-numero', 'text-anchor': 'middle' }, c.trim())));
    filas.forEach((f, i) => {
      const real = sinTildes(f[0]);
      partes.push(svg('text', { x: X0 - 10, y: Y0 + i * CELDA + CELDA / 2 + 4, class: 'grafica-numero', 'text-anchor': 'end' }, String(f[0]).trim()));
      columnas.forEach((c, j) => {
        const v = valores[i][j];
        const nivel = Number.isFinite(v) ? v / maximo : 0;
        const diagonal = sinTildes(c).trim() === real.trim();
        partes.push(svg('rect', {
          x: X0 + j * CELDA + 2, y: Y0 + i * CELDA + 2, width: CELDA - 4, height: CELDA - 4, rx: 6,
          class: `matriz-celda${diagonal ? ' diagonal' : ''}`, style: `--nivel:${(0.08 + 0.92 * nivel).toFixed(2)}`,
        }, svg('title', {}, `Real ${String(f[0]).trim()} · detectado ${c.trim()}: ${Number.isFinite(v) ? v : 'sin dato'}`)));
        partes.push(svg('text', { x: X0 + j * CELDA + CELDA / 2, y: Y0 + i * CELDA + CELDA / 2 + 7, class: `matriz-numero${nivel > 0.55 ? ' claro' : ''}`, 'text-anchor': 'middle' }, Number.isFinite(v) ? String(v) : '—'));
      });
    });
    capa.replaceChildren(...partes);
    const total = valores.flat().filter(Number.isFinite).reduce((a, b) => a + b, 0);
    resumen.textContent = total ? `Total de piezas en la tabla: ${total}${tabla.guia ? ` (guía ${tabla.guia})` : ''}.` : 'Completen la tabla para ver la matriz.';
  }

  async function dibujar() {
    const tabla = await buscarTablaDelEquipo(idTabla, contexto);
    if (!tabla) { capa.replaceChildren(); resumen.textContent = idTabla ? `No se pudo leer la tabla "${idTabla}".` : 'Esta animación necesita tabla="id-de-la-tabla".'; return null; }
    graficar(tabla);
    return tabla;
  }
  dibujar().then((tabla) => { if (tabla && tabla.elemento) tabla.elemento.addEventListener('input', dibujar); });
}

// ============================================================
// Animación "umbral": elegir el número que separa "seca" de "húmeda".
// Muestra en una recta de 0 a 1023 los promedios que el equipo escribió
// en su tabla de calibración y un umbral que se puede mover. Para cada
// tipo de tierra dice si el invernadero regaría (suelo > UMBRAL_SECO).
//
// En la guía:
//   :::animacion tipo="umbral" tabla="g6-calibracion"
//   :::
// Opciones (todas opcionales):
//   tabla     id de la tabla de calibración (usa la columna "Promedio")
//   inicial   umbral al empezar (por defecto 500, como el código)
//   variable  nombre en el código (por defecto UMBRAL_SECO)
// Con sensor capacitivo, más seco = número más alto (por eso "suelo > umbral" riega).
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { leerNumero, leerTablaEditable } from './comun/grafica.js';
import { el } from '../comun.js';

const sinTildes = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const X0 = 30; const X1 = 590; const MAXIMO = 1023;
const xDe = (v) => X0 + (v / MAXIMO) * (X1 - X0);

export default function montar(contenedor, config) {
  const variable = /^[A-Za-z_]\w*$/.test(config.variable || '') ? config.variable : 'UMBRAL_SECO';
  let umbral = limitar(numero(config.inicial, 500), 0, MAXIMO);
  const idTabla = typeof config.tabla === 'string' ? config.tabla : config.campo;
  const tabla = idTabla ? document.querySelector(`.tabla-editable[data-campo="${CSS.escape(idTabla)}"]`) : null;

  const raiz = svg('svg', { viewBox: '0 0 620 170', class: 'umbral-svg', role: 'img', 'aria-label': 'Recta de 0 a 1023 con los promedios y el umbral' });
  const capa = svg('g', {});
  raiz.append(capa);
  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: MAXIMO, step: 5, value: umbral, 'aria-label': 'Umbral' });
  const codigo = el('div', { class: 'anim-codigo' });
  const lista = el('ul', { class: 'umbral-lista', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-umbral' },
    raiz,
    el('div', { class: 'anim-controles' },
      codigo,
      el('label', { class: 'anim-etiqueta' }, 'Mueve el umbral', deslizador),
      lista)));

  function leerPromedios() {
    if (!tabla) return [];
    const { encabezados, filas } = leerTablaEditable(tabla);
    const col = encabezados.map(sinTildes).findIndex((e) => e.includes('promedio'));
    if (col < 0) return [];
    return filas.map((f) => ({ nombre: f[0], valor: leerNumero(f[col]) }));
  }

  function dibujar() {
    const datos = leerPromedios();
    capa.replaceChildren(
      // Zonas: a la derecha del umbral "riega"
      svg('rect', { x: X0, y: 60, width: xDe(umbral) - X0, height: 26, class: 'umbral-zona-humeda' }),
      svg('rect', { x: xDe(umbral), y: 60, width: X1 - xDe(umbral), height: 26, class: 'umbral-zona-seca' }),
      svg('text', { x: X0 + 6, y: 78, class: 'umbral-zona-texto' }, 'No riega'),
      svg('text', { x: X1 - 6, y: 78, class: 'umbral-zona-texto', 'text-anchor': 'end' }, 'Riega'),
      svg('line', { x1: X0, x2: X1, y1: 86, y2: 86, class: 'umbral-recta' }),
      ...[0, 256, 512, 768, 1023].flatMap((v) => [
        svg('line', { x1: xDe(v), x2: xDe(v), y1: 86, y2: 94, class: 'umbral-recta' }),
        svg('text', { x: xDe(v), y: 108, class: 'umbral-numero', 'text-anchor': 'middle' }, String(v))]),
      svg('text', { x: X0, y: 128, class: 'umbral-numero' }, '← más agua'),
      svg('text', { x: X1, y: 128, class: 'umbral-numero', 'text-anchor': 'end' }, 'más seca →'),
      // Línea del umbral
      svg('line', { x1: xDe(umbral), x2: xDe(umbral), y1: 40, y2: 100, class: 'umbral-linea' }),
      svg('text', { x: xDe(umbral), y: 34, class: 'umbral-etiqueta', 'text-anchor': 'middle' }, `${variable} = ${umbral}`));

    // Marcas de los promedios del equipo
    datos.filter((d) => Number.isFinite(d.valor)).forEach((d, i) => {
      const x = xDe(limitar(d.valor, 0, MAXIMO));
      capa.append(
        svg('circle', { cx: x, cy: 73, r: 7, class: 'umbral-punto' }),
        svg('text', { x, y: 150 + (i % 2) * 14, class: 'umbral-numero umbral-nombre', 'text-anchor': 'middle' }, `${d.nombre} (${d.valor})`));
    });

    codigo.textContent = `if (suelo > ${variable})   // ${variable} = ${umbral}`;
    if (!tabla) {
      lista.replaceChildren(el('li', {}, idTabla ? `No se encontró la tabla "${idTabla}".` : 'Esta animación necesita tabla="id-de-la-tabla".'));
    } else if (!datos.some((d) => Number.isFinite(d.valor))) {
      lista.replaceChildren(el('li', {}, 'Escriban los promedios en la tabla para verlos aquí.'));
    } else {
      lista.replaceChildren(...datos.map((d) => el('li', {},
        el('strong', {}, `${d.nombre}: `),
        Number.isFinite(d.valor)
          ? `${d.valor} → ${d.valor > umbral ? '💧 regaría' : 'no regaría'}`
          : 'falta el promedio')));
    }
  }

  deslizador.addEventListener('input', () => { umbral = Number(deslizador.value); dibujar(); });
  if (tabla) tabla.addEventListener('input', dibujar);
  dibujar();
}

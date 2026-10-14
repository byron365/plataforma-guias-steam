// ============================================================
// Animación "selector": una perilla dividida en zonas.
// Al girarla, analogRead() da un número de 0 a 1023 y la función
// gramosSegunTamano() devuelve la porción de la zona (resalta la línea que se cumple).
//
// En la guía:
//   :::animacion tipo="selector"
//   :::
// Opciones (todas opcionales):
//   pin   pin analógico (por defecto A0)
// Zonas y porciones: las de dispensador_comida.ino (30, 60 y 120 g).
// ============================================================
import { svg, puntoPerilla, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const GIRO = 135;
const CX = 110; const CY = 110;
const ZONAS = [
  { hasta: 340, corto: 'Gato', nombre: 'Gato', gramos: 30, codigo: 'if (v < 341) return 30;   // gato', color: '#38BDF8' },
  { hasta: 681, corto: 'P. pequeño', nombre: 'Perro pequeño', gramos: 60, codigo: 'if (v < 682) return 60;   // perro pequeño', color: '#FACC15' },
  { hasta: 1023, corto: 'P. grande', nombre: 'Perro grande', gramos: 120, codigo: 'return 120;               // perro grande', color: '#F97316' },
];

export default function montar(contenedor, config) {
  const pin = /^A\d$/i.test(config.pin || '') ? config.pin.toUpperCase() : 'A0';
  let lectura = 200;

  const giroDe = (v) => -GIRO + (v / 1023) * GIRO * 2;
  const arco = (desde, hasta, r) => {
    const a = puntoPerilla(CX, CY, r, giroDe(desde)); const b = puntoPerilla(CX, CY, r, giroDe(hasta));
    return `M ${a.x} ${a.y} A ${r} ${r} 0 ${giroDe(hasta) - giroDe(desde) > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
  };

  const perilla = svg('svg', {
    viewBox: '-24 0 268 220', class: 'perilla-svg', tabindex: '0', role: 'slider',
    'aria-label': `Perilla del selector en ${pin}`, 'aria-valuemin': '0', 'aria-valuemax': '1023',
  });
  let desde = 0;
  ZONAS.forEach((z) => {
    perilla.append(svg('path', { d: arco(desde, z.hasta, 92), class: 'selector-zona', stroke: z.color }));
    const medio = puntoPerilla(CX, CY, 104, giroDe((desde + z.hasta) / 2));
    desde = z.hasta + 1;
    perilla.append(svg('text', { x: medio.x, y: medio.y + 4, class: 'selector-etiqueta', 'text-anchor': 'middle' }, z.corto));
  });
  const boton = svg('g', { class: 'perilla-boton' },
    svg('circle', { cx: CX, cy: CY, r: 60, class: 'perilla-cuerpo' }),
    svg('circle', { cx: CX, cy: CY, r: 48, class: 'perilla-tapa' }),
    svg('rect', { x: CX - 4, y: CY - 55, width: 8, height: 30, rx: 4, class: 'perilla-indicador' }));
  perilla.append(boton);

  const lineas = ZONAS.map((z) => el('span', { class: 'semaforo-linea' }, `  ${z.codigo}`));
  const codigo = el('pre', { class: 'semaforo-codigo' },
    el('span', { class: 'semaforo-fija' }, 'int gramosSegunTamano() {'),
    el('span', { class: 'semaforo-fija' }, `  int v = analogRead(${pin});`),
    ...lineas,
    el('span', { class: 'semaforo-fija' }, '}'));
  const resultado = el('p', { class: 'puente-paso', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-selector' },
    el('div', { class: 'perilla-columna' }, perilla, el('p', { class: 'anim-etiqueta' }, 'Gira la perilla (arrástrala)')),
    el('div', { class: 'anim-controles' }, resultado, codigo)));

  function actualizar(v) {
    lectura = Math.round(limitar(v, 0, 1023));
    const zona = ZONAS.findIndex((z) => lectura <= z.hasta);
    boton.setAttribute('transform', `rotate(${giroDe(lectura)} ${CX} ${CY})`);
    lineas.forEach((l, i) => l.classList.toggle('activa', i === zona));
    resultado.textContent = `analogRead(${pin}) = ${lectura} → ${ZONAS[zona].nombre}: ${ZONAS[zona].gramos} g`;
    perilla.setAttribute('aria-valuenow', String(lectura));
    perilla.setAttribute('aria-valuetext', `${lectura}, ${ZONAS[zona].nombre}`);
  }

  // Arrastrar (igual que la perilla de la garra)
  let arrastrando = false;
  const desdePuntero = (e) => {
    const caja = perilla.getBoundingClientRect();
    const dx = e.clientX - (caja.left + caja.width / 2); const dy = e.clientY - (caja.top + caja.height / 2);
    let g = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (g > GIRO || g < -GIRO) g = lectura > 511 ? GIRO : -GIRO;
    actualizar(((g + GIRO) / (GIRO * 2)) * 1023);
  };
  perilla.addEventListener('pointerdown', (e) => { arrastrando = true; perilla.setPointerCapture(e.pointerId); desdePuntero(e); });
  perilla.addEventListener('pointermove', (e) => { if (arrastrando) desdePuntero(e); });
  perilla.addEventListener('pointerup', () => { arrastrando = false; });
  perilla.addEventListener('keydown', (e) => {
    const pasos = { ArrowRight: 20, ArrowUp: 20, ArrowLeft: -20, ArrowDown: -20, PageUp: 100, PageDown: -100 };
    if (e.key in pasos) { actualizar(lectura + pasos[e.key]); e.preventDefault(); }
  });

  actualizar(lectura);
}

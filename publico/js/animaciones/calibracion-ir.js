// ============================================================
// Animación "calibracion-ir": calibrar el sensor de la portería.
// Vista desde arriba: el sensor está en la ventana del fondo y mira hacia la cancha.
// El tornillo azul cambia hasta dónde llega su "zona de detección". La pelota
// (y la mano de un jugador) se arrastran a cualquier lugar para probar.
// No trae los casos de la tabla ya resueltos: se prueban moviendo la pelota.
//
// En la guía:
//   :::animacion tipo="calibracion-ir"
//   :::
// Opciones (todas opcionales): alcance (mm al empezar, 90) · pin ("D3")
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

// Medidas en mm (portería de 100 de ancho y 40 de fondo); 1 mm = 2 px
const ESC = 2;
const X_FONDO = 20; const X_LINEA = X_FONDO + 40; // la cancha va hacia la derecha
const Y_C = 90; const BOCA = 100; const ANCHO_HAZ = 26;
const R_PELOTA = 20;

export default function montar(contenedor, config) {
  let alcance = limitar(numero(config.alcance, 90), 10, 200);
  const pin = /^D?\d{1,2}$/i.test(config.pin || '') ? `D${String(config.pin).replace(/^D/i, '')}` : 'D3';
  const objetos = {
    pelota: { x: 175, y: 120, r: R_PELOTA, visible: true },
    mano: { x: 150, y: 30, r: 16, visible: false },
  };

  const zona = svg('path', { class: 'calir-zona' });
  const sensor = svg('rect', { x: X_FONDO * ESC - 8, y: (Y_C - 10) * ESC, width: 10, height: 20 * ESC, rx: 3, class: 'calir-sensor' });
  const led = svg('circle', { cx: X_FONDO * ESC - 18, cy: Y_C * ESC, r: 6, class: 'ir-led' });
  const grupos = {};
  const raiz = svg('svg', { viewBox: `0 0 ${230 * ESC} ${180 * ESC}`, class: 'calir-svg', role: 'img', 'aria-label': 'Portería vista desde arriba con el sensor en el fondo' },
    svg('rect', { x: X_LINEA * ESC, y: 0, width: 170 * ESC, height: 180 * ESC, class: 'fut-pasto' }),
    svg('rect', { x: X_FONDO * ESC, y: (Y_C - BOCA / 2) * ESC, width: 40 * ESC, height: BOCA * ESC, class: 'fut-porteria azul' }),
    svg('line', { x1: X_LINEA * ESC, x2: X_LINEA * ESC, y1: 0, y2: 180 * ESC, class: 'calir-linea' }),
    svg('text', { x: X_LINEA * ESC + 6, y: 16, class: 'calir-texto' }, 'línea de gol'),
    svg('text', { x: X_FONDO * ESC + 4, y: (Y_C - BOCA / 2) * ESC - 6, class: 'calir-texto oscuro' }, 'portería'),
    zona, sensor, led);
  for (const [k, o] of Object.entries(objetos)) {
    const g = svg('g', { class: `calir-objeto ${k}`, tabindex: '0', role: 'button', 'aria-label': k === 'pelota' ? 'Pelota: arrástrala' : 'Mano de un jugador: arrástrala' },
      svg('circle', { r: o.r * ESC, class: k === 'pelota' ? 'calir-pelota' : 'calir-mano' }),
      svg('text', { y: 5, 'text-anchor': 'middle', class: 'calir-emoji' }, k === 'pelota' ? '' : '✋'));
    grupos[k] = g;
    raiz.append(g);
  }

  const rTornillo = el('input', { type: 'range', class: 'anim-deslizador', min: 10, max: 200, step: 5, value: alcance, 'aria-label': 'Tornillo azul: hasta dónde detecta' });
  const casillaMano = el('input', { type: 'checkbox' });
  const salida = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-calir' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, '⟲ Tornillo azul (izquierda = detecta menos · derecha = detecta más)', rTornillo),
      el('label', { class: 'casilla-simple' }, casillaMano, ' Mostrar la mano de un jugador'),
      salida,
      el('p', { class: 'texto-ayuda' }, 'Arrastra la pelota (o la mano) a donde quieras probar. La zona roja es hasta dónde ve el sensor.'))));

  // ¿El objeto toca la zona del haz? (rectángulo frente al sensor)
  const toca = (o) => o.visible
    && o.x + o.r > X_FONDO && o.x - o.r < X_FONDO + alcance
    && Math.abs(o.y - Y_C) < ANCHO_HAZ / 2 + o.r;

  function dibujar() {
    zona.setAttribute('d', `M ${X_FONDO * ESC} ${(Y_C - 6) * ESC} L ${(X_FONDO + alcance) * ESC} ${(Y_C - ANCHO_HAZ / 2) * ESC} L ${(X_FONDO + alcance) * ESC} ${(Y_C + ANCHO_HAZ / 2) * ESC} L ${X_FONDO * ESC} ${(Y_C + 6) * ESC} Z`);
    for (const [k, o] of Object.entries(objetos)) {
      grupos[k].setAttribute('transform', `translate(${o.x * ESC} ${o.y * ESC})`);
      grupos[k].style.display = o.visible ? '' : 'none';
    }
    const ve = toca(objetos.pelota) || toca(objetos.mano);
    led.classList.toggle('encendido', ve);
    sensor.classList.toggle('activo', ve);
    const dondePelota = objetos.pelota.x < X_LINEA ? 'dentro de la portería' : 'en la cancha';
    salida.textContent =
      `Pelota ${dondePelota}${toca(objetos.pelota) ? ' · el sensor la ve' : ''}\n` +
      (objetos.mano.visible ? `Mano${toca(objetos.mano) ? ' · el sensor la ve' : ' · no la ve'}\n` : '') +
      `digitalRead(${pin}) = ${ve ? 'LOW' : 'HIGH'}   LED ${ve ? 'encendido' : 'apagado'}`;
  }

  // ---------- Arrastrar ----------
  let arrastrando = null;
  const aMm = (e) => {
    const caja = raiz.getBoundingClientRect();
    return { x: (((e.clientX - caja.left) / caja.width) * 230), y: (((e.clientY - caja.top) / caja.height) * 180) };
  };
  for (const [k, g] of Object.entries(grupos)) {
    g.addEventListener('pointerdown', (e) => { arrastrando = k; raiz.setPointerCapture(e.pointerId); e.preventDefault(); });
    g.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[e.key];
      if (!d) return;
      e.preventDefault(); const o = objetos[k];
      o.x = limitar(o.x + d[0], X_FONDO + o.r, 230 - o.r); o.y = limitar(o.y + d[1], o.r, 180 - o.r); dibujar();
    });
  }
  raiz.addEventListener('pointermove', (e) => {
    if (!arrastrando) return;
    const p = aMm(e); const o = objetos[arrastrando];
    o.x = limitar(p.x, X_FONDO + o.r, 230 - o.r); o.y = limitar(p.y, o.r, 180 - o.r);
    // La pelota no atraviesa los lados de la portería
    if (arrastrando === 'pelota' && o.x < X_LINEA + o.r) o.y = limitar(o.y, Y_C - BOCA / 2 + o.r, Y_C + BOCA / 2 - o.r);
    dibujar();
  });
  raiz.addEventListener('pointerup', () => { arrastrando = null; });
  rTornillo.addEventListener('input', () => { alcance = Number(rTornillo.value); dibujar(); });
  casillaMano.addEventListener('change', () => { objetos.mano.visible = casillaMano.checked; dibujar(); });
  dibujar();
}

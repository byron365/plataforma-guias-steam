// ============================================================
// Animación "ldr": la fotorresistencia en un divisor de voltaje.
// 5V → LDR → A0 → resistencia de 10 kΩ → GND.
// Con más luz la LDR tiene menos resistencia, A0 recibe más voltaje
// y analogRead() da un número más grande. También se pueden
// intercambiar la LDR y la resistencia (la luz sale al revés).
// Los valores de la LDR son aproximados: cada una es distinta.
//
// En la guía:
//   :::animacion tipo="ldr"
//   :::
// Opciones (todas opcionales): fija (resistencia fija en kΩ, por defecto 10) · pin ("A0")
// ============================================================
import { svg, numero, limitar, mapArduino } from './comun/svg.js';
import { el } from '../comun.js';

const OSCURO = 100; const CLARO = 1; // kΩ aproximados de la LDR (tapada / con lámpara)
const X = 200;

export default function montar(contenedor, config) {
  const fija = limitar(numero(config.fija, 10), 1, 100);
  const pin = /^A\d$/i.test(config.pin || '') ? config.pin.toUpperCase() : 'A0';
  let luzAmbiente = 55; // % del deslizador
  let invertido = false;

  // Rayos de luz (más gruesos con más luz)
  const rayos = svg('g', { class: 'ldr-rayos' });
  for (let i = 0; i < 5; i++) {
    const a = (-30 + i * 15) * Math.PI / 180;
    rayos.append(svg('line', { x1: 70 + Math.cos(a) * 26, y1: 104 + Math.sin(a) * 26, x2: 70 + Math.cos(a) * 62, y2: 104 + Math.sin(a) * 62 }));
  }
  const corriente = svg('g', { class: 'ldr-corriente' });
  const piezaArriba = svg('g', {});
  const piezaAbajo = svg('g', {});
  const textoV = svg('text', { x: X + 22, y: 172, class: 'ldr-voltaje' });
  const raiz = svg('svg', { viewBox: '0 0 420 330', class: 'ldr-svg', role: 'img', 'aria-label': `Divisor de voltaje con una LDR y una resistencia de ${fija} kΩ` },
    svg('circle', { cx: 70, cy: 104, r: 20, class: 'ldr-sol' }), rayos,
    svg('line', { x1: X, y1: 30, x2: X, y2: 300, class: 'ldr-cable' }),
    corriente,
    svg('text', { x: X, y: 22, class: 'ldr-borne', 'text-anchor': 'middle' }, '5V'),
    svg('text', { x: X, y: 322, class: 'ldr-borne', 'text-anchor': 'middle' }, 'GND'),
    piezaArriba, piezaAbajo,
    svg('circle', { cx: X, cy: 180, r: 6, class: 'ldr-nodo' }),
    svg('line', { x1: X, y1: 180, x2: X + 100, y2: 180, class: 'ldr-cable' }),
    svg('rect', { x: X + 100, y: 164, width: 60, height: 32, rx: 6, class: 'ldr-pin' }),
    svg('text', { x: X + 130, y: 186, class: 'ldr-borne claro', 'text-anchor': 'middle' }, pin),
    textoV);

  // Una pieza del divisor: la LDR (con flechas de luz) o la resistencia fija
  function dibujarPieza(grupo, esLDR, yCentro, kOhm) {
    grupo.replaceChildren(
      svg('rect', { x: X - 16, y: yCentro - 40, width: 32, height: 80, rx: 8, class: esLDR ? 'ldr-cuerpo' : 'ldr-resistencia' }),
      ...(esLDR
        ? [svg('path', { d: `M ${X - 9} ${yCentro - 30} l 18 10 l -18 10 l 18 10 l -18 10 l 18 10 l -18 10`, class: 'ldr-zigzag' })]
        : [-22, -6, 10].map((dy, i) => svg('rect', { x: X - 16, y: yCentro + dy, width: 32, height: 6, class: `ldr-banda b${i}` }))),
      svg('text', { x: X - 26, y: yCentro - 4, class: 'ldr-nombre', 'text-anchor': 'end' }, esLDR ? 'LDR' : `${fija} kΩ`),
      svg('text', { x: X - 26, y: yCentro + 14, class: 'ldr-valor', 'text-anchor': 'end' }, esLDR ? `≈ ${kOhm < 10 ? kOhm.toFixed(1).replace('.', ',') : Math.round(kOhm)} kΩ` : 'fija'));
  }

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 100, step: 1, value: luzAmbiente, 'aria-label': 'Luz sobre la LDR' });
  const rapidos = el('div', { class: 'anim-rapidos' },
    [['🤚 Tapar con el dedo', 0], ['🏠 Luz del salón', 55], ['🔦 Lámpara del celular', 100]].map(([t, v]) =>
      el('button', { type: 'button', class: 'anim-boton', onclick: () => { luzAmbiente = v; deslizador.value = v; actualizar(); } }, t)));
  const intercambiar = el('label', { class: 'casilla-simple' }, el('input', { type: 'checkbox', onchange: (e) => { invertido = e.target.checked; actualizar(); } }), ' Intercambiar la LDR y la resistencia');
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-ldr' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Luz sobre la LDR', deslizador),
      rapidos, intercambiar, cuentas,
      el('p', { class: 'texto-ayuda' }, 'Valores aproximados: cada LDR es un poco distinta.'))));

  function actualizar() {
    const f = luzAmbiente / 100;
    const rLdr = OSCURO * Math.pow(CLARO / OSCURO, f);      // kΩ
    const rArriba = invertido ? fija : rLdr;
    const rAbajo = invertido ? rLdr : fija;
    const voltaje = (5 * rAbajo) / (rArriba + rAbajo);
    const lectura = Math.round((voltaje / 5) * 1023);
    const luz = mapArduino(lectura, 0, 1023, 0, 100);
    dibujarPieza(piezaArriba, !invertido, 100, rLdr);
    dibujarPieza(piezaAbajo, invertido, 250, rLdr);
    rayos.setAttribute('opacity', (0.1 + 0.9 * f).toFixed(2));
    rayos.setAttribute('stroke-width', (1 + 4 * f).toFixed(1));
    // Corriente: más rápido y más puntos si pasa más corriente
    const mA = 5 / (rArriba + rAbajo);
    corriente.style.setProperty('--velocidad', `${limitar(1.6 - mA * 3, 0.35, 1.6)}s`);
    corriente.replaceChildren(svg('line', { x1: X + 8, y1: 40, x2: X + 8, y2: 292, class: 'ldr-flujo' }));
    textoV.textContent = `${voltaje.toFixed(2).replace('.', ',')} V`;
    cuentas.textContent =
      `${invertido ? 'R fija' : 'LDR'} arriba ≈ ${rArriba < 10 ? rArriba.toFixed(1) : Math.round(rArriba)} kΩ · ${invertido ? 'LDR' : 'R fija'} abajo ≈ ${rAbajo < 10 ? rAbajo.toFixed(1) : Math.round(rAbajo)} kΩ\n` +
      `Voltaje en ${pin} ≈ ${voltaje.toFixed(2)} V\n` +
      `analogRead(${pin}) ≈ ${lectura}\n` +
      `luz = map(${lectura}, 0, 1023, 0, 100) = ${luz}`;
  }
  deslizador.addEventListener('input', () => { luzAmbiente = Number(deslizador.value); actualizar(); });
  actualizar();
}

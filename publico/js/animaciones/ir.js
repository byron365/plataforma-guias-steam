// ============================================================
// Animación "ir": el sensor infrarrojo de obstáculos.
// Un "ojito" emite luz infrarroja y el otro la recibe. Si un objeto está
// lo bastante cerca, la luz rebota, el receptor la ve y la salida OUT
// se pone en LOW (y se enciende el LED del sensor).
// El tornillo azul (potenciómetro) cambia hasta qué distancia detecta.
// La luz se dibuja de color solo para verla: la de verdad es invisible.
// No explica por qué se usa luz infrarroja (lo piensa el equipo).
//
// En la guía:
//   :::animacion tipo="ir" objeto="Canica" pin="D3"
//   :::
// Opciones (todas opcionales): objeto ("Canica") · pin ("D3") · alcance (cm al empezar, 4)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const X_SENSOR = 118;              // frente de los ojitos (px)
const PX_CM = 24;                  // px por cm
const MAX_CM = 14;

export default function montar(contenedor, config) {
  const objeto = String(config.objeto || 'Canica').slice(0, 20);
  const pin = /^D?\d{1,2}$/i.test(config.pin || '') ? `D${String(config.pin).replace(/^D/i, '')}` : 'D3';
  let alcance = limitar(numero(config.alcance, 4), 1, 12);
  let distancia = 9;       // cm del objeto al sensor
  let hay = true;          // ¿hay objeto?
  let fase = 0; let ultimo = 0;

  const tornillo = svg('g', { class: 'ir-tornillo' });
  const led = svg('circle', { cx: 40, cy: 52, r: 6, class: 'ir-led' });
  const rayos = svg('g', { class: 'ir-rayos' });
  const cosa = svg('g', { class: 'ir-objeto', tabindex: '0', role: 'slider', 'aria-label': `${objeto}: distancia al sensor` });
  const zona = svg('rect', { y: 40, height: 100, class: 'ir-zona' });
  const raiz = svg('svg', { viewBox: '0 0 480 190', class: 'ir-svg', role: 'img', 'aria-label': 'Sensor infrarrojo de obstáculos y un objeto frente a él' },
    zona,
    // Placa del sensor
    svg('rect', { x: 10, y: 30, width: 90, height: 120, rx: 6, class: 'ir-placa' }),
    svg('rect', { x: 92, y: 60, width: 26, height: 22, rx: 8, class: 'ir-emisor' }),
    svg('rect', { x: 92, y: 98, width: 26, height: 22, rx: 8, class: 'ir-receptor' }),
    svg('text', { x: 124, y: 60, class: 'ir-texto' }, 'emisor'),
    svg('text', { x: 124, y: 132, class: 'ir-texto' }, 'receptor'),
    led, svg('text', { x: 40, y: 40, class: 'ir-texto claro', 'text-anchor': 'middle' }, 'LED'),
    tornillo,
    svg('text', { x: 55, y: 144, class: 'ir-texto claro chico', 'text-anchor': 'middle' }, 'VCC GND OUT'),
    rayos, cosa,
    // Regla en cm
    ...Array.from({ length: MAX_CM + 1 }, (_, i) => svg('line', { x1: X_SENSOR + i * PX_CM, x2: X_SENSOR + i * PX_CM, y1: 160, y2: i % 5 ? 164 : 168, class: 'grafica-base' })),
    ...[0, 5, 10].map((i) => svg('text', { x: X_SENSOR + i * PX_CM, y: 182, class: 'grafica-numero', 'text-anchor': 'middle' }, `${i} cm`)));

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0.5, max: MAX_CM, step: 0.5, value: distancia, 'aria-label': `Distancia de la ${objeto.toLowerCase()} al sensor` });
  const tornilloRango = el('input', { type: 'range', class: 'anim-deslizador', min: 1, max: 12, step: 0.5, value: alcance, 'aria-label': 'Tornillo azul: sensibilidad' });
  const casilla = el('input', { type: 'checkbox', checked: true });
  const salida = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-ir' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'casilla-simple' }, casilla, ` Hay ${objeto.toLowerCase()} frente al sensor`),
      el('label', { class: 'anim-etiqueta' }, `Distancia de la ${objeto.toLowerCase()}`, deslizador),
      el('label', { class: 'anim-etiqueta' }, 'Tornillo azul (sensibilidad)', tornilloRango),
      salida,
      el('p', { class: 'texto-ayuda' }, 'La luz infrarroja es invisible: aquí se dibuja de color para poder verla.'))));

  function dibujar() {
    const detecta = hay && distancia <= alcance;
    const xObj = X_SENSOR + distancia * PX_CM;
    zona.setAttribute('x', X_SENSOR); zona.setAttribute('width', alcance * PX_CM);
    cosa.style.display = hay ? '' : 'none';
    cosa.replaceChildren(
      svg('circle', { cx: xObj + 16, cy: 90, r: 16, class: 'ir-bola' }),
      svg('circle', { cx: xObj + 10, cy: 84, r: 5, class: 'ir-bola-brillo' }),
      svg('text', { x: xObj + 16, y: 124, class: 'ir-texto', 'text-anchor': 'middle' }, objeto));
    // Luz que sale del emisor; si rebota, vuelve al receptor
    const fin = hay ? xObj : X_SENSOR + MAX_CM * PX_CM + 20;
    const avance = (fase % 1);
    const puntos = [];
    for (let i = 0; i < 4; i++) {
      const f = (avance + i / 4) % 1;
      puntos.push(svg('circle', { cx: X_SENSOR + f * (fin - X_SENSOR), cy: 71 + f * (hay ? 8 : 0), r: 3.5, class: 'ir-ida', opacity: (hay && distancia > alcance ? 1 - f * 0.8 : 1).toFixed(2) }));
      if (detecta) puntos.push(svg('circle', { cx: fin - f * (fin - X_SENSOR), cy: 79 + f * 30, r: 3.5, class: 'ir-vuelta' }));
    }
    rayos.replaceChildren(
      svg('line', { x1: X_SENSOR, y1: 71, x2: fin, y2: hay ? 79 : 71, class: 'ir-haz' }),
      ...(detecta ? [svg('line', { x1: fin, y1: 79, x2: X_SENSOR, y2: 109, class: 'ir-haz vuelta' })] : []),
      ...puntos);
    led.classList.toggle('encendido', detecta);
    // Tornillo: gira con la sensibilidad
    tornillo.replaceChildren(svg('circle', { cx: 40, cy: 104, r: 14, class: 'ir-pot' }),
      svg('line', { x1: 40, y1: 104, x2: 40 + Math.cos(alcance / 2) * 11, y2: 104 + Math.sin(alcance / 2) * 11, class: 'ir-pot-ranura' }));
    salida.textContent =
      `${hay ? `${objeto} a ${String(distancia).replace('.', ',')} cm` : `Sin ${objeto.toLowerCase()}`} · detecta hasta ≈ ${String(alcance).replace('.', ',')} cm\n` +
      `OUT = ${detecta ? 'LOW' : 'HIGH'}   LED del sensor ${detecta ? 'encendido' : 'apagado'}\n` +
      `digitalRead(${pin}) = ${detecta ? 0 : 1}`;
    cosa.setAttribute('aria-valuenow', String(distancia));
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; fase += dt / 900;
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  deslizador.addEventListener('input', () => { distancia = Number(deslizador.value); dibujar(); });
  tornilloRango.addEventListener('input', () => { alcance = Number(tornilloRango.value); dibujar(); });
  casilla.addEventListener('change', () => { hay = casilla.checked; dibujar(); });
  cosa.addEventListener('keydown', (e) => {
    const d = { ArrowRight: 0.5, ArrowUp: 0.5, ArrowLeft: -0.5, ArrowDown: -0.5 }[e.key];
    if (d) { e.preventDefault(); distancia = limitar(distancia + d, 0.5, MAX_CM); deslizador.value = distancia; dibujar(); }
  });
  dibujar();
  requestAnimationFrame(cuadro);
}

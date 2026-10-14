// ============================================================
// Animación "gemelo-digital": la estación real y su copia en Blender.
// A la izquierda, la estación con su torre de platos y el LED; a la derecha,
// el gemelo en Blender, que se pinta del mismo color que el LED y muestra
// la temperatura en un texto 3D. Los datos viajan de una a otra.
// Colores y límites: los de estacion_meteorologica.ino (FRIO 20, CALOR 28).
//
// En la guía:
//   :::animacion tipo="gemelo-digital"
//   :::
// Opciones (todas opcionales): frio (20) · calor (28) · inicial (24.6)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const ESTADOS = {
  frio: { nombre: 'Frío', led: '#2563EB', blender: '0, 0, 1' },
  normal: { nombre: 'Normal', led: '#16A34A', blender: '0, 1, 0' },
  calor: { nombre: 'Calor', led: '#DC2626', blender: '1, 0, 0' },
};

// Torre de platos vista de lado (6 platos, tapa y base), centrada en cx
function torre(cx, base, clase) {
  const g = svg('g', { class: clase });
  g.append(svg('rect', { x: cx - 58, y: base, width: 116, height: 8, rx: 2, class: 'gemelo-pieza' }));
  for (let i = 0; i < 6; i++) {
    const y = base - 20 - i * 18;
    g.append(svg('path', { d: `M ${cx - 54} ${y + 6} L ${cx - 46} ${y} L ${cx + 46} ${y} L ${cx + 54} ${y + 6} Z`, class: 'gemelo-pieza' }));
  }
  g.append(svg('path', { d: `M ${cx - 58} ${base - 128} L ${cx - 48} ${base - 138} L ${cx + 48} ${base - 138} L ${cx + 58} ${base - 128} Z`, class: 'gemelo-pieza' }));
  [-38, 0, 38].forEach((dx) => g.append(svg('rect', { x: cx + dx - 3, y: base - 130, width: 6, height: 130, class: 'gemelo-columna' })));
  return g;
}

export default function montar(contenedor, config) {
  const FRIO = numero(config.frio, 20);
  const CALOR = numero(config.calor, 28);
  let temp = limitar(numero(config.inicial, 24.6), -10, 45);
  let fase = 0; let ultimo = 0;

  const estadoDe = (t) => (t < FRIO ? 'frio' : t > CALOR ? 'calor' : 'normal');

  // ---------- Mundo real ----------
  const led = svg('circle', { cx: 196, cy: 248, r: 9, class: 'gemelo-led' });
  const brilloLed = svg('circle', { cx: 196, cy: 248, r: 20, class: 'gemelo-brillo' });
  const textoPantalla = svg('text', { x: 196, y: 222, class: 'gemelo-pantalla-texto', 'text-anchor': 'middle' });
  const real = svg('g', {},
    svg('text', { x: 115, y: 24, class: 'gemelo-titulo', 'text-anchor': 'middle' }, 'Estación real'),
    torre(100, 262, 'gemelo-real'),
    svg('rect', { x: 162, y: 205, width: 68, height: 26, rx: 3, class: 'gemelo-pantalla' }), textoPantalla,
    brilloLed, led,
    svg('rect', { x: 20, y: 270, width: 220, height: 10, rx: 3, class: 'gemelo-mesa' }));

  // ---------- Gemelo en Blender ----------
  const pintura = torre(440, 262, 'gemelo-virtual');
  const texto3d = svg('text', { x: 440, y: 72, class: 'gemelo-texto3d', 'text-anchor': 'middle' });
  const sombra3d = svg('text', { x: 443, y: 75, class: 'gemelo-texto3d sombra', 'text-anchor': 'middle' });
  const virtual = svg('g', {},
    svg('rect', { x: 300, y: 34, width: 280, height: 250, rx: 10, class: 'gemelo-blender' }),
    ...[0, 1, 2, 3, 4, 5].map((i) => svg('line', { x1: 300, x2: 580, y1: 74 + i * 40, y2: 74 + i * 40, class: 'gemelo-cuadricula' })),
    ...[0, 1, 2, 3, 4, 5, 6].map((i) => svg('line', { x1: 320 + i * 40, x2: 320 + i * 40, y1: 34, y2: 284, class: 'gemelo-cuadricula' })),
    svg('text', { x: 440, y: 24, class: 'gemelo-titulo', 'text-anchor': 'middle' }, 'Gemelo digital (Blender)'),
    pintura, sombra3d, texto3d);

  // ---------- Los datos viajando ----------
  const paquete = svg('g', { class: 'gemelo-paquete' }, svg('rect', { x: -34, y: -11, width: 68, height: 22, rx: 11 }), svg('text', { x: 0, y: 4, 'text-anchor': 'middle' }));
  const raiz = svg('svg', { viewBox: '0 0 600 300', class: 'gemelo-svg', role: 'img', 'aria-label': 'Estación real y su gemelo digital en Blender' },
    real, virtual,
    svg('path', { d: 'M 236 160 C 260 150, 270 150, 296 160', class: 'gemelo-flecha' }),
    paquete);

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 5, max: 40, step: 0.1, value: temp, 'aria-label': 'Temperatura del aire' });
  const visor = el('strong');
  const estadoTexto = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  const material = el('pre', { class: 'joystick-codigo' });
  contenedor.append(el('div', { class: 'anim-gemelo' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Temperatura del aire: ', visor, deslizador),
      estadoTexto, material)));

  function actualizar() {
    const e = estadoDe(temp);
    const est = ESTADOS[e];
    visor.textContent = `${temp.toFixed(1)} °C`;
    led.setAttribute('fill', est.led); brilloLed.setAttribute('fill', est.led);
    pintura.style.setProperty('--material', est.led);
    textoPantalla.textContent = `${temp.toFixed(1)} C`;
    texto3d.textContent = `${temp.toFixed(1)} °C`; sombra3d.textContent = texto3d.textContent;
    texto3d.setAttribute('fill', est.led);
    paquete.querySelector('text').textContent = temp.toFixed(1);
    estadoTexto.textContent = `${est.nombre}: el LED y el gemelo se pintan igual.`;
    material.textContent = `Material "Clima"\nColor base (R, G, B) = ${est.blender}\nFRIO = ${FRIO} · CALOR = ${CALOR}`;
  }

  // El paquete de datos va de la estación al gemelo una y otra vez
  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; fase = (fase + dt / 1400) % 1;
    const x = 236 + fase * 60; const y = 160 - Math.sin(fase * Math.PI) * 10;
    paquete.setAttribute('transform', `translate(${x} ${y})`);
    paquete.setAttribute('opacity', fase < 0.85 ? '1' : String((1 - fase) / 0.15));
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  deslizador.addEventListener('input', () => { temp = Number(deslizador.value); actualizar(); });
  actualizar();
  requestAnimationFrame(cuadro);
}

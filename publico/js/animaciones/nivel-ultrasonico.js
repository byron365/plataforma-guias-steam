// ============================================================
// Animación "nivel-ultrasonico": ¿cuánta comida queda en la botella?
// El sensor ultrasónico está arriba, mirando hacia abajo, y mide la distancia
// hasta la comida. Si d > DISTANCIA_VACIO, el LED parpadea para avisar.
//
// En la guía:
//   :::animacion tipo="nivel-ultrasonico"
//   :::
// Opciones (todas opcionales):
//   vacio  DISTANCIA_VACIO en cm (por defecto 15) · alto  alto de la botella en cm (por defecto 25)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const ARRIBA = 50; const ABAJO = 290;   // botella dibujada (y)
const X0 = 110; const X1 = 230;

export default function montar(contenedor, config) {
  let vacio = limitar(numero(config.vacio, 15), 2, 60);
  const alto = limitar(numero(config.alto, 25), 10, 60);
  let comida = 70; // % de la botella con comida
  let ultimo = 0; let reloj = 0;

  const pxPorCm = (ABAJO - ARRIBA) / alto;
  const relleno = svg('rect', { x: X0 + 3, width: X1 - X0 - 6, class: 'nivel-comida' });
  const textura = svg('g', { class: 'nivel-croquetas' });
  const cota = svg('g', { class: 'ultra-cota' });
  const ondas = svg('g', { class: 'ultra-onda' });
  const limite = svg('g', {});
  const led = svg('circle', { cx: 330, cy: 120, r: 16, class: 'nivel-led' });
  const raiz = svg('svg', { viewBox: '0 0 420 310', class: 'nivel-svg nivel-fijo', role: 'img', 'aria-label': 'Botella con comida y sensor ultrasónico arriba' },
    svg('rect', { x: X0, y: ARRIBA, width: X1 - X0, height: ABAJO - ARRIBA, rx: 10, class: 'nivel-deposito' }),
    relleno, textura, limite, ondas, cota,
    // Sensor arriba, mirando hacia abajo
    svg('rect', { x: 140, y: 20, width: 60, height: 24, rx: 4, class: 'ultra-placa' }),
    svg('circle', { cx: 157, cy: 44, r: 8, class: 'ultra-ojo' }), svg('circle', { cx: 183, cy: 44, r: 8, class: 'ultra-ojo' }),
    svg('text', { x: 170, y: 14, class: 'inv-texto', 'text-anchor': 'middle' }, 'HC-SR04'),
    led, svg('text', { x: 330, y: 152, class: 'inv-texto', 'text-anchor': 'middle' }, 'LED: recargar'));

  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 100, step: 1, value: comida, 'aria-label': 'Comida en la botella' });
  const entradaVacio = el('input', { type: 'number', min: 2, max: 60, step: 1, value: vacio, class: 'temp-entrada', 'aria-label': 'DISTANCIA_VACIO en cm' });
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-nivel' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Comida en la botella', deslizador),
      el('label', { class: 'anim-etiqueta' }, 'DISTANCIA_VACIO = ', entradaVacio, ' cm'),
      cuentas)));

  const ySuperficie = () => ABAJO - (comida / 100) * (ABAJO - ARRIBA - 4);
  const distancia = () => Math.round((ySuperficie() - (ARRIBA - 6)) / pxPorCm);

  function dibujar() {
    const y = ySuperficie();
    const d = distancia();
    const recargar = d > vacio;
    relleno.setAttribute('y', y); relleno.setAttribute('height', Math.max(0, ABAJO - y - 3));
    textura.replaceChildren();
    for (let fy = ABAJO - 10; fy > y + 4; fy -= 12) {
      for (let fx = X0 + 12 + ((fy / 12) % 2) * 6; fx < X1 - 8; fx += 14) textura.append(svg('circle', { cx: fx, cy: fy, r: 5 }));
    }
    // Línea del límite: a DISTANCIA_VACIO cm del sensor
    const yLimite = ARRIBA - 6 + vacio * pxPorCm;
    limite.replaceChildren(
      svg('line', { x1: X0 - 10, x2: X1 + 10, y1: yLimite, y2: yLimite, class: 'umbral-linea' }),
      svg('text', { x: X1 + 14, y: yLimite + 4, class: 'inv-texto' }, `${vacio} cm`));
    cota.replaceChildren(
      svg('line', { x1: 95, x2: 95, y1: ARRIBA - 6, y2: y }),
      svg('text', { x: 88, y: (ARRIBA + y) / 2, class: 'ultra-texto', 'text-anchor': 'end' }, `d = ${d} cm`));
    // Ondas que bajan y vuelven (solo dibujo)
    const fase = (reloj / 900) % 1;
    const yOnda = (ARRIBA + 4) + fase * (y - ARRIBA - 4);
    ondas.replaceChildren(svg('path', { d: `M 150 ${yOnda} q 20 10 40 0`, class: fase < 0.5 ? 'ida' : 'vuelta' }));
    // LED: parpadea cada 200 ms si hay que recargar (como el código)
    led.classList.toggle('encendido', recargar && Math.floor(reloj / 200) % 2 === 0);
    cuentas.textContent =
      `long d = medirDistancia();   // ${d} cm\n` +
      `if (d > DISTANCIA_VACIO)     // ${d} > ${vacio} → ${recargar}\n` +
      `  ${recargar ? 'LED parpadea: ¡recargar!' : 'LED apagado'}`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; reloj += dt;
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  deslizador.addEventListener('input', () => { comida = Number(deslizador.value); dibujar(); });
  entradaVacio.addEventListener('change', () => { vacio = limitar(Number(entradaVacio.value) || 2, 2, 60); entradaVacio.value = vacio; dibujar(); });
  dibujar();
  requestAnimationFrame(cuadro);
}

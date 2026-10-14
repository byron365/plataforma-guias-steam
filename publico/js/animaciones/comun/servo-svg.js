// ============================================================
// Componente reutilizable: dibujo de un servo SG90 visto desde arriba,
// con transportador y brazo que gira suavemente (como un servo real).
//
//   const servo = crearServoSVG({ minimo: 0, maximo: 180 });
//   contenedor.append(servo.elemento);
//   servo.ponerAngulo(90);
// ============================================================
import { svg, puntoTransportador, pocoMovimiento } from './svg.js';

const CX = 160;
const CY = 168;
const RADIO = 128;
const VELOCIDAD = 300; // grados por segundo (más lento que un SG90 real para que se vea)

export function crearServoSVG({ minimo = 0, maximo = 180, inicial = 90, etiqueta = 'SG90' } = {}) {
  const raiz = svg('svg', {
    viewBox: '0 0 320 212', class: 'servo-svg', role: 'img',
    'aria-label': `Servo ${etiqueta} visto desde arriba`,
  });

  // --- Transportador ---
  const inicioArco = puntoTransportador(CX, CY, RADIO, 0);
  const finArco = puntoTransportador(CX, CY, RADIO, 180);
  raiz.append(svg('path', {
    d: `M ${inicioArco.x} ${inicioArco.y} A ${RADIO} ${RADIO} 0 0 0 ${finArco.x} ${finArco.y}`,
    class: 'servo-arco',
  }));
  for (let g = 0; g <= 180; g += 10) {
    const largo = g % 45 === 0 ? 14 : 7;
    const a = puntoTransportador(CX, CY, RADIO, g);
    const b = puntoTransportador(CX, CY, RADIO - largo, g);
    raiz.append(svg('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'servo-marca' }));
    if (g % 45 === 0) {
      const t = puntoTransportador(CX, CY, RADIO + 13, g);
      raiz.append(svg('text', { x: t.x, y: t.y + 4, class: 'servo-numero', 'text-anchor': 'middle' }, `${g}°`));
    }
  }

  // Zona fuera del rango permitido (por ejemplo, la pinza solo va de 30° a 90°)
  if (minimo > 0) raiz.append(sector(0, minimo, 'servo-fuera'));
  if (maximo < 180) raiz.append(sector(maximo, 180, 'servo-fuera'));

  // Sector celeste que muestra el ángulo actual
  const relleno = svg('path', { class: 'servo-sector' });
  raiz.append(relleno);

  // --- Cuerpo del servo ---
  raiz.append(
    svg('rect', { x: CX - 52, y: CY - 7, width: 16, height: 14, rx: 3, class: 'servo-oreja' }),
    svg('rect', { x: CX + 84, y: CY - 7, width: 16, height: 14, rx: 3, class: 'servo-oreja' }),
    svg('rect', { x: CX - 38, y: CY - 24, width: 124, height: 48, rx: 7, class: 'servo-cuerpo' }),
    svg('text', { x: CX + 52, y: CY + 15, class: 'servo-etiqueta', 'text-anchor': 'middle' }, etiqueta),
  );

  // --- Brazo (horn) que gira ---
  const brazo = svg('g', { class: 'servo-brazo' },
    svg('path', { d: `M ${CX} ${CY - 11} L ${CX + 100} ${CY - 6} A 6 6 0 0 1 ${CX + 100} ${CY + 6} L ${CX} ${CY + 11} Z` }),
    svg('circle', { cx: CX, cy: CY, r: 15 }),
    ...[38, 56, 74, 92].map((x) => svg('circle', { cx: CX + x, cy: CY, r: 2.4, class: 'servo-agujero' })),
    svg('circle', { cx: CX, cy: CY, r: 5, class: 'servo-eje' }),
  );
  raiz.append(brazo);

  function sector(desde, hasta, clase) {
    const a = puntoTransportador(CX, CY, RADIO - 16, desde);
    const b = puntoTransportador(CX, CY, RADIO - 16, hasta);
    const grande = hasta - desde > 180 ? 1 : 0;
    return svg('path', {
      d: `M ${CX} ${CY} L ${a.x} ${a.y} A ${RADIO - 16} ${RADIO - 16} 0 ${grande} 0 ${b.x} ${b.y} Z`,
      class: clase,
    });
  }

  function dibujar(grados) {
    brazo.setAttribute('transform', `rotate(${-grados} ${CX} ${CY})`);
    relleno.setAttribute('d', grados > 0.5 ? sector(0, grados).getAttribute('d') : '');
  }

  // --- Movimiento suave hacia el ángulo pedido ---
  let actual = inicial;
  let meta = inicial;
  let animando = false;
  let ultimoTiempo = 0;

  function paso(tiempo) {
    const dt = ultimoTiempo ? (tiempo - ultimoTiempo) / 1000 : 0;
    ultimoTiempo = tiempo;
    const avance = VELOCIDAD * dt;
    actual = Math.abs(meta - actual) <= avance ? meta : actual + Math.sign(meta - actual) * avance;
    dibujar(actual);
    if (actual !== meta) requestAnimationFrame(paso);
    else { animando = false; ultimoTiempo = 0; }
  }

  dibujar(actual);

  return {
    elemento: raiz,
    ponerAngulo(grados, inmediato = false) {
      meta = grados;
      if (inmediato || pocoMovimiento()) { actual = meta; dibujar(actual); return; }
      if (!animando) { animando = true; requestAnimationFrame(paso); }
    },
  };
}

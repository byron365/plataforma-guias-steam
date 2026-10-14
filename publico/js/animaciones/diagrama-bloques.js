// ============================================================
// Animación "diagrama-bloques": los bloques del sistema y cómo se conectan.
// Flechas por tipo, con los colores de la guía 2:
//   rojo = potencia (12 V) · naranja = lógica (5 V) · azul = control (PWM, pines) · verde = datos (I2C, SPI)
// Al tocar un bloque se resaltan sus conexiones y se listan abajo.
// ocultar="si": las conexiones no se ven hasta "Mostrar conexiones"
// (la tabla de la guía pide completarlas primero).
//
// En la guía:
//   :::animacion tipo="diagrama-bloques" sistema="banda" ocultar="si"
//   :::
// Sistemas listos: "banda" · "casa" · "elevador" · "robot"
// ============================================================
import { svg } from './comun/svg.js';
import { el } from '../comun.js';

const TIPOS = {
  potencia: { nombre: 'Potencia (12 V)', clase: 'potencia' },
  logica: { nombre: 'Lógica (5 V)', clase: 'logica' },
  control: { nombre: 'Control (PWM, pines)', clase: 'control' },
  datos: { nombre: 'Datos (I2C, SPI)', clase: 'datos' },
};

// Cada sistema: bloques { id: [x, y, texto, grupo] } y conexiones [desde, hasta, tipo, etiqueta]
const SISTEMAS = {
  // Banda clasificadora: pines de banda_NODO_BANDA.ino y banda_NODO_CLASIFICADOR.ino
  banda: {
    grupos: { banda: 'Nodo banda', clasificador: 'Nodo clasificador' },
    bloques: {
      fuente: [20, 40, 'Fuente 12 V + fusible'],
      reg: [20, 250, 'Regulador LM2596 (5 V)'],
      pot: [250, 20, 'Potenciómetro', 'banda'],
      ir: [250, 100, 'Sensor IR de llegada', 'banda'],
      ab: [250, 190, 'Arduino banda (esclavo 8)', 'banda'],
      mos: [250, 290, 'MOSFET + diodo', 'banda'],
      motor: [250, 380, 'Motor DC 12 V', 'banda'],
      tcs: [520, 20, 'Sensor de color TCS34725', 'clasificador'],
      paro: [520, 100, 'Botón de paro', 'clasificador'],
      ac: [520, 190, 'Arduino clasificador (maestro)', 'clasificador'],
      servo: [520, 290, 'Servo desviador', 'clasificador'],
      max: [520, 380, 'Display MAX7219', 'clasificador'],
    },
    conexiones: [
      ['fuente', 'mos', 'potencia', '12 V'],
      ['mos', 'motor', 'potencia', 'drain'],
      ['fuente', 'reg', 'potencia', '12 V'],
      ['reg', 'ab', 'logica', '5 V'],
      ['reg', 'ac', 'logica', '5 V'],
      ['reg', 'servo', 'logica', '5 V'],
      ['pot', 'ab', 'control', 'A0'],
      ['ir', 'ab', 'control', 'D2'],
      ['ab', 'mos', 'control', 'PWM D9'],
      ['ac', 'ab', 'datos', 'I2C (dirección 8)'],
      ['ac', 'tcs', 'datos', 'I2C (0x29)'],
      ['paro', 'ac', 'control', 'D7'],
      ['ac', 'servo', 'control', 'PWM D6'],
      ['ac', 'max', 'datos', 'SPI (D11, D13, D10)'],
    ],
  },
  // Casa inteligente: bloques de la guía 2 y pines de casa_CENTRAL.ino y los tres nodos
  casa: {
    grupos: { central: 'Central (maestro)', nodos: 'Nodos (esclavos)' },
    // Nombres de la tabla de colores de la guía 2 de la casa
    tipos: { potencia: '12 V (cargas)', logica: '5 V (lógica)', control: 'Señales de control', datos: 'Datos (I2C, Bluetooth)' },
    bloques: {
      fuente: [20, 30, 'Fuente 12 V + fusible'],
      bornera: [20, 160, 'Bornera de distribución'],
      reg: [20, 290, 'Regulador LM2596 (5 V)'],
      hc05: [270, 20, 'HC-05 (Bluetooth)', 'central'],
      central: [270, 110, 'Arduino central', 'central'],
      oled: [270, 200, 'Pantalla OLED', 'central'],
      bus: [270, 330, 'Bus I2C (SDA, SCL, 5 V, GND)'],
      sala: [530, 40, 'Nodo sala (8): MOSFET + tira LED + LDR', 'nodos'],
      cuarto: [530, 170, 'Nodo cuarto (9): MOSFET + ventilador + DHT11', 'nodos'],
      entrada: [530, 300, 'Nodo entrada (10): relé + cerradura + PIR + buzzer', 'nodos'],
    },
    conexiones: [
      ['fuente', 'bornera', 'potencia', '12 V'],
      ['bornera', 'reg', 'potencia', '12 V'],
      ['bornera', 'sala', 'potencia', '12 V a la tira LED'],
      ['bornera', 'cuarto', 'potencia', '12 V al ventilador'],
      ['bornera', 'entrada', 'potencia', '12 V a la cerradura'],
      ['reg', 'central', 'logica', '5 V'],
      ['reg', 'bus', 'logica', '5 V a los nodos'],
      ['hc05', 'central', 'datos', 'Bluetooth: TXD → D10, RXD ← D11'],
      ['central', 'oled', 'datos', 'I2C (0x3C)'],
      ['central', 'bus', 'datos', 'I2C: A4 (SDA), A5 (SCL)'],
      ['bus', 'sala', 'datos', 'I2C (dirección 8)'],
      ['bus', 'cuarto', 'datos', 'I2C (dirección 9)'],
      ['bus', 'entrada', 'datos', 'I2C (dirección 10)'],
    ],
  },
  // Elevador (versión distribuida): pines de elevador_CENTRAL.ino y elevador_NODO_PISO.ino
  elevador: {
    grupos: { central: 'Central (maestro)', nodos: 'Nodos de piso (esclavos)' },
    bloques: {
      fuente: [20, 20, 'Fuente 12 V + fusible'],
      reg: [20, 110, 'Regulador LM2596 (5 V)'],
      puente: [20, 200, 'Puente H L298N'],
      motor: [20, 300, 'Motor DC + carrete'],
      sensores: [270, 30, 'Sensores de piso (reed × 3)', 'central'],
      central: [270, 200, 'Arduino central', 'central'],
      bus: [270, 370, 'Bus I2C (SDA, SCL, 5 V, GND)'],
      piso3: [530, 30, 'Nodo piso 3 (10): botón, LED, display', 'nodos'],
      piso2: [530, 140, 'Nodo piso 2 (9): botón, LED, display', 'nodos'],
      piso1: [530, 250, 'Nodo piso 1 (8): botón, LED, display', 'nodos'],
      fines: [530, 380, 'Finales de carrera + paro'],
    },
    conexiones: [
      ['fuente', 'reg', 'potencia', '12 V'],
      ['fuente', 'puente', 'potencia', '12 V'],
      ['puente', 'motor', 'potencia', 'OUT1, OUT2'],
      ['reg', 'central', 'logica', '5 V'],
      ['reg', 'bus', 'logica', '5 V a los nodos'],
      ['central', 'puente', 'control', 'ENA D5, IN1 D7, IN2 D8'],
      ['sensores', 'central', 'control', 'D2, D3, D4'],
      ['fines', 'central', 'control', 'A0, A1, A2'],
      ['central', 'bus', 'datos', 'I2C: A4 (SDA), A5 (SCL)'],
      ['bus', 'piso1', 'datos', 'I2C (dirección 8)'],
      ['bus', 'piso2', 'datos', 'I2C (dirección 9)'],
      ['bus', 'piso3', 'datos', 'I2C (dirección 10)'],
    ],
  },
  // Robot con telemetría: bloques de la tabla g2-bloques y pines de los dos .ino
  robot: {
    grupos: { mando: 'Mando', robot: 'Robot' },
    tipos: { potencia: 'Energía de potencia', logica: 'Energía de lógica (5 V)', control: 'Señales de control', datos: 'Datos (UART, I2C, Bluetooth)' },
    bloques: {
      joy: [20, 30, 'Joystick', 'mando'],
      mandoArd: [20, 150, 'Arduino del mando', 'mando'],
      oled: [20, 270, 'Pantalla OLED', 'mando'],
      hc05m: [20, 385, 'HC-05 maestro', 'mando'],
      bat: [270, 30, 'Batería 7,4 V + fusible', 'robot'],
      robotArd: [270, 200, 'Arduino del robot', 'robot'],
      hc05e: [270, 385, 'HC-05 esclavo', 'robot'],
      div: [520, 20, 'Divisor de batería', 'robot'],
      reg: [520, 105, 'Regulador LM2596 (5 V)', 'robot'],
      tb: [520, 190, 'Puente H TB6612FNG', 'robot'],
      motores: [520, 280, '2 motores DC', 'robot'],
      hcsr: [520, 385, 'HC-SR04', 'robot'],
    },
    conexiones: [
      ['joy', 'mandoArd', 'control', 'A0, A1'],
      ['mandoArd', 'oled', 'datos', 'I2C (A4, A5)'],
      ['mandoArd', 'hc05m', 'datos', 'UART: D10, D11'],
      ['hc05m', 'hc05e', 'datos', 'Bluetooth'],
      ['hc05e', 'robotArd', 'datos', 'UART: D10, D11'],
      ['bat', 'div', 'potencia', 'Batería +'],
      ['bat', 'reg', 'potencia', '7,4 V'],
      ['bat', 'tb', 'potencia', 'VM'],
      ['reg', 'robotArd', 'logica', '5 V'],
      ['reg', 'tb', 'logica', 'VCC'],
      ['div', 'robotArd', 'control', 'A0'],
      ['robotArd', 'tb', 'control', 'PWMA D5, PWMB D6, AIN, BIN, STBY'],
      ['tb', 'motores', 'potencia', 'A01/A02, B01/B02'],
      ['hcsr', 'robotArd', 'control', 'TRIG D2, ECHO D3'],
    ],
  },
};

const ANCHO_B = 190; const ALTO_B = 50;

export default function montar(contenedor, config) {
  const sistema = SISTEMAS[config.sistema];
  if (!sistema) {
    contenedor.append(el('p', { class: 'animacion-cargando' }, `El diagrama de bloques "${config.sistema || ''}" todavía no está disponible.`));
    return;
  }
  let visibles = config.ocultar !== 'si';
  const nombreTipo = (t) => (sistema.tipos && sistema.tipos[t]) || TIPOS[t].nombre;
  let elegido = null;

  const centro = (id) => { const [x, y] = sistema.bloques[id]; return { x: x + ANCHO_B / 2, y: y + ALTO_B / 2 }; };
  // Punto del borde del bloque en dirección al otro (para que la flecha no tape el texto)
  const borde = (id, hacia) => {
    const c = centro(id); const dx = hacia.x - c.x; const dy = hacia.y - c.y;
    const k = Math.min(Math.abs((ANCHO_B / 2) / (dx || 1e-9)), Math.abs((ALTO_B / 2) / (dy || 1e-9)));
    return { x: c.x + dx * k, y: c.y + dy * k };
  };

  const capaFlechas = svg('g', {});
  const capaBloques = svg('g', {});
  const capaEtiquetas = svg('g', {});
  const fondoGrupos = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 740 450', class: 'bloques-svg', role: 'img', 'aria-label': 'Diagrama de bloques del sistema' },
    svg('defs', {}, ...Object.keys(TIPOS).map((t) => svg('marker', { id: `bloque-flecha-${t}-${config.sistema}`, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 11, markerHeight: 11, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' },
      svg('path', { d: 'M 0 0 L 10 5 L 0 10 z', class: `bloques-punta ${t}` })))),
    fondoGrupos, capaFlechas, capaBloques, capaEtiquetas);

  // Recuadros de cada nodo
  for (const [g, nombre] of Object.entries(sistema.grupos || {})) {
    const ids = Object.keys(sistema.bloques).filter((id) => sistema.bloques[id][3] === g);
    const xs = ids.map((id) => sistema.bloques[id][0]); const ys = ids.map((id) => sistema.bloques[id][1]);
    const x = Math.min(...xs) - 12; const y = Math.min(...ys) - 12;
    fondoGrupos.append(svg('rect', { x, y, width: Math.max(...xs) - x + ANCHO_B + 12, height: Math.max(...ys) - y + ALTO_B + 12, rx: 12, class: 'bloques-grupo' }),
      svg('text', { x: x + 8, y: Math.max(...ys) + ALTO_B + 14, class: 'bloques-grupo-texto' }, nombre));
  }
  const nodos = {};
  for (const [id, [x, y, texto]] of Object.entries(sistema.bloques)) {
    const g = svg('g', { class: 'bloques-bloque', tabindex: '0', role: 'button', 'aria-label': texto });
    // Partir el texto en líneas de hasta 24 letras
    const partes = [];
    for (const palabra of texto.split(' ')) {
      const ultima = partes[partes.length - 1];
      if (ultima !== undefined && (`${ultima} ${palabra}`).length <= 24) partes[partes.length - 1] = `${ultima} ${palabra}`;
      else partes.push(palabra);
    }
    g.append(svg('rect', { x, y, width: ANCHO_B, height: ALTO_B, rx: 8 }),
      ...partes.map((p, i) => svg('text', { x: x + ANCHO_B / 2, y: y + ALTO_B / 2 + 4 + (i - (partes.length - 1) / 2) * 15, 'text-anchor': 'middle' }, p)));
    const elegir = () => { elegido = elegido === id ? null : id; dibujar(); };
    g.addEventListener('click', elegir);
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); elegir(); } });
    nodos[id] = g;
    capaBloques.append(g);
  }

  const leyenda = el('div', { class: 'bloques-leyenda' }, ...Object.entries(TIPOS).map(([k, t]) => el('span', {}, el('span', { class: `bloques-muestra ${t.clase}` }), ` ${nombreTipo(k)}`)));
  const boton = el('button', { type: 'button', class: 'anim-boton' });
  const lista = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-bloques' }, raiz, leyenda,
    config.ocultar === 'si' ? el('div', { class: 'anim-rapidos' }, boton) : null, lista));

  function dibujar() {
    capaFlechas.replaceChildren(); capaEtiquetas.replaceChildren();
    for (const [a, b, tipo, etiqueta] of sistema.conexiones) {
      const marcada = elegido && (a === elegido || b === elegido);
      if (!visibles) continue;
      const p1 = borde(a, centro(b)); const p2 = borde(b, centro(a));
      capaFlechas.append(svg('line', {
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, class: `bloques-flecha ${tipo}${elegido && !marcada ? ' tenue' : ''}${marcada ? ' marcada' : ''}`,
        'marker-end': `url(#bloque-flecha-${tipo}-${config.sistema})`,
        ...(tipo === 'datos' ? { 'marker-start': `url(#bloque-flecha-${tipo}-${config.sistema})` } : {}),
      }));
      if (marcada) capaEtiquetas.append(svg('text', { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 - 6, class: 'bloques-etiqueta', 'text-anchor': 'middle' }, etiqueta));
    }
    Object.entries(nodos).forEach(([id, g]) => g.classList.toggle('elegido', id === elegido));
    boton.textContent = visibles ? 'Ocultar conexiones' : 'Mostrar conexiones';
    if (!elegido) lista.textContent = visibles ? 'Toca un bloque para ver con qué se conecta.' : 'Las conexiones están ocultas: complétenlas en la tabla y luego compárenlas.';
    else if (!visibles) lista.textContent = `${sistema.bloques[elegido][2]}: las conexiones están ocultas.`;
    else {
      const suyas = sistema.conexiones.filter(([a, b]) => a === elegido || b === elegido)
        .map(([a, b, tipo, etiqueta]) => `${sistema.bloques[a === elegido ? b : a][2]} (${nombreTipo(tipo)}: ${etiqueta})`);
      lista.textContent = `${sistema.bloques[elegido][2]} se conecta con: ${suyas.join(' · ')}.`;
    }
  }
  boton.addEventListener('click', () => { visibles = !visibles; dibujar(); });
  dibujar();
}

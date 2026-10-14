// ============================================================
// Animación "bluetooth": el marcador manda sus mensajes al celular por Bluetooth.
// El Arduino escribe "MARCADOR:1-0" y "TIEMPO:170" (como en la guía 14), el texto
// viaja por el cable al HC-05 y de ahí, sin cables, a la app del celular.
// Los mensajes son los mismos que se ven en el Monitor serie.
// Conexiones de la guía: TXD → D10, RXD → D11 (con divisor 1 kΩ / 2 kΩ).
// No explica por qué se usan D10 y D11 (lo pregunta la guía).
//
// En la guía:
//   :::animacion tipo="bluetooth"
//   :::
// Opciones (todas opcionales): duracion (180 s)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

// Camino del mensaje: Arduino (D11) → cable → HC-05 → aire → celular
const RUTA = [[150, 112], [250, 112], [300, 112], [460, 112]];

export default function montar(contenedor, config) {
  const DURACION = limitar(Math.round(numero(config.duracion, 180)), 30, 600);
  let golesAzul = 0; let golesRojo = 0;
  let quedan = DURACION; let reloj = 0; let ultimo = 0; let siguienteTiempo = 1500;
  const cola = [];           // mensajes que van viajando { texto, t }
  let app = []; let monitor = [];

  const viajeros = svg('g', {});
  const ondas = svg('g', { class: 'bt-ondas' }, ...[0, 1, 2].map((i) => svg('path', { d: `M ${330 + i * 22} 92 q 10 20 0 40`, style: `animation-delay:${i * 0.25}s` })));
  const raiz = svg('svg', { viewBox: '0 0 560 220', class: 'bt-svg', role: 'img', 'aria-label': 'Arduino, módulo HC-05 y celular' },
    svg('rect', { x: 20, y: 60, width: 130, height: 110, rx: 8, class: 'wifi-arduino' }),
    svg('text', { x: 85, y: 100, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'Arduino'),
    svg('text', { x: 85, y: 120, class: 'wifi-texto claro chico', 'text-anchor': 'middle' }, 'marcador'),
    svg('text', { x: 146, y: 106, class: 'bt-pin', 'text-anchor': 'end' }, 'D11'),
    svg('text', { x: 146, y: 150, class: 'bt-pin', 'text-anchor': 'end' }, 'D10'),
    // Cables: D11 → RXD (con divisor) y TXD → D10
    svg('line', { x1: 150, y1: 112, x2: 250, y2: 112, class: 'bt-cable tx' }),
    svg('line', { x1: 150, y1: 146, x2: 250, y2: 146, class: 'bt-cable rx' }),
    svg('rect', { x: 186, y: 104, width: 24, height: 16, rx: 3, class: 'bt-divisor' }),
    svg('text', { x: 198, y: 134, class: 'bt-pin', 'text-anchor': 'middle' }, '1k / 2k'),
    svg('rect', { x: 250, y: 84, width: 70, height: 90, rx: 6, class: 'bt-modulo' }),
    svg('text', { x: 285, y: 128, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'HC-05'),
    svg('text', { x: 256, y: 108, class: 'bt-pin claro' }, 'RXD'),
    svg('text', { x: 256, y: 160, class: 'bt-pin claro' }, 'TXD'),
    ondas,
    svg('rect', { x: 430, y: 30, width: 110, height: 180, rx: 14, class: 'wifi-celular' }),
    svg('rect', { x: 438, y: 46, width: 94, height: 150, rx: 4, class: 'bt-pantalla' }),
    viajeros);
  const appTexto = svg('text', { x: 444, y: 64, class: 'bt-app' });
  raiz.append(appTexto);

  const vista = el('pre', { class: 'disp-monitor', 'aria-live': 'polite', 'aria-label': 'Monitor serie' });
  const botonAzul = el('button', { type: 'button', class: 'anim-boton' }, '⚽ Gol del AZUL');
  const botonRojo = el('button', { type: 'button', class: 'anim-boton' }, '⚽ Gol del ROJO');
  const botonReiniciar = el('button', { type: 'button', class: 'anim-boton' }, '↺ Nuevo partido');
  contenedor.append(el('div', { class: 'anim-bluetooth' },
    raiz,
    el('div', { class: 'anim-controles' },
      el('div', { class: 'anim-rapidos' }, botonAzul, botonRojo, botonReiniciar),
      el('p', { class: 'anim-etiqueta' }, 'Monitor serie (lo mismo que recibe el celular)'), vista,
      el('p', { class: 'texto-ayuda' }, 'El tiempo se manda cada 10 segundos (aquí, cada 2 s para no esperar tanto).'))));

  function enviar(texto) {
    monitor.push(texto); monitor = monitor.slice(-7); vista.textContent = monitor.join('\n');
    cola.push({ texto, t: 0 });
  }
  const marcador = () => enviar(`MARCADOR:${golesAzul}-${golesRojo}`);

  function dibujarApp() {
    appTexto.replaceChildren(...app.slice(-8).map((m, i) => svg('tspan', { x: 444, y: 64 + i * 17 }, m)));
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; reloj += dt;
    // Cada 2 s de verdad pasan 10 s de partido
    if (reloj >= siguienteTiempo && quedan > 0) {
      siguienteTiempo = reloj + 2000;
      enviar(`TIEMPO:${quedan}`);
      quedan = Math.max(0, quedan - 10);
    }
    viajeros.replaceChildren();
    for (const m of cola) {
      m.t += dt / 1400;
      const pos = Math.min(m.t, 1) * (RUTA.length - 1);
      const i = Math.min(Math.floor(pos), RUTA.length - 2); const f = pos - i;
      const x = RUTA[i][0] + (RUTA[i + 1][0] - RUTA[i][0]) * f; const y = RUTA[i][1] + (RUTA[i + 1][1] - RUTA[i][1]) * f;
      viajeros.append(svg('g', { transform: `translate(${x} ${y - 14})`, class: 'gemelo-paquete' },
        svg('rect', { x: -4, y: -9, width: m.texto.length * 6.6 + 8, height: 18, rx: 9 }),
        svg('text', { x: 0, y: 4 }, m.texto)));
      if (m.t >= 1 && !m.llego) { m.llego = true; app.push(m.texto); dibujarApp(); }
    }
    while (cola.length && cola[0].llego) cola.shift();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonAzul.addEventListener('click', () => { golesAzul++; marcador(); });
  botonRojo.addEventListener('click', () => { golesRojo++; marcador(); });
  botonReiniciar.addEventListener('click', () => {
    golesAzul = 0; golesRojo = 0; quedan = DURACION; siguienteTiempo = reloj; app = []; monitor = [];
    vista.textContent = ''; dibujarApp(); marcador();
  });
  marcador();
  requestAnimationFrame(cuadro);
}

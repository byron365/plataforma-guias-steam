// ============================================================
// Animación "iot": una luz controlada desde una página web (ESP32 + WebServer).
// Como en el código de la guía 14: el navegador pide "/", "/on" u "/off";
// el ESP32 responde con la página y enciende o apaga el LED del pin 2.
// Se ve el pedido viajando por la red y la respuesta que regresa.
// No compara Bluetooth con WiFi (eso lo completa el equipo en su tabla).
//
// En la guía:
//   :::animacion tipo="iot"
//   :::
// Opciones (todas opcionales): pin (2) · titulo ("Casa STEAM")
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const RUTA = [[120, 130], [260, 70], [400, 130]]; // navegador → router → ESP32

export default function montar(contenedor, config) {
  const pin = limitar(Math.round(numero(config.pin, 2)), 0, 39);
  const titulo = String(config.titulo || 'Casa STEAM').slice(0, 24);
  let luz = false; let viaje = null; let ultimo = 0;
  let registro = [];

  const paquete = svg('g', { class: 'gemelo-paquete' }, svg('rect', { x: -28, y: -11, width: 56, height: 22, rx: 11 }), svg('text', { x: 0, y: 4, 'text-anchor': 'middle' }));
  const led = svg('circle', { cx: 470, cy: 120, r: 12, class: 'iot-led' });
  const raiz = svg('svg', { viewBox: '0 0 520 200', class: 'iot-svg', role: 'img', 'aria-label': 'Navegador, router y ESP32 con un LED' },
    svg('rect', { x: 50, y: 100, width: 100, height: 70, rx: 8, class: 'wifi-pantalla' }),
    svg('text', { x: 100, y: 140, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'Navegador'),
    svg('rect', { x: 230, y: 54, width: 60, height: 24, rx: 5, class: 'wifi-router' }),
    svg('text', { x: 260, y: 96, class: 'wifi-texto', 'text-anchor': 'middle' }, 'Router WiFi'),
    svg('rect', { x: 370, y: 100, width: 70, height: 60, rx: 6, class: 'wifi-esp32' }),
    svg('text', { x: 405, y: 128, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'ESP32'),
    svg('text', { x: 405, y: 146, class: 'wifi-texto claro chico', 'text-anchor': 'middle' }, 'servidor :80'),
    svg('line', { x1: 440, y1: 120, x2: 458, y2: 120, class: 'mos-cable' }),
    led, svg('text', { x: 470, y: 150, class: 'wifi-texto', 'text-anchor': 'middle' }, `LED (pin ${pin})`),
    paquete);

  // La página que manda el ESP32 (como pagina() del código)
  const pagina = el('div', { class: 'iot-pagina', role: 'region', 'aria-label': 'Página del ESP32' },
    el('div', { class: 'iot-barra' }, el('span', { class: 'iot-direccion' }, 'http://(dirección del ESP32)/')),
    el('h4', {}, titulo),
    el('p', {}, el('a', { href: '#', onclick: (e) => { e.preventDefault(); pedir('/on'); } }, 'Encender sala')),
    el('p', {}, el('a', { href: '#', onclick: (e) => { e.preventDefault(); pedir('/off'); } }, 'Apagar sala')));
  const monitor = el('pre', { class: 'disp-monitor', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-iot' }, raiz,
    el('div', { class: 'iot-panel' }, pagina, el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Lo que pasa'), monitor))));

  const escribir = (t) => { registro.push(t); registro = registro.slice(-6); monitor.textContent = registro.join('\n'); };

  function pedir(ruta) {
    if (viaje) return;
    viaje = { ruta, t: 0, vuelta: false };
    escribir(`Navegador → GET ${ruta}`);
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo;
    if (viaje) {
      viaje.t += dt / 1100;
      if (viaje.t >= 1 && !viaje.vuelta) {
        // El ESP32 atiende el pedido (servidor.on(...))
        if (viaje.ruta === '/on') { luz = true; escribir(`ESP32: digitalWrite(${pin}, HIGH)`); }
        if (viaje.ruta === '/off') { luz = false; escribir(`ESP32: digitalWrite(${pin}, LOW)`); }
        escribir('ESP32 → envía la página (200, text/html)');
        viaje = { ...viaje, t: 0, vuelta: true };
      } else if (viaje.t >= 1 && viaje.vuelta) {
        escribir('Navegador: muestra la página');
        viaje = null;
      }
    }
    if (viaje) {
      const f = Math.min(viaje.t, 1);
      const pos = (viaje.vuelta ? 1 - f : f) * (RUTA.length - 1);
      const i = Math.min(Math.floor(pos), RUTA.length - 2); const k = pos - i;
      paquete.style.display = '';
      paquete.setAttribute('transform', `translate(${RUTA[i][0] + (RUTA[i + 1][0] - RUTA[i][0]) * k} ${RUTA[i][1] + (RUTA[i + 1][1] - RUTA[i][1]) * k - 16})`);
      paquete.querySelector('text').textContent = viaje.vuelta ? 'página' : viaje.ruta;
    } else paquete.style.display = 'none';
    led.classList.toggle('encendido', luz);
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  escribir('ESP32 conectado al WiFi. servidor.begin()');
  requestAnimationFrame(cuadro);
}

// ============================================================
// Animación "wifi-datos": ¿cómo viajan los datos de la estación?
// - Por cable USB (como hasta ahora): Arduino → computadora.
// - Por WiFi (ESP32): la placa se conecta a la red, y los datos van
//   al router, a internet y de ahí a cualquier celular.
// El monitor serie muestra lo que imprime el código de la guía 14.
//
// En la guía:
//   :::animacion tipo="wifi-datos"
//   :::
// Opciones (todas opcionales): red ("Wokwi-GUEST") · temp (24.6)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

// Recorridos de los datos en cada modo (puntos por donde pasa el paquete)
const RUTAS = {
  usb: [[110, 170], [300, 170], [470, 170]],
  wifi: [[110, 170], [250, 90], [380, 60], [520, 120], [560, 220]],
};

export default function montar(contenedor, config) {
  const red = String(config.red || 'Wokwi-GUEST').slice(0, 30);
  let temp = limitar(numero(config.temp, 24.6), -10, 45);
  let modo = 'usb';
  let conectado = false; let puntos = 0;
  let t = 0; let ultimo = 0; let espera = 0;
  let lineas = [];

  const placa = svg('g', {});
  const escenaUsb = svg('g', { class: 'wifi-escena' },
    svg('path', { d: 'M 120 170 C 220 200, 340 200, 440 176', class: 'wifi-cable' }),
    svg('rect', { x: 440, y: 120, width: 120, height: 80, rx: 6, class: 'wifi-pantalla' }),
    svg('rect', { x: 425, y: 200, width: 150, height: 10, rx: 4, class: 'wifi-teclado' }),
    svg('text', { x: 500, y: 165, class: 'wifi-texto claro', 'text-anchor': 'middle' }, 'Computadora'),
    svg('text', { x: 290, y: 215, class: 'wifi-texto', 'text-anchor': 'middle' }, 'cable USB'));
  const ondas = svg('g', { class: 'wifi-ondas' }, ...[16, 28, 40].map((r) => svg('path', { d: `M ${110 - r * 0.7} ${120 - r * 0.7} A ${r} ${r} 0 0 1 ${110 + r * 0.7} ${120 - r * 0.7}` })));
  const escenaWifi = svg('g', { class: 'wifi-escena' },
    ondas,
    svg('rect', { x: 225, y: 80, width: 60, height: 24, rx: 5, class: 'wifi-router' }),
    svg('line', { x1: 238, y1: 80, x2: 232, y2: 62, class: 'wifi-antena' }), svg('line', { x1: 272, y1: 80, x2: 278, y2: 62, class: 'wifi-antena' }),
    svg('text', { x: 255, y: 122, class: 'wifi-texto', 'text-anchor': 'middle' }, `Router (${red})`),
    svg('path', { d: 'M 340 70 a 22 22 0 0 1 38 -16 a 28 28 0 0 1 50 6 a 20 20 0 0 1 4 38 h -86 a 18 18 0 0 1 -6 -28 z', class: 'wifi-nube' }),
    svg('text', { x: 385, y: 86, class: 'wifi-texto', 'text-anchor': 'middle' }, 'Internet'),
    svg('rect', { x: 530, y: 150, width: 54, height: 96, rx: 9, class: 'wifi-celular' }),
    svg('rect', { x: 536, y: 162, width: 42, height: 70, rx: 3, class: 'wifi-celular-pantalla' }));
  const celularTexto = svg('text', { x: 557, y: 202, class: 'wifi-celular-texto', 'text-anchor': 'middle' });
  escenaWifi.append(celularTexto);
  const paquete = svg('g', { class: 'gemelo-paquete' }, svg('rect', { x: -26, y: -11, width: 52, height: 22, rx: 11 }), svg('text', { x: 0, y: 4, 'text-anchor': 'middle' }));
  const raiz = svg('svg', { viewBox: '0 0 600 260', class: 'wifi-svg', role: 'img', 'aria-label': 'Camino de los datos de la estación' },
    placa, escenaUsb, escenaWifi, paquete);

  const monitor = el('pre', { class: 'disp-monitor', 'aria-live': 'polite', 'aria-label': 'Monitor serie' });
  const modos = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Cómo viajan los datos' },
    [['usb', '🔌 Hoy: cable USB'], ['wifi', '📶 Con WiFi (ESP32)']].map(([k, txt]) =>
      el('button', { type: 'button', class: 'anim-boton', 'data-modo': k, onclick: () => cambiar(k) }, txt)));
  const deslizador = el('input', { type: 'range', class: 'anim-deslizador', min: 10, max: 40, step: 0.1, value: temp, 'aria-label': 'Temperatura' });
  deslizador.addEventListener('input', () => { temp = Number(deslizador.value); });
  const explicacion = el('p', { class: 'anim-estado' });
  contenedor.append(el('div', { class: 'anim-wifi' },
    modos, raiz,
    el('div', { class: 'wifi-panel' },
      el('div', {}, explicacion, el('label', { class: 'anim-etiqueta' }, 'Temperatura del sensor', deslizador)),
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Monitor serie'), monitor))));

  function escribir(linea, mismaLinea = false) {
    if (mismaLinea && lineas.length) lineas[lineas.length - 1] += linea;
    else lineas.push(linea);
    lineas = lineas.slice(-6);
    monitor.textContent = lineas.join('\n');
  }

  function cambiar(k) {
    modo = k; conectado = k === 'usb'; puntos = 0; t = 0; espera = 0; lineas = [];
    modos.querySelectorAll('button').forEach((b) => { const a = b.dataset.modo === k; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    escenaUsb.style.display = k === 'usb' ? '' : 'none';
    escenaWifi.style.display = k === 'wifi' ? '' : 'none';
    placa.replaceChildren(
      svg('rect', { x: 40, y: 135, width: 80, height: 70, rx: 6, class: k === 'usb' ? 'wifi-arduino' : 'wifi-esp32' }),
      svg('text', { x: 80, y: 168, class: 'wifi-texto claro', 'text-anchor': 'middle' }, k === 'usb' ? 'Arduino' : 'ESP32'),
      svg('text', { x: 80, y: 186, class: 'wifi-texto claro chico', 'text-anchor': 'middle' }, '+ DHT22'));
    explicacion.textContent = k === 'usb'
      ? 'Los datos solo llegan a la computadora que está conectada con el cable.'
      : 'El ESP32 se conecta a la red y sus datos pueden llegar a cualquier celular con internet.';
    celularTexto.textContent = '';
    if (k === 'wifi') escribir('Conectando');
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo;
    if (!conectado) {
      // while (WiFi.status() != WL_CONNECTED) { delay(250); Serial.print("."); }
      espera += dt;
      if (espera > 250) { espera = 0; puntos++; escribir('.', true); }
      if (puntos >= 8) { conectado = true; escribir(' listo!', true); escribir('Mi direccion: (la que da la red)'); }
      paquete.style.display = 'none';
      ondas.classList.toggle('buscando', true);
    } else {
      ondas.classList.toggle('buscando', false);
      const ruta = RUTAS[modo];
      t += dt / 2000; // una lectura cada 2 s, como delay(2000)
      if (t >= 1) {
        t = 0;
        escribir(modo === 'usb' ? `Temp: ${temp.toFixed(2)} C` : `Enviando temperatura: ${temp.toFixed(2)}`);
        if (modo === 'wifi') celularTexto.textContent = `${temp.toFixed(1)}°`;
      }
      // Posición del paquete a lo largo de la ruta
      const tramos = ruta.length - 1;
      const pos = Math.min(t * 1.25, 1) * tramos;
      const i = Math.min(Math.floor(pos), tramos - 1); const f = pos - i;
      const x = ruta[i][0] + (ruta[i + 1][0] - ruta[i][0]) * f; const y = ruta[i][1] + (ruta[i + 1][1] - ruta[i][1]) * f;
      paquete.style.display = t * 1.25 <= 1 ? '' : 'none';
      paquete.setAttribute('transform', `translate(${x} ${y})`);
      paquete.querySelector('text').textContent = temp.toFixed(1);
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  cambiar('usb');
  requestAnimationFrame(cuadro);
}

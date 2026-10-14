// ============================================================
// Animación "oled": la pantalla OLED de 128 × 64 y cómo le habla el Arduino.
// - Por I2C, con solo dos cables (SDA = datos, SCL = reloj), a la dirección 0x3C.
// - Modo "Pantalla de la estación": el código base de la guía con temperatura,
//   humedad y luz que se pueden mover.
// - Modo "Nuestra pantalla": probar setTextSize() y setCursor() con un mensaje propio.
// No dice cuántos píxeles tiene en total (lo calcula el equipo).
//
// En la guía:
//   :::animacion tipo="oled"
//   :::
// Opciones (todas opcionales): direccion ("0x3C") · mensaje ("Hola!")
// ============================================================
import { svg, limitar } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

export default function montar(contenedor, config) {
  const direccion = /^0x[0-9a-f]{2}$/i.test(config.direccion || '') ? config.direccion : '0x3C';
  const estado = { modo: 'estacion', temp: 24.6, hum: 63, luz: 78, mensaje: String(config.mensaje || 'Hola!').slice(0, 40), tamano: 2, x: 0, y: 0 };
  const pantalla = crearOLED({ escala: 3 });

  // ---------- Los dos cables I2C ----------
  const pulsos = svg('g', { class: 'oled-pulsos' });
  const bus = svg('svg', { viewBox: '0 0 420 120', class: 'oled-bus', role: 'img', 'aria-label': `Arduino y pantalla unidos por SDA (A4) y SCL (A5), dirección ${direccion}` },
    svg('rect', { x: 6, y: 20, width: 96, height: 80, rx: 8, class: 'oled-caja-arduino' }),
    svg('text', { x: 54, y: 52, class: 'oled-texto-claro', 'text-anchor': 'middle' }, 'Arduino'),
    svg('text', { x: 54, y: 72, class: 'oled-texto-claro chico', 'text-anchor': 'middle' }, 'UNO'),
    svg('rect', { x: 318, y: 20, width: 96, height: 80, rx: 8, class: 'oled-caja-modulo' }),
    svg('text', { x: 366, y: 52, class: 'oled-texto-claro', 'text-anchor': 'middle' }, 'OLED'),
    svg('text', { x: 366, y: 72, class: 'oled-texto-claro chico', 'text-anchor': 'middle' }, direccion),
    svg('line', { x1: 102, y1: 44, x2: 318, y2: 44, class: 'oled-cable sda' }),
    svg('line', { x1: 102, y1: 80, x2: 318, y2: 80, class: 'oled-cable scl' }),
    svg('text', { x: 110, y: 38, class: 'oled-etiqueta' }, 'A4 · SDA (datos)'),
    svg('text', { x: 110, y: 100, class: 'oled-etiqueta' }, 'A5 · SCL (reloj)'),
    pulsos);
  const avisoBus = el('p', { class: 'anim-estado', 'aria-live': 'polite' });

  // ---------- Controles ----------
  const modos = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Qué mostrar' },
    [['estacion', 'Pantalla de la estación'], ['propia', 'Nuestra pantalla']].map(([k, t]) =>
      el('button', { type: 'button', class: 'anim-boton', 'data-modo': k, onclick: () => { estado.modo = k; marcar(); enviar(); } }, t)));
  const rango = (min, max, paso, valor, etiqueta, clave) => {
    const r = el('input', { type: 'range', class: 'anim-deslizador', min, max, step: paso, value: valor, 'aria-label': etiqueta });
    r.addEventListener('input', () => { estado[clave] = Number(r.value); enviar(); });
    return r;
  };
  const panelEstacion = el('div', { class: 'oled-ajustes' },
    el('label', { class: 'anim-etiqueta' }, 'temp', rango(-10, 45, 0.1, estado.temp, 'Temperatura', 'temp')),
    el('label', { class: 'anim-etiqueta' }, 'hum', rango(0, 100, 1, estado.hum, 'Humedad', 'hum')),
    el('label', { class: 'anim-etiqueta' }, 'luz', rango(0, 100, 1, estado.luz, 'Luz', 'luz')));
  const entradaMensaje = el('input', { type: 'text', maxlength: 40, value: estado.mensaje, class: 'oled-mensaje', 'aria-label': 'Mensaje' });
  entradaMensaje.addEventListener('input', () => { estado.mensaje = entradaMensaje.value; enviar(); });
  const numeroEntrada = (min, max, valor, etiqueta, clave) => {
    const n = el('input', { type: 'number', min, max, step: 1, value: valor, class: 'temp-entrada', 'aria-label': etiqueta });
    n.addEventListener('change', () => { estado[clave] = limitar(Math.round(Number(n.value) || 0), min, max); n.value = estado[clave]; enviar(); });
    return n;
  };
  const panelPropio = el('div', { class: 'oled-ajustes' },
    el('label', { class: 'anim-etiqueta' }, 'Mensaje ', entradaMensaje),
    el('label', { class: 'anim-etiqueta' }, 'setTextSize( ', numeroEntrada(1, 3, estado.tamano, 'Tamaño del texto', 'tamano'), ' )'),
    el('label', { class: 'anim-etiqueta' }, 'setCursor( ', numeroEntrada(0, 127, estado.x, 'x', 'x'), ' , ', numeroEntrada(0, 63, estado.y, 'y', 'y'), ' )'));
  const codigo = el('pre', { class: 'joystick-codigo' });

  contenedor.append(el('div', { class: 'anim-oled' },
    el('div', { class: 'oled-columna' },
      el('div', { class: 'oled-marco' }, pantalla.lienzo),
      el('p', { class: 'texto-ayuda' }, 'x va de 0 a 127 (izquierda → derecha) · y va de 0 a 63 (arriba → abajo)'),
      bus, avisoBus),
    el('div', { class: 'anim-controles' }, modos, panelEstacion, panelPropio, codigo)));

  function marcar() {
    modos.querySelectorAll('button').forEach((b) => { const a = b.dataset.modo === estado.modo; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    panelEstacion.hidden = estado.modo !== 'estacion';
    panelPropio.hidden = estado.modo !== 'propia';
  }

  // Dibuja y muestra el código que hace lo mismo
  function dibujar() {
    pantalla.clearDisplay();
    if (estado.modo === 'estacion') {
      pantalla.setTextSize(2); pantalla.setCursor(0, 0);
      pantalla.print(estado.temp.toFixed(1)); pantalla.println(' C');
      pantalla.setTextSize(1);
      pantalla.print('Humedad: '); pantalla.println(String(Math.round(estado.hum)));
      pantalla.print('Luz: '); pantalla.println(String(estado.luz));
      codigo.textContent =
        'pantalla.clearDisplay();\npantalla.setTextSize(2);\npantalla.setCursor(0, 0);\n' +
        `pantalla.print(temp, 1);        // ${estado.temp.toFixed(1)}\npantalla.println(" C");\n` +
        'pantalla.setTextSize(1);\npantalla.print("Humedad: ");\n' +
        `pantalla.println(hum, 0);       // ${Math.round(estado.hum)}\npantalla.print("Luz: ");\n` +
        `pantalla.println(luz);          // ${estado.luz}\npantalla.display();`;
    } else {
      pantalla.setTextSize(estado.tamano); pantalla.setCursor(estado.x, estado.y);
      pantalla.println(estado.mensaje);
      codigo.textContent =
        `pantalla.clearDisplay();\npantalla.setTextSize(${estado.tamano});\npantalla.setCursor(${estado.x}, ${estado.y});\n` +
        `pantalla.println("${estado.mensaje.replace(/"/g, '\\"')}");\npantalla.display();`;
    }
    pantalla.display();
  }

  // Cada display() manda los datos por los dos cables
  let ultimoEnvio = -Infinity;
  function enviar() {
    dibujar();
    const ahora = performance.now();
    if (ahora - ultimoEnvio < 350) return; // no llenar de pulsos mientras se arrastra
    ultimoEnvio = ahora;
    avisoBus.textContent = `Arduino: "${direccion}, ¿estás ahí?" → la pantalla responde → el Arduino manda lo que hay que dibujar.`;
    pulsos.replaceChildren();
    for (let i = 0; i < 6; i++) {
      pulsos.append(svg('rect', { x: 104, y: 40, width: 10, height: 8, rx: 2, class: 'oled-bit', style: `animation-delay:${i * 0.12}s` }));
      pulsos.append(svg('rect', { x: 104, y: 76, width: 6, height: 8, rx: 1, class: 'oled-reloj', style: `animation-delay:${i * 0.12}s` }));
    }
  }

  marcar();
  enviar();
}

// ============================================================
// Animación "casa": la casa inteligente completa, con sus cuatro programas.
//   Celular → (Bluetooth) → central → (I2C, 2 bytes: letra + valor) → nodos.
//   Sala (8):    'L' 0–100 o 255 (auto: brillo 80 si la luz ambiente es menor que 30).
//   Cuarto (9):  'V' 0–100 o 255 (auto: 100 desde 28 °C, 60 desde 25 °C; revisa cada 2 s).
//   Entrada (10): 'A' abre la cerradura 2 s · 'F' 1/0 arma o desarma la alarma (PIR + buzzer).
//   Cada 500 ms la central pide 2 bytes a cada nodo y los muestra en la OLED.
// Órdenes del celular como en casa_CENTRAL.ino: L75, LA, V50, VA, A, N, F, C.
//
// En la guía:
//   :::animacion tipo="casa"
//   :::
// Opciones: ninguna.
// ============================================================
import { svg, limitar, pocoMovimiento } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

const RAPIDOS = ['L100', 'L30', 'LA', 'V100', 'V50', 'VA', 'A', 'N', 'F', 'C'];

export default function montar(contenedor) {
  // ---------- Estado de cada nodo (lo que tiene cada Arduino) ----------
  const sala = { pedido: 0, brillo: 0, luz: 70 };          // luz ambiente en %
  const cuarto = { pedido: 255, vel: 0, temp: 24, tempReal: 24, siguiente: 0 };
  const entrada = { abrir: false, abiertaHasta: 0, armada: false, alarma: false };
  const estado = [[0, 0], [0, 0], [0, 0]];                  // lo que guarda la central
  let alertaEnviada = false;
  let reloj = 0; let ultimo = 0; let ultimaLectura = 0; let giro = 0;
  let mensajes = []; let bus = [];

  // ---------- Dibujo de la casa (vista desde arriba) ----------
  const tira = svg('rect', { x: 30, y: 34, width: 180, height: 12, rx: 6, class: 'casa-tira' });
  const brilloSala = svg('rect', { x: 24, y: 24, width: 222, height: 146, class: 'casa-brillo' });
  const sol = svg('text', { x: 222, y: 64, class: 'casa-sol', 'text-anchor': 'middle' }, '☀');
  const aspas = svg('g', { class: 'casa-aspas' });
  const puerta = svg('line', { x1: 70, y1: 318, x2: 130, y2: 318, class: 'casa-puerta' });
  const persona = svg('text', { x: 190, y: 290, class: 'casa-persona', 'text-anchor': 'middle' }, '🚶');
  const buzzer = svg('text', { x: 222, y: 236, class: 'casa-buzzer', 'text-anchor': 'middle' }, '🔊');
  const termometro = svg('text', { x: 470, y: 150, class: 'casa-texto', 'text-anchor': 'middle' });
  const raiz = svg('svg', { viewBox: '0 0 520 340', class: 'casa-svg', role: 'img', 'aria-label': 'Casa inteligente vista desde arriba' },
    svg('rect', { x: 20, y: 20, width: 480, height: 300, rx: 6, class: 'casa-piso' }),
    brilloSala,
    svg('line', { x1: 250, y1: 20, x2: 250, y2: 320, class: 'casa-pared' }),
    svg('line', { x1: 20, y1: 174, x2: 500, y2: 174, class: 'casa-pared' }),
    svg('text', { x: 36, y: 74, class: 'casa-cuarto' }, 'Sala (8)'),
    svg('text', { x: 266, y: 44, class: 'casa-cuarto' }, 'Cuarto (9)'),
    svg('text', { x: 36, y: 200, class: 'casa-cuarto' }, 'Entrada (10)'),
    svg('text', { x: 266, y: 200, class: 'casa-cuarto' }, 'Central'),
    tira, sol,
    svg('circle', { cx: 380, cy: 104, r: 40, class: 'casa-ventilador' }), aspas, termometro,
    svg('rect', { x: 60, y: 312, width: 80, height: 12, class: 'casa-marco' }), puerta,
    svg('text', { x: 100, y: 300, class: 'casa-texto', 'text-anchor': 'middle' }, 'cerradura'),
    persona, buzzer,
    svg('rect', { x: 300, y: 220, width: 60, height: 36, rx: 4, class: 'casa-arduino' }),
    svg('text', { x: 330, y: 243, class: 'casa-texto claro', 'text-anchor': 'middle' }, 'central'),
    svg('rect', { x: 380, y: 222, width: 34, height: 22, rx: 3, class: 'casa-hc05' }),
    svg('text', { x: 397, y: 260, class: 'casa-texto', 'text-anchor': 'middle' }, 'HC-05'));

  const pantalla = crearOLED({ escala: 2 });

  // ---------- Celular ----------
  const chat = el('pre', { class: 'casa-chat', 'aria-live': 'polite', 'aria-label': 'Mensajes del celular' });
  const entradaTexto = el('input', { type: 'text', class: 'oled-mensaje', maxlength: 6, placeholder: 'L75', 'aria-label': 'Mensaje para la central' });
  const botonEnviar = el('button', { type: 'button', class: 'anim-boton' }, 'Enviar');
  const celular = el('div', { class: 'casa-celular' },
    el('p', { class: 'casa-celular-titulo' }, '📱 Celular (Bluetooth)'), chat,
    el('div', { class: 'casa-teclas' }, ...RAPIDOS.map((m) => el('button', { type: 'button', class: 'anim-boton', onclick: () => desdeCelular(m) }, m))),
    el('div', { class: 'casa-enviar' }, entradaTexto, botonEnviar));

  // ---------- El mundo ----------
  const rLuz = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 100, step: 1, value: sala.luz, 'aria-label': 'Luz ambiente en la sala' });
  const rTemp = el('input', { type: 'range', class: 'anim-deslizador', min: 15, max: 35, step: 1, value: cuarto.tempReal, 'aria-label': 'Temperatura del cuarto' });
  const botonPir = el('button', { type: 'button', class: 'anim-boton' }, '🚶 Alguien pasa frente al PIR');
  const registroBus = el('pre', { class: 'joystick-codigo', 'aria-live': 'off' });

  contenedor.append(el('div', { class: 'anim-casa' },
    el('div', {}, raiz,
      el('div', { class: 'casa-mundo' },
        el('label', { class: 'anim-etiqueta' }, 'Luz ambiente (LDR de la sala)', rLuz),
        el('label', { class: 'anim-etiqueta' }, 'Temperatura del cuarto', rTemp),
        el('div', { class: 'anim-rapidos' }, botonPir))),
    el('div', { class: 'casa-lado' },
      celular,
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Pantalla de la central'), el('div', { class: 'oled-marco chico' }, pantalla.lienzo)),
      el('div', {}, el('p', { class: 'anim-etiqueta' }, 'Bus I2C'), registroBus))));

  const escribirChat = (t) => { mensajes.push(t); mensajes = mensajes.slice(-7); chat.textContent = mensajes.join('\n'); };
  const anotarBus = (t) => { bus.push(t); bus = bus.slice(-5); registroBus.textContent = bus.join('\n'); };

  // ---------- Nodos: recibir(orden, valor) ----------
  function enviar(nodo, orden, valor) {
    anotarBus(`central → ${['sala', 'cuarto', 'entrada'][nodo]} (${8 + nodo}): '${orden}' ${valor}`);
    if (nodo === 0 && orden === 'L') sala.pedido = valor;
    if (nodo === 1 && orden === 'V') { cuarto.pedido = valor; }
    if (nodo === 2 && orden === 'A') entrada.abrir = true;
    if (nodo === 2 && orden === 'F') entrada.armada = Boolean(valor);
  }

  // procesar() de la central
  function procesar(m) {
    const c = m[0];
    const r = m.slice(1);
    let v = limitar(parseInt(r, 10) || 0, 0, 100);
    if (r === 'A') v = 255;
    if (c === 'L') enviar(0, 'L', v);
    if (c === 'V') enviar(1, 'V', v);
    if (c === 'A') enviar(2, 'A', 1);
    if (c === 'N') { enviar(0, 'L', 20); enviar(1, 'V', 255); }
    if (c === 'F') { enviar(0, 'L', 0); enviar(1, 'V', 0); enviar(2, 'F', 1); }
    if (c === 'C') enviar(2, 'F', 0);
    escribirChat(`← OK ${m}`);
  }
  function desdeCelular(m) {
    const limpio = String(m).trim().toUpperCase();
    if (!limpio) return;
    escribirChat(`→ ${limpio}`);
    setTimeout(() => procesar(limpio), 150);
  }

  // ---------- loop() de cada nodo ----------
  function nodos() {
    // Sala (cada 50 ms en el código)
    sala.brillo = sala.pedido === 255 ? (sala.luz < 30 ? 80 : 0) : sala.pedido;
    // Cuarto (delay(2000))
    if (reloj >= cuarto.siguiente) {
      cuarto.siguiente = reloj + 2000;
      cuarto.temp = cuarto.tempReal;
      if (cuarto.pedido === 255) cuarto.vel = cuarto.temp >= 28 ? 100 : cuarto.temp >= 25 ? 60 : 0;
      else cuarto.vel = cuarto.pedido;
    }
    // Entrada
    if (entrada.abrir && entrada.abiertaHasta < reloj) { entrada.abiertaHasta = reloj + 2000; entrada.abrir = false; }
    if (!entrada.armada) entrada.alarma = false;
  }

  // leerNodos() y mostrar() de la central, cada 500 ms
  function leerNodos() {
    estado[0] = [sala.brillo, sala.luz];
    estado[1] = [cuarto.vel, cuarto.temp];
    estado[2] = [entrada.abiertaHasta > reloj || entrada.abrir ? 1 : 0, entrada.alarma ? 1 : 0];
    const alarma = estado[2][1] === 1;
    if (alarma && !alertaEnviada) escribirChat('⚠ ALERTA: movimiento en la entrada');
    alertaEnviada = alarma;
    pantalla.clearDisplay(); pantalla.setTextSize(1); pantalla.setCursor(0, 0);
    pantalla.print('Sala luz: '); pantalla.print(String(estado[0][0])); pantalla.println(' %');
    pantalla.print('Cuarto: '); pantalla.print(String(estado[1][1])); pantalla.print(' C, vent '); pantalla.print(String(estado[1][0])); pantalla.println(' %');
    pantalla.println(estado[2][0] ? 'Puerta ABIERTA' : 'Puerta cerrada');
    if (estado[2][1]) pantalla.println('ALARMA!');
    pantalla.display();
  }

  function dibujar() {
    const f = sala.brillo / 100;
    tira.setAttribute('fill', `rgba(253, 224, 71, ${0.15 + 0.85 * f})`);
    brilloSala.setAttribute('opacity', (f * 0.35).toFixed(2));
    sol.setAttribute('opacity', (0.2 + 0.8 * sala.luz / 100).toFixed(2));
    aspas.replaceChildren(...[0, 120, 240].map((a) => svg('line', {
      x1: 380, y1: 104, x2: 380 + Math.cos(((giro + a) * Math.PI) / 180) * 32, y2: 104 + Math.sin(((giro + a) * Math.PI) / 180) * 32,
    })));
    termometro.textContent = `🌡 ${cuarto.tempReal} °C`;
    const abierta = entrada.abiertaHasta > reloj;
    puerta.setAttribute('transform', abierta ? 'rotate(-70 70 318)' : '');
    persona.style.opacity = entrada.pirHasta > reloj ? '1' : '0';
    buzzer.style.opacity = entrada.alarma && Math.floor(reloj / 250) % 2 === 0 ? '1' : '0.15';
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; reloj += dt;
    if (!pocoMovimiento()) giro = (giro + dt * 0.8 * (cuarto.vel / 100)) % 360;
    nodos();
    if (reloj - ultimaLectura > 500) { ultimaLectura = reloj; leerNodos(); }
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  rLuz.addEventListener('input', () => { sala.luz = Number(rLuz.value); });
  rTemp.addEventListener('input', () => { cuarto.tempReal = Number(rTemp.value); });
  botonPir.addEventListener('click', () => {
    entrada.pirHasta = reloj + 1500;
    if (entrada.armada) entrada.alarma = true;     // armada && PIR en HIGH
  });
  botonEnviar.addEventListener('click', () => { desdeCelular(entradaTexto.value); entradaTexto.value = ''; });
  entradaTexto.addEventListener('keydown', (e) => { if (e.key === 'Enter') botonEnviar.click(); });
  escribirChat('Conectado a CasaSTEAM');
  anotarBus('La central pregunta a 8, 9 y 10 cada 500 ms');
  leerNodos();
  requestAnimationFrame(cuadro);
}

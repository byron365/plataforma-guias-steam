// ============================================================
// Animación "invernadero": el mini invernadero completo, como mini_invernadero.ino.
//   1. Riego: si suelo > UMBRAL_SECO (o el botón), la bomba riega TIEMPO_RIEGO
//      y luego espera 5 s a que el agua baje.
//   2. Ventana con histéresis: abre a más de TEMP_ABRIR y cierra a menos de TEMP_CERRAR.
//   3. Luz con temporizador: encendida si millis() % ciclo < LUZ_ON.
// La tierra se va secando sola; la temperatura se cambia con el deslizador.
//
// En la guía:
//   :::animacion tipo="invernadero"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo"):
//   umbral (500) · riego (3000 ms) · abrir (30 °C) · cerrar (27 °C) · luzon (60000 ms) · luzoff (60000 ms)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const SECO = [200, 162, 122];   // color de la tierra seca
const MOJADO = [91, 58, 30];    // color de la tierra mojada

export default function montar(contenedor, config) {
  const UMBRAL = limitar(numero(config.umbral, 500), 100, 1000);
  const TIEMPO_RIEGO = limitar(numero(config.riego, 3000), 500, 10000);
  const ABRIR = numero(config.abrir, 30);
  const CERRAR = numero(config.cerrar, 27);
  const LUZ_ON = limitar(numero(config.luzon, 60000), 1000, 600000);
  const LUZ_OFF = limitar(numero(config.luzoff, 60000), 1000, 600000);

  // ---------- Dibujo ----------
  const raiz = svg('svg', { viewBox: '0 0 460 320', class: 'inv-svg', role: 'img', 'aria-label': 'Mini invernadero con planta, bomba, ventana y luz' });
  const tierra = svg('ellipse', { cx: 170, cy: 214, rx: 48, ry: 9, class: 'inv-tierra' });
  const ventana = svg('g', { class: 'inv-ventana' }, svg('rect', { x: 0, y: -4, width: 80, height: 6, rx: 2 }));
  const luz = svg('g', { class: 'inv-luz' },
    svg('rect', { x: 110, y: 86, width: 120, height: 10, rx: 4, class: 'inv-luz-barra' }),
    ...[0, 1, 2, 3].map((i) => svg('line', { x1: 125 + i * 30, y1: 100, x2: 120 + i * 30, y2: 126, class: 'inv-rayo' })));
  const gotas = svg('g', { class: 'inv-gotas' });
  const bomba = svg('rect', { x: 361, y: 262, width: 18, height: 14, rx: 3, class: 'inv-bomba' });
  raiz.append(
    svg('rect', { x: 0, y: 280, width: 460, height: 40, class: 'inv-suelo' }),
    // Casa transparente
    svg('rect', { x: 60, y: 80, width: 280, height: 200, class: 'inv-casa' }),
    svg('line', { x1: 60, y1: 80, x2: 230, y2: 80, class: 'inv-techo' }),
    svg('line', { x1: 310, y1: 80, x2: 340, y2: 80, class: 'inv-techo' }),
    ventana, luz,
    // Planta en su maceta
    svg('path', { d: 'M 120 214 L 220 214 L 208 278 L 132 278 Z', class: 'inv-maceta' }),
    tierra,
    svg('path', { d: 'M 170 212 C 168 190, 172 170, 170 150', class: 'inv-tallo' }),
    svg('ellipse', { cx: 150, cy: 168, rx: 20, ry: 9, transform: 'rotate(-25 150 168)', class: 'inv-hoja' }),
    svg('ellipse', { cx: 190, cy: 158, rx: 20, ry: 9, transform: 'rotate(25 190 158)', class: 'inv-hoja' }),
    // Sensor de humedad clavado
    svg('rect', { x: 198, y: 186, width: 8, height: 40, rx: 2, class: 'inv-sensor' }),
    svg('text', { x: 202, y: 180, class: 'inv-texto', 'text-anchor': 'middle' }, 'A0'),
    // DHT11
    svg('rect', { x: 280, y: 130, width: 22, height: 28, rx: 3, class: 'inv-dht' }),
    svg('text', { x: 291, y: 172, class: 'inv-texto', 'text-anchor': 'middle' }, 'DHT11'),
    // Depósito, bomba y manguera
    svg('rect', { x: 350, y: 190, width: 40, height: 90, rx: 6, class: 'inv-deposito' }),
    svg('rect', { x: 352, y: 214, width: 36, height: 64, rx: 4, class: 'inv-agua' }),
    bomba,
    svg('path', { d: 'M 370 262 L 370 120 Q 370 104 354 104 L 196 104 Q 180 104 180 120 L 180 140', class: 'inv-manguera' }),
    gotas,
    svg('text', { x: 370, y: 300, class: 'inv-texto', 'text-anchor': 'middle' }, 'Depósito'));
  ventana.setAttribute('transform', 'translate(230 80)');

  // ---------- Panel ----------
  const lect = Object.fromEntries(['suelo', 'temp', 'ventana', 'luz', 'bomba', 'reloj'].map((k) => [k, el('strong')]));
  const paso = el('p', { class: 'puente-paso', 'aria-live': 'polite' });
  const temperatura = el('input', { type: 'range', class: 'anim-deslizador', min: 20, max: 36, step: 0.5, value: 25, 'aria-label': 'Temperatura del aire' });
  const textoTemp = el('strong');
  const botonManual = el('button', { type: 'button', class: 'boton boton-chico' }, '💧 Botón de riego (D2)');
  const botonSecar = el('button', { type: 'button', class: 'anim-boton' }, '☀ Secar la tierra');
  const rapido = el('input', { type: 'checkbox' });

  contenedor.append(el('div', { class: 'anim-invernadero' },
    el('div', { class: 'inv-dibujo' }, raiz),
    el('div', { class: 'anim-controles' },
      paso,
      el('div', { class: 'inv-lecturas' },
        el('span', {}, 'analogRead(A0) = ', lect.suelo),
        el('span', {}, 'Temperatura = ', lect.temp),
        el('span', {}, 'Ventana: ', lect.ventana),
        el('span', {}, 'Bomba (D8): ', lect.bomba),
        el('span', {}, 'Luz (D6): ', lect.luz),
        el('span', {}, 'millis() = ', lect.reloj)),
      el('label', { class: 'anim-etiqueta' }, 'Temperatura del aire: ', textoTemp, temperatura),
      el('div', { class: 'anim-rapidos' }, botonManual, botonSecar),
      el('label', { class: 'casilla-simple' }, rapido, ' Reloj rápido (× 10)'),
      el('p', { class: 'texto-ayuda' }, `Ajustes: UMBRAL_SECO = ${UMBRAL} · TIEMPO_RIEGO = ${TIEMPO_RIEGO} ms · ventana ${ABRIR} °C / ${CERRAR} °C · luz ${LUZ_ON / 1000} s / ${LUZ_OFF / 1000} s`))));

  // ---------- Estado ----------
  let suelo = 430;          // valor del sensor (capacitivo: más alto = más seco)
  let millis = 0;
  let riego = null;         // { fase: 'regando' | 'esperando', t }
  let pedidoManual = false;
  let ordenVentana = 0;     // último ventana.write(): 0 cerrada, 60 abierta
  let anguloVentana = 0;    // posición dibujada (se acerca a la orden)
  let ultimo = 0;

  const textoPaso = () => {
    if (riego && riego.fase === 'regando') return '1. La tierra está seca: la bomba riega.';
    if (riego) return '1. Espera 5 s a que el agua baje hasta el sensor.';
    return `Vigilando: la tierra se seca poco a poco (riega cuando pase de ${UMBRAL}).`;
  };

  function simular(dt) {
    millis += dt;
    // La tierra se seca sola (más rápido si la ventana está abierta y hace calor)
    const calor = Number(temperatura.value);
    suelo = Math.min(650, suelo + dt * (0.004 + Math.max(0, calor - 25) * 0.0004));

    // 1. Riego
    if (!riego && (suelo > UMBRAL || pedidoManual)) { riego = { fase: 'regando', t: 0 }; pedidoManual = false; }
    if (riego) {
      riego.t += dt;
      // El agua tarda en llegar al sensor: baja la lectura desde el segundo 1 hasta el 5
      const total = riego.fase === 'regando' ? riego.t : TIEMPO_RIEGO + riego.t;
      if (total > 1000 && total < 5000) suelo = Math.max(260, suelo - dt * (230 / 4000) * Math.min(1, TIEMPO_RIEGO / 3000));
      if (riego.fase === 'regando' && riego.t >= TIEMPO_RIEGO) riego = { fase: 'esperando', t: 0 };
      else if (riego.fase === 'esperando' && riego.t >= 5000) riego = null;
    }

    // 2. Ventana con histéresis: entre CERRAR y ABRIR no se le da ninguna orden y se queda como estaba
    if (calor > ABRIR) ordenVentana = 60;
    if (calor < CERRAR) ordenVentana = 0;
    const avanceServo = dt * 0.12; // el servo se mueve (visual)
    anguloVentana = anguloVentana < ordenVentana ? Math.min(ordenVentana, anguloVentana + avanceServo) : Math.max(ordenVentana, anguloVentana - avanceServo);
  }

  function dibujar() {
    const calor = Number(temperatura.value);
    const regando = riego && riego.fase === 'regando';
    const luzEncendida = (millis % (LUZ_ON + LUZ_OFF)) < LUZ_ON;
    // Color de la tierra: de seca (650) a mojada (260)
    const f = limitar((650 - suelo) / 390, 0, 1);
    const color = SECO.map((c, i) => Math.round(c + (MOJADO[i] - c) * f));
    tierra.setAttribute('fill', `rgb(${color.join(',')})`);
    ventana.setAttribute('transform', `translate(230 80) rotate(${-anguloVentana})`);
    luz.classList.toggle('encendida', luzEncendida);
    bomba.classList.toggle('activa', regando);
    gotas.replaceChildren();
    if (regando) {
      const fase = (millis / 120) % 4;
      for (let i = 0; i < 3; i++) gotas.append(svg('circle', { cx: 180, cy: 146 + ((fase + i * 1.3) % 4) * 14, r: 3.5, class: 'inv-gota' }));
    }
    lect.suelo.textContent = Math.round(suelo);
    lect.temp.textContent = `${calor.toFixed(1).replace('.', ',')} °C`;
    lect.ventana.textContent = anguloVentana > 55 ? 'abierta (60°)' : anguloVentana < 5 ? 'cerrada (0°)' : 'moviéndose';
    lect.bomba.textContent = regando ? 'HIGH' : 'LOW';
    lect.luz.textContent = luzEncendida ? 'HIGH' : 'LOW';
    lect.reloj.textContent = Math.floor(millis).toLocaleString('es');
    textoTemp.textContent = `${calor.toFixed(1).replace('.', ',')} °C`;
    paso.textContent = textoPaso();
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo;
    simular(dt * (rapido.checked ? 10 : 1));
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonManual.addEventListener('click', () => { pedidoManual = true; });
  botonSecar.addEventListener('click', () => { suelo = Math.max(suelo, UMBRAL + 40); });
  temperatura.addEventListener('input', dibujar);
  dibujar();
  requestAnimationFrame(cuadro);
}

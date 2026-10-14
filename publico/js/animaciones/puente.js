// ============================================================
// Animación "puente": el puente levadizo completo, como puente_levadizo.ino.
//   - Vista desde arriba: el río y el barco (se arrastra o pasa solo).
//   - Vista de frente: las dos hojas, el semáforo de los carros y la alarma.
// Cada 100 ms se "mide" la distancia; si 0 < d < DISTANCIA_BARCO empieza la
// secuencia: amarillo + alarma (2 s) → rojo → subir → esperar → bajar → verde.
//
// En la guía:
//   :::animacion tipo="puente"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo" del código):
//   distancia (10 cm) · angulo (75°) · arriba (4000 ms) · velocidad (25 ms por grado)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

// Vista desde arriba: 1 px = 0,2 cm (el sensor está en y = 110)
const ARRIBA = { ancho: 200, alto: 300, rioX0: 60, rioX1: 140, puenteY0: 70, puenteY1: 92, sensorY: 110 };
const CM_POR_PX = 0.2;
const INICIO_BARCO = 262;

export default function montar(contenedor, config) {
  const DISTANCIA = limitar(numero(config.distancia, 10), 2, 40);
  const ANGULO = limitar(numero(config.angulo, 75), 30, 90);
  const TIEMPO_ARRIBA = limitar(numero(config.arriba, 4000), 500, 15000);
  const VELOCIDAD = limitar(numero(config.velocidad, 25), 5, 100);

  // ============ Vista desde arriba ============
  const vistaArriba = svg('svg', { viewBox: `0 0 ${ARRIBA.ancho} ${ARRIBA.alto}`, class: 'puente-arriba', role: 'img', 'aria-label': 'Río visto desde arriba con el barco' });
  const yUmbral = ARRIBA.sensorY + DISTANCIA / CM_POR_PX;
  const tramo = svg('rect', { x: ARRIBA.rioX0, y: ARRIBA.puenteY0, width: ARRIBA.rioX1 - ARRIBA.rioX0, height: ARRIBA.puenteY1 - ARRIBA.puenteY0, class: 'puente-tramo' });
  const barco = svg('g', { class: 'puente-barco', tabindex: '0', role: 'slider', 'aria-label': 'Barco: arrástralo río arriba', 'aria-valuemin': '0', 'aria-valuemax': '40' },
    svg('path', { d: 'M -14 10 L -14 -8 L 0 -22 L 14 -8 L 14 10 Z' }),
    svg('circle', { cx: 0, cy: -2, r: 4, class: 'puente-barco-mastil' }));
  const ondas = svg('g', { class: 'puente-ondas' });
  vistaArriba.append(
    svg('rect', { x: 0, y: 0, width: ARRIBA.ancho, height: ARRIBA.alto, class: 'puente-tierra' }),
    svg('rect', { x: ARRIBA.rioX0, y: 0, width: ARRIBA.rioX1 - ARRIBA.rioX0, height: ARRIBA.alto, class: 'puente-agua' }),
    svg('rect', { x: 0, y: ARRIBA.puenteY0, width: ARRIBA.ancho, height: ARRIBA.puenteY1 - ARRIBA.puenteY0, class: 'puente-calle' }),
    tramo,
    svg('line', { x1: ARRIBA.rioX0, x2: ARRIBA.rioX1, y1: yUmbral, y2: yUmbral, class: 'puente-umbral' }),
    svg('text', { x: ARRIBA.rioX1 + 4, y: yUmbral + 4, class: 'puente-texto-chico' }, `${DISTANCIA} cm`),
    svg('rect', { x: ARRIBA.rioX0 - 14, y: ARRIBA.sensorY - 6, width: 14, height: 12, rx: 2, class: 'puente-sensor' }),
    svg('text', { x: 4, y: ARRIBA.sensorY + 4, class: 'puente-texto-chico' }, 'Sensor'),
    ondas, barco,
    svg('text', { x: ARRIBA.ancho / 2, y: 14, class: 'puente-texto-chico', 'text-anchor': 'middle' }, 'Vista desde arriba'));

  // ============ Vista de frente ============
  const F = { ancho: 420, alto: 260, suelo: 170, hinge0: 120, hinge1: 300 };
  const largoHoja = (F.hinge1 - F.hinge0) / 2;
  const vistaFrente = svg('svg', { viewBox: `0 0 ${F.ancho} ${F.alto}`, class: 'puente-frente', role: 'img', 'aria-label': 'Puente visto de frente' });
  const hojaIzq = svg('rect', { x: 0, y: -6, width: largoHoja, height: 8, rx: 2, class: 'puente-hoja' });
  const hojaDer = svg('rect', { x: -largoHoja, y: -6, width: largoHoja, height: 8, rx: 2, class: 'puente-hoja' });
  const grupoIzq = svg('g', {}, hojaIzq);
  const grupoDer = svg('g', {}, hojaDer);
  const mastil = svg('g', { class: 'puente-mastil-frente' },
    svg('rect', { x: -3, y: -120, width: 6, height: 120 }),
    svg('path', { d: 'M 3 -112 L 34 -70 L 3 -70 Z', class: 'puente-vela' }));
  const luces = {
    ROJO: svg('circle', { cx: 40, cy: 72, r: 8, class: 'semaforo-luz', fill: '#EF4444' }),
    AMARILLO: svg('circle', { cx: 40, cy: 92, r: 8, class: 'semaforo-luz', fill: '#FACC15' }),
    VERDE: svg('circle', { cx: 40, cy: 112, r: 8, class: 'semaforo-luz', fill: '#22C55E' }),
  };
  const sonido = svg('g', { class: 'puente-sonido' },
    svg('path', { d: 'M 392 92 q 8 10 0 20' }), svg('path', { d: 'M 400 86 q 14 16 0 32' }));
  vistaFrente.append(
    svg('rect', { x: F.hinge0, y: F.suelo + 10, width: F.hinge1 - F.hinge0, height: F.alto - F.suelo - 10, class: 'puente-agua' }),
    svg('rect', { x: 0, y: F.suelo, width: F.hinge0, height: F.alto - F.suelo, class: 'puente-tierra' }),
    svg('rect', { x: F.hinge1, y: F.suelo, width: F.ancho - F.hinge1, height: F.alto - F.suelo, class: 'puente-tierra' }),
    svg('rect', { x: F.hinge0 - 26, y: 40, width: 22, height: F.suelo - 40, class: 'puente-torre' }),
    svg('rect', { x: F.hinge1 + 4, y: 40, width: 22, height: F.suelo - 40, class: 'puente-torre' }),
    svg('rect', { x: F.hinge0 - 26, y: 40, width: F.hinge1 - F.hinge0 + 52, height: 10, class: 'puente-torre' }),
    mastil, grupoIzq, grupoDer,
    svg('circle', { cx: F.hinge0, cy: F.suelo - 2, r: 6, class: 'puente-eje' }),
    svg('circle', { cx: F.hinge1, cy: F.suelo - 2, r: 6, class: 'puente-eje' }),
    // Semáforo de los carros
    svg('rect', { x: 37, y: 120, width: 6, height: 50, class: 'semaforo-poste' }),
    svg('rect', { x: 26, y: 60, width: 28, height: 64, rx: 6, class: 'semaforo-caja' }),
    luces.ROJO, luces.AMARILLO, luces.VERDE,
    // Buzzer (alarma)
    svg('rect', { x: 366, y: 92, width: 22, height: 20, rx: 4, class: 'puente-buzzer' }),
    svg('text', { x: 377, y: 128, class: 'puente-texto-chico', 'text-anchor': 'middle' }, 'Alarma'),
    sonido,
    svg('text', { x: F.ancho / 2, y: F.alto - 8, class: 'puente-texto-chico', 'text-anchor': 'middle' }, 'Vista de frente'));
  grupoIzq.setAttribute('transform', `translate(${F.hinge0} ${F.suelo - 2})`);
  grupoDer.setAttribute('transform', `translate(${F.hinge1} ${F.suelo - 2})`);

  // ============ Panel ============
  const lecturaDistancia = el('strong');
  const lecturaAngulo = el('strong');
  const paso = el('p', { class: 'puente-paso', 'aria-live': 'polite' });
  const aviso = el('p', { class: 'anim-estado', hidden: true });
  const botonAuto = el('button', { type: 'button', class: 'boton boton-chico' }, '▶ Que pase un barco');
  const botonReiniciar = el('button', { type: 'button', class: 'anim-boton' }, '↺ Reiniciar');
  contenedor.append(el('div', { class: 'anim-puente' },
    el('div', { class: 'puente-vistas' }, vistaArriba, vistaFrente),
    el('div', { class: 'anim-controles' },
      paso,
      el('div', { class: 'puente-lecturas' },
        el('span', {}, 'medirDistancia() = ', lecturaDistancia),
        el('span', {}, 'Ángulo de las hojas: ', lecturaAngulo)),
      el('div', { class: 'anim-rapidos' }, botonAuto, botonReiniciar),
      el('p', { class: 'texto-ayuda' }, 'Arrastra el barco río arriba, o toca "Que pase un barco".'),
      aviso)));

  // ============ Estado (igual que el código) ============
  let barcoY = INICIO_BARCO;   // posición del barco en la vista de arriba
  let angulo = 0;              // ángulo de las hojas (izq.write(a), der.write(180 - a))
  let fase = 'verde';          // verde · aviso · subiendo · arriba · bajando
  let tiempoFase = 0;
  let medicion = 0;
  let automatico = false;
  let arrastrando = false;
  let ultimo = 0;
  const leds = { VERDE: true, AMARILLO: false, ROJO: false };
  const TEXTO_FASE = {
    verde: 'Esperando un barco: luz verde para los carros.',
    aviso: '1. Aviso: luz amarilla y alarma (2 s).',
    subiendo: '2 y 3. Luz roja: el puente sube.',
    arriba: `3. El puente espera arriba (${TIEMPO_ARRIBA / 1000} s).`,
    bajando: '3. El puente baja.',
  };

  const distanciaCm = () => Math.round((barcoY - ARRIBA.sensorY) * CM_POR_PX);
  // El barco puede cruzar el puente solo si las hojas están (casi) arriba
  const puedeCruzar = () => angulo >= ANGULO - 5;

  // Un barco que todavía no llega al puente frena si las hojas no están arriba
  const FRENO = ARRIBA.puenteY1 + 24;
  function moverBarco(y) {
    const antesDelPuente = barcoY >= FRENO - 0.5;
    const tope = (!antesDelPuente || puedeCruzar()) ? -40 : FRENO;
    barcoY = Math.min(INICIO_BARCO, Math.max(tope, y));
  }

  function cambiarFase(nueva) {
    fase = nueva; tiempoFase = 0;
    if (nueva === 'aviso') Object.assign(leds, { VERDE: false, AMARILLO: true, ROJO: false });
    if (nueva === 'subiendo') Object.assign(leds, { VERDE: false, AMARILLO: false, ROJO: true });
    if (nueva === 'verde') Object.assign(leds, { VERDE: true, AMARILLO: false, ROJO: false });
  }

  function paso1(dt) {
    tiempoFase += dt;
    const gradosPorMs = 1 / VELOCIDAD;
    if (fase === 'verde') {
      medicion += dt;
      if (medicion >= 100) { // loop(): medir cada 100 ms
        medicion = 0;
        const d = barcoY > ARRIBA.sensorY ? distanciaCm() : 0; // ya pasó el sensor: no hay eco
        if (d > 0 && d < DISTANCIA) cambiarFase('aviso');
      }
    } else if (fase === 'aviso' && tiempoFase >= 2000) {
      cambiarFase('subiendo');
    } else if (fase === 'subiendo') {
      angulo = pocoMovimiento() ? ANGULO : Math.min(ANGULO, angulo + gradosPorMs * dt);
      if (angulo >= ANGULO) cambiarFase('arriba');
    } else if (fase === 'arriba' && tiempoFase >= TIEMPO_ARRIBA) {
      cambiarFase('bajando');
    } else if (fase === 'bajando') {
      angulo = pocoMovimiento() ? 0 : Math.max(0, angulo - gradosPorMs * dt);
      if (angulo <= 0) cambiarFase('verde');
    }

    // El barco automático avanza (unos 6 cm por segundo)
    if (automatico && !arrastrando) {
      moverBarco(barcoY - 0.03 * dt);
      if (barcoY <= -40) { automatico = false; barcoY = INICIO_BARCO; }
    } else if (!arrastrando) {
      moverBarco(barcoY); // si el puente se cerró, el barco no puede quedar encima
    }
  }

  function dibujar() {
    grupoIzq.setAttribute('transform', `translate(${F.hinge0} ${F.suelo - 2}) rotate(${-angulo})`);
    grupoDer.setAttribute('transform', `translate(${F.hinge1} ${F.suelo - 2}) rotate(${angulo})`);
    for (const [luz, c] of Object.entries(luces)) c.classList.toggle('encendida', leds[luz]);
    sonido.classList.toggle('activo', fase === 'aviso' && tiempoFase < 1500); // tone(BUZZER, 1000, 1500)
    tramo.classList.toggle('abierto', angulo > 1);

    barco.setAttribute('transform', `translate(${(ARRIBA.rioX0 + ARRIBA.rioX1) / 2} ${barcoY})`);
    const d = barcoY > ARRIBA.sensorY ? distanciaCm() : 0;
    barco.setAttribute('aria-valuenow', String(d));
    lecturaDistancia.textContent = `${d} cm`;
    lecturaAngulo.textContent = `${Math.round(angulo)}°`;
    ondas.replaceChildren();
    if (fase === 'verde' && barcoY > ARRIBA.sensorY && barcoY < INICIO_BARCO - 2) {
      ondas.append(svg('path', { d: `M ${ARRIBA.rioX0} ${ARRIBA.sensorY} L ${(ARRIBA.rioX0 + ARRIBA.rioX1) / 2} ${barcoY - 14}`, class: 'puente-haz' }));
    }

    // El mástil se ve de frente cuando el barco está pasando bajo el puente
    const pasando = barcoY > ARRIBA.puenteY0 - 30 && barcoY < ARRIBA.puenteY1 + 30;
    mastil.style.display = pasando ? '' : 'none';
    mastil.setAttribute('transform', `translate(${(F.hinge0 + F.hinge1) / 2 - 6} ${F.suelo + 16})`);

    paso.textContent = TEXTO_FASE[fase];
    const esperando = Math.abs(barcoY - FRENO) < 1 && !puedeCruzar();
    const debajo = barcoY < FRENO - 1 && barcoY > ARRIBA.puenteY0 - 24 && !puedeCruzar();
    aviso.hidden = !(esperando || debajo);
    aviso.className = 'anim-estado alerta';
    aviso.textContent = debajo
      ? '⚠ ¡Cuidado! El puente baja con el barco debajo: el código baja después de TIEMPO_ARRIBA aunque el barco no haya pasado.'
      : '⚓ El barco espera: el puente todavía no está abierto.';
    botonAuto.disabled = automatico;
  }

  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo;
    paso1(dt);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  // ---------- Arrastrar el barco ----------
  function desdePuntero(evento) {
    const caja = vistaArriba.getBoundingClientRect();
    moverBarco(((evento.clientY - caja.top) / caja.height) * ARRIBA.alto);
  }
  barco.addEventListener('pointerdown', (e) => {
    arrastrando = true; automatico = false;
    barco.setPointerCapture(e.pointerId);
    desdePuntero(e);
  });
  barco.addEventListener('pointermove', (e) => { if (arrastrando) desdePuntero(e); });
  const soltar = () => { arrastrando = false; };
  barco.addEventListener('pointerup', soltar);
  barco.addEventListener('pointercancel', soltar);
  barco.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { moverBarco(barcoY - 5); e.preventDefault(); }
    if (e.key === 'ArrowDown') { moverBarco(barcoY + 5); e.preventDefault(); }
  });

  botonAuto.addEventListener('click', () => { if (barcoY < ARRIBA.sensorY) barcoY = INICIO_BARCO; automatico = true; });
  botonReiniciar.addEventListener('click', () => {
    automatico = false; barcoY = INICIO_BARCO; angulo = 0; medicion = 0; cambiarFase('verde');
  });

  dibujar();
  requestAnimationFrame(cuadro);
}

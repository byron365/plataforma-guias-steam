// ============================================================
// Animación "dispensador": el dispensador de comida completo, como dispensador_comida.ino.
//   - gramosSegunTamano(): la perilla elige 30 g (gato), 60 g (perro pequeño) o 120 g (perro grande).
//   - servir(): buzzer, LED, compuerta a ABIERTA durante gramos × MS_POR_GRAMO ms, cerrar.
//   - loop(): comida automática cada INTERVALO y comida con el botón.
//
// En la guía:
//   :::animacion tipo="dispensador"
//   :::
// Opciones (todas opcionales, como los "Ajustes del equipo"):
//   abierta (70) · msporgramo (20) · intervalo (60000 ms)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const MASCOTAS = [
  { nombre: 'Gato', lectura: 170, gramos: 30 },
  { nombre: 'Perro pequeño', lectura: 510, gramos: 60 },
  { nombre: 'Perro grande', lectura: 850, gramos: 120 },
];
const SALIDA = { x: 200, y: 200 };   // salida del embudo
const PLATO_Y = 300;

export default function montar(contenedor, config) {
  const ABIERTA = limitar(numero(config.abierta, 70), 10, 180);
  const MS_POR_GRAMO = limitar(numero(config.msporgramo, 20), 1, 200);
  const INTERVALO = limitar(numero(config.intervalo, 60000), 5000, 3600000);

  // ---------- Dibujo ----------
  const raiz = svg('svg', { viewBox: '0 0 460 330', class: 'disp-svg', role: 'img', 'aria-label': 'Dispensador de comida: botella, embudo, compuerta y plato' });
  const compuerta = svg('g', {}, svg('rect', { x: -44, y: -3, width: 44, height: 6, rx: 2, class: 'disp-compuerta' }));
  const croquetas = svg('g', {});
  const montonPlato = svg('path', { class: 'disp-monton' });
  const led = svg('circle', { cx: 350, cy: 130, r: 10, class: 'disp-led' });
  const sonido = svg('g', { class: 'puente-sonido' }, svg('path', { d: 'M 372 172 q 7 9 0 18' }), svg('path', { d: 'M 380 166 q 13 15 0 30' }));
  const boton = svg('g', { class: 'disp-boton', tabindex: '0', role: 'button', 'aria-label': 'Botón de comida (D2)' },
    svg('rect', { x: 330, y: 220, width: 40, height: 26, rx: 6, class: 'disp-boton-base' }),
    svg('circle', { cx: 350, cy: 233, r: 9, class: 'disp-boton-tapa' }));
  // Croquetas dentro de la botella (fijas, decorativas)
  const relleno = svg('g', { class: 'disp-relleno' });
  for (let i = 0; i < 40; i++) relleno.append(svg('circle', { cx: 160 + (i % 8) * 11 + (Math.floor(i / 8) % 2) * 5, cy: 120 - Math.floor(i / 8) * 10, r: 5 }));
  raiz.append(
    svg('rect', { x: 0, y: PLATO_Y + 8, width: 460, height: 30, class: 'disp-mesa' }),
    // Torre
    svg('rect', { x: 120, y: 40, width: 10, height: 268, class: 'disp-torre' }),
    svg('rect', { x: 270, y: 40, width: 10, height: 268, class: 'disp-torre' }),
    // Botella boca abajo
    svg('path', { d: 'M 150 20 L 250 20 L 250 128 Q 250 140 236 144 L 214 150 L 186 150 L 164 144 Q 150 140 150 128 Z', class: 'disp-botella' }),
    relleno,
    // Embudo
    svg('path', { d: `M 150 150 L 250 150 L ${SALIDA.x + 13} ${SALIDA.y} L ${SALIDA.x - 13} ${SALIDA.y} Z`, class: 'disp-embudo' }),
    croquetas,
    compuerta,
    svg('circle', { cx: SALIDA.x + 22, cy: SALIDA.y + 6, r: 9, class: 'disp-servo' }),
    svg('text', { x: SALIDA.x + 36, y: SALIDA.y + 26, class: 'inv-texto' }, 'servo (D9)'),
    // Plato
    montonPlato,
    svg('path', { d: `M 150 ${PLATO_Y - 6} L 250 ${PLATO_Y - 6} L 238 ${PLATO_Y + 8} L 162 ${PLATO_Y + 8} Z`, class: 'disp-plato' }),
    // Frente: LED, buzzer, botón
    led, svg('text', { x: 368, y: 134, class: 'inv-texto' }, 'LED (D4)'),
    svg('rect', { x: 340, y: 170, width: 22, height: 22, rx: 4, class: 'puente-buzzer' }), sonido,
    svg('text', { x: 351, y: 210, class: 'inv-texto', 'text-anchor': 'middle' }, 'Buzzer (D5)'),
    boton, svg('text', { x: 350, y: 262, class: 'inv-texto', 'text-anchor': 'middle' }, 'Botón (D2)'));
  compuerta.setAttribute('transform', `translate(${SALIDA.x + 22} ${SALIDA.y + 6})`);

  // ---------- Panel ----------
  const botonesMascota = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Perilla de tamaño' },
    MASCOTAS.map((m, i) => el('button', { type: 'button', class: 'anim-boton', 'data-i': i, onclick: () => { mascota = i; marcar(); } }, m.nombre)));
  const lecturaPerilla = el('strong');
  const barra = el('div', { class: 'barra', role: 'progressbar', 'aria-label': 'Tiempo hasta la próxima comida automática' }, el('div', { class: 'barra-relleno' }));
  const textoHorario = el('span');
  const monitor = el('pre', { class: 'disp-monitor', 'aria-live': 'polite', 'aria-label': 'Monitor serie' });
  const paso = el('p', { class: 'puente-paso' });
  const rapido = el('input', { type: 'checkbox' });
  const botonVaciar = el('button', { type: 'button', class: 'anim-boton' }, '🍽 Vaciar el plato');
  const botonServir = el('button', { type: 'button', class: 'boton boton-chico' }, '🔘 Presionar el botón');

  contenedor.append(el('div', { class: 'anim-dispensador' },
    el('div', {}, raiz),
    el('div', { class: 'anim-controles' },
      paso,
      el('p', { class: 'anim-etiqueta' }, 'Perilla de tamaño: analogRead(A0) = ', lecturaPerilla),
      botonesMascota,
      el('div', { class: 'anim-rapidos' }, botonServir, botonVaciar),
      el('p', { class: 'anim-etiqueta' }, 'Horario automático: ', textoHorario), barra,
      el('label', { class: 'casilla-simple' }, rapido, ' Reloj rápido (× 10)'),
      el('p', { class: 'anim-etiqueta' }, 'Monitor serie'), monitor,
      el('p', { class: 'texto-ayuda' }, `Ajustes: ABIERTA = ${ABIERTA}° · MS_POR_GRAMO = ${MS_POR_GRAMO} · INTERVALO = ${INTERVALO / 1000} s`))));

  // ---------- Estado ----------
  let mascota = 0;
  let millis = 0;
  let ultimaComida = 0;
  let comidasHoy = 0;
  let enPlato = 0;           // gramos en el plato (para dibujar el montón)
  let sirviendo = null;      // { gramos, t, duracion }
  let pausaBoton = 0;        // delay(500) después del botón
  let pedidoBoton = false;
  let angulo = 0;            // ángulo dibujado de la compuerta
  let particulas = [];
  const lineas = [];
  let ultimo = 0;

  function marcar() {
    botonesMascota.querySelectorAll('button').forEach((b) => { const a = Number(b.dataset.i) === mascota; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    lecturaPerilla.textContent = `${MASCOTAS[mascota].lectura} → ${MASCOTAS[mascota].nombre.toLowerCase()} (${MASCOTAS[mascota].gramos} g)`;
  }

  function servir() {
    const gramos = MASCOTAS[mascota].gramos;
    sirviendo = { gramos, t: 0, duracion: gramos * MS_POR_GRAMO };
  }

  function terminarServir() {
    comidasHoy += 1;
    lineas.push(`Comida ${comidasHoy}: ${sirviendo.gramos} g`);
    if (lineas.length > 5) lineas.shift();
    sirviendo = null;
  }

  function simular(dt) {
    millis += dt;
    if (pausaBoton > 0) pausaBoton = Math.max(0, pausaBoton - dt);
    if (sirviendo) {
      sirviendo.t += dt;
      // Comida que cae mientras la compuerta está abierta
      enPlato += (sirviendo.gramos / sirviendo.duracion) * dt;
      if (sirviendo.t >= sirviendo.duracion) {
        terminarServir();
        if (sirviendo === null && cola === 'auto') { ultimaComida = millis; cola = null; }
        if (cola === 'boton') { pausaBoton = 500; cola = null; }
      }
      return;
    }
    // 1. Horario automático
    if (millis - ultimaComida >= INTERVALO) { cola = 'auto'; servir(); return; }
    // 2. Botón manual
    if (pedidoBoton && pausaBoton === 0) { pedidoBoton = false; cola = 'boton'; servir(); }
  }
  let cola = null; // quién pidió la comida en curso (para ultimaComida o el delay del botón)

  function dibujar(dtVisual) {
    const abierta = !!sirviendo;
    // El servo se mueve rápido pero no instantáneo
    const meta = abierta ? ABIERTA : 0;
    angulo = pocoMovimiento() ? meta : angulo + Math.sign(meta - angulo) * Math.min(Math.abs(meta - angulo), dtVisual * 0.4);
    compuerta.setAttribute('transform', `translate(${SALIDA.x + 22} ${SALIDA.y + 6}) rotate(${angulo})`);
    led.classList.toggle('encendido', abierta);
    sonido.classList.toggle('activo', abierta && sirviendo.t < 300); // tone(BUZZER, 1500, 300)

    // Partículas de croquetas cayendo
    if (abierta && angulo > ABIERTA * 0.6 && Math.random() < 0.6) particulas.push({ x: SALIDA.x + (Math.random() - 0.5) * 18, y: SALIDA.y + 4, v: 0 });
    particulas = particulas.filter((p) => p.y < PLATO_Y - 8);
    particulas.forEach((p) => { p.v += 0.04 * dtVisual; p.y += p.v * dtVisual * 0.05; });
    croquetas.replaceChildren(...particulas.map((p) => svg('circle', { cx: p.x, cy: p.y, r: 4, class: 'disp-croqueta' })));

    // Montón en el plato (crece con los gramos, hasta un tope)
    const alto = Math.min(42, Math.sqrt(enPlato) * 3.2);
    montonPlato.setAttribute('d', alto > 0.5 ? `M 166 ${PLATO_Y - 6} Q 200 ${PLATO_Y - 6 - alto * 2} 234 ${PLATO_Y - 6} Z` : '');

    const falta = Math.max(0, INTERVALO - (millis - ultimaComida));
    barra.firstChild.style.width = `${Math.min(100, ((millis - ultimaComida) / INTERVALO) * 100)}%`;
    textoHorario.textContent = sirviendo && cola === 'auto' ? 'sirviendo…' : `próxima comida en ${Math.ceil(falta / 1000)} s`;
    monitor.textContent = lineas.length ? lineas.join('\n') : '(todavía no ha servido)';
    paso.textContent = sirviendo
      ? `servir(): compuerta abierta ${sirviendo.gramos} × ${MS_POR_GRAMO} = ${sirviendo.duracion} ms`
      : `Esperando… ${comidasHoy} ${comidasHoy === 1 ? 'comida' : 'comidas'} servidas · ${Math.round(enPlato)} g en el plato`;
    botonServir.disabled = !!sirviendo;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    simular(dt * (rapido.checked ? 10 : 1));
    dibujar(dt);
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  const presionar = () => { pedidoBoton = true; };
  botonServir.addEventListener('click', presionar);
  boton.addEventListener('click', presionar);
  boton.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); presionar(); } });
  botonVaciar.addEventListener('click', () => { enPlato = 0; });

  // Al empezar, millis() - 0 ya no supera INTERVALO, así que la primera comida automática es al minuto
  marcar();
  dibujar(0);
  requestAnimationFrame(cuadro);
}

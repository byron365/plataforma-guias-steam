// ============================================================
// Animación "max-min": la estación recuerda la temperatura más alta y la más baja.
// maxima y minima se declaran FUERA del loop (empiezan en −100 y 100) y en cada
// vuelta se comparan con la lectura nueva. Se puede calentar el sensor con la
// mano, soltarlo y "apagar y encender" la estación.
// Muestra la gráfica, las variables, las líneas del código que se cumplen y la
// pantalla OLED con la línea Max / Min de la guía.
//
// En la guía:
//   :::animacion tipo="max-min"
//   :::
// Opciones (todas opcionales): salon (24 °C) · mano (31 °C, hasta dónde llega con la mano)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { crearOLED } from './comun/oled.js';
import { el } from '../comun.js';

const LECTURAS = 40;          // lecturas que caben en la gráfica
const CADA = 600;             // ms reales entre lecturas (el código usa ESPERA = 2000: aquí va más rápido)
const X0 = 46; const X1 = 470; const Y0 = 20; const Y1 = 190;
const TMIN = 15; const TMAX = 35;

export default function montar(contenedor, config) {
  const salon = limitar(numero(config.salon, 24), TMIN + 2, TMAX - 6);
  const tope = limitar(numero(config.mano, 31), salon + 2, TMAX - 1);
  let temp = salon;
  let maxima = -100; let minima = 100;
  let datos = [];
  let calentando = false;
  let ultimo = 0; let acumulado = 0;
  let cumplidas = { max: false, min: false };

  const yDe = (t) => Y1 - ((limitar(t, TMIN, TMAX) - TMIN) / (TMAX - TMIN)) * (Y1 - Y0);
  const xDe = (i) => X0 + (i / (LECTURAS - 1)) * (X1 - X0);
  const reja = svg('g', {});
  for (let t = TMIN; t <= TMAX; t += 5) {
    reja.append(svg('line', { x1: X0, x2: X1, y1: yDe(t), y2: yDe(t), class: 'grafica-reja' }),
      svg('text', { x: X0 - 8, y: yDe(t) + 4, class: 'grafica-numero', 'text-anchor': 'end' }, `${t}`));
  }
  const lineaMax = svg('g', { class: 'maxmin-max' });
  const lineaMin = svg('g', { class: 'maxmin-min' });
  const trazo = svg('polyline', { class: 'grafica-linea' });
  const punto = svg('circle', { r: 5, class: 'grafica-marca' });
  const raiz = svg('svg', { viewBox: '0 0 520 220', class: 'grafica-svg', role: 'img', 'aria-label': 'Gráfica de la temperatura con las líneas de máxima y mínima' },
    reja, svg('line', { x1: X0, x2: X1, y1: Y1, y2: Y1, class: 'grafica-base' }),
    svg('text', { x: X1, y: 212, class: 'grafica-numero', 'text-anchor': 'end' }, 'lecturas →'),
    svg('text', { x: X0 + 6, y: 14, class: 'grafica-numero' }, '°C'),
    lineaMax, lineaMin, trazo, punto);

  const pantalla = crearOLED({ escala: 2 });
  const variables = el('pre', { class: 'joystick-codigo maxmin-variables', 'aria-live': 'polite' });
  const lineaCodigoMax = el('span', { class: 'semaforo-linea' }, 'if (temp > maxima) {\n  maxima = temp;\n}');
  const lineaCodigoMin = el('span', { class: 'semaforo-linea' }, 'if (temp < minima) {\n  minima = temp;\n}');
  const codigo = el('pre', { class: 'semaforo-codigo' },
    el('span', { class: 'semaforo-fija' }, '// fuera del loop, arriba del setup():'),
    el('span', { class: 'semaforo-fija' }, 'float maxima = -100;'),
    el('span', { class: 'semaforo-fija' }, 'float minima = 100;'),
    el('span', { class: 'semaforo-fija' }, ' '),
    el('span', { class: 'semaforo-fija' }, '// en el loop, después de leer temp:'),
    lineaCodigoMax, lineaCodigoMin);
  const botonMano = el('button', { type: 'button', class: 'boton boton-chico' });
  const botonReiniciar = el('button', { type: 'button', class: 'anim-boton' }, '🔌 Apagar y encender');

  contenedor.append(el('div', { class: 'anim-maxmin' },
    el('div', {}, raiz, el('div', { class: 'anim-rapidos' }, botonMano, botonReiniciar)),
    el('div', { class: 'anim-controles' },
      el('div', { class: 'oled-marco chico' }, pantalla.lienzo), variables, codigo)));

  function leer() {
    // La temperatura se acerca poco a poco a la de la mano o a la del salón
    const meta = calentando ? tope : salon;
    temp += (meta - temp) * (calentando ? 0.18 : 0.1) + (Math.random() - 0.5) * 0.12;
    temp = Math.round(temp * 10) / 10;
    datos.push(temp);
    if (datos.length > LECTURAS) datos.shift();
    cumplidas = { max: temp > maxima, min: temp < minima };
    if (cumplidas.max) maxima = temp;
    if (cumplidas.min) minima = temp;
    dibujar();
  }

  function dibujar() {
    trazo.setAttribute('points', datos.map((t, i) => `${xDe(i)},${yDe(t)}`).join(' '));
    if (datos.length) { punto.setAttribute('cx', xDe(datos.length - 1)); punto.setAttribute('cy', yDe(temp)); }
    punto.style.display = datos.length ? '' : 'none';
    const linea = (grupo, valor, texto) => grupo.replaceChildren(...(valor > -100 && valor < 100
      ? [svg('line', { x1: X0, x2: X1, y1: yDe(valor), y2: yDe(valor) }), svg('text', { x: X1 - 4, y: yDe(valor) - 6, 'text-anchor': 'end' }, `${texto} ${valor.toFixed(1)}`)]
      : []));
    linea(lineaMax, maxima, 'máxima');
    linea(lineaMin, minima, 'mínima');
    lineaCodigoMax.classList.toggle('activa', cumplidas.max);
    lineaCodigoMin.classList.toggle('activa', cumplidas.min);
    variables.textContent = `temp   = ${datos.length ? temp.toFixed(1) : '—'}\nmaxima = ${maxima.toFixed(1)}\nminima = ${minima.toFixed(1)}`;
    // Pantalla como en la guía (humedad y luz fijas: aquí no cambian)
    pantalla.clearDisplay();
    pantalla.setTextSize(2); pantalla.setCursor(0, 0);
    pantalla.print(datos.length ? temp.toFixed(1) : '--.-'); pantalla.println(' C');
    pantalla.setTextSize(1);
    pantalla.println('Humedad: 63'); pantalla.println('Luz: 78');
    pantalla.print('Max: '); pantalla.print(maxima.toFixed(1)); pantalla.print('  Min: '); pantalla.println(minima.toFixed(1));
    pantalla.display();
    botonMano.textContent = calentando ? '✋ Soltar el sensor' : '🤚 Calentar con la mano';
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t; acumulado += dt;
    if (acumulado >= CADA) { acumulado = 0; leer(); }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonMano.addEventListener('click', () => { calentando = !calentando; dibujar(); });
  botonReiniciar.addEventListener('click', () => {
    // Al encender otra vez, las variables vuelven a empezar en −100 y 100
    maxima = -100; minima = 100; datos = []; temp = salon; calentando = false; cumplidas = { max: false, min: false };
    dibujar();
  });
  leer(); // la primera lectura al encender
  requestAnimationFrame(cuadro);
}

// ============================================================
// Animación "calibracion": comparar la estación con un termómetro y corregirla.
// Es una estación simulada (no la del equipo): su sensor mide un poco menos
// que el termómetro. Se toman lecturas, se calcula la diferencia promedio
// (eso lo hace el equipo) y se escribe en AJUSTE_TEMP:
//   float temp = dht.readTemperature() + AJUSTE_TEMP;
// Con un buen ajuste, el error queda en ±1 °C o menos.
//
// En la guía:
//   :::animacion tipo="calibracion"
//   :::
// Opciones (todas opcionales): sesgo (cuánto mide de menos el sensor simulado, 1.3) · salon (24)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const MIN = 18; const MAX = 30;     // escala dibujada en °C
const X0 = 40; const X1 = 520;

const coma = (n, d = 1) => n.toFixed(d).replace('.', ',').replace(/^-0,0+$/, '0,0');

export default function montar(contenedor, config) {
  const sesgo = limitar(numero(config.sesgo, 1.3), -3, 3);
  let real = limitar(numero(config.salon, 24), MIN + 2, MAX - 2);
  let ajuste = 0;
  let lecturas = [];
  let ultimo = 0; let acumulado = 0;

  const xDe = (t) => X0 + ((limitar(t, MIN, MAX) - MIN) / (MAX - MIN)) * (X1 - X0);
  const marcas = svg('g', {});
  for (let t = MIN; t <= MAX; t++) {
    marcas.append(svg('line', { x1: xDe(t), x2: xDe(t), y1: 92, y2: t % 2 ? 98 : 104, class: 'grafica-base' }));
    if (t % 2 === 0) marcas.append(svg('text', { x: xDe(t), y: 120, class: 'grafica-numero', 'text-anchor': 'middle' }, `${t}`));
  }
  const marcaTermo = svg('g', { class: 'calib-termo' });
  const marcaEstacion = svg('g', { class: 'calib-estacion' });
  const hueco = svg('g', { class: 'calib-hueco' });
  const raiz = svg('svg', { viewBox: '0 0 560 140', class: 'calib-svg', role: 'img', 'aria-label': 'Escala de temperatura con la lectura del termómetro y la de la estación' },
    svg('line', { x1: X0, x2: X1, y1: 92, y2: 92, class: 'grafica-base' }), marcas,
    svg('text', { x: X1, y: 136, class: 'grafica-numero', 'text-anchor': 'end' }, '°C'),
    hueco, marcaTermo, marcaEstacion);

  const visorTermo = el('strong', { class: 'calib-numero' });
  const visorEstacion = el('strong', { class: 'calib-numero' });
  const entradaAjuste = el('input', { type: 'number', step: 0.1, min: -5, max: 5, value: '0.0', class: 'temp-entrada', 'aria-label': 'AJUSTE_TEMP' });
  const cuerpo = el('tbody');
  const tabla = el('table', { class: 'calib-tabla' },
    el('thead', {}, el('tr', {}, el('th', {}, 'Lectura'), el('th', {}, 'Estación (°C)'), el('th', {}, 'Termómetro (°C)'), el('th', {}, 'Diferencia (°C)'), el('th', {}, 'AJUSTE_TEMP'))),
    cuerpo);
  const resultado = el('p', { class: 'anim-estado', 'aria-live': 'polite' });
  const botonLeer = el('button', { type: 'button', class: 'boton boton-chico' }, '📋 Anotar una lectura');
  const botonBorrar = el('button', { type: 'button', class: 'anim-boton' }, 'Borrar la tabla');

  contenedor.append(el('div', { class: 'anim-calibracion' },
    el('div', { class: 'calib-visores' },
      el('div', { class: 'calib-visor termo' }, el('span', {}, '🌡️ Termómetro comercial'), visorTermo),
      el('div', { class: 'calib-visor estacion' }, el('span', {}, '📟 Nuestra estación (simulada)'), visorEstacion)),
    raiz,
    el('pre', { class: 'joystick-codigo' },
      'const float AJUSTE_TEMP = ', entradaAjuste, ';\n',
      'float temp = dht.readTemperature() + AJUSTE_TEMP;'),
    el('div', { class: 'anim-rapidos' }, botonLeer, botonBorrar),
    el('div', { class: 'tabla-scroll' }, tabla),
    el('p', { class: 'texto-ayuda' }, 'Diferencia = Termómetro − Estación. El promedio de las diferencias lo calculan ustedes y lo escriben en AJUSTE_TEMP.'),
    resultado));

  // El sensor simulado: mide "sesgo" grados menos que el termómetro, con un poco de ruido
  let ruido = 0;
  const crudo = () => real - sesgo + ruido;
  const estacion = () => Math.round((crudo() + ajuste) * 10) / 10;
  const termometro = () => Math.round(real * 10) / 10;

  function dibujar() {
    const t = termometro(); const e = estacion();
    visorTermo.textContent = `${coma(t)} °C`;
    visorEstacion.textContent = `${coma(e)} °C`;
    marcaTermo.replaceChildren(svg('path', { d: `M ${xDe(t)} 92 l -8 -16 h 16 z` }), svg('text', { x: xDe(t), y: 68, 'text-anchor': 'middle' }, 'termómetro'));
    marcaEstacion.replaceChildren(svg('path', { d: `M ${xDe(e)} 92 l -8 -16 h 16 z` }), svg('text', { x: xDe(e), y: 30, 'text-anchor': 'middle' }, 'estación'), svg('line', { x1: xDe(e), x2: xDe(e), y1: 36, y2: 74 }));
    const dentro = Math.abs(t - e) <= 1;
    hueco.replaceChildren(svg('rect', { x: Math.min(xDe(t), xDe(e)), y: 80, width: Math.abs(xDe(t) - xDe(e)), height: 12, class: dentro ? 'bien' : 'mal' }));
  }

  function anotar() {
    if (lecturas.length >= 8) lecturas.shift();
    const e = estacion(); const t = termometro();
    lecturas.push({ e, t, ajuste });
    cuerpo.replaceChildren(...lecturas.map((l, i) => el('tr', {},
      el('td', {}, String(i + 1)), el('td', {}, coma(l.e)), el('td', {}, coma(l.t)),
      el('td', { class: Math.abs(l.t - l.e) <= 1 ? 'calib-bien' : 'calib-mal' }, `${l.t - l.e >= 0 ? '+' : ''}${coma(l.t - l.e)}`),
      el('td', {}, coma(l.ajuste)))));
    const conAjuste = lecturas.filter((l) => l.ajuste === ajuste);
    const ultimas = conAjuste.slice(-3);
    if (ajuste !== 0 && ultimas.length >= 3) {
      const bien = ultimas.every((l) => Math.abs(l.t - l.e) <= 1);
      resultado.textContent = bien
        ? `✅ Con AJUSTE_TEMP = ${coma(ajuste)}, las últimas 3 lecturas tienen un error de ±1 °C o menos.`
        : `Con AJUSTE_TEMP = ${coma(ajuste)} todavía hay lecturas con más de 1 °C de diferencia. Revisen el promedio.`;
    } else if (ajuste === 0 && lecturas.length >= 5) {
      resultado.textContent = 'Ya tienen 5 lecturas: calculen el promedio de la diferencia y escríbanlo en AJUSTE_TEMP.';
    } else {
      resultado.textContent = ajuste === 0 ? 'Anoten 5 lecturas sin ajuste.' : 'Anoten 3 lecturas con el ajuste para comprobarlo.';
    }
  }

  // El salón cambia muy despacio y el sensor tiembla un poco
  function cuadro(tiempo) {
    const dt = ultimo ? Math.min(100, tiempo - ultimo) : 0;
    ultimo = tiempo; acumulado += dt;
    if (acumulado > 900) {
      acumulado = 0;
      real = limitar(real + (Math.random() - 0.5) * 0.2, MIN + 3, MAX - 3);
      ruido = (Math.random() - 0.5) * 0.3;
      dibujar();
    }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  entradaAjuste.addEventListener('change', () => {
    ajuste = Math.round(limitar(Number(String(entradaAjuste.value).replace(',', '.')) || 0, -5, 5) * 10) / 10;
    entradaAjuste.value = ajuste.toFixed(1);
    resultado.textContent = 'Anoten 3 lecturas con el ajuste para comprobarlo.';
    dibujar();
  });
  botonLeer.addEventListener('click', anotar);
  botonBorrar.addEventListener('click', () => { lecturas = []; cuerpo.replaceChildren(); resultado.textContent = 'Anoten 5 lecturas sin ajuste.'; });
  resultado.textContent = 'Esperen a que se estabilice y anoten 5 lecturas sin ajuste.';
  dibujar();
  requestAnimationFrame(cuadro);
}

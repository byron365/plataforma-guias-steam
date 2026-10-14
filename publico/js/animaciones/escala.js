// ============================================================
// Animación "escala": qué tan pequeño queda algo en una maqueta.
// Se elige la escala (1:50, 1:100, 1:200, 1:500) y un objeto, y se ve
// el cálculo  real (m) → cm → ÷ escala  y el tamaño en la maqueta.
//
// Los objetos NO son los de la tabla de la guía (para no dar las respuestas),
// salvo el ejemplo que la guía ya trae resuelto si se indica con "ejemplo".
//
// En la guía:
//   :::animacion tipo="escala" escala="200" ejemplo="Tramo que se abre|61"
//   :::
// Opciones (todas opcionales):
//   escala    escala inicial (por defecto 200, es decir 1:200)
//   ejemplo   "nombre|metros" de un objeto extra (por ejemplo el que la guía ya resolvió)
//   objetos   lista "nombre|metros; nombre|metros" para reemplazar los de siempre
//   fija      "si": no deja cambiar la escala (cuando la guía pregunta qué pasaría con otra)
// ============================================================
import { svg, numero } from './comun/svg.js';
import { el } from '../comun.js';

const ESCALAS = [50, 100, 200, 500];
const OBJETOS = [
  { nombre: 'Persona (alto)', metros: 1.6, forma: 'persona' },
  { nombre: 'Carro (largo)', metros: 4, forma: 'carro' },
  { nombre: 'Autobús (largo)', metros: 12, forma: 'bus' },
  { nombre: 'Edificio de 3 pisos (alto)', metros: 9, forma: 'edificio' },
];
const coma = (n, dec = 2) => {
  const redondo = Math.round(n * 10 ** dec) / 10 ** dec;
  return String(redondo).replace('.', ',');
};

function leerObjetos(texto) {
  return String(texto).split(';').map((par) => {
    const [nombre, metros] = par.split('|').map((s) => s.trim());
    return { nombre, metros: Number(String(metros).replace(',', '.')), forma: 'barra' };
  }).filter((o) => o.nombre && o.metros > 0);
}

export default function montar(contenedor, config) {
  let escala = ESCALAS.includes(numero(config.escala, 200)) ? numero(config.escala, 200) : 200;
  const objetos = config.objetos ? leerObjetos(config.objetos) : [...OBJETOS];
  if (config.ejemplo) objetos.push(...leerObjetos(config.ejemplo));
  let elegido = 0;

  // ---------- Controles ----------
  const botonesEscala = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Escala' },
    ESCALAS.map((e) => el('button', { type: 'button', class: 'anim-boton', 'data-escala': e, onclick: () => { escala = e; dibujar(); } }, `1:${e}`)));
  const botonesObjeto = el('div', { class: 'anim-rapidos', role: 'group', 'aria-label': 'Objeto' },
    objetos.map((o, i) => el('button', { type: 'button', class: 'anim-boton', 'data-objeto': i, onclick: () => { elegido = i; dibujar(); } }, o.nombre)));
  const calculo = el('div', { class: 'escala-calculo', 'aria-live': 'polite' });
  const regla = svg('svg', { viewBox: '0 0 520 150', class: 'escala-svg', role: 'img' });

  contenedor.append(el('div', { class: 'anim-escala' },
    el('p', { class: 'anim-etiqueta' }, config.fija === 'si' ? `Escala de la maqueta: 1:${escala}` : 'Escala de la maqueta'),
    config.fija === 'si' ? null : botonesEscala,
    el('p', { class: 'anim-etiqueta' }, 'Objeto real'), botonesObjeto,
    calculo, regla));

  // Dibujo: una barra a escala sobre una regla de 0 a 12 cm (1 cm = 40 unidades del dibujo)
  const PX_CM = 40;
  const ICONOS = { persona: '🧍', carro: '🚗', bus: '🚌', edificio: '🏢', barra: '📏' };

  function dibujar() {
    botonesEscala.querySelectorAll('button').forEach((b) => {
      const activo = Number(b.dataset.escala) === escala;
      b.classList.toggle('activo', activo); b.setAttribute('aria-pressed', String(activo));
    });
    botonesObjeto.querySelectorAll('button').forEach((b) => {
      const activo = Number(b.dataset.objeto) === elegido;
      b.classList.toggle('activo', activo); b.setAttribute('aria-pressed', String(activo));
    });

    const o = objetos[elegido];
    const cm = o.metros * 100;
    const maqueta = cm / escala;
    calculo.replaceChildren(
      el('div', { class: 'escala-paso' }, el('span', {}, 'Medida real'), el('strong', {}, `${coma(o.metros)} m`)),
      el('div', { class: 'escala-flecha', 'aria-hidden': 'true' }, '× 100 →'),
      el('div', { class: 'escala-paso' }, el('span', {}, 'En centímetros'), el('strong', {}, `${coma(cm, 0)} cm`)),
      el('div', { class: 'escala-flecha', 'aria-hidden': 'true' }, `÷ ${escala} →`),
      el('div', { class: 'escala-paso escala-resultado' }, el('span', {}, 'En la maqueta'), el('strong', {}, `${coma(maqueta)} cm`)));

    // Regla de 0 a 12 cm; si el objeto no cabe, se avisa
    regla.replaceChildren();
    const base = 100; const x0 = 20;
    for (let c = 0; c <= 12; c++) {
      const x = x0 + c * PX_CM;
      regla.append(svg('line', { x1: x, x2: x, y1: base + 6, y2: base + (c % 5 === 0 ? 22 : 14), class: 'escala-marca' }),
        svg('text', { x, y: base + 38, class: 'escala-numero', 'text-anchor': 'middle' }, String(c)));
    }
    regla.append(svg('line', { x1: x0, x2: x0 + 12 * PX_CM, y1: base + 6, y2: base + 6, class: 'escala-marca' }),
      svg('text', { x: x0 + 12 * PX_CM + 8, y: base + 38, class: 'escala-numero' }, 'cm'));
    const largo = Math.max(2, Math.min(maqueta, 12) * PX_CM);
    regla.append(
      svg('text', { x: x0, y: base - 40, class: 'escala-icono' }, ICONOS[o.forma] || ICONOS.barra),
      svg('rect', { x: x0, y: base - 24, width: largo, height: 24, rx: 4, class: 'escala-barra' }),
      svg('text', { x: Math.min(x0 + largo + 8, 470), y: base - 7, class: 'escala-numero', 'text-anchor': largo > 440 ? 'end' : 'start' },
        maqueta > 12 ? `${coma(maqueta)} cm (no cabe en la regla)` : `${coma(maqueta)} cm`));
    regla.setAttribute('aria-label', `${o.nombre}: en la maqueta mide ${coma(maqueta)} cm`);
  }

  dibujar();
}

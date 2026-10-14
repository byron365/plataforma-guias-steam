// ============================================================
// Animación "contrapeso": la cabina y el contrapeso cuelgan de la misma polea.
// El motor solo tiene que mover la diferencia entre los dos.
// Se cambian las masas (de 25 en 25 g) y se ve hacia dónde se inclina
// el sistema, la masa que levanta el motor, la fuerza y el torque con
// el radio de la polea.
//
// En la guía:
//   :::animacion tipo="contrapeso"
//   :::
// Opciones (todas opcionales): cabina (200 g) · contrapeso (100 g) · radio (1,5 cm)
// ============================================================
import { svg, numero, limitar } from './comun/svg.js';
import { el } from '../comun.js';

const coma = (n, d = 2) => String(Math.round(n * 10 ** d) / 10 ** d).replace('.', ',');

export default function montar(contenedor, config) {
  let cabina = limitar(Math.round(numero(config.cabina, 200) / 25) * 25, 25, 400);
  let contra = limitar(Math.round(numero(config.contrapeso, 100) / 25) * 25, 0, 400);
  const radio = limitar(numero(config.radio, 1.5), 0.5, 5);
  let inclinacion = 0; let ultimo = 0;

  const capa = svg('g', {});
  const raiz = svg('svg', { viewBox: '0 0 360 300', class: 'contra-svg', role: 'img', 'aria-label': 'Polea con la cabina de un lado y el contrapeso del otro' },
    svg('rect', { x: 150, y: 10, width: 60, height: 16, rx: 3, class: 'contra-soporte' }),
    svg('circle', { cx: 180, cy: 50, r: 40, class: 'contra-polea' }),
    svg('circle', { cx: 180, cy: 50, r: 6, class: 'contra-eje' }),
    svg('text', { x: 180, y: 104, class: 'contra-texto', 'text-anchor': 'middle' }, 'motor + carrete'),
    capa);

  const rCabina = el('input', { type: 'range', class: 'anim-deslizador', min: 25, max: 400, step: 25, value: cabina, 'aria-label': 'Masa de la cabina' });
  const rContra = el('input', { type: 'range', class: 'anim-deslizador', min: 0, max: 400, step: 25, value: contra, 'aria-label': 'Masa del contrapeso' });
  const vCabina = el('strong'); const vContra = el('strong');
  const cuentas = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });
  contenedor.append(el('div', { class: 'anim-contra' }, raiz,
    el('div', { class: 'anim-controles' },
      el('label', { class: 'anim-etiqueta' }, 'Cabina con carga: ', vCabina, rCabina),
      el('label', { class: 'anim-etiqueta' }, 'Contrapeso: ', vContra, rContra),
      cuentas)));

  function dibujar() {
    const dy = inclinacion * 40;   // la cabina baja si pesa más
    const yCab = 170 + dy; const yCon = 170 - dy;
    const alto = (m) => 20 + m / 10;
    capa.replaceChildren(
      svg('line', { x1: 140, y1: 50, x2: 140, y2: yCab, class: 'contra-hilo' }),
      svg('line', { x1: 220, y1: 50, x2: 220, y2: yCon, class: 'contra-hilo' }),
      svg('rect', { x: 100, y: yCab, width: 80, height: 70, rx: 6, class: 'contra-cabina' }),
      svg('text', { x: 140, y: yCab + 40, class: 'contra-texto claro', 'text-anchor': 'middle' }, `${cabina} g`),
      svg('rect', { x: 205, y: yCon, width: 30, height: alto(contra), rx: 4, class: 'contra-peso' }),
      svg('text', { x: 250, y: yCon + 18, class: 'contra-texto' }, `${contra} g`),
      svg('text', { x: 140, y: 290, class: 'contra-texto', 'text-anchor': 'middle' }, 'cabina'),
      svg('text', { x: 220, y: 290, class: 'contra-texto', 'text-anchor': 'middle' }, 'contrapeso'));
  }

  function actualizar() {
    const dif = cabina - contra;
    const kg = Math.abs(dif) / 1000;
    const fuerza = kg * 9.8;
    vCabina.textContent = `${cabina} g`; vContra.textContent = `${contra} g`;
    cuentas.textContent =
      `Diferencia = ${cabina} − ${contra} = ${dif} g\n` +
      `${dif > 0 ? 'Sin motor, la cabina baja' : dif < 0 ? 'Sin motor, el contrapeso baja' : 'Sin motor, quedan equilibrados'}\n` +
      `Fuerza ≈ ${coma(kg, 3)} kg × 9,8 = ${coma(fuerza)} N\n` +
      `Torque ≈ ${coma(fuerza)} N × ${coma(radio, 1)} cm = ${coma(fuerza * radio)} N·cm`;
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    const meta = limitar((cabina - contra) / 200, -1, 1);
    inclinacion += (meta - inclinacion) * Math.min(1, dt * 0.004);
    dibujar();
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }
  rCabina.addEventListener('input', () => { cabina = Number(rCabina.value); actualizar(); });
  rContra.addEventListener('input', () => { contra = Number(rContra.value); actualizar(); });
  actualizar(); dibujar();
  requestAnimationFrame(cuadro);
}

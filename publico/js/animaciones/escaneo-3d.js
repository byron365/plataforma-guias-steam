// ============================================================
// Animación "escaneo-3d": fotogrametría, el modelo 3D sale de muchas fotos.
// A la izquierda, el objeto (un trofeo) y la cámara dando vueltas a tres alturas
// (abajo, a media altura y desde arriba). A la derecha, el modelo que se va
// armando: cada foto agrega los puntos del objeto que se ven desde ahí.
// Las partes que ninguna foto vio quedan como huecos.
//
// En la guía:
//   :::animacion tipo="escaneo-3d"
//   :::
// Opciones (todas opcionales): porvuelta (fotos por vuelta, 14)
// ============================================================
import { svg, numero, limitar, pocoMovimiento } from './comun/svg.js';
import { el } from '../comun.js';

const ALTURAS = [
  { k: 'abajo', nombre: 'Abajo', elev: 5 },
  { k: 'media', nombre: 'Media altura', elev: 30 },
  { k: 'arriba', nombre: 'Desde arriba', elev: 65 },
];
// Perfil del trofeo: [altura (0 a 1), radio (0 a 1)]
const PERFIL = [[0, 0.62], [0.08, 0.62], [0.1, 0.3], [0.35, 0.16], [0.45, 0.2], [0.55, 0.5], [0.75, 0.72], [0.95, 0.8], [1, 0.8]];
const radioEn = (h) => {
  for (let i = 1; i < PERFIL.length; i++) {
    if (h <= PERFIL[i][0]) { const [h0, r0] = PERFIL[i - 1]; const [h1, r1] = PERFIL[i]; return r0 + ((h - h0) / (h1 - h0)) * (r1 - r0); }
  }
  return PERFIL[PERFIL.length - 1][1];
};

export default function montar(contenedor, config) {
  const porVuelta = limitar(Math.round(numero(config.porvuelta, 14)), 6, 36);
  // Puntos de la superficie: costado (afuera), borde de arriba y adentro de la copa
  const puntos = [];
  for (let i = 0; i < 26; i++) {
    const h = i / 25;
    for (let j = 0; j < 28; j++) puntos.push({ th: (j / 28) * 360, h, r: radioEn(h), tipo: 'afuera', visto: false });
  }
  for (let j = 0; j < 28; j++) for (const k of [0.25, 0.5, 0.75]) puntos.push({ th: (j / 28) * 360 + 6, h: 0.98 - k * 0.3, r: 0.8 * (1 - k * 0.45), tipo: 'adentro', visto: false });

  let altura = 1; let azimut = 0; let fotos = 0;
  const porAltura = [0, 0, 0];
  let auto = 0; let espera = 0; let giro = 0; let ultimo = 0;

  // ---------- Escena: objeto y cámara ----------
  const camara = svg('g', { class: 'esc-camara' }, svg('rect', { x: -12, y: -8, width: 24, height: 16, rx: 3 }), svg('circle', { r: 5 }));
  const flash = svg('circle', { r: 26, class: 'esc-flash' });
  const huellas = svg('g', {});
  const orbita = svg('ellipse', { cx: 150, rx: 120, class: 'esc-orbita' });
  const trofeoLado = svg('path', { class: 'esc-trofeo' });
  const escena = svg('svg', { viewBox: '0 0 300 260', class: 'esc-svg', role: 'img', 'aria-label': 'Trofeo y la cámara tomando fotos alrededor' },
    svg('ellipse', { cx: 150, cy: 214, rx: 70, ry: 14, class: 'esc-mesa' }),
    orbita, huellas, trofeoLado, flash, camara);
  // Silueta del trofeo de lado
  const silueta = () => {
    const izq = []; const der = [];
    PERFIL.forEach(([h, r]) => { der.push(`${150 + r * 48} ${210 - h * 150}`); izq.unshift(`${150 - r * 48} ${210 - h * 150}`); });
    return `M ${der.join(' L ')} L ${izq.join(' L ')} Z`;
  };
  trofeoLado.setAttribute('d', silueta());

  // ---------- El modelo que se arma ----------
  const nube = svg('g', {});
  const modelo = svg('svg', { viewBox: '0 0 260 260', class: 'esc-svg modelo', role: 'img', 'aria-label': 'Modelo 3D que se arma con las fotos' },
    svg('text', { x: 130, y: 22, class: 'esc-texto', 'text-anchor': 'middle' }, 'Modelo 3D (nube de puntos)'), nube);

  const botonesAltura = el('div', { class: 'anim-rapidos selector-modo', role: 'group', 'aria-label': 'Altura de la cámara' },
    ALTURAS.map((a, i) => el('button', { type: 'button', class: 'anim-boton', 'data-i': i, onclick: () => { altura = i; marcar(); } }, a.nombre)));
  const botonFoto = el('button', { type: 'button', class: 'boton boton-chico' }, '📸 Tomar una foto');
  const botonVuelta = el('button', { type: 'button', class: 'anim-boton' }, `🔄 Dar una vuelta (${porVuelta} fotos)`);
  const botonBorrar = el('button', { type: 'button', class: 'anim-boton' }, '🗑 Empezar de nuevo');
  const cuenta = el('pre', { class: 'joystick-codigo', 'aria-live': 'polite' });

  contenedor.append(el('div', { class: 'anim-escaneo' },
    el('div', { class: 'esc-vistas' }, escena, modelo),
    el('div', { class: 'anim-controles' },
      el('p', { class: 'anim-etiqueta' }, 'Altura de la cámara'), botonesAltura,
      el('div', { class: 'anim-rapidos' }, botonFoto, botonVuelta, botonBorrar),
      cuenta)));

  function marcar() {
    botonesAltura.querySelectorAll('button').forEach((b) => { const a = Number(b.dataset.i) === altura; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', String(a)); });
    dibujarEscena();
  }

  // Posición de la cámara en la escena (una elipse por altura)
  const posCamara = (az, alt) => {
    const yOrbita = [196, 130, 40][alt]; const ry = [18, 22, 26][alt];
    return { x: 150 + Math.sin((az * Math.PI) / 180) * 120, y: yOrbita + Math.cos((az * Math.PI) / 180) * ry, yOrbita, ry };
  };

  function dibujarEscena() {
    const p = posCamara(azimut, altura);
    orbita.setAttribute('cy', p.yOrbita); orbita.setAttribute('ry', p.ry);
    camara.setAttribute('transform', `translate(${p.x} ${p.y})`);
    // La cámara queda detrás del trofeo cuando está "al fondo"
    camara.style.opacity = Math.cos((azimut * Math.PI) / 180) < -0.3 && altura < 2 ? '0.35' : '1';
  }

  // Una foto ve los puntos que miran hacia la cámara
  function tomarFoto() {
    const elev = ALTURAS[altura].elev;
    for (const pt of puntos) {
      let d = Math.abs(((pt.th - azimut + 540) % 360) - 180);
      if (pt.tipo === 'afuera') {
        // Debajo de la copa solo se ve desde abajo o a media altura; arriba del todo, desde arriba
        const tapado = (pt.h > 0.1 && pt.h < 0.5 && elev > 50) || (pt.h > 0.93 && elev < 20);
        if (d < 75 && !tapado) pt.visto = true;
      } else if (elev > 50 || (elev > 20 && d > 120)) {
        // Adentro de la copa: desde arriba, o desde media altura mirando la pared del otro lado
        pt.visto = true;
      }
    }
    fotos++; porAltura[altura]++;
    azimut = (azimut + 360 / porVuelta) % 360;
    flash.setAttribute('opacity', '0.8');
    const p = posCamara(azimut, altura);
    huellas.append(svg('circle', { cx: p.x, cy: p.y, r: 2.5, class: 'esc-huella' }));
    dibujarEscena();
    dibujarModelo();
    contar();
  }

  function dibujarModelo() {
    const g = (giro * Math.PI) / 180;
    const lista = puntos.filter((pt) => pt.visto).map((pt) => {
      const a = (pt.th * Math.PI) / 180 + g;
      return { x: 130 + Math.sin(a) * pt.r * 70, y: 236 - pt.h * 190 + Math.cos(a) * pt.r * 14, z: Math.cos(a), tipo: pt.tipo };
    }).sort((a, b) => a.z - b.z);
    nube.replaceChildren(...lista.map((p) => svg('circle', { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: 2.2, class: `esc-punto ${p.tipo}`, opacity: (0.45 + 0.55 * (p.z + 1) / 2).toFixed(2) })));
  }

  function contar() {
    const vistos = puntos.filter((p) => p.visto).length;
    const pct = Math.round((vistos / puntos.length) * 100);
    cuenta.textContent =
      `Fotos: ${fotos}  (abajo ${porAltura[0]} · media ${porAltura[1]} · arriba ${porAltura[2]})\n` +
      `Superficie reconstruida: ${pct} %` + (fotos ? (pct >= 95 ? '  ✓ casi completo' : '  (los huecos son partes que ninguna foto vio)') : '');
  }

  function cuadro(t) {
    const dt = ultimo ? Math.min(100, t - ultimo) : 0;
    ultimo = t;
    if (!pocoMovimiento()) { giro = (giro + dt * 0.02) % 360; dibujarModelo(); }
    const f = Number(flash.getAttribute('opacity') || 0);
    if (f > 0) flash.setAttribute('opacity', Math.max(0, f - dt / 300).toFixed(2));
    const p = posCamara(azimut, altura); flash.setAttribute('cx', p.x); flash.setAttribute('cy', p.y);
    if (auto > 0) { espera += dt; if (espera > 180) { espera = 0; auto--; tomarFoto(); } }
    if (contenedor.isConnected) requestAnimationFrame(cuadro);
  }

  botonFoto.addEventListener('click', tomarFoto);
  botonVuelta.addEventListener('click', () => { auto = porVuelta; espera = 0; });
  botonBorrar.addEventListener('click', () => {
    puntos.forEach((p) => { p.visto = false; }); fotos = 0; porAltura.fill(0); azimut = 0; auto = 0;
    huellas.replaceChildren(); dibujarEscena(); dibujarModelo(); contar();
  });
  flash.setAttribute('opacity', '0');
  marcar(); contar(); dibujarModelo();
  requestAnimationFrame(cuadro);
}

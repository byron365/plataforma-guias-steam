// ============================================================
// Pantalla OLED SSD1306 de 128 × 64 píxeles, dibujada píxel por píxel
// (compartida por las animaciones que muestran una pantalla).
//
// Imita la librería Adafruit_SSD1306:
//   const p = crearOLED();
//   p.clearDisplay(); p.setTextSize(2); p.setCursor(0, 0);
//   p.print('24.6'); p.println(' C'); p.display();
// Cada letra ocupa 6 × 8 píxeles por tamaño, como la letra de Adafruit
// (dibujadas en comun/letra5x7.js). Si falta alguna, se genera con la fuente
// monoespaciada del sistema (sin internet): se dibuja grande y se reduce a 5 × 7.
// ============================================================
import { puntosLetra } from './letra5x7.js';

export const ANCHO_OLED = 128;
export const ALTO_OLED = 64;

// ---------- Letras de 5 × 7 puntos (se calculan una vez y se guardan) ----------
const letras = new Map();
let lienzoLetras = null;

function letra(c) {
  if (letras.has(c)) return letras.get(c);
  const dibujada = puntosLetra(c);
  if (dibujada) { letras.set(c, dibujada); return dibujada; }
  const puntos = new Uint8Array(5 * 7);
  if (c.trim()) {
    const T = 10; // tamaño de cada punto al dibujar en grande
    if (!lienzoLetras) { lienzoLetras = document.createElement('canvas'); lienzoLetras.width = 5 * T; lienzoLetras.height = 7 * T; }
    const ctx = lienzoLetras.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, 5 * T, 7 * T);
    ctx.fillStyle = '#000';
    ctx.font = `bold ${7 * T}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    // La letra se estira para llenar el recuadro de 5 × 7
    const medida = ctx.measureText(c);
    const ancho = medida.width || 5 * T;
    const arriba = medida.actualBoundingBoxAscent || 7 * T;
    const abajo = medida.actualBoundingBoxDescent || 0;
    const alto = Math.max(1, arriba + abajo);
    const altoMayuscula = ctx.measureText('H').actualBoundingBoxAscent || alto;
    ctx.save();
    // Base de la línea a 6/7 del recuadro: las letras con cola (g, p, y) bajan un punto
    ctx.translate(2.5 * T, 6 * T);
    ctx.scale((5 * T) / ancho, (6 * T) / altoMayuscula);
    ctx.fillText(c, 0, 0);
    ctx.restore();
    const datos = ctx.getImageData(0, 0, 5 * T, 7 * T).data;
    for (let fy = 0; fy < 7; fy++) {
      for (let fx = 0; fx < 5; fx++) {
        let tinta = 0;
        for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) tinta += datos[(((fy * T + y) * 5 * T) + fx * T + x) * 4 + 3];
        puntos[fy * 5 + fx] = tinta / (T * T * 255) > 0.38 ? 1 : 0;
      }
    }
  }
  letras.set(c, puntos);
  return puntos;
}

// ---------- La pantalla ----------
// escala: tamaño en la página de cada píxel de la pantalla
export function crearOLED({ escala = 3, color = '#E0F2FE' } = {}) {
  const lienzo = document.createElement('canvas');
  lienzo.width = ANCHO_OLED * escala;
  lienzo.height = ALTO_OLED * escala;
  lienzo.className = 'oled-lienzo';
  lienzo.setAttribute('role', 'img');
  const ctx = lienzo.getContext('2d');
  const memoria = new Uint8Array(ANCHO_OLED * ALTO_OLED); // lo que se dibujó (antes de display)
  let tamano = 1; let cx = 0; let cy = 0;
  let textoVisible = '';
  let textoMemoria = '';
  let invertida = false;

  const pixel = (x, y, v = 1) => {
    if (x >= 0 && x < ANCHO_OLED && y >= 0 && y < ALTO_OLED) memoria[y * ANCHO_OLED + x] = v;
  };
  function escribirLetra(c) {
    if (c === '\n') { cx = 0; cy += 8 * tamano; return; }
    if (cx + 6 * tamano > ANCHO_OLED) { cx = 0; cy += 8 * tamano; } // salta de línea solo, como Adafruit
    const p = letra(c);
    for (let fy = 0; fy < 7; fy++) {
      for (let fx = 0; fx < 5; fx++) {
        if (!p[fy * 5 + fx]) continue;
        for (let dy = 0; dy < tamano; dy++) for (let dx = 0; dx < tamano; dx++) pixel(cx + fx * tamano + dx, cy + fy * tamano + dy);
      }
    }
    cx += 6 * tamano;
  }

  const pantalla = {
    lienzo,
    clearDisplay() { memoria.fill(0); cx = 0; cy = 0; textoMemoria = ''; },
    setTextSize(n) { tamano = Math.max(1, Math.min(8, Math.round(n) || 1)); },
    setCursor(x, y) { cx = Math.round(x) || 0; cy = Math.round(y) || 0; },
    print(t) { const s = String(t); for (const c of s) escribirLetra(c); textoMemoria += s; },
    println(t = '') { pantalla.print(`${t}\n`); },
    pixel,
    // Copia la memoria a la pantalla (como pantalla.display())
    display() {
      ctx.fillStyle = invertida ? color : '#05070A';
      ctx.fillRect(0, 0, lienzo.width, lienzo.height);
      ctx.fillStyle = invertida ? '#05070A' : color;
      const lado = escala > 2 ? escala - 0.6 : escala;
      for (let y = 0; y < ALTO_OLED; y++) {
        for (let x = 0; x < ANCHO_OLED; x++) if (memoria[y * ANCHO_OLED + x]) ctx.fillRect(x * escala, y * escala, lado, lado);
      }
      textoVisible = textoMemoria.trim().replace(/\s*\n\s*/g, ' · ');
      lienzo.setAttribute('aria-label', `Pantalla OLED: ${textoVisible || 'en negro'}`);
    },
    // Cambia blanco por negro en toda la pantalla (como pantalla.invertDisplay())
    invertDisplay(si) { invertida = Boolean(si); pantalla.display(); },
    get cursor() { return { x: cx, y: cy }; },
  };
  pantalla.display();
  return pantalla;
}

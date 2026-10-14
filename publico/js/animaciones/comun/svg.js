// ============================================================
// Ayudas para dibujar con SVG (compartidas por todas las animaciones)
// ============================================================
const NS = 'http://www.w3.org/2000/svg';

// Crea un elemento SVG:  svg('circle', { cx: 10, cy: 10, r: 5 })
export function svg(etiqueta, atributos = {}, ...hijos) {
  const nodo = document.createElementNS(NS, etiqueta);
  for (const [clave, valor] of Object.entries(atributos)) {
    if (valor !== undefined && valor !== null) nodo.setAttribute(clave, valor);
  }
  for (const hijo of hijos) {
    if (hijo) nodo.append(typeof hijo === 'string' ? document.createTextNode(hijo) : hijo);
  }
  return nodo;
}

// Punto en un círculo. "grados" se mide como en un transportador:
// 0° a la derecha, 90° arriba, 180° a la izquierda.
export function puntoTransportador(cx, cy, radio, grados) {
  const rad = (grados * Math.PI) / 180;
  return { x: cx + radio * Math.cos(rad), y: cy - radio * Math.sin(rad) };
}

// Punto en un círculo medido como en una perilla:
// 0° arriba y los grados crecen en sentido del reloj.
export function puntoPerilla(cx, cy, radio, grados) {
  const rad = (grados * Math.PI) / 180;
  return { x: cx + radio * Math.sin(rad), y: cy - radio * Math.cos(rad) };
}

// Limita un número a un rango
export function limitar(valor, minimo, maximo) {
  return Math.min(maximo, Math.max(minimo, valor));
}

// Lee un número de la configuración del bloque :::animacion (vienen como texto)
export function numero(valor, porDefecto) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : porDefecto;
}

// La función map() de Arduino, con división entera como en el Arduino real
export function mapArduino(x, inMin, inMax, outMin, outMax) {
  return Math.trunc(((x - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;
}

// ¿El usuario pidió menos movimiento en su sistema?
export const pocoMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

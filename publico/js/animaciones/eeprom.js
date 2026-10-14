// ============================================================
// Animación "eeprom": un récord que no se borra al apagar el Arduino.
// A la izquierda, la memoria normal (RAM) con la variable record; a la derecha,
// las primeras casillas de la EEPROM (cada casilla guarda 1 byte; record ocupa 4).
// Se juegan partidas, se desconecta y se vuelve a conectar el Arduino, con o
// sin las líneas de EEPROM del reto 2.
//
// En la guía:
//   :::animacion tipo="eeprom"
//   :::
// Opciones: ninguna.
// ============================================================
import { el } from '../comun.js';

const CASILLAS = 16;
const hex = (n) => n.toString(16).toUpperCase().padStart(2, '0');
const seg = (ms) => `${(ms / 1000).toFixed(1).replace('.', ',')} s`;

export default function montar(contenedor) {
  const eeprom = new Uint8Array(CASILLAS).fill(0xFF); // una EEPROM nueva viene con FF
  let record = 0;        // RAM
  let encendido = true;
  let conEeprom = true;
  let escrituras = 0;
  let lineas = [];

  const celdas = Array.from({ length: CASILLAS }, (_, i) => el('div', { class: `eeprom-celda${i < 4 ? ' record' : ''}` },
    el('small', {}, String(i)), el('strong', {})));
  const ram = el('strong', { class: 'eeprom-ram-valor' });
  const placa = el('div', { class: 'eeprom-placa' });
  const monitor = el('pre', { class: 'disp-monitor', 'aria-live': 'polite' });
  const codigo = el('pre', { class: 'semaforo-codigo' });
  const lineasCodigo = {
    get: el('span', { class: 'semaforo-linea' }, 'EEPROM.get(0, record);'),
    vacia: el('span', { class: 'semaforo-linea' }, 'if (record == 0xFFFFFFFF) record = 0;'),
    nuevo: el('span', { class: 'semaforo-linea' }, 'record = t;'),
    put: el('span', { class: 'semaforo-linea' }, 'EEPROM.put(0, record);'),
  };
  codigo.append(el('span', { class: 'semaforo-fija' }, '// en setup, al final:'), lineasCodigo.get, lineasCodigo.vacia,
    el('span', { class: 'semaforo-fija' }, '// cuando hay récord nuevo:'), lineasCodigo.nuevo, lineasCodigo.put);
  const botonJugar = el('button', { type: 'button', class: 'boton boton-chico' }, '🕹 Jugar una partida');
  const botonEnergia = el('button', { type: 'button', class: 'anim-boton' });
  const casilla = el('input', { type: 'checkbox', checked: true });

  contenedor.append(el('div', { class: 'anim-eeprom' },
    el('div', { class: 'eeprom-memorias' },
      el('div', { class: 'eeprom-caja' }, el('p', { class: 'eeprom-titulo' }, 'RAM (se borra al apagar)'), el('p', {}, 'unsigned long record = ', ram)),
      el('div', { class: 'eeprom-caja' }, el('p', { class: 'eeprom-titulo' }, 'EEPROM (no se borra)'), el('div', { class: 'eeprom-rejilla' }, ...celdas),
        el('p', { class: 'texto-ayuda' }, 'Casillas 0 a 3: los 4 bytes de record.'))),
    placa,
    el('div', { class: 'anim-rapidos' }, botonJugar, botonEnergia),
    el('label', { class: 'casilla-simple' }, casilla, ' Usar las líneas de EEPROM (reto 2)'),
    el('div', { class: 'eeprom-abajo' }, codigo, monitor)));

  const escribir = (t) => { lineas.push(t); lineas = lineas.slice(-6); monitor.textContent = lineas.join('\n'); };
  const resaltar = (...claves) => Object.entries(lineasCodigo).forEach(([k, s]) => s.classList.toggle('activa', claves.includes(k)));
  // EEPROM.put / get de un unsigned long (4 bytes, el byte menos importante primero)
  const put = (v) => { for (let i = 0; i < 4; i++) eeprom[i] = (v >>> (8 * i)) & 0xFF; escrituras++; };
  const get = () => (eeprom[0] | (eeprom[1] << 8) | (eeprom[2] << 16) | (eeprom[3] << 24)) >>> 0;

  function dibujar() {
    celdas.forEach((c, i) => { c.querySelector('strong').textContent = hex(eeprom[i]); });
    ram.textContent = encendido ? String(record) : '(apagado)';
    placa.textContent = encendido
      ? `🟢 Arduino encendido · récord en pantalla: ${record ? seg(record) : 'todavía no hay'}`
      : '⚫ Arduino desconectado';
    placa.classList.toggle('apagado', !encendido);
    botonJugar.disabled = !encendido;
    botonEnergia.textContent = encendido ? '🔌 Desconectar' : '🔌 Conectar otra vez';
    celdas.forEach((c) => c.classList.toggle('apagada', !encendido));
    celdas.slice(0, 4).forEach((c) => c.setAttribute('title', `Escrituras en estas casillas: ${escrituras}`));
  }

  function encender() {
    encendido = true; record = 0; // la RAM empieza vacía
    if (conEeprom) {
      record = get(); resaltar('get');
      escribir(`EEPROM.get → record = ${record === 0xFFFFFFFF ? '0xFFFFFFFF' : record}`);
      if (record === 0xFFFFFFFF) { record = 0; resaltar('get', 'vacia'); escribir('EEPROM vacía → record = 0'); }
    } else {
      resaltar();
      escribir('Sin EEPROM: record empieza en 0');
    }
  }

  botonJugar.addEventListener('click', () => {
    const t = Math.round((12 + Math.random() * 25) * 10) * 100; // un tiempo de partida inventado
    if (record === 0 || t < record) {
      record = t;
      if (conEeprom) { put(record); resaltar('nuevo', 'put'); escribir(`RECORD! ${seg(t)} → EEPROM.put`); }
      else { resaltar('nuevo'); escribir(`RECORD! ${seg(t)} (solo en la RAM)`); }
    } else { resaltar(); escribir(`Meta ${seg(t)} (no supera el récord)`); }
    dibujar();
  });
  botonEnergia.addEventListener('click', () => {
    if (encendido) { encendido = false; record = 0; resaltar(); escribir('--- desconectado ---'); }
    else encender();
    dibujar();
  });
  casilla.addEventListener('change', () => { conEeprom = casilla.checked; });

  encender();
  dibujar();
}

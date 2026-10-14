// ============================================================
// Animación "servo": un deslizador cambia el ángulo del servo
// y se muestra la instrucción write() con ese valor.
//
// En la guía:
//   :::animacion tipo="servo" variable="pinza" min="30" max="90"
//   :::
// Opciones (todas opcionales):
//   variable  nombre del servo en el código   (por defecto "miServo")
//   min, max  ángulos permitidos              (por defecto 0 y 180)
//   inicial   ángulo al empezar               (por defecto 90)
// ============================================================
import { crearServoSVG } from './comun/servo-svg.js';
import { numero, limitar } from './comun/svg.js';

export default function montar(contenedor, config) {
  const minimo = limitar(numero(config.min, 0), 0, 180);
  const maximo = limitar(numero(config.max, 180), minimo, 180);
  const inicial = limitar(numero(config.inicial, 90), minimo, maximo);
  const variable = /^[A-Za-z_]\w*$/.test(config.variable || '') ? config.variable : 'miServo';
  const idDeslizador = `servo-${Math.random().toString(36).slice(2, 8)}`;

  const servo = crearServoSVG({ minimo, maximo, inicial });

  // Instrucción de Arduino que cambia con el deslizador
  const valorCodigo = document.createElement('span');
  valorCodigo.className = 'anim-valor';
  const codigo = document.createElement('div');
  codigo.className = 'anim-codigo';
  codigo.append(`${variable}.write(`, valorCodigo, ');');

  // Deslizador
  const etiqueta = document.createElement('label');
  etiqueta.className = 'anim-etiqueta';
  etiqueta.htmlFor = idDeslizador;
  etiqueta.textContent = 'Ángulo del servo';

  const deslizador = document.createElement('input');
  Object.assign(deslizador, { type: 'range', id: idDeslizador, min: minimo, max: maximo, step: 1, value: inicial });
  deslizador.className = 'anim-deslizador';

  // Botones rápidos 0° · 45° · 90° · 135° · 180° (solo los que caben en el rango)
  const rapidos = document.createElement('div');
  rapidos.className = 'anim-rapidos';
  const valoresRapidos = [...new Set([minimo, 0, 45, 90, 135, 180, maximo])]
    .filter((v) => v >= minimo && v <= maximo).sort((a, b) => a - b);
  for (const v of valoresRapidos) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'anim-boton';
    boton.textContent = `${v}°`;
    boton.addEventListener('click', () => cambiar(v));
    rapidos.append(boton);
  }

  function cambiar(grados) {
    deslizador.value = grados;
    valorCodigo.textContent = grados;
    deslizador.setAttribute('aria-valuetext', `${grados} grados`);
    servo.ponerAngulo(grados);
  }

  deslizador.addEventListener('input', () => cambiar(Number(deslizador.value)));

  const dibujo = document.createElement('div');
  dibujo.className = 'anim-dibujo';
  dibujo.append(servo.elemento);

  const controles = document.createElement('div');
  controles.className = 'anim-controles';
  controles.append(codigo, etiqueta, deslizador, rapidos);

  const envoltura = document.createElement('div');
  envoltura.className = 'anim-servo';
  envoltura.append(dibujo, controles);
  contenedor.append(envoltura);

  cambiar(inicial);
}

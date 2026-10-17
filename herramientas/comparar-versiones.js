// Uso: node herramientas/comparar-versiones.js "<carpeta de la plataforma>" <proyecto> <versión> <números de guía…>
// Ejemplo: node herramientas/comparar-versiones.js "$(pwd)" dispensador-comida tinkercad 1 2 3 13
// Debe decir "✔ mismos campos, tablas y casillas" en cada guía: así un equipo puede cambiar de versión sin perder respuestas.
// Compara la guía normal con su versión (guia-NN.VERSION.md): mismos campos de respuesta, mismas tablas
// editables (casillas vacías) y misma cantidad de casillas en los checklists.
const fs = require('fs');
const path = require('path');
const [raiz, proyecto, version, ...numeros] = process.argv.slice(2);
const { procesarGuia } = require(path.join(raiz, 'servidor/markdown.js'));
const opciones = (n) => ({ numero: n, buscarImagen: () => null, buscarArchivo: () => ({ url: '', tamano: 1 }) });

function resumen(texto, n) {
  const g = procesarGuia(texto, opciones(n));
  const html = g.partes.map((p) => p.html).join('\n');
  const tablas = {};
  for (const m of html.matchAll(/<div class="tabla-contenedor tabla-editable" data-campo="([^"]+)">([\s\S]*?)<\/table>/g)) {
    tablas[m[1]] = [...m[2].matchAll(/data-celda="([^"]+)"/g)].map((c) => c[1]).join(',');
  }
  const casillas = {};
  for (const m of html.matchAll(/<ul class="checklist[^"]*" data-campo="([^"]+)">([\s\S]*?)<\/ul>/g)) {
    casillas[m[1]] = (m[2].match(/data-item=/g) || []).length;
  }
  return { campos: g.campos, tablas, casillas, imagenes: (texto.match(/\[IMAGEN/g) || []).length };
}

let problemas = 0;
for (const n of numeros.map(Number)) {
  const nn = String(n).padStart(2, '0');
  const dir = path.join(raiz, 'contenido', proyecto);
  const a = resumen(fs.readFileSync(path.join(dir, `guia-${nn}.md`), 'utf8'), n);
  const b = resumen(fs.readFileSync(path.join(dir, `guia-${nn}.${version}.md`), 'utf8'), n);
  const errores = [];
  const ids = new Set([...Object.keys(a.campos), ...Object.keys(b.campos)]);
  for (const id of ids) if (a.campos[id] !== b.campos[id]) errores.push(`campo ${id}: ${a.campos[id] || '(no está)'} → ${b.campos[id] || '(no está)'}`);
  for (const id of new Set([...Object.keys(a.tablas), ...Object.keys(b.tablas)])) {
    if (a.tablas[id] !== b.tablas[id]) errores.push(`tabla ${id}: casillas distintas`);
  }
  for (const id of new Set([...Object.keys(a.casillas), ...Object.keys(b.casillas)])) {
    if (a.casillas[id] !== b.casillas[id]) errores.push(`checklist ${id}: ${a.casillas[id]} → ${b.casillas[id]} casillas`);
  }
  console.log(`Guía ${n}: ${Object.keys(b.campos).length} campos · imágenes ${a.imagenes} → ${b.imagenes}` + (errores.length ? `\n  ✖ ${errores.join('\n  ✖ ')}` : ' · ✔ mismos campos, tablas y casillas'));
  problemas += errores.length;
}
process.exitCode = problemas ? 1 : 0;

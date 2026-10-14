// Compara cada guía revisada con la original: lo que guarda respuestas, el código y las animaciones no debe cambiar
// Uso: node verificar.js <raiz> [proyecto]
const fs = require('fs');
const path = require('path');
const raiz = process.argv[2];
const soloProyecto = process.argv[3];
const { procesarGuia } = require(path.join(raiz, 'servidor/markdown.js'));
const ORIG = path.join(raiz, 'respaldos/guias-antes-de-la-revision-2026-10-10');
const huella = (texto, n) => {
  const r = procesarGuia(texto, { numero: n, buscarImagen: () => null, buscarArchivo: () => ({ url: '', tamano: 1 }) });
  const html = r.partes.map((p) => p.html).join('\n');
  const celdas = {};
  for (const m of html.matchAll(/data-campo="([^"]+)"[\s\S]*?<\/table>/g)) celdas[m[1]] = [...m[0].matchAll(/data-celda="([^"]+)"/g)].map((x) => x[1]).join(',');
  const tablas = {}; const listas = {};
  for (const [id, e] of Object.entries(r.etiquetas)) {
    if (e.encabezados) tablas[id] = `${e.encabezados.length}x${e.filas.length}|${celdas[id] || ''}`;
    if (e.items) listas[id] = e.items.length;
  }
  return {
    datos: JSON.stringify(r.datos),
    partes: r.partes.map((p) => `${p.titulo}|${p.tiempo}`).join(' / '),
    campos: Object.entries(r.campos).map(([k, v]) => `${k}:${v}`).join(' '),
    opciones: JSON.stringify(r.opciones),
    tablas: JSON.stringify(tablas),
    listas: JSON.stringify(listas),
    finales: JSON.stringify(r.checklistsFinales),
    codigo: [...html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g)].map((m) => m[1]).join('\n----\n'),
    animaciones: [...html.matchAll(/data-tipo="([^"]+)" data-config="([^"]*)"/g)].map((m) => `${m[1]} ${m[2]}`).join('\n'),
    especiales: [...html.matchAll(/data-(?:foto|archivo)="[^"]+"|class="descarga"|Falta el archivo/g)].map((m) => m[0]).join(' '),
  };
};
// Cambios hechos a propósito (se agregan campos nuevos; los existentes no cambian)
// Cambios aprobados. Estación G2: el título de la Parte 5 decía 'Matriz' (en Blender 5.2 se llama 'Repetir');
// los títulos de las partes solo se muestran, no guardan respuestas.
const EXCEPCIONES = { 'mini-invernadero/guia-12.md': ['campos'], 'banda-clasificadora/guia-07.md': ['campos'], 'estacion-meteorologica/guia-02.md': ['partes'] };
let revisadas = 0; let cambiadas = 0; const problemas = [];
for (const p of fs.readdirSync(ORIG).filter((d) => fs.statSync(path.join(ORIG, d)).isDirectory())) {
  if (soloProyecto && p !== soloProyecto) continue;
  for (const g of fs.readdirSync(path.join(ORIG, p))) {
    const n = parseInt(g.match(/\d+/)[0], 10);
    const viejo = fs.readFileSync(path.join(ORIG, p, g), 'utf8');
    const nuevo = fs.readFileSync(path.join(raiz, 'contenido', p, g), 'utf8');
    revisadas++;
    if (viejo !== nuevo) cambiadas++;
    const a = huella(viejo, n); const b = huella(nuevo, n);
    for (const k of Object.keys(a)) if (a[k] !== b[k] && !(EXCEPCIONES[p + '/' + g] || []).includes(k)) problemas.push(`${p}/${g} → cambió "${k}"\n   antes:   ${a[k].slice(0, 400)}\n   después: ${b[k].slice(0, 400)}`);
    if (/\[\s*IMAGEN/.test(nuevo) && (nuevo.match(/\[IMAGEN/g) || []).length !== (viejo.match(/\[IMAGEN/g) || []).length) problemas.push(`${p}/${g} → cambió la cantidad de [IMAGEN]`);
  }
}
console.log(`revisadas ${revisadas}, con cambios ${cambiadas}`);
console.log(problemas.length ? problemas.join('\n') : 'OK: respuestas, código y animaciones intactos');

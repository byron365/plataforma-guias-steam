// ============================================================
// Copias de seguridad de la base de datos (carpeta respaldos/)
// ------------------------------------------------------------
// - Una automática por día: al arrancar y luego cada hora se revisa
//   si ya existe la de hoy (plataforma-AAAA-MM-DD.db).
// - El docente puede hacer una manual desde el panel.
// - Se guardan las 30 más recientes; las más viejas se borran solas.
// Para restaurar: apagar el servidor y copiar el respaldo como datos/plataforma.db
//
// Archivos subidos (fotos, videos y archivos de trabajo del equipo):
// respaldos/subidas/ es un ESPEJO de la carpeta subidas/. En cada respaldo se copian
// solo los archivos nuevos (un archivo subido nunca cambia: cada versión es un archivo
// aparte), así no se repiten copias de 100 MB cada día.
// Si un archivo se borró de subidas/ (por ejemplo, una versión vieja o una foto
// borrada), su copia pasa a respaldos/subidas-borradas/<fecha>/ y se borra a los 30 días.
// Para restaurar: copiar el contenido de respaldos/subidas/ dentro de subidas/.
// ============================================================
const fs = require('fs');
const path = require('path');
const db = require('./db');
const { RUTAS } = require('./config');

const MAXIMO = 30;
const DIAS_BORRADAS = 30;
const dosDigitos = (n) => String(n).padStart(2, '0');

function fechaLocal(d = new Date()) {
  return `${d.getFullYear()}-${dosDigitos(d.getMonth() + 1)}-${dosDigitos(d.getDate())}`;
}

function listarRespaldos() {
  if (!fs.existsSync(RUTAS.respaldos)) return [];
  return fs.readdirSync(RUTAS.respaldos)
    .filter((n) => /^plataforma-.*\.db$/.test(n))
    .map((nombre) => {
      const info = fs.statSync(path.join(RUTAS.respaldos, nombre));
      return { nombre, tamano: info.size, fecha: info.mtime };
    })
    .sort((a, b) => b.fecha - a.fecha);
}

// Borra los respaldos más viejos si hay más de MAXIMO
function limpiarViejos() {
  for (const viejo of listarRespaldos().slice(MAXIMO)) {
    fs.rmSync(path.join(RUTAS.respaldos, viejo.nombre), { force: true });
  }
}

// Hace un respaldo. "manual" agrega la hora al nombre para no pisar el del día.
async function respaldar({ manual = false } = {}) {
  fs.mkdirSync(RUTAS.respaldos, { recursive: true });
  const ahora = new Date();
  const nombre = manual
    ? `plataforma-${fechaLocal(ahora)}_${dosDigitos(ahora.getHours())}-${dosDigitos(ahora.getMinutes())}-${dosDigitos(ahora.getSeconds())}-manual.db`
    : `plataforma-${fechaLocal(ahora)}.db`;
  const destino = path.join(RUTAS.respaldos, nombre);
  if (!manual && fs.existsSync(destino)) return null; // ya está el de hoy
  await db.backup(destino); // copia segura aunque la base esté en uso
  limpiarViejos();
  await respaldarSubidas();
  return nombre;
}

// Lista los archivos de una carpeta (con subcarpetas) como rutas relativas
async function listarArchivos(raiz) {
  const lista = [];
  const recorrer = async (carpeta) => {
    let entradas;
    try { entradas = await fs.promises.readdir(carpeta, { withFileTypes: true }); } catch { return; }
    for (const e of entradas) {
      const ruta = path.join(carpeta, e.name);
      if (e.isDirectory()) await recorrer(ruta);
      else if (e.isFile()) lista.push(path.relative(raiz, ruta));
    }
  };
  await recorrer(raiz);
  return lista;
}

// Copia a respaldos/subidas/ lo nuevo de subidas/ (ver explicación arriba)
async function respaldarSubidas() {
  const espejo = path.join(RUTAS.respaldos, 'subidas');
  const borradas = path.join(RUTAS.respaldos, 'subidas-borradas');
  const origen = await listarArchivos(RUTAS.subidas);
  const enOrigen = new Set(origen);
  let copiados = 0;

  for (const relativa of origen) {
    const desde = path.join(RUTAS.subidas, relativa);
    const hacia = path.join(espejo, relativa);
    try {
      const [a, b] = await Promise.all([fs.promises.stat(desde), fs.promises.stat(hacia).catch(() => null)]);
      if (b && b.size === a.size) continue; // ya estaba copiado
      await fs.promises.mkdir(path.dirname(hacia), { recursive: true });
      await fs.promises.copyFile(desde, hacia);
      copiados++;
    } catch (error) {
      console.error(`✖  No se pudo respaldar subidas/${relativa}:`, error.message);
    }
  }

  // Lo que ya no está en subidas/ se aparta (no se borra de inmediato)
  let apartados = 0;
  const hoy = fechaLocal();
  for (const relativa of await listarArchivos(espejo)) {
    if (enOrigen.has(relativa)) continue;
    const hacia = path.join(borradas, hoy, relativa);
    try {
      await fs.promises.mkdir(path.dirname(hacia), { recursive: true });
      await fs.promises.rename(path.join(espejo, relativa), hacia);
      apartados++;
    } catch (error) {
      console.error(`✖  No se pudo apartar respaldos/subidas/${relativa}:`, error.message);
    }
  }

  // Las carpetas de borradas con más de DIAS_BORRADAS días se eliminan
  const limite = fechaLocal(new Date(Date.now() - DIAS_BORRADAS * 24 * 60 * 60 * 1000));
  try {
    for (const carpeta of await fs.promises.readdir(borradas)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(carpeta) && carpeta < limite) {
        await fs.promises.rm(path.join(borradas, carpeta), { recursive: true, force: true });
      }
    }
  } catch { /* todavía no hay borradas */ }

  if (copiados || apartados) console.log(`💾 Archivos subidos respaldados: ${copiados} nuevos${apartados ? `, ${apartados} apartados en subidas-borradas` : ''}`);
  return { copiados, apartados };
}

async function respaldoDiario() {
  try {
    const nombre = await respaldar();
    if (nombre) console.log(`💾 Respaldo del día guardado: respaldos/${nombre}`);
    // La base ya tenía su respaldo de hoy: igual se copian los archivos subidos en la última hora
    else await respaldarSubidas();
  } catch (error) {
    console.error('✖  No se pudo hacer el respaldo:', error.message);
  }
}

function iniciarRespaldosAutomaticos() {
  respaldoDiario();
  setInterval(respaldoDiario, 60 * 60 * 1000).unref(); // revisa cada hora
}

module.exports = { respaldar, respaldarSubidas, listarRespaldos, iniciarRespaldosAutomaticos };

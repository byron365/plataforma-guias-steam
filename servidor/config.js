// ============================================================
// Configuración general: rutas de carpetas y lectura del .env
// ============================================================
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');

const RUTAS = {
  raiz: RAIZ,
  publico: path.join(RAIZ, 'publico'),
  contenido: path.join(RAIZ, 'contenido'),
  // DATOS_DIR, RESPALDOS_DIR y SUBIDAS_DIR permiten usar otras carpetas (por ejemplo, para pruebas)
  datos: path.resolve(process.env.DATOS_DIR || path.join(RAIZ, 'datos')),
  respaldos: path.resolve(process.env.RESPALDOS_DIR || path.join(RAIZ, 'respaldos')),
  subidas: path.resolve(process.env.SUBIDAS_DIR || path.join(RAIZ, 'subidas')),
};

// Lee el archivo .env (líneas CLAVE=valor) y lo pasa a process.env.
// Si no existe, lo crea a partir de .env.ejemplo para que el docente lo edite.
function cargarEnv() {
  const archivo = path.join(RAIZ, '.env');
  const ejemplo = path.join(RAIZ, '.env.ejemplo');

  if (!fs.existsSync(archivo) && fs.existsSync(ejemplo)) {
    fs.copyFileSync(ejemplo, archivo);
    console.log('⚠  No había archivo .env: se creó uno a partir de .env.ejemplo.');
    console.log('   Abre .env y cambia la contraseña del docente.\n');
  }
  if (!fs.existsSync(archivo)) return;

  for (const linea of fs.readFileSync(archivo, 'utf8').split(/\r?\n/)) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith('#')) continue;
    const igual = limpia.indexOf('=');
    if (igual === -1) continue;
    const clave = limpia.slice(0, igual).trim();
    let valor = limpia.slice(igual + 1).trim();
    // Quita comillas si el valor las tiene: CLAVE="valor"
    if (/^(['"]).*\1$/.test(valor)) valor = valor.slice(1, -1);
    if (!(clave in process.env)) process.env[clave] = valor;
  }
}

cargarEnv();

module.exports = {
  RUTAS,
  PUERTO: parseInt(process.env.PUERTO, 10) || 3000,
  CLAVE_DOCENTE: process.env.DOCENTE_CLAVE || '',
};

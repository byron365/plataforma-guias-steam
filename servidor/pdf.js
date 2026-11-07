// ============================================================
// Guías en PDF para repasar en casa.
// Arma una página con la guía en blanco (sin respuestas del equipo y sin
// notas del docente) y la imprime a PDF con Microsoft Edge o Google Chrome
// sin abrir ventanas. No hace falta instalar nada: Edge viene con Windows.
//
// La página lleva todo adentro (estilos, fuentes e imágenes), así que no
// necesita internet ni la sesión del equipo. Cada PDF se guarda en la carpeta
// temporal de Windows y se vuelve a usar mientras la guía no cambie.
// ============================================================
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');
const { RUTAS } = require('./config');
const { carpetaProyecto } = require('./contenido');

// Si cambia la forma de armar el PDF, subir este número para no usar PDFs viejos
const VERSION_PDF = 1;
const CARPETA_PDF = path.join(os.tmpdir(), 'plataforma-guias-pdf');
const ESPERA_MAXIMA = 90 * 1000; // la primera vez Edge tarda más en arrancar

const TIPOS_IMAGEN = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
};

// ------------------------------------------------------------
// Navegador que imprime el PDF
// ------------------------------------------------------------
function buscarNavegador() {
  const candidatos = [
    process.env.NAVEGADOR_PDF, // ruta propia en el .env, si hace falta
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env.ProgramFiles || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env.ProgramFiles || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  ];
  return candidatos.find((ruta) => ruta && fs.existsSync(ruta)) || null;
}

// ------------------------------------------------------------
// Partes de la página
// ------------------------------------------------------------
const desescapar = (texto) => texto
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

const escapar = (texto) => String(texto)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function comoDatos(archivo) {
  const tipo = TIPOS_IMAGEN[path.extname(archivo).toLowerCase()];
  if (!tipo || !fs.existsSync(archivo)) return null;
  return `data:${tipo};base64,${fs.readFileSync(archivo).toString('base64')}`;
}

// Estilos de la plataforma + los de impresión, con las fuentes adentro
let estilosGuardados = null;
function estilos() {
  if (estilosGuardados) return estilosGuardados;
  const leer = (nombre) => fs.readFileSync(path.join(RUTAS.publico, 'css', nombre), 'utf8');
  estilosGuardados = `${leer('estilos.css')}\n${leer('imprimir.css')}`
    .replace(/url\((['"]?)\/([^'")]+)\1\)/g, (completo, comilla, ruta) => {
      const datos = comoDatos(path.join(RUTAS.publico, ruta));
      return datos ? `url('${datos}')` : completo;
    });
  return estilosGuardados;
}

// El resaltado del código es el mismo de la plataforma (publico/js/resaltado.js)
let resaltar = null;
async function cargarResaltado() {
  if (resaltar) return resaltar;
  const codigo = fs.readFileSync(path.join(RUTAS.publico, 'js', 'resaltado.js'), 'utf8');
  const modulo = await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(codigo)}`);
  resaltar = modulo.resaltarArduino;
  return resaltar;
}

// Cambia lo que solo funciona en la plataforma por algo que sirva en papel
function adaptarHtml(html, proyectoId, numero) {
  const carpeta = carpetaProyecto(proyectoId);
  return html
    // Imágenes: se meten dentro del PDF
    .replace(/src="\/imagenes\/([^/"]+)\/([^"]+)"/g, (completo, proyecto, archivo) => {
      if (proyecto !== proyectoId || !carpeta) return completo;
      const datos = comoDatos(path.join(carpeta, 'imagenes', path.basename(decodeURIComponent(archivo))));
      return datos ? `src="${datos}"` : completo;
    })
    .replace(/ loading="lazy"/g, '')
    // Animaciones: solo se ven en la plataforma
    .replace(/<div class="animacion" data-tipo="[^"]*" data-config="[^"]*"><div class="animacion-cargando">[^<]*<\/div><\/div>/g,
      `<div class="pdf-aviso"><span aria-hidden="true">🎞️</span> Aquí hay una animación interactiva. Ábranla en la plataforma, en la Guía ${numero}.</div>`)
    // Botones de descarga: el archivo se baja desde la plataforma
    .replace(/<a class="boton boton-descarga" href="[^"]*" download="([^"]*)">[^<]*<\/a>/g,
      '<span class="pdf-aviso-chico">⬇ $1 · se descarga desde la plataforma</span>')
    // Cuadros de respuesta vacíos, sin el texto gris de ejemplo
    .replace(/ placeholder="[^"]*"/g, '');
}

async function resaltarCodigo(html) {
  const resaltarArduino = await cargarResaltado();
  return html.replace(/<code data-lenguaje="(arduino|ino|cpp|c|c\+\+)">([\s\S]*?)<\/code>/g,
    (_, lenguaje, codigo) => `<code data-lenguaje="${lenguaje}">${resaltarArduino(desescapar(codigo))}</code>`);
}

// Página completa de una guía en blanco
async function paginaDeGuia({ proyecto, guia, nombreVersion }) {
  const datosGuia = [`Guía ${guia.numero}`, guia.sabado ? `Sábado ${guia.sabado}` : '', guia.sesion || '']
    .filter(Boolean).join(' · ');
  const partes = [];
  for (const parte of guia.partes) {
    const html = await resaltarCodigo(adaptarHtml(parte.html, proyecto.id, guia.numero));
    partes.push(`<section class="pdf-parte">` +
      `<h2>${escapar(parte.titulo)}${parte.tiempo ? ` <span class="tiempo">⏱ ${parte.tiempo} min</span>` : ''}</h2>` +
      `<div class="contenido-guia">${html}</div></section>`);
  }
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Guía ${guia.numero} · ${escapar(guia.titulo)}</title>
<style>${estilos()}</style>
</head>
<body class="pdf">
<header class="pdf-portada">
  <p class="pdf-proyecto">${escapar(proyecto.nombre)}${nombreVersion ? ` · ${escapar(nombreVersion)}` : ''} · STEAM Robotics Academy</p>
  <p class="portada-guia-datos">${escapar(datosGuia)}</p>
  <h1>${escapar(guia.titulo)}</h1>
  <p class="pdf-nota">Copia para repasar en casa. Las respuestas, fotos y archivos del equipo se guardan en la plataforma.</p>
</header>
${partes.join('\n')}
</body>
</html>`;
}

// ------------------------------------------------------------
// Imprimir a PDF (de a uno: si muchos piden a la vez, esperan su turno)
// ------------------------------------------------------------
let cola = Promise.resolve();
const enCurso = new Map(); // huella → promesa del mismo PDF que ya se está haciendo

function imprimir(navegador, archivoHtml, archivoPdf) {
  const perfil = path.join(CARPETA_PDF, 'perfil-navegador'); // aparte del Edge que usa el docente
  const argumentos = [
    '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    '--hide-scrollbars', `--user-data-dir=${perfil}`,
    '--no-pdf-header-footer', '--print-to-pdf-no-header', // sin fecha ni dirección en las orillas
    `--print-to-pdf=${archivoPdf}`,
    `file:///${archivoHtml.replace(/\\/g, '/')}`,
  ];
  return new Promise((resolver, rechazar) => {
    execFile(navegador, argumentos, { timeout: ESPERA_MAXIMA, windowsHide: true }, (error) => {
      if (fs.existsSync(archivoPdf) && fs.statSync(archivoPdf).size > 0) return resolver();
      rechazar(error || new Error('El navegador no creó el PDF.'));
    });
  });
}

// Devuelve la ruta del PDF de la guía (lo crea si no existe o si la guía cambió)
async function pdfDeGuia(datos) {
  const navegador = buscarNavegador();
  if (!navegador) {
    const error = new Error('No se encontró Microsoft Edge ni Google Chrome para crear el PDF.');
    error.sinNavegador = true;
    throw error;
  }
  const html = await paginaDeGuia(datos);
  const huella = crypto.createHash('sha1').update(`${VERSION_PDF}\n${html}`).digest('hex').slice(0, 20);
  const archivoPdf = path.join(CARPETA_PDF, `${huella}.pdf`);
  if (fs.existsSync(archivoPdf)) return archivoPdf;
  if (enCurso.has(huella)) return enCurso.get(huella);

  const trabajo = cola.then(async () => {
    fs.mkdirSync(CARPETA_PDF, { recursive: true });
    const archivoHtml = path.join(CARPETA_PDF, `${huella}.html`);
    const temporal = path.join(CARPETA_PDF, `${huella}.tmp.pdf`);
    fs.writeFileSync(archivoHtml, html);
    try {
      await imprimir(navegador, archivoHtml, temporal);
      fs.renameSync(temporal, archivoPdf); // así nunca se entrega un PDF a medio escribir
      return archivoPdf;
    } finally {
      fs.rmSync(archivoHtml, { force: true });
      fs.rmSync(temporal, { force: true });
    }
  });
  cola = trabajo.catch(() => {});
  enCurso.set(huella, trabajo);
  try { return await trabajo; } finally { enCurso.delete(huella); }
}

module.exports = { pdfDeGuia, paginaDeGuia, buscarNavegador };

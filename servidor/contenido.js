// ============================================================
// Contenido: lee los proyectos y guías de la carpeta contenido/
// ------------------------------------------------------------
// contenido/<proyecto>/proyecto.json   datos del proyecto
// contenido/<proyecto>/guia-01.md ...  una guía por archivo
// contenido/<proyecto>/imagenes/       imágenes (IMAGEN_1.3.png, portada.jpg...)
//
// Los archivos se vuelven a leer solos cuando cambian: no hace falta
// reiniciar el servidor después de editar una guía.
// ============================================================
const fs = require('fs');
const path = require('path');
const { RUTAS } = require('./config');
const { procesarGuia } = require('./markdown');

const ID_VALIDO = /^[a-z0-9-]+$/;
const ID_VERSION = /^[a-z0-9-]+$/; // nombre de una versión de guías (en el archivo: guia-02.ID.md)
const EXTENSIONES_IMAGEN = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
// Archivos que los estudiantes pueden descargar desde una guía (carpeta archivos/ del proyecto)
const EXTENSIONES_ARCHIVO = ['.blend', '.stl', '.obj', '.ino', '.pdf', '.zip', '.txt', '.csv', '.png', '.jpg', '.jpeg'];

function carpetaProyecto(id) {
  if (!ID_VALIDO.test(id)) return null;
  return path.join(RUTAS.contenido, id);
}

function fechaModificacion(ruta) {
  try { return fs.statSync(ruta).mtimeMs; } catch { return 0; }
}

// Título de la guía si proyecto.json no lo trae: "titulo:" del encabezado --- o el primer "# ..."
function tituloDesdeArchivo(ruta) {
  try {
    const texto = fs.readFileSync(ruta, 'utf8');
    const delEncabezado = texto.match(/^---\r?\n[\s\S]*?^titulo\s*:\s*(.+?)\s*$/m);
    if (delEncabezado) return delEncabezado[1];
    const m = texto.match(/^#\s+(.+)$/m);
    return m ? m[1].trim() : null;
  } catch { return null; }
}

// Lista de proyectos (lee todos los proyecto.json)
function listarProyectos() {
  if (!fs.existsSync(RUTAS.contenido)) return [];
  return fs.readdirSync(RUTAS.contenido, { withFileTypes: true })
    .filter((d) => d.isDirectory() && ID_VALIDO.test(d.name))
    .map((d) => obtenerProyecto(d.name))
    .filter(Boolean)
    .sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99) || a.nombre.localeCompare(b.nombre, 'es'));
}

function obtenerProyecto(id) {
  const carpeta = carpetaProyecto(id);
  if (!carpeta) return null;
  const archivo = path.join(carpeta, 'proyecto.json');
  if (!fs.existsSync(archivo)) return null;

  let datos;
  try {
    datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
  } catch (error) {
    console.error(`✖  No se pudo leer ${archivo}: ${error.message}`);
    return null;
  }

  // Versiones de las guías (por ejemplo Blender y Tinkercad). La primera es la normal.
  // "base" (opcional): versión que se usa en las guías que no tienen archivo propio
  // (por ejemplo "doble" se basa en "tinkercad").
  const versiones = (Array.isArray(datos.versiones) ? datos.versiones : [])
    .filter((v) => v && ID_VERSION.test(String(v.id)))
    .map((v) => ({
      id: String(v.id),
      nombre: String(v.nombre || v.id),
      base: v.base && ID_VERSION.test(String(v.base)) ? String(v.base) : '',
    }));

  const guias = (datos.guias || []).map((g, i) => {
    const numero = Number(g.numero) || Number(g.guia) || i + 1;
    const nombreArchivo = g.archivo || `guia-${String(numero).padStart(2, '0')}.md`;
    const ruta = path.join(carpeta, path.basename(nombreArchivo));
    const existe = fs.existsSync(ruta);
    return {
      numero,
      archivo: path.basename(nombreArchivo),
      // Versiones que tienen su propio archivo (guia-02.tinkercad.md); las demás usan el normal
      versiones: versiones.filter((v) => fs.existsSync(rutaDeVersion(ruta, v.id))).map((v) => v.id),
      titulo: g.titulo || (existe && tituloDesdeArchivo(ruta)) || `Guía ${numero}`,
      sabado: Number(g.sabado) || null,
      sesion: g.sesion || '',
      existe,
    };
  });

  const imagen = datos.imagen ? buscarArchivoImagen(id, datos.imagen) : null;
  return {
    id,
    nombre: datos.nombre || id,
    nivel: datos.nivel || '',
    descripcion: datos.descripcion || '',
    color: datos.color || '#0284C7',
    orden: datos.orden,
    // Cada parte de la guía se muestra paso por paso; "pasoAPaso": false en proyecto.json lo apaga
    pasoAPaso: datos.pasoAPaso !== false,
    versiones,
    imagen: imagen ? `/imagenes/${id}/${encodeURIComponent(imagen)}` : null,
    guias,
  };
}

// ¿Existe este archivo en imagenes/? Devuelve el nombre real del archivo o null
function buscarArchivoImagen(proyectoId, nombre) {
  const carpeta = carpetaProyecto(proyectoId);
  if (!carpeta) return null;
  const ruta = path.join(carpeta, 'imagenes', path.basename(nombre));
  return fs.existsSync(ruta) ? path.basename(nombre) : null;
}

// Busca IMAGEN_4.3.png / IMAGEN 4.3.jpg / imagen_4.3.webp...
function buscarImagenPorCodigo(proyectoId, codigo) {
  const carpeta = path.join(carpetaProyecto(proyectoId), 'imagenes');
  if (!fs.existsSync(carpeta)) return null;
  const buscado = `IMAGEN_${codigo}`.toUpperCase();
  const archivo = fs.readdirSync(carpeta).find((nombre) => {
    const ext = path.extname(nombre).toLowerCase();
    if (!EXTENSIONES_IMAGEN.includes(ext)) return false;
    const base = nombre.slice(0, -ext.length).replace(/[\s_-]+/g, '_').toUpperCase();
    return base === buscado;
  });
  return archivo ? `/imagenes/${proyectoId}/${encodeURIComponent(archivo)}` : null;
}

// Archivo para descargar en archivos/: { url, tamano } o null si no existe
function buscarArchivoDescarga(proyectoId, nombre) {
  const carpeta = carpetaProyecto(proyectoId);
  if (!carpeta) return null;
  const limpio = path.basename(String(nombre || ''));
  if (!EXTENSIONES_ARCHIVO.includes(path.extname(limpio).toLowerCase())) return null;
  const ruta = path.join(carpeta, 'archivos', limpio);
  if (!fs.existsSync(ruta)) return null;
  return { url: `/archivos/${proyectoId}/${encodeURIComponent(limpio)}`, tamano: fs.statSync(ruta).size };
}

// Guías ya procesadas, para no leerlas en cada visita
const cache = new Map();

// "guia-02.md" + "tinkercad" → "guia-02.tinkercad.md"
function rutaDeVersion(ruta, version) {
  return ruta.replace(/\.md$/i, `.${version}.md`);
}

// version: la que usa el equipo ("" o la primera = la normal). Si la guía no tiene archivo de esa versión,
// se usa el de su versión base (si tiene) y, si tampoco existe, el normal.
function obtenerGuia(proyectoId, numero, version = '') {
  const proyecto = obtenerProyecto(proyectoId);
  if (!proyecto) return null;
  const info = proyecto.guias.find((g) => g.numero === numero);
  if (!info || !info.existe) return null;

  const carpeta = carpetaProyecto(proyectoId);
  const datosVersion = proyecto.versiones.find((v) => v.id === version);
  const usada = [version, datosVersion && datosVersion.base].find((v) => v && info.versiones.includes(v)) || '';
  const usaVersion = Boolean(usada);
  const ruta = usaVersion ? rutaDeVersion(path.join(carpeta, info.archivo), usada) : path.join(carpeta, info.archivo);
  // Si cambia la guía o se agrega una imagen, se vuelve a procesar
  const firma = `${fechaModificacion(ruta)}-${fechaModificacion(path.join(carpeta, 'imagenes'))}-${fechaModificacion(path.join(carpeta, 'archivos'))}`;
  const clave = `${proyectoId}/${numero}/${usada}`;
  const guardada = cache.get(clave);
  if (guardada && guardada.firma === firma) return guardada.guia;

  const guia = procesarGuia(fs.readFileSync(ruta, 'utf8'), {
    numero,
    buscarImagen: (codigo) => buscarImagenPorCodigo(proyectoId, codigo),
    buscarArchivo: (nombre) => buscarArchivoDescarga(proyectoId, nombre),
  });
  guia.numero = numero;
  guia.titulo = info.titulo !== `Guía ${numero}` ? info.titulo : guia.titulo;
  // Una versión puede traer su propio título en el encabezado (ej. "Del papel a Tinkercad")
  if (usaVersion && guia.datos.titulo) guia.titulo = guia.datos.titulo;
  guia.sabado = info.sabado || guia.datos.sabado || null;
  guia.sesion = info.sesion || guia.datos.sesion || '';
  guia.version = usada;
  cache.set(clave, { firma, guia });
  return guia;
}

// Crea la carpeta de un proyecto nuevo con su proyecto.json y la carpeta imagenes/.
// Las guías (.md) las agrega el docente después. Devuelve el id del proyecto.
function crearProyecto({ nombre, nivel, descripcion, totalGuias }) {
  const id = String(nombre).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
  if (!id) throw new Error('El nombre del proyecto no es válido.');
  const carpeta = path.join(RUTAS.contenido, id);
  if (fs.existsSync(carpeta)) throw new Error(`Ya existe la carpeta contenido/${id}.`);

  const guias = [];
  for (let n = 1; n <= totalGuias; n++) {
    guias.push({ numero: n, archivo: `guia-${String(n).padStart(2, '0')}.md` });
  }
  fs.mkdirSync(path.join(carpeta, 'imagenes'), { recursive: true });
  fs.writeFileSync(path.join(carpeta, 'proyecto.json'), `${JSON.stringify({
    nombre, nivel, descripcion, color: '#0284C7', imagen: 'portada.jpg', guias,
  }, null, 2)}\n`, 'utf8');
  return id;
}

module.exports = { crearProyecto, listarProyectos, obtenerProyecto, obtenerGuia, carpetaProyecto, EXTENSIONES_IMAGEN, EXTENSIONES_ARCHIVO, ID_VALIDO };

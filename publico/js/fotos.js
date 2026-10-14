// ============================================================
// Fotos y videos de la bitácora (bloques :::foto)
//   - Estudiantes: tomar o elegir fotos/videos, ver y borrar los del equipo.
//   - Docente: solo verlos.
// Las fotos se achican en el celular antes de subirlas (máx. 1600 px, JPG),
// así suben rápido por el Wi-Fi del aula y no llenan el disco.
// ============================================================
import { el, api } from './comun.js';

const LADO_MAXIMO = 1600;
const CALIDAD_JPG = 0.85;
const MAX_VIDEO = 80 * 1024 * 1024;

// "2026-10-06 19:36:07" → "06/10 19:36"
const fechaCorta = (t) => { const m = String(t || '').match(/^\d{4}-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/); return m ? `${m[2]}/${m[1]} ${m[3]}:${m[4]}` : ''; };

// Achica una foto con un canvas. Si no se puede leer, avisa.
async function achicarFoto(archivo) {
  if (archivo.type === 'image/gif') return archivo;
  let imagen;
  try {
    imagen = await createImageBitmap(archivo, { imageOrientation: 'from-image' });
  } catch {
    // Respaldo para navegadores viejos: cargar con <img>
    imagen = await new Promise((resolver, rechazar) => {
      const img = new Image();
      img.onload = () => resolver(img);
      img.onerror = () => rechazar(new Error('No se pudo leer la foto. Prueben con otra o tómenla de nuevo.'));
      img.src = URL.createObjectURL(archivo);
    });
  }
  const ancho = imagen.width; const alto = imagen.height;
  const escala = Math.min(1, LADO_MAXIMO / Math.max(ancho, alto));
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.round(ancho * escala);
  lienzo.height = Math.round(alto * escala);
  lienzo.getContext('2d').drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
  if (imagen.close) imagen.close();
  return new Promise((resolver) => lienzo.toBlob((blob) => resolver(blob), 'image/jpeg', CALIDAD_JPG));
}

// Sube un archivo mostrando el porcentaje (fetch no informa el avance de subida).
// También la usan los archivos de trabajo del equipo (archivos-equipo.js).
export function subir(url, blob, alAvanzar, cabeceras = {}) {
  return new Promise((resolver, rechazar) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', blob.type || 'application/octet-stream');
    for (const [clave, valor] of Object.entries(cabeceras)) xhr.setRequestHeader(clave, valor);
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) alAvanzar(Math.round((e.loaded / e.total) * 100)); };
    xhr.onload = () => {
      let datos = null;
      try { datos = JSON.parse(xhr.responseText); } catch { /* sin JSON */ }
      if (xhr.status >= 200 && xhr.status < 300) resolver(datos);
      else rechazar(Object.assign(new Error((datos && datos.error) || 'No se pudo subir el archivo.'), { estado: xhr.status }));
    };
    xhr.onerror = () => rechazar(new Error('Sin conexión con el servidor. Revisen el Wi-Fi.'));
    xhr.send(blob);
  });
}

// Miniatura de una foto o video
function miniatura(foto, { alBorrar } = {}) {
  const url = `/api/fotos/${foto.id}`;
  const esVideo = foto.tipo.startsWith('video/');
  const medio = esVideo
    ? el('video', { src: url, controls: true, preload: 'metadata', playsinline: true })
    : el('a', { href: url, target: '_blank', rel: 'noopener', title: 'Ver en grande' }, el('img', { src: url, alt: 'Foto de la bitácora', loading: 'lazy' }));
  const pie = el('figcaption', {}, [foto.estudiante, fechaCorta(foto.creada)].filter(Boolean).join(' · '));
  const figura = el('figure', { class: `foto-mini${esVideo ? ' es-video' : ''}` }, medio, pie);

  if (alBorrar) {
    // Borrar pide un segundo toque para confirmar (evita borrar por accidente)
    const boton = el('button', { type: 'button', class: 'foto-borrar', 'aria-label': 'Borrar este archivo' }, '×');
    let confirmando = null;
    boton.addEventListener('click', async () => {
      if (!confirmando) {
        boton.textContent = '¿Borrar?';
        boton.classList.add('confirmando');
        confirmando = setTimeout(() => { boton.textContent = '×'; boton.classList.remove('confirmando'); confirmando = null; }, 3000);
        return;
      }
      clearTimeout(confirmando);
      boton.disabled = true;
      try {
        await alBorrar(foto);
        figura.remove();
      } catch (error) {
        boton.disabled = false;
        boton.textContent = '×';
        boton.classList.remove('confirmando');
        confirmando = null;
        pie.textContent = error.message; // caso raro: sin conexión
        pie.classList.add('error');
      }
    });
    figura.append(boton);
  }
  return figura;
}

// Estudiantes: galería editable de cada bloque :::foto
export function montarFotosEditables(raiz, { fotos = {}, numeroGuia, alSubir }) {
  raiz.querySelectorAll('.foto-bitacora[data-foto]').forEach((bloque) => {
    const campo = bloque.dataset.foto;
    const galeria = bloque.querySelector('.foto-galeria');
    const estado = el('p', { class: 'foto-estado', 'aria-live': 'polite' });
    const borrar = async (foto) => { await api(`/api/fotos/${foto.id}`, { method: 'DELETE' }); };

    (fotos[campo] || []).forEach((f) => galeria.append(miniatura(f, { alBorrar: borrar })));

    const entrada = el('input', { type: 'file', accept: 'image/*,video/*', multiple: true, class: 'solo-lector', id: `subir-${campo}` });
    const boton = el('label', { class: 'boton boton-chico foto-agregar', for: `subir-${campo}` }, '📷 Agregar foto o video');

    entrada.addEventListener('change', async () => {
      const archivos = [...entrada.files];
      entrada.value = '';
      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];
        const prefijo = archivos.length > 1 ? `(${i + 1} de ${archivos.length}) ` : '';
        estado.className = 'foto-estado';
        try {
          let blob = archivo;
          if (archivo.type.startsWith('image/')) {
            estado.textContent = `${prefijo}Preparando la foto…`;
            blob = await achicarFoto(archivo);
          } else if (archivo.type.startsWith('video/')) {
            if (archivo.size > MAX_VIDEO) throw new Error('El video es muy largo (máximo 80 MB). Graben uno más corto.');
          } else {
            throw new Error('Solo se pueden subir fotos o videos.');
          }
          const respuesta = await subir(`/api/guias/${numeroGuia}/fotos/${encodeURIComponent(campo)}`, blob,
            (porcentaje) => { estado.textContent = `${prefijo}Subiendo… ${porcentaje} %`; });
          galeria.append(miniatura({ ...respuesta.foto, creada: '' }, { alBorrar: borrar }));
          estado.textContent = 'Guardado ✓';
          estado.className = 'foto-estado ok';
          if (alSubir) alSubir();
        } catch (error) {
          if (error.estado === 401) { location.href = '/'; return; }
          estado.textContent = error.message;
          estado.className = 'foto-estado error';
          break;
        }
      }
    });

    bloque.append(el('div', { class: 'foto-acciones' }, entrada, boton, estado));
  });
}

// Docente: solo ver
export function montarFotosLectura(raiz, { fotos = {}, conEquipo }) {
  raiz.querySelectorAll('.foto-bitacora[data-foto]').forEach((bloque) => {
    const lista = fotos[bloque.dataset.foto] || [];
    const galeria = bloque.querySelector('.foto-galeria');
    if (lista.length) lista.forEach((f) => galeria.append(miniatura(f)));
    else if (conEquipo) galeria.append(el('p', { class: 'sin-respuesta' }, 'Todavía no han subido fotos.'));
  });
}

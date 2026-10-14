// ============================================================
// Pequeñas ayudas compartidas por el servidor
// ============================================================
const os = require('os');

// Campo de una pregunta individual en la base de datos: "g13-r1::Sofía"
const SEPARADOR_INDIVIDUAL = '::';

// Lee una cookie de la petición
function leerCookie(req, nombre) {
  const cabecera = req.headers.cookie || '';
  for (const parte of cabecera.split(';')) {
    const [clave, ...resto] = parte.trim().split('=');
    if (clave === nombre) {
      try { return decodeURIComponent(resto.join('=')); } catch { return null; }
    }
  }
  return null;
}

// IPv4 de la PC (Wi-Fi, cable...), primero las de redes locales típicas
// y al final los adaptadores virtuales (VirtualBox, WSL, VPN...)
function direccionesLocales() {
  const lista = [];
  for (const [nombre, interfaces] of Object.entries(os.networkInterfaces())) {
    for (const i of interfaces || []) {
      if (i.family === 'IPv4' && !i.internal) lista.push({ nombre, ip: i.address });
    }
  }
  const prioridad = (ip) => (ip.startsWith('192.168.') ? 0 : ip.startsWith('10.') ? 1 : ip.startsWith('172.') ? 2 : 3);
  const virtual = (n) => (/virtual|vethernet|wsl|vmware|docker|loopback|vpn|tailscale|zerotier/i.test(n) ? 1 : 0);
  return lista.sort((a, b) => virtual(a.nombre) - virtual(b.nombre) || prioridad(a.ip) - prioridad(b.ip));
}

module.exports = { SEPARADOR_INDIVIDUAL, leerCookie, direccionesLocales };

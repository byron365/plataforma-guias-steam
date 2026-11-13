# Cliente mínimo del protocolo de depuración de Chrome/Electron (CDP) con la librería estándar: sin instalar nada.
# Uso como módulo: c = Cdp(); c.eval('document.title'); c.captura('a.png'); c.clic(x, y); c.escribir('texto')
import socket, json, base64, os, struct, urllib.request, time

PUERTO = 9222


class Cdp:
    def __init__(self, puerto=PUERTO, filtro='Arduino'):
        paginas = json.load(urllib.request.urlopen(f'http://127.0.0.1:{puerto}/json'))
        pag = next(p for p in paginas if p.get('type') == 'page' and filtro.lower() in (p.get('title', '') + p.get('url', '')).lower()) \
            if any(filtro.lower() in (p.get('title', '') + p.get('url', '')).lower() for p in paginas if p.get('type') == 'page') \
            else next(p for p in paginas if p.get('type') == 'page')
        url = pag['webSocketDebuggerUrl']
        ruta = url.split(f':{puerto}', 1)[1]
        self.s = socket.create_connection(('127.0.0.1', puerto))
        clave = base64.b64encode(os.urandom(16)).decode()
        self.s.sendall((f'GET {ruta} HTTP/1.1\r\nHost: 127.0.0.1:{puerto}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n'
                        f'Sec-WebSocket-Key: {clave}\r\nSec-WebSocket-Version: 13\r\n\r\n').encode())
        resp = b''
        while b'\r\n\r\n' not in resp:
            resp += self.s.recv(4096)
        assert b' 101 ' in resp.split(b'\r\n')[0], resp
        self.resto = resp.split(b'\r\n\r\n', 1)[1]
        self.n = 0

    def _leer(self, k):
        while len(self.resto) < k:
            d = self.s.recv(1 << 20)
            if not d:
                raise ConnectionError('se cerró')
            self.resto += d
        x, self.resto = self.resto[:k], self.resto[k:]
        return x

    def _mensaje(self):
        datos = b''
        while True:
            b1, b2 = self._leer(2)
            largo = b2 & 0x7F
            if largo == 126:
                largo = struct.unpack('>H', self._leer(2))[0]
            elif largo == 127:
                largo = struct.unpack('>Q', self._leer(8))[0]
            carga = self._leer(largo)
            op = b1 & 0x0F
            if op == 9:                              # ping → pong
                self._enviar(carga, 0xA)
                continue
            datos += carga
            if b1 & 0x80:
                return datos.decode('utf-8', 'replace')

    def _enviar(self, carga, op=0x1):
        mascara = os.urandom(4)
        n = len(carga)
        cab = bytes([0x80 | op])
        cab += bytes([0x80 | n]) if n < 126 else (bytes([0x80 | 126]) + struct.pack('>H', n) if n < 65536 else bytes([0x80 | 127]) + struct.pack('>Q', n))
        self.s.sendall(cab + mascara + bytes(c ^ mascara[i % 4] for i, c in enumerate(carga)))

    def cmd(self, metodo, **params):
        self.n += 1
        self._enviar(json.dumps({'id': self.n, 'method': metodo, 'params': params}).encode())
        while True:
            m = json.loads(self._mensaje())
            if m.get('id') == self.n:
                if 'error' in m:
                    raise RuntimeError(m['error'])
                return m.get('result', {})

    def eval(self, js):
        r = self.cmd('Runtime.evaluate', expression=js, returnByValue=True, awaitPromise=True)
        if 'exceptionDetails' in r:
            raise RuntimeError(r['exceptionDetails'].get('exception', {}).get('description', r['exceptionDetails']))
        return r.get('result', {}).get('value')

    def captura(self, ruta):
        r = self.cmd('Page.captureScreenshot', format='png')
        open(ruta, 'wb').write(base64.b64decode(r['data']))
        return ruta

    def clic(self, x, y):
        for tipo in ('mousePressed', 'mouseReleased'):
            self.cmd('Input.dispatchMouseEvent', type=tipo, x=x, y=y, button='left', clickCount=1)
        time.sleep(0.4)

    def escribir(self, texto):
        self.cmd('Input.insertText', text=texto)

    def tecla(self, key, code, vk, mods=0):
        for tipo in ('rawKeyDown', 'keyUp'):
            self.cmd('Input.dispatchKeyEvent', type=tipo, key=key, code=code, windowsVirtualKeyCode=vk, modifiers=mods)


if __name__ == '__main__':
    import sys
    c = Cdp()
    print(c.eval(sys.argv[1]) if len(sys.argv) > 1 else c.eval('document.title'))

# Abre Arduino IDE con un programa, lo pone en español, elige Arduino UNO, verifica y toma las capturas de la Guía 9.
# Al terminar deja el IDE en inglés (como lo tiene Bairon) y lo cierra.
# Uso: python capturar_ide.py <ruta del .ino> <carpeta de salida>
#   salida: ide_9.png (limpia, con la salida de la verificación), ide_5.png (ventana de placa y puerto), ide_8.png (con el aviso)
import sys, os, time, json, subprocess, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cdp

INO, SAL = sys.argv[1], sys.argv[2]
os.makedirs(SAL, exist_ok=True)
IDE = os.path.join(os.environ['LOCALAPPDATA'], 'Programs', 'Arduino IDE', 'Arduino IDE.exe')


CLIC_TEXTO = """(function(t){ const els=[...document.querySelectorAll('*')].filter(e=>e.offsetParent!==null && e.children.length<=2 && (e.innerText||'').trim()===t);
  if(!els.length) return false; els[els.length-1].click(); return true; })"""

def esperar(cond, segundos=90, cada=1.0):
    for _ in range(int(segundos / cada)):
        try:
            r = cond()
            if r:
                return r
        except Exception:
            pass
        time.sleep(cada)
    raise TimeoutError('no pasó a tiempo')


def conectar():
    def listo():
        paginas = json.load(urllib.request.urlopen('http://127.0.0.1:9222/json', timeout=2))
        return any(p.get('type') == 'page' and 'Arduino IDE' in p.get('title', '') for p in paginas)
    esperar(listo)
    c = cdp.Cdp()
    esperar(lambda: c.eval("!!document.querySelector('#arduino-verify-sketch--toolbar, .arduino-verify-sketch--toolbar')"))
    return c


def sin_dialogos(c):
    """Cierra la ventana de actualización del IDE con 'Ahora no' (no instala nada) si aparece."""
    return c.eval(CLIC_TEXTO + "('AHORA NO')")


def vista(c):
    c.cmd('Emulation.setDeviceMetricsOverride', width=1180, height=740, deviceScaleFactor=1.4, mobile=False)
    time.sleep(0.8)


def sin_avisos(c):
    c.eval("document.querySelectorAll('.theia-notification-list-item').forEach(e=>e.remove())")
    c.cmd('Input.dispatchMouseEvent', type='mouseMoved', x=700, y=400)
    time.sleep(1)


# Los mensajes del compilador salen en el idioma de arduino-cli.yaml: español mientras se captura, después se devuelve
CFG = os.path.join(os.environ['USERPROFILE'], '.arduinoIDE', 'arduino-cli.yaml')
original = open(CFG, 'rb').read()
open(CFG, 'wb').write(original.replace(b'locale: en', b'locale: es'))

subprocess.Popen([IDE, '--remote-debugging-port=9222', INO])
c = conectar()
c.eval("localStorage.setItem('localeId','es'); setTimeout(() => location.reload(), 200); 1")
time.sleep(4)
c = conectar()
time.sleep(4)
time.sleep(3)
sin_dialogos(c)
vista(c)
sin_avisos(c)

# Placa: Arduino UNO (la ventana se captura con la placa marcada)
c.eval("document.querySelector('.arduino-boards-toolbar-item-container').click()")
time.sleep(1)
esperar(lambda: c.eval(CLIC_TEXTO + "('Seleccione otra placa y puerto...')"), 10)
time.sleep(1.5)
c.escribir('uno')
time.sleep(1.5)
esperar(lambda: c.eval(CLIC_TEXTO + "('Arduino UNO')"), 10)
time.sleep(1)
c.captura(os.path.join(SAL, 'ide_5.png'))
c.eval(CLIC_TEXTO + "('ACEPTAR')")
time.sleep(1.5)

# Verificar con un clic de mouse sobre ✓ y esperar el resultado
sin_dialogos(c)
vista(c)
c.clic(31, 24)
salida = lambda: c.eval("(function(){const o=document.querySelector('.theia-output, #outputView'); return o ? o.innerText : '';})()") or ''
texto = esperar(lambda: (lambda t: t if ('bytes' in t or 'rror' in t) else '')(salida()), 180, 2)
print(texto[-300:])
time.sleep(1.5)
c.captura(os.path.join(SAL, 'ide_8.png'))
sin_avisos(c)
vista(c)
c.captura(os.path.join(SAL, 'ide_9.png'))

# Dejarlo como estaba: en inglés y cerrado
c.cmd('Emulation.clearDeviceMetricsOverride')
c.eval("localStorage.removeItem('localeId'); 1")
subprocess.run(['powershell', '-NoProfile', '-Command',
                "Get-Process | Where-Object { $_.ProcessName -eq 'Arduino IDE' -and $_.MainWindowHandle -ne 0 } | "
                "ForEach-Object { $_.CloseMainWindow() | Out-Null }"])
time.sleep(5)
open(CFG, 'wb').write(original)
print('listo', SAL)

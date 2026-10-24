# Imágenes de la garra robótica hechas por programa:
#   IMAGEN 4.3: etiquetas sobre el render de la pinza (herramientas/garra_pinza_render.py)
#   IMAGEN 5.2: circuito completo (4 servos con pilas, 4 perillas, GND común)
#   IMAGEN 7.1: botón entre D2 y GND
# Uso: python garra_imagenes.py <render de la pinza .png> <carpeta de salida>
import sys, os
from PIL import Image, ImageDraw, ImageFont

render, salida = sys.argv[1], sys.argv[2]
os.makedirs(salida, exist_ok=True)
FUENTE = 'C:/Windows/Fonts/arialbd.ttf'
f17, f15, f13, f22 = (ImageFont.truetype(FUENTE, t) for t in (17, 15, 13, 22))
FONDO, TINTA, GUIA = (247, 247, 248), (30, 30, 30), (40, 40, 40)
ROJO, NEGRO, CAFE, NARANJA, AMARILLO, AZUL_RIEL = (220, 40, 40), (40, 40, 40), (130, 82, 45), (240, 130, 20), (230, 190, 20), (40, 90, 200)
PLACA, PLACA_BORDE, PROTO = (40, 110, 160), (25, 75, 115), (236, 236, 230)
K = 2  # se dibuja al doble y se reduce (líneas suaves)

def etiqueta(d, texto, punto, pos, anc):
    # Texto con línea guía y punto blanco, como en las demás imágenes del proyecto
    caja = d.textbbox(pos, texto, font=f17, anchor=anc)
    ini = (caja[2] + 8, pos[1]) if anc == 'lm' else (caja[0] - 8, pos[1])
    d.line([ini, punto], fill=GUIA, width=3)
    d.ellipse([punto[0] - 6, punto[1] - 6, punto[0] + 6, punto[1] + 6], fill='white', outline=GUIA, width=3)
    d.text(pos, texto, font=f17, fill=TINTA, anchor=anc)

# ---------- IMAGEN 4.3: la pinza ----------
im = Image.open(render).convert('RGBA')
fondo = Image.new('RGBA', im.size, FONDO + (255,))
fondo.alpha_composite(im)
pinza = fondo.crop((150, 190, 1210, 830))
lienzo = Image.new('RGB', (1500, 660), FONDO)
lienzo.paste(pinza.convert('RGB'), (220, 10))
d = ImageDraw.Draw(lienzo)
o = (220 - 150, 10 - 190)  # de la captura al lienzo
P = lambda x, y: (x + o[0], y + o[1])
etiqueta(d, 'Engrane motriz (en el brazo del servo)', P(470, 345), (15, 120), 'lm')
etiqueta(d, 'Placa de soporte', P(230, 470), (15, 300), 'lm')
etiqueta(d, 'Servo de la pinza', P(480, 720), (15, 520), 'lm')
etiqueta(d, 'Tornillo M3: eje del engrane seguidor', P(750, 262), (1485, 70), 'rm')
etiqueta(d, 'Engrane seguidor', P(850, 290), (1485, 160), 'rm')
etiqueta(d, 'Mandíbulas', P(1100, 540), (1485, 360), 'rm')
d.line([(1338, 360), P(880, 640)], fill=GUIA, width=3)
d.ellipse([P(880, 640)[0] - 6, P(880, 640)[1] - 6, P(880, 640)[0] + 6, P(880, 640)[1] + 6], fill='white', outline=GUIA, width=3)
lienzo.save(os.path.join(salida, 'IMAGEN 4.3.png'))
print('OK IMAGEN 4.3.png')

# ---------- Ayudas para los diagramas ----------
def cable(d, puntos, color, ancho=5):
    pts = [(x * K, y * K) for x, y in puntos]
    d.line(pts, fill=color, width=ancho * K, joint='curve')
    for x, y in pts[1:-1]:
        r = ancho * K / 2
        d.ellipse([x - r, y - r, x + r, y + r], fill=color)

def caja(d, x0, y0, x1, y1, relleno, borde=None, radio=10, ancho=2):
    d.rounded_rectangle([x0 * K, y0 * K, x1 * K, y1 * K], radius=radio * K, fill=relleno, outline=borde, width=ancho * K)

def texto(d, xy, t, fuente=f15, color=TINTA, anc='mm'):
    d.text((xy[0] * K, xy[1] * K), t, font=ImageFont.truetype(FUENTE, fuente.size * K), fill=color, anchor=anc)

def arduino(d, x0, y0, x1, y1, pines_arriba, pines_abajo):
    # Placa azul con dos tiras de pines; devuelve la posición de cada pin
    caja(d, x0, y0, x1, y1, PLACA, PLACA_BORDE, radio=14)
    texto(d, ((x0 + x1) / 2, (y0 + y1) / 2 - 12), 'Arduino UNO', f22, (255, 255, 255))
    pos = {}
    for fila, y, dy in ((pines_arriba, y0, 24), (pines_abajo, y1, -24)):
        for nombre, x in fila:
            caja(d, x - 9, y - 9, x + 9, y + 9, (30, 30, 30), radio=3, ancho=0)
            texto(d, (x, y + dy), nombre, f13, (255, 255, 255))
            pos[nombre] = (x, y)
    return pos

def protoboard(d, x0, y0, x1, y1, rieles):
    caja(d, x0, y0, x1, y1, PROTO, (190, 190, 180), radio=8)
    for y, color, signo in rieles:
        d.line([((x0 + 30) * K, y * K), ((x1 - 12) * K, y * K)], fill=color, width=3 * K)
        texto(d, (x0 + 16, y), signo, f17, color)
        for x in range(x0 + 45, x1 - 15, 22):
            d.rectangle([(x - 2) * K, (y - 2 - 8) * K, (x + 2) * K, (y + 2 - 8) * K], fill=(150, 150, 140))

def servo(d, x, y, nombre):
    # Servo visto de frente: cuerpo azul, brazo blanco y conector arriba
    caja(d, x - 30, y, x + 30, y + 70, (30, 110, 190), (20, 80, 140), radio=5)
    caja(d, x - 38, y + 22, x + 38, y + 30, (30, 110, 190), (20, 80, 140), radio=3)
    d.ellipse([(x - 9) * K, (y + 8) * K, (x + 9) * K, (y + 26) * K], fill='white', outline=(150, 150, 150), width=K)
    texto(d, (x, y + 52), nombre, f13, (255, 255, 255))

def perilla(d, x, y, nombre):
    d.ellipse([(x - 26) * K, (y - 26) * K, (x + 26) * K, (y + 26) * K], fill=(40, 60, 90), outline=(20, 30, 50), width=2 * K)
    d.ellipse([(x - 17) * K, (y - 17) * K, (x + 17) * K, (y + 17) * K], fill=(90, 140, 200))
    d.line([(x * K, y * K), ((x + 10) * K, (y - 12) * K)], fill=(20, 30, 50), width=4 * K)
    for dx in (-14, 0, 14):
        d.line([((x + dx) * K, (y + 24) * K), ((x + dx) * K, (y + 40) * K)], fill=(120, 120, 120), width=3 * K)
    texto(d, (x, y - 40), nombre, f15)

def guardar(img, nombre):
    img.resize((img.width // K, img.height // K), Image.LANCZOS).save(os.path.join(salida, nombre))
    print('OK', nombre)

# ---------- IMAGEN 5.2: circuito completo ----------
W, H = 1460, 1010
img = Image.new('RGB', (W * K, H * K), FONDO)
d = ImageDraw.Draw(img)
texto(d, (W / 2, 28), 'Circuito completo de la garra', f22)
pin = arduino(d, 40, 330, 420, 640,
              [('D9', 170), ('D6', 225), ('D5', 265), ('D3', 335)],
              [('5V', 110), ('GND', 160), ('A0', 230), ('A1', 270), ('A2', 310), ('A3', 350)])
X0, X1 = 480, 1420
RP, RN, RP2, RN2 = 400, 428, 800, 828   # rieles: + y − de las pilas (arriba), + y − del Arduino (abajo)
protoboard(d, X0, 375, X1, 850, [(RP, ROJO, '+'), (RN, AZUL_RIEL, '−'), (RP2, ROJO, '+'), (RN2, AZUL_RIEL, '−')])
texto(d, (X1 - 8, RP - 24), 'filas de las PILAS', f13, (90, 90, 90), 'rm')
texto(d, (X1 - 8, RN2 + 24), 'filas del ARDUINO (5V y GND)', f13, (90, 90, 90), 'rm')

# Portapilas (4 AA) arriba a la derecha
caja(d, 1220, 205, 1410, 275, (60, 60, 60), (30, 30, 30), radio=6)
for i in range(4):
    caja(d, 1232 + i * 44, 218, 1268 + i * 44, 262, (200, 160, 40), (120, 90, 20), radio=4)
texto(d, (1315, 190), 'Portapilas 4 AA (6 V)', f15)
cable(d, [(1235, 275), (1235, RP)], ROJO)
cable(d, [(1395, 275), (1395, RN)], NEGRO)

# Servos: rojo y café a las pilas, naranja al pin del Arduino
servos = [('Base', 'D3', 600), ('Hombro', 'D5', 760), ('Codo', 'D6', 920), ('Pinza', 'D9', 1080)]
for i, (nombre, p, x) in enumerate(servos):
    servo(d, x, 210, nombre)
    cable(d, [(x - 8, 280), (x - 8, RP)], ROJO)
    cable(d, [(x - 18, 280), (x - 18, RN)], CAFE)
    alto = 160 - i * 22
    cable(d, [(x + 10, 210), (x + 10, alto), (pin[p][0], alto), (pin[p][0], pin[p][1])], NARANJA)

# Arduino a las filas de abajo y GND común entre las dos filas −
cable(d, [(pin['5V'][0], pin['5V'][1]), (pin['5V'][0], 700), (500, 700), (500, RP2)], ROJO)
cable(d, [(pin['GND'][0], pin['GND'][1]), (pin['GND'][0], 740), (520, 740), (520, RN2)], NEGRO)
cable(d, [(545, RN), (545, RN2)], NEGRO, 6)
caja(d, 555, 590, 690, 622, (255, 235, 120), (200, 170, 40), radio=6)
texto(d, (622, 606), 'GND común', f15)

# Perillas: lados a 5V y GND del Arduino, centro a A0–A3
perillas = [('Base', 'A0', 720), ('Hombro', 'A1', 880), ('Codo', 'A2', 1040), ('Pinza', 'A3', 1200)]
for i, (nombre, p, x) in enumerate(perillas):
    perilla(d, x, 560, nombre)
    cable(d, [(x - 14, 600), (x - 14, RP2)], ROJO)
    cable(d, [(x + 14, 600), (x + 14, RN2)], NEGRO)
    bajo = 875 + i * 16
    cable(d, [(x, 600), (x, bajo), (pin[p][0], bajo), (pin[p][0], pin[p][1])], AMARILLO)

texto(d, (W / 2, 958), 'Servos: rojo y café → filas de las pilas · naranja → D3, D5, D6 y D9', f15, (70, 70, 70))
texto(d, (W / 2, 984), 'Perillas: lados → + y − del Arduino · centro → A0, A1, A2 y A3 · ¡Nunca unir las dos filas +!', f15, (70, 70, 70))
guardar(img, 'IMAGEN 5.2.png')

# ---------- IMAGEN 7.1: botón entre D2 y GND ----------
W, H = 1060, 600
img = Image.new('RGB', (W * K, H * K), FONDO)
d = ImageDraw.Draw(img)
texto(d, (W / 2, 28), 'Botón entre D2 y GND', f22)
pin = arduino(d, 40, 190, 380, 470, [('D2', 300)], [('GND', 140)])
protoboard(d, 450, 130, 1020, 540, [(500, ROJO, '+'), (526, AZUL_RIEL, '−')])
# Canaleta del centro
d.rectangle([465 * K, 300 * K, 1005 * K, 322 * K], fill=(205, 205, 198))
texto(d, (980, 345), 'canaleta del centro', f13, (90, 90, 90), 'rm')
# Botón sobre la canaleta, con sus 4 patas
bx, by = 720, 311
for px, py in ((bx - 32, by - 40), (bx + 32, by - 40), (bx - 32, by + 40), (bx + 32, by + 40)):
    d.ellipse([(px - 6) * K, (py - 6) * K, (px + 6) * K, (py + 6) * K], fill=(120, 120, 120))
caja(d, bx - 40, by - 32, bx + 40, by + 32, (60, 60, 60), (30, 30, 30), radio=6)
d.ellipse([(bx - 20) * K, (by - 20) * K, (bx + 20) * K, (by + 20) * K], fill=(200, 40, 40))
# Patas en diagonal: una a D2 y la otra a la fila − (GND)
cable(d, [(bx - 32, by - 40), (bx - 32, 95), (pin['D2'][0], 95), (pin['D2'][0], pin['D2'][1])], (40, 160, 90))
cable(d, [(bx + 32, by + 40), (bx + 32, 526)], NEGRO)
cable(d, [(pin['GND'][0], pin['GND'][1]), (pin['GND'][0], 570), (480, 570), (480, 526)], NEGRO)
texto(d, (bx - 50, 200), 'pata → D2', f15, TINTA, 'rm')
texto(d, (bx + 48, 440), 'pata en diagonal → fila − (GND)', f15, TINTA, 'lm')
texto(d, (160, 545), 'GND del Arduino → fila −', f15, TINTA, 'lm')
guardar(img, 'IMAGEN 7.1.png')

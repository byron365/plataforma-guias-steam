# Marca en morado las capturas de App Inventor (recuadro y número de cada paso) y guarda las imágenes de las guías 6 y 7
# de la versión con app del robot: IMAGEN 6.1A … 6.26A e IMAGEN 7.1A … 7.5A.
# Uso: python anotar_appinventor.py <carpeta de las capturas> <carpeta de imágenes del proyecto>
# Capturas: c01_menu_nuevo.png … c25_unir_mutador.png (proyecto equipo_ejemplo_robot, App Inventor en español) y
#   6.3A_original.png (el Diseñador con la app terminada). No se suben: algunas muestran el correo de la cuenta.
import sys, os, math, shutil
from PIL import Image, ImageDraw, ImageFont

S, DEST = sys.argv[1], sys.argv[2]
MORADO, BLANCO, GRIS = (124, 58, 237), (255, 255, 255), (225, 225, 225)


def fuente(t):
    return ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', int(t))


class Lamina:
    """Una captura con sus marcas. 'e' es la escala de las marcas (1 = capturas de unos 1500 px de ancho)."""

    def __init__(self, archivo, e=1.0, recorte=None):
        self.im = Image.open(os.path.join(S, archivo)).convert('RGB')
        if recorte:
            self.im = self.im.crop(recorte)
        self.e = e
        self.d = ImageDraw.Draw(self.im)

    def caja(self, c, n=None, donde='arriba-izq', texto=None):
        """Recuadro morado en c = (x0, y0, x1, y1) y su número en una esquina (o en (x, y) si 'donde' es una tupla)."""
        e, d = self.e, self.d
        x0, y0, x1, y1 = c
        d.rounded_rectangle(c, radius=int(8 * e), outline=MORADO, width=max(3, int(5 * e)))
        if n is None:
            return
        r = int(22 * e)
        if isinstance(donde, tuple):
            cx, cy = donde
        else:
            cx = {'izq': x0 - r - 4 * e, 'der': x1 + r + 4 * e, 'adentro-izq': x0 + r + 6 * e}[donde.split('-', 1)[1]]
            cy = {'arriba': y0, 'medio': (y0 + y1) / 2, 'abajo': y1}[donde.split('-', 1)[0]]
        self.numero((cx, cy), n, texto)

    def numero(self, centro, n, texto=None):
        e, d = self.e, self.d
        cx, cy = centro
        r = int(22 * e)
        if texto:
            f = fuente(24 * e)
            ancho = d.textlength(texto, font=f)
            d.rounded_rectangle((cx - r, cy - r, cx + r + 12 * e + ancho + 14 * e, cy + r), radius=r, fill=BLANCO,
                                outline=MORADO, width=max(2, int(3 * e)))
            d.text((cx + r + 10 * e, cy), texto, font=f, fill=(17, 17, 17), anchor='lm')
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=MORADO, outline=BLANCO, width=max(2, int(3 * e)))
        d.text((cx, cy), str(n), font=fuente(26 * e), fill=BLANCO, anchor='mm')

    def flecha(self, p0, p1):
        """Flecha morada de p0 a p1 (para 'arrastrar hasta aquí')."""
        e, d = self.e, self.d
        d.line((p0, p1), fill=MORADO, width=max(3, int(6 * e)))
        ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
        L, a = 26 * e, math.radians(28)
        punta = [p1, (p1[0] - L * math.cos(ang - a), p1[1] - L * math.sin(ang - a)),
                 (p1[0] - L * math.cos(ang + a), p1[1] - L * math.sin(ang + a))]
        d.polygon(punta, fill=MORADO)

    def tapar(self, c, texto=''):
        """Tapa un dato (correo, código QR) con un recuadro gris y un texto."""
        self.d.rectangle(c, fill=GRIS)
        if texto:
            f = fuente(max(12, min(22 * self.e, (c[3] - c[1]) * 0.45)))
            self.d.text(((c[0] + c[2]) / 2, (c[1] + c[3]) / 2), texto, font=f, fill=(90, 90, 90), anchor='mm')

    def guardar(self, codigo):
        ruta = os.path.join(DEST, f'IMAGEN {codigo}.png')
        self.im.save(ruta, optimize=True)
        print('OK', codigo, self.im.size)


def ampliar(archivo, factor, nuevo):
    """Agranda una captura pequeña (para que las marcas y el texto se lean igual que en las demás)."""
    im = Image.open(os.path.join(S, archivo)).convert('RGB')
    im.resize((int(im.width * factor), int(im.height * factor)), Image.LANCZOS).save(os.path.join(S, nuevo))
    return nuevo


# ---------- Guía 6 · Parte 1 ----------
L = Lamina('c01_menu_nuevo.png', 0.8)                     # 6.1A: Proyectos → Comenzar un proyecto nuevo
L.caja((226, 14, 326, 46), 1, 'medio-izq')
L.caja((224, 106, 654, 138), 2, 'medio-der')
L.guardar('6.1A')

L = Lamina(ampliar('c02_nombre_proyecto.png', 1.6, '_c02x.png'), 0.8)   # 6.2A: nombre del proyecto y Aceptar
L.caja((364, 102, 664, 166), 1, 'medio-der')
L.caja((482, 368, 612, 418), 2, 'medio-der')
L.guardar('6.2A')

L = Lamina('6.3A_original.png', 1.0)                       # 6.3A: las partes del Diseñador (pantalla terminada)
L.caja((14, 102, 238, 706), 1, (126, 168), 'Paleta')
L.caja((254, 102, 1056, 706), 2, (300, 168), 'Visor')
L.caja((1066, 102, 1278, 650), 3, (1108, 590), 'Componentes')
L.caja((1094, 620, 1252, 648), 4, 'medio-izq')
L.caja((1288, 102, 1500, 706), 5, (1330, 260), 'Propiedades')
L.caja((1380, 60, 1500, 86), 6, 'medio-izq')
L.guardar('6.3A')

# ---------- Guía 6 · Parte 2 ----------
izq = Image.open(os.path.join(S, 'c05_screen1_centro.png')).convert('RGB').crop((1090, 100, 1568, 460))
der = Image.open(os.path.join(S, 'c04_titulo.png')).convert('RGB').crop((285, 0, 585, 763))   # solo Propiedades
junta = Image.new('RGB', (izq.width + 30 + der.width, max(izq.height, der.height)), BLANCO)
junta.paste(izq, (0, 0))
junta.paste(der, (izq.width + 30, 0))
junta.save(os.path.join(S, '_c05_c04.png'))
L = Lamina('_c05_c04.png', 1.0)                            # 6.4A: Screen1, DispHorizontal y Título
L.caja((30, 38, 112, 72), 1, 'medio-der')
L.caja((232, 190, 326, 244), 2, 'medio-der')
X = izq.width + 30
L.caja((X + 5, 612, X + 185, 676), 3, 'medio-der')
L.guardar('6.4A')

L = Lamina('c06_arrastrar_selector.png', 1.0)              # 6.5A: arrastrar el SelectorDeLista al Visor
L.caja((26, 374, 274, 412), 1, 'arriba-der')
L.flecha((276, 393), (686, 350))
L.caja((690, 324, 912, 370), 2, 'medio-der')
L.caja((1360, 78, 1510, 112), 3, 'medio-izq')
L.guardar('6.5A')

L = Lamina('c07_cambiar_nombre.png', 0.8)                  # 6.6A: Cambiar nombre
L.caja((660, 42, 818, 76), 1, 'medio-izq')
L.caja((640, 610, 776, 648), 2, 'medio-izq')
L.caja((184, 281, 370, 327), 3, 'medio-der')
L.caja((246, 344, 330, 384), 4, 'medio-der')
L.guardar('6.6A')

L = Lamina(ampliar('c08_texto_conectar.png', 1.6, '_c08x.png'), 0.8)    # 6.7A: la propiedad Texto
L.caja((26, 284, 308, 350), 1, (330, 317))
L.guardar('6.7A')

L = Lamina('c09_buscar_tabular.png', 0.8)                  # 6.8A: buscar "tabular" y arrastrar la DisposiciónTabular
L.caja((14, 36, 288, 66), 1, 'medio-der')
L.caja((16, 70, 288, 106), 2, (318, 88))
L.flecha((300, 104), (780, 412))
L.guardar('6.8A')

L = Lamina('c10_tabular_props.png', 0.8)                   # 6.9A: Columnas 3 y Filas 3
L.caja((118, 406, 317, 604), 1, 'medio-der')
L.caja((1016, 146, 1194, 210), 2, 'medio-izq')
L.caja((1016, 388, 1194, 452), 3, 'medio-izq')
L.guardar('6.9A')

L = Lamina('c11_cruz_botones.png', 0.8)                    # 6.10A: los cuatro botones en cruz y sus nombres
L.caja((172, 410, 266, 454), 1, 'medio-der')
L.caja((78, 451, 175, 495), 2, 'arriba-izq')
L.caja((262, 451, 356, 495), 3, 'abajo-der')
L.caja((170, 490, 268, 538), 4, 'medio-der')
L.caja((806, 180, 884, 322), None)
L.numero((780, 199), 1); L.numero((780, 233), 2); L.numero((780, 267), 3); L.numero((780, 301), 4)
L.guardar('6.10A')

L = Lamina('c12_deslizador.png', 0.8)                      # 6.11A: el deslizador Velocidad
L.caja((778, 204, 885, 240), 1, 'medio-der')
L.caja((1006, 226, 1182, 288), 2, 'medio-izq')
L.caja((1006, 306, 1182, 368), 3, 'medio-izq')
L.caja((1006, 614, 1182, 676), 4, 'medio-izq')
L.guardar('6.11A')

L = Lamina('c14_conectividad_no_visibles.png', 0.8)        # 6.12A: Conectividad → ClienteBluetooth
L.caja((16, 306, 286, 346), 1, 'medio-der')
L.caja((24, 392, 282, 432), 2, 'medio-der')
L.flecha((330, 430), (740, 560))
L.caja((716, 526, 920, 606), 3, 'medio-der')
L.guardar('6.12A')

L = Lamina('c13_bluetooth_props.png', 0.8)                 # 6.13A: propiedades del ClienteBluetooth1
L.caja((60, 488, 222, 526), 1, 'medio-der')
L.caja((290, 230, 470, 294), 2, (520, 262))
L.caja((290, 312, 470, 372), 3, (520, 342))
L.guardar('6.13A')

L = Lamina('c15_reloj_props.png', 0.8)                     # 6.14A: el Reloj1 y su intervalo
L.caja((60, 526, 174, 562), 1, 'medio-der')
L.caja((290, 306, 470, 370), 2, (520, 338))
L.guardar('6.14A')

L = Lamina('c16_menu_companion.png', 0.8)                  # 6.15A: Conectar → AI Companion
L.caja((338, 12, 434, 48), 1, 'medio-izq')
L.caja((336, 68, 638, 104), 2, 'medio-der')
L.guardar('6.15A')

L = Lamina('c17_qr_companion.png', 0.7)                    # 6.16A: el código QR y el código de 6 letras (tapados)
L.tapar((46, 116, 250, 318), 'aquí sale el QR')
L.tapar((346, 226, 470, 262), 'código')
L.caja((40, 110, 256, 324), 1, 'arriba-izq')
L.caja((340, 220, 476, 268), 2, 'abajo-izq')
L.guardar('6.16A')

# ---------- Guía 6 · Parte 3 ----------
L = Lamina('c18_bloques_vacio.png', 0.9)                   # 6.17A: la pantalla de Bloques
L.tapar((1376, 8, 1550, 40), 'cuenta de Google')
L.caja((20, 140, 214, 446), 1, 'medio-der')
L.caja((20, 448, 214, 638), 2, 'medio-der')
L.caja((246, 142, 1534, 726), 3, (290, 186), 'Visor')
L.caja((1442, 644, 1506, 712), 4, 'medio-izq')
L.caja((1412, 60, 1542, 90), 5, 'abajo-izq')
L.guardar('6.17A')

L = Lamina('c19_cajon_conectar.png', 0.8)                  # 6.18A: el cajón Conectar
L.caja((68, 455, 172, 492), 1, 'medio-der')
L.caja((316, 166, 694, 250), 2, 'medio-der')
L.flecha((700, 208), (1110, 208))
L.guardar('6.18A')

L = Lamina('c20_cajon_control.png', 0.8)                   # 6.19A: el cajón Control y el "si … else"
L.caja((68, 83, 160, 120), 1, 'medio-der')
L.caja((316, 170, 466, 300), 2, 'medio-der')
L.flecha((470, 236), (1150, 240))
L.guardar('6.19A')

L = Lamina(ampliar('c21_encajar_si.png', 1.6, '_c21x.png'), 0.8)        # 6.20A: el "si" encajado en "ejecutar"
L.caja((292, 100, 540, 312), None)
L.guardar('6.20A')

# ---------- Guía 6 · Parte 4 ----------
L = Lamina('c22_cajon_variables.png', 0.8)                 # 6.22A: el cajón Variables
L.caja((68, 353, 174, 392), 1, 'medio-der')
L.caja((316, 194, 624, 236), 2, 'medio-der')
L.guardar('6.22A')

L = Lamina('c23_mutador_mover.png', 1.1)                   # 6.23A: el engranaje del procedimiento mover
L.caja((172, 336, 218, 382), 1, 'medio-izq')
L.caja((60, 42, 264, 112), 2, 'arriba-der')
L.flecha((270, 90), (520, 150))
L.caja((440, 336, 752, 384), 3, 'arriba-der')
L.guardar('6.23A')

c24 = Image.open(os.path.join(S, 'c24_tomar_izquierdo.png')).convert('RGB')
con_franja = Image.new('RGB', (c24.width, c24.height + 60), BLANCO)   # franja blanca arriba para el número 1
con_franja.paste(c24, (0, 60))
con_franja.save(os.path.join(S, '_c24x.png'))
L = Lamina('_c24x.png', 1.0)                              # 6.24A: tomar izquierdo al pasar el mouse
L.caja((312, 88, 462, 134), 1, (387, 32))
L.caja((356, 144, 662, 200), 2, 'medio-izq')
L.guardar('6.24A')

# ---------- Guía 7 ----------
L = Lamina('c25_unir_mutador.png', 0.9)                    # 7.1A: el engranaje de "unir" con cuatro cadenas
L.caja((128, 456, 172, 500), 1, 'medio-izq')
L.caja((66, 52, 222, 124), 2, 'arriba-izq')
L.flecha((222, 110), (330, 160))
L.caja((326, 128, 484, 362), 3, 'medio-der')
L.guardar('7.1A')

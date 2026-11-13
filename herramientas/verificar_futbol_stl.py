# Verifica las piezas del mini fútbol (portería y soporte del marcador) contra modelos de los componentes reales.
# Portería: sensor FC-51 (placa de 31,3 × 14,2 × 6,6 mm; ojitos de Ø5 que sobresalen 7,7 mm y juntos miden unos 11 de
# ancho) y pelota de ping pong de 40 mm metida hasta el fondo. Soporte: pantalla OLED de 0,96" (placa de 27,3 × 27,8,
# vidrio de 26,7 × 19,26 × 1,45, conector de 4 pines arriba con sus cables) y buzzer de Ø12 × 8,5, por detrás del panel.
# Compara un generador anterior con el actual (herramientas/futbol_stl.py) y saca una imagen.
# Uso: blender --background --factory-startup --python verificar_futbol_stl.py -- <carpeta temporal> <generador anterior .py> <carpeta imagen>
import sys, os, math, bpy, bmesh
from mathutils import Vector, Matrix

args = sys.argv[sys.argv.index('--') + 1:]
TEMPORAL, ANTERIOR, SALIDA = args[0], args[1], args[2]
ACTUAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'futbol_stl.py')


def funciones(ruta):
    """Carga porteria() y soporte_marcador() del generador sin exportar nada."""
    texto = open(ruta, encoding='utf-8').read()
    texto = texto[:texto.index("for nombre, crear in")]
    espacio = {'__name__': 'piezas'}
    exec(texto, espacio)
    return espacio


def limpiar():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()


def fijar(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o


def caja(w, d, h, x, y, z):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    o = bpy.context.object
    o.scale = (w, d, h)
    return fijar(o)


def cil(r, largo, x, y, z, eje='z'):
    rot = {'x': (0, math.radians(90), 0), 'y': (math.radians(90), 0, 0), 'z': (0, 0, 0)}[eje]
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=r, depth=largo, location=(x, y, z), rotation=rot)
    return fijar(bpy.context.object)


def esfera(r, x, y, z):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=r, location=(x, y, z))
    return fijar(bpy.context.object)


def booleana(base, otro, tipo, borrar=True):
    m = base.modifiers.new('b', 'BOOLEAN')
    m.operation, m.solver, m.object = tipo, 'EXACT', otro
    bpy.context.view_layer.objects.active = base
    bpy.ops.object.modifier_apply(modifier=m.name)
    if borrar:
        bpy.data.objects.remove(otro, do_unlink=True)
    return base


def unir(objs):
    for o in objs[1:]:
        booleana(objs[0], o, 'UNION')
    return objs[0]


def volumen(o):
    bm = bmesh.new()
    bm.from_mesh(o.data)
    v = abs(bm.calc_volume())
    bm.free()
    return v


def choque(a, b):
    c = a.copy()
    c.data = a.data.copy()
    bpy.context.collection.objects.link(c)
    booleana(c, b, 'INTERSECT', borrar=False)
    v = volumen(c)
    bpy.data.objects.remove(c, do_unlink=True)
    return v


def fc51(y_punta, z_eje, ancho_ventana):
    """FC-51 acostado detrás del fondo, con los ojitos hacia la cancha (−Y). y_punta: dónde queda la punta de los ojitos."""
    y_placa = y_punta + 7.7                     # orilla de la placa (los ojitos sobresalen 7,7 mm)
    abajo = z_eje - 3.0 - 1.6                   # el eje de los ojitos queda 3 mm sobre la placa
    placa = caja(14.2, 31.3, 1.6, 0, y_placa + 15.65, abajo + 0.8)
    piezas = caja(10, 20, 5, 0, y_placa + 18, abajo + 1.6 + 2.5)   # potenciómetro, chip y pines
    ojos = unir([cil(2.5, 7.7, x, y_punta + 3.85, z_eje, 'y') for x in (-3, 3)])
    holgura = ancho_ventana / 2 - (3 + 2.5)
    return unir([placa, piezas]), ojos, holgura


print('=====', 'resultados')
for version, ruta in (('anterior', ANTERIOR), ('nueva', ACTUAL)):
    F = funciones(ruta)
    print(f'--- Medidas {version}')
    limpiar()
    porteria = fijar(F['porteria']())
    nueva = version == 'nueva'
    ancho = 14 if nueva else 12
    if nueva:
        # Placa apoyada en el pie (Z 18.4) y contra el tope: orilla a Y 47.2, punta de los ojitos a Y 39.5
        cuerpo, ojos, holgura = fc51(39.5, 18.4 + 1.6 + 3.0, ancho)
    else:
        # Sin pie: la placa pegada con su orilla contra la cara de atrás del fondo (Y 41.5), ojitos en el centro de la ventana
        cuerpo, ojos, holgura = fc51(41.5 - 7.7, 25, ancho)
    print(f'  Sensor FC-51: choque placa–portería {choque(cuerpo, porteria):.1f} mm³ · ojitos–ventana '
          f'{choque(ojos, porteria):.1f} mm³ · holgura de los ojitos en la ventana: {holgura:.1f} mm por lado')
    puntas = min(v.co.y for v in ojos.data.vertices)
    print(f'  Punta de los ojitos en Y = {puntas:.1f} (la cara de adentro del fondo está en Y = 38.5): '
          + (f'asoman {38.5 - puntas:.1f} mm dentro de la portería' if puntas < 38.5 else f'quedan {puntas - 38.5:.1f} mm adentro de la ventana'))
    pelota = esfera(20, 0, 38.5 - 20, 3 + 20)
    print(f'  Pelota de 40 mm metida hasta el fondo: choque con los ojitos {choque(pelota, ojos):.1f} mm³')

    # Soporte del marcador: el panel nace centrado, gira −15° en X y sube 27.5; lo de atrás del panel gira igual
    limpiar()
    soporte = fijar(F['soporte_marcador']())
    vs = [v.co for v in soporte.data.vertices]
    print(f'  Soporte: {soporte.dimensions.x:.1f} × {soporte.dimensions.y:.1f} × {soporte.dimensions.z:.1f} mm')
    panel = Matrix.Translation((0, 0, 27.5)) @ Matrix.Rotation(math.radians(-15), 4, 'X')
    def atras(o):
        o.data.transform(panel)
        o.data.update()
        return o
    vidrio = atras(caja(26.7, 1.45, 19.26, 0, 2 + 0.725, 8))                 # centrado en la ventana (Z 8)
    placa_oled = atras(caja(27.3, 1.6, 27.8, 0, 2 + 1.45 + 0.8, 8 + 9.63 + 4.5 - 13.9))
    conector = atras(caja(10.2, 14, 2.6, 0, 2 + 3.05 + 7, 8 + 9.63 + 4.5 - 1.3))  # 4 cables hembra hacia atrás
    r_buzzer = 6.4 if nueva else 6.2
    buzzer = atras(cil(6.0, 8.5, 0, 2 + 4.25, -14, 'y'))                     # pegado por detrás del agujero
    oled = unir([vidrio, placa_oled, conector])
    print(f'  Pantalla con su conector y cables: choque con el soporte {choque(oled, soporte):.1f} mm³ · '
          f'buzzer: {choque(buzzer, soporte):.1f} mm³ · pantalla–buzzer {choque(oled, buzzer):.1f} mm³')
    ventana = 23 if nueva else 25
    print(f'  Vidrio de 26,7 × 19,26 sobre la ventana de {ventana} × 14: tapa {(26.7 - ventana) / 2:.2f} mm por lado y {(19.26 - 14) / 2:.2f} arriba y abajo'
          f' · buzzer Ø12 en agujero Ø{2 * r_buzzer:.1f}: {r_buzzer - 6:.1f} mm por lado')

# Imagen: portería nueva con el sensor y la pelota, y el soporte con la pantalla y el buzzer
F = funciones(ACTUAL)
limpiar()
objs = [(fijar(F['porteria']()), (0.2, 0.4, 0.9, 1))]
cuerpo, ojos, _ = fc51(39.5, 23, 14)
objs += [(cuerpo, (0.1, 0.5, 0.2, 1)), (ojos, (0.95, 0.95, 0.95, 1)), (esfera(20, 0, 18.5, 23), (1, 0.6, 0.1, 1))]
soporte = fijar(F['soporte_marcador']())
for v in soporte.data.vertices:
    v.co.x += 130
panel = Matrix.Translation((130, 0, 27.5)) @ Matrix.Rotation(math.radians(-15), 4, 'X')
for o, color in ((caja(27.3, 1.6, 27.8, 0, 4.25, 8.23), (0.1, 0.3, 0.6, 1)), (cil(6.0, 8.5, 0, 6.25, -14, 'y'), (0.1, 0.1, 0.1, 1))):
    o.data.transform(panel); o.data.update(); objs.append((o, color))
objs.append((soporte, (0.82, 0.82, 0.8, 1)))
for o, color in objs:
    o.color = color
esc = bpy.context.scene
esc.render.engine = 'BLENDER_WORKBENCH'
esc.display.shading.color_type = 'OBJECT'
esc.display.shading.show_cavity = True
esc.render.resolution_x, esc.render.resolution_y = 1400, 900
bpy.ops.object.camera_add(location=(-60, 260, 170))
cam = bpy.context.object
cam.data.lens = 45
cam.rotation_euler = (Vector((65, 35, 20)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
esc.camera = cam
esc.render.filepath = os.path.join(SALIDA, 'futbol_piezas.png')
bpy.ops.render.render(write_still=True)

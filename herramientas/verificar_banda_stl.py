# Verifica las piezas de la banda clasificadora (versión Práctica) armadas como dice la Guía 7.
# Componentes: motor TT (plano de Einstronic: caja de engranes de 19 de grueso y 48,2 de largo, eje a 14 mm de la punta y a
# 22,55 de los agujeros; motorcito con clip de 22,4 de grueso), servo SG90 (Addicore) con su brazo (Printables),
# sensor FC-51 en la pared del túnel y TCS34725 (placa de 20,4 × 20,4) en el techo.
# Mide los choques: motor contra su soporte y contra la pata del puente (con el motor hacia el inicio o hacia el puente),
# servo en su soporte, canaleta girando a 30°, 90° y 150° y altura libre para los contenedores.
# Uso: blender --background --factory-startup --python verificar_banda_stl.py -- <carpeta temporal> <generador anterior .py> <carpeta imagen>
import sys, os, math, bpy, bmesh
from mathutils import Vector, Matrix

args = sys.argv[sys.argv.index('--') + 1:]
TEMPORAL, ANTERIOR, SALIDA = args[0], args[1], args[2]
ACTUAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'banda_stl.py')


def funciones(ruta):
    texto = open(ruta, encoding='utf-8').read()
    texto = texto[:texto.index('PIEZAS = {')]
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


def poner(o, matriz):
    o.data.transform(matriz)
    o.data.update()
    return o


def pieza(F, nombre, matriz):
    o = fijar(F[nombre]())
    return poner(o, matriz)


E = 400.0          # eje del rodillo del motor (el rodillo libre está en X 0); los ejes van a Z 55
CARA_MOTOR = -54.5  # cara del soporte del motor que toca el motor: rodillo de Y −35 a 35, motor de 19 mm


def motor(hacia_inicio):
    """TT contra su soporte (Y −54.5 a −35.5), eje en (E, Z 55) entrando al rodillo; cuerpo hacia el inicio o hacia el puente."""
    s = -1 if hacia_inicio else 1                    # hacia dónde va el cuerpo del motor en X
    y0, y1 = CARA_MOTOR, CARA_MOTOR + 19
    # La caja de engranes va de E − 14·s a E + 34.2·s (el eje está a 14 mm de su punta)
    caja_eng = caja(48.2, 19, 22.44, E + s * (34.2 - 14) / 2, (y0 + y1) / 2, 55)
    xl = sorted([E + 34.2 * s, E + 56.2 * s])
    lata = caja(22, 22.4, 20.38, (xl[0] + xl[1]) / 2, (y0 + y1) / 2, 55)
    # Eje de Ø5,4 con dos lados planos (3,7 mm entre planos): el cilindro recortado por una caja de 3,7 de ancho
    eje = cil(2.7, 9.3, E, y1 + 4.65, 55, 'y')
    booleana(eje, caja(3.7, 9.3, 5.4, E, y1 + 4.65, 55), 'INTERSECT')
    agujeros_x = E + 22.55 * s
    return unir([caja_eng, lata, eje]), agujeros_x


def canaleta(F, x_eje, grados, z_abajo):
    """Canaleta pegada sobre el brazo: su eje Y apunta hacia +X con el servo en 90°."""
    giro = Matrix.Rotation(math.radians(grados - 90 - 90), 4, 'Z')   # +Y de la canaleta → +X del mundo en 90°
    return pieza(F, 'canaleta', Matrix.Translation((x_eje, 0, z_abajo)) @ giro)


print('=====', 'resultados')
for version, ruta in (('anterior', ANTERIOR), ('nueva', ACTUAL)):
    F = funciones(ruta)
    print(f'--- Medidas {version}')
    for hacia_inicio in (True, False):
        limpiar()
        m, xa = motor(hacia_inicio)
        # Soporte del motor: la oreja (Y de −1.5 a 1.5 en su diseño) con su cara de +Y contra el motor; el pie hacia −Y
        soporte = pieza(F, 'soporte_motor', Matrix.Translation((xa, CARA_MOTOR - 1.5, 0)))
        rodillo = pieza(F, 'rodillo_motor', Matrix.Translation((E, -35, 55)) @ Matrix.Rotation(math.radians(-90), 4, 'X'))
        puente = pieza(F, 'puente_salida', Matrix.Translation((E + 16 + 3 + 17, 0, 0)))
        lado = 'hacia el inicio' if hacia_inicio else 'hacia el puente'
        print(f'  Motor con el cuerpo {lado}: choque con su soporte {choque(m, soporte):.1f} mm³ · '
              f'con el rodillo {choque(m, rodillo):.1f} · con la pata del puente {choque(m, puente):.1f} mm³')
    # Servo en su soporte, debajo del centro del agujero del puente; canaleta en los tres ángulos
    limpiar()
    x_eje = E + 36 - 2                                 # centro del agujero del puente
    x_bloque = x_eje + 5.35                            # el eje del SG90 está a 5,9 mm de su punta; el cable sale a +X
    bloque = pieza(F, 'soporte_servo', Matrix.Translation((x_bloque, 0, 0)))
    fondo = 16 - 15.9                                  # cara de abajo del servo (pestañas sobre el bloque)
    cuerpo = unir([caja(22.5, 11.8, 22.7, x_bloque, 0, fondo + 11.35), caja(31.9, 11.8, 2.5, x_bloque, 0, 16 + 1.25),
                   cil(5.9, 4, x_eje, 0, fondo + 24.7, 'z'), cil(2.3, 3.2, x_eje, 0, fondo + 28.3, 'z')])
    cable = caja(6, 3.6, 1.2, x_bloque + 11.25 + 3, 0, fondo + 4.5)
    print(f'  Servo en su soporte: choque {choque(cuerpo, bloque):.1f} mm³ · cable por la salida de abajo: {choque(cable, bloque):.1f} mm³')
    arriba_brazo = fondo + 29.9 - 2.75 + 5.2
    puente = pieza(F, 'puente_salida', Matrix.Translation((E + 36, 0, 0)))
    soporte3 = pieza(F, 'soporte_rodillo', Matrix.Translation((E, 36 + 2, 0)) @ Matrix.Rotation(math.radians(180), 4, 'Z'))
    for g in (30, 90, 150):
        c = canaleta(F, x_eje, g, arriba_brazo)
        print(f'  Canaleta a {g}°: choque con el puente {choque(c, puente):.1f} · con el soporte del rodillo {choque(c, soporte3):.1f} · '
              f'con el soporte del servo {choque(c, bloque):.1f} mm³')
        bpy.data.objects.remove(c, do_unlink=True)
    vs = [v.co for v in puente.data.vertices]
    print(f'  Canaleta: abajo en z = {arriba_brazo:.1f} (contenedores de menos de 30 mm: {arriba_brazo - 30:.1f} mm libres) · '
          f'arriba en z = {arriba_brazo + 30:.1f}; la placa del puente empieza en z = {min(v.z for v in vs if v.z > 60):.1f}')

# Imagen del final de la banda (versión nueva, motor hacia el inicio, canaleta en 150°)
F = funciones(ACTUAL)
limpiar()
objs = []
m, xa = motor(True); objs.append((m, (0.95, 0.8, 0.2, 1)))
objs.append((pieza(F, 'soporte_motor', Matrix.Translation((xa, CARA_MOTOR - 1.5, 0))), (0.82, 0.82, 0.8, 1)))
objs.append((pieza(F, 'rodillo_motor', Matrix.Translation((E, -35, 55)) @ Matrix.Rotation(math.radians(-90), 4, 'X')), (0.6, 0.6, 0.65, 1)))
objs.append((pieza(F, 'soporte_rodillo', Matrix.Translation((E, 36 + 2, 0)) @ Matrix.Rotation(math.radians(180), 4, 'Z')), (0.82, 0.82, 0.8, 1)))
objs.append((caja(120, 60, 1, E - 60, 0, 70.5), (0.15, 0.15, 0.15, 1)))          # banda (tramo final)
objs.append((pieza(F, 'puente_salida', Matrix.Translation((E + 36, 0, 0))), (0.82, 0.82, 0.8, 1)))
x_eje = E + 34
objs.append((pieza(F, 'soporte_servo', Matrix.Translation((x_eje + 5.35, 0, 0))), (0.82, 0.82, 0.8, 1)))
objs.append((caja(31.9, 11.8, 2.5, x_eje + 5.35, 0, 17.25), (0.15, 0.35, 0.9, 1)))
objs.append((canaleta(F, x_eje, 150, 32.45), (0.3, 0.75, 0.35, 1)))
objs.append((caja(20, 20, 20, E - 40, 0, 81), (0.9, 0.2, 0.2, 1)))             # una pieza sobre la banda
for o, color in objs:
    o.color = color
esc = bpy.context.scene
esc.render.engine = 'BLENDER_WORKBENCH'
esc.display.shading.color_type = 'OBJECT'
esc.display.shading.show_cavity = True
esc.render.resolution_x, esc.render.resolution_y = 1300, 950
bpy.ops.object.camera_add(location=(E + 230, -210, 200))
cam = bpy.context.object
cam.data.lens = 45
cam.rotation_euler = (Vector((E + 10, 0, 40)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
esc.camera = cam
esc.render.filepath = os.path.join(SALIDA, 'banda_final.png')
bpy.ops.render.render(write_still=True)

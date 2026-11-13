# Verifica las piezas del robot (versiones Práctica y Práctica con app) contra modelos de los componentes reales.
# Arma el robot como queda: chasis volteado con los dos motores TT (plano de Einstronic), ruedas de 65 mm, tornillos M3
# con tuerca, columna y rueda loca, soporte con el HC-SR04 (plano de Makerguides), postes, pila de 9 V y la bandeja con
# el portabaterías 2 × 18650, el Arduino UNO, el L298N y la protoboard pequeña donde dice la Guía 8.
# Mide en mm³ los choques y revisa que el robot quede horizontal y que el paso de los cables de la bandeja quede libre.
# Compara un generador anterior con el actual (herramientas/robot_stl.py).
# Uso: blender --background --factory-startup --python verificar_robot_stl.py -- <carpeta temporal> <generador anterior .py> <carpeta imagen>
import sys, os, math, bpy, bmesh
from mathutils import Vector, Matrix

args = sys.argv[sys.argv.index('--') + 1:]
TEMPORAL, ANTERIOR, SALIDA = args[0], args[1], args[2]
ACTUAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'robot_stl.py')


def funciones(ruta):
    """Carga las funciones que crean cada pieza (chasis, poste, bandeja…) sin exportar nada."""
    texto = open(ruta, encoding='utf-8').read()
    texto = texto[:texto.index('PIEZAS = {')]
    espacio = {'__name__': 'piezas'}
    exec(texto, espacio)      # usa TEMPORAL como "carpeta de salida" (primer dato después de --)
    return espacio


def limpiar():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()


def fijar(o):
    """Deja las coordenadas de la malla iguales a las del mundo."""
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


def transformar(o, matriz):
    o.data.transform(matriz)
    o.data.update()
    return o


# Alturas (z = 0 es el piso). La placa del chasis volteada queda arriba de las ruedas.
ALTO_TT, AGUJERO_TT, EJE_A_AGUJEROS = 22.44, 2.42, 22.55
RADIO_RUEDA = 32.5
ABAJO_PLACA = ALTO_TT / 2 + RADIO_RUEDA          # cara de abajo de la placa: el eje del motor queda a media altura del TT
ARRIBA_PLACA = ABAJO_PLACA + 4
BANDEJA = ARRIBA_PLACA + 40                      # postes de 40 mm


def motor_y_rueda(lado, x_oreja=39.7, atras=False):
    """TT con la cara lisa contra la oreja, el eje hacia afuera y sus agujeros en Y −20 (la ranura).
    El eje queda delante de los agujeros, o detrás si atras=True (el motor dado vuelta)."""
    s = 1 if lado > 0 else -1
    if atras:
        m, r, t, ze = motor_y_rueda(lado, x_oreja)
        espejo = Matrix.Translation((0, -20, 0)) @ Matrix.Scale(-1, 4, (0, 1, 0)) @ Matrix.Translation((0, 20, 0))
        for o in (m, r):
            transformar(o, espejo)
        return m, r, t, ze
    x0 = x_oreja + 1.5                        # cara de afuera de la oreja
    x1 = x0 + 19                              # cara de la rueda
    ye = -20 + EJE_A_AGUJEROS                 # eje 22,55 mm delante de los agujeros
    ze = ABAJO_PLACA - ALTO_TT / 2
    # Plano de Einstronic: el eje está a 14 mm de la punta; la caja de engranes mide 48,2 de largo y 19 de grueso;
    # después, el motor con su clip: 22 de largo, 22,4 de grueso (sobresale 1,7 por lado) y 20,4 de alto
    caja_eng = caja(19, 48.2, ALTO_TT, s * (x0 + x1) / 2, ye + 14 - 24.1, ze)
    lata = caja(22.4, 22, 20.38, s * (x0 + x1) / 2, ye - 34.2 - 11, ze)
    ejes = cil(2.7, 19 + 8.7 + 9.3, s * (x0 - 9.3 + x1 + 8.7) / 2, ye, ze, 'x')
    motor = unir([caja_eng, lata, ejes])
    rueda = cil(RADIO_RUEDA, 26, s * (x1 + 2.5 + 13), ye, ze, 'x')
    # Tornillos M3 por los dos agujeros: cabeza afuera (en la cara de la rueda) y tuerca adentro, contra la oreja
    tuercas = unir([cil(3.0, 2.4, s * (x_oreja - 1.5 - 1.2), -20, z, 'x')
                    for z in (ABAJO_PLACA - AGUJERO_TT, ABAJO_PLACA - AGUJERO_TT - 17.6)])
    return motor, rueda, tuercas, ze


def hcsr04(z_centro, y_panel):
    """HC-SR04 metido desde atrás con los pines hacia arriba: placa detrás del panel, ojos hacia adelante y
    el cristal (11,5 × 3,5 × 4,7) en la cara de adelante, cerca del borde de abajo."""
    abajo = z_centro - 11.5
    placa = caja(45, 1.6, 20, 0, y_panel - 0.8, abajo + 10)
    ojos = unir([cil(8, 12, x, y_panel + 6, z_centro, 'y') for x in (-13, 13)])
    cristal = caja(11.5, 3.5, 4.7, 0, y_panel + 1.75, abajo + 1.5 + 2.35)
    return placa, ojos, cristal


print('=====', 'resultados')
for version, ruta in (('anterior', ANTERIOR), ('nueva', ACTUAL)):
    F = funciones(ruta)
    print(f'--- Medidas {version}')
    limpiar()
    # Chasis volteado (z → −z): la placa de impresión (z 0 a 4) queda de ABAJO_PLACA a ARRIBA_PLACA
    chasis = fijar(F['chasis']())
    transformar(chasis, Matrix.Translation((0, 0, ARRIBA_PLACA)) @ Matrix.Scale(-1, 4, (0, 0, 1)))
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.normals_make_consistent(inside=False); bpy.ops.object.mode_set(mode='OBJECT')
    piezas_m = []
    for lado, atras in ((1, False), (-1, True)):      # un motor con el eje hacia adelante y el otro hacia atrás
        motor, rueda, tuercas, ze = motor_y_rueda(lado, atras=atras)
        piezas_m.append((motor, rueda, tuercas))
    m = [p[0] for p in piezas_m]; r = [p[1] for p in piezas_m]; t = [p[2] for p in piezas_m]
    print(f'  Motores TT (uno con el eje adelante y otro atrás): choque con el chasis {sum(choque(x, chasis) for x in m):.1f} mm³ · '
          f'ruedas con el chasis {sum(choque(x, chasis) for x in r):.1f} mm³')
    print(f'  Tuercas M3 contra la oreja: choque con el chasis {sum(choque(x, chasis) for x in t):.1f} mm³')
    piso_columna = ARRIBA_PLACA - 4 - 24
    print(f'  Rueda loca: la columna termina a {piso_columna:.2f} mm del piso; con una rueda loca de 20 mm el robot '
          f'queda inclinado {math.degrees(math.atan((piso_columna - 20) / (60 + 20 - 2.55))):.2f}°')
    # Soporte del sensor sobre el chasis, en el borde del frente (base de Y 65 a 80)
    soporte = fijar(F['soporte_sensor']())
    vs = [v.co for v in soporte.data.vertices]
    transformar(soporte, Matrix.Translation((0, 72.5 - (min(v.y for v in vs) + max(v.y for v in vs)) / 2 + 0.0, ARRIBA_PLACA)))
    vs = [v.co for v in soporte.data.vertices]
    y_panel = 80 - 3                         # cara de atrás del panel (el panel mide 3 y llega al borde)
    # Centro de los ojos: el de los agujeros del soporte
    z_ojos = ARRIBA_PLACA + (13 if version == 'anterior' else 15)
    placa, ojos, cristal = hcsr04(z_ojos, y_panel)
    print(f'  HC-SR04 (pines arriba) en su soporte: placa {choque(placa, soporte):.1f} mm³ · ojos {choque(ojos, soporte):.1f} mm³ '
          f'· cristal {choque(cristal, soporte):.1f} mm³')
    # Pila de 9 V entre los postes y altura libre entre los dos pisos
    pila = caja(26.5, 48.5, 17.5, 0, 30, ARRIBA_PLACA + 8.75)
    print(f'  Pila de 9 V sobre el chasis: choque {choque(pila, chasis) + choque(pila, soporte):.1f} mm³ · '
          f'lo más alto entre los pisos: {max(v.z for v in vs) - ARRIBA_PLACA:.1f} mm de 40')
    # Bandeja y lo que va encima (Guía 8): portabaterías en el cerco, Arduino atrás a la izquierda con el jack al borde,
    # L298N atrás a la derecha, protoboard delante del L298N; palitos de pincho cortados con una gota de silicona
    bandeja = fijar(F['bandeja']())
    transformar(bandeja, Matrix.Translation((0, 0, BANDEJA)))
    sobre = BANDEJA + 3
    porta = caja(77, 41, 20, 0, 45, BANDEJA + 3 + 10)
    arduino = caja(68.6, 53.4, 12, -60 + 34.3, -64 + 26.7, sobre + 6)
    l298 = caja(43, 43, 27, 15 + 21.5, -64 + 21.5, sobre + 13.5)
    proto = caja(47, 35, 9.5, 13 + 23.5, -18 + 17.5, sobre + 4.75)
    gotas = unir([cil(3, 2, x, y, sobre + 1, 'z') for x in (-48, 48) for y in (-68, 68)])
    cosas = {'portabaterías': porta, 'Arduino': arduino, 'L298N': l298, 'protoboard': proto}
    print('  Bandeja: ' + ' · '.join(f'{n} {choque(o, bandeja) + choque(o, gotas):.1f} mm³' for n, o in cosas.items()))
    # Paso de los cables de la bandeja: cuánto de su rectángulo queda tapado por el Arduino, el L298N y la protoboard
    paso = (-20, 20, -16, -4) if version == 'anterior' else (-40, 0, -1, 11)          # x0, x1, y0, y1
    huellas = [(-60, 8.6, -64, -10.6), (15, 58, -64, -21), (13, 60, -18, 17)]
    def tapa(a, b):
        return max(0, min(a[1], b[1]) - max(a[0], b[0])) * max(0, min(a[3], b[3]) - max(a[2], b[2]))
    area = (paso[1] - paso[0]) * (paso[3] - paso[2])
    print(f'  Paso de los cables de la bandeja (X {paso[0]} a {paso[1]}, Y {paso[2]} a {paso[3]}): '
          f'{100 * (1 - sum(tapa(paso, h) for h in huellas) / area):.0f} % libre')

# Imagen del robot nuevo armado
F = funciones(ACTUAL)
limpiar()
objs = []
chasis = fijar(F['chasis']()); transformar(chasis, Matrix.Translation((0, 0, ARRIBA_PLACA)) @ Matrix.Scale(-1, 4, (0, 0, 1)))
objs.append((chasis, (0.82, 0.82, 0.8, 1)))
for lado in (1, -1):
    motor, rueda, tuercas, ze = motor_y_rueda(lado)
    objs += [(motor, (0.95, 0.8, 0.2, 1)), (rueda, (0.15, 0.15, 0.15, 1)), (tuercas, (0.6, 0.6, 0.65, 1))]
objs.append((cil(10, 20, 0, 60, 10, 'z'), (0.4, 0.4, 0.45, 1)))
soporte = fijar(F['soporte_sensor']()); vs = [v.co for v in soporte.data.vertices]
transformar(soporte, Matrix.Translation((0, 72.5 - (min(v.y for v in vs) + max(v.y for v in vs)) / 2, ARRIBA_PLACA)))
objs.append((soporte, (0.82, 0.82, 0.8, 1)))
placa, ojos, cristal = hcsr04(ARRIBA_PLACA + 15, 77)
objs += [(placa, (0.1, 0.35, 0.75, 1)), (ojos, (0.75, 0.75, 0.8, 1)), (cristal, (0.9, 0.9, 0.9, 1))]
for x in (-48, 48):
    for y in (-68, 68):
        objs.append((cil(5, 40, x, y, ARRIBA_PLACA + 20, 'z'), (0.82, 0.82, 0.8, 1)))
objs.append((caja(26.5, 48.5, 17.5, 0, 30, ARRIBA_PLACA + 8.75), (0.2, 0.2, 0.2, 1)))
bandeja = fijar(F['bandeja']()); transformar(bandeja, Matrix.Translation((0, 0, BANDEJA)))
objs.append((bandeja, (0.82, 0.82, 0.8, 1)))
sobre = BANDEJA + 3
objs += [(caja(77, 41, 20, 0, 45, BANDEJA + 13), (0.15, 0.15, 0.15, 1)),
         (caja(68.6, 53.4, 12, -25.7, -37.3, sobre + 6), (0.1, 0.45, 0.6, 1)),
         (caja(43, 43, 27, 36.5, -42.5, sobre + 13.5), (0.8, 0.15, 0.15, 1)),
         (caja(47, 35, 9.5, 36.5, -0.5, sobre + 4.75), (0.95, 0.95, 0.95, 1))]
for o, color in objs:
    o.color = color
esc = bpy.context.scene
esc.render.engine = 'BLENDER_WORKBENCH'
esc.display.shading.color_type = 'OBJECT'
esc.display.shading.show_cavity = True
esc.render.resolution_x, esc.render.resolution_y = 1300, 1000
bpy.ops.object.camera_add(location=(260, 250, 230))
cam = bpy.context.object
cam.data.lens = 50
cam.rotation_euler = (Vector((0, 0, 50)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
esc.camera = cam
esc.render.filepath = os.path.join(SALIDA, 'robot_armado.png')
bpy.ops.render.render(write_still=True)

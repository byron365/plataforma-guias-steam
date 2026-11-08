# Verifica los STL del puente levadizo contra modelos de los componentes reales (7 de noviembre de 2026).
# Compara la versión anterior (subcarpeta "anteriores (20 de octubre)") con la nueva: mide en mm³ cuánto chocan el servo SG90
# (plano de Addicore) y su cable con la orilla, la torre con el servo, el LED y el buzzer con sus agujeros y el HC-SR04
# (plano de Makerguides) con su soporte. Revisa también que cada malla esté cerrada y saca dos imágenes de la orilla nueva.
# Uso: blender --background --factory-startup --python verificar_puente_stl.py -- <carpeta de los STL> <carpeta para las imágenes>
import sys, os, math, bpy, bmesh
from mathutils import Vector

args = sys.argv[sys.argv.index('--') + 1:]
CARPETA, SALIDA = args[0], args[1]
VERSIONES = {'anterior': os.path.join(CARPETA, 'anteriores (20 de octubre)'), 'nueva': CARPETA}


def limpiar():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()


def cargar(carpeta, nombre, dx=0, dy=0, dz=0):
    bpy.ops.wm.stl_import(filepath=os.path.join(carpeta, nombre + '.stl'))
    o = bpy.context.selected_objects[0]
    o.location = (dx, dy, dz)
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
    return o


def caja(w, d, h, x, y, z):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    o = bpy.context.object
    o.scale = (w, d, h)
    bpy.ops.object.transform_apply(scale=True)
    return o


def cil(r, largo, x, y, z, eje):
    rot = {'x': (0, math.radians(90), 0), 'y': (math.radians(90), 0, 0), 'z': (0, 0, 0)}[eje]
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=r, depth=largo, location=(x, y, z), rotation=rot)
    o = bpy.context.object
    bpy.ops.object.transform_apply(rotation=True)
    return o


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


def malla_cerrada(o):
    bm = bmesh.new()
    bm.from_mesh(o.data)
    malas = sum(1 for e in bm.edges if not e.is_manifold)
    bm.free()
    return malas == 0


def servo(piso):
    """SG90 acostado según el plano de Addicore, pestañas contra el escalón y = 20, eje hacia −Y."""
    fondo, zc, x0 = 38.4, piso + 5.9, -11.5 - 11.25
    eje = x0 + 5.9
    cuerpo = unir([caja(22.5, 22.7, 11.8, -11.5, fondo - 11.35, zc), caja(31.9, 2.5, 11.8, -11.5, fondo - 17.15, zc),
                   cil(5.9, 4, eje, fondo - 24.7, zc, 'y'), caja(8.8, 4, 5, eje + 4.4, fondo - 24.7, zc),
                   cil(2.3, 3.2, eje, fondo - 28.3, zc, 'y')])
    xs = x0 + 22.5
    cable = unir([caja(4.8, 1.2, 3.6, xs + 2.4, fondo - 4.5, zc),
                  caja(1.2, 50 - (fondo - 4.5), 3.6, xs + 4.2, (fondo - 4.5 + 50) / 2, zc)])
    return cuerpo, cable


def hcsr04(dx):
    """HC-SR04 con los pines hacia arriba, metido por detrás de la placa (+X): ojos Ø16 × 12, centros a ±13, z = 15.
    El cristal (11,5 × 4,7 × 3,5) va entre los ojos, cerca del borde contrario a los pines (abajo)."""
    placa = caja(1.6, 45, 20, dx + 0.8, 0, 15 + 10 - 11.5)        # el borde de los pines queda arriba
    ojos = [cil(8, 12, dx - 6, y, 15, 'x') for y in (13, -13)]
    cristal = caja(3.5, 11.5, 4.7, dx - 1.75, 0, 3.5 + 1.5 + 2.35)
    return placa, unir(ojos), cristal


print('=====', 'resultados')
for version, carpeta in VERSIONES.items():
    print(f'--- STL {version}')
    for n in ('puente_orilla_A', 'puente_orilla_B', 'puente_hoja_A', 'puente_torre_semaforo', 'puente_torre_buzzer',
              'puente_soporte_sensor'):
        limpiar()
        o = cargar(carpeta, n)
        d = o.dimensions
        print(f'  {n}: {d.x:.1f} × {d.y:.1f} × {d.z:.1f} mm · malla cerrada: {"sí" if malla_cerrada(o) else "NO"}')
    # Orilla A con el servo y su cable
    limpiar()
    orilla = cargar(carpeta, 'puente_orilla_A')
    piso = 22.0 if version == 'anterior' else 17.5
    cuerpo, cable = servo(piso)
    print(f'  Servo en orilla A: choque {choque(cuerpo, orilla):.1f} mm³ · arriba en z = {cuerpo.dimensions.z + piso:.1f} '
          f'(camino a 30) · cable hacia atrás: choque {choque(cable, orilla):.1f} mm³')
    # Torre del semáforo sobre la orilla, detrás de la ranura
    torre = cargar(carpeta, 'puente_torre_semaforo', -11, 29.7, 30)
    print(f'  Torre sobre la orilla: choque con el servo {choque(torre, cuerpo):.1f} mm³ · con la orilla {choque(torre, orilla):.1f} mm³')
    # LED: cuerpo Ø5 en el agujero de arriba (la pestaña de Ø5,8 es más grande que el agujero y se queda adentro); buzzer Ø12
    limpiar()
    torre = cargar(carpeta, 'puente_torre_semaforo')
    led = cil(2.5, 8, 18, 0, 34, 'x')
    print(f'  LED Ø5 en su agujero: choque {choque(led, torre):.2f} mm³')
    limpiar()
    torre = cargar(carpeta, 'puente_torre_buzzer')
    buz = cil(6.0, 8.5, 0, 0, 44 - 4.25 + 1, 'z')
    print(f'  Buzzer Ø12 en el agujero del techo: choque {choque(buz, torre):.2f} mm³')
    # Sensor HC-SR04 en su soporte
    limpiar()
    soporte = cargar(carpeta, 'puente_soporte_sensor')
    placa, ojos, cristal = hcsr04(2.0)       # placa del sensor pegada a la cara de atrás (x = 2)
    print(f'  HC-SR04 pegado al soporte: ojos {choque(ojos, soporte):.1f} mm³ · cristal {choque(cristal, soporte):.1f} mm³ '
          f'· placa {choque(placa, soporte):.1f} mm³')


def imagen(nombre, con_torre, camara, mira):
    limpiar()
    orilla = cargar(CARPETA, 'puente_orilla_A')
    cuerpo, cable = servo(17.5)
    objs = [(orilla, (0.82, 0.82, 0.8, 1)), (cuerpo, (0.15, 0.35, 0.9, 1)), (cable, (0.95, 0.45, 0.1, 1))]
    if con_torre:
        objs.append((cargar(CARPETA, 'puente_torre_semaforo', -11, 29.7, 30), (0.3, 0.75, 0.35, 1)))
    for o, color in objs:
        o.color = color
    esc = bpy.context.scene
    esc.render.engine = 'BLENDER_WORKBENCH'
    esc.display.shading.color_type = 'OBJECT'
    esc.display.shading.show_cavity = True
    esc.render.resolution_x, esc.render.resolution_y = 1200, 900
    bpy.ops.object.camera_add(location=camara)
    cam = bpy.context.object
    cam.data.lens = 45
    cam.rotation_euler = (Vector(mira) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    esc.camera = cam
    esc.render.filepath = os.path.join(SALIDA, nombre)
    bpy.ops.render.render(write_still=True)

imagen('orilla_servo.png', False, (-90, 170, 190), (-8, 18, 20))
imagen('orilla_torre.png', True, (-170, -150, 150), (-5, 10, 35))

# Genera los STL del laberinto: piezas pequeñas (soporte del sensor, base del joystick y soporte de la pantalla) y, como
# referencia, el marco y las dos torres (el tablero no, porque cada equipo diseña su propio laberinto)
# con las mismas formas y medidas de los bloques de Tinkercad (Guía 5T, medidas de ejemplo).
# Uso: blender --background --factory-startup --python laberinto_stl.py -- <carpeta de salida>
import sys, os, math, bpy

salida = sys.argv[sys.argv.index('--') + 1]
os.makedirs(salida, exist_ok=True)

def cubo(w, d, h, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    obj = bpy.context.object
    obj.scale = (w, d, h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return obj

def cilindro(r, h, x=0, y=0, z=0, girado_x=0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=r, depth=h, location=(x, y, z),
                                        rotation=(math.radians(girado_x), 0, 0))
    obj = bpy.context.object
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    return obj

def agrupar(base, solidos=(), huecos=()):
    # Une los sólidos y resta los huecos (como "Group Selection")
    for otro, tipo in [(o, 'UNION') for o in solidos] + [(o, 'DIFFERENCE') for o in huecos]:
        mod = base.modifiers.new('bool', 'BOOLEAN')
        mod.operation = tipo
        mod.solver = 'EXACT'
        mod.object = otro
        bpy.context.view_layer.objects.active = base
        bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(otro, do_unlink=True)
    return base

def soporte_sensor():
    # Tapa de 30 × 24 × 2 y tubo de 19,2 × 14 × 12; hueco de 15,2 × 10 (sensor de 14,6 × 9,4 + 0,6)
    return agrupar(cubo(30, 24, 2, 0, 0, 1), [cubo(19.2, 14, 12, 0, 0, 8)], [cubo(15.2, 10, 20, 0, 0, 7)])

def base_joystick():
    # Placa de 60 × 50 × 4 y cerco de 32,6 × 40,6 × 6; hueco de 26,6 × 34,6 (joystick de 26 × 34 + 0,6) y salida de cables
    return agrupar(cubo(60, 50, 4, 0, 0, 2), [cubo(32.6, 40.6, 6, 0, 0, 7)],
                   [cubo(26.6, 34.6, 10, 0, 0, 9), cubo(16, 10, 10, 0, 18.8, 9)])

def soporte_pantalla():
    # El mismo soporte del marcador del mini fútbol: panel inclinado −15° en X sobre la base
    # Ventana de 23 × 14 y agujero de 12,8, como el mini fútbol desde el 12 de noviembre
    panel = agrupar(cubo(70, 4, 50), huecos=[cubo(23, 10, 14, 0, 0, 8), cilindro(6.4, 10, 0, 0, -14, girado_x=90)])
    panel.rotation_euler = (math.radians(-15), 0, 0)
    bpy.ops.object.select_all(action='DESELECT')
    panel.select_set(True)
    bpy.context.view_layer.objects.active = panel
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    panel.location = (0, 0, 27.5)
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
    return agrupar(panel, [cubo(70, 45, 4, 0, 2.5, 2)])

def marco():
    # Marco de referencia (Guía 3): lados de 6 mm y 19 de alto; el de adelante, de 8 (12 de noviembre: así el brazo del servo
    # del tablero no choca con el tablero). Ventana del servo del tablero adelante y agujeros de los palitos atrás y a la izquierda.
    solidos = [cubo(198, 6, 19, 0, 100, 9.5), cubo(6, 194, 19, 96, 0, 9.5), cubo(6, 194, 19, -96, 0, 9.5)]
    huecos = [cubo(23.4, 12, 12.8, -5.4, -101, 9.5), cilindro(2, 10, 0, 100, 9.5, girado_x=90),
              cilindro(2, 10, -96, 0, 9.5)]
    # El agujero izquierdo va a lo largo de X: se gira el cilindro 90° en Y
    huecos[-1].rotation_euler = (0, math.radians(90), 0)
    bpy.ops.object.select_all(action='DESELECT')
    huecos[-1].select_set(True)
    bpy.context.view_layer.objects.active = huecos[-1]
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    return agrupar(cubo(198, 8, 19, 0, -101, 9.5), solidos, huecos)

def torre(con_servo=True):
    # Torre de referencia (Guía 3): placa de 6 × 40 × 134, dos aletas, pie con dos agujeros; ventana del servo parado
    # (eje a 120 mm) o, en la torre del eje, un agujero de 4 mm a 120 mm
    solidos = [cubo(15, 5, 134, 10.5, 17.5, 67), cubo(15, 5, 134, 10.5, -17.5, 67), cubo(30, 70, 4, 12, 0, 2)]
    huecos = [cilindro(2, 10, 12, 28, 2), cilindro(2, 10, 12, -28, 2)]
    if con_servo:
        huecos.append(cubo(10, 12.8, 23.4, 0, 0, 114.6))
    else:
        agujero = cilindro(2, 10, 0, 0, 120)
        agujero.rotation_euler = (0, math.radians(90), 0)
        bpy.ops.object.select_all(action='DESELECT')
        agujero.select_set(True)
        bpy.context.view_layer.objects.active = agujero
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
        huecos.append(agujero)
    return agrupar(cubo(6, 40, 134, 0, 0, 67), solidos, huecos)

PIEZAS = {'laberinto_soporte_sensor': soporte_sensor, 'laberinto_base_joystick': base_joystick,
          'laberinto_soporte_pantalla': soporte_pantalla, 'laberinto_marco': marco,
          'laberinto_torre_servo': lambda: torre(True), 'laberinto_torre_eje': lambda: torre(False)}

for nombre, crear in PIEZAS.items():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    base = crear()
    bpy.ops.object.select_all(action='DESELECT')
    base.select_set(True)
    bpy.context.view_layer.objects.active = base
    # Dejarla apoyada en Z = 0 y centrada en X e Y
    xs, ys, zs = zip(*[v.co[:] for v in base.data.vertices])
    base.location = (-(min(xs) + max(xs)) / 2, -(min(ys) + max(ys)) / 2, -min(zs))
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)
    ruta = os.path.join(salida, nombre + '.stl')
    bpy.ops.wm.stl_export(filepath=ruta, export_selected_objects=True, global_scale=1.0, apply_modifiers=True)
    d = base.dimensions
    print(f'OK {nombre}: {d.x:.1f} x {d.y:.1f} x {d.z:.1f} mm, {len(base.data.polygons)} caras')

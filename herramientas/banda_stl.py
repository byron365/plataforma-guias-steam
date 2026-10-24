# Genera los STL de la banda clasificadora (versión Práctica): rodillos, soportes, túnel del sensor, puente de salida,
# soporte del servo y canaleta giratoria, con las mismas formas y medidas de los bloques de Tinkercad (guías 2P y 3P).
# Las piezas quedan como se diseñan en Tinkercad; el túnel y el puente se imprimen volteados (techo sobre la cama).
# Uso: blender --background --factory-startup --python banda_stl.py -- <carpeta de salida>
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
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=r, depth=h, location=(x, y, z),
                                        rotation=(math.radians(girado_x), 0, 0))
    obj = bpy.context.object
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    return obj

def cuna(w, d, h, x=0, y=0, z=0):
    # Como la Cuña de Tinkercad (20 × 20 × 20 con Escala): centrada, lado alto en Y negativa y baja hacia Y positiva
    v = [(-w/2, -d/2, -h/2), (w/2, -d/2, -h/2), (w/2, d/2, -h/2), (-w/2, d/2, -h/2), (-w/2, -d/2, h/2), (w/2, -d/2, h/2)]
    caras = [(0, 1, 2, 3), (0, 4, 5, 1), (1, 5, 2), (0, 3, 4), (3, 2, 5, 4)]
    malla = bpy.data.meshes.new('cuna')
    malla.from_pydata([(a + x, b + y, c + z) for a, b, c in v], [], caras)
    malla.update()
    obj = bpy.data.objects.new('cuna', malla)
    bpy.context.collection.objects.link(obj)
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

def rodillo_motor():
    # Cilindro de radio 15 y 70 de largo (parado); abajo el hueco del eje del motor TT (3.9 × 5.6, 10 de hondo)
    # y arriba un agujero de radio 1.8 donde entra el palito del soporte
    return agrupar(cilindro(15, 70, 0, 0, 35), huecos=[cubo(3.9, 5.6, 20, 0, 0, 0), cilindro(1.8, 30, 0, 0, 70)])

def rodillo_libre():
    # El mismo cilindro con un agujero de radio 2 de punta a punta: gira sobre un palito de pincho
    return agrupar(cilindro(15, 70, 0, 0, 35), huecos=[cilindro(2, 80, 0, 0, 35)])

def soporte_rodillo():
    # Placa de 30 × 4 × 65 con pie de 30 × 20 × 4; agujero del palito (radio 1.6) a 55 mm de la base; 2 agujeros en el pie
    huecos = [cilindro(1.6, 10, 0, 0, 55, girado_x=90), cilindro(2, 10, -9, -13, 2), cilindro(2, 10, 9, -13, 2)]
    return agrupar(cubo(30, 4, 65, 0, 0, 32.5), [cubo(30, 20, 4, 0, -10, 2)], huecos)

def soporte_motor():
    # Oreja de 30 × 3 × 70 con pie; ranura de 3.4 × 22 centrada a 55 mm (agujeros del TT: separados 17.6)
    huecos = [cubo(3.4, 10, 22, 0, 0, 55), cilindro(2, 10, -9, -13, 2), cilindro(2, 10, 9, -13, 2)]
    return agrupar(cubo(30, 3, 70, 0, 0, 35), [cubo(30, 20, 4, 0, -10, 2)], huecos)

def soporte_servo():
    # Bloque de 32 × 22 × 16 con el hueco del servo (23.4 × 12.8) de punta a punta y salida del cable
    return agrupar(cubo(32, 22, 16, 0, 0, 8), huecos=[cubo(23.4, 12.8, 20, 0, 0, 10), cubo(8, 6, 6, 14, 0, 3)])

def canaleta():
    # Rampa: Cuña escalada a 30 × 55 × 25 (lado alto atrás) y dos paredes de 2 × 55 × 30
    return agrupar(cuna(30, 55, 25, 0, 21.5, 12.5), [cubo(2, 55, 30, 16, 21.5, 15), cubo(2, 55, 30, -16, 21.5, 15)])

def tunel():
    # Paredes de 50 × 3 × 97, techo de 50 × 86 × 3, ventana del sensor de color (12 × 12) y ventana del IR en una pared
    huecos = [cubo(12, 12, 10, 0, 0, 98.5), cubo(16, 10, 8, -15, -41.5, 80)]
    return agrupar(cubo(50, 86, 3, 0, 0, 98.5), [cubo(50, 3, 97, 0, 41.5, 48.5), cubo(50, 3, 97, 0, -41.5, 48.5)], huecos)

def puente_salida():
    # Placa de 34 × 110 × 3 a 66 mm con el agujero por donde cae la pieza (26 × 28), tope de 3 × 40 × 25
    # y dos patas de 12 × 3 × 66 solo en el lado de la banda (dejan girar la canaleta)
    solidos = [cubo(12, 3, 66, -11, 53.5, 33), cubo(12, 3, 66, -11, -53.5, 33), cubo(3, 40, 25, 15.5, 0, 81.5)]
    return agrupar(cubo(34, 110, 3, 0, 0, 67.5), solidos, [cubo(26, 28, 10, -2, 0, 67.5)])

PIEZAS = {'banda_rodillo_motor': rodillo_motor, 'banda_rodillo_libre': rodillo_libre, 'banda_soporte_rodillo': soporte_rodillo,
          'banda_soporte_motor': soporte_motor, 'banda_soporte_servo': soporte_servo, 'banda_canaleta': canaleta,
          'banda_tunel': tunel, 'banda_puente_salida': puente_salida}

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

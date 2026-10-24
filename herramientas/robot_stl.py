# Genera los STL del robot con mando (versión Práctica): chasis, poste, bandeja, soporte del HC-SR04,
# caja del mando y tapa del mando, con las mismas formas y medidas de los bloques de Tinkercad
# (guías 2P y 3P, medidas de ejemplo). Cada pieza queda como se imprime.
# Uso: blender --background --factory-startup --python robot_stl.py -- <carpeta de salida>
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

def chasis():
    # Placa de 120 × 160 × 4. Se imprime con las orejas y la columna hacia arriba; al armar se voltea.
    # Orejas de 3 × 30 × 24 a X ±39.7 (60 − grosor del motor 18.8 − 1.5), con ranura de 3.4 × 22 para los tornillos
    # (agujeros del TT separados 17.6, a 2.4 mm de su cara de arriba)
    # Columna de la rueda loca: radio de la rueda 32.5 + medio motor 11.25 − rueda loca 20 = 23.75 → 24
    solidos = [cubo(3, 30, 24, 39.7, -20, 16), cubo(3, 30, 24, -39.7, -20, 16), cilindro(12, 24, 0, 60, 16)]
    huecos = [cubo(10, 3.4, 22, 39.7, -20, 15.5), cubo(10, 3.4, 22, -39.7, -20, 15.5),   # ranuras
              cubo(40, 12, 10, 0, -10, 2)]                                          # paso de los cables
    huecos += [cilindro(1.8, 10, x, y, 2) for x in (-48, 48) for y in (-68, 68)]    # agujeros de los postes
    return agrupar(cubo(120, 160, 4, 0, 0, 2), solidos, huecos)

def poste():
    # Cilindro de radio 5 y 40 de alto con un agujero de radio 1.8 para el palito de pincho (se imprimen 4)
    return agrupar(cilindro(5, 40, 0, 0, 20), huecos=[cilindro(1.8, 50, 0, 0, 20)])

def bandeja():
    # Placa de 120 × 160 × 3 con los agujeros de los postes, el cerco del portabaterías (77 × 41 + 0.6)
    # y el paso de los cables
    huecos = [cilindro(1.8, 10, x, y, 1.5) for x in (-48, 48) for y in (-68, 68)]
    huecos += [cubo(77.6, 41.6, 10, 0, 45, 8), cubo(40, 12, 10, 0, -10, 1.5)]
    return agrupar(cubo(120, 160, 3, 0, 0, 1.5), [cubo(83.6, 47.6, 8, 0, 45, 4)], huecos)

def soporte_sensor():
    # Base de 50 × 15 × 3 y panel de 50 × 3 × 26 con dos agujeros de radio 9 separados 26 mm (HC-SR04)
    huecos = [cilindro(9, 10, x, 6, 13, girado_x=90) for x in (-13, 13)]
    return agrupar(cubo(50, 15, 3, 0, 0, 1.5), [cubo(50, 3, 26, 0, 6, 16)], huecos)

def caja_mando():
    # Caja de 126 × 66 × 33 con paredes y piso de 3; agujero del USB en la pared izquierda
    return agrupar(cubo(126, 66, 33, 0, 0, 16.5), huecos=[cubo(120, 60, 40, 0, 0, 23), cubo(10, 16, 14, -61.5, 15, 12)])

def tapa_mando():
    # Tapa de 126 × 66 × 3 con la ventana de la pantalla y el cerco del joystick (como la base del laberinto)
    huecos = [cubo(25, 14, 10, 30, 0, 1.5), cubo(26.6, 34.6, 10, -30, 0, 8), cubo(16, 10, 20, -30, 18.8, 5)]
    return agrupar(cubo(126, 66, 3, 0, 0, 1.5), [cubo(32.6, 40.6, 6, -30, 0, 6)], huecos)

PIEZAS = {'robot_chasis': chasis, 'robot_poste': poste, 'robot_bandeja': bandeja,
          'robot_soporte_sensor': soporte_sensor, 'robot_caja_mando': caja_mando, 'robot_tapa_mando': tapa_mando}

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

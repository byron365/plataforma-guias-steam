# Render de la pinza de engranes de la garra (IMAGEN 4.3), con las medidas de la Guía 4 / 3P:
# engranes de 12 dientes, radio 10 y 4 mm de ancho separados 20.5 mm, mandíbulas de 6 × 45 × 4,
# placa de 60 × 35 × 4 con la ventana del servo y el tornillo M3 del engrane seguidor.
# Los engranes se dibujan aquí (sin la extensión Extra Mesh Objects).
# Uso: blender --background --factory-startup --python garra_pinza_render.py -- <archivo .png>
import sys, math, bpy, bmesh

salida = sys.argv[sys.argv.index('--') + 1]
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

def color(obj, rgb):
    obj.color = (*rgb, 1)
    return obj

def cubo(w, d, h, x=0, y=0, z=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    o = bpy.context.object
    o.scale = (w, d, h)
    bpy.ops.object.transform_apply(scale=True)
    return o

def cilindro(r, h, x=0, y=0, z=0, lados=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=lados, radius=r, depth=h, location=(x, y, z))
    return bpy.context.object

def restar(base, otro):
    m = base.modifiers.new('b', 'BOOLEAN')
    m.operation, m.solver, m.object = 'DIFFERENCE', 'EXACT', otro
    bpy.context.view_layer.objects.active = base
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(otro, do_unlink=True)

def unir(base, otro):
    # Unión booleana (las piezas encimadas quedan como un solo sólido)
    m = base.modifiers.new('u', 'BOOLEAN')
    m.operation, m.solver, m.object = 'UNION', 'EXACT', otro
    bpy.context.view_layer.objects.active = base
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(otro, do_unlink=True)
    return base

def engrane(x, z, giro, dientes=12, radio=10, ancho=4):
    # Contorno con dientes trapezoidales, extruido el ancho del engrane
    paso = 2 * math.pi / dientes
    raiz, punta = radio - 1.6, radio + 1.2
    puntos = []
    for i in range(dientes):
        a = i * paso + math.radians(giro)
        for r, f in ((raiz, 0), (punta, 0.25), (punta, 0.5), (raiz, 0.75)):
            puntos.append((x + r * math.cos(a + f * paso), r * math.sin(a + f * paso)))
    malla = bpy.data.meshes.new('engrane')
    bm = bmesh.new()
    vs = [bm.verts.new((px, py, z - ancho / 2)) for px, py in puntos]
    cara = bm.faces.new(vs)
    hecho = bmesh.ops.extrude_face_region(bm, geom=[cara])
    bmesh.ops.translate(bm, vec=(0, 0, ancho), verts=[v for v in hecho['geom'] if isinstance(v, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(malla)
    bm.free()
    o = bpy.data.objects.new('engrane', malla)
    bpy.context.collection.objects.link(o)
    return o

Z = 8  # altura de los engranes (sobre el brazo del servo)
NARANJA, VERDE, GRIS, SERVO, BLANCO, METAL = (0.90, 0.49, 0.13), (0.30, 0.69, 0.42), (0.80, 0.82, 0.84), (0.12, 0.42, 0.75), (0.97, 0.97, 0.97), (0.62, 0.64, 0.67)

# Engrane motriz con su mandíbula y su agujero
motriz = unir(engrane(0, Z, 0), cubo(6, 45, 4, 0, -22.5, Z))
restar(motriz, cilindro(1.1, 10, 0, 0, Z))
color(motriz, NARANJA)
# Engrane seguidor (girado medio diente para que calce) con su mandíbula
seguidor = unir(engrane(20.5, Z, 15), cubo(6, 45, 4, 20.5, -22.5, Z))
restar(seguidor, cilindro(1.6, 10, 20.5, 0, Z))
color(seguidor, VERDE)

# Placa de soporte detrás y debajo, con la ventana del servo y el agujero del seguidor
placa = cubo(60, 35, 4, 10.25, 9.5, -9)
restar(placa, cubo(23.4, 12.8, 10, -5.9, 0, -9))
restar(placa, cilindro(1.6, 10, 20.5, 0, -9))
color(placa, GRIS)

# Servo de la pinza (cuerpo, pestañas, eje y brazo)
color(cubo(22.8, 12.2, 22.7, -5.9, 0, -11.35), SERVO)
color(cubo(32.5, 12.2, 2.5, -5.9, 0, -5.75), SERVO)
color(cilindro(2.4, 4, 0, 0, 2), BLANCO)
color(cubo(20, 5, 2, 0, 0, 5), BLANCO)
color(cubo(5, 14, 2, 0, 0, 5), BLANCO)

# Tornillo M3 del engrane seguidor con su cabeza y su tuerca
color(cilindro(1.5, 25, 20.5, 0, -0.5), METAL)
color(cilindro(2.8, 2, 20.5, 0, 11), METAL)
color(cilindro(3.2, 2.4, 20.5, 0, -12.2, lados=6), METAL)

# Cámara en vista 3/4 desde adelante y arriba
bpy.ops.object.camera_add(location=(-62, -118, 78))
cam = bpy.context.object
objetivo = bpy.data.objects.new('objetivo', None)
objetivo.location = (9, -10, -2)
bpy.context.collection.objects.link(objetivo)
seguir = cam.constraints.new('TRACK_TO')
seguir.target, seguir.track_axis, seguir.up_axis = objetivo, 'TRACK_NEGATIVE_Z', 'UP_Y'
cam.data.lens = 50
escena = bpy.context.scene
escena.camera = cam

escena.render.engine = 'BLENDER_WORKBENCH'
escena.display.shading.light = 'STUDIO'
escena.display.shading.color_type = 'OBJECT'
escena.display.shading.show_cavity = True
escena.display.shading.show_object_outline = True
escena.display.shading.show_shadows = False
escena.render.film_transparent = True  # el fondo claro se pone al etiquetar
escena.render.resolution_x, escena.render.resolution_y = 1400, 1000
escena.render.filepath = salida
bpy.ops.render.render(write_still=True)
print('OK', salida)

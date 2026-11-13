# Verifica las piezas impresas del mini invernadero (Guía 2T) contra los componentes reales y compara las medidas de la
# guía antes del 12 de noviembre con las nuevas:
# - Clip de la manguera, con la manguera de la mini bomba de 3–6 V (salida de 7,5 mm, manguera de unos 8; también una de 7):
#   holgura del hueco, ancho de la abertura, unión de la pestaña con el anillo y si se imprime sin soportes.
# - Soporte del servo, con el SG90 (Addicore) y su cable plano, que sale por la punta a 4,5 mm de la base.
# - Hoja de bisagra: si se imprime sin soportes y se pega plana, palitos de pincho de 2,5 y 3 mm en el agujero (que la
#   impresora deja unas 0,3 mm más chico) y la ventana abriéndose 70° sin que choquen las dos hojas.
# Uso: blender --background --factory-startup --python verificar_invernadero_stl.py -- <carpeta para la imagen>
import sys, os, math, bpy, bmesh
from mathutils import Vector

SALIDA = sys.argv[sys.argv.index('--') + 1]
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.argv = [sys.argv[0], '--', os.path.join(SALIDA, 'tmp_invernadero')]
import invernadero_stl as gen          # no exporta nada al importarlo (solo con __main__)


def limpiar():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()


def fijar(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o


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
    m = c.modifiers.new('b', 'BOOLEAN')
    m.operation, m.solver, m.object = 'INTERSECT', 'EXACT', b
    bpy.context.view_layer.objects.active = c
    bpy.ops.object.modifier_apply(modifier=m.name)
    v = volumen(c)
    bpy.data.objects.remove(c, do_unlink=True)
    return v


def clip_anterior():
    """El clip de la guía antes del 12 de noviembre: anillo r6 × 8, hueco r3.75, abertura de 4, pestaña de 20 × 10 × 2."""
    return gen.agrupar(gen.cilindro(6, 8), [gen.cubo(20, 10, 2, 0, -10, 0)],
                       [gen.cilindro(3.75, 20), gen.cubo(4, 10, 20, 0, 6, 0)])


def manguera(d):
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=d / 2, depth=30, location=(0, 0, 0))
    return fijar(bpy.context.object)


print('=====', 'resultados')
for nombre, crear, hueco, abertura, radio in (('anterior', clip_anterior, 7.5, 4, 6), ('nuevo', gen.clip, 8.5, 6, 6.5)):
    limpiar()
    c = fijar(crear())
    vs = [v.co for v in c.data.vertices]
    d = c.dimensions
    print(f'--- Clip {nombre}: {d.x:.1f} × {d.y:.1f} × {d.z:.1f} mm · hueco de {hueco} · abertura de {abertura} · pared de {radio - hueco / 2:.2f} mm')
    for dm in (7, 8):
        v = choque(manguera(dm), c)
        print(f'  Manguera de {dm} mm: choque {v:.1f} mm³ · para meterla por la abertura hay que apretarla {dm - abertura:.0f} mm'
              + (' (o abrir el anillo de PLA, que se puede quebrar)' if dm - abertura > 2 else ''))
    # Unión de la pestaña con el anillo: lo que comparten la pestaña y el anillo macizo
    anillo = fijar(gen.cilindro(radio, 8))
    pestana = fijar(gen.cubo(20, 10, 2, 0, -10, 0) if nombre == 'anterior' else gen.cubo(20, 4, 8, 0, -6.5, 0))
    print(f'  Pestaña unida al anillo: {choque(pestana, anillo):.1f} mm³ en común')
    # ¿Se imprime sin soportes? Todo lo que no está en la primera capa tiene que estar encima de algo
    abajo = min(v.z for v in vs)
    pestana_z = min(v.z for v in vs if abs(v.y) > radio + 0.5) - abajo      # dónde empieza la pestaña
    print('  Impresión: ' + (f'la pestaña empieza a {pestana_z:.1f} mm de la cama: necesita soportes' if pestana_z > 0.01
                              else 'todo apoyado en la cama, sin soportes'))

def caja(w, d, h, x, y, z):
    return fijar(gen.cubo(w, d, h, x, y, z))


def soporte_anterior():
    return gen.agrupar(gen.cubo(32, 18, 20), huecos=[gen.cubo(23.4, 12.8, 18, 0, 0, 2)])


def bisagra_anterior():
    return gen.agrupar(gen.cubo(30, 20, 3), [gen.cilindro_x(3, 30, 0, 10, 0)], [gen.cilindro_x(1.5, 40, 0, 10, 0)])


def unir(objs):
    for o in objs[1:]:
        gen.agrupar(objs[0], [o])
    return objs[0]


for nombre, crear_s, crear_b, eje_z, r_agujero in (('anterior', soporte_anterior, bisagra_anterior, 0.0, 1.5),
                                                     ('nuevo', gen.soporte_servo, gen.bisagra, 3.5, 1.75)):
    limpiar()
    sop = fijar(crear_s())
    # SG90 parado en el hueco, pestañas sobre el borde de arriba (z 10): cara de abajo a z −5.9; cable por la punta de +X
    fondo = 10 - 15.9
    servo = unir([caja(22.5, 11.8, 22.7, 0, 0, fondo + 11.35), caja(31.9, 11.8, 2.5, 0, 0, 10 + 1.25)])
    cable = unir([caja(4, 3.6, 1.2, 11.25 + 2, 0, fondo + 4.5), caja(1.2, 3.6, 30, 11.25 + 3.4, 0, fondo + 4.5 + 15)])
    print(f'--- Soporte del servo {nombre}: servo {choque(servo, sop):.1f} mm³ · cable {choque(cable, sop):.1f} mm³ '
          f'(entre la punta del servo y la pared quedan {(23.4 - 22.5) / 2:.2f} mm; el cable plano mide 1,2)')
    limpiar()
    hoja = fijar(crear_b())
    vs = [v.co for v in hoja.data.vertices]
    abajo = min(v.z for v in vs)
    placa = min(v.z for v in vs if v.y < 5)
    print(f'--- Bisagra {nombre}: la hoja empieza a {placa - abajo:.1f} mm de la cama'
          + (' (necesita soportes y no se pega plana)' if placa - abajo > 0.01 else ' (sin soportes y se pega plana)')
          + f' · pared del nudillo de {(3.5 if nombre == "nuevo" else 3) - r_agujero:.2f} mm')
    for d in (2.5, 3.0):
        hueco_impreso = 2 * r_agujero - 0.3
        print(f'  Palito de {d} mm en el agujero de {2 * r_agujero:.1f} (impreso, unos {hueco_impreso:.1f}): '
              + ('gira' if hueco_impreso - d >= 0.2 else 'muy justo' if hueco_impreso >= d else 'no entra'))
    # Dos hojas una al lado de la otra: la del techo (cuerpo hacia −Y) y la de la ventana (cuerpo hacia +Y), abierta 70°
    a_ = fijar(crear_b())
    gen.bpy.ops.object.select_all(action='DESELECT')
    for v in a_.data.vertices:
        v.co.x -= 15; v.co.y -= 10
    b_ = fijar(crear_b())
    import math as _m
    for v in b_.data.vertices:
        x, y, z = v.co.x, v.co.y, v.co.z
        x, y = -x + 15, -y + 10                                 # girada media vuelta: cuerpo hacia +Y, nudillo en Y 0
        dz = z - eje_z
        ang = _m.radians(70)
        v.co.x, v.co.y, v.co.z = x, y * _m.cos(ang) - dz * _m.sin(ang), eje_z + y * _m.sin(ang) + dz * _m.cos(ang)
    print(f'  Ventana abierta 70°: las dos hojas chocan {choque(a_, b_):.1f} mm³')

# Imagen: el clip nuevo pegado en una pared con la manguera de 8 mm parada
limpiar()
c = fijar(gen.clip())
for v in c.data.vertices:
    v.co.z += 60
pared = fijar(gen.cubo(80, 3, 120, 0, -10, 40))
m = manguera(8)
for v in m.data.vertices:
    v.co.z = v.co.z * 3 + 50
for o, color in ((c, (0.3, 0.75, 0.35, 1)), (pared, (0.85, 0.85, 0.9, 1)), (m, (0.9, 0.9, 1.0, 1))):
    o.color = color
esc = bpy.context.scene
esc.render.engine = 'BLENDER_WORKBENCH'
esc.display.shading.color_type = 'OBJECT'
esc.display.shading.show_cavity = True
esc.render.resolution_x, esc.render.resolution_y = 1000, 900
bpy.ops.object.camera_add(location=(70, 90, 110))
cam = bpy.context.object
cam.data.lens = 50
cam.rotation_euler = (Vector((0, 0, 58)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
esc.camera = cam
esc.render.filepath = os.path.join(SALIDA, 'invernadero_clip.png')
bpy.ops.render.render(write_still=True)

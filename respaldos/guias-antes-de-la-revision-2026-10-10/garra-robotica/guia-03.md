---
titulo: Planear y modelar el brazo
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Planear y modelar el brazo

## Objetivo del día

Planear cómo funcionará la garra con un diagrama de flujo, repartir el trabajo de las próximas semanas y modelar en Blender el **plato giratorio** y los dos **eslabones** del brazo.

**Al terminar tendremos:** diagrama de flujo, cronograma del equipo y tres piezas exportadas en STL para imprimir.

## Materiales del equipo

- Bitácora, lápiz y regla
- Boceto de la garra (guía 2)
- Computadora con Blender y el archivo de la base del equipo

## Parte 1 · Repaso rápido (10 min)

Recuerden las herramientas de Blender del sábado pasado: cubo, cilindro, panel N, modificador Booleano y Ctrl + J. Hoy las usaremos para tres piezas más.

:::pregunta id="g3-p1"
¿Qué hace el modificador Booleano en modo Diferencia?
:::

## Parte 2 · Diagrama de flujo (15 min)

Un diagrama de flujo muestra los pasos que seguirá el programa. Completa los recuadros vacíos del diagrama de la garra:

[IMAGEN 3.1: plantilla del diagrama de flujo con recuadros vacíos: Inicio → ¿Botón presionado? → Sí: ______ / No: ______ → ______ → repetir]

:::animacion tipo="diagrama-flujo" programa="garra" ocultar="si"
:::

Palabras para usar: *Leer las 4 perillas* · *Rutina automática* · *Mover los 4 servos*

| Recuadro | ¿Qué va ahí? |
| --- | --- |
| Si el botón está presionado | |
| Si el botón no está presionado | |
| Después de leer las perillas | |

Cópialo completo en tu bitácora.

## Parte 3 · Cronograma del equipo (10 min)

| Sábado | Tarea principal | Responsable |
| --- | --- | --- |
| 4 | Modelar la pinza y montar la base | |
| 5 | Circuito de perillas y servos | |
| 6 | Montar la pinza y probar | |
| 7 | Rutina automática y documentación | |
| 8 | Practicar el reto y el guion | |

## Parte 4 · Modelando las piezas del brazo (70 min)

Las tres piezas usan la misma técnica de la base: un cubo o cilindro al que le restamos huecos con Booleanos. Abre el archivo de tu base y trabaja al lado de ella.

### Pieza A · Plato giratorio con soporte (25 min)

Va sobre el servo de la base. Encima lleva una pared donde se atornilla el servo del hombro, acostado.

1. **Plato:** cilindro con Dimensiones X = 40, Y = 40, Z = 4.
2. **Agujero central** para el tornillo del brazo del servo: cilindro de X = 2.2, Y = 2.2, Z = 10, restado con Booleano.
3. **Pared de soporte:** cubo de X = 40, Y = 4, Z = 30, con Ubicación Z = 17 (queda parada sobre el plato).
4. **Ventana del servo en la pared:** cubo de X = 23.4, Y = 10, Z = 12.8, con Ubicación Z = 18. Réstalo con Booleano.
5. **Agujeros de las pestañas:** dos cilindros de 2 mm acostados (gira 90° en X), en X = 13.75 y X = −13.75, a la altura de la ventana. Réstalos.
6. Une plato y pared con Ctrl + J.

[IMAGEN 3.2: plato giratorio con su pared de soporte y la ventana del servo]

### Pieza B · Eslabón del hombro (25 min)

Une el servo del hombro con el servo del codo.

1. Cubo de X = 100, Y = 20, Z = 4.
2. **Agujero del eje** en un extremo: cilindro de 2.2 mm en X = −42, restado.
3. **Ventana del servo del codo** en el otro extremo: cubo de X = 23.4, Y = 12.8, Z = 10 en X = 30, restado.
4. **Agujeros de las pestañas:** cilindros de 2 mm en X = 30 ± 13.75 (o sea, X = 16.25 y X = 43.75), restados.

[IMAGEN 3.3: eslabón del hombro con el agujero del eje y la ventana del servo]

### Pieza C · Eslabón del codo (15 min)

Es igual al del hombro pero más corto: une el codo con la pinza.

1. Duplica el eslabón del hombro (Shift + D) y muévelo a un lado.
2. Cambia sus Dimensiones a X = 85, Y = 16. Revisa que la ventana y los agujeros sigan en su lugar; si se movieron, ajústalos.

**Atajo inteligente:** reutilizar una pieza y cambiar sus medidas ahorra mucho tiempo. Los ingenieros lo hacen todo el tiempo.

### Exportar (5 min)

Exporta cada pieza por separado (Archivo → Exportar → STL con "Solo selección"):

- `equipo_NOMBRE_plato.stl`
- `equipo_NOMBRE_hombro.stl`
- `equipo_NOMBRE_codo.stl`

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el diagrama de flujo.
- [ ] Llenamos el cronograma con responsables.
- [ ] Modelamos el plato con su soporte.
- [ ] Modelamos los dos eslabones.
- [ ] Exportamos las tres piezas en STL.
:::

## Reto extra

Redondea las esquinas de los eslabones con el modificador **Bevel** (Biselar), ancho 2 mm. Se ven más profesionales y son más resistentes.

## Bitácora (10 min)

:::foto id="g3-diagrama"
Foto del diagrama de flujo del equipo.
:::

:::pregunta id="g3-b1"
¿Por qué el eslabón del codo es más corto que el del hombro? (Pista: palanca y peso.)
:::

:::pregunta id="g3-b2"
¿Qué pieza fue la más difícil de modelar?
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir plato y eslabones esta semana; se montan el sábado 5.
- Revisar en el programa de impresión que las piezas midan lo correcto (si salen diminutas, la escala de exportación está mal).
- Los equipos más lentos pueden usar las piezas de referencia y dedicar el tiempo al reto extra la próxima semana.
- Tiempo total: 10 + 15 + 10 + 70 + 5 + 10 = 120 minutos.
:::

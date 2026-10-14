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
- Computadora con Blender y el archivo de la base del equipo (`equipo_NOMBRE_base.blend`). Si les toca otra computadora, descárguenlo del recuadro "Archivo de trabajo" de la Guía 2 o de la sección "Archivos del equipo" en la página del proyecto.

## Parte 1 · Repaso rápido (10 min)

Recuerden las herramientas de Blender del sábado pasado: cubo, cilindro, panel N, modificador Booleana y Ctrl + J. Hoy las usaremos para tres piezas más.

:::pregunta id="g3-p1"
¿Qué hace el modificador Booleana en modo Diferencia?
:::

## Parte 2 · Diagrama de flujo (15 min)

Un diagrama de flujo muestra los pasos que seguirá el programa, en orden, con flechas. Los rombos son **preguntas** (el camino se divide en Sí y No) y los rectángulos son **acciones**. Completa los recuadros vacíos del diagrama de la garra:

[IMAGEN 3.1: plantilla del diagrama de flujo con recuadros vacíos: Inicio → ¿Botón presionado? → Sí: ______ / No: ______ → ______ → repetir]

:::animacion tipo="diagrama-flujo" programa="garra" ocultar="si"
:::

Palabras para usar: *Leer las 4 perillas* · *Rutina automática* · *Mover los 4 servos*

1. Lean las tres palabras de arriba.
2. Piensen qué debe hacer la garra **si alguien presiona el botón** y qué debe hacer **si nadie lo presiona**.
3. Escriban cada palabra en la fila que le corresponde de la tabla:

| Recuadro | ¿Qué va ahí? |
| --- | --- |
| Si el botón está presionado | |
| Si el botón no está presionado | |
| Después de leer las perillas | |

4. Cópialo completo en tu bitácora: dibuja las formas, las flechas y escribe las palabras dentro.

## Parte 3 · Cronograma del equipo (10 min)

Un cronograma dice **qué** haremos, **cuándo** y **quién** es responsable. Repartan las tareas: escriban en cada fila el nombre de quien se asegurará de que esa tarea salga (no la hace solo: el equipo ayuda).

| Sábado | Tarea principal | Responsable |
| --- | --- | --- |
| 4 | Modelar la pinza y montar la base | |
| 5 | Circuito de perillas y servos | |
| 6 | Montar la pinza y probar | |
| 7 | Rutina automática y documentación | |
| 8 | Practicar el reto y el guion | |

## Parte 4 · Modelando las piezas del brazo (70 min)

Las tres piezas usan la misma técnica de la base: un cubo o cilindro al que le restamos huecos con modificadores Booleana.

**Preparar el archivo:**

1. Abre Blender y abre tu base: **Archivo → Abrir →** `equipo_NOMBRE_base.blend`.
2. Guárdalo con otro nombre para no tocar la base: **Archivo → Guardar como →** `equipo_NOMBRE_brazo.blend`. Así el archivo ya está en milímetros.
3. Selecciona la base y ocúltala con **H**, para que no estorbe. (El servo gris puede quedarse a la vista: no se exporta.)

**Recordatorio de cómo restar con el modificador Booleana** (lo usarás muchas veces hoy):
selecciona la pieza → **llave inglesa azul** en Propiedades → **Agregar modificador → Generar → Booleana** → **Diferencia** → en **Objeto** elige el cortador → flechita **⌄ → Aplicar** → borra el cortador (clic derecho sobre su nombre en el Listado → **Borrar**).

Las medidas se escriben en el **Panel N** (tecla N), pestaña **Elemento**. Cuando no se indique una Posición, deja la que trae (X = 0, Y = 0, Z = 0). Ponle nombre a cada objeto en el Listado (doble clic sobre su nombre): así no te confundes al elegir el cortador.

### Pieza A · Plato giratorio con soporte (25 min)

Va sobre el servo de la base. Encima lleva una pared donde se atornilla el servo del hombro, acostado.

1. **Plato:** **Shift + A → Malla → Cilindro**, con Dimensiones X = 40, Y = 40, Z = 4. Llámalo `plato_giro`.
2. **Agujero central** para el tornillo del brazo del servo: otro cilindro de X = 2.2, Y = 2.2, Z = 10. Réstalo al `plato_giro` con el modificador Booleana.
3. **Pared de soporte:** **Shift + A → Malla → Cubo**, con Dimensiones X = 40, Y = 4, Z = 30 y Posición Z = 17 (queda parada sobre el plato). Llámala `pared`.
4. **Ventana del servo en la pared:** cubo de X = 23.4, Y = 10, Z = 12.8, con Posición Z = 18. Réstalo a la `pared` con el modificador Booleana.
5. **Agujeros de las pestañas:**
   - Agrega un cilindro con Dimensiones X = 2, Y = 2, Z = 10.
   - Acuéstalo: en el Panel N escribe Rotación X = 90. Ahora atraviesa la pared de adelante hacia atrás.
   - Escribe su Posición: X = 13.75, Y = 0, Z = 18 (a la altura de la ventana).
   - Duplícalo (**Shift + D** y clic derecho) y cambia la X de la copia a **−13.75**.
   - Junta los dos cilindros con **Ctrl + J** y réstalos a la `pared` con el modificador Booleana.
6. **Une plato y pared:** haz clic en la `pared`, **Shift + clic** en el `plato_giro` y presiona **Ctrl + J**.
7. **Muévelo a un lado** para que no estorbe la siguiente pieza: con la pieza seleccionada escribe Posición **Y = 80**.

[IMAGEN 3.2: plato giratorio con su pared de soporte y la ventana del servo]

**✔ Revisa:** gira la vista. La pared debe estar parada sobre el plato, con una ventana rectangular y un agujero a cada lado.

### Pieza B · Eslabón del hombro (25 min)

Une el servo del hombro con el servo del codo. Es una barra plana con un agujero en una punta y la ventana de un servo en la otra.

1. **Barra:** cubo de X = 100, Y = 20, Z = 4. Llámalo `hombro`.
2. **Agujero del eje** en un extremo: cilindro de X = 2.2, Y = 2.2, Z = 10 con Posición X = −42. Réstalo al `hombro`.
3. **Ventana del servo del codo** en el otro extremo: cubo de X = 23.4, Y = 12.8, Z = 10 con Posición X = 30. Réstalo.
4. **Agujeros de las pestañas:** dos cilindros de X = 2, Y = 2, Z = 10 (parados, sin girar), uno en X = 16.25 y otro en X = 43.75. Son 13.75 mm a cada lado del centro de la ventana (30 − 13.75 y 30 + 13.75). Júntalos con Ctrl + J y réstalos.
5. **Muévelo a un lado:** Posición **Y = −80**.

[IMAGEN 3.3: eslabón del hombro con el agujero del eje y la ventana del servo]

### Pieza C · Eslabón del codo (15 min)

Es igual al del hombro pero más corto y un poco más angosto: une el codo con la pinza. Se hace con **los mismos pasos** que la pieza B; solo cambian los números.

**Ojo:** no lo hagas duplicando el eslabón del hombro y cambiando sus Dimensiones. Blender estiraría o encogería toda la pieza, también la ventana y los agujeros, y el servo ya no entraría.

1. **Barra:** cubo de X = 85, Y = 16, Z = 4. Llámalo `codo`.
2. **Agujero del eje:** cilindro de X = 2.2, Y = 2.2, Z = 10 con Posición X = −34.5 (a 8 mm del borde, igual que en el hombro). Réstalo.
3. **Ventana del servo:** cubo de X = 23.4, Y = 12.8, Z = 10 con Posición X = 22.5 (a 20 mm del otro borde, igual que en el hombro). Réstalo.
4. **Agujeros de las pestañas:** cilindros de X = 2, Y = 2, Z = 10 en X = 8.75 y X = 36.25 (22.5 − 13.75 y 22.5 + 13.75). Júntalos y réstalos.

**Atajo inteligente:** reutilizar una pieza y cambiar sus medidas ahorra mucho tiempo. Los ingenieros lo hacen todo el tiempo. Aquí reutilizamos el **procedimiento** (los mismos pasos) con medidas nuevas.

### Exportar (5 min)

Exporta cada pieza por separado. Para cada una:

1. En el Listado, haz clic **solo** en el nombre de la pieza.
2. **Archivo → Exportar → STL (.stl)**, activa **Sólo lo seleccionado** a la derecha.
3. Escribe su nombre y presiona **Exportar STL**:

- `equipo_NOMBRE_plato.stl`
- `equipo_NOMBRE_hombro.stl`
- `equipo_NOMBRE_codo.stl`

Al final, guarda el archivo con **Ctrl + S**.

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el diagrama de flujo.
- [ ] Llenamos el cronograma con responsables.
- [ ] Modelamos el plato con su soporte.
- [ ] Modelamos los dos eslabones.
- [ ] Exportamos las tres piezas en STL.
:::

## Reto extra

Redondea las esquinas de los eslabones con el modificador **Biselar** (Bevel), ancho 2 mm. Se ven más profesionales y son más resistentes.

Cómo: selecciona el eslabón → llave inglesa → **Agregar modificador → Generar → Biselar** → en **Cantidad** escribe 2 → Aplicar. Hazlo después de aplicar todos los modificadores Booleana, y vuelve a exportar el STL.

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

Antes de irse, guarden juntos `equipo_NOMBRE_brazo.blend` y los tres `.stl` en un `.zip`: selecciónenlos en la carpeta, hagan clic derecho → **Comprimir en archivo ZIP** (en algunas computadoras: **Enviar a → Carpeta comprimida**). Suban ese `.zip` en el recuadro de abajo.

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir plato y eslabones esta semana; se montan el sábado 5.
- Revisar en el programa de impresión que las piezas midan lo correcto (si salen diminutas, la escala de exportación está mal).
- Los equipos más lentos pueden usar las piezas de referencia y dedicar el tiempo al reto extra la próxima semana.
- Tiempo total: 10 + 15 + 10 + 70 + 5 + 10 = 120 minutos.
:::

---
titulo: Planear y modelar el brazo
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Planear y modelar el brazo

## Objetivo del día

Planear cómo funcionará la garra con un diagrama de flujo, repartir el trabajo de las próximas semanas y modelar en Tinkercad el **plato giratorio** y los dos **eslabones** del brazo.

**Al terminar tendremos:** diagrama de flujo, cronograma del equipo y tres piezas exportadas en STL para imprimir.

## Materiales del equipo

- Bitácora, lápiz y regla
- Boceto de la garra (guía 2)
- Computadora con internet y la cuenta de Tinkercad del equipo (con el diseño de la base de la Guía 2).

## Parte 1 · Repaso rápido (10 min)

Recuerden los bloques de Tinkercad del sábado pasado: Cubo, Cilindro, Mover, el círculo rayado (hueco) y Seleccionar todo + Group Selection. Hoy los usaremos para tres piezas más.

:::pregunta id="g3-p1"
¿Qué le pasa a una forma marcada como hueco cuando agrupamos?
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

Las tres piezas usan la misma técnica de la base: un cubo o cilindro al que le restamos formas **huecas** al agrupar.

**Cada pieza va en su propio diseño**, porque al exportar se guarda todo lo que hay en el diseño. Para cada una: **+ Crear → Codeblocks** y cámbienle el nombre (clic sobre el nombre inventado de arriba a la izquierda).

**Recordatorio:**

- Cada forma nace **centrada** en X = 0, Y = 0, Z = 0. **Mover** mueve la última forma que agregaste. Cuando no se indique un Mover, no lo pongas: la forma se queda en el centro.
- Un **hueco** se marca con el **círculo rayado** (el círculo de color se pone gris).
- Al final de cada pieza: **Seleccionar todo** y **Group Selection**. Ahí se restan los huecos.
- **Girar alrededor** (de Modificar) gira la última forma desde su centro.

### Pieza A · Plato giratorio con soporte (25 min)

Va sobre el servo de la base. Encima lleva una pared donde se atornilla el servo del hombro, acostado. Diseño: `equipo_NOMBRE_plato`.

1. **Plato:** un **Cilindro** con **Radio = 20** (40 ÷ 2), **A = 4**, **Lados = 64**.
2. **Agujero central** para el tornillo del brazo del servo: un **Cilindro** hueco con **Radio = 1.1** (2.2 ÷ 2), **A = 10**, **Lados = 16**.
3. **Pared de soporte:** un **Cubo** con primer **A = 40**, **L = 4**, segundo **A = 30**, **arista = 0** y **Mover: X 0, Y 0, Z 17** (queda parada sobre el plato).
4. **Ventana del servo en la pared:** un **Cubo** hueco con primer **A = 23.4**, **L = 10**, segundo **A = 12.8** y **Mover: X 0, Y 0, Z 18**.
5. **Agujeros de las pestañas:**
   - Un **Cilindro** hueco con **Radio = 1**, **A = 10**, **Lados = 16**.
   - **Acostarlo:** debajo, **Girar alrededor** con **Eje x** y **90** grados. Ahora atraviesa la pared de adelante hacia atrás.
   - Debajo, **Mover: X 13.75, Y 0, Z 18** (a la altura de la ventana).
   - Otro igual (Cilindro hueco, Girar alrededor Eje x 90) con **Mover: X −13.75, Y 0, Z 18**.
6. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.

[IMAGEN 3.2T: plato giratorio con su pared de soporte y la ventana del servo en Tinkercad Codeblocks]

**✔ Revisa:** gira la vista. La pared debe estar parada sobre el plato, con una ventana rectangular y un agujero a cada lado.

### Pieza B · Eslabón del hombro (25 min)

Une el servo del hombro con el servo del codo. Es una barra plana con un agujero en una punta y la ventana de un servo en la otra. Diseño: `equipo_NOMBRE_hombro`.

1. **Barra:** un **Cubo** con primer **A = 100**, **L = 20**, segundo **A = 4**, **arista = 0**.
2. **Agujero del eje** en un extremo: un **Cilindro** hueco con **Radio = 1.1**, **A = 10** y **Mover: X −42, Y 0, Z 0**.
3. **Ventana del servo del codo** en el otro extremo: un **Cubo** hueco con primer **A = 23.4**, **L = 12.8**, segundo **A = 10** y **Mover: X 30, Y 0, Z 0**.
4. **Agujeros de las pestañas:** dos **Cilindros** huecos con **Radio = 1**, **A = 10** (parados, sin girar), uno con **Mover X 16.25** y otro con **Mover X 43.75** (Y 0, Z 0). Son 13.75 mm a cada lado del centro de la ventana (30 − 13.75 y 30 + 13.75).
5. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.

[IMAGEN 3.3T: eslabón del hombro con el agujero del eje y la ventana del servo en Tinkercad Codeblocks]

### Pieza C · Eslabón del codo (15 min)

Es igual al del hombro pero más corto y un poco más angosto: une el codo con la pinza. Diseño: `equipo_NOMBRE_codo`. Se hace con **los mismos bloques** que la pieza B; solo cambian los números.

**Ojo:** no lo hagas con **Definir tamaño** sobre el eslabón del hombro. Ese bloque estira o encoge toda la pieza, también la ventana y los agujeros, y el servo ya no entraría.

1. **Barra:** un **Cubo** con primer **A = 85**, **L = 16**, segundo **A = 4**, **arista = 0**.
2. **Agujero del eje:** **Cilindro** hueco con **Radio = 1.1**, **A = 10** y **Mover X −34.5** (a 8 mm del borde, igual que en el hombro).
3. **Ventana del servo:** **Cubo** hueco con primer **A = 23.4**, **L = 12.8**, segundo **A = 10** y **Mover X 22.5** (a 20 mm del otro borde, igual que en el hombro).
4. **Agujeros de las pestañas:** **Cilindros** huecos con **Radio = 1**, **A = 10** en **X = 8.75** y **X = 36.25** (22.5 − 13.75 y 22.5 + 13.75).
5. **Agrupar:** **Seleccionar todo** y **Group Selection**.

**Atajo inteligente:** reutilizar una pieza y cambiar sus medidas ahorra mucho tiempo. Los ingenieros lo hacen todo el tiempo. Aquí reutilizamos el **procedimiento** (los mismos bloques) con medidas nuevas.

### Exportar (5 min)

Exporta cada pieza desde su diseño. En cada uno: **Compartir** → en **Descargar un archivo**, toca **.STL**, y cámbiale el nombre si hace falta:

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

Redondea las esquinas de los eslabones con la **arista** del Cubo de la barra. Se ven más profesionales y son más resistentes.

Cómo: en el diseño del eslabón, toca la **›** del Cubo de la barra y cambia **arista** de 0 a 1 (prueben también 2). Ejecuta con **▷**, mira cómo cambian los bordes y vuelve a exportar el STL.

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

Antes de irse, guarden juntos los tres `.stl` en un `.zip`: selecciónenlos en la carpeta, hagan clic derecho → **Comprimir en archivo ZIP** (en algunas computadoras: **Enviar a → Carpeta comprimida**). Suban ese `.zip` en el recuadro de abajo.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí los .stl que exportaron (o el .zip). Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir plato y eslabones esta semana; se montan el sábado 5.
- Revisar en el programa de impresión que las piezas midan lo correcto.
- **Versión Tinkercad (Codeblocks):** cada pieza va en su propio diseño (plato, hombro, codo), con las mismas medidas que la versión Blender.
- Los equipos más lentos pueden usar las piezas de referencia y dedicar el tiempo al reto extra la próxima semana.
- Tiempo total: 10 + 15 + 10 + 70 + 5 + 10 = 120 minutos.
:::

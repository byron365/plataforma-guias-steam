---
titulo: Embudo y compuerta
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Embudo y compuerta

## Objetivo del día

Planificar el programa con un diagrama de flujo y modelar el embudo y la compuerta en Tinkercad Codeblocks.

**Al terminar tendremos:** el diagrama de flujo, el embudo y la compuerta exportados en STL y el cronograma del equipo.

## Materiales del equipo

- Bitácora
- Computadora con internet y la cuenta de Tinkercad del sábado 2
- Botella del depósito

Si les toca otra computadora, no pasa nada: entren a Tinkercad con la misma cuenta y sus diseños estarán en **Diseños → Codeblocks**.

## Parte 1 · Diagrama de flujo (20 min)

Un diagrama de flujo muestra, con figuras y flechas, los pasos que seguirá el programa. Cada figura tiene un significado:

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción |
| Rombo | Una pregunta Sí / No |

Completen los pasos que faltan de **SERVIR** (b, c y e). Pueden revisar el programa de la Guía 1 para recordar qué hacía el dispensador al presionar el botón.

:::tabla id="g3-flujo"
| Paso | ¿Qué hace el dispensador? |
| --- | --- |
| 1 | ¿Ya pasó el tiempo de la siguiente comida? Sí → ir a SERVIR |
| 2 | ¿Se presionó el botón? Sí → ir a SERVIR |
| 3 | Volver al paso 1 |
| SERVIR a | Sonar el buzzer para llamar a la mascota |
| SERVIR b | ______ |
| SERVIR c | ______ |
| SERVIR d | Esperar según la porción |
| SERVIR e | ______ |
:::

:::animacion tipo="diagrama-flujo" programa="dispensador" ocultar="si"
:::

Dibuja el diagrama en la bitácora: un óvalo de Inicio, rombos para las preguntas de los pasos 1 y 2 (con sus flechas Sí y No) y rectángulos para cada acción de SERVIR, unidos con flechas.

## Parte 2 · El embudo (35 min)

Un embudo con paredes **empinadas** deja caer la comida; uno muy plano se atasca.

Cada pieza va en su **propio diseño** de Codeblocks, porque al exportar se guarda todo lo que hay en el diseño.

1. Crea un diseño nuevo para el embudo.
   - En Tinkercad: **+ Crear → Codeblocks**.
   - Haz clic en el nombre de arriba a la izquierda, bórralo y escribe `equipo_NOMBRE_embudo`. **Enter**.
2. **El cono de afuera:** un Cono que abajo mide 25 mm (la salida) y arriba 80 mm (la entrada), de 50 mm de alto.
   - De **Formas**, arrastra el bloque **Cono** al área de programa y toca su flecha **›**.
   - El cono pide **radios**: el radio es la **mitad** del ancho. Escribe **Radio superior = 40** (80 ÷ 2), **Radio inferior = 12.5** (25 ÷ 2), **A = 50** (alto) y **Lados = 32** (más lados = más redondo).
3. **El hueco del cono:** otro Cono un poco más chico, marcado como hueco, para que las paredes queden de unos 2 mm.
   - Arrastra otro **Cono** y suéltalo justo debajo del primero.
   - Toca su **›** y escribe **Radio superior = 38.5**, **Radio inferior = 10**, **A = 52**, **Lados = 32**.
   - Toca su **círculo rayado** para marcarlo como **hueco** (el círculo de color se pone gris).
   - Es 2 mm más alto que el de afuera. Como las formas nacen centradas, le sobra 1 mm arriba y 1 mm abajo: así atraviesa el embudo completo. No hace falta moverlo.
4. **Agrupar** para que el hueco se reste.
   - De **Modificar**, arrastra **Seleccionar todo** y debajo **Group Selection**.
   - Ejecuta con **▷**. **✔ Revisa:** gira la vista 3D y mira desde arriba: debes ver el embudo hueco, con agujero arriba y abajo.
5. **Cuello:** arriba del embudo va una tapa con un tubo corto donde entra la botella boca abajo.
   - Mide con la regla o el calibrador el diámetro **de afuera** de la boca de tu botella (la parte con rosca). En el ejemplo mide 28 mm.
   - Calcula: **hueco del cuello** = boca + 1 mm (en el ejemplo, 29 mm). **Cuello** = hueco + 4 mm (en el ejemplo, 33 mm: paredes de 2 mm).
   - Como Tinkercad pide **radios**, divide entre 2: en el ejemplo, radio del hueco **14.5** y radio del cuello **16.5**.

Estos bloques van **debajo** de Group Selection, en este orden:

   - **Tapa:** **Cilindro** con **Radio = 40**, **A = 3**, **Lados = 32**, **arista = 0**. Debajo, **Mover: X 0, Y 0, Z 26.5** (el embudo llega hasta 25 mm de alto: la tapa queda apoyada sobre su boca ancha).
   - **Cuello:** **Cilindro** con el radio del cuello (en el ejemplo **16.5**), **A = 15**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 35.5** (queda parado sobre la tapa).
   - **Hueco del cuello:** **Cilindro** con el radio del hueco (en el ejemplo **14.5**), **A = 40**, **Lados = 32**, marcado como **hueco** (círculo rayado). Debajo, **Mover: X 0, Y 0, Z 30** (atraviesa la tapa y el cuello).
   - Al final, otra vez **Seleccionar todo** y **Group Selection**.

6. Ejecuta con **▷**. **✔ Revisa:** el cuello debe verse como un anillo (hueco por dentro).

[IMAGEN 3.1T: embudo hueco en Tinkercad Codeblocks con el cuello para la botella]

Muevan la animación para ver cómo cambia la caída de la comida según la inclinación de la pared:

:::animacion tipo="embudo-angulo"
:::

:::pregunta id="g3-p1"
¿Por qué la salida del embudo (25 mm) debe ser más grande que una croqueta?
:::

7. Exporta `equipo_NOMBRE_embudo.stl`.
   - **Compartir** → en **Descargar un archivo**, toca **.STL**. Queda en la carpeta **Descargas**.
   - Si no se llama `equipo_NOMBRE_embudo.stl`, cámbiale el nombre (clic derecho → **Cambiar nombre**).

## Parte 3 · La compuerta (25 min)

1. Crea otro diseño: **+ Crear → Codeblocks** y llámalo `equipo_NOMBRE_compuerta`.
2. **Paleta:** un Cubo de 40 × 30 × 3 mm. Tapa la salida del embudo por completo.
   - Arrastra un **Cubo**, toca su **›** y escribe: primer **A = 40** (ancho), **L = 30** (largo), segundo **A = 3** (alto), **arista = 0**.
   - Mide 40 × 30 mm: más que la salida de 25 mm, por eso la tapa toda.
3. **Encastre:** en un extremo de la paleta, un cilindro de 8 mm de diámetro y 5 mm de alto, parado encima.
   - Debajo del Cubo, un **Cilindro** con **Radio = 4** (8 ÷ 2), **A = 5**, **Lados = 32**, **arista = 0**.
   - Debajo, **Mover: X −16, Y 0, Z 4**. Así queda cerca de una punta (X = −16) y parado encima de la paleta.
4. **Agujero del encastre:** un cilindro de **5 mm** de diámetro, marcado como hueco. Ahí entra el brazo del servo.
   - Debajo, otro **Cilindro** con **Radio = 2.5** (5 ÷ 2), **A = 6**, **Lados = 32**, marcado como **hueco** (círculo rayado).
   - Debajo, **Mover: X −16, Y 0, Z 4.5** (en el mismo lugar que el encastre). Empieza justo encima de la paleta, así la paleta no queda agujereada.
5. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** debes ver la paleta con un cilindro hueco en una punta.

[IMAGEN 3.2T: compuerta en Tinkercad Codeblocks: paleta con el encastre para el servo]

6. Exporta `equipo_NOMBRE_compuerta.stl`.
   - **Compartir** → **.STL**, y cámbiale el nombre si hace falta.

## Parte 4 · Cronograma (15 min)

Repartan quién será **responsable principal** de cada meta (no la hace solo: el equipo ayuda, pero esa persona se asegura de que salga). Escriban un nombre por fila.

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Estructura: depósito, embudo, base y compuerta | |
| 5 | Circuito completo y servido manual | |
| 6 | Medir gramos y corregir atascos | |
| 7 | Gráfica y documentación | |
| 8 | Porciones por tamaño, horario y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Completamos el diagrama de flujo.
- [ ] El embudo es hueco y tiene cuello.
- [ ] La compuerta tapa la salida.
- [ ] Exportamos las dos piezas.
- [ ] Tenemos cronograma.
:::

## Reto extra

Agrega al embudo una **pestaña** con dos agujeros para atornillarlo a la estructura.

Pista: en el diseño del embudo, antes del último **Seleccionar todo**, agrega un **Cubo** delgado (3 mm de alto) pegado al borde de la tapa (muévelo con **Mover**) y dos **Cilindros** de **Radio 1.5** marcados como **hueco** encima de él. Al agrupar, quedan los agujeros.

## Bitácora (20 min)

:::pregunta id="g3-b1"
¿Qué partes del diagrama de flujo son "manuales" y cuáles "automáticas"?
:::

:::pregunta id="g3-b2"
¿Qué fue lo más difícil de modelar el embudo?
:::

Antes de irse, guarden juntos en un `.zip` los dos `.stl` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. Los programas de bloques quedan guardados en Tinkercad.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí los .stl que exportaron (o el .zip). Sus diseños de bloques quedan guardados en Tinkercad: en cualquier computadora entran con la misma cuenta y los abren en **Diseños → Codeblocks**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Flujo: b encender el LED; c abrir la compuerta; e cerrar la compuerta y apagar el LED.
- Con esas medidas el ángulo de la pared es de unos 62° respecto a la horizontal: suficiente para croquetas.
- Imprimir esta semana embudo (≈2 h) y compuerta (≈15 min).
- Si la boca de la botella es muy variable, hacer el cuello de 30 mm y ajustar con cinta.
- **Versión Tinkercad (Codeblocks):** mismas piezas y medidas que la versión Blender, en tres diseños separados (soporte, embudo y compuerta). En Codeblocks las formas nacen centradas en el origen, igual que en Blender: por eso los números de Mover son las mismas Posiciones de la versión Blender (tapa Z = 26.5, cuello Z = 35.5).
- Si el embudo sale sólido: el cono hueco debe tener el círculo de color gris y el programa debe terminar con Seleccionar todo y Group Selection.
- Tiempo total: 20 + 35 + 25 + 15 + 5 + 20 = 120 minutos.
:::

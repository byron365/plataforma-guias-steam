---
titulo: Embudo y compuerta
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · Embudo y compuerta

## Objetivo del día

Planificar el programa con un diagrama de flujo y modelar el embudo y la compuerta en Blender.

**Al terminar tendremos:** el diagrama de flujo, el embudo y la compuerta exportados en STL y el cronograma del equipo.

## Materiales del equipo

- Bitácora
- Computadora con Blender y el archivo del sábado 2
- Botella del depósito

Si les toca otra computadora, descarguen `equipo_NOMBRE_dispensador.blend` del recuadro "Archivo de trabajo" de la Guía 2 (o de "Archivos del equipo", en la página del proyecto).

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

1. Abre `equipo_NOMBRE_dispensador.blend`.
   - Para que el soporte del servo no estorbe, selecciónalo y en el **Panel N** (tecla N) → **Elemento** cambia su Posición X a **100**.
2. **Shift + A → Malla → Cono.** En el panel que aparece:
   - Es el panel pequeño de abajo a la izquierda (si está cerrado, haz clic en su título). Escribe los valores enseguida, antes de hacer otra cosa, o el panel desaparece.
   - Vértices: **32**
   - Radio 1 (abajo): **12.5** (salida de 25 mm)
   - Radio 2 (arriba): **40** (entrada de 80 mm)
   - Profundidad: **50**
   - Llámalo `embudo` en el Listado (doble clic sobre su nombre).
3. **Hueco:** duplica el cono (**Shift + D**), y hazlo un poco más pequeño (**S 0.92**) y un poco más alto (**S Z 1.2**). Resta con el modificador **Booleana** en modo **Diferencia** y aplica. Ahora el embudo es hueco.
   - Con el `embudo` seleccionado, presiona **Shift + D** y enseguida **clic derecho** (la copia queda en el mismo lugar).
   - Con el mouse sobre la vista 3D, presiona **S**, escribe **0.92** y **Enter** (se achica un poco).
   - Presiona **S**, luego **Z**, escribe **1.2** y **Enter** (se estira hacia arriba y abajo, para que atraviese el embudo completo).
   - Llama a esta copia `hueco_embudo`.
   - Selecciona el `embudo` → **llave inglesa azul → Agregar modificador → Generar → Booleana** → **Diferencia** → Objeto: `hueco_embudo` → flechita **⌄ → Aplicar**.
   - Borra `hueco_embudo` (clic derecho sobre su nombre en el Listado → **Borrar**).
   - **✔ Revisa:** mira desde arriba (tecla **7** o bolita **Z**): debes ver un agujero arriba y otro abajo.
4. **Cuello:** cilindro de diámetro **igual a la boca de tu botella + 1 mm**, 15 mm de alto, hueco, arriba del embudo: ahí entra la botella boca abajo.
   - Mide con la regla o el calibrador el diámetro **de afuera** de la boca de tu botella (la parte con rosca). Por ejemplo, si mide 28 mm, el hueco del cuello será de 29 mm.
   - **Tapa** (para que el cuello quede unido al embudo): cilindro de X = 80, Y = 80, Z = 3, con Posición Z = 26.5. Queda apoyada sobre la boca ancha del embudo. Llámala `tapa`.
   - **Cuello:** cilindro de 4 mm más ancho que el hueco (paredes de 2 mm; en el ejemplo, X = 33, Y = 33), con Z = 15 y Posición Z = 35.5. Queda parado sobre la tapa. Llámalo `cuello`.
   - Une `cuello` y `tapa`: clic en uno, **Shift + clic** en el otro, **Ctrl + J**.
   - **Hueco del cuello:** cilindro del diámetro de la boca + 1 mm (en el ejemplo, X = 29, Y = 29), con Z = 40 y Posición Z = 30. Réstalo a la pieza del cuello con el modificador Booleana (Diferencia → Aplicar → borra el cortador).
   - Une el cuello con el embudo: clic en el cuello, **Shift + clic** en el `embudo`, **Ctrl + J**.

[IMAGEN 3.1: embudo hueco en Blender con el cuello para la botella]

Muevan la animación para ver cómo cambia la caída de la comida según la inclinación de la pared:

:::animacion tipo="embudo-angulo"
:::

:::pregunta id="g3-p1"
¿Por qué la salida del embudo (25 mm) debe ser más grande que una croqueta?
:::

5. Cuando termines el embudo, muévelo a un lado para que no estorbe: Posición X = **−100**.

## Parte 3 · La compuerta (25 min)

1. **Paleta:** cubo de X = 40, Y = 30, Z = 3. Tapa la salida del embudo por completo.
   - Llámala `paleta`. Mide 40 × 30 mm: más que la salida de 25 mm, por eso la tapa toda.
2. **Encastre:** en un extremo de la paleta, un cilindro de 8 mm de diámetro y 5 mm de alto. Réstale un cilindro de **5 mm** (ahí entra el brazo del servo).
   - Cilindro de X = 8, Y = 8, Z = 5, con Posición X = −16, Y = 0, Z = 4. Así queda parado encima de la paleta, cerca de una punta. Llámalo `encastre`.
   - Cortador: cilindro de X = 5, Y = 5, Z = 10 en la misma Posición (X = −16, Z = 4).
   - Réstalo al `encastre` con el modificador Booleana (Diferencia → Aplicar → borra el cortador).
3. Une todo (**Ctrl + J**).
   - Clic en el `encastre`, **Shift + clic** en la `paleta`, **Ctrl + J**.

[IMAGEN 3.2: compuerta en Blender: paleta con el encastre para el servo]

4. Exporta `equipo_NOMBRE_embudo.stl` y `equipo_NOMBRE_compuerta.stl`.
   - Para cada pieza: clic solo en ella en el Listado → **Archivo → Exportar → STL (.stl)** → activa **Sólo lo seleccionado** → escribe el nombre → **Exportar STL**.
   - Guarda el archivo de Blender con **Ctrl + S**.

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

Pista: un cubo delgado (3 mm de grueso) pegado al borde de la tapa, unido con Ctrl + J, y dos cilindros de 3 mm restados con el modificador Booleana.

## Bitácora (20 min)

:::pregunta id="g3-b1"
¿Qué partes del diagrama de flujo son "manuales" y cuáles "automáticas"?
:::

:::pregunta id="g3-b2"
¿Qué fue lo más difícil de modelar el embudo?
:::

Antes de irse, guarden juntos en un `.zip` el `.blend` y los dos `.stl` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí:

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Flujo: b encender el LED; c abrir la compuerta; e cerrar la compuerta y apagar el LED.
- Con esas medidas el ángulo de la pared es de unos 62° respecto a la horizontal: suficiente para croquetas.
- Imprimir esta semana embudo (≈2 h) y compuerta (≈15 min).
- Si la boca de la botella es muy variable, hacer el cuello de 30 mm y ajustar con cinta.
- Tiempo total: 20 + 35 + 25 + 15 + 5 + 20 = 120 minutos.
:::

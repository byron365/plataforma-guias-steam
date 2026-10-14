---
titulo: Nuestro dispensador, de portada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Nuestro dispensador, de portada

## Objetivo del día

Hacer el render final del dispensador en Blender, completar la bitácora y reflexionar sobre lo aprendido.

**Al terminar tendremos:** el render final, la bitácora completa y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con Blender
- Archivo `equipo_NOMBRE_dispensador.blend`
- Bitácora de todos los sábados

## Parte 1 · Render final (40 min)

Un **render** es una "foto" del modelo 3D con colores y luces. Recuerden: medidas en el **Panel N → Elemento**, color en la pestaña **Material** (esfera roja en Propiedades → **Nuevo** → **Color base**).

1. Abre el archivo del dispensador (ya tiene el soporte, el embudo y la compuerta).
   - Si están en otra computadora, descárguenlo del recuadro de la Guía 3 (o de "Archivos del equipo"). Si es un `.zip`: clic derecho → **Extraer todo**.
   - Guárdenlo como `equipo_NOMBRE_render.blend` para no cambiar el original.
   - Acomoden las piezas como en el dispensador real: en el Panel N regresen a **0** la Posición X del embudo y la compuerta, y pongan la compuerta y el soporte debajo de la salida del embudo (muévanlos con **G** y el eje, mirando de frente con la tecla **1**).
2. **Botella:** cilindro hueco transparente encima del embudo (Transmisión 1).
   - Agrega un cilindro del diámetro de tu botella, parado sobre el cuello del embudo. Para hacerlo hueco, réstale con el modificador Booleana otro cilindro 2 mm más angosto y más alto.
   - Dale un material **Nuevo** y, en la sección **Transmisión**, pon **Peso** en **1**.
   - Si la botella se ve negra o gris oscura, usa este truco: deja Transmisión en 0 y baja el valor de **Alfa** a **0.3**.
3. **Croquetas:** esferas pequeñas aplastadas (**S Z 0.6**) de color café dentro de la botella y en el plato. Usa **Shift + D** para hacer varias.
   - **Shift + A → Malla → Esfera**, con Dimensiones de unos 10 × 10 × 10 mm.
   - Aplástala: **S**, **Z**, **0.6**, **Enter**. Dale un material café.
   - Para cada croqueta nueva: **Shift + D**, mueve el mouse para colocarla y haz clic.
4. **Plato:** cilindro bajo con el centro hundido.
   - Cilindro ancho y bajo (por ejemplo, 120 × 120 × 15 mm) debajo de la salida.
   - Réstale con el modificador Booleana otro cilindro un poco más angosto y subido unos milímetros, para que quede como un plato con fondo.
5. **Base y paredes:** cubos con color de madera.
   - Un cubo plano para la base (250 × 200 mm, como la real) y dos cubos delgados y altos para las paredes de la torre.
   - Color café claro en su material.
6. Luz de **Sol**, cámara y **F12** (Eevee). Guarda `equipo_NOMBRE_final.png`.
   - Si no hay luz: **Shift + A → Luz → Sol**. Si no hay cámara: **Shift + A → Cámara**.
   - Gira la vista hasta que el dispensador se vea bien y presiona **Ctrl + Alt + 0** (sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**).
   - En Propiedades, pestaña **Procesamiento** (cámara trasera): Motor de procesamiento **EEVEE**.
   - **F12**, espera a que termine y en la ventana del render: **Imagen → Guardar como** → `equipo_NOMBRE_final.png`.

[IMAGEN 13.1: render final del dispensador con la botella transparente, croquetas cayendo y el plato]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 2 · Repaso de la bitácora (30 min)

Revisen la bitácora y las guías de la plataforma (cada guía guarda sus respuestas y fotos). Para cada grupo de sábados, escriban en una frase lo más importante que hicieron.

:::tabla id="g13-linea"
| Sábados | Lo más importante que hicimos |
| --- | --- |
| 1-3 | |
| 4-6 | |
| 7-9 | |
| 10-12 | |
:::

Ahora revisen y marquen. Si falta algo, complétenlo hoy:

:::checklist id="g13-bitacora"
- [ ] Todas las guías tienen sus preguntas respondidas.
- [ ] Están el experimento y la gráfica.
- [ ] El código final tiene comentarios y está guardado.
:::

## Parte 3 · Reflexión (30 min)

Respondan con sinceridad: no hay respuestas buenas o malas. Las preguntas individuales las responde cada quien desde su propia sesión.

:::pregunta id="g13-p1"
¿Cuál fue el problema más difícil del proyecto y cómo lo resolvimos?
:::

:::pregunta id="g13-p2" individual="si"
¿Qué aprendí en este proyecto que no sabía antes?
:::

:::pregunta id="g13-p3" individual="si"
¿Qué rol me gustó más y por qué?
:::

:::opciones id="g13-p4"
¿Cómo calificarías el proyecto?
- Muy divertido y aprendí mucho
- Divertido
- Normal
- Difícil, pero valió la pena
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Guardamos el render final.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Haz una **animación** de la compuerta abriéndose: fotograma clave de rotación en el fotograma 1 (cerrada) y 24 (abierta).

1. Abajo, en la línea de tiempo, pon el fotograma actual en **1**.
2. Selecciona la compuerta. En el Panel N, pon el mouse sobre los valores de **Rotación** y presiona **I** (se ponen amarillos: ya hay un fotograma clave).
3. Cambia al fotograma **24**, gira la compuerta (por ejemplo, **R**, el eje en que gira, **70**, **Enter**) y vuelve a presionar **I** sobre la Rotación.
4. Presiona **Espacio** para verla moverse. Espacio otra vez para detener.

## Bitácora (15 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro dispensador de comida?
:::

Antes de irse, suban `equipo_NOMBRE_render.blend` y el render `.png` dentro de un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- Si el material transparente se ve negro en Eevee, activar "Refracción de espacio de pantalla".
- Tiempo total: 40 + 30 + 30 + 5 + 15 = 120 minutos.
:::

---
titulo: La cosecha del proyecto
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · La cosecha del proyecto

## Objetivo del día

Hacer el render final del invernadero, cerrar el registro de las plantas, completar la bitácora y reflexionar.

**Al terminar tendremos:** el render final, el registro completo de las plantas y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con Blender
- Archivo `equipo_NOMBRE_invernadero.blend`
- Las dos macetas y la bitácora

## Parte 1 · Medición final de las plantas (15 min)

Midan con cuidado (regla parada en la tierra, hasta la punta más alta) y cuenten las hojas. En **Creció**, resten: altura final − altura del sábado 1 (que era 0, porque recién sembramos).

:::tabla id="g13-plantas"
| Maceta | Altura final (cm) | Número de hojas | Altura del sábado 1 (cm) | Creció (cm) |
| --- | --- | --- | --- | --- |
| Con sistema | | | 0 | |
| Control | | | 0 | |
:::

:::foto id="g13-foto-plantas"
Foto final de las dos plantas.
:::

## Parte 2 · Render final (40 min)

Un **render** es una "foto" del modelo 3D con colores y luces. Recuerden: medidas en el **Panel N → Elemento**; color en la pestaña **Material** (esfera roja en Propiedades → **Nuevo** → **Color base**).

1. Abre el archivo del invernadero (ya tiene el soporte, la bisagra y el clip).
   - Si están en otra computadora, descárguenlo del recuadro de la Guía 3 (o de "Archivos del equipo"); si es `.zip`, clic derecho → **Extraer todo**.
   - Guárdalo como `equipo_NOMBRE_render.blend` para no cambiar el original.
2. **Caja:** cubo con las medidas de tu caja. Dale un material **transparente**: Transmisión 1, Rugosidad 0.
   - Las medidas de la caja están en la Guía 2 (en cm: multiplíquenlas por 10 para tener mm).
   - En su material, en la sección **Transmisión**, pon **Peso** = 1, y **Rugosidad** = 0.
   - Si la caja se ve negra o gris oscura, usa este truco: Transmisión en 0 y **Alfa** en 0.3.
3. **Maceta:** cilindro café; **tierra:** disco oscuro encima.
   - La maceta: un cilindro dentro de la caja, apoyado en el fondo, con material café.
   - La tierra: un cilindro muy bajo (2 o 3 mm), un poco más angosto, encima de la maceta, de color café oscuro.
4. **Planta:** un cilindro verde delgado (tallo) y esferas aplastadas (**S Z 0.3**) como hojas.
   - Tallo: cilindro delgado y alto, parado sobre la tierra, verde.
   - Hojas: **Shift + A → Malla → Esfera**, aplástala (**S**, **Z**, **0.3**, **Enter**), dale color verde y colócala junto al tallo. Duplica con **Shift + D** para hacer varias.
5. **Ventana** abierta en el techo (rotada 30°).
   - Un cubo plano del tamaño de la ventana (80 × 60 mm, 2 mm de grueso), en el techo. Gíralo con **R**, el eje de la bisagra, **30**, **Enter**.
6. Luz de **Sol**, cámara y **F12** (Eevee). Guarda `equipo_NOMBRE_final.png`.
   - Si no hay luz: **Shift + A → Luz → Sol**. Si no hay cámara: **Shift + A → Cámara**.
   - Gira la vista hasta que se vea bien y presiona **Ctrl + Alt + 0** (sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**).
   - Pestaña **Procesamiento** (cámara trasera) en Propiedades: Motor de procesamiento **EEVEE**.
   - **F12**, espera a que termine y en la ventana del render: **Imagen → Guardar como** → `equipo_NOMBRE_final.png`.

[IMAGEN 13.1: render final del mini invernadero transparente con la planta, la maceta y la ventana abierta]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 3 · Repaso de la bitácora (25 min)

Revisen la bitácora y las guías en la plataforma (cada guía guarda sus respuestas y fotos). Para cada grupo de sábados, escriban en una frase lo más importante que hicieron.

:::tabla id="g13-linea"
| Sábados | Lo más importante que hicimos |
| --- | --- |
| 1-3 | |
| 4-6 | |
| 7-9 | |
| 10-12 | |
:::

Revisen y marquen. Si falta algo, complétenlo hoy:

:::checklist id="g13-bitacora"
- [ ] Todas las tablas de plantas están completas.
- [ ] Hay fotos de cada etapa.
- [ ] El código final tiene comentarios y está guardado.
:::

## Parte 4 · Reflexión (20 min)

Respondan con sinceridad: no hay respuestas buenas o malas. Las preguntas individuales las responde cada quien desde su propia sesión.

:::pregunta id="g13-p1"
¿Cuál fue el problema más difícil y cómo lo resolvimos?
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
- [ ] Hicimos la medición final de las plantas.
- [ ] Guardamos el render final.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Si las plantas son rábanos o frijoles, ¡cosechen! Comparen el tamaño de lo que dio cada planta.

## Bitácora (15 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro mini invernadero inteligente?
:::

Antes de irse, suban `equipo_NOMBRE_render.blend` y el `.png` del render juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Decidir con los equipos qué hacer con las plantas: llevarlas a casa o al huerto escolar.
- Si el material transparente se ve negro en Eevee, activar "Refracción de espacio de pantalla" en el material y en el render.
- Recopilar renders, códigos y gráficas para el portafolio.
- Tiempo total: 15 + 40 + 25 + 20 + 5 + 15 = 120 minutos.
:::

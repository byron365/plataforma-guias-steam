---
titulo: La cosecha del proyecto
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · La cosecha del proyecto

## Objetivo del día

Hacer la imagen final del invernadero en Tinkercad, cerrar el registro de las plantas, completar la bitácora y reflexionar.

**Al terminar tendremos:** la imagen final, el registro completo de las plantas y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con internet
- Cuenta de Tinkercad del equipo
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

## Parte 2 · Imagen final (40 min)

Vamos a armar en Tinkercad una **escena** del invernadero (caja transparente, maceta, planta y ventana abierta) y a sacarle una "foto". Es un diseño nuevo de Codeblocks, solo para la imagen.

**Colores:** cada bloque **Añadir** tiene un **círculo de color**: haz clic en él y elige el color de esa pieza.

Recuerda: cada forma nace **centrada** (en X = 0, Y = 0, Z = 0), **Mover** mueve la última forma que agregaste y **Girar alrededor** la gira desde su centro.

1. Diseño nuevo: **+ Crear → Codeblocks**, con el nombre `equipo_NOMBRE_escena`.
2. **Caja transparente** con las medidas de tu caja.
   - Las medidas están en la Guía 2 (en cm: multiplíquenlas por 10 para tener mm).
   - **Cubo** con primer **A** = ancho de la caja, **L** = largo, segundo **A** = alto (en mm).
   - Debajo, **Mover: X 0, Y 0, Z** = la mitad del alto (así queda apoyada sobre la mesa). Por ejemplo, si la caja mide 300 mm de alto, Z = 150.
   - De **Modificar**, **Establecer transparencia** debajo: cambia **False** por **True**.
3. **Maceta** café, apoyada en el fondo: **Cilindro** con **Radio = 35**, **A = 60** (o las medidas de su maceta) y **Mover: X 0, Y 0, Z 30**.
4. **Tierra** café oscuro, encima de la maceta: **Cilindro** con **Radio = 32**, **A = 3** y **Mover: X 0, Y 0, Z 61.5**.
5. **Planta:**
   - **Tallo** verde: **Cilindro** con **Radio = 2**, **A = 50** y **Mover: X 0, Y 0, Z 88** (queda parado sobre la tierra).
   - **Hojas** verdes: una **Esfera** con **Radio = 10**; debajo, **Definir tamaño** (de Modificar) con **X = 24, Y = 12, Z = 4** (queda aplastada como una hoja) y **Mover: X 12, Y 0, Z 100**. Hagan dos o tres hojas más igual, cambiando la X y la Z del Mover (por ejemplo X −12, Z 92).
6. **Ventana abierta** en el techo: **Cubo** con primer **A = 80**, **L = 60**, segundo **A = 2**.
   - Debajo, **Girar alrededor** con **Eje x** y **30** grados (queda abierta).
   - Debajo, **Mover** con **Z** = el alto de la caja + 15 (por ejemplo 315). Si no queda sobre el techo, ajusten la Z o la Y.
7. Ejecuta con **▷** y mira la escena. Si algo quedó en mal lugar, revisa los números de su **Mover**.

[IMAGEN 13.1T: escena final del mini invernadero en Tinkercad con la caja transparente, la planta, la maceta y la ventana abierta]

8. **Guardar la imagen:**
   - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
   - Gira y acerca la escena hasta que se vea bien ("Incline y aplique zoom para obtener la vista perfecta").
   - Presiona **Captura de pantalla**. La imagen queda en **Descargas**: cámbiale el nombre a `equipo_NOMBRE_final.png` y súbela aquí abajo.

:::foto id="g13-render"
Imagen final del equipo.
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
- [ ] Guardamos la imagen final.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Si las plantas son rábanos o frijoles, ¡cosechen! Comparen el tamaño de lo que dio cada planta.

## Bitácora (15 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro mini invernadero inteligente?
:::

La imagen `equipo_NOMBRE_final.png` va en el recuadro de foto de la Parte 2. Su programa de bloques queda guardado en Tinkercad.

:::archivo id="g13-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- Decidir con los equipos qué hacer con las plantas: llevarlas a casa o al huerto escolar.
- **Versión Tinkercad (Codeblocks):** la escena es un diseño aparte; la caja se vuelve transparente con el bloque Establecer transparencia (True). Las medidas de maceta y planta son de ejemplo: que cada equipo las ajuste.
- Recopilar renders, códigos y gráficas para el portafolio.
- Tiempo total: 15 + 40 + 25 + 20 + 5 + 15 = 120 minutos.
:::

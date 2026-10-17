---
titulo: Nuestro dispensador, de portada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Nuestro dispensador, de portada

## Objetivo del día

Hacer la imagen final del dispensador en Tinkercad Codeblocks, completar la bitácora y reflexionar sobre lo aprendido.

**Al terminar tendremos:** la imagen final, la bitácora completa y la reflexión de cada integrante.

## Materiales del equipo

- Computadora con internet
- Cuenta de Tinkercad con el diseño `equipo_NOMBRE_embudo`
- Bitácora de todos los sábados

## Parte 1 · Imagen final (40 min)

Vamos a armar en Tinkercad una **escena** del dispensador completo (botella, embudo, compuerta, soporte, plato y croquetas) y a sacarle una "foto". La armamos en el diseño del embudo, agregando bloques **debajo** de su programa.

**Colores:** cada bloque **Añadir** tiene un **círculo de color**. Haz clic en él y elige el color de esa pieza.

1. Abre el diseño del embudo.
   - En Tinkercad: **Diseños → Codeblocks** → `equipo_NOMBRE_embudo`.
   - Ya exportaron su `.stl` en la Guía 3, así que pueden agregarle bloques sin problema.
   - Busca el último bloque del programa (el último **Group Selection**). Todos los bloques nuevos van debajo de él, en este orden.
2. **Subir el embudo:** **Mover: X 0, Y 0, Z 100** justo debajo del último Group Selection. Mueve el embudo completo 100 mm hacia arriba, como si estuviera en la torre: su salida queda a 75 mm de altura.
3. **Botella transparente** encima del embudo.
   - **Cilindro** con **Radio** = el diámetro de tu botella ÷ 2 (por ejemplo **45**), **A = 150**, **Lados = 32**, **arista = 0**.
   - **Mover: X 0, Y 0, Z 218** (queda parada sobre el cuello del embudo).
   - De **Modificar**, arrastra **Establecer transparencia** debajo. En su casilla dice **False**: cámbiala a **True**. Así la botella se ve transparente.
4. **Compuerta** debajo de la salida del embudo.
   - **Cubo** con primer **A = 40**, **L = 30**, segundo **A = 3**, **arista = 0**.
   - **Mover: X 0, Y 0, Z 72** (justo debajo de la salida).
5. **Soporte del servo** al lado de la compuerta.
   - **Cubo** con primer **A = 32**, **L = 18**, segundo **A = 20**.
   - **Mover: X −40, Y 0, Z 65**.
6. **Plato:** un **Tubo** (las paredes) y un **Cilindro** delgado (el fondo).
   - De **Formas**, arrastra **Tubo**: **Radio = 60**, **Grosor del muro = 3**, **A = 15**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 7.5** (queda apoyado sobre la mesa).
   - Debajo, **Cilindro** con **Radio = 60**, **A = 3**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 1.5**.
7. **Base de madera:** **Cubo** con primer **A = 250**, **L = 200**, segundo **A = 5**. Debajo, **Mover: X 0, Y 0, Z −2.5** (queda justo debajo del plato). Dale color café claro.
8. **Croquetas** en el plato, con una **repetición**:
   - De **Controlar**, arrastra **Repetir** y escribe **12** veces.
   - **Dentro** de Repetir (en el hueco de la "boca" del bloque), pon una **Esfera** con **Radio = 5**. Dale color café.
   - Debajo de la Esfera, también dentro de Repetir, un **Mover:** con **Z = 8** (la croqueta queda sobre el fondo del plato).
   - De **Matemáticas**, arrastra **Aleatorio entre** y suéltalo encima del número de la **X** del Mover. Escribe **−40** y **40**. Haz lo mismo con la **Y**.
   - Así cada croqueta cae en un lugar distinto del plato.
9. Ejecuta con **▷** y espera a que termine. Mira la escena en la vista 3D.
   - Si algo quedó en mal lugar, revisa los números de su **Mover**.

[IMAGEN 13.1T: escena final del dispensador en Tinkercad con la botella transparente, el embudo, la compuerta y las croquetas en el plato]

10. **Guardar la imagen:**
    - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
    - Se abre la escena en grande. Gírala y acércala hasta que el dispensador se vea bien ("Incline y aplique zoom para obtener la vista perfecta").
    - Presiona **Captura de pantalla**. La imagen se guarda en **Descargas**: cámbiale el nombre a `equipo_NOMBRE_final.png` y súbela aquí abajo.

:::foto id="g13-render"
Imagen final del equipo.
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
- [ ] Guardamos la imagen final.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Hagan un **GIF animado** de la escena girando.

1. **Compartir** → **Imagen o vídeo**.
2. Acomoden la vista y presionen **GIF animado**. Se guarda en **Descargas**.
3. Ábranlo para verlo moverse. Para subirlo, métanlo en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo en el recuadro de archivo de trabajo de abajo.

## Bitácora (15 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro dispensador de comida?
:::

La imagen `equipo_NOMBRE_final.png` va en el recuadro de foto de la Parte 1. Su programa de bloques queda guardado en Tinkercad.

:::archivo id="g13-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto (por ejemplo el GIF del reto, en un .zip), súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- **Versión Tinkercad (Codeblocks):** la escena se arma en el diseño del embudo, debajo de su programa. "Mover" justo después del último Group Selection mueve todo el embudo. La imagen sale de Compartir → Imagen o vídeo → Captura de pantalla.
- Si las croquetas salen todas en el mismo lugar, el bloque "Aleatorio entre" no quedó encajado en la X o la Y del Mover.
- Tiempo total: 40 + 30 + 30 + 5 + 15 = 120 minutos.
:::

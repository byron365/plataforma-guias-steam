---
titulo: El cierre de nuestra estación
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · El cierre de nuestra estación

## Objetivo del día

Hacer la imagen final del proyecto en Tinkercad, completar la bitácora y reflexionar sobre todo lo que aprendimos.

**Al terminar tendremos:** la imagen final, la bitácora completa y el código final guardado con comentarios.

## Materiales del equipo

- Computadora con internet, cuenta de Tinkercad y Arduino IDE
- Estación versión 2
- Bitácora de todos los sábados

## Parte 1 · Imagen final (35 min)

Preparen una imagen bonita de la estación para el portafolio del equipo.

Recuerda: cada forma nace **centrada**, **Mover** mueve la última forma que agregaste y **Girar alrededor** la gira desde su centro.

1. Abre el diseño de la estación en Tinkercad (**Diseños → Codeblocks**): `equipo_NOMBRE_estacion` (o la versión 2 si la hicieron).
   - Ya tiene los colores y el texto del gemelo digital (Guía 8): es buen punto de partida.
2. **Colores:** torre blanca, base gris, texto con la temperatura de su color.
   - La carcasa se pinta con el bloque **Definir color** de la Guía 8 (blanco = 255, 255, 255). Como es una sola pieza agrupada, puede quedar toda blanca. El texto, con el círculo de color de su bloque **Texto**.
3. Agrega el **nombre del equipo** en texto 3D.
   - Al final del programa, un bloque **Texto** con el nombre del equipo; **Definir tamaño** con **X = 80**, **Y = 15**, **Z = 2**; **Girar alrededor** con **Eje x** y **90**; y **Mover: X 0, Y −70, Z 15** (debajo del texto de la temperatura). Ajusten los números si se tapan.
4. Ejecuta con **▷**.
5. **Guardar la imagen:**
   - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
   - Gira y acerca la escena hasta que se vea bien ("Incline y aplique zoom para obtener la vista perfecta").
   - Presiona **Captura de pantalla**. La imagen queda en **Descargas**: cámbiale el nombre a `equipo_NOMBRE_final.png`.

[IMAGEN 13.1T: imagen final de la estación meteorológica en Tinkercad con colores y el nombre del equipo]

:::foto id="g13-render"
Imagen final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

Un buen programa se explica solo. Revisen el código final y asegúrense de que:

Abran su programa más reciente (`equipo_NOMBRE_v2`) y vayan punto por punto. Un **comentario** empieza con `//`: el Arduino no lo lee, es una nota para las personas.

:::checklist id="g13-codigo"
- [ ] Arriba tiene el nombre del proyecto, del equipo y la fecha.
- [ ] Cada bloque tiene un comentario que dice qué hace.
- [ ] Los ajustes del equipo (FRÍO, CALOR, AJUSTE_TEMP) están juntos y explicados.
- [ ] Está guardado como **equipo_NOMBRE_estacion_final.ino**.
:::

Ejemplo de encabezado:

```cpp
// Estación meteorológica con gemelo digital
// Equipo: Los Meteoros
// STEAM Robotics Academy · Básico II · Docente: Bairon Alas
// Mide temperatura, humedad y luz; muestra en OLED y LED RGB.
```

Para guardarlo con el nombre del último punto: **Archivo → Guardar como** → `equipo_NOMBRE_estacion_final`. Verifiquen (✓) que sigue sin errores.

## Parte 3 · Repaso de la bitácora (25 min)

Revisen todas las guías y completen lo que falte. Luego respondan en equipo:

En la plataforma, cada guía guarda sus respuestas y fotos: ábranlas una por una. Para cada grupo de sábados, escriban en una frase lo más importante que hicieron.

:::tabla id="g13-linea"
| Sábado | Lo más importante que hicimos |
| --- | --- |
| 1-3 | |
| 4-6 | |
| 7-8 | |
| 9-10 | |
| 11-12 | |
:::

## Parte 4 · Reflexión (20 min)

Respondan con sinceridad: no hay respuestas buenas o malas. Las preguntas individuales las responde cada quien desde su propia sesión.

:::pregunta id="g13-p1"
¿Cuál fue el problema más difícil del proyecto y cómo lo resolvimos?
:::

:::pregunta id="g13-p2" individual="si"
¿Qué habilidad mejoré más: diseño 3D, electrónica, programación, análisis de datos o trabajo en equipo? ¿Por qué?
:::

:::pregunta id="g13-p3" individual="si"
Un consejo para un estudiante que empezará este proyecto el próximo año:
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
- [ ] El código final tiene comentarios.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Hagan una **infografía** de una página con la imagen final, la gráfica, la ficha técnica y tres datos curiosos del clima.

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestra estación meteorológica?
:::

Antes de irse, suban la imagen `.png` y `equipo_NOMBRE_estacion_final` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). El diseño de bloques queda guardado en Tinkercad (**Diseños → Codeblocks**). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar imágenes finales, códigos finales y gráficas de cada equipo para el portafolio del nivel.
- Si los equipos ya tienen la carcasa v2 impresa, tomar fotos reales junto a la imagen de Tinkercad.
- Las respuestas individuales sirven para la evaluación de actitudes del nivel.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

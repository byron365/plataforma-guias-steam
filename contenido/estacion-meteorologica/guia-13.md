---
titulo: El cierre de nuestra estación
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · El cierre de nuestra estación

## Objetivo del día

Hacer el render final del proyecto, completar la bitácora y reflexionar sobre todo lo que aprendimos.

**Al terminar tendremos:** el render final, la bitácora completa y el código final guardado con comentarios.

## Materiales del equipo

- Computadora con Blender y Arduino IDE
- Estación versión 2
- Bitácora de todos los sábados

## Parte 1 · Render final (35 min)

Preparen una imagen bonita de la estación para el portafolio del equipo.

1. Abre el archivo de Blender (versión 2 si la hicieron).
   - El del gemelo digital (`equipo_NOMBRE_gemelo.blend`, Guía 8) ya tiene cámara, luz y colores: es buen punto de partida. Guárdenlo como `equipo_NOMBRE_final.blend`.
   - Si están en otra computadora, descárguenlo de "Archivos del equipo"; si es `.zip`, clic derecho → **Extraer todo**.
2. Agrega un **suelo**: Shift + A → Malla → Plano, escálalo (S, 10).
   - Como el archivo está en milímetros, el plano sale pequeño: después de **S**, **10**, **Enter**, si todavía se ve chico, repitan (**S**, **10**, **Enter**).
   - Bájenlo para que quede justo debajo de la base de la estación (Panel N → Posición Z).
3. Agrega una luz de **Sol** con un poco de ángulo para que haya sombras.
   - **Shift + A → Luz → Sol**. Gírenlo un poco: **R**, **X**, **30**, **Enter**.
4. Materiales: torre blanca, base gris, texto con la temperatura de su color.
   - Pestaña **Material** (esfera roja) → **Color base**. Si la carcasa es una sola pieza, pueden dejarla toda blanca.
5. Agrega el nombre del equipo en texto 3D.
   - Como en la Guía 8: **Shift + A → Texto**, **Tab**, escriban el nombre, **Tab**; Tamaño 15 y Extruir = 2 en la pestaña de datos del texto.
6. Motor de procesamiento: **Eevee**. Resolución: 1920 × 1080.
   - Pestaña **Procesamiento** (cámara trasera) → **EEVEE**. Pestaña **Salida** (icono de impresora) → Resolución X = 1920, Y = 1080.
   - Acomoden la cámara: giren la vista y **Ctrl + Alt + 0** (o **Vista → Alinear vista → Alinear cámara activa a la vista**).
7. **F12** y guarda como **equipo_NOMBRE_final.png**.
   - En la ventana del render: **Imagen → Guardar como**.

[IMAGEN 13.1: render final de la estación meteorológica con suelo, luz de sol, sombras y el nombre del equipo]

:::foto id="g13-render"
Render final del equipo.
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
- [ ] Guardamos el render final.
- [ ] El código final tiene comentarios.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Hagan una **infografía** de una página con el render, la gráfica, la ficha técnica y tres datos curiosos del clima.

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestra estación meteorológica?
:::

Antes de irse, suban `equipo_NOMBRE_final.blend`, el render `.png` y `equipo_NOMBRE_estacion_final` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos finales y gráficas de cada equipo para el portafolio del nivel.
- Si los equipos ya tienen la carcasa v2 impresa, tomar fotos reales junto al render.
- Las respuestas individuales sirven para la evaluación de actitudes del nivel.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

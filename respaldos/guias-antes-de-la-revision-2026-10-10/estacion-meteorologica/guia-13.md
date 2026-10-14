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
2. Agrega un **suelo**: Shift + A → Malla → Plano, escálalo (S, 10).
3. Agrega una luz de **Sol** con un poco de ángulo para que haya sombras.
4. Materiales: torre blanca, base gris, texto con la temperatura de su color.
5. Agrega el nombre del equipo en texto 3D.
6. Motor de render: **Eevee**. Resolución: 1920 × 1080.
7. **F12** y guarda como **equipo_NOMBRE_final.png**.

[IMAGEN 13.1: render final de la estación meteorológica con suelo, luz de sol, sombras y el nombre del equipo]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

Un buen programa se explica solo. Revisen el código final y asegúrense de que:

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

## Parte 3 · Repaso de la bitácora (25 min)

Revisen todas las guías y completen lo que falte. Luego respondan en equipo:

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

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos finales y gráficas de cada equipo para el portafolio del nivel.
- Si los equipos ya tienen la carcasa v2 impresa, tomar fotos reales junto al render.
- Las respuestas individuales sirven para la evaluación de actitudes del nivel.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

---
titulo: El cierre del laberinto
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · El cierre del laberinto

## Objetivo del día

Hacer el render final del laberinto, dejar el código final comentado, completar la bitácora y reflexionar.

**Al terminar tendremos:** el render final, el código final guardado y la bitácora completa.

## Materiales del equipo

- Computadora con Blender y Arduino IDE
- Archivos del tablero y del soporte
- Bitácora de todos los sábados

## Parte 1 · Render final (35 min)

1. Abre el archivo del tablero e **importa** el soporte (Archivo → Anexar o importar el STL).
2. Inclina un poco el tablero (**R X 10**) para que se vea en acción.
3. Agrega una **canica**: Shift + A → Malla → Esfera UV, radio 8 mm, con material brillante (Metálico 1, Rugosidad 0,1).
4. Materiales: tablero de un color, paredes de otro, meta en verde.
5. Luz de **Sol** y un plano como suelo.
6. Render con **Eevee**, 1920 × 1080 → **equipo_NOMBRE_final.png**.

[IMAGEN 13.1: render final del laberinto inclinado con la canica brillante, el soporte cardán y la meta en verde]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

:::checklist id="g13-codigo"
- [ ] Encabezado con proyecto, equipo, fecha y docente.
- [ ] Comentario en cada bloque del loop.
- [ ] Los ajustes del equipo (CENTRO, INCLINACION, SUAVE) juntos y explicados.
- [ ] Guardado como **equipo_NOMBRE_laberinto_final.ino**.
:::

```cpp
// Laberinto inclinable
// Equipo: ______
// STEAM Robotics Academy · Básico II · Docente: Bairon Alas
// Joystick inclina el tablero con 2 servos; sensor IR detecta la meta.
```

## Parte 3 · Repaso de la bitácora (25 min)

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
¿Qué habilidad mejoré más en este proyecto? ¿Por qué?
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

Hagan una **animación** de 5 segundos del tablero inclinándose de un lado a otro: fotograma clave de rotación en el fotograma 1, 60 y 120.

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro laberinto inclinable?
:::

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- Si imprimieron el tablero v2, tomar fotos reales junto al render.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

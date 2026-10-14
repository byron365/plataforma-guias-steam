---
titulo: El cierre de la temporada
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · El cierre de la temporada

## Objetivo del día

Hacer el render final de la cancha, dejar el código final comentado, completar la bitácora y reflexionar.

**Al terminar tendremos:** el render final, el código final guardado y la bitácora completa.

## Materiales del equipo

- Computadora con Blender y Arduino IDE
- Archivos de la portería y del trofeo
- Bitácora de todos los sábados

## Parte 1 · Render final (35 min)

1. Abre un archivo nuevo de Blender (unidades en mm).
2. **Cancha:** plano de 525 × 340 mm con material verde.
3. **Líneas:** planos delgados blancos (3 mm de ancho) y un círculo con el modificador **Solidificar**.
4. **Porterías:** importa la portería dos veces (una azul y una roja) y colócalas en los extremos.
5. **Pelota:** esfera de 40 mm de diámetro, blanca.
6. **Trofeo:** importa el trofeo escaneado y ponlo a un lado.
7. Luz de **Sol**, cámara con vista desde una esquina, render **Eevee** 1920 × 1080 → **equipo_NOMBRE_final.png**.

[IMAGEN 13.1: render final de la cancha de mini fútbol con las porterías azul y roja, la pelota y el trofeo escaneado]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

:::checklist id="g13-codigo"
- [ ] Encabezado con proyecto, equipo, fecha y docente.
- [ ] Comentarios en cada función y bloque del loop.
- [ ] Los ajustes del equipo (DURACION, PAUSA_GOL, GOLES_GANAR) juntos y explicados.
- [ ] Guardado como **equipo_NOMBRE_futbol_final.ino**.
:::

```cpp
// Mini fútbol con marcador electrónico
// Equipo: ______
// STEAM Robotics Academy · Básico II · Docente: Bairon Alas
// Sensores IR en cada portería; marcador OLED, tiempo y buzzer.
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

Hagan una **animación** de la pelota entrando en la portería: fotograma clave de posición en el fotograma 1 (centro de la cancha) y en el 48 (dentro de la portería).

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro mini fútbol con marcador electrónico?
:::

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- Si el trofeo escaneado es muy pesado (muchos polígonos) y Blender va lento, aplicar el modificador Diezmar (Decimate) con proporción 0,2.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

---
titulo: El cierre del laberinto
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · El cierre del laberinto

## Objetivo del día

Hacer la imagen final del laberinto en Tinkercad, dejar el código final comentado, completar la bitácora y reflexionar.

**Al terminar tendremos:** la imagen final, el código final guardado y la bitácora completa.

## Materiales del equipo

- Computadora con internet (cuenta de Tinkercad) y Arduino IDE
- Diseño del tablero en Tinkercad
- Bitácora de todos los sábados

## Parte 1 · Imagen final (35 min)

Vamos a armar una **escena** del laberinto inclinado sobre su soporte, con la canica, y a sacarle una "foto". La armamos en el diseño del tablero, agregando bloques **debajo** de su programa. El soporte va simplificado (solo para la imagen).

**Colores:** cada bloque **Añadir** tiene un **círculo de color**: haz clic en él y elige el color de esa pieza.

1. Abre el diseño del tablero.
   - **Diseños → Codeblocks** → `equipo_NOMBRE_laberinto` (o el v2). Ya exportaron su `.stl`, así que pueden agregarle bloques sin problema.
   - Busca el último bloque del programa (el último **Group Selection**). Todos los bloques nuevos van debajo de él, en este orden.
2. **Inclinar y subir el tablero:** justo debajo del último Group Selection, **Girar alrededor** con **Eje x** y **10** grados, y luego **Mover: X 0, Y 0, Z 60**. Mueven todo el tablero, porque es lo último que se agrupó: queda inclinado y a la altura del marco.
3. **Base del soporte:** **Cubo** con primer **A = 240**, **L = 240**, segundo **A = 5** y **Mover: X 0, Y 0, Z 2.5**.
4. **Torres:** dos **Cubos** con primer **A = 10**, **L = 20**, segundo **A = 70**: uno con **Mover: X −116, Y 0, Z 40** y el otro con **Mover: X 116, Y 0, Z 40**.
5. **Marco** (cuatro barras alrededor del tablero, a 60 mm de altura):
   - Dos **Cubos** con primer **A = 220**, **L = 10**, segundo **A = 8**: **Mover: X 0, Y 105, Z 60** y **Mover: X 0, Y −105, Z 60**.
   - Dos **Cubos** con primer **A = 10**, **L = 200**, segundo **A = 8**: **Mover: X 105, Y 0, Z 60** y **Mover: X −105, Y 0, Z 60**.
6. **Canica:** **Esfera** con **Radio = 8**, de color gris o plateado. Debajo, **Mover** con la **X** y la **Y** del centro de una casilla libre (un pasillo) y **Z = 70**. Si queda hundida en el tablero o flotando, cambien un poco la Z.
7. Ejecuta con **▷** y revisa la escena en la vista 3D. Si algo quedó en mal lugar, revisa los números de su **Mover**.

[IMAGEN 13.1T: escena final del laberinto inclinado en Tinkercad con la canica, el soporte y el marco]

8. **Guardar la imagen:**
   - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
   - Se abre la escena en grande. Gírala y acércala hasta que el laberinto se vea bien ("Incline y aplique zoom para obtener la vista perfecta").
   - Presiona **Captura de pantalla**. La imagen se guarda en **Descargas**: cámbiale el nombre a `equipo_NOMBRE_final.png` y súbela aquí abajo.

:::foto id="g13-render"
Imagen final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

Abran su programa más reciente del juego y revisen punto por punto. Un **comentario** empieza con `//`: el Arduino no lo lee, es una nota para las personas.

:::checklist id="g13-codigo"
- [ ] Encabezado con proyecto, equipo, fecha y docente.
- [ ] Comentario en cada bloque del loop.
- [ ] Los ajustes del equipo (CENTRO, INCLINACION, SUAVE) juntos y explicados.
- [ ] Guardado como **equipo_NOMBRE_laberinto_final.ino**.
:::

Ejemplo de encabezado (escríbanlo al principio del programa, con el nombre de su equipo):

```cpp
// Laberinto inclinable
// Equipo: ______
// STEAM Robotics Academy · Básico II · Docente: Bairon Alas
// Joystick inclina el tablero con 2 servos; sensor IR detecta la meta.
```

Para el último punto: **Archivo → Guardar como** → `equipo_NOMBRE_laberinto_final`. Verifiquen (✓) que sigue sin errores.

## Parte 3 · Repaso de la bitácora (25 min)

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
- [ ] Guardamos la imagen final.
- [ ] El código final tiene comentarios.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Hagan un **GIF animado** de la escena girando.

1. **Compartir** → **Imagen o vídeo**.
2. Acomoden la vista y presionen **GIF animado**. Se guarda en **Descargas**.
3. Para subirlo, métanlo en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo en el recuadro de archivo de trabajo de abajo.

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro laberinto inclinable?
:::

Antes de irse, suban `equipo_NOMBRE_laberinto_final` (y, si quieren, el GIF del reto) juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La imagen final va en el recuadro de foto de la Parte 1. La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- Si imprimieron el tablero v2, tomar fotos reales junto al render.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

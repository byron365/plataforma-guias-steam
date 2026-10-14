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

Un **render** es una "foto" del modelo 3D con colores y luces. Si están en otra computadora, descarguen sus archivos de "Archivos del equipo" (si son `.zip`, clic derecho → **Extraer todo**).

1. Abre el archivo del tablero e **importa** el soporte (Archivo → Anexar o importar el STL).
   - Abran `equipo_NOMBRE_laberinto.blend` (o el v2) y guárdenlo como `equipo_NOMBRE_render.blend`.
   - **Archivo → Anexar** → `equipo_NOMBRE_soporte.blend` → carpeta **Object** (puede aparecer como **Objeto**) → elijan la base y el marco → **Anexar**. (O **Archivo → Importar → STL** con sus `.stl`.)
   - Muevan el tablero para que quede dentro del marco: el marco está a 60 mm de altura, así que pongan el tablero en Posición Z = 60.
2. Inclina un poco el tablero (**R X 10**) para que se vea en acción.
   - Con el tablero seleccionado y el mouse sobre la vista 3D: **R**, **X**, **10**, **Enter**.
3. Agrega una **canica**: Shift + A → Malla → Esfera, radio 8 mm, con material brillante (**Metálico** = 1, **Rugosidad** = 0.1).
   - En el panel que aparece abajo a la izquierda, **Radio** = 8. Colóquenla sobre el tablero, dentro de un pasillo.
   - Pestaña **Material** (esfera roja en Propiedades) → **Nuevo** → **Metálico** = 1, **Rugosidad** = 0.1.
4. Materiales: tablero de un color, paredes de otro, meta en verde.
   - Si el tablero y las paredes son una sola pieza, pueden darle un solo color. Para la meta: un cilindro muy bajo (1 mm) verde sobre su casilla.
5. Luz de **Sol** y un plano como suelo.
   - **Shift + A → Luz → Sol**. Suelo: **Shift + A → Malla → Plano**, agrándenlo con **S**, **500**, **Enter** y bájenlo debajo de la base.
6. Render con **Eevee**, 1920 × 1080 → **equipo_NOMBRE_final.png**.
   - Si no hay cámara: **Shift + A → Cámara**. Giren la vista hasta que se vea bien y presionen **Ctrl + Alt + 0** (sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**).
   - Pestaña **Procesamiento** (cámara trasera) → **EEVEE**. Pestaña **Salida** (impresora) → Resolución 1920 × 1080.
   - **F12**, esperen y en la ventana del render: **Imagen → Guardar como**.

[IMAGEN 13.1: render final del laberinto inclinado con la canica brillante, el soporte cardán y la meta en verde]

:::foto id="g13-render"
Render final del equipo.
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
- [ ] Guardamos el render final.
- [ ] El código final tiene comentarios.
- [ ] La bitácora está completa.
- [ ] Cada integrante respondió la reflexión.
:::

## Reto extra

Hagan una **animación** de 5 segundos del tablero inclinándose de un lado a otro: fotograma clave de rotación en el fotograma 1, 60 y 120.

1. En la línea de tiempo (abajo), pon el fotograma en **1**, gira el tablero a un lado y, con el mouse sobre los valores de **Rotación** del Panel N, presiona **I**.
2. Fotograma **60**: gíralo al otro lado e **I**. Fotograma **120**: regrésalo como en el 1 e **I**.
3. **Espacio** para verla. Antes de renderizarla (**Ctrl + F12**), pregunten al docente en qué carpeta guardar (pestaña **Salida**).

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro laberinto inclinable?
:::

Antes de irse, suban `equipo_NOMBRE_render.blend`, el render `.png` y `equipo_NOMBRE_laberinto_final` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- Si imprimieron el tablero v2, tomar fotos reales junto al render.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

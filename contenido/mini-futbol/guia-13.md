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

Un **render** es una "foto" del modelo 3D con colores y luces. Recuerden: medidas en el **Panel N → Elemento**; color en la pestaña **Material** (esfera roja en Propiedades → **Nuevo** → **Color base**). Si están en otra computadora, descarguen sus archivos de "Archivos del equipo".

**Recordatorio de Blender** (vuelvan aquí si se les olvida algo):

- Los atajos (Shift + A, N, X, G, R…) solo funcionan con el **mouse encima de la vista 3D**.
- **Agregar una pieza:** **Shift + A → Malla →** Plano, Cilindro o Esfera. Sin atajo: menú **Agregar** de la barra de arriba de la vista 3D.
- **Medidas:** Panel N (tecla **N**) → pestaña **Elemento**. Doble clic en la casilla, borren, escriban el número y **Enter**. Punto para los decimales.
- **Duplicar:** clic en la pieza, **Shift + D** y luego **clic derecho** (la copia se queda en el mismo lugar). Después cambien sus medidas en el Panel N. La copia conserva el color.
- **Ponerle color (material):** clic en la pieza → Propiedades (abajo a la derecha) → **esfera roja** → **Nuevo** → clic en la barra de **Color base** y elijan el color. Para reusar un color ya creado, usen el botón con la esfera que está **a la izquierda** de **Nuevo** y elijan el material de la lista.
- **Ver los colores en la vista 3D:** arriba a la derecha de la vista 3D, clic en la tercera esfera de los cuatro botones de sombreado (Previsualización de materiales).

1. Abre un archivo nuevo de Blender (unidades en mm).
   - **Archivo → Nuevo → General**, borra el cubo. Propiedades → **Escena** → **Unidades** → Escala de unidades 0.001, Longitud Milímetros. Guarda como `equipo_NOMBRE_render.blend`.
2. **Cancha:** plano de 525 × 340 mm con material verde.
   - Mouse sobre la vista 3D → **Shift + A → Malla → Plano**.
   - Panel N → **Elemento** → Dimensiones X = 525, Y = 340. Posición X = 0, Y = 0, Z = 0.
   - En el Listado, llámenlo `cancha`. Material: **Nuevo** → Color base **verde**; llamen al material `verde` (doble clic sobre su nombre).
3. **Líneas:** planos delgados blancos (3 mm de ancho) y un círculo con el modificador **Solidificar**.
   - Líneas rectas: planos de 3 mm de ancho y del largo de cada línea, subidos 0.5 mm (Posición Z = 0.5) para que se vean encima del verde.
   - **Línea de media cancha:** **Shift + A → Malla → Plano**. Dimensiones X = 3, Y = 340; Posición X = 0, Y = 0, Z = 0.5. Material: **Nuevo** → Color base **blanco**; llamen al material `blanco`.
   - **Bordes largos:** dupliquen la línea (**Shift + D**, clic derecho). Dimensiones X = 525, Y = 3; Posición Y = 168.5. Dupliquen otra vez y pongan Posición Y = −168.5.
   - **Bordes cortos:** dupliquen la línea de media cancha y pongan Posición X = 261. Otra copia con Posición X = −261.
   - **Áreas grandes:** con sus medidas de la Guía 2 (pasen los cm a mm multiplicando por 10), hagan con copias de una línea los tres lados de cada área: uno paralelo al borde corto (del largo del área) y dos que lo unen al borde (del fondo del área). Mirando desde arriba (tecla **7**, o el círculo azul **Z** de los ejes de colores), acomódenlos con **G** y clic.
   - **Círculo central:** cilindro de 92 mm de diámetro (el doble del radio de 46 mm de su tabla) y 1 mm de alto, menos otro cilindro de 86 mm con el modificador Booleana: queda un anillo de 3 mm. (Es más fácil que usar Solidificar sobre un círculo.)
     - **Shift + A → Malla → Cilindro**. Dimensiones X = 92, Y = 92, Z = 1; Posición X = 0, Y = 0, Z = 0.5. Llámenlo `circulo`.
     - Otro **Shift + A → Malla → Cilindro**. Dimensiones X = 86, Y = 86, Z = 3 (más alto para que corte bien); misma Posición. Llámenlo `hueco`.
     - Clic en el `circulo` → Propiedades → **llave inglesa** → **Agregar modificador → Generar → Booleana** → **Diferencia** → en **Objeto** elijan `hueco`. Luego flechita **⌄ → Aplicar**.
     - Borren el `hueco` (clic derecho sobre su nombre en el Listado → **Borrar**). Queda el anillo.
   - Dales un material blanco: al `circulo`, con el botón de la esfera a la izquierda de **Nuevo**, elijan `blanco`.
4. **Porterías:** importa la portería dos veces (una azul y una roja) y colócalas en los extremos.
   - **Archivo → Importar → STL (.stl)** → `equipo_NOMBRE_porteria.stl`. Repitan para la segunda (o dupliquen con **Shift + D**).
   - Colóquenlas en el centro de cada lado corto (X = −262.5 y X = 262.5), girando una 180° (**R**, **Z**, **180**) para que las bocas se miren. Si quedan de lado, gírenlas 90°.
   - **Ubicarlas:** clic en una portería → Panel N → Posición X = −262.5, Y = 0, Z = 0. La otra: X = 262.5, Y = 0, Z = 0.
   - **Girarlas:** clic en una portería, mouse sobre la vista 3D, presionen **R**, luego **Z**, escriban 180 y **Enter**. (También pueden escribir el ángulo en Panel N → **Rotación Z**.) Miren desde arriba (tecla **7**) que las bocas apunten al centro de la cancha.
   - **Colores:** a una, material nuevo **azul**; a la otra, nuevo **rojo**.
5. **Pelota:** esfera de 40 mm de diámetro, blanca.
   - Mouse sobre la vista 3D → **Shift + A → Malla → Esfera**.
   - Panel N → Dimensiones X = 40, Y = 40, Z = 40; Posición Z = 20 (apoyada en la cancha). Llámenla `pelota`.
   - Material: con el botón de la esfera a la izquierda de **Nuevo**, elijan `blanco`.
6. **Trofeo:** importa el trofeo escaneado y ponlo a un lado.
   - **Archivo → Importar → STL** → `equipo_NOMBRE_trofeo.stl`. Si Blender se pone lento, ver la nota del docente.
   - Panel N → Posición: por ejemplo X = 0, Y = −220, Z = 0 (fuera de la cancha, a un costado). Denle un material dorado o del color que quieran.
7. Luz de **Sol**, cámara con vista desde una esquina, render **Eevee** 1920 × 1080 → **equipo_NOMBRE_final.png**.
   - **Shift + A → Luz → Sol**. Si no hay cámara: **Shift + A → Cámara**.
   - Giren la vista hasta ver la cancha desde una esquina y presionen **Ctrl + Alt + 0** (sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**).
   - Pestaña **Procesamiento** (cámara trasera) → **EEVEE**. Pestaña **Salida** (impresora) → 1920 × 1080.
   - **F12**, esperen y en la ventana del render: **Imagen → Guardar como**.

[IMAGEN 13.1: render final de la cancha de mini fútbol con las porterías azul y roja, la pelota y el trofeo escaneado]

:::foto id="g13-render"
Render final del equipo.
:::

## Parte 2 · Código final con comentarios (25 min)

Abran su programa más reciente del marcador y revisen punto por punto. Un **comentario** empieza con `//`: el Arduino no lo lee, es una nota para las personas.

:::checklist id="g13-codigo"
- [ ] Encabezado con proyecto, equipo, fecha y docente.
- [ ] Comentarios en cada función y bloque del loop.
- [ ] Los ajustes del equipo (DURACION, PAUSA_GOL, GOLES_GANAR) juntos y explicados.
- [ ] Guardado como **equipo_NOMBRE_futbol_final.ino**.
:::

Ejemplo de encabezado (escríbanlo al principio del programa, con el nombre de su equipo):

```cpp
// Mini fútbol con marcador electrónico
// Equipo: ______
// STEAM Robotics Academy · Básico II · Docente: Bairon Alas
// Sensores IR en cada portería; marcador OLED, tiempo y buzzer.
```

Para el último punto: **Archivo → Guardar como** → `equipo_NOMBRE_futbol_final`. Verifiquen (✓) que sigue sin errores.

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

Hagan una **animación** de la pelota entrando en la portería: fotograma clave de posición en el fotograma 1 (centro de la cancha) y en el 48 (dentro de la portería).

1. En la línea de tiempo (abajo), fotograma **1**: pelota en el centro; mouse sobre los valores de **Posición** del Panel N y tecla **I**.
2. Fotograma **48**: muevan la pelota dentro de una portería e **I** otra vez.
3. **Espacio** para verla. Antes de renderizarla (**Ctrl + F12**), pregunten al docente en qué carpeta guardar (pestaña **Salida**).

## Bitácora (10 min)

:::pregunta id="g13-b1"
En una frase: ¿qué es nuestro mini fútbol con marcador electrónico?
:::

Antes de irse, suban `equipo_NOMBRE_render.blend`, el render `.png` y `equipo_NOMBRE_futbol_final` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recopilar renders, códigos y gráficas para el portafolio del nivel.
- Si el trofeo escaneado es muy pesado (muchos polígonos) y Blender va lento, aplicar el modificador Diezmar (Decimate) con Proporción 0.2.
- Tiempo total: 35 + 25 + 25 + 20 + 5 + 10 = 120 minutos.
:::

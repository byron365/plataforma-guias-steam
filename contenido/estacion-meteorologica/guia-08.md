---
titulo: El gemelo digital cobra vida
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · El gemelo digital cobra vida

## Objetivo del día

Crear el gemelo digital de la estación en Blender: un modelo que cambia de color según la temperatura medida. Además, preparar el guion y el cartel de la presentación.

**Al terminar tendremos:** tres renders del gemelo (frío, normal y calor) y el guion de la presentación listo.

## Materiales del equipo

- Computadora con Blender y el archivo **equipo_NOMBRE_estacion.blend**
- Datos y gráfica del sábado 7
- Cartulina, marcadores (para el cartel)

## Parte 1 · ¿Qué hace un gemelo digital? (10 min)

Un gemelo digital es una copia virtual de un objeto real que **muestra sus datos**. Las fábricas, los aviones y las ciudades inteligentes los usan para vigilar lo que pasa sin estar ahí.

Nuestro gemelo: la carcasa en Blender que se pinta de **azul, verde o rojo**, igual que el LED.

Muevan la temperatura en la animación y fíjense en el color del gemelo:

:::animacion tipo="gemelo-digital"
:::

## Parte 2 · Materiales de colores (25 min)

1. Abre el archivo de la estación. Selecciona la torre.
   - Si están en otra computadora, descárguenlo del recuadro de la Guía 4 (o de "Archivos del equipo"); si es `.zip`, clic derecho → **Extraer todo**.
   - Guárdenlo como `equipo_NOMBRE_gemelo.blend` para no cambiar el original.
   - Haz clic en la carcasa (desde el sábado 4 es una sola pieza).
2. Ve a la pestaña **Material** → **Nuevo**. Nómbralo *Clima*.
   - La pestaña Material es el icono de la **esfera roja**, abajo en la columna de iconos de Propiedades.
   - Presiona **Nuevo**. Haz doble clic en el nombre del material (arriba, dice "Material") y escribe `Clima`.
3. Cambia el **Color base** según la temperatura:
   - Haz clic en el rectángulo de **Color base**. En la ventanita que se abre, elige la pestaña **RGB** y escribe los tres números (R, G y B) de la tabla. En Blender cada color va de 0 a 1.
   - Empieza con el color **Normal**.

| Estado | Color base (R, G, B) | Temperatura |
| --- | --- | --- |
| Frío | 0, 0, 1 | Menor que FRÍO |
| Normal | 0, 1, 0 | Entre FRÍO y CALOR |
| Calor | 1, 0, 0 | Mayor que CALOR |

4. Activa la vista **Material** (Z → Vista de material) para ver el color.
   - Con el mouse sobre la vista 3D presiona **Z** y elige **Vista previa de material** en el menú redondo. (También está en los cuatro botoncitos redondos de arriba a la derecha de la vista: el tercero.)

[IMAGEN 8.1: carcasa en Blender con el material Clima en color verde y el panel de Material abierto]

## Parte 3 · Un texto con el dato (20 min)

1. **Shift + A → Texto.** En modo edición (**Tab**) borra "Text" y escribe la temperatura, por ejemplo **24.6 °C**.
   - Presiona **Tab** para editar el texto, borra con la tecla **Retroceso** (←) las cuatro letras de "Text" y escribe el número.
   - Si el símbolo ° no aparece, escriban **24.6 C**. Sal con **Tab**.
2. **Tamaño:** como el archivo está en milímetros, el texto sale diminuto (1 mm). Con el texto seleccionado, ve a la pestaña de datos del texto (icono de la letra **a** en Propiedades) → sección **Tipografía** → **Transformación** y cambia **Tamaño** a **15**.
3. Agrégale grosor: pestaña de datos del texto → **Extruir** = 2.
   - En la misma pestaña, sección **Geometría** → **Extruir** = 2.
4. Colócalo frente a la estación y gíralo para que se lea desde la cámara.
   - Muévelo con **G** (o en el Panel N, Posición) hasta dejarlo frente a la torre.
   - Para pararlo: **R**, **X**, **90**, **Enter**.
   - Dale un material blanco o del color del estado, igual que en la Parte 2.

[IMAGEN 8.2: gemelo digital con un texto 3D que dice 24.6 °C frente a la carcasa]

## Parte 4 · Tres renders con datos reales (20 min)

Usa la máxima, la mínima y el promedio de tu hoja de cálculo (sábado 7) o inventa un día frío y uno caluroso.

1. Coloca la cámara (**Numpad 0** para ver por ella; **Ctrl + Alt + Numpad 0** para ponerla en tu vista).
   - Si no hay cámara en el Listado: **Shift + A → Cámara**. Si no hay luz: **Shift + A → Luz → Sol**.
   - Gira la vista hasta que se vean bien la torre y el texto, y presiona **Ctrl + Alt + 0** del teclado numérico. Sin teclado numérico: **Vista → Alinear vista → Alinear cámara activa a la vista**.
   - Para ver por la cámara: **0** del teclado numérico (o **Vista → Cámara**).
   - Motor de procesamiento: pestaña **Procesamiento** (cámara trasera) en Propiedades → **EEVEE**.
2. Para cada estado: cambia el color y el texto, luego **F12** y **Imagen → Guardar**.
   - Color: en el material *Clima*, cambia el Color base (Parte 2).
   - Texto: clic en el texto, **Tab**, borra el número, escribe el nuevo y **Tab**.
   - **F12**, espera a que termine, y en la ventana del render **Imagen → Guardar como** con el nombre de la tabla. Cierra esa ventana y sigue con el siguiente.

| Render | Temperatura del texto | Color | Archivo |
| --- | --- | --- | --- |
| Frío | | Azul | equipo_frio.png |
| Normal | | Verde | equipo_normal.png |
| Calor | | Rojo | equipo_calor.png |

[IMAGEN 8.3: los tres renders del gemelo digital lado a lado en azul, verde y rojo]

:::foto id="g8-renders"
Sube uno de tus renders.
:::

## Parte 5 · Guion y cartel (25 min)

La presentación dura **5 minutos**. Cada integrante presenta una parte:

Repartan las partes (alguien puede tener dos) y escriban 2 o 3 ideas cortas para cada una. Ensayen con cronómetro.

:::tabla id="g8-guion"
| Parte | Tiempo | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- | --- |
| El problema: ¿para qué medir el clima? | 1 min | | |
| La carcasa y el diseño 3D | 1 min | | |
| El circuito y el código | 1 min | | |
| Datos, gráfica y calibración | 1 min | | |
| Demostración en vivo y gemelo digital | 1 min | | |
:::

El cartel debe tener: nombre del equipo, foto o render, la gráfica, la ficha técnica resumida y una frase de "lo que aprendimos".

Primero repartan el espacio a lápiz y luego pasen a marcador; título grande y frases cortas. La gráfica y la ficha técnica están en la Guía 7.

:::pregunta id="g8-p1"
¿Qué demostración en vivo harán para que el público vea que la estación funciona? (Ejemplo: calentar el sensor con la mano y que el LED cambie.)
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] El gemelo tiene material de colores.
- [ ] El gemelo muestra la temperatura con texto 3D.
- [ ] Guardamos los tres renders.
- [ ] El guion tiene responsable para cada parte.
- [ ] Empezamos el cartel.
:::

## Reto extra

Haz una **animación** de 3 segundos en la que el gemelo pasa de azul a rojo: inserta un fotograma clave en el Color base (tecla **I** sobre el color) en el fotograma 1 en azul y en el fotograma 72 en rojo. Renderízala con **Ctrl + F12**.

Pasos: abajo, en la línea de tiempo, pon el fotograma actual en **1**; pon el Color base en azul, pon el mouse sobre el color y presiona **I**. Cambia al fotograma **72**, pon el color en rojo y presiona **I** otra vez. Con **Espacio** ves la animación. Antes de **Ctrl + F12**, pregunten al docente en qué carpeta guardar (Propiedades → pestaña **Salida**).

## Bitácora (15 min)

:::pregunta id="g8-b1"
¿En qué se parece y en qué se diferencia nuestro gemelo de uno usado en una fábrica real?
:::

:::pregunta id="g8-b2"
¿Qué parte de la presentación nos pone más nerviosos y cómo la vamos a practicar?
:::

Antes de irse, suban `equipo_NOMBRE_gemelo.blend` y los tres renders juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Usar Eevee como motor de render para que sea rápido.
- Si el texto 3D se ve negro, falta luz en la escena: agregar una luz de Sol.
- Opción avanzada para quien vaya rápido: un script de Python en Blender que lea un valor y cambie el color (se verá en Básico III).
- Pedir que el cartel quede terminado en casa o durante la semana.
- Tiempo total: 10 + 25 + 20 + 20 + 25 + 5 + 15 = 120 minutos.
:::

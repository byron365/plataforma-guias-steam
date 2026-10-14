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

:::animacion tipo="gemelo-digital"
:::

## Parte 2 · Materiales de colores (25 min)

1. Abre el archivo de la estación. Selecciona la torre.
2. Ve a la pestaña **Material** → **Nuevo**. Nómbralo *Clima*.
3. Cambia el **Color base** según la temperatura:

| Estado | Color base (R, G, B) | Temperatura |
| --- | --- | --- |
| Frío | 0, 0, 1 | Menor que FRÍO |
| Normal | 0, 1, 0 | Entre FRÍO y CALOR |
| Calor | 1, 0, 0 | Mayor que CALOR |

4. Activa la vista **Material** (Z → Vista de material) para ver el color.

[IMAGEN 8.1: carcasa en Blender con el material Clima en color verde y el panel de Material abierto]

## Parte 3 · Un texto con el dato (20 min)

1. **Shift + A → Texto.** En modo edición (**Tab**) borra "Text" y escribe la temperatura, por ejemplo **24.6 °C**.
2. Agrégale grosor: pestaña de datos del texto → **Extrusión 2**.
3. Colócalo frente a la estación y gíralo para que se lea desde la cámara.

[IMAGEN 8.2: gemelo digital con un texto 3D que dice 24.6 °C frente a la carcasa]

## Parte 4 · Tres renders con datos reales (20 min)

Usa la máxima, la mínima y el promedio de tu hoja de cálculo (sábado 7) o inventa un día frío y uno caluroso.

1. Coloca la cámara (**Numpad 0** para ver por ella; **Ctrl + Alt + Numpad 0** para ponerla en tu vista).
2. Para cada estado: cambia el color y el texto, luego **F12** y **Imagen → Guardar**.

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

## Bitácora (15 min)

:::pregunta id="g8-b1"
¿En qué se parece y en qué se diferencia nuestro gemelo de uno usado en una fábrica real?
:::

:::pregunta id="g8-b2"
¿Qué parte de la presentación nos pone más nerviosos y cómo la vamos a practicar?
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Usar Eevee como motor de render para que sea rápido.
- Si el texto 3D se ve negro, falta luz en la escena: agregar una luz de Sol.
- Opción avanzada para quien vaya rápido: un script de Python en Blender que lea un valor y cambie el color (se verá en Básico III).
- Pedir que el cartel quede terminado en casa o durante la semana.
- Tiempo total: 10 + 25 + 20 + 20 + 25 + 5 + 15 = 120 minutos.
:::

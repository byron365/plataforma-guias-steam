---
titulo: El gemelo digital cobra vida
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · El gemelo digital cobra vida

## Objetivo del día

Crear el gemelo digital de la estación en Tinkercad: un modelo que cambia de color según la temperatura medida. Además, preparar el guion y el cartel de la presentación.

**Al terminar tendremos:** tres imágenes del gemelo (frío, normal y calor) y el guion de la presentación listo.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad con el diseño **equipo_NOMBRE_estacion**
- Datos y gráfica del sábado 7
- Cartulina, marcadores (para el cartel)

## Parte 1 · ¿Qué hace un gemelo digital? (10 min)

Un gemelo digital es una copia virtual de un objeto real que **muestra sus datos**. Las fábricas, los aviones y las ciudades inteligentes los usan para vigilar lo que pasa sin estar ahí.

Nuestro gemelo: la carcasa en Tinkercad que se pinta de **azul, verde o rojo**, igual que el LED.

Muevan la temperatura en la animación y fíjense en el color del gemelo:

:::animacion tipo="gemelo-digital"
:::

## Parte 2 · Colores del gemelo (25 min)

En Tinkercad, el bloque **Definir color** (de **Modificar**) pinta la forma seleccionada con tres números: **Rojo**, **Verde** y **Azul**, cada uno de 0 a 255. Igual que el LED RGB de la estación.

1. Abre el diseño **equipo_NOMBRE_estacion** (**Diseños → Codeblocks**).
   - Pueden cambiar los colores sin miedo: el `.stl` de la carcasa ya lo exportaron en la Guía 4 y el color no cambia la forma.
2. Al final del programa, justo debajo del último **Group Selection**, arrastra el bloque **Definir color** que tiene las casillas **Rojo**, **Verde** y **Azul** (hay otro con Tonalidad y Saturación: ese no).
   - Como la carcasa agrupada es lo último que quedó seleccionado, el bloque la pinta **completa**.
3. Escribe los tres números del color **Normal** de la tabla.

| Estado | Color (R, G, B) | Temperatura |
| --- | --- | --- |
| Frío | 0, 0, 255 (azul) | Menor que FRÍO |
| Normal | 0, 255, 0 (verde) | Entre FRÍO y CALOR |
| Calor | 255, 0, 0 (rojo) | Mayor que CALOR |

4. Ejecuta con **▷**: la carcasa debe verse toda verde.

[IMAGEN 8.1T: carcasa en Tinkercad Codeblocks pintada de verde con el bloque Definir color al final del programa]

## Parte 3 · Un texto con el dato (20 min)

1. **Texto:** al final del programa (debajo de **Definir color**), de **Formas**, arrastra el bloque **Texto**.
   - En su casilla de texto borra lo que trae y escribe la temperatura, por ejemplo **24.6 C**.
   - Toca su **›**: **A = 2** es el grosor de las letras.
2. **Tamaño:** debajo, de **Modificar**, **Definir tamaño** con **X = 60**, **Y = 15**, **Z = 2** (60 mm de largo y 15 de alto).
3. **Pararlo y ponerlo al frente:**
   - Debajo, **Girar alrededor** con **Eje x** y **90** grados: el texto queda parado.
   - Debajo, **Mover: X 0, Y −70, Z 40**: queda frente a la torre, a media altura. Si no se lee bien desde el frente, cambien el signo de la Y o giren −90.
   - Su círculo de color: blanco o del color del estado.
4. **Ojo:** el texto va **después** de Group Selection, así no se une a la carcasa. Antes de exportar otra vez la carcasa (Guía 11), quiten estos bloques del texto (arrástrenlos a la columna de bloques).

[IMAGEN 8.2T: gemelo digital en Tinkercad con un texto 3D que dice 24.6 C frente a la carcasa]

## Parte 4 · Tres imágenes con datos reales (20 min)

Usa la máxima, la mínima y el promedio de tu hoja de cálculo (sábado 7) o inventa un día frío y uno caluroso.

1. Para cada estado de la tabla:
   - **Color:** cambia los tres números del bloque **Definir color** (Parte 2).
   - **Texto:** cambia el número en el bloque Texto.
   - Ejecuta con **▷**.
2. **Guardar la imagen:**
   - **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**.
   - Gira y acerca la escena hasta que se vean bien la torre y el texto.
   - Presiona **Captura de pantalla**. La imagen queda en **Descargas**: cámbiale el nombre al de la tabla.

| Imagen | Temperatura del texto | Color | Archivo |
| --- | --- | --- | --- |
| Frío | | Azul | equipo_frio.png |
| Normal | | Verde | equipo_normal.png |
| Calor | | Rojo | equipo_calor.png |

[IMAGEN 8.3T: las tres imágenes del gemelo digital en Tinkercad lado a lado en azul, verde y rojo]

:::foto id="g8-renders"
Sube una de tus imágenes.
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

El cartel debe tener: nombre del equipo, foto o imagen del gemelo, la gráfica, la ficha técnica resumida y una frase de "lo que aprendimos".

Primero repartan el espacio a lápiz y luego pasen a marcador; título grande y frases cortas. La gráfica y la ficha técnica están en la Guía 7.

:::pregunta id="g8-p1"
¿Qué demostración en vivo harán para que el público vea que la estación funciona? (Ejemplo: calentar el sensor con la mano y que el LED cambie.)
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] El gemelo cambia de color.
- [ ] El gemelo muestra la temperatura con texto 3D.
- [ ] Guardamos las tres imágenes.
- [ ] El guion tiene responsable para cada parte.
- [ ] Empezamos el cartel.
:::

## Reto extra

Haz una **animación** corta del gemelo girando, para mostrarla en la presentación.

Pasos: **Compartir** → **Imagen o vídeo** → **GIF animado**. La animación queda en **Descargas**. Pueden hacer una en azul y otra en rojo.

## Bitácora (15 min)

:::pregunta id="g8-b1"
¿En qué se parece y en qué se diferencia nuestro gemelo de uno usado en una fábrica real?
:::

:::pregunta id="g8-b2"
¿Qué parte de la presentación nos pone más nerviosos y cómo la vamos a practicar?
:::

Antes de irse, suban las tres imágenes juntas en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g8-archivo"
**Archivo de trabajo:** su diseño de bloques queda guardado en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…).
:::

:::docente
- **Versión Tinkercad (Codeblocks):** el color se cambia con el bloque Definir color (Rojo, Verde, Azul de 0 a 255) justo después del último Group Selection: pinta toda la carcasa agrupada (probado el 16 de octubre). El texto va después de Group Selection para no unirse a la carcasa; en la Guía 11 se quita antes de exportar.
- Pedir que el cartel quede terminado en casa o durante la semana.
- Tiempo total: 10 + 25 + 20 + 20 + 25 + 5 + 15 = 120 minutos.
:::

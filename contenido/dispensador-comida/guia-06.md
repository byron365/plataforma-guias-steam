---
titulo: ¿Cuántos gramos sirvió?
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · ¿Cuántos gramos sirvió?

## Objetivo del día

Hacer un experimento para descubrir cuántos gramos de comida caen según el tiempo que la compuerta está abierta, y corregir los atascos.

**Al terminar tendremos:** la tabla del experimento tiempo contra gramos y el dispensador sirviendo 10 veces seguidas sin atascarse.

## Materiales del equipo

- Dispensador completo
- Báscula de cocina
- Plato o vaso para pesar
- Croquetas
- Monitor serie (Arduino IDE)

## Parte 1 · Preparar el experimento (15 min)

En un experimento cambiamos **una sola cosa** y medimos lo que pasa:

| Lo que cambiamos | Lo que medimos | Lo que dejamos igual |
| --- | --- | --- |
| Tiempo abierta (ms) | Gramos de comida | Cantidad en la botella, ángulo de apertura, el mismo plato |

1. Llena la botella siempre hasta la **misma marca** (por ejemplo, la mitad).
   - Hagan una raya con plumón en la botella a esa altura. Antes de cada servida, rellenen hasta la raya.
2. Pon el plato en la báscula y presiona **tara** (cero).
   - Enciendan la báscula, pongan el plato vacío encima y presionen el botón **Tara** (o **Zero**, o **T**): la pantalla vuelve a 0 aunque el plato esté encima. Así la báscula pesa solo la comida.
   - Revisen que la báscula marque **gramos (g)**. Si dice oz o lb, cámbienla con el botón de unidades.
3. Conecten el dispensador y abran su programa de la Guía 5 (`equipo_NOMBRE_servir`; si están en otra computadora, descárguenlo del recuadro de la Guía 5).

:::pregunta id="g6-p1"
¿Por qué hay que llenar la botella siempre hasta la misma marca?
:::

## Parte 2 · El experimento (50 min)

Cambia `TIEMPO_ABIERTA` en el código y sirve **5 veces** con cada tiempo. Pesa cada porción y vacía el plato.

Así se hace cada fila de la tabla:

1. En la línea `const int TIEMPO_ABIERTA = 1000;` cambia el número por el tiempo de la fila (500, 1000, 1500 o 2000) y sube el código (→).
2. Pon el plato bajo la salida, presiona el botón una vez y espera a que la compuerta se cierre.
3. Pon el plato en la báscula (ya en cero con la tara), lee los gramos y anótalos en el intento que toca.
4. Devuelve las croquetas a la botella (hasta la raya) y repite hasta completar los 5 intentos.
5. Calcula el promedio de la fila.

:::tabla id="g6-gramos"
| Tiempo (ms) | Intento 1 (g) | Intento 2 (g) | Intento 3 (g) | Intento 4 (g) | Intento 5 (g) | Promedio (g) |
| --- | --- | --- | --- | --- | --- | --- |
| 500 | | | | | | |
| 1000 | | | | | | |
| 1500 | | | | | | |
| 2000 | | | | | | |
:::

> Promedio = suma de los 5 intentos ÷ 5

Ejemplo con números inventados: si los 5 intentos dieron 10, 12, 11, 9 y 13 g, la suma es 55 y el promedio es 55 ÷ 5 = 11 g.

[IMAGEN 6.1: báscula de cocina pesando la porción de croquetas servida por el dispensador]

:::pregunta id="g6-p2"
¿Los 5 intentos con el mismo tiempo dieron exactamente lo mismo? ¿Por qué crees que varían?
:::

## Parte 3 · Corregir atascos (25 min)

Sirve **10 veces seguidas** con 1000 ms y anota:

Pongan `TIEMPO_ABIERTA` otra vez en 1000 y suban el código. En cada servida, si se atascó, escriban qué hicieron para arreglarlo (si no se atascó, dejen la última columna vacía o escriban "nada").

:::tabla id="g6-atascos"
| Servida | ¿Se atascó? | ¿Qué hicimos para arreglarlo? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |
| 7 | | |
| 8 | | |
| 9 | | |
| 10 | | |
:::

Ideas para evitar atascos:

- Abrir más la compuerta (ABIERTA = 90).
- "Sacudir" la compuerta: abrir, cerrar un poco y volver a abrir.
- Lijar el interior del embudo.

Para la sacudida: dentro de `servir()`, busca la línea `compuerta.write(ABIERTA);` y escribe estas tres líneas justo debajo de ella (antes del `delay(TIEMPO_ABIERTA);`):

```cpp
// sacudida dentro de servir(), después de abrir:
compuerta.write(ABIERTA - 20);
delay(100);
compuerta.write(ABIERTA);
```

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Hicimos 5 intentos con cada tiempo.
- [ ] Calculamos los promedios.
- [ ] Servimos 10 veces seguidas.
- [ ] Corregimos los atascos.
:::

## Reto extra

Agrega `Serial.println("Servido");` al final de `servir()` y cuenta las servidas en el Monitor serie.

Pistas: para que funcione, también hace falta `Serial.begin(9600);` dentro del `setup()`. El Monitor serie se abre con la lupa (arriba a la derecha), a 9600 baudios.

## Bitácora (25 min)

:::foto id="g6-foto"
Foto del experimento con la báscula.
:::

:::pregunta id="g6-b1"
¿Qué relación encontramos entre el tiempo y los gramos?
:::

Antes de irse, guarden el programa (**Ctrl + S**) y súbanlo aquí. La tabla de gramos queda guardada en esta guía: la usarán el próximo sábado.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay báscula para todos, rotarla entre equipos; las pruebas de atascos se hacen mientras esperan.
- Las croquetas grandes varían más que el cereal pequeño: es normal; se discute en el sábado 7 (variación).
- Guardar la tabla g6-gramos: se usa para la gráfica del sábado 7.
- Tiempo total: 15 + 50 + 25 + 5 + 25 = 120 minutos.
:::

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
2. Pon el plato en la báscula y presiona **tara** (cero).

:::pregunta id="g6-p1"
¿Por qué hay que llenar la botella siempre hasta la misma marca?
:::

## Parte 2 · El experimento (50 min)

Cambia `TIEMPO_ABIERTA` en el código y sirve **5 veces** con cada tiempo. Pesa cada porción y vacía el plato.

:::tabla id="g6-gramos"
| Tiempo (ms) | Intento 1 (g) | Intento 2 (g) | Intento 3 (g) | Intento 4 (g) | Intento 5 (g) | Promedio (g) |
| --- | --- | --- | --- | --- | --- | --- |
| 500 | | | | | | |
| 1000 | | | | | | |
| 1500 | | | | | | |
| 2000 | | | | | | |
:::

> Promedio = suma de los 5 intentos ÷ 5

[IMAGEN 6.1: báscula de cocina pesando la porción de croquetas servida por el dispensador]

:::pregunta id="g6-p2"
¿Los 5 intentos con el mismo tiempo dieron exactamente lo mismo? ¿Por qué crees que varían?
:::

## Parte 3 · Corregir atascos (25 min)

Sirve **10 veces seguidas** con 1000 ms y anota:

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

## Bitácora (25 min)

:::foto id="g6-foto"
Foto del experimento con la báscula.
:::

:::pregunta id="g6-b1"
¿Qué relación encontramos entre el tiempo y los gramos?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay báscula para todos, rotarla entre equipos; las pruebas de atascos se hacen mientras esperan.
- Las croquetas grandes varían más que el cereal pequeño: es normal; se discute en el sábado 7 (variación).
- Guardar la tabla g6-gramos: se usa para la gráfica del sábado 7.
- Tiempo total: 15 + 50 + 25 + 5 + 25 = 120 minutos.
:::

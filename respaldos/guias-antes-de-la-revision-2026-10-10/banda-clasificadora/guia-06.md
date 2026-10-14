---
titulo: Calibrar y sincronizar
guia: 6
sabado: 6
sesion: Pruebas funcionales
duracion: 120
---

# Guía 6 · Calibrar y sincronizar

## Objetivo del día

Calibrar el sensor de color con muchas mediciones, medir el tiempo que tarda una pieza del sensor al desviador y probar los requisitos.

**Al terminar tendremos:** la tabla de calibración de colores, el valor de RECORRIDO medido y el primer porcentaje de aciertos.

## Materiales del equipo

- Banda completa
- 10 piezas de cada color
- Cronómetro o video en cámara lenta
- Hoja de cálculo

## Parte 1 · Calibrar los colores (35 min)

Con la banda detenida, pon cada pieza bajo el sensor **5 veces** (en distinta posición) y anota los valores crudos:

:::tabla id="g6-calibracion"
| Pieza | Medición | R | G | B | C |
| --- | --- | --- | --- | --- | --- |
| Roja | 1 | | | | |
| Roja | 2 | | | | |
| Roja | 3 | | | | |
| Verde | 1 | | | | |
| Verde | 2 | | | | |
| Verde | 3 | | | | |
| Azul | 1 | | | | |
| Azul | 2 | | | | |
| Azul | 3 | | | | |
:::

:::animacion tipo="calibracion-color" tabla="g6-calibracion"
:::

:::pregunta id="g6-p1"
¿Hay algún color donde dos canales sean muy parecidos? ¿Puede eso causar errores?
:::

## Parte 2 · Medir el recorrido (30 min)

**RECORRIDO** es el tiempo que tarda una pieza en ir del sensor de color al desviador. Depende de la velocidad.

1. Graba en cámara lenta una pieza pasando del sensor al desviador.
2. Cuenta los cuadros o usa el cronómetro.

:::tabla id="g6-recorrido"
| Velocidad (perilla) | Intento 1 (ms) | Intento 2 (ms) | Intento 3 (ms) | Promedio (ms) |
| --- | --- | --- | --- | --- |
| Baja | | | | |
| Media | | | | |
| Alta | | | | |
:::

:::pregunta id="g6-p2"
Si el RECORRIDO cambia con la velocidad, ¿cómo podría el programa calcularlo solo? (Pista: el nodo banda envía la velocidad.)
:::

Escribe en el código el RECORRIDO de la velocidad media: ______ ms.

## Parte 3 · Primer lote de prueba (40 min)

Mezcla 15 piezas (5 de cada color), pásalas de una en una a velocidad media y anota:

:::tabla id="g6-lote"
| Pieza | Color real | Color detectado | ¿Desvió bien? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |
| 11 | | | |
| 12 | | | |
| 13 | | | |
| 14 | | | |
| 15 | | | |
:::

> Aciertos (%) = piezas en el contenedor correcto ÷ 15 × 100

Aciertos: ______ %

:::tabla id="g6-errores"
| Tipo de error | ¿Cuántas veces? |
| --- | --- |
| Color mal detectado | |
| Color bien detectado pero mal desviado | |
| Pieza no detectada | |
| Pieza contada dos veces | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Calibramos los tres colores.
- [ ] Medimos el recorrido a tres velocidades.
- [ ] Probamos un lote de 15 piezas.
- [ ] Clasificamos los errores por tipo.
:::

## Bitácora (10 min)

:::tabla id="g6-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Separar los errores por tipo es clave: cada tipo tiene una causa distinta (sensor, tiempo o detección) y se corrige en la guía 7.
- g6-p2: RECORRIDO = distancia ÷ velocidad; con la velocidad que envía el nodo banda se puede calcular (reto de la guía 8).
- Tiempo total: 35 + 30 + 40 + 5 + 10 = 120 minutos.
:::

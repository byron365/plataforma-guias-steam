---
titulo: Ni un gol de más, ni uno de menos
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · Ni un gol de más, ni uno de menos

## Objetivo del día

Calibrar los sensores, entender el antirrebote que evita contar un gol dos veces y jugar el primer partido completo con tiempo.

**Al terminar tendremos:** un marcador confiable, comprobado con 20 goles de prueba, y nuestro primer partido completo.

## Materiales del equipo

- Cancha con marcador (sábado 5)
- Pelota y jugadores o paletas para empujarla
- Destornillador pequeño

## Parte 1 · Calibrar la sensibilidad (25 min)

Cada sensor tiene un **tornillo azul** (potenciómetro) que cambia hasta qué distancia detecta.

1. Con el código de prueba del sábado 5, gira el tornillo **a la izquierda** hasta que el LED del sensor se apague sin pelota.
   - El código de prueba está en la **Guía 5, Parte 3**: cópienlo a un programa nuevo y súbanlo. Abran el Monitor serie (9600 baudios) para ver los 1 y 0.
   - Giren el tornillo con el destornillador pequeño, poco a poco (un cuarto de vuelta cada vez).
2. Gíralo **poco a poco a la derecha** hasta que detecte la pelota dentro de la portería, pero **no** cuando pasa por fuera, frente a ella.
   - Después de cada pequeño giro, pongan la pelota dentro y fuera, y miren el LED y el Monitor serie.

Muevan el tornillo en la animación y miren cómo cambia la distancia a la que detecta:

:::animacion tipo="calibracion-ir"
:::

Hagan cada prueba en las dos porterías y escriban Sí o No. En la última columna, ¿el sensor hizo lo que debía?

:::tabla id="g6-calibracion"
| Prueba | Portería azul (¿detecta?) | Portería roja (¿detecta?) | ¿Es correcto? |
| --- | --- | --- | --- |
| Pelota en el fondo de la portería | | | |
| Pelota en la línea de gol | | | |
| Pelota pasando frente a la portería, por fuera | | | |
| Mano de un jugador cerca de la portería | | | |
:::

## Parte 2 · El antirrebote (20 min)

Cuando la pelota entra, se queda frente al sensor un momento o rebota. Sin protección, el marcador contaría **varios goles**. Por eso el código usa una pausa:

Estas líneas ya están en su código del marcador (en el `loop()`, en la parte "2. ¿Gol?"):

```cpp
bool listo = millis() - ultimoGol > PAUSA_GOL;
if (listo && digitalRead(SENSOR_AZUL) == LOW)
  gol(golesRojo, "ROJO");
```

Después de un gol, el marcador **ignora** los sensores durante `PAUSA_GOL` milisegundos.

`millis()` es el tiempo, en milisegundos, desde que se encendió el Arduino. `ultimoGol` guarda el `millis()` del último gol.

Muevan los controles de la animación para ver qué goles cuenta y cuáles ignora:

:::animacion tipo="antirrebote"
:::

:::pregunta id="g6-p1"
Hubo un gol cuando `millis()` valía 40 000. Con PAUSA_GOL = 1500, ¿a partir de qué valor de `millis()` puede contarse el siguiente gol?
:::

## Parte 3 · Prueba de 20 goles (25 min)

Prueba distintas pausas. Para cada una, metan **10 goles** en cada portería y cuenten cuántos marcó el tablero:

1. Suban su programa del marcador (`equipo_NOMBRE_marcador`, Guía 5) con el valor de la fila en la línea `const unsigned long PAUSA_GOL = 1500;`.
2. Inicien un partido y metan 10 goles en cada portería, uno por uno, de forma parecida (no muy rápido ni muy lento). Una persona cuenta los goles reales.
3. Anoten cuántos goles sumó el marcador (azul + rojo).

:::tabla id="g6-goles"
| PAUSA_GOL (ms) | Goles reales | Goles en el marcador | ¿Contó de más o de menos? |
| --- | --- | --- | --- |
| 0 | 20 | | |
| 500 | 20 | | |
| 1500 | 20 | | |
| 3000 | 20 | | |
:::

> Precisión (%) = Goles en el marcador ÷ Goles reales × 100

Ejemplo con números inventados: si el marcador sumó 19 de 20 goles, la precisión es 19 ÷ 20 × 100 = 95 %. Si contó de más (por ejemplo 22), la precisión pasa de 100 %: también es un error.

Nuestra pausa elegida: ______ ms · Precisión: ______ %

:::pregunta id="g6-p2"
¿Qué problema aparece si la pausa es muy larga?
:::

## Parte 4 · ¡Primer partido completo! (30 min)

1. Ajusta `DURACION` a **2 minutos** (120000).
   - Cambien la línea `const unsigned long DURACION = 180000;` por `120000`, dejen su `PAUSA_GOL` elegida y suban el código.
2. Dos integrantes juegan, los otros observan y anotan si el marcador se equivocó.
   - Presionen el botón de inicio y muevan la pelota como acuerden (dedos, paletas o soplando).
3. Cambien de jugadores y repitan.

[IMAGEN 6.1: primer partido en la cancha con el marcador mostrando el tiempo y los goles]

| Partido | Jugadores | Resultado | ¿El marcador acertó en todos los goles? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Calibramos los dos sensores.
- [ ] Entendimos el antirrebote.
- [ ] Hicimos la prueba de 20 goles.
- [ ] La precisión es de 95 % o más.
- [ ] Jugamos un partido completo.
:::

## Reto extra

Agrega un aviso cuando faltan **10 segundos**: tres pitidos cortos.

Pista: en el `loop()`, cuando `DURACION - pasado` sea menor que 10000, suenen tres `tone` cortos. Usen una variable `bool avisado` para que solo suene una vez por partido (y regrésenla a `false` al empezar otro).

## Bitácora (15 min)

:::foto id="g6-foto"
Foto o video del primer partido.
:::

:::pregunta id="g6-b1"
¿Por qué es importante que el marcador sea confiable?
:::

Antes de irse, guarden el programa con su pausa elegida (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g6-p1: a partir de 41 500 ms.
- g6-p2: si la pausa es larga, un gol rápido justo después no se cuenta.
- Con PAUSA_GOL = 0 la función `gol()` ya tiene `delay(1200)` en total, así que también protege un poco: comentarlo si preguntan por qué con 0 no cuenta tantos de más.
- El reto necesita una variable `bool avisado` para que solo suene una vez.
- Tiempo total: 25 + 20 + 25 + 30 + 5 + 15 = 120 minutos.
:::

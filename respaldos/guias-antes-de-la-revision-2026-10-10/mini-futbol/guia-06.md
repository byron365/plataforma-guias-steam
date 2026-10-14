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
2. Gíralo **poco a poco a la derecha** hasta que detecte la pelota dentro de la portería, pero **no** cuando pasa por fuera, frente a ella.

:::animacion tipo="calibracion-ir"
:::

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

```cpp
bool listo = millis() - ultimoGol > PAUSA_GOL;
if (listo && digitalRead(SENSOR_AZUL) == LOW)
  gol(golesRojo, "ROJO");
```

Después de un gol, el marcador **ignora** los sensores durante `PAUSA_GOL` milisegundos.

:::animacion tipo="antirrebote"
:::

:::pregunta id="g6-p1"
Hubo un gol cuando `millis()` valía 40 000. Con PAUSA_GOL = 1500, ¿a partir de qué valor de `millis()` puede contarse el siguiente gol?
:::

## Parte 3 · Prueba de 20 goles (25 min)

Prueba distintas pausas. Para cada una, metan **10 goles** en cada portería y cuenten cuántos marcó el tablero:

:::tabla id="g6-goles"
| PAUSA_GOL (ms) | Goles reales | Goles en el marcador | ¿Contó de más o de menos? |
| --- | --- | --- | --- |
| 0 | 20 | | |
| 500 | 20 | | |
| 1500 | 20 | | |
| 3000 | 20 | | |
:::

> Precisión (%) = Goles en el marcador ÷ Goles reales × 100

Nuestra pausa elegida: ______ ms · Precisión: ______ %

:::pregunta id="g6-p2"
¿Qué problema aparece si la pausa es muy larga?
:::

## Parte 4 · ¡Primer partido completo! (30 min)

1. Ajusta `DURACION` a **2 minutos** (120000).
2. Dos integrantes juegan, los otros observan y anotan si el marcador se equivocó.
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

## Bitácora (15 min)

:::foto id="g6-foto"
Foto o video del primer partido.
:::

:::pregunta id="g6-b1"
¿Por qué es importante que el marcador sea confiable?
:::

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

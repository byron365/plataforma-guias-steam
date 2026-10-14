---
titulo: Estadísticas del partido
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · Estadísticas del partido

## Objetivo del día

Jugar partidos de prueba, registrar sus estadísticas, enviar los goles a la computadora por el puerto serie y escribir la ficha técnica.

**Al terminar tendremos:** la tabla de partidos de prueba, el registro de goles con su minuto y la ficha técnica.

## Materiales del equipo

- Cancha con marcador
- Computadora con Arduino IDE y hoja de cálculo

## Parte 1 · El marcador también informa (25 min)

Hagamos que cada gol se envíe a la computadora con el **segundo** en que se anotó. Agrega en `setup()`:

```cpp
Serial.begin(9600);
```

Y al inicio de la función `gol()`:

```cpp
Serial.print((millis() - inicio) / 1000);  // segundo del partido
Serial.print(",");
Serial.println(equipo);
```

Al terminar el partido, el monitor serie muestra algo así:

```
14,AZUL
37,ROJO
52,AZUL
```

:::pregunta id="g7-p1"
¿Qué significa la línea `37,ROJO`?
:::

## Parte 2 · Partidos de prueba (40 min)

Jueguen **4 partidos de 2 minutos**, rotando jugadores. Al final de cada uno copien el monitor serie en la hoja de cálculo.

:::tabla id="g7-partidos"
| Partido | Jugador azul | Jugador rojo | Goles azul | Goles rojo | Ganador |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
:::

[IMAGEN 7.1: monitor serie con el registro de goles y la hoja de cálculo con los segundos de cada gol]

## Parte 3 · Analizar los goles (20 min)

En la hoja de cálculo, con los segundos de todos los goles, cuenten cuántos hubo en cada parte del partido:

| Tramo del partido | Número de goles |
| --- | --- |
| 0 a 30 s | |
| 31 a 60 s | |
| 61 a 90 s | |
| 91 a 120 s | |

:::pregunta id="g7-p2"
¿En qué tramo se anotaron más goles? ¿Por qué creen que pasa?
:::

:::pregunta id="g7-p3"
Calcula el promedio de goles por partido. ¿Es un juego con muchos o pocos goles?
:::

## Parte 4 · Ficha técnica (20 min)

:::tabla id="g7-ficha"
| Característica | Valor |
| --- | --- |
| Nombre de la cancha | |
| Medidas de la cancha y escala | |
| Medidas de las porterías | |
| Sensores | |
| Pausa antirrebote | |
| Precisión del marcador | |
| Duración del partido | |
| Alimentación | |
| Pelota usada | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] El marcador envía los goles a la computadora.
- [ ] Jugamos 4 partidos de prueba.
- [ ] Analizamos los goles por tramo.
- [ ] Completamos la ficha técnica.
:::

## Reto extra

Haz una **gráfica de columnas** con los goles por tramo del partido.

## Bitácora (10 min)

:::pregunta id="g7-b1"
¿Para qué sirven las estadísticas en el fútbol real?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Recordar abrir el monitor serie antes de iniciar el partido; al abrirlo el Arduino se reinicia.
- Guardar la hoja de cálculo: se usa en el sábado 10.
- Para contar por tramos: `=CONTAR.SI.CONJUNTO(A:A;">=0";A:A;"<=30")`, o contarlo a mano.
- Tiempo total: 25 + 40 + 20 + 20 + 5 + 10 = 120 minutos.
:::

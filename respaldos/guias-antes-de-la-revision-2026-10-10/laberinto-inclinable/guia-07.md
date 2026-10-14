---
titulo: El récord y la ficha técnica
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · El récord y la ficha técnica

## Objetivo del día

Entender cómo el programa guarda el récord, registrar los tiempos de muchas partidas y escribir la ficha técnica del laberinto.

**Al terminar tendremos:** una tabla con al menos 15 partidas, su promedio y la ficha técnica del laberinto.

## Materiales del equipo

- Laberinto completo
- Computadora con hoja de cálculo

## Parte 1 · ¿Cómo funciona el récord? (15 min)

Revisa esta parte del código:

```cpp
if (record == 0 || t < record) {
  record = t;
  mostrar("RECORD!", s);
} else {
  mostrar("Meta", s);
}
```

| Símbolo | Significado |
| --- | --- |
| `\|\|` | "o": basta con que una condición se cumpla |
| `<` | "menor que" |
| `record = t` | guarda el tiempo nuevo como récord |

:::pregunta id="g7-p1"
El récord es 25,3 s. Alguien llega en 27,0 s. ¿Qué muestra la pantalla? ¿Y si llega en 22,1 s?
:::

:::pregunta id="g7-p2"
¿Qué pasa con el récord si desconectamos el Arduino? ¿Por qué?
:::

## Parte 2 · Mostrar el récord en pantalla (20 min)

Mientras se espera a jugar, la pantalla debe mostrar el récord. En el `loop`, justo antes de `if (!jugando) return;`, agrega:

```cpp
if (!jugando && record > 0) {
  mostrar("Record", String(record / 1000.0, 1) + " s");
}
```

[IMAGEN 7.1: pantalla OLED mostrando el récord mientras el laberinto espera la siguiente partida]

## Parte 3 · Registro de partidas (40 min)

Cada integrante juega **4 partidas**. El analista anota todos los tiempos:

:::tabla id="g7-partidas"
| Partida | Jugador | Tiempo (s) | ¿Récord? |
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
| 16 | | | |
:::

Pasen la tabla a la hoja de cálculo y calculen:

| Dato | Fórmula | Resultado |
| --- | --- | --- |
| Mejor tiempo | `=MIN(C:C)` | |
| Peor tiempo | `=MAX(C:C)` | |
| Promedio | `=PROMEDIO(C:C)` | |

[IMAGEN 7.2: hoja de cálculo con los tiempos de las partidas y el promedio calculado]

## Parte 4 · Ficha técnica (25 min)

:::tabla id="g7-ficha"
| Característica | Valor |
| --- | --- |
| Nombre del laberinto | |
| Medidas del tablero | |
| Número de casillas | |
| Inclinación máxima | |
| Valor de suavizado | |
| Sensores y actuadores | |
| Alimentación | |
| Récord actual | |
| Tiempo promedio | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Entendimos el código del récord.
- [ ] La pantalla muestra el récord al esperar.
- [ ] Registramos al menos 15 partidas.
- [ ] Calculamos mejor, peor y promedio.
- [ ] Completamos la ficha técnica.
:::

## Reto extra

Haz que la pantalla muestre también cuántas partidas se han jugado, con una variable `int partidas = 0;` que sume 1 cada vez que la canica llega a la meta.

## Bitácora (15 min)

:::pregunta id="g7-b1"
¿Quién del equipo tuvo el mejor promedio? ¿Qué técnica usó?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g7-p1: 27,0 s → "Meta"; 22,1 s → "RECORD!".
- g7-p2: se pierde, porque las variables viven en la memoria RAM, que se borra al apagar. Se resolverá con EEPROM en el sábado 12.
- Mostrar el récord en cada vuelta hace parpadear la OLED: si molesta, mostrarlo solo una vez al terminar la partida.
- Guardar la hoja de cálculo: se usa en el sábado 10.
- Tiempo total: 15 + 20 + 40 + 25 + 5 + 15 = 120 minutos.
:::

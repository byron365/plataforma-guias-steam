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

Está en el `loop()` de `equipo_NOMBRE_juego` (Guía 6), dentro del bloque que revisa si la canica llegó a la meta.

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

1. Abran `equipo_NOMBRE_juego` (si están en otra computadora, descárguenlo del recuadro de la Guía 6).
2. Busquen en el `loop()` la línea `if (!jugando) return;` y escriban las tres líneas de abajo **justo arriba** de ella.
3. Verifiquen (✓), suban (→), pongan las pilas y jueguen una partida: al terminar, la pantalla debe mostrar el récord mientras espera.

```cpp
if (!jugando && record > 0) {
  mostrar("Record", String(record / 1000.0, 1) + " s");
}
```

`record / 1000.0` convierte milisegundos en segundos, y el `1` deja un solo decimal.

[IMAGEN 7.1: pantalla OLED mostrando el récord mientras el laberinto espera la siguiente partida]

## Parte 3 · Registro de partidas (40 min)

Cada integrante juega **4 partidas**. El analista anota todos los tiempos:

- Tomen turnos: cada quien juega una partida y pasa el joystick al siguiente, hasta completar 4 cada uno.
- Anoten el tiempo que muestra la pantalla al llegar a la meta. En **¿Récord?** escriban Sí si la pantalla dijo "RECORD!".
- No apaguen el Arduino durante el registro.

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

1. Abran Excel, Google Sheets o LibreOffice Calc. En la fila 1 escriban los títulos: A1 `Partida`, B1 `Jugador`, C1 `Tiempo`, D1 `Récord`.
2. Copien las partidas, una por fila, desde la fila 2. Los tiempos van en la columna **C** (con el decimal que use su computadora: punto o coma).
3. Escriban cada fórmula en una celda vacía (por ejemplo, en la columna F) y presionen **Enter**. Si su hoja de cálculo está en inglés, usen `AVERAGE` en lugar de `PROMEDIO`.

| Dato | Fórmula | Resultado |
| --- | --- | --- |
| Mejor tiempo | `=MIN(C:C)` | |
| Peor tiempo | `=MAX(C:C)` | |
| Promedio | `=PROMEDIO(C:C)` | |

[IMAGEN 7.2: hoja de cálculo con los tiempos de las partidas y el promedio calculado]

## Parte 4 · Ficha técnica (25 min)

Una ficha técnica resume los datos importantes del laberinto. Busquen cada dato: medidas y casillas en la Guía 2, inclinación en la Guía 5, suavizado en la Guía 6, récord y promedio de hoy. En **Sensores y actuadores** escriban qué componentes miden algo (sensores) y cuáles mueven o avisan (actuadores).

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

Pistas: declaren `partidas` arriba, junto a `record`. Súmenle 1 (`partidas++;`) dentro del bloque de la meta, y muéstrenla en la pantalla mientras se espera.

## Bitácora (15 min)

:::pregunta id="g7-b1"
¿Quién del equipo tuvo el mejor promedio? ¿Qué técnica usó?
:::

Antes de irse: guarden la hoja de cálculo como `.xlsx` y el programa (**Ctrl + S**). Súbanlos aquí (juntos en un `.zip` o uno por uno). Saquen las pilas.

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

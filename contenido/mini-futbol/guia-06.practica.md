---
titulo: Simulamos el antirrebote y las estadísticas
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos el antirrebote y las estadísticas

## Objetivo del día

Entender el **antirrebote** que evita contar un gol dos veces, hacer que el marcador **envíe cada gol** a la computadora con su segundo y dejar listo el **programa final** del marcador.

**Al terminar tendremos:** el programa final probado en Wokwi y guardado para el marcador real.

## Materiales del equipo

- Computadora con internet y la cuenta de Wokwi del equipo
- El proyecto de Wokwi de la Guía 5
- Bitácora, lápiz y cronómetro (el del celular)

## Parte 1 · El antirrebote (35 min)

Cuando la pelota entra, se queda frente al sensor un momento o rebota. Sin protección, el marcador contaría **varios goles**. Por eso el código usa una pausa.

Estas líneas ya están en su código (en el `loop()`, en la parte "2. ¿Gol?"):

```cpp
bool listo = millis() - ultimoGol > PAUSA_GOL;
if (listo && digitalRead(SENSOR_AZUL) == LOW)
  gol(golesRojo, "ROJO");
```

Después de un gol, el marcador **ignora** los sensores durante `PAUSA_GOL` milisegundos. `ultimoGol` guarda el `millis()` del último gol.

Muevan los controles de la animación para ver qué goles cuenta y cuáles ignora:

:::animacion tipo="antirrebote"
:::

:::pregunta id="g6p-p1"
Hubo un gol cuando `millis()` valía 40 000. Con PAUSA_GOL = 1500, ¿a partir de qué valor de `millis()` puede contarse el siguiente gol?
:::

**Pruébalo en el simulador.** Una pelota que se queda frente al sensor es como un botón que se queda presionado.

1. Cambien la línea `const unsigned long PAUSA_GOL = 1500;` por el valor de la fila.
2. **Play**, empiecen un partido y **mantengan presionado** el botón de la portería azul durante **6 segundos** (una persona cronometra).
3. Anoten cuántos goles sumó el ROJO.

:::tabla id="g6p-pausas"
| PAUSA_GOL (ms) | Goles reales | Goles en el marcador (6 s presionado) | ¿Contó de más? |
| --- | --- | --- | --- |
| 0 | 1 | | |
| 1500 | 1 | | |
| 3000 | 1 | | |
| 6000 | 1 | | |
:::

4. Ahora, con `PAUSA_GOL = 6000`, hagan **dos goles rápidos**: dos clics cortos en el botón azul, uno cada 2 segundos.

:::pregunta id="g6p-p2"
¿Qué problema aparece si la pausa es muy larga?
:::

Al terminar, dejen `PAUSA_GOL = 1500`. Con los sensores reales, en la Guía 10, comprobarán si es la pausa correcta.

## Parte 2 · El marcador también informa (35 min)

Hagamos que cada gol se envíe a la computadora con el **segundo** en que se anotó.

1. Escriban esta línea dentro del `setup()`, por ejemplo después de `pinMode(SENSOR_ROJO, …);`:

```cpp
Serial.begin(9600);
```

2. Justo después de la línea `void gol(int &goles, String equipo) {`, antes de `goles++;`, escriban:

```cpp
Serial.print((millis() - inicio) / 1000);  // segundo del partido
Serial.print(",");
Serial.println(equipo);
```

3. Para probar rápido, cambien `DURACION` a **60000** (1 minuto).
4. **Play.** Abajo del dibujo aparece el **Monitor serie** de Wokwi. Empiecen un partido y metan unos goles con los botones. El monitor muestra algo así:

```
14,AZUL
37,ROJO
52,AZUL
```

[IMAGEN 6.1P: simulación en Wokwi con el Monitor serie mostrando cada gol con su segundo y su equipo]

:::pregunta id="g6p-p3"
¿Qué significa la línea `37,ROJO`?
:::

Copien aquí los goles de su partido de prueba:

:::tabla id="g6p-registro"
| Gol | Segundo | Equipo |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
:::

## Parte 3 · El programa final (30 min)

1. Pongan los ajustes del partido real:
   - `DURACION` en **120000** (2 minutos). Cambien también su comentario a `// 2 min en ms`.
   - `PAUSA_GOL` en **1500**.
2. **Play** y prueben una última vez: inicio, un gol en cada portería y el Monitor serie.

:::checklist id="g6p-final"
- [ ] El botón de inicio hace sonar el silbato.
- [ ] Cada portería suma al equipo correcto.
- [ ] La pantalla celebra cada gol.
- [ ] El Monitor serie muestra el segundo y el equipo de cada gol.
- [ ] `DURACION` = 120000 y `PAUSA_GOL` = 1500.
:::

3. **Guarden el programa final:** presionen **Save**. Copien todo el código de `sketch.ino` (**Ctrl + A**, **Ctrl + C**) a un bloc de notas y guárdenlo como `equipo_NOMBRE_marcador.txt`. Es el programa que van a subir al marcador real en la Guía 9.

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] Entendimos el antirrebote.
- [ ] Probamos varias pausas en el simulador.
- [ ] El marcador envía los goles al Monitor serie.
- [ ] Guardamos `equipo_NOMBRE_marcador.txt`.
:::

## Reto extra

Agrega un aviso cuando faltan **10 segundos**: tres pitidos cortos.

Pista: en el `loop()`, cuando `DURACION - pasado` sea menor que 10000, suenen tres `tone` cortos. Usen una variable `bool avisado` para que solo suene una vez por partido (y regrésenla a `false` al empezar otro).

## Bitácora (15 min)

:::pregunta id="g6p-b1"
¿Por qué es importante que el marcador sea confiable?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_marcador.txt`: es el programa final del marcador. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (9 sábados):** el antirrebote de la Guía 6 normal y el envío de goles por el puerto serie de la Guía 7 normal, en el simulador. La calibración de los sensores y la prueba de 20 goles quedan para el marcador real (guías 9 y 10). Campos propios (g6p-…).
- g6p-p1: a partir de 41 500 ms.
- g6p-pausas: con 6 segundos presionado, más o menos 5 goles con 0, 4 con 1500, 2 con 3000 y 1 con 6000 (cambia un poco según cuándo se suelta). Con PAUSA_GOL = 0 la función `gol()` ya tiene `delay(1200)` en total, así que también protege un poco.
- g6p-p2: si la pausa es larga, un gol rápido justo después no se cuenta (con 6000, el segundo clic no suma).
- g6p-p3: hubo un gol del equipo ROJO en el segundo 37 del partido.
- En Wokwi el Monitor serie se abre solo cuando el código usa `Serial`. En el Arduino real, el monitor se abre **antes** de presionar el botón de inicio (al abrirlo, el Arduino se reinicia).
- **Probado en Wokwi el 7 de noviembre** con el código de la Guía 5 y los cambios de la Parte 2: el Monitor serie muestra `3,ROJO`, `6,AZUL`… y con `PAUSA_GOL = 1500` el botón presionado 6 segundos sumó 4 goles. Circuito en `herramientas/wokwi/mini-futbol-guia-06.diagram.json`.
- Si en la computadora del equipo el simulador va lento (el % de la esquina queda muy por debajo de 100), los 6 segundos de la tabla se miden con el **reloj del simulador** (arriba a la derecha), no con el cronómetro del celular: si no, cuenta menos goles.
- El reto necesita una variable `bool avisado` para que solo suene una vez.
- Tiempo total: 35 + 35 + 30 + 5 + 15 = 120 minutos.
:::

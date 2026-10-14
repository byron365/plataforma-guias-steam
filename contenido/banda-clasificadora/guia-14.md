---
titulo: Supervisar la producción
guia: 14
sabado: 14
sesion: Proyección a Intermedio III
duracion: 120
---

# Guía 14 · Supervisar la producción

## Objetivo del día

Ver el conteo de la banda en el celular con un HC-05, registrar la producción en una hoja de cálculo y diseñar la banda 2.0.

**Al terminar tendremos:** el conteo llegando al celular, un registro de producción y el plan de la banda 2.0.

## Materiales del equipo

- Banda completa
- HC-05 con divisor 1 kΩ / 2 kΩ
- Celular Android con "Serial Bluetooth Terminal"
- Computadora con hoja de cálculo

## Parte 1 · El conteo en el celular (40 min)

En el clasificador, los pines D10, D11 y D13 los usa el display. Conecta el HC-05 con SoftwareSerial en **D8 (RX)** y **D9 (TX)**:

| HC-05 | Arduino clasificador |
| --- | --- |
| VCC / GND | 5V / GND |
| TXD | D8 |
| RXD | D9 → 1 kΩ → RXD, y RXD → 2 kΩ → GND |

- El **divisor de voltaje** baja los 5 V del Arduino a unos 3,3 V, que es lo que aguanta la entrada RXD del HC-05. Armen las dos resistencias en la protoboard: del pin D9 sale la de 1 kΩ hacia una fila; en esa fila va el cable al RXD del HC-05 y la resistencia de 2 kΩ hacia GND.
- Conecten con la fuente y el USB desconectados.

**Código** (en `equipo_NOMBRE_clasificador`):

1. `#include <SoftwareSerial.h>` y `SoftwareSerial bt(8, 9);` van arriba, junto a los otros `#include`.
2. `bt.begin(9600);` va dentro del `setup()`.
3. Las líneas de `bt.print` van al final de `clasificar()`, antes de su llave de cierre `}`. (Si hicieron el rechazo de la Guía 13, `c` puede ser −1: así el celular también se entera de los rechazos.)
4. Verifiquen (✓) y suban (→).

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(8, 9);

// en setup():
bt.begin(9600);

// al final de clasificar():
bt.print("PIEZA,");
bt.print(c);               // 0 rojo, 1 verde, 2 azul
bt.print(",");
bt.print(cuenta[0]); bt.print(",");
bt.print(cuenta[1]); bt.print(",");
bt.println(cuenta[2]);
```

[IMAGEN 14.1: celular mostrando los mensajes PIEZA con el conteo de la banda en una app de terminal Bluetooth]

**En el celular (Android):** instalen "Serial Bluetooth Terminal". Enciendan el Bluetooth del celular y emparejen el **HC-05** desde los ajustes del celular (la clave suele ser **1234** o **0000**). Abran la app, toquen el menú → **Devices**, elijan el HC-05 y conéctense. Pasen piezas por la banda: deben aparecer los mensajes.

:::pregunta id="g14-p1"
¿Por qué elegimos D8 y D9 para el HC-05 y no D10 y D11 como en otros proyectos?
:::

**Comandos desde el celular:** agrega que el clasificador reciba `S` (detener) y `G` (avanzar) por Bluetooth y los reenvíe al nodo banda por I2C.

Pistas: en el `loop()`, si `bt.available()`, lean la letra con `bt.read()` y guárdenla en una variable (por ejemplo `char ordenCelular`). Donde el `loop()` envía la orden al nodo banda (el bloque del paro), envíen `'S'` si el botón de paro está presionado **o** si la última orden del celular fue `'S'`.

## Parte 2 · Registro de producción (25 min)

Conecta el clasificador por USB, agrega también `Serial.println` con el mismo mensaje y pasa un lote. Copia el monitor a la hoja de cálculo:

1. Debajo de cada `bt.print(...)` de `clasificar()`, agreguen la misma línea cambiando `bt` por `Serial` (y `Serial.begin(9600);` en el `setup()` si no lo tienen).
2. Abran el Monitor serie, pasen un lote y cronometren cuánto tarda.
3. Copien el texto del monitor (clic dentro, Ctrl + A, Ctrl + C), péguenlo en la hoja de cálculo y sepárenlo con **Datos → Texto en columnas** (separador: coma).
4. Calculen: piezas totales (número de filas), piezas por minuto (total ÷ segundos × 60) y el porcentaje de cada color.

:::tabla id="g14-produccion"
| Dato | Valor |
| --- | --- |
| Piezas totales | |
| Piezas por minuto | |
| Porcentaje de cada color | |
| Rechazos | |
:::

:::pregunta id="g14-p2"
¿Qué decisiones podría tomar el gerente de una fábrica con estos datos?
:::

## Parte 3 · La banda 2.0 (40 min)

Marquen las ideas que le pondrían a su banda 2.0:

:::checklist id="g14-ideas"
- [ ] Supervisión remota por WiFi (tablero en internet)
- [ ] Registro de producción automático con fecha y hora
- [ ] Clasificación por tamaño o peso además del color
- [ ] Cámara con reconocimiento de imágenes
- [ ] Varias bandas comunicadas entre sí
- [ ] Alarma de atasco
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre de la banda 2.0 | |
| Nuevos requisitos | |
| Cambios en la arquitectura (nodos y buses) | |
| Cambios en la potencia | |
| ¿Qué necesitamos aprender? | |
:::

Dibujen el diagrama de bloques de la banda 2.0 (como el de la Guía 2) y súbanlo:

:::foto id="g14-boceto"
Diagrama de bloques de la banda 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] El conteo llega al celular.
- [ ] El celular puede detener la banda.
- [ ] Registramos la producción.
- [ ] Diseñamos la banda 2.0.
:::

## Bitácora (10 min)

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en Intermedio III?
:::

Antes de irse, suban el programa del clasificador con Bluetooth y la hoja de cálculo de producción (juntos en un `.zip`).

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g14-p1: D10 (CS), D11 (DIN) y D13 (CLK) están ocupados por el MAX7219.
- Si el servo usa D6 y SoftwareSerial causa temblores en el servo, es por las interrupciones; mencionarlo como limitación del UNO.
- Tiempo total: 40 + 25 + 40 + 5 + 10 = 120 minutos.
:::

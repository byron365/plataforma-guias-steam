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

:::pregunta id="g14-p1"
¿Por qué elegimos D8 y D9 para el HC-05 y no D10 y D11 como en otros proyectos?
:::

**Comandos desde el celular:** agrega que el clasificador reciba `S` (detener) y `G` (avanzar) por Bluetooth y los reenvíe al nodo banda por I2C.

## Parte 2 · Registro de producción (25 min)

Conecta el clasificador por USB, agrega también `Serial.println` con el mismo mensaje y pasa un lote. Copia el monitor a la hoja de cálculo:

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

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g14-p1: D10 (CS), D11 (DIN) y D13 (CLK) están ocupados por el MAX7219.
- Si el servo usa D6 y SoftwareSerial causa temblores en el servo, es por las interrupciones; mencionarlo como limitación del UNO.
- Tiempo total: 40 + 25 + 40 + 5 + 10 = 120 minutos.
:::

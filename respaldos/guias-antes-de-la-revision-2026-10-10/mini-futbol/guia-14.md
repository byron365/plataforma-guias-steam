---
titulo: El marcador en el celular
guia: 14
sabado: 14
sesion: Proyección a Básico III
duracion: 120
---

# Guía 14 · El marcador en el celular

## Objetivo del día

Descubrir cómo el marcador podría enviar los goles al celular por **Bluetooth** y diseñar la idea del mini fútbol 2.0.

**Al terminar tendremos:** una demostración del marcador enviando datos como lo haría por Bluetooth, y el plan del mini fútbol 2.0.

## Materiales del equipo

- Cancha con marcador
- Computadora con Arduino IDE
- Si hay: módulo Bluetooth HC-05 y celular Android con una app de terminal Bluetooth

## Parte 1 · ¿Cómo viajan los datos sin cables? (15 min)

El módulo **HC-05** recibe datos del Arduino por dos cables (TX y RX) y los envía por **Bluetooth** al celular. Para el Arduino, enviar al HC-05 es casi igual que usar `Serial.print`.

:::animacion tipo="bluetooth"
:::

:::pregunta id="g14-p1"
¿Qué ventajas tendría ver el marcador en el celular o en una pantalla grande?
:::

## Parte 2 · Mensajes para el celular (30 min)

Ya enviamos los goles a la computadora en el sábado 7. Ahora los enviamos en un formato que una app pueda entender, por ejemplo **marcador completo** en cada gol:

```cpp
// al final de la función gol():
Serial.print("MARCADOR:");
Serial.print(golesAzul);
Serial.print("-");
Serial.println(golesRojo);
```

Y cada 10 segundos el tiempo:

```cpp
// en el loop, justo después de calcular "pasado":
static unsigned long ultimoEnvio = 0;
if (millis() - ultimoEnvio > 10000) {
  ultimoEnvio = millis();
  Serial.print("TIEMPO:");
  Serial.println((DURACION - pasado) / 1000);
}
```

Juega un partido corto con el **Monitor serie** abierto: esto es exactamente lo que vería el celular.

[IMAGEN 14.1: monitor serie mostrando los mensajes MARCADOR y TIEMPO durante un partido]

## Parte 3 · Demostración con HC-05 (20 min)

*(Lo hace el docente si hay módulo disponible.)*

| HC-05 | Arduino |
| --- | --- |
| VCC | 5V |
| GND | GND |
| TXD | D10 |
| RXD | D11 (con divisor de voltaje 1 kΩ / 2 kΩ) |

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);   // RX, TX

// en setup:
bt.begin(9600);

// y donde usábamos Serial.print para el celular:
bt.print("MARCADOR:");
```

[IMAGEN 14.2: celular con una app de terminal Bluetooth mostrando el marcador del partido]

:::pregunta id="g14-p2"
¿Qué pines del Arduino ya estábamos usando? ¿Por qué el HC-05 va en D10 y D11 y no en D0 y D1?
:::

## Parte 4 · Nuestro mini fútbol 2.0 (35 min)

:::checklist id="g14-ideas"
- [ ] Marcador en el celular por Bluetooth
- [ ] Pantalla grande de LEDs (matriz)
- [ ] Jugadores robóticos controlados con joystick
- [ ] Repetición del gol con cámara
- [ ] Velocidad del disparo con dos sensores
- [ ] Tabla de posiciones automática
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del proyecto 2.0 | |
| ¿Qué mejoras tendría? | |
| Sensores y componentes nuevos | |
| ¿Cómo se jugaría? | |
| ¿Qué necesitamos aprender? | |
:::

:::foto id="g14-boceto"
Foto del boceto del mini fútbol 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] El marcador envía mensajes de marcador y tiempo.
- [ ] Vimos cómo funcionaría el Bluetooth.
- [ ] Diseñamos el mini fútbol 2.0.
:::

## Reto extra

Calcula la **velocidad del disparo**: con dos sensores separados 10 cm, mide el tiempo entre que la pelota pasa por uno y por otro. Velocidad = distancia ÷ tiempo.

## Bitácora (15 min)

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en el siguiente nivel?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- D0 y D1 son el puerto serie del USB: si se conecta ahí el HC-05, no se puede subir código. Por eso se usa SoftwareSerial en D10/D11 (libres en este proyecto).
- El RX del HC-05 trabaja a 3,3 V: usar divisor de voltaje (1 kΩ desde D11, 2 kΩ a GND).
- Apps sugeridas: "Serial Bluetooth Terminal" (Android). iPhone no es compatible con el HC-05.
- Conectar con el nivel Intermedio, donde se usa el HC-05 en el robot con telemetría.
- Tiempo total: 15 + 30 + 20 + 35 + 5 + 15 = 120 minutos.
:::

---
titulo: Controlar con el movimiento
guia: 14
sabado: 14
sesion: Proyección a Básico III
duracion: 120
---

# Guía 14 · Controlar con el movimiento

## Objetivo del día

Descubrir cómo controlar el laberinto **inclinando la mano** con un acelerómetro, en lugar del joystick, y diseñar la idea del laberinto 2.0.

**Al terminar tendremos:** una simulación en Wokwi donde un sensor de movimiento mueve los servos, y el plan del laberinto 2.0.

## Materiales del equipo

- Computadora con internet y cuenta de Wokwi
- Laberinto del equipo (para la exposición final)

## Parte 1 · ¿Cómo sabe el celular que lo giraste? (15 min)

Los celulares tienen un **acelerómetro**: un sensor diminuto que mide hacia dónde jala la gravedad. Así saben si los pusiste de lado o si los inclinas en un juego de carreras.

El módulo **MPU6050** tiene un acelerómetro que el Arduino puede leer por I2C (los mismos pines que la pantalla: A4 y A5).

:::animacion tipo="acelerometro"
:::

:::pregunta id="g14-p1"
¿Qué aplicaciones o juegos del celular usan el acelerómetro?
:::

## Parte 2 · Simulación con el MPU6050 (40 min)

1. En Wokwi abre un proyecto nuevo de **Arduino Uno**.
2. Agrega un **MPU6050** y dos **servos**:

| Componente | Conexión |
| --- | --- |
| MPU6050 | VCC → 5V · GND → GND · SDA → A4 · SCL → A5 |
| Servo X | PWM → D9 · V+ → 5V · GND → GND |
| Servo Y | PWM → D10 · V+ → 5V · GND → GND |

3. Agrega la librería **Adafruit MPU6050** y copia el código:

```cpp
#include <Adafruit_MPU6050.h>
#include <Servo.h>

Adafruit_MPU6050 mpu;
Servo servoX, servoY;

void setup() {
  mpu.begin();
  servoX.attach(9);
  servoY.attach(10);
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // a.acceleration.x va de -9.8 a 9.8 al inclinar
  int angX = map(a.acceleration.x * 10, -98, 98, 75, 105);
  int angY = map(a.acceleration.y * 10, -98, 98, 75, 105);
  servoX.write(angX);
  servoY.write(angY);
  delay(20);
}
```

4. Presiona **Play**, haz clic en el MPU6050 y mueve los controles de aceleración X y Y.

[IMAGEN 14.1: simulación en Wokwi con el MPU6050 y dos servos que giran al cambiar la aceleración]

| Aceleración X en el control | Ángulo del servo X |
| --- | --- |
| −9.8 | |
| 0 | |
| 9.8 | |

:::pregunta id="g14-p2"
¿Por qué multiplicamos la aceleración por 10 antes de usar `map()`? (Pista: `map` trabaja con números enteros.)
:::

## Parte 3 · Nuestro laberinto 2.0 (35 min)

:::checklist id="g14-ideas"
- [ ] Control con acelerómetro (inclinar la mano)
- [ ] Control desde el celular por Bluetooth
- [ ] Varios niveles con laberintos intercambiables
- [ ] Marcador de récords en internet
- [ ] Dos canicas y dos jugadores a la vez
- [ ] Luces LED que muestran el camino
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del laberinto 2.0 | |
| ¿Cómo se controlaría? | |
| Sensores y componentes nuevos | |
| ¿Cómo sería el tablero? | |
| ¿Qué necesitamos aprender? | |
:::

:::foto id="g14-boceto"
Foto del boceto del laberinto 2.0.
:::

## Parte 4 · Exposición final (15 min)

Todos los laberintos se colocan juntos. Cada estudiante juega al menos en **dos laberintos de otros equipos** y deja un comentario.

:::pregunta id="g14-p3"
¿Qué laberinto de otro equipo te gustó más y por qué?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Simulamos el control con acelerómetro.
- [ ] Diseñamos el laberinto 2.0.
- [ ] Jugamos en los laberintos de otros equipos.
:::

## Reto extra

Agrega al código del acelerómetro el **suavizado** que usamos en el laberinto. ¿Mejora el control?

## Bitácora (10 min)

:::pregunta id="g14-b1" individual="si"
¿Qué es lo que más quiero aprender en el siguiente nivel?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si hay un MPU6050 físico, hacer la demostración real conectándolo al laberinto de un equipo (comparte pines I2C con la OLED; dirección 0x68, no hay conflicto).
- g14-p2: map() trabaja con enteros; sin multiplicar, −9,8 a 9,8 quedaría en solo 19 valores posibles.
- Conectar la idea del celular por Bluetooth con lo que verán en niveles intermedios (módulo HC-05).
- Tiempo total: 15 + 40 + 35 + 15 + 5 + 10 = 120 minutos.
:::

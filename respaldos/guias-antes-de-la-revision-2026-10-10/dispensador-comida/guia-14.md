---
titulo: El dispensador que sabe la hora
guia: 14
sabado: 14
sesion: Proyección a Básico II
duracion: 120
---

# Guía 14 · El dispensador que sabe la hora

## Objetivo del día

Conocer el simulador Wokwi y un reloj de tiempo real, simulando un dispensador que sirve a horas exactas, e imaginar el dispensador 2.0.

**Al terminar tendremos:** un dispensador simulado que sirve a una hora programada y el plan del dispensador 2.0.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com

## Parte 1 · ¿Qué hora es para el Arduino? (10 min)

Nuestro dispensador usa `millis()`: cuenta el tiempo desde que se encendió, pero **no sabe la hora**. Si se va la luz, empieza de cero. Un **reloj de tiempo real (RTC)** es un módulo con pila propia que siempre sabe la hora, aunque se apague el Arduino.

:::pregunta id="g14-p1"
¿Qué problema tendría nuestro dispensador si se va la luz a las 3 de la tarde?
:::

## Parte 2 · Dispensador con reloj en Wokwi (50 min)

1. Crea un proyecto de **Arduino Uno** en wokwi.com.
2. Agrega un **RTC DS1307**, un **Servo**, un **Buzzer** y un **LED**.

| Componente | Pin |
| --- | --- |
| RTC SDA / SCL | A4 / A5 |
| Servo PWM | D9 |
| LED | D4 (con resistencia) |
| Buzzer | D5 |

[IMAGEN 14.1: dispensador simulado en Wokwi con el reloj DS1307, el servo, el LED y el buzzer]

3. En **Library Manager** agrega **RTClib**.
4. Copia el código:

```cpp
#include <RTClib.h>
#include <Servo.h>

RTC_DS1307 reloj;
Servo compuerta;
int ultimoMinuto = -1;

void setup() {
  Serial.begin(9600);
  reloj.begin();
  compuerta.attach(9);
  compuerta.write(0);
  pinMode(4, OUTPUT);
}

void servir() {
  tone(5, 1500, 300);
  digitalWrite(4, HIGH);
  compuerta.write(70);
  delay(1000);
  compuerta.write(0);
  digitalWrite(4, LOW);
}

void loop() {
  DateTime ahora = reloj.now();
  Serial.print(ahora.hour());
  Serial.print(":");
  Serial.println(ahora.minute());

  // servir cada vez que el minuto termina en 0 (10, 20, 30...)
  if (ahora.minute() % 10 == 0 && ahora.minute() != ultimoMinuto) {
    servir();
    ultimoMinuto = ahora.minute();
  }
  delay(1000);
}
```

5. Presiona **Play** y mira la hora en el Monitor serie.

:::pregunta id="g14-p2"
En una casa, ¿qué condición escribirías para que sirva a las 7:00 de la mañana? (Pista: `ahora.hour() == 7`.)
:::

## Parte 3 · El dispensador 2.0 (40 min)

:::checklist id="g14-ideas"
- [ ] Reloj de tiempo real con horarios exactos
- [ ] Báscula electrónica para pesar la porción
- [ ] Control y avisos desde el celular
- [ ] Cámara para ver a la mascota
- [ ] Agua además de comida
- [ ] Pantalla con la hora de la siguiente comida
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del dispensador 2.0 | |
| ¿Qué mejoras tendría? | |
| ¿Qué componentes nuevos necesitaría? | |
| ¿Qué necesitamos aprender? | |
:::

:::foto id="g14-boceto"
Foto del boceto del dispensador 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Creamos el dispensador en Wokwi.
- [ ] El reloj muestra la hora.
- [ ] Diseñamos el dispensador 2.0.
:::

## Reto extra

Programa **tres horarios** de comida (por ejemplo 7:00, 12:00 y 18:00) usando `||`.

## Bitácora (15 min)

:::pregunta id="g14-b1"
Enlace de nuestra simulación en Wokwi:
:::

:::pregunta id="g14-b2" individual="si"
¿Qué es lo que más quiero aprender en Básico II?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- En Wokwi el DS1307 toma la hora de la computadora al iniciar la simulación.
- `ultimoMinuto` evita servir muchas veces durante el mismo minuto: buena oportunidad para repasar por qué se necesita.
- Mencionar que en Básico II se usan más módulos que hablan por I2C (A4/A5), como pantallas OLED.
- Tiempo total: 10 + 50 + 40 + 5 + 15 = 120 minutos.
:::

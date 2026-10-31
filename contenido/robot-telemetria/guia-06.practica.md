---
titulo: Simulamos el sistema completo
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos el sistema completo

## Objetivo del día

Escribir el programa final del robot para que obedezca al mando, se detenga si pierde la señal y responda con la telemetría, y manejarlo en el simulador.

**Al terminar tendremos:** el robot y el mando funcionando juntos en el simulador, con los dos programas finales guardados para subirlos a los Arduinos reales.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_robot_sim` con el robot y el mando (sábado 5)
- Bitácora

## Parte 1 · Del joystick a dos motores (15 min)

El joystick da dos valores: **avance** (Y) y **giro** (X). El robot tiene dos motores. El mando los combina así (**mezcla diferencial**):

> izquierdo = avance + giro  derecho = avance − giro

Muevan el joystick de la animación y miren cómo cambia cada motor:

:::animacion tipo="mezcla-diferencial"
:::

Calculen cada fila con las dos fórmulas. Si un resultado pasa de 255, escriban 255 (el código lo limita). En la última columna escriban si avanza, retrocede o gira, y hacia qué lado.

:::tabla id="g6p-mezcla"
| Avance (Y) | Giro (X) | Izquierdo | Derecho | ¿Qué hace el robot? |
| --- | --- | --- | --- | --- |
| 200 | 0 | | | |
| 0 | 150 | | | |
| 150 | 100 | | | |
| −200 | 0 | | | |
:::

## Parte 2 · El programa final del robot (35 min)

Abran el diseño. Toquen **Código**, elijan **1 (Arduino Uno R3)** (el robot), borren todo y escriban. Junta lo que ya probaron: los motores de la Guía 4 y la telemetría de la Guía 5, más tres cosas nuevas: leer la orden `M,izq,der`, mover los motores con ella y detenerse si no llegan órdenes.

```cpp
// Robot con mando y telemetría - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del ROBOT

#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05

// --- Puente H L298N ---
const int PWMA = 5, AIN1 = 7, AIN2 = 8;  // izq. (ENA, IN1, IN2)
const int PWMB = 6, BIN1 = 4, BIN2 = 9;  // der. (ENB, IN3, IN4)

// --- Sensores ---
const int TRIG = 2, ECHO = 3;
const int BATERIA = A0;  // divisor 10k / 10k

// --- Ajustes del equipo ---
const unsigned long TIMEOUT = 500;  // ms
const float FACTOR_BAT = 2.0;       // divisor 1:2

unsigned long ultimoMensaje = 0;
unsigned long ultimaTelemetria = 0;
String buffer = "";

void setup() {
  int pines[] = {PWMA, AIN1, AIN2, PWMB,
                 BIN1, BIN2, TRIG};
  for (int p : pines) pinMode(p, OUTPUT);
  pinMode(ECHO, INPUT);
  bt.begin(9600);
}

// vel: -255 (atrás) a 255 (adelante)
void motor(int pwm, int in1, int in2, int vel) {
  digitalWrite(in1, vel > 0);
  digitalWrite(in2, vel < 0);
  analogWrite(pwm, abs(vel));
}

// Interpreta un mensaje "M,izq,der"
void procesar(String m) {
  int c1 = m.indexOf(',');
  int c2 = m.indexOf(',', c1 + 1);
  if (m[0] != 'M' || c1 < 0 || c2 < 0) {
    return;  // mensaje inválido
  }
  int izq = m.substring(c1 + 1, c2).toInt();
  int der = m.substring(c2 + 1).toInt();
  izq = constrain(izq, -255, 255);
  der = constrain(der, -255, 255);
  motor(PWMA, AIN1, AIN2, izq);
  motor(PWMB, BIN1, BIN2, der);
  ultimoMensaje = millis();
}

// Distancia en cm con el HC-SR04
long distancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 20000);
  return t * 0.034 / 2;
}

void loop() {
  // 1. Recibir mensajes letra por letra
  while (bt.available()) {
    char c = bt.read();
    if (c == '\n') {
      procesar(buffer);
      buffer = "";
    } else {
      buffer += c;
    }
  }

  // 2. Seguridad: sin señal, detener
  if (millis() - ultimoMensaje > TIMEOUT) {
    motor(PWMA, AIN1, AIN2, 0);
    motor(PWMB, BIN1, BIN2, 0);
  }
  // 3. Telemetría cada 300 ms
  if (millis() - ultimaTelemetria > 300) {
    int lectura = analogRead(BATERIA);
    float v = lectura * 5.0 / 1023 * FACTOR_BAT;
    bt.print("T,");
    bt.print(v, 1);
    bt.print(",");
    bt.println(distancia());
    ultimaTelemetria = millis();
  }
}
```

- `indexOf(',')` busca dónde está cada coma; `substring` corta el texto entre las comas y `toInt()` lo convierte en número.
- El código del **mando** (Arduino 2) es el de la Guía 5: no hay que cambiarlo.

Miren en la animación cómo viajan los mensajes `M` y `T` letra por letra:

:::animacion tipo="protocolo" sistema="robot"
:::

## Parte 3 · ¡A manejar en el simulador! (30 min)

1. **Iniciar simulación.** Dejen las dos perillas en el centro: los motores deben quedarse quietos.
2. Giren las perillas y miren las RPM de cada motor. Muevan el objeto del sensor y miren la pantalla del mando.

:::tabla id="g6p-pruebas"
| Prueba | ¿Funciona? | Lo que se ve |
| --- | --- | --- |
| Perilla Y hacia un lado: los dos motores giran igual (avanza) | | |
| Perilla Y hacia el otro lado: los dos giran al revés (retrocede) | | |
| Perilla X hacia un lado: un motor adelante y el otro atrás (gira) | | |
| Perillas en el centro: los motores se detienen | | |
| La pantalla muestra la batería y la distancia | | |
:::

:::pregunta id="g6p-p1"
Si avanzan con la perilla Y y además giran un poco la X, ¿qué motor va más rápido? ¿Hacia dónde gira el robot?
:::

## Parte 4 · Seguridad sin señal (15 min)

Si el robot real pierde la señal del mando (se acaba la batería del mando o se aleja demasiado), debe detenerse solo. Vamos a probarlo "cortando el Bluetooth":

1. Con la simulación andando, giren la perilla Y para que los motores avancen.
2. **Detengan la simulación** y borren el cable que va del **D11 del mando** al **D10 del robot** (por ahí viajan las órdenes).
3. **Iniciar simulación** y giren la perilla Y: los motores **no deben moverse**.
4. Detengan la simulación y vuelvan a poner el cable.

:::pregunta id="g6p-p2"
Explica qué hace el bloque "Seguridad: sin señal, detener". ¿Qué podría pasar si no estuviera?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El robot simulado obedece a las perillas del mando.
- [ ] La pantalla del mando muestra la telemetría.
- [ ] Sin el cable de las órdenes, el robot se queda quieto.
- [ ] Guardamos los dos programas.
:::

## Reto extra

Haz que el robot **no avance** si hay un obstáculo a menos de 15 cm (pero que sí pueda retroceder y girar).

Pista: en `procesar()`, antes de mover los motores, si `izq` y `der` son positivos y `distancia()` es menor que 15, pongan los dos en 0.

## Bitácora (15 min)

:::pregunta id="g6p-b1"
¿Qué creen que será distinto cuando armen el robot real?
:::

**Muy importante:** estos son los programas que van a subir a los Arduinos reales el sábado 9. Copien cada uno completo (**Ctrl + A** y **Ctrl + C** en el panel Código), péguenlo en un bloc de notas y guárdenlos como `equipo_NOMBRE_robot.txt` (Arduino 1) y `equipo_NOMBRE_mando.txt` (Arduino 2). Súbanlos aquí juntos en un `.zip`.

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí el `.zip` con `equipo_NOMBRE_robot.txt` y `equipo_NOMBRE_mando.txt`. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí.
:::

:::docente
- **Versión Práctica (9 sábados):** el programa del robot es el mismo de la Guía 9 (antes Guía 6 Práctica); en el simulador corre con el L293D porque usa los mismos pines. Campos propios (g6p-…). Las respuestas de la Guía 6 anterior (¡A manejar!) pasaron a la Guía 9 (g9p-…).
- Tabla de mezcla: (200, 200) adelante; (150, −150) gira a la derecha sobre su eje; (250→255, 50) curva a la derecha; (−200, −200) atrás.
- g6p-p1: el izquierdo (avance + giro); el robot hace una curva hacia la derecha (si la X positiva es la derecha).
- g6p-p2: si el robot deja de recibir órdenes por 500 ms, detiene los motores. Sin ese bloque seguiría con la última orden y podría chocar.
- Si al centrar las perillas los motores siguen girando despacio, la perilla no está justo en el centro: la zona muerta del mando es de ±20; se puede subir a 30.
- Tiempo total: 15 + 35 + 30 + 15 + 5 + 15 = 115 minutos (5 de margen para cambiar entre los dos Arduinos).
:::

---
titulo: Simulamos el mando
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos el mando

## Objetivo del día

Agregar al simulador el mando: un segundo Arduino con el joystick y la pantalla LCD, unido al robot por los mismos pines que usará el Bluetooth. El mando manda órdenes y el robot responde con la batería y la distancia.

**Al terminar tendremos:** el mando simulado enviando órdenes `M,izq,der` al robot y mostrando en su pantalla la telemetría `T,bat,dist` que le devuelve el robot.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_robot_sim` (sábado 4)
- Bitácora

## Parte 1 · ¿Cómo se hablan el mando y el robot? (10 min)

El mando y el robot se hablan con mensajes de texto que terminan con salto de línea:

| Mensaje | Dirección | Significado | Ejemplo |
| --- | --- | --- | --- |
| `M,izq,der` | Mando → Robot | Velocidad de cada motor (−255 a 255) | `M,150,-80` |
| `T,bat,dist` | Robot → Mando | Batería (V) y distancia (cm) | `T,7.4,32` |

En el robot real, el **Bluetooth** (HC-05) es como un **cable invisible** entre los pines 10 y 11 de los dos Arduinos. En el simulador no hay Bluetooth, así que usamos cables de verdad: lo que sale por el pin 11 de uno entra por el pin 10 del otro, igual que en la Guía 1.

:::pregunta id="g5p-p1"
En el mensaje `M,150,-80`, ¿qué motor va hacia atrás? ¿Cómo lo saben?
:::

## Parte 2 · El mando en el simulador (35 min)

Abran `equipo_NOMBRE_robot_sim` en Tinkercad (**Diseños → Circuitos**). Con la simulación detenida, al lado del robot agreguen:

1. **Un segundo Arduino Uno R3:** será el **mando**. Déjenlo separado del robot para no confundirlos. En el panel de código aparecerán dos: **1** es el robot y **2** es el mando.
2. **El joystick:** Tinkercad no tiene joystick, pero un joystick son **dos perillas** (una para cada eje). Arrastren dos **Potenciómetro**: uno es el eje **X** (giro) y el otro el eje **Y** (avance).
3. **La pantalla:** en **Buscar** escriban `lcd` y arrastren la **LCD 16 x 2 (I2C)**. Hagan clic sobre ella y cambien:
   - **Tipo:** Basado en PCF8574 (el chip de la pantalla que compramos).
   - **Dirección:** 39 (0x27), la de la pantalla real.
4. Conecten, todo al **Arduino del mando**:

| Componente | Arduino del mando |
| --- | --- |
| Potenciómetro X: patas de los extremos | 5V y GND |
| Potenciómetro X: pata del centro | A0 |
| Potenciómetro Y: patas de los extremos | 5V y GND |
| Potenciómetro Y: pata del centro | A1 |
| Pantalla GND / VCC | GND / 5V |
| Pantalla SDA / SCL | A4 / A5 |

5. **El "Bluetooth":** tres cables entre los dos Arduinos:

| Arduino del mando | Arduino del robot |
| --- | --- |
| D10 | D11 |
| D11 | D10 |
| GND | GND |

[IMAGEN 5.1S: robot y mando simulados en Tinkercad Circuits: el mando con dos potenciómetros y la pantalla LCD, unido al robot por D10, D11 y GND]

## Parte 3 · El código del mando (30 min)

1. Toquen **Código**. A la derecha de la barra del código hay una lista con los dos Arduinos: elijan **2 (Arduino Uno R3)**, el mando. Cámbienlo a **Texto** (y **Continuar**) y borren todo.
2. Escriban el código del mando. Es el mismo que van a subir al mando real el sábado 9:

```cpp
// Robot con mando y telemetría - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del MANDO
// Librería: LiquidCrystal I2C

#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05
LiquidCrystal_I2C pantalla(0x27, 16, 2);  // dirección, columnas, filas

const int JOY_X = A0, JOY_Y = A1;
const int ZONA_MUERTA = 20;
String buffer = "";
unsigned long ultimoEnvio = 0;

void setup() {
  pantalla.init();
  pantalla.backlight();
  pantalla.print("Esperando...");
  bt.begin(9600);
}

void loop() {
  // 1. Enviar una orden cada 100 ms
  if (millis() - ultimoEnvio > 100) {
    int y = analogRead(JOY_Y) / 2 - 256;  // avance
    int x = analogRead(JOY_X) / 2 - 256;  // giro
    if (abs(y) < ZONA_MUERTA) y = 0;
    if (abs(x) < ZONA_MUERTA) x = 0;
    int izq = constrain(y + x, -255, 255);
    int der = constrain(y - x, -255, 255);
    bt.print("M,");
    bt.print(izq);
    bt.print(",");
    bt.println(der);
    ultimoEnvio = millis();
  }

  // 2. Recibir telemetría "T,bat,dist"
  while (bt.available()) {
    char c = bt.read();
    if (c == '\n') {
      mostrar(buffer);
      buffer = "";
    } else buffer += c;
  }
}

// Muestra batería y distancia en la pantalla LCD
void mostrar(String m) {
  if (m[0] != 'T') return;
  int c1 = m.indexOf(',');
  int c2 = m.indexOf(',', c1 + 1);
  float bat = m.substring(c1 + 1, c2).toFloat();
  int dist = m.substring(c2 + 1).toInt();
  pantalla.setCursor(0, 0);           // fila de arriba
  pantalla.print("Bat: ");
  pantalla.print(bat, 1);
  pantalla.print(" V      ");         // los espacios borran lo que sobraba
  pantalla.setCursor(0, 1);           // fila de abajo
  if (bat < 6.8) {
    pantalla.print("BATERIA BAJA!   ");
  } else {
    pantalla.print("Dist: ");
    pantalla.print(dist);
    pantalla.print(" cm      ");
  }
}
```

- `analogRead` da de 0 a 1023; `/ 2 - 256` lo convierte en un número de −256 a 255, con 0 en el centro de la perilla.
- La **zona muerta** hace que, cerca del centro, el valor sea 0: así el robot se queda quieto aunque la perilla no esté justo en el medio.

## Parte 4 · El robot escucha (30 min)

Por ahora el robot no moverá los motores: solo va a **mostrar** en su Monitor las órdenes que le llegan y a **contestar** con la batería y la distancia.

1. En la lista de Arduinos elijan **1 (Arduino Uno R3)**, el robot. Borren su código y escriban:

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);  // RX, TX: en el robot real, al HC-05

const int TRIG = 2, ECHO = 3;
const int BATERIA = A0;        // divisor 10k / 10k
const float FACTOR_BAT = 2.0;

String buffer = "";
unsigned long ultimaTelemetria = 0;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
  bt.begin(9600);
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
  // 1. Recibir las órdenes del mando y mostrarlas en el Monitor
  while (bt.available()) {
    char c = bt.read();
    if (c == '\n') {
      Serial.println(buffer);
      buffer = "";
    } else {
      buffer += c;
    }
  }

  // 2. Telemetría cada 300 ms
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

2. **Iniciar simulación**. Con el robot elegido en la lista, abran el **Monitor en serie**: deben aparecer las órdenes `M,…` del mando.
3. Hagan clic en cada potenciómetro y gírenlo arrastrando su perilla. Hagan clic en el sensor y muevan el objeto. Marquen la tabla.

:::tabla id="g5p-pruebas"
| Prueba | ¿Funciona? | Lo que se ve |
| --- | --- | --- |
| Perillas en el centro: el Monitor del robot muestra `M,0,0` | | |
| Perilla Y hacia un lado: los dos números suben juntos | | |
| Perilla X hacia un lado: un número sube y el otro baja | | |
| La pantalla del mando muestra la batería | | |
| La pantalla muestra la distancia y cambia al mover el objeto | | |
:::

:::pregunta id="g5p-p2"
Si giran solo la perilla X (giro), ¿por qué un motor recibe un número positivo y el otro uno negativo?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] El mando tiene sus dos potenciómetros y la pantalla LCD.
- [ ] Los dos Arduinos están unidos por D10, D11 y GND.
- [ ] El robot recibe las órdenes `M` del mando.
- [ ] La pantalla del mando muestra la batería y la distancia.
:::

## Reto extra

Haz que la pantalla del mando muestre también la orden que está enviando, por ejemplo `I:150 D:-80` en la fila de abajo, cuando no hay telemetría.

Pista: en el `loop` del mando, justo después de enviar la orden, escriban `izq` y `der` en la pantalla con `setCursor` y `print`.

## Bitácora (10 min)

:::foto id="g5p-foto"
Captura de pantalla del robot y el mando simulados, con la pantalla mostrando la telemetría.
:::

:::pregunta id="g5p-b1"
¿Por qué el pin 10 de un Arduino se conecta al pin 11 del otro, y no 10 con 10?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia de los dos códigos (cópienlos del panel Código a un bloc de notas y guárdenlos como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Práctica (9 sábados):** el mando se simula con un segundo Arduino en el mismo diseño. Los HC-05 se reemplazan por tres cables (D10 ↔ D11, D11 ↔ D10, GND), igual que la UART cableada de la Guía 1; el código con `SoftwareSerial` no cambia. Campos propios (g5p-…). Las respuestas de la Guía 5 anterior (Bluetooth y el mando) pasaron a la Guía 8 (g8p-…).
- La pantalla es la **LCD 16 × 2 I2C** (decisión de Bairon, también en el mando real). En Tinkercad se elige **Tipo: Basado en PCF8574** y **Dirección: 39 (0x27)** para que el código sea el mismo del mando real. La librería **LiquidCrystal I2C** ya está en Tinkercad (comprobado: compila con `init()` y `backlight()`).
- El Monitor en serie de Tinkercad muestra el Arduino elegido en la lista del panel de código.
- g5p-p1: el derecho, porque su número es negativo.
- g5p-p2: por la mezcla diferencial: izquierdo = avance + giro y derecho = avance − giro; con avance 0, uno queda +giro y el otro −giro, y el robot gira sobre su eje.
- g5p-b1: lo que uno **transmite** (TX, pin 11) lo tiene que **recibir** el otro (RX, pin 10).
- Tiempo total: 10 + 35 + 30 + 30 + 5 + 10 = 120 minutos.
:::

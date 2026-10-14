---
titulo: Órdenes y telemetría
guia: 5
sabado: 5
sesion: Programación del sistema
duracion: 120
---

# Guía 5 · Órdenes y telemetría

## Objetivo del día

Programar los dos nodos: el mando convierte el joystick en órdenes `M,izq,der` y muestra la telemetría; el robot obedece, se detiene si pierde la señal y responde con `T,bat,dist`.

**Al terminar tendremos:** el robot manejado con el mando y la batería y la distancia visibles en la pantalla del mando.

## Materiales del equipo

- Robot montado y HC-05 emparejados (sábado 4)
- Mando: Arduino, joystick, OLED, HC-05
- Librerías Adafruit SSD1306 y Adafruit GFX

## Parte 1 · Montar el mando (15 min)

| Componente | Arduino del mando |
| --- | --- |
| Joystick VRx / VRy | A0 / A1 |
| OLED SDA / SCL | A4 / A5 |
| HC-05 TXD / RXD | D10 / D11 (con divisor 1 kΩ / 2 kΩ) |

[IMAGEN 5.1: mando armado con joystick, pantalla OLED y HC-05 sobre una protoboard pequeña]

## Parte 2 · Del joystick a dos motores (20 min)

El joystick da dos valores: **avance** (Y) y **giro** (X). El robot tiene dos motores. Se combinan así (**mezcla diferencial**):

> izquierdo = avance + giro  derecho = avance − giro

:::animacion tipo="mezcla-diferencial"
:::

:::tabla id="g5-mezcla"
| Avance (Y) | Giro (X) | Izquierdo | Derecho | ¿Qué hace el robot? |
| --- | --- | --- | --- | --- |
| 200 | 0 | | | |
| 0 | 150 | | | |
| 150 | 100 | | | |
| −200 | 0 | | | |
:::

## Parte 3 · Código del robot (30 min)

```cpp
// Robot con mando y telemetría - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del ROBOT

#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05

// --- Puente H TB6612FNG ---
const int PWMA = 5, AIN1 = 7, AIN2 = 8;  // izq.
const int PWMB = 6, BIN1 = 4, BIN2 = 9;  // der.
const int STBY = 12;

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
                 BIN1, BIN2, STBY, TRIG};
  for (int p : pines) pinMode(p, OUTPUT);
  pinMode(ECHO, INPUT);
  digitalWrite(STBY, HIGH);  // activa el driver
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

:::pregunta id="g5-p1"
¿Por qué el robot lee los mensajes **letra por letra** en lugar de esperar el mensaje completo?
:::

:::pregunta id="g5-p2"
Explica qué hace el bloque "Seguridad: sin señal, detener" y con qué requisito del sábado 1 se relaciona.
:::

## Parte 4 · Código del mando (30 min)

```cpp
// Robot con mando y telemetría - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del MANDO
// Librerías: Adafruit SSD1306, Adafruit GFX

#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);

const int JOY_X = A0, JOY_Y = A1;
const int ZONA_MUERTA = 20;
String buffer = "";
unsigned long ultimoEnvio = 0;

void setup() {
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
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

// Muestra batería y distancia en la OLED
void mostrar(String m) {
  if (m[0] != 'T') return;
  int c1 = m.indexOf(',');
  int c2 = m.indexOf(',', c1 + 1);
  float bat = m.substring(c1 + 1, c2).toFloat();
  int dist = m.substring(c2 + 1).toInt();
  pantalla.clearDisplay();
  pantalla.setTextSize(2);
  pantalla.setCursor(0, 0);
  pantalla.print(bat, 1);
  pantalla.println(" V");
  pantalla.print(dist);
  pantalla.println(" cm");
  if (bat < 6.8) pantalla.println("BATERIA!");
  pantalla.display();
}

/*
// Configuración única de los HC-05
// Modo AT: mantener el botón del módulo
// al encenderlo. Puente AT de la guía 4 (HC-05 a 38400),
// "Ambos NL & CR".

// En el ROBOT (esclavo):
AT+ROLE=0
AT+ADDR?        // anotar la dirección
AT+UART=9600,0,0

// En el MANDO (maestro):
AT+ROLE=1
AT+CMODE=0
AT+BIND=[dirección del esclavo]
AT+UART=9600,0,0
*/
```

:::animacion tipo="protocolo" sistema="robot"
:::

## Parte 5 · Primera prueba integrada (15 min)

:::tabla id="g5-integracion"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| Joystick adelante → el robot avanza | | |
| Joystick a un lado → gira | | |
| Joystick suelto → se detiene | | |
| La OLED muestra la batería | | |
| La OLED muestra la distancia | | |
| Apagar el mando → el robot se detiene | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] El código del robot está cargado.
- [ ] El código del mando está cargado.
- [ ] El robot obedece al joystick.
- [ ] La telemetría llega al mando.
- [ ] El robot se detiene si se apaga el mando.
:::

## Reto extra

Agrega a la telemetría un tercer dato: el número de mensajes recibidos por segundo. Muéstralo en la OLED.

## Bitácora (5 min)

:::tabla id="g5-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Tabla de mezcla: (200, 200) adelante; (150, −150) gira a la derecha sobre su eje; (250→255, 50) curva a la derecha; (−200, −200) atrás.
- Si el robot avanza cuando el joystick va atrás, cambiar el signo de `y` en el mando o invertir el eje en el código.
- El joystick da ≈512 en el centro; `/2 - 256` lo lleva a ≈0; la zona muerta elimina el temblor del centro.
- g5-p1: así el loop nunca se detiene esperando y puede revisar el timeout y enviar telemetría.
- Tiempo total: 15 + 20 + 30 + 30 + 15 + 5 + 5 = 120 minutos.
:::

---
titulo: ¡A manejar!
guia: 6
sabado: 6
sesion: Programación y pruebas
duracion: 120
---

# Guía 6 · ¡A manejar!

## Objetivo del día

Programar los dos Arduino: el mando convierte el joystick en órdenes `M,izq,der` y muestra la telemetría; el robot obedece, se detiene si pierde la señal y responde con `T,bat,dist`. Después, salir a manejar y ajustar lo que falte.

**Al terminar tendremos:** el robot manejado con el mando y la batería y la distancia visibles en la pantalla.

## Materiales del equipo

- Robot y mando armados, con los HC-05 emparejados (sábado 5)
- Computadora con Arduino IDE y las librerías Adafruit SSD1306 y Adafruit GFX
- Espacio libre en el piso y una caja o pared como obstáculo

## Parte 1 · Del joystick a dos motores (15 min)

El mando y el robot se hablan con mensajes de texto que terminan con salto de línea:

| Mensaje | Dirección | Significado | Ejemplo |
| --- | --- | --- | --- |
| `M,izq,der` | Mando → Robot | Velocidad de cada motor (−255 a 255) | `M,150,-80` |
| `T,bat,dist` | Robot → Mando | Batería (V) y distancia (cm) | `T,7.4,32` |

El joystick da dos valores: **avance** (Y) y **giro** (X). El robot tiene dos motores. Se combinan así (**mezcla diferencial**):

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

## Parte 2 · Código del robot (25 min)

1. Pongan el robot sobre una caja, con las ruedas en el aire.
2. Conecten el Arduino del robot por USB. Programa nuevo, escriban el código y guárdenlo como `equipo_NOMBRE_robot`. Es casi el mismo de la prueba de motores (Guía 4): las mismas líneas para el L298N, más el Bluetooth y los sensores.
3. Verifiquen (✓) y suban (→).

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

:::pregunta id="g6p-p1"
Explica qué hace el bloque "Seguridad: sin señal, detener". ¿Qué podría pasar si no estuviera?
:::

## Parte 3 · Código del mando (25 min)

1. Instalen las librerías: en Arduino IDE abran el **Gestor de bibliotecas** (icono de los libros, a la izquierda), busquen **Adafruit SSD1306** e instálenla. Si pregunta por otras librerías que necesita (como *Adafruit GFX Library*), elijan **Instalar todo**.
2. Conecten el Arduino del mando por USB (por el agujero de la caja). Programa nuevo, escriban el código y guárdenlo como `equipo_NOMBRE_mando`.
3. El bloque del final, entre `/*` y `*/`, es solo un recordatorio de los comandos AT de la Guía 5: el Arduino no lo lee. Pueden copiarlo o no.
4. Verifiquen (✓) y suban (→).

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
// al encenderlo. Puente AT de la guía 5 (HC-05 a 38400),
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

Miren en la animación cómo viajan los mensajes `M` y `T` letra por letra:

:::animacion tipo="protocolo" sistema="robot"
:::

## Parte 4 · ¡A manejar! (20 min)

Enciendan el robot (en el piso, con espacio libre) y el mando. Esperen a que los LEDs de los HC-05 parpadeen dos veces cada 2 segundos. Luego hagan cada prueba:

- **Apagar el mando:** desconecten su cable USB con el robot avanzando despacio.
- Si el robot avanza cuando el joystick va hacia atrás, en el código del mando cambien `int y = analogRead(JOY_Y) / 2 - 256;` por `int y = 256 - analogRead(JOY_Y) / 2;` y súbanlo de nuevo.

:::tabla id="g6p-integracion"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| Joystick adelante → el robot avanza | | |
| Joystick a un lado → gira | | |
| Joystick suelto → se detiene | | |
| La pantalla muestra la batería | | |
| La pantalla muestra la distancia | | |
| Apagar el mando → el robot se detiene | | |
:::

## Parte 5 · Ajustes finales (20 min)

Revisen si les pasa algo de esta tabla y cómo lo solucionaron:

:::tabla id="g6p-motores"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| Un motor gira al revés | Cables del motor invertidos | | |
| El robot gira cuando debería ir recto | Motores distintos o PWM igual a velocidades distintas | | |
| Un motor no gira | Cable suelto, pin equivocado o la batería de los motores apagada | | |
| Los motores zumban pero no se mueven | PWM muy bajo para arrancar | | |
:::

Para un robot que se desvía, compensa en el código:

1. La línea `const float AJUSTE_DER = 0.92;` va en `// --- Ajustes del equipo ---`.
2. En `procesar()`, cambien la línea `motor(PWMB, BIN1, BIN2, der);` por la del recuadro.
3. Prueben con el joystick al frente. Si sigue desviándose, cambien 0.92 por otro número (0.95, 0.90…). Si el más rápido es el **izquierdo**, hagan lo mismo con el motor izquierdo: una constante `AJUSTE_IZQ` y la línea `motor(PWMA, AIN1, AIN2, izq * AJUSTE_IZQ);` (y dejen el derecho como estaba).

```cpp
const float AJUSTE_DER = 0.92;   // si el derecho es más rápido
motor(PWMB, BIN1, BIN2, der * AJUSTE_DER);
```

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El código del robot y el del mando están cargados.
- [ ] El robot obedece al joystick.
- [ ] La telemetría llega a la pantalla del mando.
- [ ] El robot se detiene si se apaga el mando.
:::

## Reto extra

Armen con conos (o vasos) un **slalom** de 4 conos y midan cuánto tarda cada piloto en recorrerlo ida y vuelta sin tocar ninguno.

## Bitácora (10 min)

:::pregunta id="g6p-b1"
¿Qué parte del proyecto les costó más: el diseño 3D, el armado o la programación? ¿Por qué?
:::

:::foto id="g6p-foto"
Video corto del robot manejado con el mando.
:::

Antes de irse, suban los dos programas (robot y mando) juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (6 sábados), nueva el 23 de octubre:** la Guía 5 normal (protocolo, mezcla, código del robot y del mando, prueba integrada) más la tabla de motores y el ajuste de la Guía 7 normal. El código del robot es el de la Guía 5 normal sin STBY (puente H L298N). Es la última guía de esta versión. Campos propios (g6p-…).
- Tabla de mezcla: (200, 200) adelante; (150, −150) gira a la derecha sobre su eje; (250→255, 50) curva a la derecha; (−200, −200) atrás.
- g6p-p1: si el robot deja de recibir órdenes por 500 ms (mando apagado o fuera de alcance), detiene los motores. Sin ese bloque seguiría con la última orden y podría chocar.
- El joystick da ≈512 en el centro; `/2 - 256` lo lleva a ≈0; la zona muerta elimina el temblor del centro.
- Si con USB funciona y con baterías no, revisar la pila de 9 V (que esté cargada y su interruptor encendido) y el GND común entre el L298N y el Arduino.
- Con el L298N los motores reciben unos 2 V menos que con el TB6612: si con el joystick poco inclinado solo zumban, es normal.
- El reto del slalom sale de la pista de la Guía 10 normal.
- Tiempo total: 15 + 25 + 25 + 20 + 20 + 5 + 10 = 120 minutos.
:::

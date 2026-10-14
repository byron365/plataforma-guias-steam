---
titulo: Los dos nodos en acción
guia: 5
sabado: 5
sesion: Programación del sistema
duracion: 120
---

# Guía 5 · Los dos nodos en acción

## Objetivo del día

Programar el nodo banda (esclavo I2C) y el nodo clasificador (maestro), leer el sensor de color y mover el desviador.

**Al terminar tendremos:** la banda detectando piezas, leyendo su color, desviándolas y mostrando el conteo en el display.

## Materiales del equipo

- Banda montada (sábado 4)
- Arduino clasificador con TCS34725, servo, MAX7219 y botón de paro
- Librerías **Adafruit TCS34725** y **LedControl**

## Parte 1 · Conectar el clasificador (20 min)

Hoy trabajamos con los **dos** Arduino: el de la **banda** (con el MOSFET, la perilla y el sensor IR del sábado 4) y el **clasificador**. Pónganles etiqueta (B y C) si no la tienen. Conecten todo con la fuente y los USB **desconectados**.

**Instalar las librerías** (en Arduino IDE, una sola vez por computadora): abran el **Gestor de bibliotecas** (icono de los libros, a la izquierda, o **Herramientas → Administrar bibliotecas**), busquen **Adafruit TCS34725** e instálenla (si pregunta por otras, **Instalar todo**). Luego busquen **LedControl** (de Eberhard Fahle) e instálenla.


| Componente | Arduino clasificador |
| --- | --- |
| TCS34725 SDA / SCL | A4 / A5 (mismo bus que el nodo banda) |
| TCS34725 VIN / GND | 5V / GND |
| Servo | D6 (energía del LM2596) |
| MAX7219 DIN / CLK / CS | D11 / D13 / D10 |
| Botón de paro | D7 y GND |
| Bus I2C hacia el nodo banda | A4–A4, A5–A5, GND–GND |

- Los pines del TCS34725 y del MAX7219 tienen su nombre impreso. **VIN** y **VCC** van a 5V; **GND** a GND.
- **MAX7219:** VCC → 5V, GND → GND, DIN → **D11**, CLK → **D13**, CS → **D10**.
- **Servo:** rojo y café al **LM2596** (5 V), naranja a **D6**; el GND del LM2596 también se une al GND del Arduino.
- **Botón de paro:** sobre la canaleta del centro, dos patas en diagonal: una → **D7**, la otra → GND.
- **Bus I2C:** A4 del clasificador con A4 de la banda, A5 con A5, y GND con GND. El TCS34725 también se conecta a esos mismos A4 y A5 (el bus es compartido).

[IMAGEN 5.1: nodo clasificador con el sensor de color, el display MAX7219 de 8 dígitos, el servo y el botón de paro]

## Parte 2 · Leer el color crudo (20 min)

Antes del programa completo, mira qué valores da el sensor con cada pieza:

1. Conecten **solo** el clasificador por USB, elijan **Arduino Uno** y su puerto en **Seleccionar placa**.
2. Programa nuevo con el código de abajo, verifiquen (✓) y súbanlo (→). Abran el **Monitor serie** (lupa, 9600 baudios).
3. Si dice "Sensor no encontrado", revisen SDA, SCL, VIN y GND del sensor.

```cpp
#include <Wire.h>
#include <Adafruit_TCS34725.h>
Adafruit_TCS34725 color(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);

void setup() {
  Serial.begin(9600);
  if (!color.begin()) Serial.println("Sensor no encontrado");
}

void loop() {
  uint16_t r, g, b, c;
  color.getRawData(&r, &g, &b, &c);
  Serial.print("R:"); Serial.print(r);
  Serial.print(" G:"); Serial.print(g);
  Serial.print(" B:"); Serial.print(b);
  Serial.print(" C:"); Serial.println(c);
  delay(300);
}
```

Pongan cada pieza dentro del túnel, bajo el sensor, esperen a que los números se queden quietos y anoten. **C** es la luz total.

:::tabla id="g5-crudo"
| Pieza bajo el sensor | R | G | B | C (luz total) |
| --- | --- | --- | --- | --- |
| Nada (banda) | | | | |
| Roja | | | | |
| Verde | | | | |
| Azul | | | | |
:::

## Parte 3 · Nodo banda (20 min)

Este programa va en el Arduino de la **banda**. Conecten **solo ese** por USB, elijan su puerto, creen un programa nuevo con el código y guárdenlo como `equipo_NOMBRE_banda`. Verifiquen (✓) y súbanlo (→).

```cpp
// Banda transportadora clasificadora - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del NODO BANDA (esclavo I2C, dirección 8)

#include <Wire.h>

// --- Pines ---
const int MOTOR = 9;      // gate del MOSFET (PWM)
const int POT = A0;       // velocidad
const int SENSOR_IR = 2;  // llegada de pieza

volatile bool pieza = false;  // aviso al maestro
volatile bool detenida = false;
bool antes = false;
int velocidad = 0;

void setup() {
  pinMode(MOTOR, OUTPUT);
  pinMode(SENSOR_IR, INPUT);
  Wire.begin(8);              // esclavo número 8
  Wire.onRequest(responder);  // pide datos
  Wire.onReceive(recibir);    // da órdenes
}

void loop() {
  // 1. Velocidad del motor con PWM
  velocidad = analogRead(POT) / 4;  // 0 a 255
  analogWrite(MOTOR, detenida ? 0 : velocidad);

  // 2. Flanco: la pieza recién llega
  bool ahora = digitalRead(SENSOR_IR) == LOW;
  if (ahora && !antes) pieza = true;
  antes = ahora;
  delay(5);
}

// El maestro pide 2 bytes:
// ¿hay pieza? y velocidad actual
void responder() {
  Wire.write(pieza ? 1 : 0);
  Wire.write(velocidad);
  pieza = false;
}

// El maestro envía una letra:
// 'S' = detener, 'G' = avanzar
void recibir(int n) {
  char c = Wire.read();
  if (c == 'S') detenida = true;
  if (c == 'G') detenida = false;
}
```

:::pregunta id="g5-p1"
¿Qué es un **flanco** y por qué el nodo banda avisa solo cuando la pieza **recién** llega (`ahora && !antes`)?
:::

## Parte 4 · Nodo clasificador (35 min)

Este programa va en el Arduino **clasificador**. Conecten ese por USB (elijan su puerto: puede ser otro número COM), creen un programa nuevo, guárdenlo como `equipo_NOMBRE_clasificador`, verifiquen y súbanlo.

Después conecten los dos Arduino (cada uno con su USB, o el de la banda a un cargador) y la fuente de 12 V.

```cpp
// Banda transportadora clasificadora - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del NODO CLASIFICADOR (maestro I2C)
// Librerías: Adafruit TCS34725, LedControl

#include <Wire.h>
#include <Servo.h>
#include <Adafruit_TCS34725.h>
#include <LedControl.h>

Adafruit_TCS34725 color(
  TCS34725_INTEGRATIONTIME_50MS,
  TCS34725_GAIN_4X);
LedControl display(11, 13, 10, 1);  // DIN CLK CS
Servo desviador;

// --- Ajustes del equipo ---
const int PARO = 7;
const int ANG[3] = {30, 90, 150};  // R, V, A
const unsigned long RECORRIDO = 1200;  // ms

int cuenta[3] = {0, 0, 0};
int anguloPendiente = -1, fallos = 0;
unsigned long moverEn = 0, ultimaPieza = 0;

void setup() {
  pinMode(PARO, INPUT_PULLUP);
  Wire.begin();                // maestro
  color.begin();
  desviador.attach(6);
  display.shutdown(0, false);  // encender
  display.setIntensity(0, 8);
  display.clearDisplay(0);
  display.setChar(0, 5, '-', false);
  display.setChar(0, 2, '-', false);
  mostrarCuentas();
}

// 0 = rojo, 1 = verde, 2 = azul
int leerColor() {
  uint16_t r, g, b, c;
  color.getRawData(&r, &g, &b, &c);
  if (r > g && r > b) return 0;
  if (g > r && g > b) return 1;
  return 2;
}

// Conteo en el display: RR-VV-AA
void mostrarCuentas() {
  for (int i = 0; i < 3; i++) {
    int pos = 7 - i * 3;
    int d = cuenta[i];
    display.setDigit(0, pos, d / 10 % 10, false);
    display.setDigit(0, pos - 1, d % 10, false);
  }
}

// Llega una pieza: leer, contar y programar
void clasificar() {
  delay(150);  // centrar la pieza bajo el sensor
  int c = leerColor();
  cuenta[c]++;
  mostrarCuentas();
  anguloPendiente = ANG[c];
  // esperar a que pase la pieza anterior
  moverEn = max(millis(), ultimaPieza + RECORRIDO);
  ultimaPieza = millis();
}

void loop() {
  // 1. Paro de emergencia: orden al nodo banda
  Wire.beginTransmission(8);
  Wire.write(digitalRead(PARO) == LOW ? 'S' : 'G');
  Wire.endTransmission();

  // 2. Preguntar al nodo banda (2 bytes)
  Wire.requestFrom(8, 2);
  if (Wire.available() == 2) {
    bool hay = Wire.read();
    int vel = Wire.read();  // para registrar
    fallos = 0;
    if (hay) clasificar();
  } else if (++fallos > 10) {
    display.setChar(0, 5, 'E', false);  // error
  }

  // 3. Mover el desviador en el momento justo
  if (anguloPendiente >= 0 && millis() >= moverEn) {
    desviador.write(anguloPendiente);
    anguloPendiente = -1;
  }
  delay(20);
}
```

Avancen mensaje por mensaje en la animación para ver qué se dicen los dos nodos en cada vuelta:

:::animacion tipo="protocolo" sistema="banda"
:::

Si el display muestra **E**, el clasificador no recibe respuesta de la banda: revisen los cables A4, A5 y GND entre las placas y que la banda tenga su programa. Para saber qué dispositivos ve el maestro, suban al clasificador el ejemplo **Archivo → Ejemplos → Wire → i2c_scanner** (si no aparece, pidan ayuda al docente): deben aparecer 0x08 (la banda) y 0x29 (el sensor).

:::pregunta id="g5-p2"
¿Para qué sirve la variable `moverEn`? ¿Qué pasaría si el servo se moviera en el mismo instante en que se lee el color?
:::

## Parte 5 · Primera prueba (20 min)

Pongan la perilla a una velocidad media y coloquen las piezas en la banda **de una en una**, esperando a que cada una caiga. Anoten el color que muestra el conteo del display (RR-VV-AA: dos dígitos por color) y si fue al contenedor correcto.

:::tabla id="g5-prueba"
| Pieza | Color detectado | ¿Fue al contenedor correcto? | Display |
| --- | --- | --- | --- |
| Roja | | | |
| Verde | | | |
| Azul | | | |
| Roja | | | |
| Verde | | | |
| Azul | | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] Leímos los valores crudos de cada color.
- [ ] El nodo banda responde al maestro.
- [ ] El display muestra el conteo.
- [ ] El desviador se mueve según el color.
- [ ] El botón de paro detiene la banda.
:::

## Bitácora

Anoten los fallos de hoy (síntoma, causa y solución).

:::tabla id="g5-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Antes de irse: desenchufen la fuente y suban los dos programas (`equipo_NOMBRE_banda` y `equipo_NOMBRE_clasificador`) juntos en un `.zip`.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si el maestro no encuentra el sensor, correr un "I2C scanner" (Archivo → Ejemplos → Wire): deben aparecer 0x08 y 0x29.
- El servo se alimenta del LM2596, no del pin 5V del Arduino.
- Display: "RR-VV-AA" (dos dígitos por color, guiones de separación); si aparece "E" es error de comunicación con el nodo banda.
- g5-p2: el desviador espera a que la pieza recorra la distancia hasta él; si se moviera al leer, empujaría la pieza anterior.
- Tiempo total: 20 + 20 + 20 + 35 + 20 + 5 = 120 minutos (la bitácora se llena durante las pruebas).
:::

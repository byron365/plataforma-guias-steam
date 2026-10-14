---
titulo: Del celular a cada habitación
guia: 5
sabado: 5
sesion: Programación del sistema
duracion: 120
---

# Guía 5 · Del celular a cada habitación

## Objetivo del día

Programar el nodo de nuestro equipo con su control local y su parte del contrato I2C; el equipo de la central programa la recepción Bluetooth, el reenvío I2C y la pantalla.

**Al terminar tendremos:** nuestro nodo respondiendo a órdenes I2C y la central controlando la casa desde el celular.

## Materiales del equipo

- Nodo armado (sábado 4)
- Un Arduino "maestro de pruebas" (para los nodos)
- Celular Android con "Serial Bluetooth Terminal" (central)

## Parte 1 · El código de nuestro nodo (40 min)

Cada equipo carga **solo** el código de su nodo.

### Nodo sala (dirección 8)

```cpp
// Casa inteligente distribuida - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// NODO SALA (dirección 8)

#include <Wire.h>
const int TIRA = 9;  // gate del MOSFET
const int LDR = A0;  // divisor con 10 kΩ

volatile byte pedido = 0;  // 0-100, 255 = auto
byte brillo = 0, luz = 0;

void setup() {
  pinMode(TIRA, OUTPUT);
  Wire.begin(8);  // nodo sala
  Wire.onReceive(recibir);
  Wire.onRequest(responder);
}

void loop() {
  luz = map(analogRead(LDR), 0, 1023, 0, 100);
  if (pedido == 255) brillo = luz < 30 ? 80 : 0;
  else brillo = pedido;
  analogWrite(TIRA, map(brillo, 0, 100, 0, 255));
  delay(50);
}

// Orden de la central: 'L' + brillo
void recibir(int n) {
  char orden = Wire.read();
  byte valor = Wire.read();
  if (orden == 'L') pedido = valor;
}

// Estado para la central: brillo y luz
void responder() {
  Wire.write(brillo);
  Wire.write(luz);
}
```

### Nodo cuarto (dirección 9)

```cpp
// Casa inteligente distribuida - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// NODO CUARTO (dirección 9). Librería: DHT sensor library

#include <Wire.h>
#include <DHT.h>
DHT dht(2, DHT11);
const int VENT = 9;  // gate del MOSFET

volatile byte pedido = 255;  // auto al iniciar
byte vel = 0, temp = 0;

void loop() {
  float t = dht.readTemperature();
  if (!isnan(t)) temp = t;
  if (pedido == 255) {  // automático
    if (temp >= 28) vel = 100;
    else if (temp >= 25) vel = 60;
    else vel = 0;
  } else {
    vel = pedido;
  }
  analogWrite(VENT, map(vel, 0, 100, 0, 255));
  delay(2000);
}

void setup() {
  pinMode(VENT, OUTPUT);
  dht.begin();
  Wire.begin(9);  // nodo cuarto
  Wire.onReceive(recibir);
  Wire.onRequest(responder);
}

void recibir(int n) {
  char orden = Wire.read();
  byte valor = Wire.read();
  if (orden == 'V') pedido = valor;
}

void responder() {
  Wire.write(vel);
  Wire.write(temp);
}
```

### Nodo entrada (dirección 10)

```cpp
// Casa inteligente distribuida - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// NODO ENTRADA (dirección 10)

#include <Wire.h>
const int RELE = 7, PIR = 2, BUZZER = 5;

volatile bool abrir = false, armada = false;
bool alarma = false;

void loop() {
  if (abrir) {  // puerta abierta 2 s
    digitalWrite(RELE, HIGH);
    delay(2000);
    digitalWrite(RELE, LOW);
    abrir = false;
  }
  if (armada && digitalRead(PIR) == HIGH)
    alarma = true;
  if (!armada) alarma = false;
  if (alarma) tone(BUZZER, 2000, 200);
  delay(100);
}

void setup() {
  pinMode(RELE, OUTPUT);
  pinMode(PIR, INPUT);
  Wire.begin(10);  // nodo entrada
  Wire.onReceive(recibir);
  Wire.onRequest(responder);
}

// 'A' = abrir, 'F' = armar o desarmar
void recibir(int n) {
  char orden = Wire.read();
  byte valor = Wire.read();
  if (orden == 'A') abrir = true;
  if (orden == 'F') armada = valor;
}

void responder() {
  Wire.write(abrir ? 1 : 0);
  Wire.write(alarma ? 1 : 0);
}
```

:::pregunta id="g5-p1"
En nuestro nodo, ¿qué hace el programa en modo automático y qué hace cuando recibe un valor de la central?
:::

## Parte 2 · Probar el nodo con un maestro de pruebas (25 min)

Antes de unirse a la casa, cada nodo se prueba con un Arduino que hace de **central de pruebas**: escribes en el Monitor serie `8 L 50` (dirección, letra, valor) y lo envía por I2C; además muestra los 2 bytes de estado.

```cpp
#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
  Serial.println("Formato: direccion letra valor  (ej: 8 L 50)");
}

void loop() {
  if (Serial.available()) {
    int dir = Serial.parseInt();
    while (Serial.peek() == ' ') Serial.read();
    char letra = Serial.read();
    int valor = Serial.parseInt();
    Wire.beginTransmission(dir);
    Wire.write(letra);
    Wire.write(valor);
    byte r = Wire.endTransmission();
    Serial.println(r == 0 ? "Enviado" : "Sin respuesta del nodo");
    delay(300);
    Wire.requestFrom(dir, 2);
    Serial.print("Estado: ");
    while (Wire.available()) { Serial.print(Wire.read()); Serial.print(" "); }
    Serial.println();
  }
}
```

:::tabla id="g5-pruebas-nodo"
| Orden enviada | Estado esperado | Estado recibido | ¿Cumple el contrato? |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
:::

## Parte 3 · La central (equipo central) (40 min)

```cpp
// Casa inteligente distribuida - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// CENTRAL (maestro I2C + HC-05). Librería: Adafruit SSD1306

#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
SoftwareSerial bt(10, 11);  // RX, TX al HC-05
Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);

// Direcciones I2C de los nodos
const byte SALA = 8, CUARTO = 9, ENTRADA = 10;
const byte NODOS[3] = {SALA, CUARTO, ENTRADA};

byte estado[3][2];  // 2 datos de cada nodo
bool alertaEnviada = false;
String buffer = "";
unsigned long ultimo = 0;

void setup() {
  bt.begin(9600);
  Wire.begin();  // maestro
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
}

// Orden de 2 bytes a un nodo
void enviar(byte nodo, char orden, byte valor) {
  Wire.beginTransmission(nodo);
  Wire.write(orden);
  Wire.write(valor);
  Wire.endTransmission();
}

// Órdenes del celular: L75, VA, A, N, F, C
void procesar(String m) {
  char c = m[0];
  String r = m.substring(1);
  byte v = constrain(r.toInt(), 0, 100);
  if (r == "A") v = 255;  // automático
  if (c == 'L') enviar(SALA, 'L', v);
  if (c == 'V') enviar(CUARTO, 'V', v);
  if (c == 'A') enviar(ENTRADA, 'A', 1);
  if (c == 'N') {         // modo noche
    enviar(SALA, 'L', 20);
    enviar(CUARTO, 'V', 255);
  }
  if (c == 'F') {         // modo fuera
    enviar(SALA, 'L', 0);
    enviar(CUARTO, 'V', 0);
    enviar(ENTRADA, 'F', 1);
  }
  if (c == 'C') enviar(ENTRADA, 'F', 0);  // en casa
  bt.println("OK " + m);
}

// Pide 2 bytes de estado a cada nodo
void leerNodos() {
  for (int i = 0; i < 3; i++) {
    Wire.requestFrom(NODOS[i], (byte)2);
    if (Wire.available() == 2) {
      estado[i][0] = Wire.read();
      estado[i][1] = Wire.read();
    }
  }
  bool alarma = estado[2][1] == 1;
  if (alarma && !alertaEnviada) {
    bt.println("ALERTA: movimiento en la entrada");
  }
  alertaEnviada = alarma;
}

void mostrar() {
  pantalla.clearDisplay();
  pantalla.setTextSize(1);
  pantalla.setCursor(0, 0);
  pantalla.print("Sala luz: ");
  pantalla.print(estado[0][0]);
  pantalla.println(" %");
  pantalla.print("Cuarto: ");
  pantalla.print(estado[1][1]);
  pantalla.print(" C, vent ");
  pantalla.print(estado[1][0]);
  pantalla.println(" %");
  pantalla.println(estado[2][0] ? "Puerta ABIERTA"
                                : "Puerta cerrada");
  if (estado[2][1]) pantalla.println("ALARMA!");
  pantalla.display();
}

void loop() {
  // 1. Órdenes desde el celular
  while (bt.available()) {
    char c = bt.read();
    if (c == '\n') {
      procesar(buffer);
      buffer = "";
    } else if (c != '\r') {
      buffer += c;
    }
  }

  // 2. Estado de la casa cada 500 ms
  if (millis() - ultimo > 500) {
    leerNodos();
    mostrar();
    ultimo = millis();
  }
}
```

Configura botones en la app del celular con las órdenes del contrato (L75, LA, V50, VA, A, N, F, C).

[IMAGEN 5.1: app Serial Bluetooth Terminal con botones configurados para las órdenes de la casa]

:::pregunta id="g5-p2"
¿Qué hace la central cuando recibe la orden `N` (modo noche)? ¿Cuántos nodos reciben mensaje?
:::

## Parte 4 · Primera conexión de prueba (10 min)

Si la central y al menos un nodo están listos, conéctenlos por el bus (SDA, SCL, GND) y prueben una orden desde el celular.

| Orden desde el celular | ¿Respondió el nodo? | ¿La pantalla muestra el estado? |
| --- | --- | --- |
| | | |
| | | |

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] Nuestro nodo tiene su código cargado.
- [ ] Probamos el nodo con el maestro de pruebas.
- [ ] El nodo cumple el contrato (2 bytes de orden, 2 de estado).
- [ ] (Central) Recibe órdenes del celular y las reenvía.
:::

:::tabla id="g5-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::docente
- Cada equipo puede usar el código del contrato como base y mejorarlo, pero sin cambiar el formato de los mensajes.
- `endTransmission()` devuelve 0 si el nodo respondió: es la forma más simple de detectar un nodo caído.
- g5-p2: sala a 20 % y cuarto en automático; dos nodos.
- Tiempo total: 40 + 25 + 40 + 10 + 5 = 120 minutos.
:::

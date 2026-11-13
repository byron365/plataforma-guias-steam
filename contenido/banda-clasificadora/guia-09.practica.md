---
titulo: Subimos los programas y probamos la banda
guia: 9
sabado: 9
sesion: Práctica de armado (2)
tipo: armado
duracion: 120
---

# Guía 9 · Subimos los programas y probamos la banda

## Objetivo del día

Usar Arduino IDE para probar la etapa de potencia (primero con el LED y luego con el motor), subir los programas del nodo banda (esclavo I2C) y del nodo clasificador (maestro) y probar la banda completa.

**Al terminar tendremos:** la banda moviéndose con la velocidad de la perilla, detectando piezas, leyendo su color, mandándolas a su contenedor y mostrando el conteo en la pantalla.

## Materiales del equipo

- Banda con los circuitos de los dos nodos conectados y revisados (Guía 8)
- Diodo 1N4007 y capacitor de 470–1000 µF (10 V o más); el motor TT ya está montado en la banda
- Computadora con Arduino IDE y los dos cables USB
- La fuente de 5 V (ya conectada al jack en la Guía 8) y el multímetro
- 3 contenedores (vasos o cajitas de menos de 3 cm de alto) y piezas de los tres colores
- Librerías **Adafruit TCS34725** y **LiquidCrystal I2C**
- Los programas del simulador (Guía 6): `equipo_NOMBRE_banda.txt` y `equipo_NOMBRE_clasificador.txt`

**Seguridad:** conecten y desconecten cables **siempre con la fuente desenchufada**, y pidan al docente que revise antes de enchufarla.

## Parte 1 · Conociendo Arduino IDE (10 min)

Arduino IDE es el programa que pasa el código de la computadora al Arduino. Ábranlo y busquen estas partes:

- **✓ Verificar:** revisa que el programa no tenga errores.
- **→ Subir:** lo pasa al Arduino por el cable USB.
- **Selector de placa:** dice qué Arduino está conectado y en qué puerto.
- **Monitor serie** (la lupa, arriba a la derecha): muestra lo que el Arduino escribe con `Serial.println`.
- Abajo, el **cuadro de mensajes**: ahí aparecen los avisos y los errores.

[IMAGEN 9.1A: Arduino IDE con sus partes señaladas: Verificar, Subir, selector de placa, Monitor serie, área del programa y cuadro de mensajes]

## Parte 2 · Primero con un LED (15 min)

El Arduino da unos 20 mA por pin; el motor necesita cientos. El **transistor TIP41C** es un interruptor electrónico: una corriente pequeña en su **base** deja pasar una corriente grande entre **colector** y **emisor**. Con PWM en la base, controlamos la velocidad.

Antes del motor, probamos con una carga que no se daña: el LED que conectaron en la Guía 8.

1. Con la fuente **desenchufada**, conecten **solo** el Arduino de la banda (B) por USB. Se enciende su luz **ON**.
2. Toquen el **selector de placa** y luego **Seleccione otra placa y puerto…** En **Placas**, escriban `uno` y elijan **Arduino UNO**. En **Puertos**, elijan el que dice **COM** y un número. Toquen **Aceptar**.

[IMAGEN 9.2A: ventana Seleccionar otra placa y puerto: Arduino UNO elegido en Placas, la lista de Puertos donde aparece el COM cuando el Arduino está conectado y el botón Aceptar]

**✔ Revisa:** si no aparece ningún puerto, prueben otro puerto USB de la computadora o avisen al docente.

3. Creen un programa nuevo (**Archivo → Nuevo**) y escriban este código:

```cpp
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  int vel = analogRead(A0) / 4;   // perilla: 0 a 255
  analogWrite(9, vel);
}
```

4. Toquen **✓ Verificar**: debe aparecer el aviso **Compilación completada**.

[IMAGEN 9.3A: Arduino IDE con el programa de prueba del LED verificado y el aviso Compilación completada]

5. Toquen **→ Subir**, el botón que está al lado de Verificar, y esperen a que el cuadro de mensajes diga que terminó, sin letras rojas.

[IMAGEN 9.4A: barra de Arduino IDE con el botón Subir señalado, al lado de Verificar]

6. Después enchufen la fuente y giren la perilla.

Para medir el voltaje entre colector y emisor: multímetro en voltaje continuo (**V** con línea recta), punta roja en el **colector** (la columna 8) y negra en el **emisor** (la columna 9).

:::tabla id="g9a-led"
| Perilla | Brillo del LED | Voltaje entre colector y emisor (V) |
| --- | --- | --- |
| Mínimo | | |
| Mitad | | |
| Máximo | | |
:::

## Parte 3 · Ahora el motor (20 min)

1. Desenchufa la fuente. Quiten el LED, su resistencia de 220 Ω y el cable rojo de A20. El motor va en su lugar (sin resistencia): un cable del motor a la **fila +** de arriba (los +5 V de la fuente) y el otro a **D15**, la columna donde llega el cable del colector.

[IMAGEN 9.5A: paso 1, el motor en lugar del LED: un cable a la fila + de arriba y el otro a D15, la columna del colector]

2. Coloca el **diodo** en paralelo con el motor: **franja (cátodo) hacia +5 V**. La pata de la franja va en la **fila +** de arriba (la misma del cable del motor) y la otra en **A15** (la columna del colector).

[IMAGEN 9.6A: paso 2, el diodo de la fila + de arriba (franja) a A15]

3. Coloca el **capacitor** entre las dos filas de arriba: la pata **larga** (+) en la **fila +** y la del lado de la franja (−) en la **fila −**. Evita que el voltaje caiga cuando el motor arranca.

[IMAGEN 9.7A: paso 3, el capacitor entre las filas de arriba: la pata larga en la fila + y la franja en la fila −]

4. Revisa todo con el docente y enchufa la fuente. El programa de la Parte 2 sigue en el Arduino: no hay que subirlo otra vez.

:::checklist id="g9a-revision"
- [ ] El diodo tiene la franja hacia +5 V.
- [ ] El capacitor tiene su franja (−) hacia GND.
- [ ] La resistencia de 10 kΩ está entre la base y GND.
- [ ] El GND del Arduino está unido al − del jack de la fuente.
:::

Pongan la perilla en cada posición, déjenla 2 minutos y toquen el transistor **con cuidado y solo un instante**: anoten frío, tibio o caliente.

:::tabla id="g9a-motor"
| Perilla | ¿Se mueve la banda? | Temperatura del TIP41C después de 2 min |
| --- | --- | --- |
| 25 % | | |
| 50 % | | |
| 100 % | | |
:::

:::pregunta id="g9a-p1"
Con el motor y la perilla al máximo, ¿qué voltaje mide entre colector y emisor? Entonces, ¿cuántos voltios le llegan al motor?
:::

Con el mismo programa, prueben:

:::tabla id="g9a-pruebas"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| La banda avanza sin patinar | | |
| La perilla cambia la velocidad | | |
| Con la perilla al mínimo la banda se detiene | | |
| El LED del sensor IR se enciende al pasar una pieza | | |
:::

## Parte 4 · Nodo banda (10 min)

Este programa va en el Arduino de la **banda**. Es el mismo del simulador (Guía 6): si guardaron `equipo_NOMBRE_banda.txt`, pueden pegarlo. Desenchufen la fuente, conecten **solo ese** por USB, elijan su puerto, creen un programa nuevo con el código y guárdenlo como `equipo_NOMBRE_banda`. Verifiquen (✓) y súbanlo (→).

```cpp
// Banda transportadora clasificadora - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del NODO BANDA (esclavo I2C, dirección 8)

#include <Wire.h>

// --- Pines ---
const int MOTOR = 9;      // base del TIP41C (PWM)
const int POT = A0;       // velocidad
const int SENSOR_IR = 2;  // llegada de pieza

volatile bool pieza = false;  // aviso al maestro
volatile bool detenida = false;
bool antes = true;   // evita contar una pieza al encender
int velocidad = 0;

void setup() {
  pinMode(MOTOR, OUTPUT);
  pinMode(SENSOR_IR, INPUT_PULLUP);
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

:::pregunta id="g9a-p2"
¿Qué es un **flanco** y por qué el nodo banda avisa solo cuando la pieza **recién** llega (`ahora && !antes`)?
:::

## Parte 5 · Leer el color crudo (15 min)

**Instalar las librerías** (en Arduino IDE, una sola vez por computadora): abran el **Gestor de bibliotecas** (icono de los libros, a la izquierda, o **Herramientas → Administrar bibliotecas**), busquen **Adafruit TCS34725** e instálenla (si pregunta por otras, **Instalar todo**). Luego busquen **LiquidCrystal I2C** (de Frank de Brabander) e instálenla.

Antes del programa completo, mira qué valores da el sensor con cada pieza:

1. Desconecten el USB de la banda y conecten **solo** el clasificador (C). Elijan **Arduino UNO** y su puerto en el selector de placa (puede ser otro número COM).
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

:::tabla id="g9a-crudo"
| Pieza bajo el sensor | R | G | B | C (luz total) |
| --- | --- | --- | --- | --- |
| Nada (banda) | | | | |
| Roja | | | | |
| Verde | | | | |
| Azul | | | | |
:::

## Parte 6 · Nodo clasificador (25 min)

Este programa va en el Arduino **clasificador**. Es el del simulador (Guía 6) con dos diferencias: `leerColor()` ahora lee el sensor TCS34725 en lugar de las tres perillas, y la pantalla solo muestra el conteo. Copien el de esta guía. Con el clasificador conectado por USB, creen un programa nuevo, guárdenlo como `equipo_NOMBRE_clasificador`, verifiquen y súbanlo.

Después conecten los dos Arduino (cada uno con su USB) y enchufen la fuente.

```cpp
// Banda transportadora clasificadora - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del NODO CLASIFICADOR (maestro I2C)
// Librerías: Adafruit TCS34725, LiquidCrystal I2C

#include <Wire.h>
#include <Servo.h>
#include <Adafruit_TCS34725.h>
#include <LiquidCrystal_I2C.h>

Adafruit_TCS34725 color(
  TCS34725_INTEGRATIONTIME_50MS,
  TCS34725_GAIN_4X);
LiquidCrystal_I2C pantalla(0x27, 16, 2);  // dirección, columnas, filas
Servo desviador;

// --- Ajustes del equipo ---
const int PARO = 7;
const int ANG[3] = {30, 90, 150};  // R, V, A
const unsigned long RECORRIDO = 1200;  // ms

int cuenta[3] = {0, 0, 0};
int anguloPendiente = -1, fallos = 0;
unsigned long moverEn = 0, ultimaPieza = 0;
bool parado = false, botonAntes = false;

void setup() {
  pinMode(PARO, INPUT_PULLUP);
  Wire.begin();                // maestro
  color.begin();
  desviador.attach(6);
  pantalla.init();
  pantalla.backlight();
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

// Conteo en la pantalla: R:0 V:0 A:0
void mostrarCuentas() {
  pantalla.setCursor(0, 0);
  pantalla.print("R:");
  pantalla.print(cuenta[0]);
  pantalla.print(" V:");
  pantalla.print(cuenta[1]);
  pantalla.print(" A:");
  pantalla.print(cuenta[2]);
  pantalla.print("   ");     // borra lo que sobraba
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
  // 1. Paro de emergencia: un toque detiene y otro reanuda
  bool boton = digitalRead(PARO) == LOW;
  if (boton && !botonAntes) parado = !parado;
  botonAntes = boton;
  Wire.beginTransmission(8);
  Wire.write(parado ? 'S' : 'G');
  Wire.endTransmission();

  // 2. Preguntar al nodo banda (2 bytes)
  Wire.requestFrom(8, 2);
  if (Wire.available() == 2) {
    bool hay = Wire.read();
    int vel = Wire.read();  // para registrar
    if (fallos > 10) {      // volvió la comunicación
      pantalla.setCursor(0, 1);
      pantalla.print("                ");
    }
    fallos = 0;
    if (hay) clasificar();
  } else if (++fallos > 10) {
    pantalla.setCursor(0, 1);
    pantalla.print("ERROR: sin banda");
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

Si la pantalla muestra **ERROR: sin banda**, el clasificador no recibe respuesta de la banda: revisen los cables A4, A5 y GND entre las placas y que la banda tenga su programa. Para saber qué dispositivos ve el maestro, suban al clasificador el ejemplo **Archivo → Ejemplos → Wire → i2c_scanner** (si no aparece, pidan ayuda al docente): deben aparecer 0x08 (la banda), 0x27 (la pantalla) y 0x29 (el sensor). Si la pantalla aparece como 0x3F, cambien `0x27` por `0x3F` en el código.

:::pregunta id="g9a-p3"
¿Para qué sirve la variable `moverEn`? ¿Qué pasaría si la canaleta girara en el mismo instante en que se lee el color?
:::

## Parte 7 · Primera prueba (15 min)

Pongan los tres contenedores bajo la punta de la canaleta, como en la Guía 7. Pongan la perilla a una velocidad media y coloquen las piezas en la banda **de una en una**, esperando a que cada una caiga. Anoten el color que muestra el conteo de la pantalla (R, V y A) y si cayó en el contenedor correcto.

:::tabla id="g9a-prueba"
| Pieza | Color detectado | ¿Fue al contenedor correcto? | Pantalla |
| --- | --- | --- | --- |
| Roja | | | |
| Verde | | | |
| Azul | | | |
| Roja | | | |
| Verde | | | |
| Azul | | | |
:::

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad y con los diagramas de la Guía 8. Desenchufen la fuente y desconecten los USB antes de cambiar un cable.

## ¿Lo logramos? (5 min)

:::checklist id="g9a-logramos"
- [ ] Probamos el transistor con un LED.
- [ ] El motor gira con la velocidad de la perilla.
- [ ] Leímos los valores crudos de cada color.
- [ ] El nodo banda responde al maestro.
- [ ] La pantalla muestra el conteo.
- [ ] La canaleta gira según el color.
- [ ] El botón de paro detiene la banda y otro toque la reanuda.
:::

## Bitácora (5 min)

Anoten los fallos de hoy (síntoma, causa y solución).

:::tabla id="g9a-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Antes de irse: desenchufen la fuente y suban los dos programas (`equipo_NOMBRE_banda` y `equipo_NOMBRE_clasificador`) juntos en un `.zip`.

:::archivo id="g9-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (11 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Junta la prueba con el LED y el cambio al motor de la Guía 7 práctica anterior (Partes 3 y 4) con la Guía 8 práctica anterior (Partes 2 a 5), más las partes de Arduino IDE. El circuito ya quedó conectado en la Guía 8 y la canaleta, pegada en la Guía 7. Campos propios (g9a-…): g9a-led, g9a-revision, g9a-motor, g9a-p1 y g9a-pruebas eran g7p-…; g9a-crudo, g9a-p2 (era g8p-p1), g9a-p3 (era g8p-p2), g9a-prueba, g9a-logramos y g9a-fallos eran g8p-….
- Imágenes 9.1A a 9.4A: capturas de Arduino IDE 2.3.10 en español con el programa de prueba del LED, tomadas sin Arduino conectado (por eso la 9.2A no muestra el COM). Imágenes 9.5A a 9.7A: `herramientas/diagramas_armado.py banda-motor` (lo de la Guía 8 se ve apagado).
- TIP41C: 220 Ω en la base dan unos (5 − 0,9) ÷ 220 ≈ 19 mA, seguros para el pin y suficientes para el TT (≈ 0,2 A andando, menos de 1 A al arrancar). Patas mirando de frente: B, C, E.
- g9a-p1: el TIP41C saturado deja unos 0,2–1 V entre colector y emisor (más que el MOSFET de la versión completa); al motor le llegan unos 4–4,8 V, suficiente para el TT.
- El capacitor de 470–1000 µF junto al motor y el servo evita que caiga el voltaje cuando arrancan (y que se reinicien los Arduino si también toman energía de la fuente).
- Revisar cada etapa de potencia **antes** de enchufar: diodo o capacitor al revés y colector/emisor invertidos son los errores más comunes.
- Si el motor arranca solo al encender el Arduino, falta la resistencia de 10 kΩ entre la base y GND.
- Si el maestro no encuentra el sensor, correr un "I2C scanner" (Archivo → Ejemplos → Wire): deben aparecer 0x08, 0x27 y 0x29.
- Los programas son los del simulador (Guía 6) con una sola diferencia: `leerColor()` usa el sensor TCS34725 en lugar de las tres perillas. Desde el 30 de octubre la pantalla es una **LCD 16 × 2 I2C** (PCF8574, 0x27) en lugar del MAX7219 (decisión de Bairon).
- El servo se alimenta de la fuente, no del pin 5V del Arduino. El capacitor ayuda a que no se reinicien los Arduino.
- Pantalla: arriba el conteo "R:3 V:2 A:4"; abajo "ERROR: sin banda" si se pierde la comunicación con el nodo banda. Si se ve encendida pero sin letras, girar el tornillito azul del módulo I2C (contraste).
- g9a-p3: la canaleta espera a que la pieza recorra la distancia hasta el puente; si girara al leer el color, mandaría a otro contenedor la pieza anterior que todavía va cayendo.
- Tiempo total: 10 + 15 + 20 + 10 + 15 + 25 + 15 + 5 + 5 = 120 minutos.
:::

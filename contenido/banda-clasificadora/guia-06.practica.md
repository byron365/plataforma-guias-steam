---
titulo: Simulamos el sistema completo
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos el sistema completo

## Objetivo del día

Unir los dos Arduinos por el bus **I2C** y simular la banda completa: llega una pieza, el clasificador lee su color, cuenta y gira la canaleta en el momento justo; el botón de paro detiene el motor.

**Al terminar tendremos:** la banda clasificadora completa funcionando en el simulador, con los dos programas finales guardados para los Arduinos reales.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_banda_sim` con los dos nodos (sábado 5)
- Bitácora

## Parte 1 · Dos Arduinos que conversan por I2C (15 min)

En el bus **I2C** hay un **maestro** que pregunta y da órdenes, y **esclavos** que responden. Todos comparten dos cables: **SDA** (datos, A4) y **SCL** (reloj, A5), más el GND.

- El **clasificador** es el maestro.
- La **banda** es el esclavo número **8**.
- En la banda real, el sensor de color y la pantalla también cuelgan del mismo bus, cada uno con su propio número (dirección).

En cada vuelta, el maestro hace dos cosas:

| Paso | Quién habla | Qué dice |
| --- | --- | --- |
| 1 | Clasificador → banda | Una letra: **S** (detener) si el botón de paro está presionado, **G** (avanzar) si no |
| 2 | Banda → clasificador | Dos números: ¿llegó una pieza? (1 o 0) y la velocidad actual |

Avancen mensaje por mensaje en la animación para ver qué se dicen los dos nodos en cada vuelta:

:::animacion tipo="protocolo" sistema="banda"
:::

:::pregunta id="g6p-p1"
¿Por qué la banda no le "avisa" sola al clasificador cuando llega una pieza, sino que espera a que le pregunten?
:::

## Parte 2 · Conectar el bus (10 min)

Con la simulación detenida, unan los dos Arduinos con tres cables:

| Arduino clasificador | Arduino banda |
| --- | --- |
| A4 (SDA) | A4 (SDA) |
| A5 (SCL) | A5 (SCL) |
| GND | GND |

La pantalla del clasificador sigue en su A4 y A5: el bus es compartido.

[IMAGEN 6.1S: banda clasificadora completa simulada en Tinkercad Circuits: nodo banda con el motor y el nodo clasificador con las perillas, el servo y la pantalla, unidos por A4, A5 y GND]

## Parte 3 · Los dos programas finales (40 min)

**Nodo banda** (Arduino **1**): elíjanlo en la lista del panel de código, borren su código y escriban. Es el de la Guía 4 sin el Monitor, más dos funciones que contestan al maestro.

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
bool antes = false;
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

**Nodo clasificador** (Arduino **2**): elíjanlo, borren su código y escriban. Junta lo de la Guía 5 con el conteo y el bus I2C.

```cpp
// Banda transportadora clasificadora - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del NODO CLASIFICADOR (maestro I2C)
// Librería: LiquidCrystal I2C
// En el simulador, tres perillas hacen de sensor de color

#include <Wire.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C pantalla(0x27, 16, 2);  // dirección, columnas, filas
Servo desviador;

// --- Ajustes del equipo ---
const int PARO = 7;
const int PERILLA_R = A0, PERILLA_G = A1, PERILLA_B = A2;
const int ANG[3] = {30, 90, 150};  // R, V, A
const unsigned long RECORRIDO = 1200;  // ms

int cuenta[3] = {0, 0, 0};
int anguloPendiente = -1, fallos = 0;
unsigned long moverEn = 0, ultimaPieza = 0;

void setup() {
  pinMode(PARO, INPUT_PULLUP);
  Wire.begin();                // maestro
  desviador.attach(6);
  pantalla.init();
  pantalla.backlight();
  mostrarCuentas();
}

// 0 = rojo, 1 = verde, 2 = azul
int leerColor() {
  int r = analogRead(PERILLA_R);
  int g = analogRead(PERILLA_G);
  int b = analogRead(PERILLA_B);
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
  // 1. Paro de emergencia: orden al nodo banda
  Wire.beginTransmission(8);
  Wire.write(digitalRead(PARO) == LOW ? 'S' : 'G');
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

- `Wire.begin(8)` en la banda la hace esclava número 8; `Wire.begin()` sin número en el clasificador lo hace maestro.
- `RECORRIDO` es el tiempo que tarda la pieza en ir del sensor al final de la banda: la canaleta espera ese tiempo antes de girar.

:::pregunta id="g6p-p2"
¿Para qué sirve la variable `moverEn`? ¿Qué pasaría si la canaleta girara en el mismo instante en que se lee el color?
:::

## Parte 4 · ¡A clasificar en el simulador! (30 min)

1. **Iniciar simulación.** Pongan la perilla de velocidad de la banda a la mitad: el motor gira.
2. Para cada pieza: formen su color con las tres perillas del clasificador, presionen el pulsador de la banda (llega la pieza) y miren la pantalla y el servo.

:::tabla id="g6p-pruebas"
| Prueba | ¿Pasó? | Lo que se ve |
| --- | --- | --- |
| Pieza roja: la pantalla suma una en R | | |
| Un poco después, la canaleta gira a 30° | | |
| Pieza verde: suma en V y la canaleta gira a 90° | | |
| Pieza azul: suma en A y la canaleta gira a 150° | | |
| Botón de paro presionado: el motor se detiene | | |
:::

3. **Sin banda:** detengan la simulación, borren el cable de **A4** entre los dos Arduinos y vuelvan a iniciar: la pantalla debe decir **ERROR: sin banda**. Después vuelvan a poner el cable.

:::pregunta id="g6p-p3"
Cuando presionan el botón de paro, ¿quién apaga el motor: el clasificador o la banda? ¿Cómo se entera la banda?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] Los dos Arduinos están unidos por A4, A5 y GND.
- [ ] Cada pieza suma en su color y la canaleta gira a su contenedor.
- [ ] El botón de paro detiene el motor.
- [ ] Sin el cable del bus, la pantalla muestra el error.
- [ ] Guardamos los dos programas.
:::

## Reto extra

Muestra en la fila de abajo de la pantalla la **velocidad** que manda la banda (el número `vel`), por ejemplo `Vel: 128`.

Pista: en el `loop` del clasificador, justo después de leer `vel`, escriban en la pantalla con `setCursor(0, 1)` y `print`. Cuidado de no borrar el mensaje de error.

## Bitácora (20 min)

:::pregunta id="g6p-b1"
¿Qué creen que será distinto cuando armen la banda real? (Piensen en el sensor de color de verdad y en la luz del salón.)
:::

**Muy importante:** estos son los programas que van a subir a los Arduinos reales el sábado 8. Copien cada uno completo (**Ctrl + A** y **Ctrl + C** en el panel Código), péguenlo en un bloc de notas y guárdenlos como `equipo_NOMBRE_banda.txt` (Arduino 1) y `equipo_NOMBRE_clasificador.txt` (Arduino 2). Súbanlos aquí juntos en un `.zip`.

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí el `.zip` con `equipo_NOMBRE_banda.txt` y `equipo_NOMBRE_clasificador.txt`. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí.
:::

:::docente
- **Versión Práctica (10 sábados):** los dos programas son los de la Guía 8 (antes Guía 5 Práctica); el clasificador del simulador solo cambia `leerColor()` (tres perillas en A0, A1 y A2 en lugar del TCS34725). Campos propios (g6p-…). Las respuestas de la Guía 6 anterior (calibrar y sincronizar) pasaron a la Guía 9 (g9p-…).
- I2C en Tinkercad: maestro (clasificador) y esclavo 8 (banda) unidos por A4, A5 y GND; la LCD (0x27) comparte el bus. Conviene probarlo antes en el diseño de referencia del docente.
- g6p-p1: en I2C solo el maestro inicia la conversación; el esclavo guarda el aviso (`pieza = true`) hasta que le preguntan.
- g6p-p2: la canaleta espera a que la pieza recorra la distancia hasta el final de la banda; si girara al leer el color, mandaría a otro contenedor la pieza anterior que todavía va cayendo.
- g6p-p3: la banda; el clasificador le manda la letra S en cada vuelta y la banda pone `detenida = true` y el PWM en 0.
- Tiempo total: 15 + 10 + 40 + 30 + 5 + 20 = 120 minutos.
:::

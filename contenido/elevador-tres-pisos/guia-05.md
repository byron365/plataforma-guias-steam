---
titulo: De un cerebro a cuatro
guia: 5
sabado: 5
sesion: Programación del sistema
duracion: 120
---

# Guía 5 · De un cerebro a cuatro

## Objetivo del día

Programar primero la versión centralizada (botones directos a la central) y luego la distribuida: tres nodos de piso por I2C y la central con su cola de llamadas.

**Al terminar tendremos:** el elevador atendiendo llamadas en las dos versiones, con los displays de cada piso mostrando dónde está la cabina.

## Materiales del equipo

- Torre con su electrónica (sábado 4)
- 3 Arduino de piso con botón, LED y display de 7 segmentos
- 3 botones extra (para la versión centralizada)
- Cable de 4 hilos para el bus (SDA, SCL, 5V, GND)

## Parte 1 · Versión centralizada (30 min)

Conecta tres botones de llamada directamente a la central: piso 1 → **D9**, piso 2 → **D10**, piso 3 → **D11** (a GND). Toma el código de la central (Parte 3) y cambia la función `sondearNodos()` por esta:

1. Con todo desconectado, conecten cada botón con una pata a su pin y otra a GND (en los botones de 4 patas, dos patas en diagonal). Pongan cada botón en su piso con cables largos.
2. Conecten la central por USB. **Archivo → Nuevo**, borren lo que trae y escriban el código **completo** de la central, que está más abajo en la Parte 3. Guárdenlo como `equipo_NOMBRE_central_centralizada`.
3. Debajo de la línea `bool llamada[3] = {false, false, false};` agreguen la línea `const int LLAMAR[3] = {9, 10, 11};`.
4. En el `setup()`, debajo de `pinMode(PARO, INPUT_PULLUP);`, agreguen la línea del `for` que dice `pinMode(LLAMAR[i], INPUT_PULLUP)`.
5. Borren la función `sondearNodos()` completa, desde el comentario `// Pregunta a cada piso y le informa` hasta su llave `}` de cierre, y en su lugar escriban la nueva (desde `void sondearNodos()` hasta el final del recuadro).
6. Pongan la cabina a mitad de la torre, conecten la fuente y suban (→). La cabina baja al piso 1 y queda esperando llamadas.

```cpp
const int LLAMAR[3] = {9, 10, 11};

// en setup():
for (int i = 0; i < 3; i++) pinMode(LLAMAR[i], INPUT_PULLUP);

void sondearNodos() {   // versión centralizada: botones directos
  for (int i = 0; i < 3; i++) {
    if (digitalRead(LLAMAR[i]) == LOW) llamada[i] = true;
  }
}
```

:::tabla id="g5-centralizada"
| Prueba | ¿Funciona? |
| --- | --- |
| Llamar al piso 3 desde el piso 1 | |
| Llamar al piso 2 | |
| Llamar a dos pisos casi al mismo tiempo | |
| Paro de emergencia durante el viaje | |
:::

Cuenten todos los cables que van desde la base hasta los pisos (botones, sensores y finales de carrera). Cada cable cuenta uno, aunque vayan juntos.

Cuenta los cables que suben por la torre en esta versión: ______

## Parte 2 · Nodos de piso (30 min)

Arma los tres nodos (como en Wokwi el sábado 2) y carga este código. **Cambia la DIRECCION** en cada uno: 8, 9 y 10.

**Armar cada nodo** (los tres son iguales):

- Segmentos a, b, c, d, e, f, g → D4, D5, D6, D7, D8, D9, D10 (cada uno con su resistencia de 220 Ω).
- Común del display → GND.
- Botón → D2 y GND.
- LED: D3 → 220 Ω → pata larga; pata corta → GND.

- El display real tiene 10 patas. Las dos del **centro** (arriba y abajo) son el común. Para saber qué pata es cada segmento, miren su hoja de datos o pidan el dibujo al docente.
- Prueba rápida: con el Arduino encendido, toquen con un cable que viene de 5V **a través de una resistencia de 220 Ω** cada pata: se enciende un segmento y así saben cuál es.

**Cargar el código en cada nodo:**

1. Conecten **solo** el nodo del piso 1 por USB. **Archivo → Nuevo**, escriban el código y guárdenlo como `equipo_NOMBRE_piso`.
2. Revisen que diga `DIRECCION = 8`, verifiquen (✓) y suban (→).
3. Desconecten ese nodo, conecten el del piso 2, cambien el `8` por `9` y suban. Lo mismo con el piso 3 y el `10`.
4. Pongan a cada nodo una etiqueta de cinta con su piso y su dirección (por ejemplo "Piso 2 – 9").

```cpp
// Elevador a escala de tres pisos - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa de cada NODO DE PISO (cambiar DIRECCION: 8, 9 o 10)

#include <Wire.h>
const int DIRECCION = 8;  // 8, 9 o 10 según el piso
const int BOTON = 2, LED = 3;
const int SEG[7] = {4, 5, 6, 7, 8, 9, 10};  // a..g

// Segmentos encendidos para 0, 1, 2 y 3
const byte NUM[4] = {0b0111111, 0b0000110,
                     0b1011011, 0b1001111};

volatile bool pedido = false;
volatile bool encendido = false;
volatile int piso = 1;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  for (int i = 0; i < 7; i++) pinMode(SEG[i], OUTPUT);
  Wire.begin(DIRECCION);
  Wire.onRequest(responder);
  Wire.onReceive(recibir);
}

void loop() {
  if (digitalRead(BOTON) == LOW) {
    pedido = true;
    encendido = true;  // LED al instante
  }
  digitalWrite(LED, encendido);
  for (int i = 0; i < 7; i++)
    digitalWrite(SEG[i], bitRead(NUM[piso], i));
  delay(10);
}

// La central pregunta: ¿alguien llamó?
void responder() {
  Wire.write(pedido ? 1 : 0);
  pedido = false;
}

// La central informa: piso actual y LED
void recibir(int n) {
  piso = constrain(Wire.read(), 0, 3);
  encendido = Wire.read();
}
```

| Nodo | DIRECCION | ¿Cargado? |
| --- | --- | --- |
| Piso 1 | 8 | |
| Piso 2 | 9 | |
| Piso 3 | 10 | |

**Bus I2C:** une SDA (A4), SCL (A5), 5V y GND de los cuatro Arduino con un solo cable que sube por la torre.

Con todo apagado: A4 con A4, A5 con A5, 5V con 5V y GND con GND en los cuatro Arduino. Usen siempre el mismo color para cada hilo (por ejemplo azul = A4, verde = A5, rojo = 5V, negro = GND) y sujeten el cable a la torre lejos del hilo de la cabina.

[IMAGEN 5.1: bus I2C de cuatro hilos subiendo por la torre y conectando los tres nodos de piso con la central]

Miren en la animación cómo la central pregunta a cada piso, uno por uno:

:::animacion tipo="i2c" esclavos="Piso 1|8; Piso 2|9; Piso 3|10"
:::

## Parte 3 · La central distribuida (35 min)

Quita los botones de la Parte 1 y carga el código original de la central:

1. Desconecten los tres botones de D9, D10 y D11.
2. Conecten la central por USB. **Archivo → Nuevo**, escriban el código de abajo **sin** los cambios de la Parte 1 y guárdenlo como `equipo_NOMBRE_central`.
3. Pongan la cabina a mitad de la torre, conecten la fuente, tengan la mano lista en el paro y suban (→).

```cpp
// Elevador a escala de tres pisos - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa de la CENTRAL (maestro I2C)

#include <Wire.h>

// --- Puente H ---
const int ENA = 5, IN1 = 7, IN2 = 8;

// --- Sensores y seguridad ---
const int PISO[3] = {2, 3, 4};  // reed por piso
const int FIN_ABAJO = A0, FIN_ARRIBA = A1;
const int PARO = A2;

// --- Ajustes del equipo ---
const int VEL_MAX = 200;          // PWM
const int NODOS[3] = {8, 9, 10};  // I2C

int pisoActual = 0, destino = -1, vel = 0;
bool llamada[3] = {false, false, false};

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  for (int i = 0; i < 3; i++)
    pinMode(PISO[i], INPUT_PULLUP);
  pinMode(FIN_ABAJO, INPUT_PULLUP);
  pinMode(FIN_ARRIBA, INPUT_PULLUP);
  pinMode(PARO, INPUT_PULLUP);
  Wire.begin();  // maestro
  // Al encender: bajar hasta el piso 1
  motor(-120);
  while (digitalRead(FIN_ABAJO) == HIGH) {}
  parar();
}

void motor(int v) {  // + sube, - baja
  digitalWrite(IN1, v > 0);
  digitalWrite(IN2, v < 0);
  analogWrite(ENA, abs(v));
}
void parar() { motor(0); vel = 0; }

// Pregunta a cada piso y le informa
void sondearNodos() {
  for (int i = 0; i < 3; i++) {
    Wire.requestFrom(NODOS[i], 1);
    if (Wire.available()) {
      if (Wire.read() == 1) llamada[i] = true;
    }  // sin respuesta: ese piso queda fuera
    Wire.beginTransmission(NODOS[i]);
    Wire.write(pisoActual + 1);      // display
    Wire.write(llamada[i] ? 1 : 0);  // LED
    Wire.endTransmission();
  }
}

// ¿En qué piso está la cabina? (-1 = entre pisos)
int leerPiso() {
  for (int i = 0; i < 3; i++)
    if (digitalRead(PISO[i]) == LOW) return i;
  return -1;
}

// Elige la llamada más cercana
int elegirDestino() {
  int mejor = -1;
  for (int i = 0; i < 3; i++) {
    if (!llamada[i]) continue;
    int d = abs(i - pisoActual);
    if (mejor < 0 || d < abs(mejor - pisoActual))
      mejor = i;
  }
  return mejor;
}

void loop() {
  sondearNodos();
  int p = leerPiso();
  if (p >= 0) pisoActual = p;

  // 1. Seguridad primero
  if (digitalRead(PARO) == LOW) { parar(); return; }

  // 2. Elegir destino si no hay uno
  if (destino < 0) destino = elegirDestino();
  if (destino < 0) { parar(); return; }

  // 3. ¿Llegamos?
  if (p == destino) {
    parar();
    llamada[destino] = false;
    destino = -1;
    delay(2000);  // puertas abiertas
    return;
  }
  // 4. Subir o bajar con rampa
  int dir = destino > pisoActual ? 1 : -1;
  bool topeArriba = digitalRead(FIN_ARRIBA) == LOW;
  bool topeAbajo = digitalRead(FIN_ABAJO) == LOW;
  if ((dir > 0 && topeArriba) ||
      (dir < 0 && topeAbajo)) {
    parar();
    return;
  }
  if (vel < VEL_MAX) vel += 5;  // rampa
  motor(dir * vel);
  delay(20);
}
```

:::pregunta id="g5-p1"
Explica con tus palabras cómo elige `elegirDestino()` a dónde ir cuando hay varias llamadas.
:::

:::pregunta id="g5-p2"
En el `loop`, ¿por qué la revisión del paro de emergencia va **antes** que todo lo demás?
:::

## Parte 4 · Prueba integrada (20 min)

Hagan cada prueba en orden y anoten **Sí** o **No**. En **Observación**, lo que vieron si algo salió distinto:

:::tabla id="g5-distribuida"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| Al encender, baja al piso 1 | | |
| Los tres displays muestran "1" | | |
| Llamar desde el piso 3: el LED se enciende | | |
| La cabina sube y se detiene en el 3 | | |
| Los displays cambian a "3" | | |
| El LED del piso 3 se apaga al llegar | | |
| Paro de emergencia | | |
:::

Cables que suben por la torre en la versión distribuida: ______

Hoy tienen tres programas (la central centralizada, el piso y la central distribuida): súbanlos juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] La versión centralizada funciona.
- [ ] Los tres nodos tienen su dirección.
- [ ] La central atiende llamadas de los tres pisos por I2C.
- [ ] Contamos los cables de cada versión.
:::

:::tabla id="g5-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::docente
- Si un nodo no responde, correr el "I2C scanner" desde la central: deben aparecer 0x08, 0x09 y 0x0A.
- Con cables largos en el bus, mantener la velocidad por defecto (100 kHz) y no superar ≈1 m.
- g5-p1: elige la llamada pendiente con menor distancia (en pisos) desde el piso actual.
- g5-p2: la seguridad tiene prioridad; si el paro se revisara al final, el motor podría recibir una orden antes de detenerse.
- Los nodos pueden alimentarse desde el 5V del LM2596 por el bus.
- Tiempo total: 30 + 30 + 35 + 20 + 5 = 120 minutos.
:::

---
titulo: El puente ve llegar al barco
guia: 6
sabado: 6
sesion: Pruebas y ajustes
duracion: 120
---

# Guía 6 · El puente ve llegar al barco

## Objetivo del día

Agregar el sensor ultrasónico para que el puente se abra solo al detectar un barco, y ajustar distancia, ángulo y tiempos.

**Al terminar tendremos:** el puente automático, con sus ajustes probados y anotados.

## Materiales del equipo

- Puente con el circuito del sábado 5
- Sensor ultrasónico HC-SR04
- Cables largos macho–hembra
- Un "barco" de prueba (caja pequeña o bloque) y regla

## Parte 1 · ¿Cómo mide el sensor? (15 min)

El HC-SR04 funciona como un murciélago: lanza un sonido muy agudo (que no escuchamos), el sonido rebota en el objeto y vuelve. Midiendo cuánto tarda, el Arduino calcula la distancia.

Muevan el objeto en la animación y miren cómo cambia el tiempo del eco:

:::animacion tipo="ultrasonico"
:::

> Distancia (cm) = tiempo (µs) × 0,034 ÷ 2

µs son **microsegundos** (millonésimas de segundo) y 0,034 es lo que avanza el sonido en un microsegundo, en centímetros.

:::pregunta id="g6-p1"
¿Por qué se divide entre 2?
:::

## Parte 2 · Conectar y probar el sensor (25 min)

Con el USB desconectado. El sensor tiene cuatro pines con su nombre impreso; usen cables macho–hembra (la punta hembra entra en el pin del sensor):

| Pin del HC-SR04 | Arduino |
| --- | --- |
| VCC | 5V |
| Trig | D7 |
| Echo | D8 |
| GND | GND |

- VCC → fila **+** de la protoboard (5V), GND → fila **−**.
- Trig → pin **7**, Echo → pin **8**.

Coloca el sensor en la orilla del río, mirando hacia donde vienen los barcos.

- Los dos "ojos" del sensor deben mirar a lo largo del río, a la altura del barco. Fíjenlo con cinta o silicona (sin tapar los ojos).
- Revisen que no apunte a una torre ni a la base: también las "vería".

[IMAGEN 6.1: sensor ultrasónico colocado en la orilla del río mirando hacia la llegada de los barcos]

Sube este código de prueba y abre el **Monitor serie** (lupa arriba a la derecha):

1. Conecta el USB, crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y escribe:

```cpp
const int TRIG = 7;
const int ECHO = 8;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

long medirDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);       // lanzar el sonido
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);  // esperar el eco
  return t * 0.034 / 2;           // convertir a cm
}

void loop() {
  Serial.println(medirDistancia());
  delay(200);
}
```

2. Verifica (✓), sube (→) y abre el Monitor serie a **9600 baudios**.
3. Pongan el barco de prueba frente al sensor a cada distancia de la tabla, medida con la regla desde los ojos del sensor. Anoten lo que mide el sensor y la diferencia (sensor − regla).

:::tabla id="g6-sensor"
| Distancia real con regla (cm) | Lo que mide el sensor (cm) | Diferencia |
| --- | --- | --- |
| 5 | | |
| 10 | | |
| 20 | | |
| 30 | | |
:::

## Parte 3 · El puente automático (30 min)

Ahora juntamos todo en el **código base del puente**. Es el del sábado 5 con dos cambios: tiene la función `medirDistancia()` y el `loop` ya no espera el botón, sino un barco cerca (`d < DISTANCIA_BARCO`).

1. Creen un programa nuevo, borren lo que trae y escriban el programa completo de abajo.
2. Guárdenlo como `equipo_NOMBRE_automatico`, verifiquen (✓) y súbanlo (→).
3. Acerquen el barco: cuando esté a menos de 10 cm, empieza la secuencia. En el Monitor serie pueden ver la distancia.

```cpp
#include <Servo.h>
Servo izq;  // hoja izquierda
Servo der;  // hoja derecha

// --- Pines ---
const int VERDE = 2;
const int AMARILLO = 3;
const int ROJO = 4;
const int BUZZER = 5;
const int TRIG = 7;
const int ECHO = 8;
const int SERVO_IZQ = 9;
const int SERVO_DER = 10;

// --- Ajustes del equipo ---
const int DISTANCIA_BARCO = 10; // cm
const int ANGULO_ARRIBA = 75;   // grados
const int TIEMPO_ARRIBA = 4000; // ms
const int VELOCIDAD = 25;       // ms por grado

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(ROJO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  izq.attach(SERVO_IZQ);
  der.attach(SERVO_DER);
  ponerAngulo(0);  // puente abajo
  digitalWrite(VERDE, HIGH);
  Serial.begin(9600);
}

long medirDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  return t * 0.034 / 2;  // cm
}

// Mueve las dos hojas en espejo
void ponerAngulo(int a) {
  izq.write(a);
  der.write(180 - a);
}

void moverPuente(int desde, int hasta) {
  int paso = (hasta > desde) ? 1 : -1;
  for (int a = desde; a != hasta; a += paso) {
    ponerAngulo(a);
    delay(VELOCIDAD);
  }
  ponerAngulo(hasta);
}

void loop() {
  long d = medirDistancia();
  Serial.println(d);
  if (d > 0 && d < DISTANCIA_BARCO) {
    secuenciaPuente();
  }
  delay(100);
}

void secuenciaPuente() {
  // 1. Aviso: amarillo + alarma
  digitalWrite(VERDE, LOW);
  digitalWrite(AMARILLO, HIGH);
  tone(BUZZER, 1000, 1500);
  delay(2000);

  // 2. Alto a los carros
  digitalWrite(AMARILLO, LOW);
  digitalWrite(ROJO, HIGH);

  // 3. Subir, esperar y bajar
  moverPuente(0, ANGULO_ARRIBA);
  delay(TIEMPO_ARRIBA);
  moverPuente(ANGULO_ARRIBA, 0);

  // 4. Paso libre
  digitalWrite(ROJO, LOW);
  digitalWrite(VERDE, HIGH);
}
```

:::pregunta id="g6-p2"
¿Para qué sirve `d > 0` en el `if`? (Pista: ¿qué devuelve el sensor si no recibe eco?)
:::

## Parte 4 · Ajustes del equipo (30 min)

Prueba distintos valores y elige los mejores:

1. Prueben un ajuste a la vez, dejando los demás como están.
2. Para probar un valor: cámbienlo en **Ajustes del equipo**, suban el código y pasen el barco.
3. En **Elegimos** escriban el valor que mejor funcionó y en **¿Por qué?** la razón (por ejemplo, "con 5 cm el puente se abría muy tarde").

:::tabla id="g6-ajustes"
| Ajuste | Valor 1 | Valor 2 | Valor 3 | Elegimos | ¿Por qué? |
| --- | --- | --- | --- | --- | --- |
| DISTANCIA_BARCO (cm) | 5 | 10 | 20 | | |
| ANGULO_ARRIBA (°) | 60 | 75 | 90 | | |
| VELOCIDAD (ms por grado) | 10 | 25 | 40 | | |
| TIEMPO_ARRIBA (ms) | 2000 | 4000 | 6000 | | |
:::

Hagan **5 pasadas** de barco seguidas con los valores elegidos:

Dejen en el código los valores elegidos, súbanlo y pasen el barco cinco veces sin cambiar nada entre una y otra.

| Pasada | ¿Se abrió a tiempo? | ¿El barco pasó sin chocar? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] El sensor mide distancias parecidas a la regla.
- [ ] El puente se abre solo al acercar el barco.
- [ ] Elegimos los ajustes del equipo.
- [ ] Logramos 5 pasadas seguidas sin fallar.
:::

## Reto extra

Deja también el **botón** del sábado 5 como modo manual: el puente se abre si hay barco **o** si se presiona el botón (`||`).

Pistas: necesitan la constante del botón (pin 6) y su `pinMode(…, INPUT_PULLUP)` en el `setup()`. En el `if` del `loop`, agreguen con `||` la pregunta de si el botón está presionado.

## Bitácora (15 min)

:::foto id="g6-foto"
Video del puente abriéndose solo.
:::

:::pregunta id="g6-b1"
¿Qué diferencia hay entre el modo manual (botón) y el modo automático (sensor)?
:::

Antes de irse, guarden `equipo_NOMBRE_automatico` con los valores elegidos (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g6-p1: el sonido va hasta el objeto y regresa; recorre dos veces la distancia.
- g6-p2: si no hay eco, `pulseIn` devuelve 0 y el puente se abriría sin barco.
- Si el sensor detecta las torres o la base, inclinarlo un poco hacia arriba o reducir DISTANCIA_BARCO.
- Tiempo total: 15 + 25 + 30 + 30 + 5 + 15 = 120 minutos.
:::

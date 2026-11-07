---
titulo: Simulamos el laberinto
guia: 4
sabado: 4
sesion: Simulación
duracion: 120
---

# Guía 4 · Simulamos el laberinto

## Objetivo del día

Simular en **Wokwi** los dos servos que inclinan el tablero: controlarlos con el joystick, limitar cuánto se inclinan y hacer que se muevan suave.

**Al terminar tendremos:** dos servos simulados que siguen al joystick sin saltos y el **programa final** guardado para el laberinto real.

## Materiales del equipo

- Computadora con internet y la cuenta de Wokwi del equipo
- El enlace del proyecto de Wokwi de la Guía 1 (está en su bitácora)
- Bitácora y lápiz

Mientras simulamos, se imprimen el tablero, el marco y las dos torres que diseñaron en las guías 2 y 3.

## Parte 1 · Dos servos, dos ejes (10 min)

Cada servo inclina el laberinto en una dirección: el **servo del marco** (D9) se mueve con el eje X del joystick y el **servo del tablero** (D10), con el eje Y.

Muevan los controles de la animación y miren qué parte gira con cada servo:

:::animacion tipo="cardan"
:::

Abran el proyecto de la Guía 1: con el enlace de su bitácora, o en **wokwi.com** → **My Projects** con la sesión iniciada. Ya tiene el joystick y un servo en D9.

## Parte 2 · El joystick mueve los dos servos (30 min)

1. Agreguen con el **+** un segundo *Servo* (si no lo hicieron en el reto de la Guía 1) y conéctenlo: **PWM → D10**, **V+ → 5V**, **GND → GND**.

| Componente | Conexión |
| --- | --- |
| Joystick | VCC → 5V · HORZ → A0 · VERT → A1 · SEL → D2 · GND → GND |
| Servo X (marco) | PWM → D9 · V+ → 5V · GND → GND |
| Servo Y (tablero) | PWM → D10 · V+ → 5V · GND → GND |

2. En `sketch.ino`, borren el código y escriban este:

```cpp
#include <Servo.h>
Servo servoX, servoY;

const int CENTRO = 90;
const int INCLINACION = 15;

void setup() {
  servoX.attach(9);
  servoY.attach(10);
  Serial.begin(9600);
}

void loop() {
  int angX = map(analogRead(A0), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
  int angY = map(analogRead(A1), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
  servoX.write(angX);
  servoY.write(angY);
  Serial.print(angX);
  Serial.print(",");
  Serial.println(angY);
  delay(20);
}
```

3. Presionen **Play** y muevan el joystick. En el Monitor serie, abajo, aparecen los dos ángulos separados por una coma.

:::tabla id="g4p-angulos"
| Prueba | Ángulo X | Ángulo Y |
| --- | --- | --- |
| Joystick en el centro | | |
| Todo a la derecha | | |
| Todo a la izquierda | | |
| Todo hacia arriba | | |
| Todo hacia abajo | | |
:::

:::pregunta id="g4p-p1"
Con el joystick en el centro, ¿qué ángulo tienen los servos? ¿Por qué ese ángulo será el del tablero plano?
:::

## Parte 3 · Inclinación y sentido (25 min)

`INCLINACION` dice cuántos grados se mueve el servo hacia cada lado del centro. Con el tablero real, mucha inclinación hace que la canica salte las paredes.

1. Detengan la simulación y cambien el número de `const int INCLINACION = 15;` por el de cada fila.
2. **Play**, lleven el joystick a los dos extremos del eje X y anoten los ángulos.

:::tabla id="g4p-inclinacion"
| INCLINACION | Ángulo mínimo | Ángulo máximo |
| --- | --- | --- |
| 5 | | |
| 10 | | |
| 15 | | |
| 20 | | |
:::

Al terminar, dejen `INCLINACION = 15`. Con la canica de verdad, en la Guía 6, elegirán su valor.

Si un eje se mueve **al revés**, se cambia el orden de los dos últimos números de su `map`. Pruébenlo con la línea de `angX`, miren qué pasa y déjenla como estaba:

```cpp
// antes:  CENTRO - INCLINACION, CENTRO + INCLINACION
// al revés:
int angX = map(analogRead(A0), 0, 1023, CENTRO + INCLINACION, CENTRO - INCLINACION);
```

## Parte 4 · El movimiento suave (35 min)

Si el servo va **directo** a donde marca el joystick, el tablero da saltos y la canica sale disparada. La solución es **suavizar**: en cada vuelta del `loop` el servo solo avanza una parte del camino.

```cpp
angX += (metaX - angX) * SUAVE;
```

Si `SUAVE` es 0,2, en cada vuelta avanza el **20 %** de lo que le falta.

`angX += algo` significa "a `angX` súmale `algo`". Y `(metaX - angX)` es lo que le falta para llegar.

Cambien SUAVE en la animación y miren cómo llega el servo a su meta:

:::animacion tipo="suavizado"
:::

:::pregunta id="g4p-p2"
Si el servo está en 90° y la meta es 100°, con SUAVE = 0,2, ¿en qué ángulo queda después de una vuelta? ¿Y después de dos?
:::

1. Borren el código y escriban esta versión con suavizado:

```cpp
#include <Servo.h>
Servo servoX, servoY;

const int CENTRO = 90;
const int INCLINACION = 15;
const float SUAVE = 0.2;
float angX = 90, angY = 90;

void setup() {
  servoX.attach(9);
  servoY.attach(10);
  Serial.begin(9600);
}

void loop() {
  int metaX = map(analogRead(A0), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
  int metaY = map(analogRead(A1), 0, 1023, CENTRO - INCLINACION, CENTRO + INCLINACION);
  angX += (metaX - angX) * SUAVE;
  angY += (metaY - angY) * SUAVE;
  servoX.write(angX);
  servoY.write(angY);
  Serial.print(angX);
  Serial.print(",");
  Serial.println(angY);
  delay(20);
}
```

2. Para cada fila, cambien el número de `const float SUAVE = 0.2;`, presionen **Play** y lleven el joystick de un extremo al otro, rápido. Miren el brazo del servo y los números del Monitor.

:::tabla id="g4p-suave"
| SUAVE | ¿Cómo se mueve el brazo del servo? |
| --- | --- |
| 1.0 (sin suavizar) | |
| 0.5 | |
| 0.2 | |
| 0.05 | |
:::

3. Dejen `SUAVE = 0.2`.

## Parte 5 · Guardar el programa final (5 min)

Este código es el que van a subir al laberinto real en la Guía 6.

1. Presionen **Save**.
2. Copien todo el código de `sketch.ino` (**Ctrl + A**, **Ctrl + C**) a un bloc de notas y guárdenlo como `equipo_NOMBRE_control.txt`.
3. Súbanlo en el recuadro de la bitácora.

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] Los dos servos siguen al joystick.
- [ ] Probamos distintas inclinaciones.
- [ ] Sabemos invertir un eje.
- [ ] El movimiento es suave.
- [ ] Guardamos `equipo_NOMBRE_control.txt`.
:::

## Bitácora (10 min)

:::pregunta id="g4p-b1"
¿Para qué sirve simular los servos antes de armar el laberinto de verdad?
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_control.txt`: es el programa final del laberinto. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (7 sábados), nueva el 6 de noviembre:** solo los dos servos con el joystick, sin sensor de meta, pantalla ni buzzer (decisión de Bairon). Guías 1 a 3: joystick en Wokwi; tablero, marco y torres en Codeblocks. 4 simula todo el sistema por partes en **Wokwi**; 5 revisa las piezas impresas, diseña la base del joystick y prepara los servos; 6 arma y ajusta, y 7 es el torneo. Campos propios (g4p-…).
- Imprimir esta semana el tablero, el marco y las dos torres. Tener los componentes de la lista para el sábado 5.
- En Wokwi los servos van al 5V del Arduino porque en el simulador no pasa nada; en el laberinto real van a la fuente de 5 V con GND común (Guía 5).
- En Wokwi el joystick puede dar el eje Y invertido respecto a lo esperado: buena oportunidad para que lo descubran con la tabla.
- g4p-p1: 90°. Así el tablero queda plano en el centro y puede inclinarse lo mismo hacia los dos lados.
- g4p-inclinacion: 85 y 95; 80 y 100; 75 y 105; 70 y 110.
- g4p-p2: 90 + (100 − 90) × 0,2 = 92°; luego 92 + 8 × 0,2 = 93,6°.
- `angX` debe ser `float`; si es `int`, con SUAVE pequeño nunca llega (se trunca a 0 el avance).
- Tiempo total: 10 + 30 + 25 + 35 + 5 + 5 + 10 = 120 minutos.
:::

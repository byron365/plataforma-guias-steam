---
titulo: Simulamos las hojas del puente
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos las hojas del puente

## Objetivo del día

Agregar al simulador los dos servos de las hojas, entender por qué se mueven en espejo y programar la secuencia completa con el botón.

**Al terminar tendremos:** el puente simulado subiendo y bajando sus dos hojas al presionar el botón, con la velocidad elegida por el equipo.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_puente_sim` (sábado 4)
- Bitácora

## Parte 1 · Dos hojas en espejo (20 min)

Las dos hojas del puente giran en **sentidos contrarios**, porque los servos están mirándose (uno en cada orilla). Por eso a uno le damos el ángulo `a` y al otro `180 - a`.

Muevan la animación y fíjense en el ángulo que recibe cada servo:

:::animacion tipo="espejo-servos"
:::

:::pregunta id="g5p-p1"
Si la hoja izquierda está en 30°, ¿qué ángulo recibe el servo derecho?
:::

## Parte 2 · Agregar los servos (25 min)

Abran `equipo_NOMBRE_puente_sim` en Tinkercad (**Diseños → Circuitos**) y, con la simulación detenida:

1. Arrastra dos **Microservomotor** al área de trabajo, uno a cada lado del circuito. El de la izquierda es la hoja izquierda (orilla B) y el de la derecha, la hoja derecha (orilla A).
2. Pasa el mouse sobre los tres pines de cada servo para ver su nombre: uno es la **señal**, otro la **potencia** (+) y otro la **tierra** (−).
3. Conecta con cables:

| Servo | Señal | Potencia | Tierra |
| --- | --- | --- | --- |
| Izquierdo (orilla B) | D9 | fila + (5V) | fila − (GND) |
| Derecho (orilla A) | D10 | fila + (5V) | fila − (GND) |

[IMAGEN 5.1P: circuito del puente en Tinkercad Circuits con los dos microservomotores agregados]

Comparen otra vez con la animación, ahora con los servos:

:::animacion tipo="conexiones" circuito="puente-boton"
:::

## Parte 3 · El puente sube con un botón (45 min)

Abran **Código**, borren todo (**Ctrl + A** y **Supr**) y escriban el programa completo. Es el del sábado 4 con los servos y dos funciones nuevas: `ponerAngulo()` mueve las dos hojas en espejo y `moverPuente()` las mueve despacio, grado por grado.

```cpp
#include <Servo.h>
Servo izq, der;

const int VERDE = 2, AMARILLO = 3, ROJO = 4, BUZZER = 5, BOTON = 6;
const int ANGULO_ARRIBA = 75;   // grados
const int TIEMPO_ARRIBA = 4000; // ms
const int VELOCIDAD = 25;       // ms por grado

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(ROJO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOTON, INPUT_PULLUP);
  izq.attach(9);
  der.attach(10);
  ponerAngulo(0);
  digitalWrite(VERDE, HIGH);
}

// Mueve las dos hojas en espejo
void ponerAngulo(int a) {
  izq.write(a);
  der.write(180 - a);
}

// Mueve el puente despacio de un ángulo a otro
void moverPuente(int desde, int hasta) {
  int paso = (hasta > desde) ? 1 : -1;
  for (int a = desde; a != hasta; a += paso) {
    ponerAngulo(a);
    delay(VELOCIDAD);
  }
  ponerAngulo(hasta);
}

void loop() {
  if (digitalRead(BOTON) == LOW) {   // botón presionado
    digitalWrite(VERDE, LOW);
    digitalWrite(AMARILLO, HIGH);
    tone(BUZZER, 1000, 1500);        // alarma
    delay(2000);
    digitalWrite(AMARILLO, LOW);
    digitalWrite(ROJO, HIGH);
    moverPuente(0, ANGULO_ARRIBA);
    delay(TIEMPO_ARRIBA);
    moverPuente(ANGULO_ARRIBA, 0);
    digitalWrite(ROJO, LOW);
    digitalWrite(VERDE, HIGH);
  }
}
```

1. **Iniciar simulación**. Al empezar, los brazos de los servos se acomodan: el izquierdo en 0° y el derecho en 180°.
2. Haz clic en el pulsador y observa la secuencia completa. Fíjense en los brazos: deben girar en sentidos contrarios, como las hojas del puente.

:::tabla id="g5p-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Al presionar, se enciende el amarillo y suena la alarma | | |
| Después se enciende el rojo | | |
| Los dos servos giran a la vez, en sentidos contrarios | | |
| Esperan arriba y regresan | | |
| Vuelve el verde | | |
:::

:::pregunta id="g5p-p2"
Si un servo gira hacia un lado y el otro hacia el mismo lado (no en espejo), ¿qué línea del código hay que revisar?
:::

## Parte 4 · ¿Qué tan rápido sube? (15 min)

`VELOCIDAD` dice cuántos milisegundos espera el puente en cada grado. Prueben tres valores: cámbienlo, inicien la simulación, presionen el pulsador y cronometren con el celular cuánto tarda en subir.

:::tabla id="g5p-velocidad"
| VELOCIDAD (ms por grado) | Tiempo de subida (s) | ¿Cómo se ve? (muy rápido / bien / muy lento) |
| --- | --- | --- |
| 10 | | |
| 25 | | |
| 40 | | |
:::

:::pregunta id="g5p-p3"
Con `ANGULO_ARRIBA = 75` y `VELOCIDAD = 25`, ¿cuántos milisegundos tarda en subir? Hagan la cuenta y compárenla con el cronómetro.
:::

Dejen en el código la velocidad que más les gustó.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] Los dos servos están conectados en el simulador.
- [ ] El pulsador inicia la secuencia completa.
- [ ] Los servos se mueven en espejo.
- [ ] Elegimos la velocidad del puente.
:::

## Reto extra

Haz que el puente suba despacio pero baje **más despacio todavía** (como los puentes reales, que bajan con cuidado).

Pista: `moverPuente()` usa el mismo `delay(VELOCIDAD)` para subir y para bajar. Creen otra constante, `VELOCIDAD_BAJADA`, y hagan que `moverPuente()` reciba un tercer dato: cuánto esperar en cada grado.

## Bitácora (10 min)

:::foto id="g5p-foto"
Captura de pantalla del circuito con los dos servos.
:::

:::pregunta id="g5-b1"
¿Qué hace la función `ponerAngulo()` y por qué usa `180 - a`?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica:** los servos se prueban primero en el simulador; en la Guía 7 se centran y se montan en las orillas impresas. Campos propios (g5p-…).
- g5p-p1: 180 − 30 = 150°.
- g5p-p2: `der.write(180 - a);` dentro de `ponerAngulo()` (si dice `der.write(a)`, los dos giran igual).
- g5p-p3: 75 × 25 = 1875 ms ≈ 1,9 s (el cronómetro da un poco más por la reacción).
- Reto: el `for` es el mismo para subir y bajar; la forma sencilla es agregar un parámetro de velocidad a `moverPuente()`. Equipos rápidos.
- Tiempo total: 20 + 25 + 45 + 15 + 5 + 10 = 120 minutos.
:::

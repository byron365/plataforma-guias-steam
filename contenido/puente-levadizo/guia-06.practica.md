---
titulo: Simulamos el sensor
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos el sensor

## Objetivo del día

Agregar al simulador el sensor ultrasónico para que el puente se abra solo al detectar un barco, y elegir los ajustes del equipo.

**Al terminar tendremos:** el puente completo funcionando en el simulador, con sus ajustes anotados y el código final listo para el Arduino de verdad.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_puente_sim` (sábado 5)
- Bitácora

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

## Parte 2 · Agregar el sensor (20 min)

Con la simulación detenida:

1. En **Buscar** (panel de componentes) escribe `ultrasónico`.
   - Aparecen dos sensores. Usen el que dice **HC-SR04** y tiene **4 pines** (Vcc, Trig, Echo y GND), que está en **Otros componentes**. El otro (PING, de 3 pines) **no** es el nuestro.
2. Arrástralo a un lugar libre, fuera de la protoboard, para que sus pines no queden metidos en una fila.
3. Conecta con cables:

| Pin del HC-SR04 | Arduino |
| --- | --- |
| Vcc | fila + (5V) |
| Trig | D7 |
| Echo | D8 |
| GND | fila − (GND) |

[IMAGEN 6.1P: circuito completo del puente en Tinkercad Circuits con el sensor HC-SR04, el objeto de prueba y la distancia en pantalla]

## Parte 3 · Probar el sensor (20 min)

Antes de juntar todo, probamos solo el sensor con un programa corto.

1. En un bloc de notas, guarden una copia del código del sábado 5 (lo van a volver a usar).
2. En **Código**, borren todo y escriban:

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

3. **Iniciar simulación** y abran el **Monitor en serie** (abajo del código).
4. Hagan clic sobre el sensor: aparece un **objeto** frente a él y la distancia en pantalla. Arrastren el objeto hasta cada distancia de la tabla y anoten lo que muestra el Monitor.

:::tabla id="g6p-sensor"
| Distancia del objeto en Tinkercad (cm) | Lo que muestra el Monitor (cm) | Diferencia |
| --- | --- | --- |
| 5 | | |
| 10 | | |
| 20 | | |
| 30 | | |
:::

Si el Monitor muestra siempre **0**, revisen los cables de Trig y Echo (el 0 quiere decir que no llegó el eco).

## Parte 4 · El puente automático (35 min)

Ahora juntamos todo en el **código base del puente**. Es el del sábado 5 con dos cambios: tiene la función `medirDistancia()` y el `loop` ya no espera el botón, sino un barco cerca (`d < DISTANCIA_BARCO`).

1. Borren todo y escriban el programa completo:

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

2. Si eligieron otra velocidad el sábado 5, cámbienla en **Ajustes del equipo**.
3. **Iniciar simulación**, hagan clic en el sensor y acerquen el objeto a menos de 10 cm: debe empezar la secuencia. Aléjenlo antes de que termine para que no vuelva a empezar.

:::pregunta id="g6-p2"
¿Para qué sirve `d > 0` en el `if`? (Pista: ¿qué devuelve el sensor si no recibe eco?)
:::

## Parte 5 · Ajustes del equipo (15 min)

Prueben en el simulador y elijan los valores que van a usar en el puente real:

1. Prueben un ajuste a la vez, dejando los demás como están.
2. Para probar un valor: detengan la simulación, cámbienlo en **Ajustes del equipo**, inicien otra vez y acerquen el objeto.

:::tabla id="g6p-ajustes"
| Ajuste | Valor 1 | Valor 2 | Valor 3 | Elegimos | ¿Por qué? |
| --- | --- | --- | --- | --- | --- |
| DISTANCIA_BARCO (cm) | 5 | 10 | 20 | | |
| ANGULO_ARRIBA (°) | 60 | 75 | 90 | | |
| TIEMPO_ARRIBA (ms) | 2000 | 4000 | 6000 | | |
:::

Dejen en el código los valores elegidos. En el puente real los volveremos a revisar (Guía 8).

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El sensor HC-SR04 está conectado en el simulador.
- [ ] El Monitor muestra distancias parecidas a las de Tinkercad.
- [ ] El puente simulado se abre solo al acercar el objeto.
- [ ] Elegimos los ajustes del equipo.
:::

## Reto extra

Deja también el **botón** como modo manual: el puente se abre si hay barco **o** si se presiona el botón (`||`).

Pistas: necesitan la constante del botón (pin 6) y su `pinMode(…, INPUT_PULLUP)` en el `setup()`. En el `if` del `loop`, agreguen con `||` la pregunta de si el botón está presionado.

## Bitácora (10 min)

:::pregunta id="g6p-b1"
¿Qué fue lo más difícil de simular? ¿Qué creen que será distinto en el puente real?
:::

**Muy importante:** este es el programa que van a subir al Arduino de verdad. Cópienlo completo (**Ctrl + A** y **Ctrl + C** en el panel Código), péguenlo en un bloc de notas, guárdenlo como `equipo_NOMBRE_automatico.txt` y súbanlo aquí.

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_automatico.txt` con el código final del simulador. El sábado 7 lo pegan en Arduino IDE. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí.
:::

:::docente
- **Versión Tinkercad práctica:** el sensor se prueba en el simulador; en el puente real va en su soporte impreso (Guía 7). Campos propios (g6p-…), salvo g6-p1 y g6-p2, que son iguales a la Guía 6.
- En Tinkercad hay dos sensores ultrasónicos: el **PING** de 3 pines (aparece en Básico) y el **HC-SR04** de 4 pines (en Otros componentes al buscar). Usar el HC-SR04, que es el que se compra. Si el sensor queda encima de la protoboard, sus pines pueden caer en una fila y quedar unidos.
- El simulador mide casi exacto; en el puente real habrá diferencias de 1 o 2 cm.
- g6-p1: el sonido va hasta el objeto y regresa; recorre dos veces la distancia.
- g6-p2: si no hay eco, `pulseIn` devuelve 0 y el puente se abriría sin barco.
- VELOCIDAD se eligió en la Guía 5 (g5p-velocidad).
- Tiempo total: 15 + 20 + 20 + 35 + 15 + 5 + 10 = 120 minutos.
:::

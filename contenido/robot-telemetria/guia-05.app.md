---
titulo: Simulamos las órdenes y la telemetría
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos las órdenes y la telemetría

## Objetivo del día

Escribir el **programa final** del robot: obedecer las órdenes `M,izq,der`, detenerse si pierde la señal y responder con la telemetría `T,bat,dist`. En el simulador no hay celular ni Bluetooth, así que el **Monitor en serie** hace de app.

**Al terminar tendremos:** el robot simulado obedeciendo las órdenes que escribimos, y el programa final guardado para el robot real.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_robot_sim` (sábado 4)
- Bitácora

## Parte 1 · ¿Cómo se hablan la app y el robot? (15 min)

La app y el robot se hablan con mensajes de texto que terminan con salto de línea:

| Mensaje | Dirección | Significado | Ejemplo |
| --- | --- | --- | --- |
| `M,izq,der` | App → Robot | Velocidad de cada motor (−255 a 255) | `M,150,-80` |
| `T,bat,dist` | Robot → App | Batería (V) y distancia (cm) | `T,7.4,32` |

Elijan un botón y una velocidad en la animación y miren cómo viajan los mensajes:

:::animacion tipo="protocolo" sistema="robot-app"
:::

La app tendrá cuatro botones y un deslizador de velocidad. Si la velocidad es 180, ¿qué orden debe enviar cada botón? Un número negativo hace girar el motor hacia atrás. Para girar, un motor va adelante y el otro atrás.

:::tabla id="g5a-ordenes"
| Botón presionado | Motor izquierdo | Motor derecho | Mensaje |
| --- | --- | --- | --- |
| Adelante | | | |
| Atrás | | | |
| Derecha | | | |
| Izquierda | | | |
| Ninguno | | | |
:::

:::pregunta id="g5a-p1"
En el mensaje `M,150,-80`, ¿qué motor va hacia atrás? ¿Cómo lo saben?
:::

## Parte 2 · El programa final del robot (45 min)

Abran `equipo_NOMBRE_robot_sim` en Tinkercad (**Diseños → Circuitos**). Toquen **Código**, borren todo y escriban este programa. Junta lo que ya probaron en la Guía 4 (los motores, el sensor y la batería) y agrega tres cosas: leer la orden `M,izq,der`, mover los motores con ella y detenerse si no llegan órdenes.

```cpp
// Robot con app y telemetría - Intermedio II
// Docente: Bairon Alas - STEAM Robotics Academy
// Programa del ROBOT

// En el simulador, "bt" es el Monitor en serie
#define bt Serial

// --- Puente H L298N ---
const int PWMA = 5, AIN1 = 7, AIN2 = 8;  // izq. (ENA, IN1, IN2)
const int PWMB = 6, BIN1 = 4, BIN2 = 9;  // der. (ENB, IN3, IN4)

// --- Sensores ---
const int TRIG = 2, ECHO = 3;
const int BATERIA = A0;  // divisor 10k / 10k

// --- Ajustes del equipo ---
const unsigned long TIMEOUT = 5000;  // ms
const float FACTOR_BAT = 2.0;        // divisor 1:2

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
    if (c == '\n' || c == ';') {
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

- `#define bt Serial` hace que `bt` sea el Monitor en serie. En el robot real, en la Guía 10, solo cambiaremos esa línea para que `bt` sea el Bluetooth.
- `indexOf(',')` busca dónde está cada coma; `substring` corta el texto entre las comas y `toInt()` lo convierte en número.
- El mensaje termina con salto de línea (`\n`), que es lo que enviará la app, o con `;`, que usaremos aquí para escribirlo a mano.

## Parte 3 · Hacer de app (30 min)

1. **Iniciar simulación** y abran el **Monitor en serie**. Cada 300 ms aparece la telemetría: `T,` con la batería y la distancia.
2. Escriban cada orden en la caja de abajo del Monitor, terminada en `;` y envíenla. Por ejemplo: `M,180,180;`
3. Hagan clic en el sensor, muevan el objeto y miren el último número de la telemetría.

:::tabla id="g5a-pruebas"
| Prueba | ¿Funciona? | Lo que se ve |
| --- | --- | --- |
| `M,180,180;` Los dos motores giran hacia adelante | | |
| `M,-180,-180;` Los dos giran hacia atrás | | |
| `M,180,-180;` Un motor adelante y el otro atrás | | |
| `M,0,0;` Los motores se detienen | | |
| `HOLA;` Nada cambia (mensaje inválido) | | |
| La distancia del mensaje `T` cambia al mover el objeto | | |
:::

:::pregunta id="g5a-p2"
Con `M,180,-180;`, ¿hacia qué lado gira el robot? ¿Qué orden lo haría girar hacia el otro lado?
:::

## Parte 4 · Seguridad sin señal (15 min)

Si el robot real pierde la señal de la app (se cierra, se apaga el celular o se aleja demasiado), debe detenerse solo.

1. Observen: con `TIMEOUT = 5000`, envíen `M,180,180;` y cuenten cuántos segundos pasan hasta que los motores se detienen solos.
2. Detengan la simulación y cambien la línea por `const unsigned long TIMEOUT = 500;  // ms`.
3. Inicien otra vez y envíen `M,180,180;`: ahora los motores casi no alcanzan a moverse. La app enviará una orden 10 veces por segundo, así que en el robot real sí seguirán girando mientras se presione un botón.

:::pregunta id="g5a-p3"
Explica qué hace el bloque "Seguridad: sin señal, detener". ¿Qué podría pasar si no estuviera?
:::

Dejen `TIMEOUT = 500`.

## ¿Lo logramos? (5 min)

:::checklist id="g5a-logramos"
- [ ] El robot simulado obedece las órdenes `M`.
- [ ] El Monitor en serie muestra la telemetría `T`.
- [ ] Sin órdenes nuevas, los motores se detienen solos.
- [ ] Guardamos el programa final con `TIMEOUT = 500`.
:::

## Reto extra

Haz que el robot **no avance** si hay un obstáculo a menos de 15 cm (pero que sí pueda retroceder y girar).

Pista: en `procesar()`, antes de mover los motores, si `izq` y `der` son positivos y `distancia()` es menor que 15, pongan los dos en 0.

## Bitácora (10 min)

:::pregunta id="g5a-b1"
¿Qué creen que será distinto cuando armen el robot real?
:::

**Muy importante:** este es el programa que van a subir al Arduino real en la Guía 10. Cópienlo completo (**Ctrl + A** y **Ctrl + C** en el panel Código), péguenlo en un bloc de notas, guárdenlo como `equipo_NOMBRE_robot.txt` y súbanlo aquí.

:::archivo id="g5-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_robot.txt`. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla.
:::

:::docente
- **Versión Práctica con app (9 sábados):** el programa del robot es el de la Guía 6 Práctica. En lugar del segundo Arduino, el Monitor en serie hace de app (`#define bt Serial`). Se agrega `;` como fin de mensaje para escribir a mano sin depender de si el Monitor de Tinkercad envía salto de línea. Campos propios (g5a-…).
- `TIMEOUT` empieza en 5000 solo para poder escribir órdenes a mano; el programa final queda con 500.
- g5a-ordenes: adelante M,180,180; atrás M,-180,-180; derecha M,180,-180; izquierda M,-180,180; ninguno M,0,0.
- g5a-p1: el derecho, porque su número es negativo.
- g5a-p2: gira a la derecha sobre su eje; `M,-180,180` gira a la izquierda.
- g5a-p3: si el robot deja de recibir órdenes por 500 ms, detiene los motores. Sin ese bloque seguiría con la última orden y podría chocar.
- Tiempo total: 15 + 45 + 30 + 15 + 5 + 10 = 120 minutos.
:::

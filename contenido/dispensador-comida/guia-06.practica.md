---
titulo: Simulamos el horario automático
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos el horario automático

## Objetivo del día

Hacer que el dispensador sirva **solo**, cada cierto tiempo, y que cuente cuántas comidas ha servido. Con esto tendremos el programa final.

**Al terminar tendremos:** el programa final del dispensador probado en el simulador: sirve con el botón y también solo, a su hora, y lleva la cuenta de las comidas.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_dispensador_sim` (sábado 5)
- Bitácora y cronómetro

## Parte 1 · ¿Cómo sabe el Arduino la hora? (15 min)

El Arduino no tiene reloj, pero sí un **cronómetro** que empieza en 0 cuando se enciende: `millis()` dice cuántos milisegundos han pasado desde entonces.

Para servir cada minuto, el Arduino anota a qué hora fue la última comida y pregunta, una y otra vez: **¿ya pasó un minuto desde la última comida?**

> Si `millis() - ultimaComida` es mayor o igual que `INTERVALO`, toca servir.

`60000` son milisegundos: 60 000 ms = 60 segundos = 1 minuto. En clase usamos un minuto para verlo funcionar; en una casa serían varias horas.

:::pregunta id="g6p-p1"
Si la última comida fue cuando `millis()` valía 125 000, ¿en qué valor de `millis()` toca la siguiente comida, con `INTERVALO = 60000`?
:::

## Parte 2 · El programa final (40 min)

Este programa junta todo: la porción según la mascota, el botón manual, el horario automático y el contador de comidas.

Abran el diseño, toquen **Código**, borren todo y escriban:

```cpp
// Dispensador de comida para mascotas
// STEAM Robotics Academy · Básico · Docente: Bairon Alas

#include <Servo.h>
Servo compuerta;

// --- Pines ---
const int BOTON = 2;
const int LED = 4;
const int BUZZER = 5;

// --- Ajustes del equipo ---
const int MASCOTA = 1;               // 1 = gato, 2 = perro pequeño, 3 = perro grande
const int TIEMPO_GATO = 1000;        // ms abierta para la porción del gato
const int CERRADA = 0;
const int ABIERTA = 70;
const unsigned long INTERVALO = 60000;  // ms entre comidas automáticas

unsigned long ultimaComida = 0;
int comidasHoy = 0;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  compuerta.attach(9);
  compuerta.write(CERRADA);
  Serial.begin(9600);
}

// Cuántas porciones del gato le tocan a la mascota
int porciones() {
  if (MASCOTA == 1) return 1;        // gato
  if (MASCOTA == 2) return 2;        // perro pequeño
  return 4;                          // perro grande
}

// Sirve la porción de la mascota y cuenta la comida
void servir() {
  int veces = porciones();
  tone(BUZZER, 1500, 300);           // llamar a la mascota
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_GATO * veces);        // proporción
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
  comidasHoy++;
  Serial.print("Comida ");
  Serial.print(comidasHoy);
  Serial.print(": ");
  Serial.print(veces);
  Serial.println(" porciones del gato");
}

void loop() {
  // 1. Horario automático
  if (millis() - ultimaComida >= INTERVALO) {
    servir();
    ultimaComida = millis();
  }

  // 2. Botón manual
  if (digitalRead(BOTON) == LOW) {
    servir();
    delay(500);                      // evitar doble toque
  }
}
```

- `unsigned long` es un número entero muy grande y sin signo: hace falta porque `millis()` llega a números enormes.
- `comidasHoy++` suma 1 al contador cada vez que sirve.

## Parte 3 · Probar en el simulador (30 min)

1. Toquen **Iniciar simulación** y abran el **Monitor en serie**.
2. No toquen nada y cronometren: la primera comida automática llega al minuto. Luego, una cada minuto.
3. Entre una comida automática y otra, presionen el pulsador. Marquen la tabla.

:::tabla id="g6p-pruebas"
| Prueba | ¿Pasó? | Mensaje del Monitor |
| --- | --- | --- |
| Al minuto sirve sola | | |
| Al segundo minuto sirve otra vez | | |
| Con el pulsador sirve entre comidas | | |
| El contador sube con cada comida | | |
:::

:::pregunta id="g6p-p2"
Cuando presionan el pulsador, ¿cambia la hora de la siguiente comida automática? ¿Por qué? (Pista: ¿en qué parte del código cambia `ultimaComida`?)
:::

## Parte 4 · Ajustes y guardar el programa (15 min)

1. Elijan la mascota de su dispensador y escríbanla en `MASCOTA`.
2. Para probar más rápido, pueden poner `INTERVALO = 20000` (20 segundos); para la demostración, vuelvan a `60000`.

:::tabla id="g6p-ajustes"
| Ajuste | Valor elegido | ¿Por qué? |
| --- | --- | --- |
| MASCOTA | | |
| TIEMPO_GATO (ms) | | |
| INTERVALO (ms) | | |
:::

**Muy importante:** este es el programa que van a subir al Arduino de verdad. Cópienlo completo (**Ctrl + A** y **Ctrl + C** en el panel Código), péguenlo en un bloc de notas y guárdenlo como `equipo_NOMBRE_final.txt`.

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El dispensador simulado sirve solo cada minuto.
- [ ] El pulsador sigue sirviendo a mano.
- [ ] El Monitor muestra el contador de comidas.
- [ ] Guardamos `equipo_NOMBRE_final.txt`.
:::

## Reto extra

Haz que el dispensador **deje de servir solo** cuando ya sirvió 5 comidas (como un límite diario), pero que el botón siga funcionando.

Pista: en el `if` del horario automático, agreguen con `&&` la pregunta de si `comidasHoy` es menor que 5.

## Bitácora (15 min)

:::pregunta id="g6p-b1"
¿Qué fue lo más difícil de simular? ¿Qué creen que será distinto en el dispensador real?
:::

Suban aquí `equipo_NOMBRE_final.txt`: el sábado 7 lo pegan en Arduino IDE.

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_final.txt` con el código final del simulador. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí.
:::

:::docente
- **Versión Tinkercad práctica:** el horario y el contador son los del programa final de la Guía 8 normal, con la porción por `MASCOTA` en vez de la perilla. Campos propios (g6p-…).
- g6p-p1: 125 000 + 60 000 = 185 000.
- g6p-p2: no; el botón no cambia `ultimaComida`, así que la comida automática sigue a su hora. Si se quisiera, se podría poner `ultimaComida = millis();` también después del botón.
- La primera comida automática llega al minuto de encender (porque `ultimaComida` empieza en 0).
- El simulador de Tinkercad puede ir un poco más lento que el tiempo real en computadoras lentas.
- Tiempo total: 15 + 40 + 30 + 15 + 5 + 15 = 120 minutos.
:::

---
titulo: Simulamos las porciones
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos las porciones

## Objetivo del día

Hacer que el dispensador sirva una porción distinta según la mascota (gato, perro pequeño o perro grande), elegida con una variable del código, y ver en el Monitor serie qué porción sirvió.

**Al terminar tendremos:** el dispensador simulado sirviendo la porción de la mascota que elegimos en el código.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_dispensador_sim` (sábado 4)
- Bitácora y cronómetro (el del celular)

## Parte 1 · Porciones con proporción (15 min)

No todas las mascotas comen lo mismo. Si el gato come **una** porción, un perro pequeño come el doble y un perro grande cuatro veces más. Como la comida cae mientras la compuerta está abierta, **el doble de comida es el doble de tiempo abierta**.

:::tabla id="g5p-proporcion"
| Mascota | Número en el código | ¿Cuántas porciones del gato? | Tiempo abierta si la del gato es 1000 ms |
| --- | --- | --- | --- |
| Gato | 1 | 1 | |
| Perro pequeño | 2 | 2 | |
| Perro grande | 3 | 4 | |
:::

:::pregunta id="g5p-p1"
Si la porción del gato fuera de 1500 ms, ¿cuánto tiempo estaría abierta la compuerta para un perro grande?
:::

## Parte 2 · Elegir la mascota en el código (40 min)

Vamos a guardar la mascota en una constante, `MASCOTA`, y a escribir una función que **responde un número**: cuántas porciones del gato hay que servir.

Abran `equipo_NOMBRE_dispensador_sim` en Tinkercad (**Diseños → Circuitos**), toquen **Código**, borren todo y escriban:

```cpp
#include <Servo.h>
Servo compuerta;

// --- Pines ---
const int BOTON = 2;
const int LED = 4;
const int BUZZER = 5;

// --- Ajustes del equipo ---
const int MASCOTA = 1;             // 1 = gato, 2 = perro pequeño, 3 = perro grande
const int TIEMPO_GATO = 1000;      // ms abierta para la porción del gato
const int CERRADA = 0;
const int ABIERTA = 70;

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
  if (MASCOTA == 1) return 1;      // gato
  if (MASCOTA == 2) return 2;      // perro pequeño
  return 4;                        // perro grande
}

// Sirve la porción de la mascota
void servir() {
  int veces = porciones();
  tone(BUZZER, 1500, 300);         // llamar a la mascota
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_GATO * veces);      // proporción
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
  Serial.print("Servidas ");
  Serial.print(veces);
  Serial.println(" porciones del gato");
}

void loop() {
  if (digitalRead(BOTON) == LOW) {
    servir();
    delay(500);                    // evitar doble toque
  }
}
```

- `return` hace que la función **responda** un número. Por eso `int veces = porciones();` guarda la respuesta en `veces`.
- `TIEMPO_GATO * veces` multiplica: con un perro grande, 1000 × 4 = 4000 ms.

## Parte 3 · Probar las tres mascotas (35 min)

1. Toquen **Iniciar simulación** y abran el **Monitor en serie** (abajo del código).
2. Presionen el pulsador y cronometren cuánto tiempo queda abierto el servo.
3. Detengan la simulación, cambien `MASCOTA` a 2, inicien otra vez y repitan. Luego con 3.

:::tabla id="g5p-pruebas"
| MASCOTA | Mensaje del Monitor | Tiempo esperado (ms) | Tiempo cronometrado (s) |
| --- | --- | --- | --- |
| 1 | | 1000 | |
| 2 | | 2000 | |
| 3 | | 4000 | |
:::

:::pregunta id="g5p-p2"
¿Por qué el tiempo que cronometraron no es exactamente el del código?
:::

## Parte 4 · Cambiar la porción del gato (10 min)

`TIEMPO_GATO` es la porción base: si cambia, cambian las tres mascotas a la vez.

1. Cambien `TIEMPO_GATO` a 1500, dejen `MASCOTA = 3` y presionen el pulsador.
2. Revisen que la compuerta queda abierta unos 6 segundos (1500 × 4).

El sábado 8, con el dispensador real y croquetas, ajustarán `TIEMPO_GATO` a ojo para que la porción del gato se vea bien en el plato.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] El código usa `MASCOTA` y la función `porciones()`.
- [ ] El Monitor en serie muestra las porciones servidas.
- [ ] Probamos las tres mascotas.
:::

## Reto extra

Agrega una cuarta mascota: un **conejo** (número 4) que come **la mitad** de la porción del gato.

Pista: la función responde números enteros, así que no puede responder 0,5. Piensen en cambiar `TIEMPO_GATO * veces` o en agregar un `if` dentro de `servir()` para el conejo.

## Bitácora (15 min)

:::pregunta id="g5p-b1"
¿Por qué es útil tener la mascota en una constante al principio del código, en lugar de cambiar los números dentro de `servir()`?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica:** la porción se elige con la constante `MASCOTA` (decisión de Bairon: sin perilla ni báscula). Las proporciones 1 : 2 : 4 son las de la Guía 8 normal (30, 60 y 120 g). Campos propios (g5p-…).
- g5p-proporcion: 1000, 2000 y 4000 ms. g5p-p1: 1500 × 4 = 6000 ms.
- g5p-p2: la reacción al cronometrar, y el servo tarda un poco en girar; además el simulador no siempre corre exacto al tiempo real.
- Reto: por ejemplo, `if (MASCOTA == 4) delay(TIEMPO_GATO / 2); else delay(TIEMPO_GATO * veces);`.
- Tiempo total: 15 + 40 + 35 + 10 + 5 + 15 = 120 minutos.
:::

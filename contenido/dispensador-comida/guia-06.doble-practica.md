---
titulo: Simulamos las porciones y el horario
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos las porciones y el horario

## Objetivo del día

Hacer que el dispensador doble sirva la porción de cereal y de líquido según la mascota, que sirva solo cada cierto tiempo y que cuente las porciones. Con esto tendremos el programa final.

**Al terminar tendremos:** el programa final del dispensador doble probado en el simulador.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_doble_sim` (sábado 5)
- Bitácora y cronómetro (el del celular)

## Parte 1 · Porciones y horario (20 min)

**Porciones:** no todas las mascotas comen lo mismo. Si el gato come **una** porción, un perro pequeño come el doble y un perro grande cuatro veces más. Como el cereal cae mientras la compuerta está abierta y el líquido sale mientras la bomba está encendida, **el doble de porción es el doble de tiempo**.

:::tabla id="g6dp-proporcion"
| Mascota | Número en el código | Porciones del gato | Compuerta abierta (si la del gato es 1000 ms) | Bomba encendida (si la del gato es 2000 ms) |
| --- | --- | --- | --- | --- |
| Gato | 1 | 1 | | |
| Perro pequeño | 2 | 2 | | |
| Perro grande | 3 | 4 | | |
:::

**Horario:** el Arduino no tiene reloj, pero sí un **cronómetro** que empieza en 0 al encenderse: `millis()` dice cuántos milisegundos han pasado. Para servir cada minuto, el Arduino anota a qué hora fue la última comida y pregunta, una y otra vez: **¿ya pasó un minuto?**

`60000` son milisegundos: 60 000 ms = 1 minuto. En clase usamos un minuto para verlo funcionar; en una casa serían varias horas.

:::pregunta id="g6dp-p1"
Si la última comida fue cuando `millis()` valía 125 000, ¿en qué valor de `millis()` toca la siguiente, con `INTERVALO = 60000`?
:::

## Parte 2 · El programa final (40 min)

Abran el diseño, toquen **Código**, borren todo y escriban:

```cpp
// Dispensador doble: cereal y líquido
// STEAM Robotics Academy · Básico · Docente: Bairon Alas

#include <Servo.h>
Servo compuerta;

// --- Pines ---
const int BOTON_CEREAL = 2;
const int BOTON_LIQUIDO = 3;
const int LED = 4;
const int BUZZER = 5;
const int BOMBA = 8;                 // relé de la bomba

// --- Ajustes del equipo ---
const int MASCOTA = 1;               // 1 = gato, 2 = perro pequeño, 3 = perro grande
const int TIEMPO_GATO = 1000;        // ms de compuerta abierta para el cereal del gato
const int BOMBA_GATO = 2000;         // ms de bomba para el líquido del gato
const int CERRADA = 0;
const int ABIERTA = 70;
const unsigned long INTERVALO = 60000;  // ms entre comidas automáticas

unsigned long ultimaComida = 0;
int servidas = 0;

void setup() {
  pinMode(BOTON_CEREAL, INPUT_PULLUP);
  pinMode(BOTON_LIQUIDO, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);          // bomba apagada
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

// Escribe en el Monitor qué se sirvió
void anotar(String que) {
  servidas++;
  Serial.print("Porción ");
  Serial.print(servidas);
  Serial.print(": ");
  Serial.println(que);
}

// Sirve la porción de cereal de la mascota
void servirCereal() {
  tone(BUZZER, 1500, 300);           // aviso
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_GATO * porciones());  // proporción
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
  anotar("cereal");
}

// Sirve la porción de líquido de la mascota
void servirLiquido() {
  tone(BUZZER, 1000, 300);           // aviso más grave
  digitalWrite(LED, HIGH);
  digitalWrite(BOMBA, HIGH);         // encender bomba
  delay(BOMBA_GATO * porciones());   // proporción
  digitalWrite(BOMBA, LOW);          // apagar bomba
  digitalWrite(LED, LOW);
  anotar("líquido");
}

void loop() {
  // 1. Horario automático: cereal y después líquido
  if (millis() - ultimaComida >= INTERVALO) {
    servirCereal();
    delay(500);
    servirLiquido();
    ultimaComida = millis();
  }

  // 2. Botones manuales
  if (digitalRead(BOTON_CEREAL) == LOW) {
    servirCereal();
    delay(500);                      // evitar doble toque
  }
  if (digitalRead(BOTON_LIQUIDO) == LOW) {
    servirLiquido();
    delay(500);
  }
}
```

- `return` hace que `porciones()` **responda** un número; `TIEMPO_GATO * porciones()` multiplica por esa respuesta.
- `anotar()` recibe un texto (`String`) y lo escribe en el Monitor con el número de porción.
- `unsigned long` es un número entero muy grande: hace falta porque `millis()` llega a números enormes.

## Parte 3 · Probar en el simulador (30 min)

1. **Iniciar simulación** y abran el **Monitor en serie**.
2. Presionen cada botón: revisen el mensaje y cronometren cuánto dura la compuerta abierta y el motor girando.
3. No toquen nada durante un minuto: debe servir solo, cereal y después líquido.
4. Cambien `MASCOTA` a 3 y repitan con el botón del cereal: la compuerta debe durar cuatro veces más.

:::tabla id="g6dp-pruebas"
| Prueba | ¿Pasó? | Mensaje del Monitor |
| --- | --- | --- |
| Botón del cereal con MASCOTA = 1 | | |
| Botón del líquido con MASCOTA = 1 | | |
| Al minuto sirve solo cereal y líquido | | |
| Botón del cereal con MASCOTA = 3 (dura 4 veces más) | | |
:::

:::pregunta id="g6dp-p2"
En la comida automática, ¿por qué hay un `delay(500)` entre `servirCereal()` y `servirLiquido()`?
:::

## Parte 4 · Ajustes y guardar el programa (15 min)

1. Elijan la mascota de su dispensador y escríbanla en `MASCOTA`.
2. Para probar más rápido, pueden poner `INTERVALO = 20000` (20 segundos); para la demostración, vuelvan a `60000`.

:::tabla id="g6dp-ajustes"
| Ajuste | Valor elegido | ¿Por qué? |
| --- | --- | --- |
| MASCOTA | | |
| TIEMPO_GATO (ms) | | |
| BOMBA_GATO (ms) | | |
| INTERVALO (ms) | | |
:::

**Muy importante:** este es el programa que van a subir al Arduino de verdad. Cópienlo completo (**Ctrl + A** y **Ctrl + C** en el panel Código), péguenlo en un bloc de notas y guárdenlo como `equipo_NOMBRE_final.txt`.

## ¿Lo logramos? (5 min)

:::checklist id="g6dp-logramos"
- [ ] La porción cambia según `MASCOTA`.
- [ ] El dispensador simulado sirve solo cada minuto.
- [ ] Los botones siguen sirviendo a mano.
- [ ] Guardamos `equipo_NOMBRE_final.txt`.
:::

## Reto extra

Haz que el dispensador **deje de servir solo** cuando ya hizo 5 comidas automáticas (un límite diario), pero que los botones sigan funcionando.

Pista: una variable `int comidasAuto = 0;` que sume 1 en cada comida automática, y en el `if` del horario agreguen con `&&` la pregunta de si es menor que 5.

## Bitácora (10 min)

:::pregunta id="g6dp-b1"
¿Qué fue lo más difícil de simular? ¿Qué creen que será distinto en el dispensador real?
:::

Suban aquí `equipo_NOMBRE_final.txt`: el sábado 7 lo pegan en Arduino IDE.

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_final.txt` con el código final del simulador. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí.
:::

:::docente
- **Versión doble práctica:** la porción se elige con `MASCOTA` (decisión de Bairon: sin perilla ni báscula), con las proporciones 1 : 2 : 4 de la Guía 8 normal, para el cereal y para el líquido. El horario es el del programa final de la Guía 8 normal. Campos propios (g6dp-…).
- g6dp-proporcion: compuerta 1000, 2000 y 4000 ms; bomba 2000, 4000 y 8000 ms. g6dp-p1: 185 000.
- g6dp-p2: para que el aviso del líquido no se junte con el del cereal y se note que son dos porciones.
- Con MASCOTA = 3 la bomba queda 8 segundos: en la Guía 8 revisen que el vaso no se derrame (si pasa, bajen BOMBA_GATO).
- La primera comida automática llega al minuto de encender (porque `ultimaComida` empieza en 0).
- Tiempo total: 20 + 40 + 30 + 15 + 5 + 10 = 120 minutos.
:::

---
titulo: Simulamos la bomba con el relé
guia: 5
sabado: 5
sesion: Simulación (2)
duracion: 120
---

# Guía 5 · Simulamos la bomba con el relé

## Objetivo del día

Entender qué es un relé y agregar al simulador la bomba del líquido, encendida por un relé, para que el botón del líquido sirva de verdad.

**Al terminar tendremos:** el dispensador doble completo en el simulador: un botón sirve cereal y el otro enciende la bomba.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_doble_sim` (sábado 4)
- Bitácora

## Parte 1 · ¿Qué es un relé? (10 min)

El Arduino da muy poca corriente: no puede mover una bomba él solo. El **relé** es un **interruptor** que el Arduino enciende con una señal pequeña, y ese interruptor deja pasar la corriente de su propia fuente de energía a la bomba.

Prueben la animación: enciendan y apaguen la señal del Arduino y miren qué pasa con el interruptor y la bomba.

:::animacion tipo="rele"
:::

El relé tiene dos lados que **no se tocan**:

- **La bobina:** un pequeño imán que el Arduino enciende con el pin 8.
- **El interruptor:** tres contactos, **COM** (común), **NO** (abierto cuando el relé está apagado) y **NC** (cerrado cuando está apagado). Cuando la bobina se enciende, el COM se une con el NO y pasa la corriente.

:::pregunta id="g5dp-p1"
Si la bomba va conectada al **NO**, ¿está encendida o apagada cuando el pin 8 está en LOW?
:::

## Parte 2 · El relé y la bomba en el simulador (35 min)

Abran `equipo_NOMBRE_doble_sim` en Tinkercad (**Diseños → Circuitos**) y, con la simulación detenida, agreguen:

1. **Relé:** en **Buscar** escriban `relé` y arrastren el **Relé SPDT** (está en **Otros componentes**).
   - Pasen el mouse por sus patas para ver su nombre: dos son de la **bobina** y las otras son **COM**, **NO** y **NC**.
2. **Bomba:** en el simulador no hay bomba de agua; usamos un **Motor de CC**, que también gira con corriente.
3. **Energía de la bomba:** arrastren una **Pila de 9 V**. En el dispensador real usaremos una fuente (cargador) de 5 V.
4. Conecten, como en la tabla:

| Componente | Conexión |
| --- | --- |
| Bobina del relé | Una pata → D8 · la otra → fila − |
| Pila + | COM del relé |
| NO del relé | Una pata del Motor de CC |
| La otra pata del Motor de CC | Pila − |

- El NC no se usa.
- La pila y el motor **no** se conectan a las filas + y − de la protoboard: van por su lado, solo a través del relé.

[IMAGEN 5.1DP: dispensador doble simulado en Tinkercad Circuits con el relé, el motor que hace de bomba y la pila de 9 V]

## Parte 3 · El programa (35 min)

Toquen **Código**, borren todo y escriban el programa completo. `servirLiquido()` ahora enciende la bomba con el pin 8:

```cpp
#include <Servo.h>
Servo compuerta;

const int BOTON_CEREAL = 2;
const int BOTON_LIQUIDO = 3;
const int LED = 4;
const int BUZZER = 5;
const int BOMBA = 8;               // relé de la bomba
const int CERRADA = 0;
const int ABIERTA = 70;
const int TIEMPO_ABIERTA = 1000;   // ms con la compuerta abierta
const int TIEMPO_BOMBA = 2000;     // ms con la bomba encendida

void setup() {
  pinMode(BOTON_CEREAL, INPUT_PULLUP);
  pinMode(BOTON_LIQUIDO, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);        // bomba apagada
  compuerta.attach(9);
  compuerta.write(CERRADA);
}

// Sirve una porción de cereal
void servirCereal() {
  tone(BUZZER, 1500, 300);         // aviso
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_ABIERTA);
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
}

// Sirve una porción de líquido
void servirLiquido() {
  tone(BUZZER, 1000, 300);         // aviso más grave
  digitalWrite(LED, HIGH);
  digitalWrite(BOMBA, HIGH);       // encender bomba
  delay(TIEMPO_BOMBA);
  digitalWrite(BOMBA, LOW);        // apagar bomba
  digitalWrite(LED, LOW);
}

void loop() {
  if (digitalRead(BOTON_CEREAL) == LOW) {
    servirCereal();
    delay(500);                    // evitar doble toque
  }
  if (digitalRead(BOTON_LIQUIDO) == LOW) {
    servirLiquido();
    delay(500);
  }
}
```

1. **Iniciar simulación** y presionen cada botón. Con el del líquido, el motor debe girar mientras dure `TIEMPO_BOMBA`.

:::tabla id="g5dp-pruebas"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Botón del cereal: aviso, LED y compuerta | | |
| Botón del líquido: aviso grave, LED y el motor gira | | |
| El motor se detiene solo al pasar el tiempo | | |
| Sin presionar, el motor está quieto | | |
:::

## Parte 4 · ¿Cuánto tiempo la bomba? (20 min)

`TIEMPO_BOMBA` dice cuánto tiempo sale líquido: más tiempo, más líquido. Prueben tres valores en el simulador y cronometren cuánto gira el motor.

:::tabla id="g5dp-bomba"
| TIEMPO_BOMBA (ms) | Tiempo que giró el motor (s) |
| --- | --- |
| 1000 | |
| 2000 | |
| 3000 | |
:::

Dejen `TIEMPO_BOMBA = 2000`. El sábado 8, con la bomba real y un vaso, lo ajustarán a ojo.

:::pregunta id="g5dp-p2"
¿Para qué sirve el relé? Explícalo con tus palabras.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5dp-logramos"
- [ ] El relé, el motor y la pila están conectados en el simulador.
- [ ] El botón del líquido enciende el motor.
- [ ] El botón del cereal sigue moviendo la compuerta.
:::

## Reto extra

Agrega un **tercer botón** (en el pin 6) que sirva cereal **y** líquido, uno después del otro.

Pista: necesitan la constante, su `pinMode(…, INPUT_PULLUP)` y un `if` en el `loop` que llame a las dos funciones.

## Bitácora (15 min)

:::foto id="g5dp-foto"
Captura de pantalla del circuito con el relé y el motor.
:::

:::pregunta id="g5dp-b1"
¿Por qué la bomba lleva su propia fuente de energía y no se conecta al 5V del Arduino?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** si quieren, suban aquí una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión doble práctica:** el relé y la bomba se prueban primero en el simulador; en la Guía 7 se conecta el módulo relé real con la mini bomba y la fuente de 5 V. Campos propios (g5dp-…).
- En Tinkercad no hay módulo relé (con pines VCC, GND e IN) ni bomba de agua: se usan el **Relé SPDT**, un **Motor de CC** y una **Pila de 9 V**. La bobina va directo al pin 8 solo en el simulador; el módulo real trae adentro el transistor y el diodo que el pin necesita, por eso en la Guía 7 se conecta VCC, GND e IN.
- g5dp-p1: apagada; con el pin en LOW la bobina no se enciende y el NO queda abierto.
- g5dp-p2: es un interruptor que el Arduino enciende con poca corriente para dejar pasar la corriente grande de la fuente a la bomba.
- g5dp-b1: la bomba necesita más corriente de la que da el Arduino; con su propia fuente el Arduino no se reinicia ni se daña.
- Tiempo total: 10 + 35 + 35 + 20 + 5 + 15 = 120 minutos.
:::

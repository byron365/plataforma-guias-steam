---
titulo: Simulamos la luz y la ventana
guia: 3
sabado: 3
sesion: Simulación (1)
duracion: 120
---

# Guía 3 · Simulamos la luz y la ventana

## Objetivo del día

Conocer el simulador **Wokwi** y simular las dos primeras partes del invernadero: la **luz de crecimiento** que se enciende y se apaga sola, y la **ventana** que abre un servo con un botón.

**Al terminar tendremos:** el invernadero simulado con su luz automática y la ventana que se abre y se cierra con el botón.

## Materiales del equipo

- Computadora con internet y la cuenta de Wokwi del equipo (o la que indique el docente)
- Regla para medir las plantas
- Bitácora

Mientras simulamos (sábados 3, 4 y 5), se imprimen las piezas que diseñaron en la Guía 2. Hoy y el sábado 5 usamos Wokwi; el sábado 4, Tinkercad.

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g3p-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Conociendo Wokwi (15 min)

Un **simulador** imita un circuito real en la computadora: el Arduino, los sensores y los cables son virtuales, pero el código es el mismo. Así probamos todo sin miedo a quemar nada y, cuando funcione, lo armamos de verdad. La página de Wokwi está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Entren a **wokwi.com** e inicien sesión con la cuenta del equipo.
2. Bajen hasta **Start from Scratch** y elijan **Arduino Uno**. A la izquierda queda el código (`sketch.ino`) y a la derecha el dibujo del circuito.

| Parte | Para qué sirve |
| --- | --- |
| `sketch.ino` (izquierda) | El programa del Arduino |
| Dibujo (derecha) | Ahí se arma el circuito |
| Botón **+** azul (arriba del dibujo) | Agregar una pieza: se busca por su nombre en inglés |
| **Play** (botón verde ▶) | Inicia la simulación; con el cuadrado se detiene |
| **Save** | Guarda el proyecto en la cuenta |

**Cómo se usan:**

- **Poner un cable:** haz clic en la punta de un pin y luego en el pin de destino. Al pasar el mouse sobre un pin aparece su nombre.
- **Borrar:** clic en la pieza o el cable y **Supr**.
- **Cambiar una pieza** (por ejemplo, el color de un LED o el valor de una resistencia): haz clic sobre ella y aparecen sus opciones.

[IMAGEN 3.1P: editor de Wokwi con sus partes señaladas: código, dibujo del circuito, botón + para agregar piezas, Play y Save]

## Parte 3 · La luz de crecimiento (20 min)

La luz de la Guía 1, pero ahora se enciende y se apaga sola, como un temporizador.

1. Con **+**, agreguen un **LED** (en sus opciones elijan el color blanco) y una **Resistor** (resistencia). Hagan clic en la resistencia y pongan **220** Ω.
2. Conecten: pin **6** del Arduino → resistencia → pata **A** del LED (ánodo, pata larga); pata **C** del LED (cátodo) → **GND** del Arduino.
3. Borren el código de `sketch.ino` y escriban:

```cpp
const int LUZ = 6;
const unsigned long LUZ_ON = 10000;   // ms encendida (para probar)
const unsigned long LUZ_OFF = 10000;  // ms apagada

void setup() {
  pinMode(LUZ, OUTPUT);
}

void loop() {
  // Luz con temporizador: en qué parte del ciclo vamos
  unsigned long ciclo = LUZ_ON + LUZ_OFF;
  unsigned long t = millis() % ciclo;
  if (t < LUZ_ON) {
    digitalWrite(LUZ, HIGH);
  } else {
    digitalWrite(LUZ, LOW);
  }
}
```

4. Presionen **Play**: la luz debe estar encendida 10 segundos y apagada otros 10, una y otra vez.

Muevan el tiempo en la animación para ver cómo el temporizador decide si la luz va encendida o apagada:

:::animacion tipo="temporizador"
:::

:::pregunta id="g3p-p1"
`millis() % ciclo` da el tiempo dentro de cada vuelta del ciclo. Si `ciclo` es 20 000 y `millis()` vale 45 000, ¿qué número da? ¿La luz está encendida o apagada?
:::

## Parte 4 · La ventana con un botón (45 min)

1. Con **+**, agreguen un **Servo** y un **Pushbutton** (botón).
2. Conecten:

| Pieza | Pin del Arduino |
| --- | --- |
| Servo: PWM / V+ / GND | 9 / 5V / GND |
| Botón: una pata del lado **1** / una pata del lado **2** | 2 / GND |

   - Al pasar el mouse por las patas del botón aparecen sus nombres (**1.l**, **1.r**, **2.l**, **2.r**): las del lado 1 están unidas entre sí, igual que las del lado 2.

[IMAGEN 3.2P: luz y ventana simuladas en Wokwi: LED blanco con su resistencia en el pin 6, servo en el pin 9 y botón en el pin 2]

3. Borren el código y escriban el programa que junta la luz y la ventana:

```cpp
#include <Servo.h>
Servo ventana;

const int BOTON = 2;
const int LUZ = 6;
const unsigned long LUZ_ON = 10000;   // ms encendida (para probar)
const unsigned long LUZ_OFF = 10000;  // ms apagada
bool abierta = false;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);   // botón suelto = HIGH
  pinMode(LUZ, OUTPUT);
  ventana.attach(9);
  ventana.write(0);               // cerrada
}

void loop() {
  // 1. La ventana: cada toque al botón la abre o la cierra
  if (digitalRead(BOTON) == LOW) {    // botón presionado
    abierta = !abierta;               // cambiar: abierta <-> cerrada
    if (abierta) {
      ventana.write(60);
    } else {
      ventana.write(0);
    }
    delay(500);                       // evitar doble toque
  }

  // 2. La luz con temporizador
  unsigned long ciclo = LUZ_ON + LUZ_OFF;
  unsigned long t = millis() % ciclo;
  if (t < LUZ_ON) {
    digitalWrite(LUZ, HIGH);
  } else {
    digitalWrite(LUZ, LOW);
  }
}
```

4. **Play.** Hagan clic en el botón del dibujo y miren el brazo del servo.

:::tabla id="g3p-prueba"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| Al empezar, el brazo del servo está en 0° (ventana cerrada) | | |
| Un toque al botón: el brazo gira a 60° | | |
| Otro toque: vuelve a 0° | | |
| Mientras tanto, la luz sigue encendiéndose y apagándose | | |
:::

:::pregunta id="g3p-p2"
¿Qué hace la línea `abierta = !abierta;`?
:::

5. Guarden con **Save** y copien el enlace de la barra del navegador: lo van a usar los próximos sábados.

## ¿Lo logramos? (5 min)

:::checklist id="g3p-logramos"
- [ ] Revisamos las plantas.
- [ ] La luz se enciende y se apaga sola.
- [ ] El botón abre y cierra la ventana.
- [ ] Guardamos el proyecto de Wokwi.
:::

## Reto extra

Haz que la luz **parpadee** tres veces cuando la ventana se abre, como aviso.

Pista: dentro del `if (abierta)`, antes de `ventana.write(60);`, un `for` que se repita 3 veces encendiendo y apagando la luz con un `delay` corto.

## Bitácora (15 min)

:::pregunta id="g3p-b1"
¿Para qué sirve simular el circuito antes de armarlo en el invernadero?
:::

Peguen aquí el enlace de su proyecto de Wokwi:

:::pregunta id="g3p-enlace"
Enlace del proyecto de Wokwi:
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** si quieren, suban una copia del código (cópienlo de `sketch.ino` a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión práctica (8 sábados), desde el 30 de octubre:** guías 1 y 2 iguales a la versión Tinkercad (diseño 3D en Tinkercad); 3 y 5 simulan el circuito por partes en **Wokwi** (tiene el sensor de temperatura y el módulo relé) y la 4, el riego, en **Tinkercad Circuits** (tiene el sensor de humedad del suelo y el relé), por decisión de Bairon; 6 arma la casa y la ventana, 7 el circuito completo y 8 es plantas, datos y demostración. **Desde el 13 de noviembre son 9 sábados:** 6 arma la casa y la ventana, 7 conecta el circuito y 8 sube los programas y calibra (guías de armado), 9 es plantas, datos y demostración. Campos propios (g3p-…).
- Mismos pines del invernadero: luz D6, botón D2, servo D9 (y en las guías 4 y 5: sensor de humedad A0, relé D8, temperatura D7).
- Para probar se usan 10 segundos de luz encendida y 10 apagada; en el invernadero real serían horas.
- g3p-p1: 45 000 % 20 000 = 5 000; como es menor que LUZ_ON (10 000), la luz está encendida.
- g3p-p2: cambia el valor de `abierta` al contrario (de falso a verdadero o al revés), para que cada toque haga lo opuesto al anterior.
- Las piezas impresas (bisagra, soporte del servo, clip) se imprimen entre el sábado 3 y el 5; la casa se arma en la Guía 6.
- Tiempo total: 10 + 15 + 20 + 45 + 5 + 15 = 110 minutos (10 de margen para crear las cuentas de Wokwi).
:::

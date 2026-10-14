---
titulo: ¡La comida está servida!
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · ¡La comida está servida!

## Objetivo del día

Conocer el proyecto del dispensador de comida, organizar el equipo y lograr que un servo abra una compuerta al presionar un botón.

**Al terminar tendremos:** equipo con roles, bitácora iniciada y un servo que se abre y se cierra con un botón, con una luz de aviso.

## Materiales del equipo

- Arduino UNO y cable USB
- 1 servo SG90
- 1 botón pulsador
- 1 LED y resistencia de 220 Ω
- Protoboard y cables
- Computadora con Arduino IDE

## Parte 1 · ¿Qué vamos a construir? (15 min)

¿Qué pasa con una mascota cuando su familia sale todo el día? Un **dispensador automático** le sirve comida a la hora correcta y en la cantidad correcta. El nuestro tendrá un depósito de croquetas, un embudo y una compuerta movida por un servo. Servirá al presionar un botón o solo, cada cierto tiempo, y avisará con un sonido.

[IMAGEN 1.1: render del dispensador terminado con el depósito, el embudo, la compuerta y el plato]

:::animacion tipo="dispensador"
:::

:::pregunta id="g1-p1"
¿Crees que un perro grande y un gato deben comer la misma cantidad? ¿Por qué?
:::

## Parte 2 · Nuestro equipo (15 min)

Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos y modelo 3D en Blender | |
| Constructor | Arma la estructura y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Bitácora, fotos, mediciones y gráficas | |

Nombre de nuestro equipo: ______

## Parte 3 · Conociendo al servomotor (15 min)

Un **servomotor** gira al ángulo exacto que le pedimos, entre 0° y 180°. Será el que abre la compuerta.

| Color del cable | Va conectado a | Para qué sirve |
| --- | --- | --- |
| Café | GND | Tierra (negativo) |
| Rojo | 5V | Energía |
| Naranja | D9 | Señal: a qué ángulo ir |

[IMAGEN 1.2: servo SG90 con sus partes señaladas: cuerpo, eje, brazo y cables]

:::animacion tipo="servo" variable="compuerta" inicial="0"
:::

## Parte 4 · Armar el circuito (20 min)

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → D9 · Rojo → 5V · Café → GND |
| Botón | Una pata → D2 · la otra → GND |
| LED | Pata larga → 220 Ω → D4 · pata corta → GND |

[IMAGEN 1.3: circuito con el servo, el botón y el LED en la protoboard]

:::animacion tipo="conexiones" circuito="dispensador-basico"
:::

## Parte 5 · Programar la compuerta (35 min)

```cpp
#include <Servo.h>
Servo compuerta;

const int BOTON = 2;
const int LED = 4;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);   // botón suelto = HIGH
  pinMode(LED, OUTPUT);
  compuerta.attach(9);
  compuerta.write(0);             // cerrada
}

void loop() {
  if (digitalRead(BOTON) == LOW) {   // botón presionado
    digitalWrite(LED, HIGH);         // aviso
    compuerta.write(70);             // abrir
    delay(1000);                     // 1 segundo abierta
    compuerta.write(0);              // cerrar
    digitalWrite(LED, LOW);
  }
}
```

| Instrucción | ¿Qué hace? |
| --- | --- |
| `compuerta.write(70)` | Gira el servo a 70° |
| `digitalRead(BOTON) == LOW` | Pregunta si el botón está presionado |
| `delay(1000)` | Espera 1 segundo |

:::tabla id="g1-pruebas"
| Tiempo abierta (delay) | ¿Cuánto se nota abierta? |
| --- | --- |
| 300 | |
| 1000 | |
| 3000 | |
:::

:::pregunta id="g1-p2"
Si la compuerta está más tiempo abierta, ¿caerá más o menos comida? ¿Por qué?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Cada integrante tiene su rol.
- [ ] El servo se mueve.
- [ ] El botón abre y cierra la compuerta.
- [ ] El LED avisa mientras está abierta.
:::

## Reto extra

Agrega un **buzzer** en D5 (+ → D5, − → GND) y haz que suene `tone(5, 1500, 300);` antes de abrir, para "llamar" a la mascota.

## Bitácora (15 min)

:::pregunta id="g1-b1"
¿Qué problema resuelve un dispensador automático?
:::

:::pregunta id="g1-b2"
¿Qué fue lo más difícil de hoy y cómo lo resolvimos?
:::

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Preguntar quién tiene mascota y qué come: conecta el proyecto con su vida.
- Error frecuente: botón conectado en diagonal en la protoboard; usar patas opuestas.
- g1-p2: más tiempo abierta = más comida; es la idea central del proyecto (se mide en el sábado 6).
- Tiempo total: 15 + 15 + 15 + 20 + 35 + 5 + 15 = 120 minutos.
:::

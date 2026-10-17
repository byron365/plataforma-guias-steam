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

Revisen que tienen todo sobre la mesa. Si falta algo, pídanlo ahora al docente.

## Parte 1 · ¿Qué vamos a construir? (15 min)

¿Qué pasa con una mascota cuando su familia sale todo el día? Un **dispensador automático** le sirve comida a la hora correcta y en la cantidad correcta. El nuestro tendrá un depósito de croquetas, un embudo y una compuerta movida por un servo. Servirá al presionar un botón o solo, cada cierto tiempo, y avisará con un sonido.

- **Depósito:** una botella boca abajo donde se guardan las croquetas.
- **Embudo:** junta la comida y la lleva hacia una salida pequeña.
- **Compuerta:** una paleta que tapa la salida. Cuando el servo la gira, la comida cae al plato.

[IMAGEN 1.1: render del dispensador terminado con el depósito, el embudo, la compuerta y el plato]

Miren la animación para ver cómo funciona:

:::animacion tipo="dispensador"
:::

:::pregunta id="g1-p1"
¿Crees que un perro grande y un gato deben comer la misma cantidad? ¿Por qué?
:::

## Parte 2 · Nuestro equipo (15 min)

Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

1. Lean juntos qué hace cada rol.
2. Decidan quién empieza con cada uno. Si son menos de cuatro, alguien puede tener dos roles.
3. Escriban los nombres en la columna **Nombre**.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos y modelo 3D en Tinkercad (Codeblocks) | |
| Constructor | Arma la estructura y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Bitácora, fotos, mediciones y gráficas | |

4. Elijan un nombre para el equipo y escríbanlo aquí y en la portada de la bitácora.

Nombre de nuestro equipo: ______

## Parte 3 · Conociendo al servomotor (15 min)

Un **servomotor** gira al ángulo exacto que le pedimos, entre 0° y 180°. Será el que abre la compuerta. No da vueltas completas: va a una posición y se queda ahí.

Busquen en su servo: el **cuerpo** (la cajita), el **eje** (el piquito con dientes que gira), el **brazo** (la pieza blanca que se encaja en el eje, viene en una bolsita) y los **tres cables**.

| Color del cable | Va conectado a | Para qué sirve |
| --- | --- | --- |
| Café | GND | Tierra (negativo) |
| Rojo | 5V | Energía |
| Naranja | D9 | Señal: a qué ángulo ir |

[IMAGEN 1.2: servo SG90 con sus partes señaladas: cuerpo, eje, brazo y cables]

Muevan el control de la animación: en 0° la compuerta está cerrada y al girar se abre.

:::animacion tipo="servo" variable="compuerta" inicial="0"
:::

## Parte 4 · Armar el circuito (20 min)

Hagan todo con el Arduino **desconectado** de la computadora.

**Primero, la protoboard.** En sus bordes tiene filas largas marcadas con **+** (línea roja) y **−** (línea azul o negra): todos los agujeros de una fila larga están conectados entre sí. En el centro hay una canaleta, y a cada lado filas cortas de 5 agujeros conectados.

1. **Energía:** un cable del pin **5V** del Arduino a la fila **+** de la protoboard, y otro de un pin **GND** a la fila **−**.
2. **Servo:** encaja un brazo en el eje. Mete tres cables macho–macho en su conector y conecta: **naranja → D9** (pin 9 en la fila DIGITAL), **rojo → fila +**, **café → fila −**.
3. **Botón:** clávalo sobre la canaleta del centro, con dos patas de cada lado. Usa dos patas **en diagonal** (esquinas opuestas): una → pin **D2**; la otra → fila **−** (GND).
4. **LED:** tiene una pata larga (+) y una corta (−).
   - Clávalo con cada pata en una fila corta distinta.
   - Pon la resistencia de 220 Ω desde la fila de la **pata larga** hasta otra fila libre, y de esa fila un cable al pin **D4**.
   - De la fila de la **pata corta**, un cable a la fila **−** (GND).

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → D9 · Rojo → 5V · Café → GND |
| Botón | Una pata → D2 · la otra → GND |
| LED | Pata larga → 220 Ω → D4 · pata corta → GND |

[IMAGEN 1.3: circuito con el servo, el botón y el LED en la protoboard]

Toquen cada cable en la animación para comparar con su circuito:

:::animacion tipo="conexiones" circuito="dispensador-basico"
:::

**✔ Revisa:** sigue cada cable con el dedo, de una punta a la otra, comparando con la tabla.

## Parte 5 · Programar la compuerta (35 min)

1. Conecta el Arduino a la computadora con el cable USB y abre **Arduino IDE**.
2. En la lista **Seleccionar placa** (arriba) elige **Arduino Uno** con su puerto (COM3, COM4…). Si no aparece: **Herramientas → Placa → Arduino AVR Boards → Arduino Uno** y **Herramientas → Puerto**.
3. **Archivo → Nuevo boceto**, borra lo que trae (Ctrl + A y Suprimir) y escribe este código con cuidado (cada `;`, `{ }` y mayúscula cuenta):

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

4. Presiona **✓ (Verificar)**. Si sale un error en rojo, revisa la línea que indica (casi siempre falta un `;` o una llave).
5. Presiona **→ (Subir)** y espera "Carga completada".
6. Presiona el botón: el LED se enciende, el servo gira a 70°, espera 1 segundo y vuelve a 0°.

Esto significa cada instrucción:

| Instrucción | ¿Qué hace? |
| --- | --- |
| `compuerta.write(70)` | Gira el servo a 70° |
| `digitalRead(BOTON) == LOW` | Pregunta si el botón está presionado |
| `delay(1000)` | Espera 1 segundo |

7. **Prueba con otros tiempos.** Cambia el número de `delay(1000)` por cada valor de la tabla, sube el código y presiona el botón. Escribe cuánto se nota abierta la compuerta (por ejemplo: "casi nada", "un momento", "bastante").

:::tabla id="g1-pruebas"
| Tiempo abierta (delay) | ¿Cuánto se nota abierta? |
| --- | --- |
| 300 | |
| 1000 | |
| 3000 | |
:::

Al terminar, regresa el número a 1000.

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

Pistas: el buzzer tiene un **+** marcado (o una pata más larga). Escribe la línea `tone(5, 1500, 300);` dentro del `if`, antes de `compuerta.write(70);`.

## Bitácora (15 min)

:::pregunta id="g1-b1"
¿Qué problema resuelve un dispensador automático?
:::

:::pregunta id="g1-b2"
¿Qué fue lo más difícil de hoy y cómo lo resolvimos?
:::

Antes de irse: guarden el programa (**Archivo → Guardar como** → `equipo_NOMBRE_compuerta`), súbanlo en el recuadro de abajo y guarden los componentes en su caja.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Preguntar quién tiene mascota y qué come: conecta el proyecto con su vida.
- Error frecuente: botón conectado en diagonal en la protoboard; usar patas opuestas.
- g1-p2: más tiempo abierta = más comida; es la idea central del proyecto (se mide en el sábado 6).
- Tiempo total: 15 + 15 + 15 + 20 + 35 + 5 + 15 = 120 minutos.
:::

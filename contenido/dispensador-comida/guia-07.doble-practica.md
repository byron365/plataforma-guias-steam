---
titulo: Armamos el dispensador doble de verdad
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Armamos el dispensador doble de verdad

## Objetivo del día

Armar el dispensador doble con las piezas impresas: el lado del cereal y el lado del líquido.

**Al terminar tendremos:** el dispensador doble armado, con el servo en 0° colgando de su repisa, la compuerta tapando la salida, la botella en el embudo y la bomba sumergida con su manguera. El circuito se conecta en la Guía 8.

## Materiales del equipo

- Piezas impresas: torre del cereal, compuerta, embudo y torre del líquido
- Botella pequeña (unos 600 ml), sin tapa
- Servo SG90 con sus brazos y su tornillo pequeño
- Mini bomba de agua de 5 V con su manguera
- Arduino UNO, 3 cables macho–macho (para dejar el servo en 0°) y destornillador pequeño
- Recipiente para el líquido, agua, vaso y plato, bandeja o trapo (para derrames)

> **Seguridad:** el líquido y la electrónica no se llevan bien. El Arduino, la protoboard y el relé van **del lado del cereal**, lejos del líquido. Desconecta todo antes de mover cables.

## Parte 1 · Revisar las piezas impresas (15 min)

1. Quiten los restos de plástico y los soportes de impresión (pidan ayuda al docente). Lijen los bordes que raspen.
2. Prueben que cada pieza encaje, **sin pegar nada todavía**, y marquen:

:::checklist id="g7dp-piezas"
- [ ] El embudo entra en el agujero de arriba de la torre del cereal y se apoya con su tapa.
- [ ] La boca de la botella entra en el cuello del embudo.
- [ ] El servo entra en el hueco de la repisa hasta que sus pestañas se apoyan.
- [ ] El brazo de un solo lado del servo entra en el hueco del encastre de la compuerta.
- [ ] La manguera entra a presión en el agujero del brazo de la torre del líquido.
:::

## Parte 2 · El servo en 0° (15 min)

Antes de montar la compuerta, el servo debe estar en **0°** (compuerta cerrada).

1. Con el Arduino desconectado, conecten **solo el servo** con 3 cables macho–macho en su conector: naranja → **D9**, rojo → **5V** y café → **GND** del Arduino.
2. Llamen al docente: conecta el USB y sube un programa corto que deja el servo en 0°. Cómo se sube un programa lo aprenderán en la Guía 9.
3. Cuando el servo se quede quieto en 0°, **desconecten el USB** y los 3 cables. Desde aquí, no giren el eje con la mano.

## Parte 3 · Montar el lado del cereal (45 min)

[IMAGEN 4.1T: acercamiento del dispensador en Tinkercad: salida del embudo, compuerta boca abajo, servo colgando de sus pestañas en su repisa y plato abajo]

1. **El servo:** métanlo desde arriba en el hueco de la repisa de en medio, con el **eje hacia arriba** y del lado que queda **debajo del embudo**. Bájenlo hasta que cuelgue de sus pestañas.
2. **El embudo:** pónganlo en el agujero de arriba, apoyado con su tapa.
3. **La compuerta:** va **boca abajo**. Metan el **brazo de un solo lado** en el hueco del encastre (si queda flojo, una gota de silicona por los lados), encajen el centro del brazo en el eje con la paleta **tapando la salida del embudo** y pongan el tornillo pequeño por el **agujerito de la paleta**.
4. **La botella:** el docente la corta cerca del fondo. Métanla **boca abajo**, sin tapa, en el cuello del embudo.

La abertura de la compuerta se revisa en la Guía 9, con el programa final.

## Parte 4 · Montar el lado del líquido (25 min)

1. Pongan la torre del líquido al lado de la torre del cereal, **del lado contrario** al Arduino.
2. Llenen el recipiente con agua hasta la mitad y metan la bomba **sumergida**, acostada en el fondo. Nunca la enciendan fuera del agua: se daña.
3. Pasen la manguera desde la bomba hasta el agujero del brazo y métanla a presión, apuntando al vaso.
4. Pongan el vaso en el pie de la torre del líquido y el plato en el pie de la torre del cereal.

:::checklist id="g7dp-revision"
- [ ] El lugar del Arduino, la protoboard y el relé queda del lado del cereal, lejos del líquido.
- [ ] La bomba está sumergida y la manguera apunta al vaso.
- [ ] En 0° la compuerta tapa la salida del embudo.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7dp-logramos"
- [ ] Las 4 piezas están armadas en su lugar.
- [ ] La bomba está sumergida y la manguera apunta al vaso.
- [ ] En 0° la compuerta tapa la salida del embudo.
:::

## Bitácora (15 min)

:::foto id="g7dp-foto"
Foto del dispensador doble armado.
:::

Antes de irse, vacíen el vaso y dejen el dispensador armado.

:::archivo id="g7-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión doble práctica:** el armado de la Guía 4 Tinkercad (lado del cereal) y el lado del líquido. Desde el 13 de noviembre, el circuito con el relé y la bomba pasó a la Guía 8 (práctica de armado) y el programa final y la revisión de la abertura a la Guía 9; la pregunta de la bitácora sobre el relé también pasó a la Guía 8. Conviene tener las piezas impresas revisadas y la botella cortada antes de empezar. Campos propios (g7dp-…).
- **Programa para dejar el servo en 0° (lo sube el docente en la Parte 2):** Arduino IDE, placa Arduino Uno y su puerto:

```cpp
#include <Servo.h>
Servo compuerta;

void setup() {
  compuerta.attach(9);
  compuerta.write(0);   // compuerta cerrada
}

void loop() {
}
```
- Compuerta nueva (12 de noviembre, ver Guía 2): la paleta queda 0,8 mm debajo de la salida y no choca con la torre al abrir. Si el brazo de la academia es más alto que el del plano y la paleta roza el embudo, poner un anillo de cartón debajo de la tapa del embudo. Las compuertas impresas antes (encastre de 5 mm) no reciben el brazo, y las torres del líquido con agujero de 7,5 mm no reciben una manguera de 8: hay que reimprimirlas.
- Si no alcanza el tiempo, lo que falte del armado se termina al inicio de la Guía 8.
- Tiempo total: 15 + 15 + 45 + 25 + 5 + 15 = 120 minutos.
:::

---
titulo: Armamos el dispensador de verdad
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Armamos el dispensador de verdad

## Objetivo del día

Armar el dispensador con las piezas impresas: el servo y la compuerta en la torre, el embudo y la botella.

**Al terminar tendremos:** el dispensador armado, con el servo en 0° colgando de su repisa, la compuerta tapando la salida y la botella en el embudo. El circuito se conecta en la Guía 8.

## Materiales del equipo

- Piezas impresas: torre, compuerta y embudo
- Botella pequeña (unos 600 ml), sin tapa
- Servo SG90 con sus brazos y su tornillo pequeño
- Arduino UNO y 3 cables macho–macho (para dejar el servo en 0°)
- Destornillador pequeño, lija, plato

## Parte 1 · Revisar las piezas impresas (25 min)

1. Quiten los restos de plástico y los soportes de impresión (pidan ayuda al docente). Lijen los bordes que raspen.
2. Prueben que cada pieza encaje, **sin pegar nada todavía**, y marquen:

:::checklist id="g7p-piezas"
- [ ] El embudo entra en el agujero de arriba y se apoya con su tapa sin tambalearse.
- [ ] La boca de la botella entra en el cuello del embudo.
- [ ] El servo entra en el hueco de la repisa hasta que sus pestañas se apoyan.
- [ ] El brazo de un solo lado del servo entra en el hueco del encastre de la compuerta.
:::

- **Si algo entra muy apretado:** lijen por dentro, poco a poco, y prueben otra vez.
- **Si algo queda flojo:** una vuelta de cinta lo ajusta.

## Parte 2 · El servo en 0° (15 min)

Antes de montar la compuerta, el servo debe estar en **0°** (compuerta cerrada).

1. Con el Arduino desconectado, conecten **solo el servo** con 3 cables macho–macho en su conector: naranja → **D9**, rojo → **5V** y café → **GND** del Arduino.
2. Llamen al docente: conecta el USB y sube un programa corto que deja el servo en 0°. Cómo se sube un programa lo aprenderán en la Guía 9.
3. Cuando el servo se quede quieto en 0°, **desconecten el USB** y los 3 cables. Desde aquí, no giren el eje con la mano.

## Parte 3 · Montar el servo y la compuerta (50 min)

[IMAGEN 4.1T: acercamiento del dispensador en Tinkercad: salida del embudo, compuerta boca abajo, servo colgando de sus pestañas en su repisa y plato abajo]

1. **El servo:** métanlo desde arriba en el hueco de la repisa de en medio, con el **eje hacia arriba** y del lado que queda **debajo del embudo**. Bájenlo hasta que cuelgue de sus pestañas. Los cables salen hacia abajo; llévenlos por detrás de la torre hacia la protoboard.
2. **El embudo:** pónganlo en el agujero de arriba, apoyado con su tapa.
3. **La compuerta:** va **boca abajo**, con la paleta arriba y el encastre abajo.
   - Metan el **brazo de un solo lado** (el más largo) en el hueco del encastre. Debe entrar justo; si queda flojo, una gota de silicona por los lados (nunca en el centro del brazo).
   - Encajen el centro del brazo en el eje del servo, con la paleta justo **debajo de la salida del embudo, tapándola**.
   - Pongan el tornillo pequeño por el **agujerito de la paleta**, con el destornillador, hasta el centro del brazo.

La abertura de la compuerta se revisa en la Guía 9, con el programa final.

:::checklist id="g7p-revision"
- [ ] En 0° la compuerta tapa toda la salida.
- [ ] La compuerta no roza con el embudo.
:::

## Parte 4 · La botella (15 min)

1. Marquen con plumón una línea alrededor de la botella, cerca del fondo. El docente la corta.
2. Métanla **boca abajo**, sin tapa, en el cuello del embudo. La parte cortada queda arriba: por ahí se rellena.
3. Pongan el plato sobre el pie de la torre, debajo de la salida.

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] Todas las piezas encajan.
- [ ] El servo cuelga de su repisa y la compuerta tapa la salida.
- [ ] La botella está boca abajo en el embudo.
:::

## Bitácora (10 min)

:::foto id="g7p-foto"
Foto del dispensador armado.
:::

Dejen el dispensador armado. Desconecten el USB y guarden la botella vacía.

:::archivo id="g7-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica:** el armado de la Guía 4 Tinkercad. Desde el 13 de noviembre, el circuito pasó a la Guía 8 (práctica de armado) y el programa final y la revisión de la abertura a la Guía 9; la pregunta de la bitácora sobre el circuito simulado también pasó a la Guía 8. Conviene tener las piezas impresas revisadas (soportes quitados) y la botella cortada antes de empezar. Campos propios (g7p-…).
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
- Compuerta nueva (12 de noviembre, ver Guía 2): la paleta queda 0,8 mm debajo de la salida y no choca con la torre al abrir. Si el brazo de la academia es más alto que el del plano y la paleta roza el embudo, poner un anillo de cartón debajo de la tapa del embudo. Las compuertas impresas antes (encastre de 5 mm) no reciben el brazo: hay que reimprimirlas.
- Si el servo baila en su hueco, una gota de silicona caliente en las pestañas lo fija (con ayuda del docente).
- Si no alcanza el tiempo, lo que falte del armado se termina al inicio de la Guía 8.
- Tiempo total: 25 + 15 + 50 + 15 + 5 + 10 = 120 minutos.
:::

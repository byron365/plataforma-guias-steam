---
titulo: La garra del futuro
guia: 14
sabado: 14
sesion: Proyección a Básico II
duracion: 120
---

# Guía 14 · La garra del futuro

## Objetivo del día

Probar un control nuevo para la garra (joystick), simular un circuito en la computadora y soñar cómo sería la versión 2.0 de nuestro proyecto.

**Al terminar tendremos:** la garra controlada con joystick, nuestra primera simulación en Wokwi y la lista de ideas para la garra 2.0.

## Materiales del equipo

- Garra completa con su circuito
- 1 módulo joystick analógico
- Computadora con internet (para Wokwi)

## Parte 1 · Repaso rápido (10 min)

Un joystick tiene **dos perillas adentro** (una para cada eje) y un botón.

- Al mover la palanca de izquierda a derecha, gira la perilla del eje **X**.
- Al moverla de arriba a abajo, gira la perilla del eje **Y**.
- Al apretar la palanca hacia abajo (como un clic), se presiona el botón.

:::pregunta id="g14-p1"
¿Qué creen que pase si lo conectamos donde estaban las perillas de la base y el hombro?
:::

## Parte 2 · ¡Joystick! (30 min)

Hagan todo con el USB y las pilas **desconectados**.

1. Desconecten las perillas de la base (A0) y del hombro (A1).
   - Saquen solo el cable que va de la pata del centro de cada una de esas dos perillas al Arduino (los de A0 y A1). Las demás perillas se quedan como estaban.
2. Conecten el joystick. El módulo tiene cinco pines con su nombre impreso al lado:
   - El pin **+5V** del joystick va a la fila **+** de abajo de la protoboard (la del 5V del Arduino), no a la de las pilas.
   - El pin **GND** va a la fila **−** de abajo.

| Pin del joystick | Va a |
| --- | --- |
| +5V | 5V del Arduino |
| GND | GND |
| VRx | A0 (base) |
| VRy | A1 (hombro) |
| SW (botón) | D2 (el de la rutina) |

   Para el pin **SW**: el cable que iba del botón de la rutina al pin D2 sácalo del botón y pásalo al pin SW del joystick (o pon un cable nuevo de SW a D2 y quita el del botón).

[IMAGEN 14.1: módulo joystick conectado al Arduino, con sus pines señalados]

3. **No cambien el código** y prueben. ¿Qué pasa?
   - Conecten el USB y las pilas. El Arduino ya tiene su último programa de la garra.
   - Muevan la palanca despacio hacia los lados y hacia arriba y abajo. Presionen la palanca para probar el botón.

:::pregunta id="g14-p2"
¿Por qué funcionó sin cambiar el programa?
:::

:::opciones id="g14-comodo"
Al soltar el joystick, regresa al centro y el brazo también. ¿Es cómodo para agarrar objetos?
- Sí
- No
:::

## Parte 3 · Control "paso a paso" (25 min)

Con el joystick es mejor que el brazo **avance mientras lo empujas** y se quede quieto al soltarlo. Cambien las líneas de la base en el modo manual por estas:

1. Abran su programa de la garra y guárdenlo como `equipo_NOMBRE_joystick` (**Archivo → Guardar como**).
2. En el modo manual (dentro de `} else {` en el `loop()`, o dentro de `modoManual()` si la crearon en la Guía 12), busquen las dos líneas de la base: `pB = leer(A0, ...);` y `base.write(pB);`.
3. Borren esas dos líneas y escriban en su lugar estas cuatro:

```cpp
  int x = analogRead(A0);
  if (x > 700 && pB < 180) pB++;  // empujar a un lado
  if (x < 300 && pB > 0) pB--;    // empujar al otro
  base.write(pB);
```

   ¿Qué hacen? Con el joystick suelto, la lectura está cerca de 512. Si la empujas a un lado pasa de 700 y la base avanza un grado en cada vuelta; si la empujas al otro baja de 300 y retrocede. Si está en medio, no cambia nada.

Hagan lo mismo para el hombro con `analogRead(A1)` y la variable `pH` (con sus límites).

4. Para el hombro: borren las líneas `pH = leer(A1, ...);` y `hombro.write(pH);` y escriban cuatro líneas iguales a las de la base, pero cambiando:
   - `x` por otro nombre, por ejemplo `y` (no pueden repetir el nombre `x`);
   - `A0` por `A1`;
   - `pB` por `pH` en todas partes;
   - `180` y `0` por el máximo y el mínimo seguros del hombro (de su tabla de la Guía 6);
   - `base.write` por `hombro.write`.
5. Suban el código y prueben: al empujar la palanca, el brazo avanza; al soltarla, se queda quieto.

Prueben la animación para ver cómo cambia el número mientras mueven la palanca:

:::animacion tipo="joystick"
:::

Ahora prueben el reto de los 5 objetos con cada forma de control y completen la tabla (para "Perillas", pueden usar su mejor tiempo de las guías anteriores):

| Control | ¿Cómo se siente? | Tiempo del reto (s) |
| --- | --- | --- |
| Perillas | | |
| Joystick directo | | |
| Joystick paso a paso | | |

## Parte 4 · Primera simulación en Wokwi (25 min)

En Básico II probaremos los circuitos en la computadora antes de armarlos. ¡Hoy lo intentamos!

La página de Wokwi está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Entren a **wokwi.com** y creen un proyecto nuevo de Arduino Uno.
   - Bajen hasta **Start from Scratch** y elijan **Arduino Uno**.
   - Se abre una pantalla con el código a la izquierda (`sketch.ino`) y el Arduino dibujado a la derecha.
2. Agreguen un servo y un potenciómetro con el botón "+".
   - El botón **+** azul está arriba del dibujo. Escriban **Servo** en el buscador y hagan clic en él. Repitan con **Potentiometer**.
   - Arrastren cada pieza para acomodarla cerca del Arduino.
3. Conéctenlos como en la guía 1 y peguen el código de la perilla de la guía 1.
   - Para hacer un cable: hagan clic en la punta de un pin y luego en el pin de destino. Para borrar un cable, hagan clic en él y presionen **Supr**.
   - **Servo:** pin **GND** → GND del Arduino; **V+** → 5V; **PWM** → pin **9**.
   - **Potenciómetro:** **VCC** → 5V; **GND** → GND; **SIG** (el del centro) → **A0**.
   - Código: abran la Guía 1 (Parte 5) en la plataforma, copien el código de la perilla y péguenlo en `sketch.ino`, reemplazando lo que trae.
4. Presionen "Play" y giren la perilla en la pantalla.
   - "Play" es el botón verde con un triángulo ▶, arriba del dibujo.
   - Hagan clic en la perilla dibujada y arrástrenla (o usen la barrita que aparece) para girarla. El servo debe moverse.
   - Para detener, presionen el botón de stop (cuadrado).

[IMAGEN 14.2: simulación en Wokwi con Arduino, servo y potenciómetro conectados]

:::pregunta id="g14-p3"
¿Qué ventajas tiene probar un circuito en la computadora antes de armarlo?
:::

## Parte 5 · Ideas para la garra 2.0 (20 min)

Piensen en grande. ¿Qué le agregarían a la garra?

Escriban al menos tres ideas, cada una en su fila, y al lado qué tendrían que aprender o comprar para hacerla. La primera fila es un ejemplo.

| Idea | ¿Qué necesitaríamos aprender o comprar? |
| --- | --- |
| Ejemplo: controlarla desde el celular | Un módulo Bluetooth y programación |
| | |
| | |
| | |

:::foto id="g14-dibujo"
Dibujo de cómo se vería nuestra garra 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] La garra funcionó con el joystick.
- [ ] Programamos el control paso a paso.
- [ ] Hicimos una simulación en Wokwi.
- [ ] Escribimos ideas para la garra 2.0.
:::

## Reto extra

Usen el botón del joystick para abrir y cerrar la pinza en lugar de la rutina: cada vez que se presiona, la pinza cambia de estado.

Pistas: guarden en una variable si la pinza está abierta o cerrada. Cuando `digitalRead(BOTON)` sea `LOW`, cambien esa variable al estado contrario, muevan la pinza a su ángulo de abierta o cerrada (de su tabla de límites) y esperen un poco (`delay(300)`) para que un solo clic no cuente dos veces.

## Bitácora final (5 min)

:::pregunta id="g14-b1"
En una frase: ¿qué fue para nosotros este proyecto?
:::

:::pregunta id="g14-b2"
¿Qué nos gustaría construir en Básico II?
:::

¡Felicidades, equipo! Construyeron, programaron y mejoraron un brazo robótico de verdad.

Antes de irse, suban `equipo_NOMBRE_joystick` y, si quieren guardar la simulación, descarguen el proyecto de Wokwi como `.zip` (en el menú de la flecha junto a **Save**, opción **Download project zip**) y súbanlo también.

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Momento ideal para entregar reconocimientos y tomar la foto final del grupo.
- Wokwi no necesita cuenta para simular; para guardar proyectos sí. Si no hay internet en el aula, esta parte puede hacerse como demostración del docente.
- Las ideas de la Parte 5 sirven para conectar con los proyectos de Básico II (simulación, programación textual y gemelos digitales).
- Tiempo total: 10 + 30 + 25 + 25 + 20 + 5 + 5 = 120 minutos.
:::

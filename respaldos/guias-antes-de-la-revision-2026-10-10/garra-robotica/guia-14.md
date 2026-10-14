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

:::pregunta id="g14-p1"
¿Qué creen que pase si lo conectamos donde estaban las perillas de la base y el hombro?
:::

## Parte 2 · ¡Joystick! (30 min)

1. Desconecten las perillas de la base (A0) y del hombro (A1).
2. Conecten el joystick:

| Pin del joystick | Va a |
| --- | --- |
| +5V | 5V del Arduino |
| GND | GND |
| VRx | A0 (base) |
| VRy | A1 (hombro) |
| SW (botón) | D2 (el de la rutina) |

[IMAGEN 14.1: módulo joystick conectado al Arduino, con sus pines señalados]

3. **No cambien el código** y prueben. ¿Qué pasa?

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

```cpp
  int x = analogRead(A0);
  if (x > 700 && pB < 180) pB++;  // empujar a un lado
  if (x < 300 && pB > 0) pB--;    // empujar al otro
  base.write(pB);
```

Hagan lo mismo para el hombro con `analogRead(A1)` y la variable `pH` (con sus límites).

:::animacion tipo="joystick"
:::

| Control | ¿Cómo se siente? | Tiempo del reto (s) |
| --- | --- | --- |
| Perillas | | |
| Joystick directo | | |
| Joystick paso a paso | | |

## Parte 4 · Primera simulación en Wokwi (25 min)

En Básico II probaremos los circuitos en la computadora antes de armarlos. ¡Hoy lo intentamos!

1. Entren a **wokwi.com** y creen un proyecto nuevo de Arduino Uno.
2. Agreguen un servo y un potenciómetro con el botón "+".
3. Conéctenlos como en la guía 1 y peguen el código de la perilla de la guía 1.
4. Presionen "Play" y giren la perilla en la pantalla.

[IMAGEN 14.2: simulación en Wokwi con Arduino, servo y potenciómetro conectados]

:::pregunta id="g14-p3"
¿Qué ventajas tiene probar un circuito en la computadora antes de armarlo?
:::

## Parte 5 · Ideas para la garra 2.0 (20 min)

Piensen en grande. ¿Qué le agregarían a la garra?

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

## Bitácora final (5 min)

:::pregunta id="g14-b1"
En una frase: ¿qué fue para nosotros este proyecto?
:::

:::pregunta id="g14-b2"
¿Qué nos gustaría construir en Básico II?
:::

¡Felicidades, equipo! Construyeron, programaron y mejoraron un brazo robótico de verdad.

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Momento ideal para entregar reconocimientos y tomar la foto final del grupo.
- Wokwi no necesita cuenta para simular; para guardar proyectos sí. Si no hay internet en el aula, esta parte puede hacerse como demostración del docente.
- Las ideas de la Parte 5 sirven para conectar con los proyectos de Básico II (simulación, programación textual y gemelos digitales).
- Tiempo total: 10 + 30 + 25 + 25 + 20 + 5 + 5 = 120 minutos.
:::

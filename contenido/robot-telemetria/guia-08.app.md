---
titulo: Armar el robot
guia: 8
sabado: 8
sesion: Construcción del prototipo
duracion: 120
---

# Guía 8 · Armar el robot

## Objetivo del día

Armar las piezas impresas con los motores, las ruedas y el sensor, y ubicar en la bandeja las baterías, el Arduino, el puente H L298N y la protoboard pequeña.

**Al terminar tendremos:** el robot armado sobre sus ruedas, con todo en su lugar para conectar el circuito en la Guía 9.

## Materiales del equipo

- Piezas impresas: chasis, soporte del sensor, 4 postes y bandeja
- 2 motores TT con sus ruedas, rueda loca, 4 tornillos M3 × 30 con tuerca (o 2 cinchos delgados) y 4 palitos de pincho
- Batería de los motores (2S, 7,4 V) en su portabaterías, con su fusible y su interruptor
- Pila de 9 V con su broche y plug, con un segundo interruptor
- Puente H L298N, protoboard pequeña, Arduino UNO y HC-SR04
- Pegamento caliente (silicona), cinta doble faz, tijeras o alicate

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · Revisar las piezas (15 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g8a-piezas"
- [ ] El portabaterías de los motores entra en el cerco de la bandeja.
- [ ] Los ojos del HC-SR04 asoman por los agujeros del soporte.
- [ ] Un palito de pincho pasa por un poste y por los agujeros del chasis y de la bandeja.
- [ ] Los tornillos (o el cincho) pasan por la ranura de la oreja y por los agujeros del motor.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar los bordes con una lija o pasar un clavo por el agujero.

## Parte 2 · El piso de abajo (45 min)

Miren la imagen del robot completo para ver dónde va cada cosa:

[IMAGEN 2.1A: robot diseñado en Tinkercad, con etiquetas: batería de los motores, bandeja, poste, pila de 9 V del Arduino, sensor HC-SR04 en su soporte, chasis, rueda loca, Arduino, puente H L298N y rueda y motor TT]

1. **Volteen el chasis:** las orejas y la columna quedan **abajo**.
2. **Los motores.**
   - Pongan cada motor debajo del chasis, por **fuera** de su oreja: la cara de arriba del motor pegada a la placa y el eje hacia **afuera**.
   - Los dos motores **en el mismo sentido**: con el eje hacia el frente del robot (el lado de la rueda loca). Si uno queda al revés, las ruedas no quedan una frente a la otra.
   - Pasen los dos tornillos por los agujeros del motor y por la ranura de la oreja, y pongan las tuercas. Si usan cincho, páselo por los dos agujeros del motor y por la ranura, y apriételo.
   - Los cables de los motores suben por el **paso de los cables** del chasis.
3. **Las ruedas:** a presión en el eje de cada motor, hasta el fondo.
4. **La rueda loca:** péguenla (o atorníllenla) en la punta de la columna, en el frente.
5. **El sensor.**
   - Metan el HC-SR04 en su soporte desde atrás, con los ojos asomando por los agujeros y los pines hacia arriba.
   - Volteen el chasis otra vez (ruedas abajo) y peguen el soporte con silicona **sobre** el chasis, en el borde del frente, mirando hacia adelante.
6. **Los postes:** peguen los cuatro postes sobre los agujeros del chasis, con un palito de pincho adentro de cada uno para que queden alineados.
7. **La pila de 9 V del Arduino:** sobre el chasis, entre los postes, con cinta doble faz o velcro. Su cable sube a la bandeja por el paso de los cables.

✔ **Revisa:** pongan el robot en el piso. Debe quedar **horizontal**, apoyado en las dos ruedas y en la rueda loca.

## Parte 3 · La bandeja (45 min)

1. **Ubiquen las piezas en la bandeja** (con cinta doble faz gruesa o una gota de silicona en las esquinas): el portabaterías en su cerco, adelante; el Arduino atrás a la izquierda (mirando el robot desde atrás), acostado a lo largo y con su jack hacia el borde; el L298N atrás a la derecha y la protoboard pequeña delante del L298N. El paso de los cables de la bandeja queda libre, entre el Arduino y el portabaterías. Los dos interruptores y el fusible, en un borde de la bandeja.
2. **Pongan la bandeja** sobre los postes: los palitos entran en sus agujeros. Corten lo que sobre de cada palito y pongan una gota de silicona arriba.

Las conexiones (baterías, L298N, motores y sensor) se hacen en la Guía 9, con los diagramas paso a paso.

## ¿Lo logramos? (5 min)

:::checklist id="g8a-logramos"
- [ ] El robot queda horizontal sobre sus ruedas.
- [ ] La bandeja está sobre los postes, con el portabaterías, el Arduino, el L298N y la protoboard pequeña en su lugar.
- [ ] El sensor está en su soporte y sus cables llegan a la bandeja.
:::

## Bitácora (10 min)

:::foto id="g8a-foto"
Foto del robot armado.
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con app (11 sábados):** es la Guía 7 de la Práctica; va después de la simulación y de la app. Campos propios (g8a-…). Desde el 13 de noviembre, solo el armado mecánico: las conexiones de las baterías, el L298N, los motores, el sensor y el divisor pasaron a la Guía 9 (práctica de armado) y la prueba de motores a la Guía 10.
- **Desde el 23 de octubre:** el armado de las piezas impresas, la potencia, los motores y el sensor de la Guía 4 normal y el divisor de la Guía 3 normal. Desde el 23 de octubre usa **dos fuentes separadas** (batería 2S → fusible → interruptor → L298N; pila de 9 V → interruptor → jack del Arduino) y el **puente H L298N** en lugar del TB6612 y el LM2596. Mismos pines del Arduino que la versión completa (D5, D7, D8, D6, D4, D9), así el código solo pierde STBY. El HC-05 va en la Guía 9.
- Si los motores TT vienen sin cables, soldarlos antes de la clase.
- Si el robot no queda horizontal, revisar el alto de la columna (Guía 2): se puede compensar con una arandela o con silicona debajo de la rueda loca.
- Baterías de litio: siempre en portabaterías con protección, no perforarlas ni cargarlas sin supervisión.
- Si un equipo no termina, lo que falte del armado se hace al inicio de la Guía 9.
- Tiempo total: 15 + 45 + 45 + 5 + 10 = 120 minutos.
:::

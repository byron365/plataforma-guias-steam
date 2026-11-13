---
titulo: Conectamos el circuito de la garra
guia: 9
sabado: 9
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 9 · Conectamos el circuito de la garra

## Objetivo del día

Conectar el circuito de la garra paso a paso, siguiendo los diagramas: las dos fuentes con el GND común, los cuatro servos, las cuatro perillas y el pulsador. Es el mismo circuito del simulador.

**Al terminar tendremos:** todo el circuito de la garra conectado y revisado, listo para subir el programa final en la Guía 10.

## Materiales del equipo

- Garra armada (Guía 8), con los cuatro servos etiquetados B, H, C y P
- Arduino UNO, protoboard, cables macho–macho, 4 potenciómetros de 10 kΩ y 1 pulsador
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos
- Destornillador pequeño y cinta para etiquetas
- El circuito simulado abierto en Tinkercad (Guía 6)

**Regla de oro:** todo el sábado, el USB **desconectado** y la fuente **desenchufada**. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

- Cada agujero del centro de la protoboard tiene su letra (A a J) y su número (1 a 30), impresos en la protoboard: **A27** es la letra A en el número 27.
- Las etiquetas blancas dicen dónde va cada punta: **D3** es el pin 3 del Arduino, **A0** es el pin A0 (abajo, en ANALOG IN) y **fila −** es cualquier agujero de una fila −.
- Los cables con la punta de cobre van **atornillados** en el jack.
- El dibujo no muestra dónde va cada pieza: los servos se quedan en la garra; sus cables llegan hasta la protoboard.

[IMAGEN 9.10A: circuito completo de la garra: la fuente de 5 V en las filas de arriba, el Arduino en las de abajo, el GND común, los 4 servos, las 4 perillas y el pulsador]

## Parte 2 · Las dos fuentes y el GND común (20 min)

Cuatro servos piden más corriente de la que da el Arduino: por eso usan una **fuente de 5 V aparte**. En la protoboard las filas se usan así:

| Filas | Qué llevan | Qué se conecta ahí |
| --- | --- | --- |
| + y − de **arriba** | La fuente de 5 V | Los 4 servos |
| + y − de **abajo** | El 5V y el GND del Arduino | Las 4 perillas y el pulsador |
| Un cable entre las dos filas **−** | El **GND común** | — |

**Nunca se unen las dos filas +:** una tiene los 5 V de la fuente y la otra los del Arduino.

**Paso 1: el Arduino.** Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.

[IMAGEN 9.1A: paso 1, 5V y GND del Arduino a las filas + y − de abajo]

**Paso 2: la fuente.** La fuente de 5 V se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**. Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten.

1. Un cable del tornillo **+** del jack a la **fila +** de arriba.
2. Un cable del tornillo **−** del jack a la **fila −** de arriba.

[IMAGEN 9.2A: paso 2, la fuente de 5 V en el jack hembra; el + del jack a la fila + de arriba y el − a la fila − de arriba]

**Paso 3: GND común.** Un cable de la **fila −** de arriba a la **fila −** de abajo.

[IMAGEN 9.3A: paso 3, un cable une la fila − de arriba con la fila − de abajo; las filas + no se unen]

## Parte 3 · Los cuatro servos (30 min)

Cada servo tiene un conector de 3 (café, rojo y naranja). Metan tres cables macho–macho en su conector:

| Servo | Café | Rojo | Naranja |
| --- | --- | --- | --- |
| Base (B) | fila − de arriba | fila + de arriba | D3 |
| Hombro (H) | fila − de arriba | fila + de arriba | D5 |
| Codo (C) | fila − de arriba | fila + de arriba | D6 |
| Pinza (P) | fila − de arriba | fila + de arriba | D9 |

**Paso 4: servo de la base (B).** Naranja → **D3**.

[IMAGEN 9.4A: paso 4, servo de la base: café a la fila − y rojo a la fila + de arriba, naranja a D3]

**Paso 5: servo del hombro (H).** Naranja → **D5**.

[IMAGEN 9.5A: paso 5, servo del hombro: café a la fila − y rojo a la fila + de arriba, naranja a D5]

**Paso 6: servo del codo (C).** Naranja → **D6**.

[IMAGEN 9.6A: paso 6, servo del codo: café a la fila − y rojo a la fila + de arriba, naranja a D6]

**Paso 7: servo de la pinza (P).** Naranja → **D9**.

[IMAGEN 9.7A: paso 7, servo de la pinza: café a la fila − y rojo a la fila + de arriba, naranja a D9]

**✔ Revisa:** ningún servo va en el 5V del Arduino: todos toman la energía de las filas de **arriba**.

## Parte 4 · Las cuatro perillas (20 min)

**Paso 8.** Cada perilla tiene 3 patas: la de la izquierda va a la **fila +** de abajo, la del centro a su pin y la de la derecha a la **fila −** de abajo.

1. Claven las cuatro perillas en la mitad de abajo de la protoboard, con las patas en la fila **F**: pinza en F4–F8, codo en F10–F14, hombro en F16–F20 y base en F22–F26.
2. Desde la fila **J**, debajo de cada pata: la izquierda a la **fila +** de abajo y la derecha a la **fila −** de abajo.
3. La del centro, a su pin: base **A0**, hombro **A1**, codo **A2**, pinza **A3**.
4. Márquenlas con cinta, en el mismo orden que los servos del dibujo.

[IMAGEN 9.8A: paso 8, las cuatro perillas: patas izquierdas a la fila +, derechas a la fila − y las del centro a A3, A2, A1 y A0]

## Parte 5 · El pulsador (10 min)

**Paso 9.** Va sobre la canaleta del centro, con sus patas en **E27**, **F27**, **E29** y **F29**.

1. Un cable de **A27** al pin **D2**.
2. Un cable de **J29** a la **fila −** de abajo: es la pata en diagonal.

[IMAGEN 9.9A: paso 9, pulsador sobre la canaleta, cable de A27 a D2 y de J29 a la fila − de abajo]

## Parte 6 · Revisión cable por cable (15 min)

Tengan la simulación de Tinkercad abierta. Una persona lee cada fila de la tabla y la otra sigue el cable con el dedo:

| Qué | Conexión |
| --- | --- |
| Jack hembra + / − | Fila **+** de arriba / fila **−** de arriba |
| Arduino 5V / GND | Fila **+** de abajo / fila **−** de abajo |
| GND común | Un cable de la fila **−** de arriba a la fila **−** de abajo. **Nunca unas las dos filas +.** |
| Servos (rojo / café / naranja) | Fila + de arriba / fila − de arriba / su pin: base **D3**, hombro **D5**, codo **D6**, pinza **D9** |
| Perillas (izquierda / centro / derecha) | Fila + de abajo / su pin: base **A0**, hombro **A1**, codo **A2**, pinza **A3** / fila − de abajo |
| Pulsador | Una pata → **D2** · la pata en diagonal → fila − de abajo |

:::checklist id="g9a-revision"
- [ ] El + del jack va a la fila + de arriba y el − a la fila − de arriba.
- [ ] GND común unido.
- [ ] Ningún servo en el 5V del Arduino.
- [ ] Cada cable naranja en su pin.
- [ ] Cada perilla en su pin A.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9a-logramos"
- [ ] Las dos fuentes están conectadas, con el GND común y sin unir las filas +.
- [ ] Los cuatro servos, las cuatro perillas y el pulsador están conectados.
- [ ] El USB y la fuente siguen desconectados.
:::

## Bitácora (10 min)

:::foto id="g9a-foto"
Foto de la protoboard con todo el circuito de la garra.
:::

:::pregunta id="g9a-b1"
¿Qué problema tuvimos al armar y cómo lo resolvimos?
:::

:::docente
- **Versión Blender práctica (11 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Antes era la Parte 4 de la Guía 8. Campos propios (g9a-…); g9a-revision era g8p-revision. La pregunta de la bitácora es la misma de la Guía 8.
- Diagramas hechos con `herramientas/diagramas_armado.py garra` (dibujos de Fritzing, CC BY-SA 3.0; las perillas vistas desde arriba y el jack son dibujos propios: el potenciómetro de Fritzing está de lado y tapa media protoboard). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 9.1A a 9.10A.
- En el dibujo, las perillas van de izquierda a derecha en el orden pinza, codo, hombro y base (y los servos también), para que sus cables a A3, A2, A1 y A0 no se crucen.
- La fuente de 5 V con jack hembra reemplaza al portapilas de 4 AA (decisión de Bairon). Que sea de al menos 2 A: cuatro servos juntos piden bastante corriente.
- Revisar el GND común de cada equipo antes de que enchufen la fuente: es el error más frecuente.
- Tiempo total: 10 + 20 + 30 + 20 + 10 + 15 + 5 + 10 = 120 minutos.
:::

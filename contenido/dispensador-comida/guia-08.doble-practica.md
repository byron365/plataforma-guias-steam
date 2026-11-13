---
titulo: Armamos el circuito doble paso a paso
guia: 8
sabado: 8
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 8 · Armamos el circuito doble paso a paso

## Objetivo del día

Conectar el circuito real del dispensador doble, componente por componente, siguiendo los diagramas: el mismo del simulador, con el módulo relé, la bomba y su fuente de 5 V.

**Al terminar tendremos:** todos los componentes conectados y revisados cable por cable, listos para subir el programa final en la Guía 9.

## Materiales del equipo

- Dispensador doble armado (Guía 7): servo en su repisa y bomba en su recipiente
- Arduino UNO y protoboard
- 2 botones, LED, resistencia de 220 Ω y buzzer
- Módulo relé de 5 V
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos
- Cables macho–macho y macho–hembra, cables para atornillar, cinta aislante y destornillador pequeño
- El circuito simulado abierto en Tinkercad (Guía 6)

> **Seguridad:** el líquido y la electrónica no se llevan bien. El Arduino, la protoboard y el relé van **del lado del cereal**, lejos del líquido. Todo el sábado, el USB queda **desconectado** y la fuente de 5 V **desenchufada**.

## Parte 1 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

**Primero, la protoboard.** En los bordes tiene filas largas marcadas con **+** (línea roja) y **−** (línea azul): todos los agujeros de una fila larga están conectados. En el centro, a cada lado de la canaleta, hay filas cortas de 5 agujeros conectados entre sí.

- Cada agujero del centro tiene un **nombre**: su letra (A a J, de arriba abajo) y su número (1 a 30, de izquierda a derecha). Por ejemplo, **E13** es la letra E en el número 13. Las letras y los números vienen impresos en la protoboard.
- Las etiquetas blancas de los dibujos dicen dónde va cada punta: **D4** es el pin 4 del Arduino, **E13** es un agujero y **fila −** es cualquier agujero de una fila −.
- Arriba y abajo hay una fila **+** y una fila **−**. Las de arriba **no** están unidas con las de abajo: en el paso 1 se unen con dos cables.

[IMAGEN 8.9AD: circuito completo del dispensador doble: LED, buzzer, botones C y L, servo, módulo relé, jack hembra con la fuente de 5 V y la bomba]

## Parte 2 · Las filas + y − (10 min)

**Paso 1.**

1. Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.
2. Un cable rojo de la fila **+** de abajo a la fila **+** de arriba y uno negro de la fila **−** de abajo a la fila **−** de arriba, en el extremo derecho de la protoboard.

[IMAGEN 8.1AD: paso 1, 5V y GND del Arduino a las filas + y − de abajo y dos cables que las unen con las de arriba]

## Parte 3 · LED y buzzer (15 min)

**Paso 2: LED.** Pata larga → resistencia → pin; pata corta → fila −.

1. Doblen un poco las patas del LED. La **pata corta** va a la **fila −** de arriba y la **pata larga** a **A9**.
2. Resistencia de 220 Ω de **C9** a **C13**.
3. Un cable de **E13** al pin **D4**.

[IMAGEN 8.2AD: paso 2, LED con la pata corta en la fila − y la pata larga en A9, resistencia de C9 a C13 y cable de E13 a D4]

**Paso 3: buzzer.** La pata **+** está marcada con + o es la más larga.

1. Claven el buzzer con la pata **+** en **C2** y la **−** en **C5**.
2. Un cable de **E2** al pin **D5** y otro de **A5** a la **fila −** de arriba.

[IMAGEN 8.3AD: paso 3, buzzer con la + en C2 y la − en C5, cable de E2 a D5 y de A5 a la fila −]

## Parte 4 · Los botones C y L (15 min)

Marquen cada botón con un papelito o cinta: **C** (cereal) y **L** (líquido).

**Paso 4: botón del cereal (C).** Patas en **A20**, **D20**, **A22** y **D22**. Cable de **E20** a **D2** y de **E22** a la **fila −** de abajo (la pata en diagonal).

[IMAGEN 8.4AD: paso 4, botón del cereal con sus patas en A20, D20, A22 y D22, cable de E20 a D2 y de E22 a la fila − de abajo]

**Paso 5: botón del líquido (L).** Patas en **A15**, **D15**, **A17** y **D17**. Cable de **E15** a **D3** y de **E17** a la **fila −** de abajo.

[IMAGEN 8.5AD: paso 5, botón del líquido con sus patas en A15, D15, A17 y D17, cable de E15 a D3 y de E17 a la fila − de abajo]

## Parte 5 · El servo (10 min)

**Paso 6.** El cable del servo baja por detrás de la torre. En su conector, tres cables macho–macho: naranja → **D9**, rojo → **fila +** de abajo y café → **fila −** de abajo.

[IMAGEN 8.6AD: paso 6, servo de la compuerta: naranja a D9, rojo a la fila + y café a la fila − de abajo]

## Parte 6 · El módulo relé (15 min)

El relé real es un **módulo**: de un lado tiene **tres pines** (VCC, GND e IN) y del otro **tres tornillos** (COM, NO y NC). Busquen los nombres impresos en su módulo: el orden de los pines puede ser distinto al del dibujo.

**Paso 7.** Con cables macho–hembra (la punta hembra en el pin del módulo):

1. **IN** → **D8**.
2. **GND** → **fila −** de arriba.
3. **VCC** → **fila +** de arriba.

[IMAGEN 8.7AD: paso 7, módulo relé: IN a D8, GND a la fila − y VCC a la fila + de arriba]

## Parte 7 · Fuente, jack y bomba (20 min)

La fuente de 5 V se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**. Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten. **NC** no se usa.

**Paso 8.**

1. Un cable del tornillo **+** del jack al tornillo **COM** del relé.
2. Un cable del tornillo **NO** del relé al cable **rojo** de la bomba.
3. El cable **negro** de la bomba al tornillo **−** del jack.
4. Donde se unan dos cables pelados (por ejemplo, en los cables de la bomba), tuérzanlos juntos y cúbranlos con cinta aislante.
5. Pongan el plug de la fuente en el jack, **sin enchufarla** a la pared: se enchufa en la Guía 9.

[IMAGEN 8.8AD: paso 8, fuente de 5 V en el jack hembra; jack + a COM del relé, NO del relé al cable rojo de la bomba y cable negro de la bomba al jack −]

## Parte 8 · Revisión cable por cable (10 min)

Abran su circuito simulado en Tinkercad. Una persona lee cada fila de la tabla y la otra sigue el cable con el dedo en el circuito real:

| Componente | Conexión |
| --- | --- |
| Filas de la protoboard | 5V → fila + · GND → fila − |
| Servo de la compuerta | Naranja → D9 · Rojo → fila + · Café → fila − |
| Botón del cereal | Una pata → D2 · la pata en diagonal → fila − |
| Botón del líquido | Una pata → D3 · la pata en diagonal → fila − |
| LED | Pata larga → 220 Ω → D4 · pata corta → fila − |
| Buzzer | + → D5 · − → fila − |
| Módulo relé VCC / GND / IN | fila + / fila − / **D8** |
| Jack hembra + | Relé **COM** |
| Relé **NO** | Bomba + (cable rojo) |
| Bomba − (cable negro) | Jack hembra − |

:::checklist id="g8ad-revision"
- [ ] El Arduino, la protoboard y el relé están lejos del líquido.
- [ ] Los botones están marcados: C en D2 y L en D3.
- [ ] El LED tiene su resistencia en la misma fila que la pata larga.
- [ ] El relé tiene IN en D8, GND en la fila − y VCC en la fila +.
- [ ] Los tornillos del jack y del relé están apretados y las uniones de la bomba tapadas con cinta.
- [ ] La fuente está desenchufada.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8ad-logramos"
- [ ] Conectamos todos los componentes siguiendo los diagramas.
- [ ] Revisamos cada cable con la tabla y con el simulador.
- [ ] El relé, la bomba y la fuente están conectados, con la fuente desenchufada.
:::

## Bitácora (10 min)

:::foto id="g8ad-foto"
Foto del circuito completo: la protoboard, el relé y el jack.
:::

:::pregunta id="g8ad-b1"
¿En qué fue distinto el relé real del relé del simulador?
:::

:::docente
- **Versión doble práctica, guía de armado (tipo: armado):** antes era la Parte 2 de la Guía 7. Ahora tiene un sábado propio para conectar con calma y revisar. Campos propios (g8ad-…).
- g8ad-b1 (antes g7dp-b1): el del simulador es un relé suelto (bobina en el pin 8); el real es un módulo con pines VCC, GND e IN y tornillos COM, NO y NC, que trae adentro lo necesario para que el pin del Arduino lo pueda encender.
- Diagramas hechos con `herramientas/diagramas_armado.py dispensador-doble` (dibujos de Fritzing, CC BY-SA 3.0; el módulo relé, el jack hembra y la bomba son dibujos propios porque Fritzing no los trae). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 8.1AD a 8.9AD.
- El orden de los pines del módulo relé cambia según la marca (VCC, GND, IN o DC+, DC−, IN): que se guíen por las letras impresas.
- El LED va directo en la protoboard con las patas dobladas; los botones en las filas A y D de un mismo lado (no sobre la canaleta como en Tinkercad).
- En el dibujo, el cable de E17 (botón L) pasa por encima del cable de D2: en la protoboard real no importa.
- Si no alcanza el tiempo, la revisión se termina al inicio de la Guía 9, antes de conectar el USB y enchufar la fuente.
- Tiempo total: 10 + 10 + 15 + 15 + 10 + 15 + 20 + 10 + 5 + 10 = 120 minutos.
:::

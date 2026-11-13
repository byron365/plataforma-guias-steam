---
titulo: Armamos el circuito paso a paso
guia: 8
sabado: 8
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 8 · Armamos el circuito paso a paso

## Objetivo del día

Conectar el circuito real del puente, componente por componente, siguiendo los diagramas. Es el mismo circuito que ya funciona en el simulador.

**Al terminar tendremos:** todos los componentes del puente conectados al Arduino y revisados cable por cable, listos para subir el programa en la Guía 9.

## Materiales del equipo

- Puente armado sobre la base (Guía 7): LEDs y buzzer en sus torres, sensor en su soporte y servos montados
- Arduino UNO, protoboard y eliminador de 9 V
- 3 resistencias de 220 Ω y el botón
- Cables macho–macho y macho–hembra
- Cinta adhesiva para marcar y para pegar cables a la base
- El circuito simulado abierto en Tinkercad (Guía 6)

**Regla de oro:** el Arduino se queda **desconectado** (sin USB ni eliminador) todo el sábado. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

**Primero, la protoboard.** En los bordes tiene filas largas marcadas con **+** (línea roja) y **−** (línea azul): todos los agujeros de una fila larga están conectados. En el centro, a cada lado de la canaleta, hay filas cortas de 5 agujeros conectados entre sí.

- Cada agujero del centro tiene un **nombre**: su letra (A a J, de arriba abajo) y su número (1 a 30, de izquierda a derecha). Por ejemplo, **E12** es la letra E en el número 12. Las letras y los números vienen impresos en la protoboard.
- Las etiquetas blancas de los dibujos dicen dónde va cada punta: **D4** es el pin 4 del Arduino, **E12** es un agujero y **fila −** es cualquier agujero de una fila −.
- Arriba y abajo hay una fila **+** y una fila **−**. Las de arriba **no** están unidas con las de abajo: en el paso 1 se unen con dos cables.

**Los cables:** macho–hembra para lo que está en las torres y en el soporte del sensor (la punta hembra en la pata), y macho–macho para todo lo demás.

El dibujo no muestra dónde va cada pieza sobre la base: las torres, el sensor y los servos se quedan donde los pusieron en la Guía 7.

[IMAGEN 8.11A: circuito completo del puente en la protoboard, con el semáforo, el buzzer, el botón, el sensor, los dos servos y el eliminador]

## Parte 2 · Las filas + y − (10 min)

**Paso 1.**

1. Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.
2. Un cable rojo de la fila **+** de abajo a la fila **+** de arriba y uno negro de la fila **−** de abajo a la fila **−** de arriba, en el extremo derecho de la protoboard.

[IMAGEN 8.1A: paso 1, 5V y GND del Arduino a las filas + y − de abajo y dos cables que las unen con las de arriba]

**✔ Revisa:** el rojo siempre en una fila **+** y el negro en una fila **−**.

## Parte 3 · El semáforo (25 min)

Cada LED llega desde la torre con dos cables macho–hembra (la pata larga ya está marcada con cinta). Como en el simulador: pata larga → resistencia → pin; pata corta → fila −.

**Paso 2: LED rojo.**

1. Cable de la **pata corta** → **fila −** de arriba.
2. Cable de la **pata larga** → **A16**.
3. Resistencia de 220 Ω de **C12** a **C16** (una pata en cada uno).
4. Un cable de **E12** al pin **D4** del Arduino.

[IMAGEN 8.2A: paso 2, LED rojo: pata corta a la fila −, pata larga a A16, resistencia de C12 a C16 y cable de E12 a D4]

**Paso 3: LED amarillo.** Igual, cinco números más a la derecha: pata corta → **fila −**, pata larga → **A21**, resistencia de **C17** a **C21** y cable de **E17** a **D3**.

[IMAGEN 8.3A: paso 3, LED amarillo: pata larga a A21, resistencia de C17 a C21 y cable de E17 a D3]

**Paso 4: LED verde.** Pata corta → **fila −**, pata larga → **A26**, resistencia de **C22** a **C26** y cable de **E22** a **D2**.

[IMAGEN 8.4A: paso 4, LED verde: pata larga a A26, resistencia de C22 a C26 y cable de E22 a D2]

**✔ Revisa:** sigue cada cable con el dedo. Un error muy común es que la resistencia quede en una fila distinta de la pata larga.

## Parte 4 · Buzzer y botón (15 min)

**Paso 5: buzzer.** Llega desde su torre con dos cables macho–hembra (la **+** marcada con cinta).

1. Cable de la **+** → **A8**. Cable de la **−** → **fila −** de arriba.
2. Un cable de **E8** al pin **D5**.

[IMAGEN 8.5A: paso 5, buzzer: + a A8, − a la fila − y cable de E8 a D5]

**Paso 6: botón.**

1. Clava el botón con sus 4 patas en **B2**, **E2**, **B4** y **E4**.
2. Un cable de **A2** al pin **D6**.
3. Un cable de **A4** a la **fila −** de arriba: es la pata en diagonal a la del pin.

[IMAGEN 8.6A: paso 6, botón con sus patas en B2, E2, B4 y E4, cable de A2 a D6 y de A4 a la fila −]

## Parte 5 · El sensor (15 min)

**Paso 7.** El sensor llega desde su soporte con cuatro cables macho–hembra. Los nombres de los pines vienen escritos en el sensor:

| Pin del sensor | Va a |
| --- | --- |
| Vcc | fila + de arriba |
| Trig | D7 |
| Echo | D8 |
| GND | fila − de arriba |

[IMAGEN 8.7A: paso 7, sensor HC-SR04: Vcc a la fila +, Trig a D7, Echo a D8 y GND a la fila −]

**✔ Revisa:** Trig y Echo se cruzan fácilmente. Trig va al **7** y Echo al **8**.

## Parte 6 · Los servos y el eliminador (15 min)

El cable de cada servo termina en un conector de 3 agujeros (café, rojo y naranja). De ahí salen tres cables macho–macho. Usen la cinta **I** y **D** de la Guía 7 para no confundirlos.

**Paso 8: servo izquierdo (orilla B).** Naranja → **D9**, rojo → **fila +** de abajo, café → **fila −** de abajo.

[IMAGEN 8.8A: paso 8, servo izquierdo: naranja a D9, rojo a la fila + y café a la fila − de abajo]

**Paso 9: servo derecho (orilla A).** Naranja → **D10**, rojo → **fila +** de abajo, café → **fila −** de abajo.

[IMAGEN 8.9A: paso 9, servo derecho: naranja a D10, rojo a la fila + y café a la fila − de abajo]

- Los cables de la orilla B (servo izquierdo y buzzer) cruzan el río por el borde de atrás de la base, pegados planos con cinta. Si un cable no alcanza, únanlo con otro.

**Paso 10: eliminador.** Pongan la punta del eliminador de 9 V en el **jack** del Arduino, sin enchufarlo a la pared. Se enchufa en la Guía 9.

[IMAGEN 8.10A: paso 10, eliminador de 9 V en el jack del Arduino]

## Parte 7 · Revisión cable por cable (15 min)

Abran su circuito simulado en Tinkercad. Una persona lee cada fila de la tabla y la otra sigue el cable con el dedo en el circuito real:

| Componente | Conexión |
| --- | --- |
| LED verde / amarillo / rojo | Pata larga → resistencia de 220 Ω → D2 / D3 / D4 · pata corta → fila − |
| Buzzer | + → D5 · − → fila − |
| Botón | Una pata → D6 · la pata en diagonal → fila − |
| Sensor HC-SR04 | Vcc → fila + · Trig → D7 · Echo → D8 · GND → fila − |
| Servo izquierdo / derecho | Naranja → D9 / D10 · Rojo → fila + · Café → fila − |

:::checklist id="g8a-revision"
- [ ] 5V y GND llegan a las filas + y −, y las de arriba están unidas con las de abajo.
- [ ] Los tres LEDs tienen su resistencia en la misma fila que la pata larga.
- [ ] El buzzer y el botón están en D5 y D6.
- [ ] Trig está en D7 y Echo en D8.
- [ ] Los servos están en D9 (izquierdo) y D10 (derecho).
- [ ] Ningún cable rojo toca una fila − ni un cable negro una fila +.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8a-logramos"
- [ ] Conectamos todos los componentes siguiendo los diagramas.
- [ ] Revisamos cada cable con la tabla y con el simulador.
- [ ] Los cables que cruzan el río están pegados con cinta.
:::

## Bitácora (10 min)

:::foto id="g8a-foto"
Foto de la protoboard con todo el circuito conectado.
:::

:::pregunta id="g8a-b1"
¿En qué les ayudó tener el circuito simulado al conectar el circuito real?
:::

:::docente
- **Versión Tinkercad práctica, guía de armado (tipo: armado):** antes era la Parte 5 de la Guía 7. Ahora tiene un sábado propio para conectar con calma y revisar. Campos propios (g8a-…).
- Diagramas hechos con `herramientas/diagramas_armado.py` (dibujos de las piezas de Fritzing, CC BY-SA 3.0, con el crédito en cada imagen). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 8.1A a 8.11A.
- En la protoboard real, el botón va en las filas B y E de un mismo lado (patas en B2, E2, B4 y E4), y no sobre la canaleta como en Tinkercad. Funciona igual: las patas del mismo número están unidas dentro del botón.
- Las dos uniones entre las filas + y − de arriba y de abajo (paso 1) hacen falta porque en la protoboard de 400 no están unidas por dentro.
- El orden de las filas de la protoboard es una sugerencia para que los cables no se crucen. Si un equipo usa otras filas, lo importante es la tabla de la Parte 7.
- Errores comunes: LED al revés, resistencia en una fila distinta de la pata larga, Trig y Echo cruzados, un servo en el pin del otro.
- Si no alcanza el tiempo, la revisión se termina al inicio de la Guía 9, antes de conectar el USB.
- Tiempo total: 10 + 10 + 25 + 15 + 15 + 15 + 15 + 5 + 10 = 120 minutos.
:::

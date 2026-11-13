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

Conectar el circuito real del dispensador, componente por componente, siguiendo los diagramas. Es el mismo circuito que ya funciona en el simulador.

**Al terminar tendremos:** todos los componentes del dispensador conectados al Arduino y revisados cable por cable, listos para subir el programa final en la Guía 9.

## Materiales del equipo

- Dispensador armado (Guía 7), con el servo colgando de su repisa
- Arduino UNO y protoboard
- Botón, LED, resistencia de 220 Ω y buzzer
- Cables macho–macho
- El circuito simulado abierto en Tinkercad (Guía 6)

**Regla de oro:** el Arduino se queda **desconectado** del USB todo el sábado. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

**Primero, la protoboard.** En los bordes tiene filas largas marcadas con **+** (línea roja) y **−** (línea azul): todos los agujeros de una fila larga están conectados. En el centro, a cada lado de la canaleta, hay filas cortas de 5 agujeros conectados entre sí.

- Cada agujero del centro tiene un **nombre**: su letra (A a J, de arriba abajo) y su número (1 a 30, de izquierda a derecha). Por ejemplo, **E13** es la letra E en el número 13. Las letras y los números vienen impresos en la protoboard.
- Las etiquetas blancas de los dibujos dicen dónde va cada punta: **D4** es el pin 4 del Arduino, **E13** es un agujero y **fila −** es cualquier agujero de una fila −.
- Arriba y abajo hay una fila **+** y una fila **−**. Las de arriba **no** están unidas con las de abajo: en el paso 1 se unen con dos cables.

Pongan la protoboard y el Arduino al lado de la torre, en el frente, donde se vean el botón y el LED.

[IMAGEN 8.6A: circuito completo del dispensador en la protoboard, con el LED, el buzzer, el botón y el servo de la compuerta]

## Parte 2 · Las filas + y − (10 min)

**Paso 1.**

1. Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.
2. Un cable rojo de la fila **+** de abajo a la fila **+** de arriba y uno negro de la fila **−** de abajo a la fila **−** de arriba, en el extremo derecho de la protoboard.

[IMAGEN 8.1A: paso 1, 5V y GND del Arduino a las filas + y − de abajo y dos cables que las unen con las de arriba]

**✔ Revisa:** el rojo siempre en una fila **+** y el negro en una fila **−**.

## Parte 3 · El LED (25 min)

Como en el simulador: pata larga → resistencia → pin; pata corta → fila −.

**Paso 2.**

1. Doblen un poco las patas del LED. La **pata corta** va a la **fila −** de arriba y la **pata larga** a **A9**.
2. Resistencia de 220 Ω de **C9** a **C13** (una pata en cada uno).
3. Un cable de **E13** al pin **D4** del Arduino.

[IMAGEN 8.2A: paso 2, LED con la pata corta en la fila − y la pata larga en A9, resistencia de C9 a C13 y cable de E13 a D4]

**✔ Revisa:** un error muy común es que la resistencia quede en una fila distinta de la pata larga.

## Parte 4 · Buzzer y botón (20 min)

**Paso 3: buzzer.** La pata **+** del buzzer está marcada con + o es la más larga.

1. Claven el buzzer con la pata **+** en **C2** y la **−** en **C5**.
2. Un cable de **E2** al pin **D5**.
3. Un cable de **A5** a la **fila −** de arriba.

[IMAGEN 8.3A: paso 3, buzzer con la + en C2 y la − en C5, cable de E2 a D5 y de A5 a la fila −]

**Paso 4: botón.**

1. Claven el botón con sus 4 patas en **A17**, **D17**, **A19** y **D19**.
2. Un cable de **E17** al pin **D2**.
3. Un cable de **E19** a la **fila −** de abajo: es la pata en diagonal a la del pin.

[IMAGEN 8.4A: paso 4, botón con sus patas en A17, D17, A19 y D19, cable de E17 a D2 y de E19 a la fila − de abajo]

## Parte 5 · El servo (15 min)

**Paso 5.** El cable del servo baja por detrás de la torre hasta la protoboard. En el servo real, los colores dicen qué es cada cable: **naranja** es la señal, **rojo** la potencia y **café** la tierra.

1. Metan tres cables macho–macho en su conector.
2. Naranja → **D9**, rojo → **fila +** de abajo y café → **fila −** de abajo.

[IMAGEN 8.5A: paso 5, servo de la compuerta: naranja a D9, rojo a la fila + y café a la fila − de abajo]

## Parte 6 · Revisión cable por cable (25 min)

Abran su circuito simulado en Tinkercad. Una persona lee cada fila de la tabla y la otra sigue el cable con el dedo en el circuito real:

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → D9 · Rojo → fila + · Café → fila − |
| Botón | Una pata → D2 · la pata en diagonal → fila − |
| LED | Pata larga → 220 Ω → D4 · pata corta → fila − |
| Buzzer | + → D5 · − → fila − |
| Filas de la protoboard | 5V → fila + · GND → fila − |

:::checklist id="g8a-revision"
- [ ] 5V y GND llegan a las filas + y −, y las de arriba están unidas con las de abajo.
- [ ] El LED tiene su resistencia en la misma fila que la pata larga.
- [ ] El buzzer está en D5 y el botón en D2.
- [ ] El servo está en D9.
- [ ] Ningún cable rojo toca una fila − ni un cable negro una fila +.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8a-logramos"
- [ ] Conectamos todos los componentes siguiendo los diagramas.
- [ ] Revisamos cada cable con la tabla y con el simulador.
- [ ] El botón y el LED quedaron al frente, donde se ven.
:::

## Bitácora (10 min)

:::foto id="g8a-foto"
Foto de la protoboard con todo el circuito conectado.
:::

:::pregunta id="g8a-b1"
¿En qué les ayudó tener el circuito simulado al conectar el circuito real?
:::

:::docente
- **Versión Tinkercad práctica, guía de armado (tipo: armado):** antes era la Parte 2 de la Guía 7. Ahora tiene un sábado propio para conectar con calma y revisar. Campos propios (g8a-…).
- Diagramas hechos con `herramientas/diagramas_armado.py dispensador` (dibujos de las piezas de Fritzing, CC BY-SA 3.0, con el crédito en cada imagen). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 8.1A a 8.6A.
- El LED va directo en la protoboard, con las patas dobladas: la corta a la fila − y la larga a la fila A. El buzzer de 12 mm tapa algunos agujeros, pero A y E de sus columnas quedan libres.
- El botón va en las filas A y D de un mismo lado (patas en A17, D17, A19 y D19), y no sobre la canaleta como en Tinkercad. Funciona igual: las patas del mismo número están unidas dentro del botón.
- Las dos uniones entre las filas + y − de arriba y de abajo (paso 1) hacen falta porque en la protoboard de 400 no están unidas por dentro.
- El orden de las filas de la protoboard es una sugerencia para que los cables no se crucen. Si un equipo usa otras filas, lo importante es la tabla de la Parte 6.
- Errores comunes: LED al revés, resistencia en una fila distinta de la pata larga, buzzer al revés, el cable del servo en el pin equivocado.
- Si no alcanza el tiempo, la revisión se termina al inicio de la Guía 9, antes de conectar el USB.
- Tiempo total: 10 + 10 + 25 + 20 + 15 + 25 + 5 + 10 = 120 minutos.
:::

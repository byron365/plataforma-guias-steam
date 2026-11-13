---
titulo: Conectamos el circuito del robot
guia: 9
sabado: 9
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 9 · Conectamos el circuito del robot

## Objetivo del día

Conectar el circuito del robot paso a paso, siguiendo los diagramas: las dos fuentes, el puente H L298N con los motores, el sensor, el divisor de la batería y el módulo Bluetooth HC-05.

**Al terminar tendremos:** todo el circuito del robot conectado y revisado por el docente, listo para subir los programas en la Guía 10.

## Materiales del equipo

- Robot armado (Guía 8), con todo en su lugar en la bandeja
- Fusible, 2 interruptores y cables para atornillar, destornillador pequeño
- 2 resistencias de 10 kΩ, una de 1 kΩ y una de 2 kΩ
- Módulo HC-05
- Cables macho–macho y macho–hembra
- El circuito simulado abierto en Tinkercad (Guía 4)

**Regla de oro:** todo el sábado, las **dos baterías desconectadas** y el USB sin conectar. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

- Las etiquetas blancas dicen dónde va cada punta: **D5** es el pin 5 del Arduino, **12V** es un borne del L298N y **J9** es un agujero de la protoboard pequeña.
- En la **protoboard pequeña**, cada agujero tiene su letra (A a J, de arriba abajo) y su número (1 a 17, de izquierda a derecha). Los 5 agujeros de un mismo número, de un mismo lado de la canaleta, están conectados.
- Los cables **pelados** (con la punta de cobre en el dibujo) van atornillados en un borne. Los de punta negra son **hembra**: van en un pin del L298N, del sensor o del HC-05.
- El dibujo no muestra dónde va cada pieza en el robot: todo se queda donde lo pusieron en la Guía 8.

[IMAGEN 9.10AR: circuito completo del robot: batería de los motores con fusible e interruptor, pila de 9 V, L298N con los dos motores, protoboard pequeña con los divisores, sensor HC-SR04 y módulo HC-05]

## Parte 2 · Las dos fuentes (25 min)

El robot tiene **dos fuentes separadas**: la batería 2S solo para el L298N y los motores, y la pila de 9 V solo para el Arduino. Hagan una conexión a la vez.

**Paso 1: batería de los motores.**

1. El **+** de la batería de los motores pasa primero por el fusible y luego por el interruptor, y llega al borne **12V** del L298N (puede decir 12V o VCC). Funciona con 7,4 V.
2. El **−** de la batería va al borne **GND** del L298N.
3. El borne **5V** del L298N queda **libre**: no lo conecten al Arduino. Dejen puesto el puente (jumper) que trae junto a los bornes: así el L298N se alimenta solo con su batería.

[IMAGEN 9.1AR: paso 1, batería de los motores: + al fusible, al interruptor y al borne 12V del L298N; − al borne GND]

**Paso 2: GND común.** En el borne **GND** del L298N pongan otro cable hasta un **GND** del Arduino. Sin este cable, el L298N no entiende las señales del Arduino.

[IMAGEN 9.2AR: paso 2, cable del borne GND del L298N a un GND del Arduino]

**Paso 3: pila de 9 V.** La pila de 9 V va al **jack** del Arduino, con su propio interruptor en el cable rojo. El Arduino baja los 9 V a 5 V con su regulador interno.

[IMAGEN 9.3AR: paso 3, pila de 9 V con su interruptor en el cable rojo y el plug en el jack del Arduino]

Miren en la animación por qué todas las tierras deben estar unidas:

:::animacion tipo="gnd-comun" pilas="Batería 2S (7,4 V)"
:::

:::checklist id="g9ar-potencia"
- [ ] La pila de 9 V llega al jack del Arduino; ninguna batería llega al pin 5V.
- [ ] El borne 5V del L298N está libre.
- [ ] El GND del L298N está unido a un GND del Arduino.
- [ ] Hay fusible entre la batería de los motores y el L298N.
:::

## Parte 3 · El L298N y los motores (20 min)

Primero **quiten los dos puentes (jumpers) de ENA y ENB**; si se quedan, los motores siempre van a fondo. Después conecten los pines según la tabla, con cables macho–hembra (la punta hembra en el pin del L298N):

| L298N | Arduino / motor | Nombre en el código |
| --- | --- | --- |
| ENA | D5 | PWMA |
| IN1 / IN2 | D7 / D8 | AIN1 / AIN2 |
| ENB | D6 | PWMB |
| IN3 / IN4 | D4 / D9 | BIN1 / BIN2 |
| OUT1, OUT2 | Motor izquierdo | — |
| OUT3, OUT4 | Motor derecho | — |

**Paso 4: motor izquierdo.** ENA → **D5**, IN1 → **D7**, IN2 → **D8**. Los dos cables del motor izquierdo van a los bornes **OUT1** y **OUT2**.

[IMAGEN 9.4AR: paso 4, ENA a D5, IN1 a D7, IN2 a D8 y el motor izquierdo en OUT1 y OUT2]

**Paso 5: motor derecho.** ENB → **D6**, IN3 → **D4**, IN4 → **D9**. Los dos cables del motor derecho van a los bornes **OUT3** y **OUT4**.

[IMAGEN 9.5AR: paso 5, ENB a D6, IN3 a D4, IN4 a D9 y el motor derecho en OUT3 y OUT4]

**✔ Revisa:** en el dibujo los cables se cruzan; en el robot no importa. Lo importante es que cada pin llegue al número de la tabla.

## Parte 4 · Energía para el sensor y el HC-05 (15 min)

**Paso 6.** El sensor y el HC-05 toman la energía del **5V** y del **GND** del Arduino. Como el Arduino tiene un solo pin 5V, se reparte en la protoboard pequeña:

1. Un cable del **5V** del Arduino a **J17**: los agujeros F17 a J17 quedan con 5V.
2. Un cable de un **GND** del Arduino a **J5**: los agujeros F5 a J5 quedan con GND.

[IMAGEN 9.6AR: paso 6, 5V del Arduino a J17 y GND a J5 en la protoboard pequeña]

**Paso 7: sensor HC-SR04.** Sus cables suben del soporte a la bandeja por el costado. Con cables macho–hembra:

| HC-SR04 | Va a |
| --- | --- |
| VCC / GND | F17 (5V) / G5 (GND) |
| Trig / Echo | D2 / D3 |

[IMAGEN 9.7AR: paso 7, sensor HC-SR04: VCC a F17, GND a G5, Trig a D2 y Echo a D3]

## Parte 5 · El divisor de la batería (10 min)

**Paso 8.** El Arduino mide la batería en **A0**, pero solo aguanta hasta 5 V y la batería llega a 8,4 V. Dos resistencias iguales de 10 kΩ la dividen entre 2.

1. Pongan las dos resistencias de 10 kΩ en fila, una después de la otra: una de **H9** a **H13** y la otra de **I5** a **I9**.
2. El punto donde se unen (el número 9) va a **A0**: un cable de **J9** a A0.
3. El otro extremo de la primera resistencia (el número 13) va al **+** de la batería de los motores, **después del interruptor**: un cable de **J13** a la salida del interruptor. El otro extremo de la segunda ya está en GND (el número 5).

Así el Arduino mide la batería que mueve el robot, no la pila de 9 V.

[IMAGEN 9.8AR: paso 8, divisor de la batería: 10 kΩ de H9 a H13 y de I5 a I9, J9 a A0 y J13 al + de la batería después del interruptor]

## Parte 6 · El HC-05 (20 min)

El **HC-05** es el módulo Bluetooth del robot. De fábrica ya sirve para conectarse con un celular: no hay que configurarlo.

Su **RX trabaja a 3,3 V**: desde el TX del Arduino (D11) usa un divisor **1 kΩ / 2 kΩ**. El cable de D11 pasa por la resistencia de 1 kΩ y llega a RXD; desde RXD sale otra resistencia de 2 kΩ hacia GND.

| HC-05 | Arduino |
| --- | --- |
| VCC / GND | 5V / GND |
| TXD | D10 (RX del Arduino) |
| RXD | D11 → 1 kΩ → RXD, y RXD → 2 kΩ → GND |
| EN / KEY | Sin conectar |

**Paso 9.** En la mitad de arriba de la protoboard pequeña:

1. Resistencia de **1 kΩ** de **C9** a **C13** y de **2 kΩ** de **D5** a **D9**.
2. Un cable de **D11** del Arduino a **A13**.
3. Un cable corto de **E5** a **F5**: así el número 5 de arriba también queda en GND.
4. Con cables macho–hembra: **RXD** a **A9**, **TXD** a **D10**, **VCC** a **G17** (5V) y **GND** a **H5**.

[IMAGEN 9.9AR: paso 9, HC-05: 1 kΩ de C9 a C13, 2 kΩ de D5 a D9, D11 a A13, E5 a F5, RXD a A9, TXD a D10, VCC a G17 y GND a H5]

:::pregunta id="g9ar-p1"
¿Por qué el RX del HC-05 necesita un divisor de voltaje y el TX no?
:::

## Parte 7 · Revisión con el docente (10 min)

Antes de conectar las baterías, **pidan al docente que revise** el armado. Una persona lee cada fila de las tablas y la otra sigue el cable con el dedo.

:::checklist id="g9ar-revision"
- [ ] Los puentes de ENA y ENB están quitados.
- [ ] Cada pin del L298N llega al número de la tabla.
- [ ] El sensor y el HC-05 toman 5V y GND de la protoboard pequeña.
- [ ] El divisor de la batería llega a A0 y al + de la batería después del interruptor.
- [ ] El RXD del HC-05 tiene su divisor de 1 kΩ y 2 kΩ.
- [ ] El docente revisó el circuito.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9ar-logramos"
- [ ] Las dos fuentes están conectadas, con GND común y fusible.
- [ ] El L298N, los motores, el sensor, el divisor y el HC-05 están conectados.
- [ ] Las dos baterías quedaron desconectadas.
:::

## Bitácora (5 min)

:::foto id="g9ar-foto"
Foto de la bandeja del robot con todo el circuito conectado.
:::

:::docente
- **Versión Práctica con app (11 sábados), guía de armado (tipo: armado):** nueva el 13 de noviembre. Junta las conexiones de la Guía 8 (Partes 3 y 4: baterías, L298N, motores, sensor y divisor) y el HC-05 de la Guía 9 (Parte 2), con diagramas paso a paso. Campos propios (g9ar-…); g9ar-p1 era g9a-p1.
- Diagramas hechos con `herramientas/diagramas_armado.py robot` (dibujos de Fritzing, CC BY-SA 3.0; el L298N y la batería 2S son dibujos propios porque Fritzing no los trae). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 9.1AR a 9.10AR.
- **Para revisar con Bairon:** el reparto del 5V y del GND en la protoboard pequeña (números 17 y 5) y el lugar de las resistencias son propuestas del dibujo; las guías anteriores solo decían "5V / GND" para el sensor y el HC-05 y "en la protoboard" para los divisores.
- Revisar el armado de potencia de cada equipo **antes** de conectar las baterías: es el punto de mayor riesgo. Errores típicos: el borne 5V del L298N conectado al Arduino, falta del GND común o los puentes de ENA/ENB puestos.
- El L298N pierde unos 2 V: con la batería llena a los motores les llegan unos 6,4 V, y con 6,4 V en la batería, unos 4,4 V. Los motores TT andan, pero más lento que con el TB6612; si con PWM bajo solo zumban, es normal.
- Con el puente de 5V puesto, el L298N alimenta su lógica con su regulador interno desde la batería de los motores; su borne 5V es una salida y no se usa: las dos fuentes van separadas a propósito.
- La pila de 9 V alimenta el Arduino, el HC-05 y el HC-SR04 (unos 110 mA): dura pocas horas; tener pilas de repuesto.
- g9ar-p1: el TX del Arduino da 5 V y el RX del HC-05 solo aguanta 3,3 V; el TX del HC-05 da 3,3 V, que el Arduino lee sin problema.
- Si los motores TT vienen sin cables, soldarlos antes de la clase.
- Baterías de litio: siempre en portabaterías con protección, no perforarlas ni cargarlas sin supervisión.
- Tiempo total: 10 + 25 + 20 + 15 + 10 + 20 + 10 + 5 + 5 = 120 minutos.
:::

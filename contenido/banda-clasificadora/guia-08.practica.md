---
titulo: Conectamos los circuitos de los dos nodos
guia: 8
sabado: 8
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 8 · Conectamos los circuitos de los dos nodos

## Objetivo del día

Conectar paso a paso, siguiendo los diagramas, los circuitos de los dos nodos: el **nodo banda** (la fuente con el GND común, el TIP41C con un LED de prueba, la perilla y el sensor IR) y el **nodo clasificador** (el sensor de color, la pantalla, el botón de paro, el servo y el bus I2C). Es el mismo circuito del simulador.

**Al terminar tendremos:** los dos circuitos conectados y revisados, listos para subir los programas en la Guía 9.

## Materiales del equipo

- Banda armada (Guía 7), con el sensor IR, el TCS34725, el servo y la canaleta en su lugar
- 2 Arduino UNO, 2 protoboards, cables macho–macho y macho–hembra
- Transistor TIP41C, resistencias de 220 Ω (2) y 10 kΩ, LED, potenciómetro
- Pantalla LCD 16 × 2 con módulo I2C y un pulsador (botón de paro)
- Fuente (cargador) de 5 V y **2 A o más** con plug de 5,5 × 2,1 mm, y un conector jack hembra con bornera de tornillos
- Destornillador pequeño y cinta para etiquetas
- El circuito simulado abierto en Tinkercad (Guía 6)

**Regla de oro:** todo el sábado, los USB **desconectados** y la fuente **desenchufada**. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Cómo leer los diagramas (10 min)

Hoy trabajamos con los **dos** Arduino: el de la **banda** y el **clasificador**. Pónganles etiqueta (**B** y **C**), y también a sus protoboards.

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

- Cada agujero del centro de la protoboard tiene su letra (A a J) y su número (1 a 30), impresos en la protoboard: **E3** es la letra E en el número 3.
- Las etiquetas blancas dicen dónde va cada punta: **D9** es el pin 9 del Arduino, **A0** es el pin A0 (abajo, en ANALOG IN) y **fila −** es cualquier agujero de una fila −.
- Los cables con la punta de cobre van **atornillados** en el jack.
- El dibujo no muestra dónde va cada pieza: el sensor IR, el sensor de color y el servo se quedan en la banda; sus cables llegan hasta la protoboard.

[IMAGEN 8.10A: circuito completo del nodo banda: la fuente de 5 V en las filas de arriba, el Arduino en las de abajo, el GND común, el TIP41C con el LED de prueba, la perilla y el sensor IR]

## Parte 2 · Nodo banda: la fuente y el GND común (15 min)

El motor pide más corriente de la que da el Arduino: por eso usa una **fuente de 5 V aparte**. En la protoboard de la banda las filas se usan así:

| Filas | Qué llevan | Qué se conecta ahí |
| --- | --- | --- |
| + y − de **arriba** | La fuente de 5 V | El LED con el transistor (en la Guía 9, el motor), el sensor IR y el servo del clasificador |
| + y − de **abajo** | El 5V y el GND del Arduino | La perilla |
| Un cable entre las dos filas **−** | El **GND común** | — |

**Nunca se unen las dos filas +:** una tiene los 5 V de la fuente y la otra los del Arduino.

**Paso 1: el Arduino.** Un cable rojo del **5V** del Arduino B a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.

[IMAGEN 8.1A: paso 1, 5V y GND del Arduino de la banda a las filas + y − de abajo]

**Paso 2: la fuente.** La fuente se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**. Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten.

1. Un cable del tornillo **+** del jack a la **fila +** de arriba.
2. Un cable del tornillo **−** del jack a la **fila −** de arriba.

[IMAGEN 8.2A: paso 2, la fuente de 5 V en el jack hembra; el + del jack a la fila + de arriba y el − a la fila − de arriba]

**Paso 3: GND común.** Un cable de la **fila −** de arriba a la **fila −** de abajo.

[IMAGEN 8.3A: paso 3, un cable une la fila − de arriba con la fila − de abajo; las filas + no se unen]

## Parte 3 · Nodo banda: el transistor y el LED de prueba (25 min)

El **transistor TIP41C** controla el motor: una corriente pequeña en su **base** deja pasar una corriente grande entre **colector** y **emisor**. Antes del motor, probamos con una carga que no se daña: un LED. El motor lo cambiamos en la Guía 9.

| Conexión | Destino |
| --- | --- |
| D9 del Arduino | 220 Ω → base del TIP41C |
| Base | 10 kΩ → GND |
| Emisor | GND común (Arduino y fuente) |
| Colector | Cátodo del LED (pata corta) |
| +5 V de la fuente | 220 Ω → ánodo del LED |

**Paso 4: el TIP41C.** Mirándolo de frente (con las letras hacia ustedes y las patas hacia abajo), las patas son, de izquierda a derecha: **Base**, **Colector** y **Emisor**. Claven la base en **A7**, el colector en **A8** y el emisor en **A9**: cada pata en un número distinto.

[IMAGEN 8.4A: paso 4, el TIP41C con las letras hacia el frente: base en A7, colector en A8 y emisor en A9]

**Paso 5: D9 → 220 Ω → base.** Un cable de **D9** a **E3**, y una resistencia de **220 Ω** de **C3** a **C7** (el número de la base).

[IMAGEN 8.5A: paso 5, cable de D9 a E3 y resistencia de 220 Ω de C3 a C7]

**Paso 6: 10 kΩ y el emisor a GND.**

1. Una resistencia de **10 kΩ** de **D7** (la base) a **D11**, y un cable de **A11** a la **fila −** de arriba: así la base queda unida a GND por la 10 kΩ.
2. Un cable de **E9** (el emisor) a la **fila −** de abajo.

[IMAGEN 8.6A: paso 6, resistencia de 10 kΩ de D7 a D11, cable de A11 a la fila − de arriba y cable de E9 a la fila − de abajo]

**Paso 7: el LED con su 220 Ω.**

1. Un cable de **B8** (el colector) a **B15**.
2. El LED: la pata **corta** (cátodo) en **A15** y la **larga** en **A16**.
3. Una resistencia de **220 Ω** de **D16** a **D20**, y un cable de **A20** a la **fila +** de arriba (los +5 V de la fuente).

[IMAGEN 8.7A: paso 7, cable de B8 a B15, LED con la pata corta en A15 y la larga en A16, resistencia de 220 Ω de D16 a D20 y cable de A20 a la fila + de arriba]

**✔ Revisa:** el emisor va a GND y el colector al LED. Colector y emisor invertidos es uno de los errores más comunes.

## Parte 4 · Nodo banda: la perilla y el sensor IR (10 min)

**Paso 8: la perilla.** Tiene 3 patas: la de la izquierda va a la **fila +** de abajo (el 5V del Arduino), la del centro a **A0** y la de la derecha a la **fila −** de abajo.

1. Claven la perilla en la mitad de abajo de la protoboard, con las patas en **F22**, **F24** y **F26**.
2. Desde la fila **J**: **J22** a la **fila +** de abajo, **J26** a la **fila −** de abajo y **J24** a **A0**.

[IMAGEN 8.8A: paso 8, la perilla: pata izquierda a la fila +, derecha a la fila − y la del centro a A0]

**Paso 9: el sensor IR.** Con cables macho–hembra: **OUT** → **D2**, **VCC** → **fila +** de arriba y **GND** → **fila −** de arriba.

[IMAGEN 8.9A: paso 9, el sensor IR del túnel: OUT a D2, VCC a la fila + y GND a la fila − de arriba]

## Parte 5 · Nodo clasificador (25 min)

| Componente | Arduino clasificador |
| --- | --- |
| TCS34725 SDA / SCL | A4 / A5 (mismo bus que el nodo banda) |
| TCS34725 VIN / GND | 5V / GND |
| Servo | D6 (energía de la fuente de 5 V) |
| Pantalla LCD I2C SDA / SCL | A4 / A5 (el mismo bus) |
| Pantalla LCD I2C VCC / GND | 5V / GND |
| Botón de paro | D7 y GND |
| Bus I2C hacia el nodo banda | A4–A4, A5–A5, GND–GND |

- Los pines del TCS34725 y de la pantalla tienen su nombre impreso. **VIN** y **VCC** van a 5V; **GND** a GND.
- **El bus I2C es compartido:** el sensor, la pantalla y el nodo banda se conectan a los mismos A4 (**SDA**) y A5 (**SCL**), igual que en el simulador. Como en un pin cabe un solo cable, en la protoboard del clasificador usamos dos números: el **17** para SCL (A5) y el **18** para SDA (A4).
- Los pines **SDA** y **SCL** de arriba del Arduino (junto a AREF) son los mismos A4 y A5: ahí va la pantalla.

[IMAGEN 8.18A: circuito completo del nodo clasificador: el bus I2C en los números 17 y 18, el sensor de color, la pantalla, el botón de paro, el servo con la fuente de la banda y los cables al nodo banda]

**Paso 1: el Arduino.** Un cable rojo del **5V** del Arduino C a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo. En esta protoboard **sí** se unen las filas: un cable rojo de la **fila +** de abajo a la **fila +** de arriba y uno negro de la **fila −** de abajo a la **fila −** de arriba (por la izquierda).

[IMAGEN 8.11A: paso 1, 5V y GND del Arduino clasificador a las filas de abajo, y las filas de arriba unidas con las de abajo]

**Paso 2: el bus I2C.** Un cable de **A5** a **J17** (SCL) y uno de **A4** a **J18** (SDA).

[IMAGEN 8.12A: paso 2, A5 a J17 (SCL) y A4 a J18 (SDA)]

**Paso 3: el sensor de color.** Con cables macho–hembra: **VIN** → **fila +** de arriba, **GND** → **fila −** de arriba, **SCL** → **F17** y **SDA** → **F18**.

[IMAGEN 8.13A: paso 3, el TCS34725 del túnel: VIN a la fila +, GND a la fila −, SCL a F17 y SDA a F18]

**Paso 4: la pantalla.** Con cables macho–hembra: **SDA** → pin **SDA** y **SCL** → pin **SCL** (arriba del Arduino, junto a AREF), **VCC** → **fila +** de abajo y **GND** → **fila −** de abajo.

[IMAGEN 8.14A: paso 4, la pantalla LCD: SDA y SCL a los pines SDA y SCL de arriba del Arduino, VCC a la fila + y GND a la fila − de abajo]

## Parte 6 · Botón de paro, servo y unión con la banda (15 min)

**Paso 5: el botón de paro.** Va sobre la canaleta del centro, con sus patas en **E24**, **F24**, **E26** y **F26**.

1. Un cable de **A24** al pin **D7**.
2. Un cable de **J26** a la **fila −** de abajo: es la pata en diagonal.

[IMAGEN 8.15A: paso 5, botón de paro sobre la canaleta, cable de A24 a D7 y de J26 a la fila − de abajo]

**Paso 6: el servo.** Metan tres cables en su conector: **rojo** a la **fila +** de la fuente y **café** a la **fila −** de la fuente (las filas de arriba de la protoboard de la banda), **naranja** a **D6** del clasificador.

[IMAGEN 8.16A: paso 6, el servo: rojo y café a las filas de la fuente en la protoboard de la banda, naranja a D6 del clasificador]

**Paso 7: unir los dos nodos.**

1. Un cable de **G17** (SCL) a **A5** del Arduino de la banda.
2. Un cable de **H18** (SDA) a **A4** del Arduino de la banda.
3. Un cable de la **fila −** de arriba del clasificador a la **fila −** de la fuente (protoboard de la banda): es el GND común de los dos nodos.

[IMAGEN 8.17A: paso 7, G17 a A5 de la banda, H18 a A4 de la banda y la fila − del clasificador a la fila − de la fuente]

## Parte 7 · Revisión cable por cable (10 min)

Tengan la simulación de Tinkercad abierta. Una persona lee cada fila de la tabla y la otra sigue el cable con el dedo:

| Qué | Conexión |
| --- | --- |
| Jack hembra + / − | Fila **+** de arriba / fila **−** de arriba (protoboard de la banda) |
| Arduino B 5V / GND | Fila **+** de abajo / fila **−** de abajo. GND común: un cable entre las dos filas **−**. **Nunca unas las dos filas +.** |
| TIP41C | Base (A7) ← 220 Ω ← D9 · base → 10 kΩ → GND · emisor (A9) → GND · colector (A8) → LED |
| LED | Pata corta → colector · pata larga → 220 Ω → fila + de la fuente |
| Perilla (izquierda / centro / derecha) | Fila + de abajo / **A0** / fila − de abajo |
| Sensor IR | OUT → **D2** · VCC → fila + · GND → fila − |
| Bus I2C del clasificador | A5, SCL del sensor y A5 de la banda en el **17** · A4, SDA del sensor y A4 de la banda en el **18** · la pantalla en SDA y SCL de arriba |
| Botón de paro | Una pata → **D7** · la pata en diagonal → fila − |
| Servo (rojo / café / naranja) | Fila + de la fuente / fila − de la fuente / **D6** del clasificador |

:::checklist id="g8a-revision"
- [ ] El + del jack va a la fila + de arriba y el − a la fila − de arriba.
- [ ] La resistencia de 10 kΩ está entre la base y GND.
- [ ] El GND del Arduino está unido al − del jack de la fuente.
- [ ] El servo toma la energía de la fuente, no del 5V del Arduino.
- [ ] A4 con A4, A5 con A5 y GND común entre los dos nodos.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8a-logramos"
- [ ] El nodo banda tiene la fuente, el GND común, el transistor con el LED, la perilla y el sensor IR.
- [ ] El nodo clasificador tiene el sensor de color, la pantalla, el botón de paro y el servo.
- [ ] Los dos nodos están unidos por el bus I2C y el GND común.
- [ ] Los USB y la fuente siguen desconectados.
:::

## Bitácora (5 min)

:::foto id="g8a-foto"
Foto de las dos protoboards con todo el circuito.
:::

:::docente
- **Versión Práctica (11 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Junta las conexiones de la Guía 7 práctica anterior (etapa de potencia con el LED, perilla y sensor IR) y la Parte 1 de la Guía 8 práctica anterior (clasificador y bus I2C). Campos propios (g8a-…); g8a-revision junta lo de g7p-revision que se revisa sin corriente.
- Diagramas hechos con `herramientas/diagramas_armado.py banda` (8.1A a 8.10A) y `clasificador` (8.11A a 8.18A), con los dibujos de Fritzing (CC BY-SA 3.0); el jack, la perilla, el TCS34725, la pantalla LCD y el nodo banda en pequeño son dibujos propios. Si cambia el circuito, se vuelven a generar.
- El bus I2C necesita una "regleta": en un pin del Arduino cabe un solo cable. Por eso A4 y A5 van a dos números de la protoboard del clasificador (18 y 17) y de ahí salen el sensor y el nodo banda; la pantalla usa los pines SDA y SCL de arriba (son los mismos A4 y A5 por dentro).
- El sensor IR toma los 5 V de la fuente (filas de arriba de la banda): sus cables quedan cortos y la fuente tiene el GND común con el Arduino.
- La resistencia de 10 kΩ va de la base (D7) a D11, y de A11 un cable a la fila −: es la "base → 10 kΩ → GND" de la tabla. Mantiene el transistor apagado mientras el Arduino arranca.
- El servo se alimenta de la fuente, no del pin 5V del Arduino. Revisar el GND común de cada equipo antes de que enchufen la fuente: es el error más frecuente.
- Tiempo total: 10 + 15 + 25 + 10 + 25 + 15 + 10 + 5 + 5 = 120 minutos.
:::

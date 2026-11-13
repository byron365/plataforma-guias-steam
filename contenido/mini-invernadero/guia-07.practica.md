---
titulo: Conectamos el circuito del invernadero
guia: 7
sabado: 7
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 7 · Conectamos el circuito del invernadero

## Objetivo del día

Conectar en el invernadero real, paso a paso y siguiendo los diagramas, el circuito que ya funciona en el simulador: el servo y el botón de la ventana, la luz, el sensor de humedad, el de temperatura y la bomba con su relé.

**Al terminar tendremos:** todo el circuito del invernadero conectado y revisado, con la bomba en el depósito y el sensor en la tierra, listo para subir el programa final en la Guía 8.

## Materiales del equipo

- El invernadero con su ventana y el servo (sábado 6)
- Arduino UNO, protoboard, cables macho–macho y macho–hembra, botón
- Sensor de humedad de suelo, sensor de temperatura DHT11, LED blanco con resistencia de 220 Ω
- Módulo relé de 5 V
- Mini bomba de agua de 5 V, manguera y clip impreso
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos
- Depósito (botella o vaso grande con agua), destornillador pequeño y cinta aislante
- Su proyecto de Wokwi abierto (Guía 5)

**Regla de oro:** todo el sábado, el USB **desconectado** y la fuente **desenchufada**. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g7a-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Cómo leer los diagramas (10 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

- Cada agujero del centro de la protoboard tiene su letra (A a J) y su número (1 a 30), impresos en la protoboard: **E24** es la letra E en el número 24.
- Las etiquetas blancas dicen dónde va cada punta: **D9** es el pin 9 del Arduino, **A0** es el pin A0 (abajo, en ANALOG IN) y **fila −** es cualquier agujero de una fila −.
- Los cables con la punta de cobre van **atornillados** en el relé o en el jack.
- El dibujo no muestra dónde va cada pieza: el servo, la luz y los sensores se quedan en su lugar del invernadero; sus cables llegan hasta la protoboard. El Arduino, la protoboard y el relé van en el **compartimento seco**.

Es el mismo circuito de Wokwi. Las diferencias con el simulador son la bomba de verdad, el sensor de humedad de verdad y el DHT11.

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → **D9** · rojo → fila **+** · café → fila **−** |
| Botón | Una pata → **D2** · la pata en diagonal → fila **−** |
| Luz: LED blanco | Pata larga → 220 Ω → **D6** · pata corta → GND |
| Sensor de humedad | VCC → 5V · GND → GND · AOUT → **A0** |
| Sensor DHT11 | VCC (+) → 5V · GND (−) → GND · DATA (S) → **D7** |
| Relé VCC / GND / IN | 5V / GND / **D8** |
| Jack hembra + | Relé **COM** |
| Relé **NO** | Bomba + (cable rojo) |
| Bomba − (cable negro) | Jack hembra − |

[IMAGEN 7.9A: circuito completo del invernadero: servo y botón de la ventana, luz, sensor de humedad, DHT11, relé con la bomba y la fuente de 5 V en su jack]

## Parte 3 · El servo y el botón de la ventana (15 min)

**Paso 1: el Arduino.** Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo. Dos cables cortos pasan la fila + y la fila − de abajo a las de arriba.

[IMAGEN 7.1A: paso 1, 5V y GND del Arduino a las filas + y − de abajo, unidas con las de arriba]

**Paso 2: el servo.** Tres cables macho–macho en su conector: naranja → **D9**, rojo → **fila +** y café → **fila −** de abajo.

[IMAGEN 7.2A: paso 2, el servo de la ventana: naranja a D9, rojo a la fila + y café a la fila −]

**Paso 3: el botón.** Va con sus patas en **A24**, **D24**, **A26** y **D26**. Un cable de **D2** a **E24** y uno de **E26** a la **fila −** de abajo: es la pata en diagonal.

[IMAGEN 7.3A: paso 3, el botón: D2 a E24 y E26 a la fila −]

## Parte 4 · La luz y los sensores (25 min)

**Paso 4: la luz.** El LED blanco va arriba, dentro del invernadero, apuntando a la planta. Con dos cables macho–hembra: la pata **corta** a la **fila −** de arriba y la **larga** a **A17**. Una resistencia de **220 Ω** de **C13** a **C17** y un cable de **D6** a **E13**.

[IMAGEN 7.4A: paso 4, la luz: pata corta a la fila −, pata larga a A17, resistencia de 220 Ω de C13 a C17 y D6 a E13]

**Paso 5: el sensor de humedad.** Con cables macho–hembra: **VCC** → **fila +** de abajo, **GND** → **fila −** de abajo y **AOUT** → **A0**.

[IMAGEN 7.5A: paso 5, el sensor de humedad: VCC a la fila +, GND a la fila − y AOUT a A0]

**Paso 6: el DHT11.** Sus pines pueden decir **+**, **−** y **S** (o OUT): + es VCC, − es GND y S es DATA. Péguenlo con cinta en una pared, a media altura, lejos de la manguera y del depósito. Con cables macho–hembra: **S** → **A8**, **+** → **fila +** de arriba y **−** → **fila −** de arriba. Un cable de **D7** a **E8**.

[IMAGEN 7.6A: paso 6, el DHT11: S a A8, + a la fila + y − a la fila − de arriba; D7 a E8]

## Parte 5 · El relé, la fuente y la bomba (25 min)

**Paso 7: el relé.** De un lado tiene los pines VCC, GND e IN; del otro, tres tornillos **COM**, **NO** y **NC**. Con cables macho–hembra: **IN** → **D8**, **GND** → **fila −** y **VCC** → **fila +** de arriba.

[IMAGEN 7.7A: paso 7, el módulo relé: IN a D8, GND a la fila − y VCC a la fila +]

**Paso 8: la fuente y la bomba.** La fuente de 5 V se enchufa en el **jack hembra**, que tiene dos tornillos **+** y **−**. Para meter un cable en un tornillo: aflojen el tornillo con el destornillador, metan la punta pelada y aprieten. **NC** no se usa.

1. Un cable del **+** del jack al **COM** del relé.
2. Un cable del **NO** del relé al cable rojo de la bomba.
3. El cable negro de la bomba al **−** del jack.

Donde se unan dos cables pelados, tuérzanlos y cúbranlos con cinta aislante.

[IMAGEN 7.8A: paso 8, la fuente en el jack hembra: + del jack a COM, NO a la bomba + y bomba − al − del jack]

## Parte 6 · El agua (15 min)

1. Mete la bomba en el depósito, **sumergida** y acostada en el fondo. Nunca la enciendan fuera del agua: se daña.
2. Peguen el clip por su pestaña en la pared, encima de la maceta, con el anillo parado. Pasen la manguera hasta la maceta y métanla en el clip por la abertura, apretándola un poco: queda parada, con la punta hacia la tierra.
3. Clava el sensor de humedad en la tierra de la maceta "Con sistema", sin pasar la línea marcada, entre la planta y la orilla.

## Parte 7 · Revisión cable por cable (10 min)

Tengan el circuito de Wokwi abierto. Una persona lee cada fila de la tabla de la Parte 2 y la otra sigue el cable con el dedo.

:::checklist id="g7a-revision"
- [ ] El Arduino y el relé están en el compartimento seco.
- [ ] La bomba está sumergida y la manguera apunta a la tierra.
- [ ] El DHT11 está lejos del agua.
- [ ] El tomacorriente y la fuente de 5 V están lejos del agua.
- [ ] Cada cable va en su pin: servo D9, botón D2, luz D6, DHT11 D7, relé D8 y sensor de humedad A0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7a-logramos"
- [ ] Revisamos las plantas.
- [ ] El circuito real es igual al simulado (con la bomba, el sensor y el DHT11 de verdad).
- [ ] La bomba está en el agua y el sensor en la tierra.
- [ ] El USB y la fuente siguen desconectados.
:::

## Bitácora (5 min)

:::foto id="g7a-foto"
Foto del compartimento seco con el Arduino, la protoboard y el relé.
:::

:::docente
- **Versión práctica (9 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. Antes era la Parte 2 de la Guía 7 práctica (más el servo y el botón, que se conectaban en la Guía 6). Campos propios (g7a-…); g7a-revision era g7p-revision, con una fila más.
- Diagramas hechos con `herramientas/diagramas_armado.py invernadero` (dibujos de Fritzing, CC BY-SA 3.0; el DHT11, el sensor de humedad, el relé, el jack y la bomba son dibujos propios). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 7.1A a 7.9A.
- La bomba usa una **fuente de 5 V con jack hembra de bornera** en lugar del portapilas (decisión de Bairon).
- El sensor de humedad del dibujo es el capacitivo; si el de la academia tiene los pines en otro orden, vale lo que dice impreso junto a cada pin.
- Tiempo total: 10 + 10 + 15 + 25 + 25 + 15 + 10 + 5 + 5 = 120 minutos.
:::

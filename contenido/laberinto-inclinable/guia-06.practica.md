---
titulo: Armamos el laberinto y conectamos el circuito
guia: 6
sabado: 6
sesion: Práctica de armado (1)
tipo: armado
duracion: 120
---

# Guía 6 · Armamos el laberinto y conectamos el circuito

## Objetivo del día

Montar el marco y el tablero y conectar el circuito paso a paso, siguiendo los diagramas: las dos fuentes con el GND común, los dos servos y el joystick. Es el mismo circuito del simulador.

**Al terminar tendremos:** el laberinto armado, con todo su circuito conectado y revisado, listo para subir el programa final en la Guía 7.

## Materiales del equipo

- Base con las torres y los servos (sábado 5), marco y tablero impresos, base del joystick impresa
- 2 palitos de pincho (o clavos de 3 mm) y tijeras o alicate para cortarlos
- Arduino UNO, protoboard, cables macho–macho y macho–hembra, módulo joystick
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos, destornillador pequeño
- Pegamento caliente (silicona) y una canica
- El proyecto de Wokwi abierto (Guía 4)

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

**Regla de oro del circuito:** el USB **desconectado** y la fuente **desenchufada**. Los cables se ponen y se cambian solo sin corriente.

## Parte 1 · El montaje (45 min)

Sigan el orden. Miren la imagen del laberinto completo para ver dónde va cada cosa:

[IMAGEN 2.1P: laberinto diseñado en Tinkercad, con etiquetas: tablero con el laberinto, canica, agujero de la meta, marco, servo del tablero, servo del marco, torre del eje, torre del servo, base de MDF o cartón y base del joystick]

1. **Los brazos:** pongan un brazo largo en el eje de cada servo, **acostado** (horizontal). No hace falta el tornillo del centro.
2. **El marco entre las torres.**
   - Pongan el marco entre las torres: su **lado izquierdo** (el del agujero) junto a la torre del eje y su **lado derecho** junto al brazo del servo.
   - Corten un palito de unos 3 cm. Pásenlo por el agujero de la torre del eje y métanlo en el agujero del marco.
   - Con el marco **plano** (horizontal), peguen el brazo del servo al lado derecho del marco con silicona. Si queda un espacio entre el brazo y el marco, rellénenlo con silicona.
   - Pongan una gota de silicona donde el palito entra en el marco (por dentro), para que el palito gire junto con el marco.
3. **El tablero dentro del marco.**
   - Pongan el tablero dentro del marco con la **bisagra atrás** (junto al agujero de atrás del marco).
   - Pasen otro palito de unos 3 cm por el agujero de atrás del marco y métanlo en la bisagra. Una gota de silicona donde entra en la bisagra.
   - Con el tablero **plano**, peguen el brazo del servo del tablero al borde de adelante del tablero.
4. Esperen un minuto a que la silicona enfríe y revisen:

:::checklist id="g6p-montaje"
- [ ] El marco gira sobre su palito y el brazo del servo, sin rozar las torres.
- [ ] El tablero gira dentro del marco sin rozarlo.
- [ ] Con la canica en el centro, el tablero está casi plano (la canica no sale rodando).
- [ ] Ningún cable estorba el movimiento.
:::

## Parte 2 · Cómo leer los diagramas (5 min)

Cada paso tiene un dibujo. Lo que ya conectaron en los pasos anteriores se ve **gris claro**; lo nuevo de ese paso se ve **a todo color**.

- Las etiquetas blancas dicen dónde va cada punta: **D9** es el pin 9 del Arduino, **A0** es el pin A0 (abajo, en ANALOG IN) y **fila −** es cualquier agujero de una fila −.
- Los cables con la punta de cobre van **atornillados** en el jack.
- El dibujo no muestra dónde va cada pieza: los servos se quedan en el laberinto y el joystick en su base; sus cables llegan hasta la protoboard.

[IMAGEN 6.7A: circuito completo del laberinto: la fuente de 5 V en las filas de arriba, el Arduino en las de abajo, el GND común, los dos servos y el joystick]

## Parte 3 · Las dos fuentes y el GND común (20 min)

Dos servos con el tablero encima piden más corriente de la que da el Arduino: si los conectamos al Arduino, se reinicia y el tablero tiembla. Por eso los servos usan una **fuente de 5 V aparte**, con una regla de oro:

> **Todas las tierras (GND) deben estar unidas.** Sin GND común, los servos no entienden la señal del Arduino.

| Filas | Qué llevan | Qué se conecta ahí |
| --- | --- | --- |
| + y − de **arriba** | La fuente de 5 V | Los 2 servos |
| + y − de **abajo** | El 5V y el GND del Arduino | El joystick |
| Un cable entre las dos filas **−** | El **GND común** | — |

**Nunca se unen las dos filas +:** una tiene los 5 V de la fuente y la otra los del Arduino.

**Paso 1: el Arduino.** Un cable rojo del **5V** del Arduino a la **fila +** de abajo y uno negro del **GND** a la **fila −** de abajo.

[IMAGEN 6.1A: paso 1, 5V y GND del Arduino a las filas + y − de abajo]

**Paso 2: la fuente.** La fuente se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**. Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten.

1. Un cable del tornillo **+** del jack a la **fila +** de arriba.
2. Un cable del tornillo **−** del jack a la **fila −** de arriba.

[IMAGEN 6.2A: paso 2, la fuente de 5 V en el jack hembra; el + del jack a la fila + de arriba y el − a la fila − de arriba]

**Paso 3: GND común.** Un cable de la **fila −** de arriba a la **fila −** de abajo.

[IMAGEN 6.3A: paso 3, un cable une la fila − de arriba con la fila − de abajo; las filas + no se unen]

## Parte 4 · Los dos servos (15 min)

Cada servo tiene un conector de 3 (café, rojo y naranja). Metan tres cables macho–macho en su conector: rojo → **fila +** de **arriba** (fuente), café → **fila −** de arriba, naranja → su pin. Usen los papelitos de la Guía 5: "D9 marco" y "D10 tablero".

**Paso 4: servo del marco.** Naranja → **D9**.

[IMAGEN 6.4A: paso 4, servo del marco: café a la fila − y rojo a la fila + de arriba, naranja a D9]

**Paso 5: servo del tablero.** Naranja → **D10**.

[IMAGEN 6.5A: paso 5, servo del tablero: café a la fila − y rojo a la fila + de arriba, naranja a D10]

**✔ Revisa:** ningún servo va en el 5V del Arduino: los dos toman la energía de las filas de **arriba**.

## Parte 5 · El joystick (15 min)

1. **Base del joystick:** encajen el joystick en el cerco, con los pines del lado de la abertura.
2. **Paso 6.** Con cables macho–hembra, el joystick va a las filas del **Arduino** (las de abajo), no a las de la fuente: **+5V** → **fila +** de abajo, **GND** → **fila −** de abajo, **VRx** → **A0** y **VRy** → **A1**. El pin **SW** (el botón) no se usa.

[IMAGEN 6.6A: paso 6, el joystick: VRx a A0, VRy a A1, +5V a la fila + y GND a la fila − de abajo]

## Parte 6 · Revisión cable por cable (10 min)

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Joystick: +5V | 5V | rojo | |
| Joystick: VRx | A0 | verde | Eje X |
| Joystick: VRy | A1 | amarillo | Eje Y |
| Joystick: GND | GND | negro | |
| Servo X: naranja | D9 | naranja | Señal |
| Servo X: rojo | Fuente 5 V: + | rojo | Energía de la fuente |
| Servo X: café | Fuente 5 V: − | café | |
| Servo Y: naranja | D10 | naranja | Señal |
| Servo Y: rojo | Fuente 5 V: + | rojo | Energía de la fuente |
| Servo Y: café | Fuente 5 V: − | café | |
| Fuente 5 V: − | GND | negro | GND común: une la tierra de la fuente con la del Arduino |
:::

:::checklist id="g6a-revision"
- [ ] El + del jack va a la fila + de arriba y el − a la fila − de arriba.
- [ ] GND común unido, sin unir las dos filas +.
- [ ] Los dos servos en las filas de la fuente: el del marco en D9 y el del tablero en D10.
- [ ] El joystick en las filas del Arduino, con VRx en A0 y VRy en A1.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El marco y el tablero giran libres.
- [ ] Los servos usan la fuente de 5 V con GND común.
- [ ] El joystick está en su base y conectado.
- [ ] El USB y la fuente siguen desconectados.
:::

## Bitácora (5 min)

:::pregunta id="g6p-b1"
¿Qué problemas mecánicos tuvimos y cómo los resolvimos?
:::

:::docente
- **Versión Práctica con Wokwi (8 sábados), guía de armado (tipo: armado):** desde el 13 de noviembre. El montaje de la Guía 6 práctica anterior, más el circuito con diagramas: la energía y los servos de la Guía 5 práctica anterior y el joystick de la Guía 6. El programa final y el ajuste del control pasaron a la Guía 7. Campos: g6p-montaje, g6p-logramos y g6p-b1 se quedan; g6a-revision es nuevo (las tablas de sentido e inclinación ahora son g7a-…).
- Diagramas hechos con `herramientas/diagramas_armado.py laberinto` (dibujos de Fritzing, CC BY-SA 3.0; el joystick y el jack son dibujos propios). Si cambia el circuito, se vuelven a generar y se copian como IMAGEN 6.1A a 6.7A. En el dibujo, el servo del tablero va a la izquierda para que los cables a D10 y D9 no se crucen.
- El servo del marco está parado con el eje a 120 mm de la base, igual que el agujero de la torre del eje: los dos deben quedar alineados. Si el marco queda torcido, revisar que las torres estén a la misma distancia del centro.
- La unión brazo–pieza es el punto débil: si se despega, limpiar y volver a pegar con más silicona, o atornillar el brazo con los tornillos pequeños del servo.
- Fuente de 5 V y al menos 1 A. Revisar el GND común de cada equipo antes de que enchufen la fuente: es el error más frecuente.
- Tiempo total: 45 + 5 + 20 + 15 + 15 + 10 + 5 + 5 = 120 minutos.
:::

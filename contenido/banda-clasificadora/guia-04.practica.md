---
titulo: Armar la banda y la etapa de potencia
guia: 4
sabado: 4
sesion: Construcción y electrónica
duracion: 120
---

# Guía 4 · Armar la banda y la etapa de potencia

## Objetivo del día

Armar las piezas impresas sobre la base, controlar el motor TT con un transistor (probando primero con un LED) e instalar el túnel, el sensor IR, el puente y el servo.

**Al terminar tendremos:** la banda moviéndose con la velocidad de la perilla y los sensores en su lugar.

## Materiales del equipo

- Piezas impresas: 2 rodillos, 3 soportes del rodillo, soporte del motor, soporte del servo, túnel y puente de salida
- Base de MDF o cartón grueso de unos 60 × 22 cm, banda de tela o goma de 6 cm de ancho cerrada en lazo (unos 90 cm de largo), 3 palitos de pincho
- Motor TT con 2 tornillos M3 de 25–30 mm y sus tuercas (o un cincho delgado), servo, sensor IR, TCS34725
- Transistor TIP41C, diodo 1N4007, capacitor de 470–1000 µF (10 V o más), resistencias de 220 Ω (2) y 10 kΩ, LED, potenciómetro
- Cargador de celular de 5 V y **2 A o más**, con un cable USB pelado (rojo = 5 V, negro = GND) o un módulo USB con bornes
- Arduino UNO de la banda, protoboard, cables, multímetro, regla, tornillos pequeños para madera o pegamento caliente

**Seguridad:** conecten y desconecten cables **siempre con el cargador desenchufado**, y pidan al docente que revise antes de enchufarlo. La pistola de silicona y el pegamento recién puesto queman.

## Parte 1 · Revisar las piezas (10 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g4p-piezas"
- [ ] El rodillo del motor entra en el eje del TT y no patina.
- [ ] El palito de pincho entra apretado en el soporte y el rodillo libre gira sobre él.
- [ ] Los tornillos (o el cincho) pasan por la ranura del soporte y por los agujeros del motor.
- [ ] El servo entra parado en su soporte, con las pestañas encima.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar el agujero con una lija o con un clavo caliente (con el docente).

## Parte 2 · Armar la banda (35 min)

Miren la imagen de la banda completa para ver dónde va cada cosa:

[IMAGEN 2.1P: banda clasificadora diseñada en Tinkercad, con etiquetas: banda, pieza, rodillo libre, soporte del rodillo, base de MDF o cartón, puente de salida, túnel del sensor, sensor de color, canaleta giratoria, motor TT, contenedores, sensor IR de llegada y soporte del motor]

1. **La línea central:** con regla y lápiz, tracen una línea a lo largo de la base, por el centro. Marquen el **inicio** a 7 cm de un extremo y el **final** a 40 cm del inicio.
2. **El rodillo libre** (en el inicio):
   - Pasen un palito por un soporte, por el rodillo libre y por otro soporte. Las caras de adentro de los soportes quedan a **72 mm**, una a cada lado de la línea.
   - Corten lo que sobre del palito y pongan una gota de silicona donde entra en cada soporte.
3. **El motor** (en el final):
   - Atornillen el motor al soporte del motor: los tornillos pasan por la ranura y por los dos agujeros del motor, con las tuercas del otro lado.
   - Metan el rodillo del motor en el eje del TT (por el lado del hueco plano). En la otra punta del rodillo, un palito que entra en el tercer soporte del rodillo.
   - El soporte del motor va del lado contrario al tercer soporte, con el motor por **dentro** (entre el soporte y el rodillo).
4. **La banda:** pongan el lazo de la banda alrededor de los dos rodillos **antes** de fijar el final. Corran el motor con su rodillo hasta que la banda quede **tensa** y fijen los soportes del final (tornillos o silicona).
   - Los dos rodillos deben quedar paralelos y a la misma altura: mídanlo con la regla.

✔ **Revisa:** giren el rodillo libre con la mano: la banda avanza sin patinar ni irse hacia un lado.

## Parte 3 · Primero con un LED (20 min)

El Arduino da unos 20 mA por pin; el motor necesita cientos. El **transistor TIP41C** es un interruptor electrónico: una corriente pequeña en su **base** deja pasar una corriente grande entre **colector** y **emisor**. Con PWM en la base, controlamos la velocidad.

Antes del motor, probamos con una carga que no se daña: un LED.

**El TIP41C:** mirándolo de frente (con las letras hacia ustedes y las patas hacia abajo), las patas son, de izquierda a derecha: **Base**, **Colector** y **Emisor**.

| Conexión | Destino |
| --- | --- |
| D9 del Arduino | 220 Ω → base del TIP41C |
| Base | 10 kΩ → GND |
| Emisor | GND común (Arduino y cargador) |
| Colector | Cátodo del LED (pata corta) |
| +5 V del cargador | 220 Ω → ánodo del LED |

- Clava el transistor en la protoboard con cada pata en una fila distinta.
- Usa una fila larga de la protoboard para el **GND común**: ahí van un GND del Arduino, el negro del cargador, el emisor y la resistencia de 10 kΩ.
- Usa la otra fila larga para los **+5 V del cargador** (cable rojo).
- **Potenciómetro** (la perilla): pata izquierda → 5V del Arduino, centro → **A0**, pata derecha → GND.

Programa de prueba: conecten el Arduino de la banda por USB, creen un programa nuevo, escriban el código y súbanlo. Después enchufen el cargador.

```cpp
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  int vel = analogRead(A0) / 4;   // perilla: 0 a 255
  analogWrite(9, vel);
}
```

Para medir el voltaje entre colector y emisor: multímetro en voltaje continuo (**V** con línea recta), punta roja en el **colector** y negra en el **emisor**.

:::tabla id="g4p-led"
| Perilla | Brillo del LED | Voltaje entre colector y emisor (V) |
| --- | --- | --- |
| Mínimo | | |
| Mitad | | |
| Máximo | | |
:::

## Parte 4 · Ahora el motor (20 min)

1. Desenchufa el cargador. Cambia el LED por el **motor**: un cable del motor a los **+5 V** y el otro al **colector**.
   - Quiten el LED y su resistencia de 220 Ω. El motor va en su lugar (sin resistencia).
2. Coloca el **diodo** en paralelo con el motor: **franja (cátodo) hacia +5 V**.
   - Una pata del diodo en la misma fila que el cable del motor que va a +5 V (el lado de la franja) y la otra en la fila del colector.
3. Coloca el **capacitor** entre las dos filas largas: la pata **larga** (+) en **+5 V** y la del lado de la franja (−) en **GND**. Evita que el voltaje caiga cuando el motor arranca.
4. Revisa todo con el docente y enchufa el cargador.

:::checklist id="g4p-revision"
- [ ] El diodo tiene la franja hacia +5 V.
- [ ] El capacitor tiene su franja (−) hacia GND.
- [ ] La resistencia de 10 kΩ está entre la base y GND.
- [ ] El GND del Arduino está unido al GND del cargador.
:::

Pongan la perilla en cada posición, déjenla 2 minutos y toquen el transistor **con cuidado y solo un instante**: anoten frío, tibio o caliente.

:::tabla id="g4p-motor"
| Perilla | ¿Se mueve la banda? | Temperatura del TIP41C después de 2 min |
| --- | --- | --- |
| 25 % | | |
| 50 % | | |
| 100 % | | |
:::

:::pregunta id="g4p-p1"
Con el motor y la perilla al máximo, ¿qué voltaje mide entre colector y emisor? Entonces, ¿cuántos voltios le llegan al motor?
:::

## Parte 5 · Túnel, sensor IR, puente y servo (20 min)

1. **El túnel:** sobre la banda, con su centro a **31 cm** del rodillo libre. La pared con la ventana del IR va del lado del motor y la ventana, hacia el inicio.
2. **El sensor IR:** pegado por fuera de esa pared, con sus dos LEDs mirando por la ventana. Conéctalo al Arduino de la banda: OUT → **D2**, VCC → 5V, GND → GND.
3. **El TCS34725:** sobre el techo, con el sensor y su LED mirando hacia abajo por la ventana. Péguenlo por las esquinas de su placa. (Se conecta el sábado 5.)
4. **El puente de salida:** justo después del rodillo del motor, con las patas del lado de la banda. La placa queda a 3 mm del final de la banda.
5. **El servo:** dentro de su soporte, parado y con el eje hacia arriba **justo debajo del centro del agujero** del puente. Peguen el soporte a la base. (La canaleta se pone el sábado 5, con el servo en 90°.)

Con el programa de la Parte 3, prueben:

:::tabla id="g4p-pruebas"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| La banda avanza sin patinar | | |
| La perilla cambia la velocidad | | |
| Con la perilla al mínimo la banda se detiene | | |
| El LED del sensor IR se enciende al pasar una pieza | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] La banda está armada y tensa.
- [ ] Probamos el transistor con un LED.
- [ ] El motor gira con la velocidad de la perilla.
- [ ] El túnel, los sensores, el puente y el servo están en su lugar.
:::

## Bitácora (5 min)

:::foto id="g4p-foto"
Foto de la banda armada.
:::

Antes de irse: desenchufen el cargador.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (7 sábados), nueva el 23 de octubre:** la Guía 4 normal con el armado de las piezas impresas. Por decisión del docente, el motor es un **TT** (3–6 V) controlado con un **TIP41C** y la energía sale de un **cargador de celular de 5 V y 2 A o más**: no hay fuente de 12 V, LM2596 ni fusible. Campos propios (g4p-…).
- TIP41C: 220 Ω en la base dan unos (5 − 0,9) ÷ 220 ≈ 19 mA, seguros para el pin y suficientes para el TT (≈ 0,2 A andando, menos de 1 A al arrancar). Patas mirando de frente: B, C, E.
- g4p-p1: el TIP41C saturado deja unos 0,2–1 V entre colector y emisor (más que el MOSFET de la versión completa); al motor le llegan unos 4–4,8 V, suficiente para el TT.
- El capacitor de 470–1000 µF junto al motor y el servo evita que caiga el voltaje cuando arrancan (y que se reinicien los Arduino si también toman energía del cargador).
- Lazo de la banda: unos 2 × 400 + π × 30 ≈ 895 mm; coser o pegar las puntas con pegamento de contacto, sin que quede un bulto grueso.
- Revisar cada etapa de potencia **antes** de enchufar: diodo o capacitor al revés y colector/emisor invertidos son los errores más comunes.
- Si el motor arranca solo al encender el Arduino, falta la resistencia de 10 kΩ entre la base y GND.
- Tiempo total: 10 + 35 + 20 + 20 + 20 + 5 + 5 = 115 minutos (5 de margen para las pruebas).
:::

---
titulo: Armar la banda
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Armar la banda

## Objetivo del día

Armar las piezas impresas sobre la base, instalar el túnel, los dos sensores, el puente y el servo, y pegar la canaleta con el servo en 90°.

**Al terminar tendremos:** la banda armada y tensa, con los sensores, el servo y la canaleta en su lugar, lista para conectar los circuitos en la Guía 8.

## Materiales del equipo

- Piezas impresas: 2 rodillos, 3 soportes del rodillo, soporte del motor, soporte del servo, túnel, puente de salida y canaleta
- Base de MDF o cartón grueso de unos 60 × 22 cm, banda de tela o goma de 6 cm de ancho cerrada en lazo (unos 90 cm de largo), 3 palitos de pincho
- Motor TT con 2 tornillos M3 de 25–30 mm y sus tuercas (o un cincho delgado), servo, sensor IR, TCS34725
- 3 contenedores (vasos o cajitas de menos de 3 cm de alto)
- Arduino UNO del clasificador y 3 cables macho–macho (para poner el servo en 90°)
- Regla, tornillos pequeños para madera o pegamento caliente

**Seguridad:** la pistola de silicona y el pegamento recién puesto queman.

## Parte 1 · Revisar las piezas (10 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g7p-piezas"
- [ ] El rodillo del motor entra en el eje del TT y no patina.
- [ ] El palito de pincho entra apretado en el soporte y el rodillo libre gira sobre él.
- [ ] Los tornillos (o el cincho) pasan por la ranura del soporte y por los agujeros del motor.
- [ ] El servo entra parado en su soporte, con las pestañas encima.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar el agujero con una lija o con un clavo caliente (con el docente).

## Parte 2 · Armar la banda (45 min)

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
   - El cuerpo del motor va **hacia el inicio** de la banda (debajo del costado de la banda), no hacia el puente de salida: si no, choca con la pata del puente.
   - Para que el rodillo quede centrado: la cara del soporte del motor que toca el motor queda a **5,5 cm** de la línea central, y la cara de adentro del tercer soporte, a **3,6 cm** del otro lado.
4. **La banda:** pongan el lazo de la banda alrededor de los dos rodillos **antes** de fijar el final. Corran el motor con su rodillo hasta que la banda quede **tensa** y fijen los soportes del final (tornillos o silicona).
   - Los dos rodillos deben quedar paralelos y a la misma altura: mídanlo con la regla.

✔ **Revisa:** giren el rodillo libre con la mano: la banda avanza sin patinar ni irse hacia un lado.

## Parte 3 · Túnel, sensores, puente y servo (30 min)

1. **El túnel:** sobre la banda, con su centro a **31 cm** del rodillo libre. La pared con la ventana del IR va del lado del motor y la ventana, hacia el inicio.
2. **El sensor IR:** pegado por fuera de esa pared, con sus dos LEDs mirando por la ventana. (Se conecta el sábado 8.)
3. **El TCS34725:** sobre el techo, con el sensor y su LED mirando hacia abajo por la ventana. Péguenlo por las esquinas de su placa. (Se conecta el sábado 8.)
4. **El puente de salida:** justo después del rodillo del motor, con las patas del lado de la banda. La placa queda a 3 mm del final de la banda.
5. **El servo:** dentro de su soporte, parado y con el eje hacia arriba **justo debajo del centro del agujero** del puente. Peguen el soporte a la base.

## Parte 4 · La canaleta en 90° (25 min)

Antes de pegar la canaleta, el servo debe estar en **90°** (la posición del contenedor del medio).

1. Con el Arduino **desconectado**, conecten el servo directo al Arduino del clasificador: cable **café → GND**, **rojo → 5V**, **naranja → pin 6**.
2. Llamen al docente: conecta el USB y sube un programa corto que deja el servo en 90°. El servo gira un poquito y se queda quieto. Cómo se sube un programa lo aprenderán en la Guía 9.
3. Pongan el brazo del servo y peguen la canaleta encima con silicona, con el lado alto sobre el eje y la rampa apuntando **hacia adelante** (siguiendo la banda). No giren el eje con la mano.
4. Pongan los tres contenedores bajo la punta de la canaleta: el del medio adelante, y los otros dos girando la canaleta con la mano a cada lado (a 30° y a 150°).
5. Desconecten el USB y los tres cables del servo: el servo se conecta el sábado 8.

Desde ahora, **no giren el eje del servo con la mano**.

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] La banda está armada y tensa.
- [ ] El túnel, los sensores, el puente y el servo están en su lugar.
- [ ] La canaleta está pegada con el servo en 90°.
- [ ] Los tres contenedores tienen su lugar marcado.
:::

## Bitácora (5 min)

:::foto id="g7p-foto"
Foto de la banda armada.
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, pueden subirla aquí (.txt o .docx). La próxima sesión la descargan en cualquier computadora y siguen donde se quedaron.
:::

:::docente
- **Versión Práctica (11 sábados desde el 13 de noviembre):** solo el armado mecánico. Las conexiones (LED de prueba, perilla y sensor IR) pasaron a la Guía 8 y las pruebas con el LED y el motor, a la Guía 9 (guías de armado): las tablas g7p-led, g7p-motor y g7p-pruebas, la revisión g7p-revision y la pregunta g7p-p1 ahora son g9a-…. La canaleta, que antes se pegaba en la Guía 8, se pega aquí con el servo en 90°: lo pone el docente. Campos propios (g7p-…).
- **Antes:** era la Guía 4 práctica; luego fue la Guía 7, después de las tres simulaciones (guías 4 a 6). Por decisión del docente, el motor es un **TT** (3–6 V) controlado con un **TIP41C** y la energía sale de una **fuente de 5 V y 2 A o más con jack hembra de bornera** (desde el 30 de octubre, decisión de Bairon): no hay fuente de 12 V, LM2596 ni fusible.
- **Programa para poner el servo en 90° (lo sube el docente en la Parte 4):** Arduino IDE, placa Arduino Uno y su puerto:

```cpp
#include <Servo.h>
Servo desviador;

void setup() {
  desviador.attach(6);
  desviador.write(90);
}

void loop() {
}
```
- El servo solo, sin carga, puede tomar los 5 V del Arduino para esta prueba; desde la Guía 8 toma la energía de la fuente.
- Lazo de la banda: unos 2 × 400 + π × 30 ≈ 895 mm; coser o pegar las puntas con pegamento de contacto, sin que quede un bulto grueso.
- Tiempo total: 10 + 45 + 30 + 25 + 5 + 5 = 120 minutos.
:::

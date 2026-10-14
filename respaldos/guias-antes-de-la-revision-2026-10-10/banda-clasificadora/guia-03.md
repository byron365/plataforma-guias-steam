---
titulo: Motor, MOSFET y sensores
guia: 3
sabado: 3
sesion: Selección de componentes
duracion: 120
---

# Guía 3 · Motor, MOSFET y sensores

## Objetivo del día

Elegir el motor, el MOSFET, la fuente, el sensor de color y el display con cálculos, y diseñar la mecánica de la banda.

**Al terminar tendremos:** la tabla de selección justificada, el presupuesto de energía y el diseño mecánico de la banda con medidas.

## Materiales del equipo

- Motor DC de 12 V con reductora, MOSFET IRLZ44N, diodo 1N4007
- Fuente de 12 V, regulador LM2596
- Multímetro
- Hojas de datos (impresas o en la computadora)

## Parte 1 · ¿Por qué un MOSFET? (25 min)

El Arduino da 5 V y unos 20 mA por pin; el motor necesita **12 V** y cientos de mA. El **MOSFET** es un interruptor electrónico: una señal pequeña en su **gate** deja pasar una corriente grande entre **drain** y **source**. Con PWM en el gate, controlamos la velocidad.

:::animacion tipo="mosfet"
:::

:::tabla id="g3-mosfet"
| Característica | IRFZ44N | IRLZ44N |
| --- | --- | --- |
| Voltaje de gate para encender por completo | 10 V | 5 V (nivel lógico) |
| ¿Se enciende bien con los 5 V del Arduino? | | |
| Corriente máxima | 49 A | 47 A |
| Resistencia encendido (RDS) | 17 mΩ a 10 V | 22 mΩ a 5 V |
:::

:::pregunta id="g3-p1"
¿Por qué elegimos el IRLZ44N y no el IRFZ44N, si se parecen tanto?
:::

## Parte 2 · Protecciones (20 min)

| Componente | Dónde va | ¿Para qué sirve? |
| --- | --- | --- |
| Resistencia de 220 Ω | Entre el pin D9 y el gate | Limita el pico de corriente al cargar el gate |
| Resistencia de 10 kΩ | Entre el gate y GND | Mantiene el motor apagado si el Arduino no envía señal (al encender) |
| Diodo 1N4007 (rueda libre) | En paralelo con el motor, franja hacia +12 V | |
| Fusible | Entrada de la fuente | |

:::animacion tipo="rueda-libre"
:::

:::pregunta id="g3-p2"
Un motor es una bobina. ¿Qué pasa con su energía cuando el MOSFET se apaga de golpe, y cómo lo resuelve el diodo?
:::

## Parte 3 · Presupuesto de energía (25 min)

Mide la corriente del motor sin carga con el multímetro (en serie, 12 V directo):

:::tabla id="g3-energia"
| Componente | Línea | Corriente (mA) |
| --- | --- | --- |
| Motor DC sin carga (medido) | 12 V | |
| Motor DC con la banda (estimar ×2) | 12 V | |
| Arduino banda | 5 V | 50 |
| Arduino clasificador | 5 V | 50 |
| Servo MG90S (en movimiento) | 5 V | 300 |
| TCS34725 con LED | 5 V | 20 |
| MAX7219 (todos los dígitos) | 5 V | 150 |
| Total en 5 V | | |
:::

> Potencia que toma el regulador de la línea de 12 V ≈ (5 V × corriente en 5 V) ÷ (12 V × 0,85)

:::pregunta id="g3-p3"
Con todo funcionando, ¿cuánta corriente sale de la fuente de 12 V? ¿Alcanza una fuente de 2 A?
:::

## Parte 4 · Sensores y display (15 min)

:::tabla id="g3-seleccion"
| Función | Opción A | Opción B | Elegimos | ¿Por qué? |
| --- | --- | --- | --- | --- |
| Sensor de color | TCS34725 (I2C, LED propio) | TCS3200 (frecuencia, 4 pines de control) | | |
| Detección de llegada | IR de obstáculos | Fotorresistencia + LED | | |
| Display del conteo | MAX7219 8 dígitos (SPI, 3 pines) | 3 displays de 7 segmentos sueltos | | |
| Desviador | Servo MG90S (engranes metálicos) | Servo SG90 | | |
:::

## Parte 5 · Diseño mecánico (30 min)

:::tabla id="g3-mecanica"
| Parte | Medida o material |
| --- | --- |
| Largo de la banda entre rodillos | 40 cm |
| Ancho de la banda | 6 cm |
| Diámetro de los rodillos | 3 cm |
| Material de la banda | Tela, liga ancha o goma |
| Posición del sensor IR (desde el inicio) | |
| Posición del sensor de color | Justo después del IR |
| Distancia del sensor de color al desviador | |
| Número de contenedores | 3 |
:::

> Velocidad de la banda (cm/s) = π × diámetro del rodillo × vueltas por segundo

:::pregunta id="g3-p4"
Si el rodillo de 3 cm da 0,5 vueltas por segundo, ¿a qué velocidad va la banda? ¿Cuánto tarda una pieza en recorrer 12 cm del sensor al desviador?
:::

[IMAGEN 3.1: boceto lateral de la banda con rodillos, motor, sensor IR, sensor de color en un túnel, desviador y contenedores]

:::foto id="g3-boceto"
Boceto con medidas del equipo.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Justificamos el MOSFET.
- [ ] Ubicamos cada protección.
- [ ] Hicimos el presupuesto de energía.
- [ ] Elegimos sensores y display.
- [ ] Tenemos el diseño mecánico con medidas.
:::

## Bitácora

:::tabla id="g3-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- g3-p1: el IRFZ44N con 5 V en el gate queda a medio encender, se calienta y no entrega toda la corriente.
- g3-p2: la bobina genera un pico de voltaje inverso que puede destruir el MOSFET; el diodo le da un camino para descargarse.
- g3-p4: 3,14 × 3 × 0,5 ≈ 4,7 cm/s; 12 cm tardan ≈ 2,5 s. Ese tiempo es el RECORRIDO del código (se mide en el sábado 6).
- Los rodillos pueden imprimirse en 3D (cilindro de 30 mm con eje de 5 mm) o hacerse con tubo de PVC y tapitas.
- Tiempo total: 25 + 20 + 25 + 15 + 30 + 5 = 120 minutos (bitácora breve al final de la Parte 5).
:::

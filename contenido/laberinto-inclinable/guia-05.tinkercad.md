---
titulo: ¡El tablero se mueve!
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · ¡El tablero se mueve!

## Objetivo del día

Ajustar el control del tablero con el joystick, elegir cuánto se inclina y diseñar las tres piezas pequeñas: el soporte del sensor, el soporte de la pantalla y la base del joystick.

**Al terminar tendremos:** la canica recorriendo el laberinto con el joystick y las tres piezas pequeñas listas para imprimir.

## Materiales del equipo

- El laberinto armado del sábado 4 y su circuito (Arduino, joystick, 2 servos, pilas)
- Canica y celular para cronometrar
- Computadora con Arduino IDE, internet y la cuenta de Tinkercad
- Para medir: el sensor infrarrojo, la pantalla OLED, el buzzer y el joystick, con una regla o calibrador

## Parte 1 · Terminar el montaje (10 min)

Si el sábado 4 no terminaron de armar, termínenlo ahora con la **Guía 4, Parte 4**. Después revisen:

:::checklist id="g5t-montaje"
- [ ] El marco gira libre sobre sus ejes.
- [ ] El tablero gira libre dentro del marco.
- [ ] Con los servos en 90° el tablero está plano.
- [ ] Ningún cable estorba el movimiento.
:::

## Parte 2 · Control con el joystick (20 min)

Suban `equipo_NOMBRE_prueba_servos` (Guía 4), pongan las pilas y la canica en la salida. Muevan el joystick **despacio** hacia cada lado:

| Movimiento del joystick | ¿Hacia dónde se inclina el tablero? | ¿Es lo esperado? |
| --- | --- | --- |
| Derecha | | |
| Izquierda | | |
| Arriba | | |
| Abajo | | |

Si un eje se mueve **al revés**, cambien el orden de los dos últimos números de su `map`:

- Busquen en el `loop()` la línea `int angX = map(…);` (o la de `angY`) y cambien de lugar los dos últimos números, como en el ejemplo. Suban otra vez y prueben.

```cpp
// antes:  CENTRO - INCLINACION, CENTRO + INCLINACION
// al revés:
int angX = map(analogRead(A0), 0, 1023, CENTRO + INCLINACION, CENTRO - INCLINACION);
```

## Parte 3 · ¿Cuánta inclinación necesitamos? (20 min)

1. En la línea `const int INCLINACION = 15;` cambien el número por el de cada fila y suban el código.
2. Pongan la canica en la salida y llévenla a la meta. Una persona cronometra con el celular (si no llega, escriban "no llegó").

:::tabla id="g5t-inclinacion"
| INCLINACION | ¿La canica se mueve? | ¿Es fácil de controlar? | Tiempo para llegar a la meta (s) |
| --- | --- | --- | --- |
| 5 | | | |
| 10 | | | |
| 15 | | | |
| 20 | | | |
:::

:::pregunta id="g5t-p1"
¿Qué valor de INCLINACION elegimos y por qué?
:::

Dejen en el código el valor elegido y guárdenlo (**Ctrl + S**). **Saquen las pilas** antes de pasar a la computadora.

## Parte 4 · Las tres piezas pequeñas (55 min)

[IMAGEN 5.1T: piezas pequeñas en Tinkercad Codeblocks, con etiquetas: base del joystick con la salida de los cables, soporte del sensor, y soporte de la pantalla con su ventana y el agujero del buzzer]

**Primero midan** con la regla o el calibrador y anoten. Los huecos se hacen **0,6 mm más grandes** que la pieza, para que entre sin forzar.

:::tabla id="g5t-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) | Hueco = medida + 0,6 |
| --- | --- | --- | --- |
| Placa del sensor: ancho | 14.6 | | |
| Placa del sensor: grueso (con sus piezas) | 9.4 | | |
| Placa del joystick: ancho | 26 | | |
| Placa del joystick: largo | 34 | | |
:::

Cada pieza va en su **propio diseño** (**+ Crear → Codeblocks**). Si sus medidas son distintas al ejemplo, cambien los números del ejemplo por los suyos.

**1. Soporte del sensor** (`equipo_NOMBRE_soporte_sensor`): una tapa con un tubo donde el sensor entra parado. Se pega debajo del tablero, bajo el agujero de la meta.

- **Tapa:** **Cubo** con primer **A = 30**, **L = 24**, segundo **A = 2**. **Mover: X 0, Y 0, Z 1**.
- **Tubo:** **Cubo** con primer **A = 19.2**, **L = 14**, segundo **A = 12** (el hueco + 4). **Mover: X 0, Y 0, Z 8**.
- **Hueco del sensor:** **Cubo** hueco con primer **A = 15.2**, **L = 10**, segundo **A = 20** (el ancho y el grueso de su tabla). **Mover: X 0, Y 0, Z 7**.
- **Seleccionar todo** y **Group Selection**. **✔ Revisa:** el hueco atraviesa la tapa y el tubo. Exporta `equipo_NOMBRE_soporte_sensor.stl`.

**2. Base del joystick** (`equipo_NOMBRE_base_joystick`): una placa con un cerco donde encaja el joystick, abierto por un lado para los cables.

- **Placa:** **Cubo** con primer **A = 60**, **L = 50**, segundo **A = 4**. **Mover: X 0, Y 0, Z 2**.
- **Cerco:** **Cubo** con primer **A = 32.6**, **L = 40.6**, segundo **A = 6** (el hueco + 6). **Mover: X 0, Y 0, Z 7**.
- **Hueco del joystick:** **Cubo** hueco con primer **A = 26.6**, **L = 34.6**, segundo **A = 10** (el ancho y el largo de su tabla). **Mover: X 0, Y 0, Z 9**. (Empieza justo encima de la placa: la placa no se agujerea.)
- **Salida de los cables:** **Cubo** hueco con primer **A = 16**, **L = 10**, segundo **A = 10**. **Mover: X 0, Y 18.8, Z 9**.
- **Seleccionar todo** y **Group Selection**. **✔ Revisa:** el cerco tiene una abertura en un lado. Exporta `equipo_NOMBRE_base_joystick.stl`.

**3. Soporte de la pantalla** (`equipo_NOMBRE_soporte_pantalla`): un panel inclinado con una ventana para la pantalla y un agujero para el buzzer, sobre una base.

- **Panel:** **Cubo** con primer **A = 70**, **L = 4**, segundo **A = 50**. No se mueve.
- **Ventana de la pantalla:** **Cubo** hueco con primer **A = 25**, **L = 10**, segundo **A = 14**. **Mover: X 0, Y 0, Z 8**.
- **Agujero del buzzer:** **Cilindro** hueco con **Radio = 6.2**, **A = 10**, **Lados = 32**. Debajo, **Girar alrededor** con **Eje x** y **90**, y **Mover: X 0, Y 0, Z −14**.
- **Seleccionar todo** y **Group Selection**.
- **Inclinar el panel:** **Girar alrededor** con **Eje x** y **−15**, y **Mover: X 0, Y 0, Z 27.5**.
- **Base:** **Cubo** con primer **A = 70**, **L = 45**, segundo **A = 4**. **Mover: X 0, Y 2.5, Z 2**.
- Otra vez **Seleccionar todo** y **Group Selection**. **✔ Revisa:** míralo de lado: el panel está un poco echado hacia atrás. Exporta `equipo_NOMBRE_soporte_pantalla.stl`.

:::pregunta id="g5t-p2"
Si nuestro sensor midiera 1 mm más de ancho, ¿qué números del soporte del sensor tendríamos que cambiar?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5t-logramos"
- [ ] El tablero se inclina en los dos ejes con el joystick.
- [ ] Los ejes se mueven hacia el lado correcto.
- [ ] Elegimos la inclinación ideal.
- [ ] Exportamos las 3 piezas pequeñas.
:::

## Reto extra

Escribe el **nombre del equipo** en la base del soporte de la pantalla, delante del panel.

Pista: antes del último **Seleccionar todo**, agrega de **Formas** el bloque **Texto** y escribe el nombre. Debajo, **Definir tamaño** con **X = 60**, **Y = 8**, **Z = 1** y **Mover: X 0, Y −14, Z 4.5**. Si las letras se ven aplastadas, escriban un nombre más corto.

## Bitácora (10 min)

:::foto id="g5t-foto"
Video corto de la canica moviéndose por el laberinto.
:::

:::pregunta id="g5t-b1"
¿Qué problemas mecánicos tuvimos y cómo los resolvimos?
:::

Antes de irse: suban el programa con su inclinación elegida y, en un `.zip`, los 3 `.stl` de las piezas pequeñas. El docente las imprimirá para el sábado 6.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y el .zip con los .stl. La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, nueva el 21 de octubre:** el centrado y el montaje pasaron a la Guía 4T; aquí quedan el control y la inclinación de la Guía 5 normal y el diseño de las tres piezas pequeñas que se usan desde la Guía 6. Campos propios (g5t-…).
- El soporte de la pantalla es el mismo del mini fútbol (ventana de 25 × 14 mm para la OLED de 0,96", agujero de 12,4 mm para el buzzer de 12 mm).
- Soporte del sensor: el FC-51 entra **parado**, con los dos LEDs hacia arriba, hasta tocar el tablero. El tubo solo cubre la parte de arriba de la placa: el tornillo azul queda afuera para ajustarlo. Medidas de ejemplo: placa de 14,6 mm con piezas de 9,4 mm de grueso.
- Base del joystick: medidas de ejemplo de un módulo KY-023 de 26 × 34 mm; la salida de los cables va en el lado de los pines. Si el joystick baila, una gota de silicona en el cerco.
- Con INCLINACION mayor de 20 la canica suele saltar las paredes; el soporte está pensado hasta 20.
- g5t-p2: el ancho del hueco (15.2 → 16.2) y el ancho del tubo (19.2 → 20.2).
- Impresión: las tres piezas juntas, unas 1,5 h; sin soportes (el soporte del sensor con la tapa en la cama).
- Tiempo total: 10 + 20 + 20 + 55 + 5 + 10 = 120 minutos.
:::

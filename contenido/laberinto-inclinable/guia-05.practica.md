---
titulo: Las piezas y los servos
guia: 5
sabado: 5
sesion: Diseño 3D
duracion: 120
---

# Guía 5 · Las piezas y los servos

## Objetivo del día

Revisar las piezas impresas, diseñar la **base del joystick**, fijar las torres en la base y dejar los servos en 90° y en su lugar.

**Al terminar tendremos:** la base del joystick exportada en STL, las torres fijas y los dos servos centrados y colocados.

## Materiales del equipo

- Piezas impresas: tablero, marco, torre del servo y torre del eje
- 2 servos SG90 con sus tornillos y 1 palito de pincho (o clavo de 3 mm)
- Módulo joystick y una regla o calibrador
- Computadora con internet, mouse, la cuenta de Tinkercad del equipo y Arduino IDE
- Base de MDF o cartón grueso de unos 30 × 25 cm, 4 tornillos para madera pequeños (o pegamento caliente), regla y lápiz
- Arduino UNO + cable USB, protoboard y cables
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos, destornillador pequeño

**Seguridad con el pegamento caliente:** la punta de la pistola y el pegamento recién puesto queman. Esperen unos segundos antes de tocarlo y dejen la pistola parada en su base.

## Parte 1 · Revisar las piezas (15 min)

Prueben cada cosa **sin pegar nada** y marquen:

:::checklist id="g5p-piezas"
- [ ] El servo entra en la ventana del marco y en la ventana de la torre del servo, sin forzarlo.
- [ ] El palito de pincho pasa por el agujero de la torre del eje y por los dos agujeros del marco.
- [ ] El palito entra en la bisagra del tablero.
- [ ] El tablero cabe dentro del marco sin tocarlo.
:::

Si algo no entra, avisen al docente antes de seguir: a veces basta con limpiar los bordes con una lija o pasar un clavo por el agujero.

## Parte 2 · La base del joystick (35 min)

Es una placa con un cerco donde encaja el joystick, abierto por un lado para los cables.

[IMAGEN 5.1P: base del joystick en Tinkercad Codeblocks, con etiquetas: base del joystick y salida de los cables]

**Primero midan** con la regla o el calibrador y anoten. El hueco se hace **0,6 mm más grande** que la pieza, para que entre sin forzar.

:::tabla id="g5p-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) | Hueco = medida + 0,6 |
| --- | --- | --- | --- |
| Placa del joystick: ancho | 26 | | |
| Placa del joystick: largo | 34 | | |
:::

Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_base_joystick`. Si sus medidas son distintas al ejemplo, cambien los números del ejemplo por los suyos.

1. **Placa:** **Cubo** con primer **A = 60**, **L = 50**, segundo **A = 4**. **Mover: X 0, Y 0, Z 2**.
2. **Cerco:** **Cubo** con primer **A = 32.6**, **L = 40.6**, segundo **A = 6** (el hueco + 6). **Mover: X 0, Y 0, Z 7**.
3. **Hueco del joystick:** **Cubo** hueco con primer **A = 26.6**, **L = 34.6**, segundo **A = 10** (el ancho y el largo de su tabla). **Mover: X 0, Y 0, Z 9**. (Empieza justo encima de la placa: la placa no se agujerea.)
4. **Salida de los cables:** **Cubo** hueco con primer **A = 16**, **L = 10**, segundo **A = 10**. **Mover: X 0, Y 18.8, Z 9**.
5. **Seleccionar todo** y **Group Selection**. **✔ Revisa:** el cerco tiene una abertura en un lado.
6. **Exporta** `equipo_NOMBRE_base_joystick.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).

:::pregunta id="g5p-p1"
Si nuestro joystick midiera 1 mm más de ancho, ¿qué números de la base tendríamos que cambiar?
:::

## Parte 3 · Las torres en la base (15 min)

1. Con regla y lápiz, tracen en la base una **línea de lado a lado por el centro**.
2. Pongan las dos torres sobre esa línea, una frente a la otra, con las **caras lisas (sin aletas) mirando hacia adentro**.
   - Mirando la base desde adelante (desde donde jugarán), la **torre del servo** va a la **derecha** y la **torre del eje** a la **izquierda**.
   - La distancia entre las dos caras lisas debe ser de **21,3 cm**. Cada torre a la misma distancia del centro.
   - Los agujeros de las torres deben quedar a la misma altura y uno frente al otro.
3. Atornillen cada pie con dos tornillos (con el docente) o péguenlo con bastante pegamento caliente.

## Parte 4 · Energía y servos en 90° (30 min)

Dos servos con el tablero encima piden más corriente de la que da el Arduino: si los conectamos al Arduino, se reinicia y el tablero tiembla. Por eso los servos usan una **fuente de 5 V aparte**, con una regla de oro:

> **Todas las tierras (GND) deben estar unidas.** Sin GND común, los servos no entienden la señal del Arduino.

La fuente se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**. Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten.

Hagan todo con el USB desconectado y la **fuente desenchufada**. En la protoboard usen las filas largas de los bordes: **arriba** para la fuente y **abajo** para el Arduino.

1. **Energía:** tornillo **+** del jack → fila **+** de arriba; tornillo **−** → fila **−** de arriba. Del Arduino: **5V** → fila **+** de abajo; **GND** → fila **−** de abajo.
2. **GND común:** un cable de la fila **−** de arriba a la fila **−** de abajo. (¡Nunca unan las dos filas **+**!)
3. **Servos** (con tres cables macho–macho en cada conector): rojo → fila **+** de **arriba** (fuente); café → fila **−** de arriba; naranja → **D9** (servo del marco) y **D10** (servo del tablero). Marquen cada servo con un papelito: "D9 marco" y "D10 tablero".

[IMAGEN 6.1P: circuito real del laberinto con la fuente de 5 V en su jack hembra, joystick, dos servos y el GND común señalado]

**Servos en 90°:** antes de pegar los brazos, los dos servos deben estar en **90°** (tablero plano).

4. Conecten el USB, abran **Arduino IDE** y elijan **Arduino Uno** y su puerto en **Seleccionar placa**.
5. **Archivo → Nuevo boceto**, borren lo que trae y escriban este código. Súbanlo (→).
6. Enchufen la fuente: los dos servos giran a 90° y se quedan quietos. **No giren sus ejes con la mano después de esto.**

```cpp
#include <Servo.h>
Servo servoX, servoY;

void setup() {
  servoX.attach(9);
  servoY.attach(10);
  servoX.write(90);
  servoY.write(90);
}

void loop() {
}
```

7. Desenchufen la fuente y el USB.

## Parte 5 · Los servos en su lugar (10 min)

1. **El servo del tablero en el marco** (servo D10).
   - Miren el marco **desde adelante** (desde afuera, con la ventana frente a ustedes).
   - Metan el servo por la ventana desde afuera, con el **eje hacia la derecha**: el eje debe quedar justo en el centro del marco. Las pestañas se apoyan en la cara de afuera.
   - Atornillen las pestañas con los tornillos del servo (o pónganles una gota de silicona).
2. **El servo del marco en la torre** (servo D9).
   - Metan el servo por la ventana de la torre del servo **desde afuera** (desde el lado de las aletas), **parado y con el eje arriba**. El eje queda mirando hacia el centro de la base.
   - Atornillen sus pestañas a la torre.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] Revisamos las piezas impresas con el servo y el palito.
- [ ] Exportamos la base del joystick.
- [ ] Las torres están fijas en la base.
- [ ] Los servos usan la fuente con GND común y quedaron en 90°.
- [ ] Los dos servos están en su lugar.
:::

## Bitácora (10 min)

:::pregunta id="g5p-b1"
¿Por qué el hueco se hace un poco más grande que la pieza que entra en él?
:::

Antes de irse: suban aquí `equipo_NOMBRE_base_joystick.stl`. El docente la imprimirá para el sábado 6.

:::archivo id="g5-archivo"
**Archivo de trabajo:** suban aquí el .stl que exportaron. Su diseño de bloques queda guardado en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (7 sábados):** la revisión de piezas, las torres, el circuito y los servos en 90° de la Guía 4 Tinkercad y la base del joystick de la Guía 5 Tinkercad. La **fuente de 5 V con jack hembra** reemplaza al portapilas de 4 AA, como en las demás versiones prácticas. Campos propios (g5p-…).
- **Imprimir esta semana** la base del joystick, sin soportes.
- Distancia entre torres: las caras lisas quedan a 212,6 mm (21,3 cm). Entre la torre y el marco quedan unos 7 mm para el brazo del servo.
- Base del joystick: medidas de ejemplo de un módulo KY-023 de 26 × 34 mm; la salida de los cables va en el lado de los pines. Si el joystick baila, una gota de silicona en el cerco.
- Fuente de 5 V y al menos 1 A. Revisar el GND común de cada equipo antes de que enchufen la fuente: es el error más frecuente.
- El servo del tablero entra con el eje hacia la derecha (mirando desde adelante); si entra al revés, el eje queda 1 cm corrido y el tablero roza.
- g5p-p1: el ancho del hueco (26.6 → 27.6) y el ancho del cerco (32.6 → 33.6).
- g5p-b1: holgura; la impresora no es perfecta y la pieza no entraría o quedaría muy apretada.
- Tiempo total: 15 + 35 + 15 + 30 + 10 + 5 + 10 = 120 minutos.
:::

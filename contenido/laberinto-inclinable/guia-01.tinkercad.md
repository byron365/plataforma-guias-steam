---
titulo: Un joystick que mueve motores
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · Un joystick que mueve motores

## Objetivo del día

Conocer el proyecto, formar el equipo con sus roles y programar en Wokwi un joystick que mueve un servomotor.

**Al terminar tendremos:** un servo virtual que gira cuando movemos el joystick.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com (una por equipo)
- Bitácora

## Parte 1 · ¿Qué vamos a construir? (15 min)

Un **laberinto inclinable**: un tablero con paredes y una canica. Dos servomotores inclinan el tablero hacia adelante, atrás, izquierda o derecha, y nosotros los controlamos con un **joystick**. Cuando la canica llega a la meta, un sensor la detecta, suena el buzzer y la pantalla muestra nuestro tiempo.

Miren la animación: así funcionará nuestro laberinto.

:::animacion tipo="laberinto"
:::

[IMAGEN 1.1: render del laberinto inclinable terminado con la canica, el joystick y la pantalla OLED]

:::pregunta id="g1-p1"
¿Qué juegos o máquinas conoces que se controlen inclinando algo?
:::

## Parte 2 · Nuestro equipo (15 min)

1. Lean qué hace cada rol y decidan quién tendrá cada uno (si son menos de cuatro, alguien tiene dos).
2. Escriban los nombres en la columna **Integrante**.

| Rol | ¿Qué hace? | Integrante |
| --- | --- | --- |
| Diseñador CAD | Diseña el tablero y el soporte en Tinkercad (Codeblocks) | |
| Constructor | Arma el circuito y el mecanismo | |
| Programador | Escribe y prueba el código | |
| Analista | Mide tiempos, hace gráficas y cuida la bitácora | |

3. Elijan un nombre para el equipo:

Nombre de nuestro equipo: ______

## Parte 3 · ¿Cómo funciona un joystick? (15 min)

Un joystick tiene **dos perillas** (potenciómetros) por dentro: una para el eje X (izquierda–derecha) y otra para el eje Y (arriba–abajo). El Arduino lee cada una como un número de **0 a 1023**. En el centro, el número es cerca de **512**.

Muevan la palanca en la animación y fíjense en el número del eje X:

:::animacion tipo="joystick" servos="no"
:::

| Posición del joystick | Valor de X esperado |
| --- | --- |
| Todo a la izquierda | 0 |
| En el centro | ≈ 512 |
| Todo a la derecha | 1023 |

También tiene un **botón**: se presiona hundiendo la palanca.

## Parte 4 · Leer el joystick en Wokwi (25 min)

**Wokwi** es un simulador: arma y prueba circuitos en la computadora, sin piezas reales. La página está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Crea un proyecto nuevo de **Arduino Uno** en wokwi.com.
   - Inicien sesión (**Sign in**, arriba a la derecha), bajen hasta **Start from Scratch** y elijan **Arduino Uno**.
   - A la izquierda queda el código (pestaña `sketch.ino`) y a la derecha el Arduino dibujado.
2. Agrega un **Analog Joystick** y conéctalo:
   - Con el botón **+** azul (arriba del dibujo) busquen *Analog Joystick* y hagan clic en él.
   - Para hacer un cable: clic en la punta de un pin y clic en el pin de destino. Para borrarlo: clic en el cable y **Supr**. Al pasar el mouse sobre un pin aparece su nombre.

| Pin del joystick | Pin del Arduino |
| --- | --- |
| VCC | 5V |
| VERT | A1 |
| HORZ | A0 |
| SEL | D2 |
| GND | GND |

[IMAGEN 1.2: joystick analógico conectado al Arduino Uno en Wokwi]

3. Copia el código y presiona **Play**:
   - En `sketch.ino` borren lo que trae y escriban (o peguen) el código con cuidado: cada `;`, `{ }` y mayúscula cuentan.
   - **Play** es el botón verde con un triángulo ▶. Los números aparecen abajo, en el Monitor serie.

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int x = analogRead(A0);
  int y = analogRead(A1);
  Serial.print("X: ");
  Serial.print(x);
  Serial.print("   Y: ");
  Serial.println(y);
  delay(200);
}
```

4. Mueve el joystick con el ratón y anota:
   - Con la simulación andando, haz clic en el joystick dibujado y arrastra la palanca con el mouse (o usa las flechitas que aparecen). Al soltar, regresa al centro.
   - Para cada posición, anota los dos números del Monitor serie.

| Posición | X | Y |
| --- | --- | --- |
| Centro | | |
| Arriba | | |
| Abajo | | |
| Izquierda | | |
| Derecha | | |

:::pregunta id="g1-p2"
¿Hacia dónde hay que mover el joystick para que Y valga 0?
:::

## Parte 5 · El joystick mueve un servo (25 min)

1. Agrega un **Servo** y conéctalo: **V+ → 5V**, **GND → GND**, **PWM → D9**.
   - Con el **+** busquen *Servo*. El Arduino de Wokwi tiene varios pines GND y 5V: pueden usar cualquiera.
2. Cambia el código:
   - Detengan la simulación (botón de cuadrado), borren el código anterior y escriban este:

```cpp
#include <Servo.h>
Servo servoX;

void setup() {
  servoX.attach(9);
}

void loop() {
  int x = analogRead(A0);
  int angulo = map(x, 0, 1023, 0, 180);  // 0-1023 se convierte en 0-180
  servoX.write(angulo);
  delay(20);
}
```

3. Presionen **Play** y muevan el joystick a la izquierda y a la derecha: el servo gira.

[IMAGEN 1.3: simulación en Wokwi con el joystick y el servo girando según su posición]

`map()` traduce un rango de números a otro. Aquí convierte la lectura del joystick (0 a 1023) en grados del servo (0 a 180).

:::pregunta id="g1-p3"
Si el joystick está en el centro (512), ¿en qué ángulo queda el servo? Compruébalo en la simulación.
:::

**Mini reto:** el tablero real no puede girar 180°, se caería la canica. Cambia el `map` para que el servo solo se mueva entre **75° y 105°**.

- En la línea del `map`, los dos últimos números dicen entre qué ángulos se mueve el servo. Piensen cuáles cambiar.
- Para comprobarlo: lleven el joystick a cada extremo y miren el ángulo que muestra el servo de Wokwi.

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Cada integrante tiene su rol.
- [ ] Leímos los valores del joystick en el monitor serie.
- [ ] El servo se mueve con el joystick.
- [ ] Limitamos el movimiento entre 75° y 105°.
:::

## Reto extra

Agrega un **segundo servo** en D10 que se mueva con el eje Y. Guarda el proyecto y copia su enlace en la bitácora.

Pistas: otro `Servo` (por ejemplo `servoY`), su `attach(10)` en el `setup()`, y en el `loop()` la lectura de `A1` con su propio `map` y su `write`.

## Bitácora (15 min)

Para el enlace: presionen **Save** (arriba), copien la dirección de la barra del navegador (Ctrl + C) y péguenla abajo (Ctrl + V).

:::pregunta id="g1-b1"
Enlace de nuestro proyecto en Wokwi:
:::

:::pregunta id="g1-b2"
Explica con tus palabras qué hace la función `map()`.
:::

Si quieren, descarguen también el proyecto como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g1-p3: map(512, 0, 1023, 0, 180) ≈ 90°.
- Mini reto: `map(x, 0, 1023, 75, 105)`.
- En Wokwi el joystick puede dar el eje Y invertido respecto a lo esperado: buena oportunidad para que lo descubran con la tabla.
- Si es la primera vez con código de texto: recordar `;`, llaves y mayúsculas (`Servo`, no `servo`).
- Tiempo total: 15 + 15 + 15 + 25 + 25 + 5 + 15 = 115 minutos (5 de margen).
:::

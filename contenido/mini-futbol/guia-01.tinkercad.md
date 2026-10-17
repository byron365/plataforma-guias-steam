---
titulo: Un marcador que cuenta goles
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · Un marcador que cuenta goles

## Objetivo del día

Conocer el proyecto, formar el equipo con sus roles y programar en Wokwi un primer marcador: un botón que suma goles en una pantalla OLED.

**Al terminar tendremos:** un marcador virtual que cuenta goles cada vez que presionamos un botón.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com (una por equipo)
- Bitácora

## Parte 1 · ¿Qué vamos a construir? (15 min)

Una **cancha de mini fútbol** con un **marcador electrónico**. Cada portería tiene un sensor infrarrojo que detecta cuando entra la pelota. El Arduino suma el gol, lo muestra en una pantalla OLED y celebra con el buzzer. Además, el marcador lleva el **tiempo del partido**.

Miren la animación: así funcionará nuestro marcador.

:::animacion tipo="futbol"
:::

[IMAGEN 1.1: render de la cancha de mini fútbol con las dos porterías y el marcador OLED]

:::pregunta id="g1-p1"
¿Qué deportes usan marcadores electrónicos o tecnología para saber si hubo gol o punto?
:::

## Parte 2 · Nuestro equipo (15 min)

1. Lean qué hace cada rol y decidan quién tendrá cada uno (si son menos de cuatro, alguien tiene dos).
2. Escriban los nombres en la columna **Integrante**.

| Rol | ¿Qué hace? | Integrante |
| --- | --- | --- |
| Diseñador CAD | Diseña las porterías y las piezas en Tinkercad (Codeblocks) | |
| Constructor | Arma la cancha y el circuito | |
| Programador | Escribe y prueba el código | |
| Analista | Anota resultados, hace gráficas y cuida la bitácora | |

3. Elijan un nombre para el equipo:

Nombre de nuestro equipo: ______

## Parte 3 · De bloques a texto (15 min)

En Básico programamos con bloques; ahora escribiremos **código de texto**. Todo programa de Arduino tiene dos partes:

| Parte | ¿Cuándo se ejecuta? | Ejemplo en el marcador |
| --- | --- | --- |
| `setup()` | Una vez, al encender | Encender la pantalla |
| `loop()` | Una y otra vez | Revisar si hubo gol |

Reglas: cada instrucción termina en `;`, los bloques van entre `{ }` y los comentarios empiezan con `//`. Las mayúsculas cuentan: `pantalla` no es lo mismo que `Pantalla`.

Una **variable** guarda un dato que cambia. Los goles son números enteros, por eso usamos `int`:

```cpp
int goles = 0;     // empieza en cero
goles = goles + 1; // suma un gol
goles++;           // forma corta de sumar 1
```

## Parte 4 · El circuito en Wokwi (20 min)

**Wokwi** es un simulador: arma y prueba circuitos de Arduino en la computadora, sin piezas reales. La página está en inglés; aquí van los nombres de los botones tal como aparecen.

1. Crea un proyecto nuevo de **Arduino Uno**.
   - En **wokwi.com**, inicien sesión (**Sign in**, arriba a la derecha), bajen hasta **Start from Scratch** y elijan **Arduino Uno**.
   - A la izquierda queda el código (pestaña `sketch.ino`) y a la derecha el Arduino dibujado.
2. Agrega una pantalla **SSD1306 OLED** y un **botón** (Pushbutton).
   - Con el botón **+** azul (arriba del dibujo) busquen *SSD1306* y *Pushbutton* y hagan clic en cada uno.
   - Para hacer un cable: clic en la punta de un pin y clic en el pin de destino. Para borrarlo: clic en el cable y **Supr**. Al pasar el mouse sobre un pin aparece su nombre.
   - **Botón:** sus patas de un mismo lado están unidas por dentro. Usen una pata de cada lado (por ejemplo, una de arriba a la izquierda y otra de abajo a la derecha).

| Componente | Conexión |
| --- | --- |
| OLED | VCC → 5V · GND → GND · SDA → A4 · SCL → A5 |
| Botón | Una pata → D3 · la otra → GND |

[IMAGEN 1.2: Arduino Uno en Wokwi con la pantalla OLED y un botón conectado a D3]

3. En **Library Manager** agrega **Adafruit SSD1306** y **Adafruit GFX Library**.
   - Arriba del código hay una pestaña **Library Manager**: haz clic en ella, luego en el **+**, escribe el nombre de cada librería y elígela.
   - Una **librería** es código ya hecho que nos ahorra trabajo (en este caso, para dibujar en la pantalla).

## Parte 5 · Contar goles (30 min)

1. Vuelve a la pestaña `sketch.ino`, borra lo que trae y escribe (o pega) este programa:

```cpp
#include <Wire.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 pantalla(128, 64, &Wire, -1);
int goles = 0;

void setup() {
  pinMode(3, INPUT_PULLUP);     // botón en D3
  pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pantalla.setTextColor(SSD1306_WHITE);
}

void loop() {
  if (digitalRead(3) == LOW) {  // botón presionado
    goles++;
    delay(500);                 // espera para no contar doble
  }

  pantalla.clearDisplay();
  pantalla.setTextSize(1);
  pantalla.setCursor(0, 0);
  pantalla.print("GOLES");
  pantalla.setTextSize(4);
  pantalla.setCursor(50, 20);
  pantalla.print(goles);
  pantalla.display();
}
```

[IMAGEN 1.3: simulación del marcador en Wokwi con la pantalla mostrando GOLES 3]

Presiona **Play** y luego el botón varias veces.

- **Play** es el botón verde con un triángulo ▶, arriba del dibujo. La primera vez tarda unos segundos.
- Para presionar el botón dibujado, hagan clic sobre él.
- Si sale un error en rojo, lean la línea que indica: casi siempre falta un `;` o una llave.

:::pregunta id="g1-p2"
`INPUT_PULLUP` hace que el pin lea **HIGH** cuando el botón está suelto. ¿Qué lee cuando lo presionas?
:::

Prueba qué pasa con distintos valores de `delay`:

Para cada fila: detengan la simulación (botón de cuadrado), cambien el número de `delay(500);`, presionen Play y hagan **un solo clic corto** en el botón. Anoten si contó uno o más goles.

| delay | ¿Cuenta bien un solo toque? |
| --- | --- |
| 500 | |
| 50 | |
| 0 (borra la línea) | |

Al terminar, regresen el `delay(500);`.

:::pregunta id="g1-p3"
¿Por qué sin el `delay` un solo toque cuenta varios goles?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Cada integrante tiene su rol.
- [ ] La pantalla OLED funciona en Wokwi.
- [ ] El botón suma goles.
- [ ] Probamos los valores de delay.
:::

## Reto extra

Agrega un segundo botón en **D4** para el otro equipo y muestra el marcador como **2 - 1**. Guarda el proyecto y copia su enlace en la bitácora.

Pistas: una segunda variable (por ejemplo `golesB`), `pinMode(4, INPUT_PULLUP);` en el `setup()`, otro `if` igual al primero pero con el pin 4, y en la pantalla imprimir los dos números con `" - "` en medio.

## Bitácora (15 min)

Para el enlace: presionen **Save** (arriba), copien la dirección de la barra del navegador (Ctrl + C) y péguenla abajo (Ctrl + V).

:::pregunta id="g1-b1"
Enlace de nuestro proyecto en Wokwi:
:::

:::pregunta id="g1-b2"
¿Qué hace la línea `goles++;`?
:::

Si quieren, descarguen también el proyecto como `.zip` (menú de la flecha junto a **Save** → **Download project zip**) y súbanlo aquí.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g1-p2: lee LOW.
- g1-p3: el loop se repite miles de veces por segundo; mientras el dedo está en el botón, cuenta en cada vuelta. Se retoma con el antirrebote del sábado 6.
- Si la OLED queda negra: revisar dirección 0x3C y pines A4/A5.
- Tiempo total: 15 + 15 + 15 + 20 + 30 + 5 + 15 = 115 minutos (5 de margen).
:::

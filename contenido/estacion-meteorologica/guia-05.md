---
titulo: Pantalla y colores de verdad
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Pantalla y colores de verdad

## Objetivo del día

Agregar al circuito real la pantalla OLED y el LED RGB, y cargar el código completo de la estación.

**Al terminar tendremos:** la estación completa funcionando en la protoboard, igual que en el simulador.

## Materiales del equipo

- Circuito del sábado 4 (Arduino, DHT22, LDR)
- Pantalla OLED SSD1306 de 0,96" (I2C, 4 pines)
- LED RGB de cátodo común y 3 resistencias de 220 Ω
- Protoboard y cables

## Parte 1 · ¿Cómo habla la pantalla? (10 min)

La pantalla OLED usa el protocolo **I2C**: con solo dos cables (SDA = datos, SCL = reloj) el Arduino le envía todo lo que debe dibujar. Cada aparato I2C tiene una **dirección**; la de nuestra pantalla casi siempre es **0x3C**.

Miren en la animación cómo se dibuja la pantalla, punto por punto:

:::animacion tipo="oled"
:::

:::pregunta id="g5-p1"
La pantalla mide 128 × 64 píxeles. ¿Cuántos píxeles tiene en total?
:::

## Parte 2 · Conectar pantalla y LED (25 min)

Con el USB **desconectado**. Los sensores del sábado 4 se quedan como estaban.

- **OLED:** tiene 4 pines con su nombre impreso. **Lean el orden en su pantalla**: algunas traen GND primero y otras VCC primero. VCC → fila **+**, GND → fila **−**, SDA → pin **A4**, SCL → pin **A5** (en la fila ANALOG IN del Arduino).
- **LED RGB:** tiene 4 patas. La **más larga** es la común (va a GND). Normalmente el orden es: rojo, común, verde, azul (revisen con la imagen o pregunten al docente). Clava cada pata en una fila corta distinta.
  - Pata común → fila **−**.
  - Pata roja → resistencia de 220 Ω → pin **9**. Pata verde → resistencia → pin **10**. Pata azul → resistencia → pin **11**.

| Componente | Conexión |
| --- | --- |
| OLED | VCC → 5V · GND → GND · SDA → A4 · SCL → A5 |
| LED RGB | Pata larga (común) → GND |
| | Rojo → 220 Ω → D9 |
| | Verde → 220 Ω → D10 |
| | Azul → 220 Ω → D11 |

[IMAGEN 5.1: patas del LED RGB de cátodo común señalando cuál es R, común, G y B]

[IMAGEN 5.2: circuito real completo en protoboard con DHT22, LDR, OLED y LED RGB]

Comparen su circuito con la animación, cable por cable:

:::animacion tipo="conexiones" circuito="estacion-real"
:::

Revisen y marquen antes de conectar el USB:

:::checklist id="g5-revision"
- [ ] La pata larga del LED va a GND.
- [ ] Cada color tiene su resistencia de 220 Ω.
- [ ] SDA en A4 y SCL en A5 (no al revés).
- [ ] Ningún cable de 5V toca un cable de GND.
:::

## Parte 3 · El código completo (25 min)

1. Instala las librerías **Adafruit SSD1306** y **Adafruit GFX Library** en el Arduino IDE.
   - **Gestor de bibliotecas** (icono de los libros a la izquierda, o **Herramientas → Administrar bibliotecas**). Busquen cada una, **Instalar**, y si pregunta por otras que necesita, **Instalar todo**.
2. Copia el código base del sábado 3 (el mismo que usaste en Wokwi). Si usas DHT11, cambia `DHT22` por `DHT11`.
   - Está en la **Guía 3, Parte 3** de la plataforma (o en su proyecto de Wokwi). Selecciónenlo, cópienlo (Ctrl + C) y péguenlo en un programa nuevo de Arduino IDE (**Archivo → Nuevo boceto**, borrando lo que trae).
   - Guárdenlo como `equipo_NOMBRE_estacion`.
3. Súbelo y revisa la pantalla.
   - Elijan **Arduino Uno** y su puerto, verifiquen (✓) y suban (→).
   - Si la pantalla queda negra: revisen SDA/SCL y el orden de VCC y GND. Si sigue negra, avisen al docente (algunas pantallas usan otra dirección).

[IMAGEN 5.3: pantalla OLED real mostrando la temperatura en grande y la humedad y la luz debajo]

Ahora prueba cada parte:

| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| La pantalla muestra la temperatura | | |
| La pantalla muestra humedad y luz | | |
| LED verde a temperatura normal | | |
| LED rojo al calentar el sensor con la mano | | |
| La luz cambia al tapar la LDR | | |

:::pregunta id="g5-p2"
Con la mano el sensor apenas llega a unos 30 °C. ¿Qué número tendrías que cambiar en el código para ver el LED rojo más fácilmente? Pruébalo.
:::

## Parte 4 · Personalizar la pantalla (25 min)

Diseñen su propia pantalla. Pueden cambiar:

- El tamaño del texto: `setTextSize(1)`, `(2)` o `(3)`.
- La posición: `setCursor(x, y)` (x de 0 a 127, y de 0 a 63).
- Agregar el nombre del equipo o un mensaje según el clima.

Todo lo de la pantalla está en el `loop()`, entre `pantalla.clearDisplay();` y `pantalla.display();`. Lo que agreguen debe ir **antes** de `pantalla.display();` (esa línea es la que la muestra). Por ejemplo, para el nombre del equipo: `pantalla.println("Los Meteoros");`.

Ejemplo de mensaje:

```cpp
if (temp > CALOR) {
  pantalla.println("Hace calor!");
} else if (temp < FRIO) {
  pantalla.println("Hace frio!");
}
```

Escríbanlo justo antes de `pantalla.display();`. Sin tildes ni ñ: esta pantalla no las muestra bien.

:::foto id="g5-pantalla"
Foto de la pantalla personalizada del equipo.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] La OLED muestra temperatura, humedad y luz.
- [ ] El LED RGB cambia de color con la temperatura.
- [ ] Llenamos la tabla de pruebas.
- [ ] Personalizamos la pantalla.
:::

## Reto extra

Haz que el LED **parpadee en rojo** cuando hace calor: enciende, `delay(300)`, apaga, `delay(300)`. ¿Afecta el tiempo entre lecturas?

Pista: en el caso de calor, en vez de solo `ponerColor(255, 0, 0);`, usen `ponerColor(255, 0, 0);`, `delay(300);`, `ponerColor(0, 0, 0);` y `delay(300);`.

## Bitácora (15 min)

:::pregunta id="g5-b1"
¿Qué ventaja tiene usar I2C para la pantalla?
:::

:::pregunta id="g5-b2"
¿Qué problema tuvieron hoy y cómo lo resolvieron?
:::

Antes de irse, guarden `equipo_NOMBRE_estacion` (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g5-p1: 128 × 64 = 8192 píxeles.
- Si la OLED no enciende, probar la dirección 0x3D. Algunos módulos traen los pines en orden GND-VCC: revisar la serigrafía.
- Si el LED muestra el color equivocado, las patas R/G/B están cambiadas; se corrige en el código o moviendo cables.
- Si el LED es de ánodo común, los colores salen invertidos: el común va a 5V y se usa `255 - valor`.
- La carcasa impresa debe estar lista para el sábado 6.
- Tiempo total: 10 + 25 + 25 + 25 + 5 + 15 = 105 minutos (15 de margen).
:::

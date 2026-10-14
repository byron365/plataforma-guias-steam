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

:::animacion tipo="oled"
:::

:::pregunta id="g5-p1"
La pantalla mide 128 × 64 píxeles. ¿Cuántos píxeles tiene en total?
:::

## Parte 2 · Conectar pantalla y LED (25 min)

| Componente | Conexión |
| --- | --- |
| OLED | VCC → 5V · GND → GND · SDA → A4 · SCL → A5 |
| LED RGB | Pata larga (común) → GND |
| | Rojo → 220 Ω → D9 |
| | Verde → 220 Ω → D10 |
| | Azul → 220 Ω → D11 |

[IMAGEN 5.1: patas del LED RGB de cátodo común señalando cuál es R, común, G y B]

[IMAGEN 5.2: circuito real completo en protoboard con DHT22, LDR, OLED y LED RGB]

:::animacion tipo="conexiones" circuito="estacion-real"
:::

:::checklist id="g5-revision"
- [ ] La pata larga del LED va a GND.
- [ ] Cada color tiene su resistencia de 220 Ω.
- [ ] SDA en A4 y SCL en A5 (no al revés).
- [ ] Ningún cable de 5V toca un cable de GND.
:::

## Parte 3 · El código completo (25 min)

1. Instala las librerías **Adafruit SSD1306** y **Adafruit GFX Library** en el Arduino IDE.
2. Copia el código base del sábado 3 (el mismo que usaste en Wokwi). Si usas DHT11, cambia `DHT22` por `DHT11`.
3. Súbelo y revisa la pantalla.

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

Ejemplo de mensaje:

```cpp
if (temp > CALOR) {
  pantalla.println("Hace calor!");
} else if (temp < FRIO) {
  pantalla.println("Hace frio!");
}
```

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

## Bitácora (15 min)

:::pregunta id="g5-b1"
¿Qué ventaja tiene usar I2C para la pantalla?
:::

:::pregunta id="g5-b2"
¿Qué problema tuvieron hoy y cómo lo resolvieron?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g5-p1: 128 × 64 = 8192 píxeles.
- Si la OLED no enciende, probar la dirección 0x3D. Algunos módulos traen los pines en orden GND-VCC: revisar la serigrafía.
- Si el LED muestra el color equivocado, las patas R/G/B están cambiadas; se corrige en el código o moviendo cables.
- Si el LED es de ánodo común, los colores salen invertidos: el común va a 5V y se usa `255 - valor`.
- La carcasa impresa debe estar lista para el sábado 6.
- Tiempo total: 10 + 25 + 25 + 25 + 5 + 15 = 105 minutos (15 de margen).
:::

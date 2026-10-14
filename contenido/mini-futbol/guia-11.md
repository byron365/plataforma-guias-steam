---
titulo: ¡GOOOL con estilo!
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · ¡GOOOL con estilo!

## Objetivo del día

Mejorar el marcador: una animación de gol en la pantalla, una melodía propia y un modo de juego nuevo.

**Al terminar tendremos:** el marcador versión 2 con al menos dos mejoras funcionando.

## Materiales del equipo

- Cancha con marcador
- Computadora con Arduino IDE

Abran su programa del marcador más reciente y guárdenlo como `equipo_NOMBRE_marcador_v2` (**Archivo → Guardar como**). Así el que ya funciona queda a salvo.

## Parte 1 · Animación de gol (35 min)

Una animación es una serie de dibujos que cambian rápido. Haremos que la palabra **GOL** crezca y parpadee.

Reemplaza la parte de la pantalla dentro de `gol()` por:

- En la función `gol()`, la "parte de la pantalla" son las líneas que van desde `pantalla.clearDisplay();` hasta `pantalla.display();` (las que escriben "GOL!" y el equipo). Bórrenlas y escriban en su lugar el código de abajo.
- Dejen como estaban `goles++;`, `ultimoGol = millis();` y las líneas del sonido.

```cpp
for (int t = 1; t <= 4; t++) {      // tamaños 1, 2, 3 y 4
  pantalla.clearDisplay();
  pantalla.setTextSize(t);
  pantalla.setCursor(64 - t * 9, 32 - t * 4);
  pantalla.print("GOL");
  pantalla.display();
  delay(120);
}
for (int i = 0; i < 3; i++) {       // parpadea 3 veces
  pantalla.invertDisplay(true);
  delay(150);
  pantalla.invertDisplay(false);
  delay(150);
}
```

Verifiquen (✓), suban (→) y metan un gol para verla. Comparen con la animación:

:::animacion tipo="oled-animacion"
:::

:::pregunta id="g11-p1"
¿Cuántas veces se repite el primer `for`? ¿Qué cambia en cada vuelta?
:::

[IMAGEN 11.1: secuencia de cuatro cuadros de la animación GOL creciendo en la pantalla OLED]

## Parte 2 · Melodía propia (30 min)

Cada nota es una **frecuencia** en hercios (Hz). Con una lista de notas hacemos una melodía:

| Nota | Do | Re | Mi | Fa | Sol | La | Si | Do alto |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hz | 262 | 294 | 330 | 349 | 392 | 440 | 494 | 523 |

1. Escriban las dos listas (`int melodia[]` e `int duracion[]`) arriba del programa, con las demás variables (por ejemplo, debajo de `bool jugando = false;`).
2. Escriban la función `tocarMelodia()` completa después de la llave `}` que cierra la función `gol()`.
3. Cambien las notas de `melodia[]` por las de su equipo usando la tabla. Si cambian la cantidad de notas, cambien también el `6` del `for` y la lista `duracion[]` (debe tener la misma cantidad de números).

```cpp
int melodia[] = {392, 392, 440, 392, 523, 494};   // ¡cambia las notas!
int duracion[] = {150, 150, 300, 300, 300, 600};

void tocarMelodia() {
  for (int i = 0; i < 6; i++) {
    tone(BUZZER, melodia[i], duracion[i]);
    delay(duracion[i] + 50);
  }
}
```

Llama a `tocarMelodia();` en lugar de los dos `tone` de la función `gol()`.

- En `gol()`, borren las cuatro líneas del sonido (`tone(BUZZER, 1000, 150);`, `delay(200);`, `tone(BUZZER, 1500, 400);` y `delay(1000);`) y escriban en su lugar una sola: `tocarMelodia();`.

:::pregunta id="g11-p2"
Escribe las notas de la melodía de su equipo.
:::

## Parte 3 · Modo "a 3 goles" (30 min)

En este modo no hay tiempo: gana el primero que anote **3 goles**.

```cpp
const int GOLES_GANAR = 3;

// en el loop, después de revisar los goles:
if (golesAzul >= GOLES_GANAR || golesRojo >= GOLES_GANAR) {
  jugando = false;
  mostrarMarcador(0);
  tocarMelodia();
  return;
}
```

Para elegir el modo, usa el botón: **un toque** = partido por tiempo, **mantenerlo 2 segundos** = modo a 3 goles.

Cómo armarlo, paso a paso:

1. `const int GOLES_GANAR = 3;` va en **Ajustes del equipo**. Debajo, agreguen una variable nueva: `bool modo3 = false;`.
2. **Elegir el modo al empezar:** en el `loop()`, dentro del bloque que empieza el partido (`if (digitalRead(BOTON) == LOW) {`), escriban al principio tres líneas que midan cuánto tiempo se mantiene presionado el botón: guardar `millis()` en una variable, esperar con `while (digitalRead(BOTON) == LOW) {}` hasta que lo suelten, y poner `modo3 = true` si pasaron más de 2000 ms (si no, `modo3 = false`).
3. **Fin por goles:** el bloque `if (golesAzul >= GOLES_GANAR || …)` va justo después de las líneas que revisan los goles (las de `gol(golesRojo, "ROJO")` y `gol(golesAzul, "AZUL")`). Para que solo funcione en ese modo, cambien su primera línea por `if (modo3 && (golesAzul >= GOLES_GANAR || golesRojo >= GOLES_GANAR)) {`.
4. **Sin tiempo en el modo 3:** en la línea `if (pasado >= DURACION) {`, agreguen la condición para que el tiempo solo cuente en el modo normal: `if (!modo3 && pasado >= DURACION) {`.
5. Verifiquen (✓), suban (→) y prueben los dos modos.

| Prueba | ¿Funciona? |
| --- | --- |
| Modo tiempo sigue funcionando | |
| Modo a 3 goles termina con 3 goles | |
| La melodía suena al final | |

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] La animación de gol funciona.
- [ ] El equipo tiene su melodía.
- [ ] El modo a 3 goles funciona.
- [ ] Lo que ya funcionaba sigue funcionando.
:::

## Reto extra

Dibuja una **pelota** en la pantalla con `pantalla.fillCircle(x, y, 5, SSD1306_WHITE);` y haz que cruce la pantalla de lado a lado durante la celebración.

Pista: un `for` que vaya de x = 0 a x = 127, sumando 4 cada vez; en cada vuelta `clearDisplay()`, `fillCircle(x, 32, 5, SSD1306_WHITE)`, `display()` y un `delay` corto.

## Bitácora (20 min)

:::foto id="g11-foto"
Video de la celebración de gol versión 2.
:::

:::pregunta id="g11-b1"
¿Qué es un arreglo (como `melodia[]`) y para qué nos sirvió?
:::

Antes de irse, guarden `equipo_NOMBRE_marcador_v2` (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Elegir el modo: `unsigned long t0 = millis(); while (digitalRead(BOTON) == LOW) {} modo3 = millis() - t0 > 2000;` (con `bool modo3` declarada arriba, fuera del loop, para que el resto del programa la vea). Es una buena oportunidad para explicar `while`.
- Si la animación se ve lenta, reducir los `delay`.
- Equipos con dificultades: hacer solo animación y melodía.
- Tiempo total: 35 + 30 + 30 + 5 + 20 = 120 minutos.
:::

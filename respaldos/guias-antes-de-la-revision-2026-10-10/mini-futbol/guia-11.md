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

## Parte 1 · Animación de gol (35 min)

Una animación es una serie de dibujos que cambian rápido. Haremos que la palabra **GOL** crezca y parpadee.

Reemplaza la parte de la pantalla dentro de `gol()` por:

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

## Bitácora (20 min)

:::foto id="g11-foto"
Video de la celebración de gol versión 2.
:::

:::pregunta id="g11-b1"
¿Qué es un arreglo (como `melodia[]`) y para qué nos sirvió?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Elegir el modo: `unsigned long t0 = millis(); while (digitalRead(BOTON) == LOW) {} bool modo3 = millis() - t0 > 2000;` Es una buena oportunidad para explicar `while`.
- Si la animación se ve lenta, reducir los `delay`.
- Equipos con dificultades: hacer solo animación y melodía.
- Tiempo total: 35 + 30 + 30 + 5 + 20 = 120 minutos.
:::

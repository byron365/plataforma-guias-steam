---
titulo: Garras en el mundo real
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Garras en el mundo real

## Objetivo del día

Montar la pinza versión 2, descubrir dónde se usan brazos robóticos en la vida real y programar una función nueva para nuestra garra.

**Al terminar tendremos:** la pinza v2 probada, una ficha de aplicaciones reales y un reto extra funcionando en la garra.

## Materiales del equipo

- Pinza versión 2 impresa
- Garra completa con su circuito
- Para el reto: un buzzer (opción A) o un botón extra (opción B)
- Computadora con internet (o el material que entregue el docente)

## Parte 1 · Repaso rápido (10 min)

¿Qué mejoras hicimos el sábado pasado? Revisen la tabla de antes y después.

## Parte 2 · Montar y probar la pinza v2 (20 min)

1. Cambien la pinza vieja por la nueva, igual que en la guía 6 (servo en 60° antes de atornillar).
2. Repitan el reto de los 5 objetos.

Tiempo con la pinza v2: ______ s

:::opciones id="g12-mejoro"
¿Mejoró el tiempo?
- Sí
- Igual
- Empeoró
:::

## Parte 3 · Investigación: brazos robóticos reales (25 min)

Busquen tres usos distintos de los brazos robóticos y completen:

| Aplicación | ¿Qué hace? | ¿En qué se parece a nuestra garra? | ¿Qué tiene diferente? |
| --- | --- | --- | --- |
| En una fábrica | | | |
| En medicina | | | |
| Otra (rescate, espacio, máquinas de juego…) | | | |

[IMAGEN 12.1: collage de brazos robóticos en una fábrica, en un quirófano y en una máquina de peluches]

:::pregunta id="g12-p1"
Si nuestra garra trabajara en una fábrica, ¿qué tarea le pondrían?
:::

## Parte 4 · Reto programado (50 min)

Elijan una opción.

### Opción A · Modo máquina de peluches

Al presionar el botón empieza un juego de 30 segundos para atrapar un objeto. Al terminar, suena el buzzer y la pinza suelta lo que tenga.

1. Conecten el buzzer: pata + al pin 8 y pata − a GND.
2. Saquen el modo manual del `loop()` a una función propia, así:

```cpp
void modoManual() {
  pB = leer(A0, 0, 180);   // <- tus límites
  pH = leer(A1, 15, 165);
  pC = leer(A2, 15, 165);
  pP = leer(A3, 30, 90);
  base.write(pB);
  hombro.write(pH);
  codo.write(pC);
  pinza.write(pP);
  delay(20);
}
```

3. Agreguen la función del juego:

```cpp
void juego() {
  tone(8, 1000, 300);                  // inicio
  unsigned long inicio = millis();
  while (millis() - inicio < 30000) {  // 30 segundos
    modoManual();
  }
  tone(8, 400, 1000);                  // fin del juego
  mover(pinza, pP, 90);                // suelta el objeto
}
```

4. En el `loop()`, cuando se presiona el botón, llamen a `juego()` en lugar de `rutina()`; si no, llamen a `modoManual()`.

### Opción B · Grabar y repetir una posición

Un botón nuevo graba la posición actual; el botón de siempre hace que la garra vuelva a ella sola.

1. Conecten un segundo botón entre el pin D4 y GND.
2. Agreguen arriba del programa:

```cpp
const int GRABAR = 4;
int gB = 90, gH = 90, gC = 90, gP = 60;  // posición grabada
```

3. En el `setup()`: `pinMode(GRABAR, INPUT_PULLUP);`
4. Dentro del modo manual, agreguen:

```cpp
  if (digitalRead(GRABAR) == LOW) {
    gB = pB;  gH = pH;  gC = pC;  gP = pP;
    delay(300);
  }
```

5. Agreguen esta función y llámenla con el botón de D2 en lugar de `rutina()`:

```cpp
void repetir() {
  mover(base, pB, gB);
  mover(hombro, pH, gH);
  mover(codo, pC, gC);
  mover(pinza, pP, gP);
}
```

:::opciones id="g12-opcion"
Opción elegida
- A · Máquina de peluches
- B · Grabar y repetir
:::

:::opciones id="g12-funciono"
¿Funcionó?
- Sí
- Con ajustes
- No
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Montamos y probamos la pinza v2.
- [ ] Completamos la ficha de tres aplicaciones reales.
- [ ] Programamos y probamos un reto (A o B).
:::

## Reto extra

¡Hagan las dos opciones! O inventen un juego propio con la garra y escriban sus reglas.

## Bitácora (10 min)

:::pregunta id="g12-b1"
¿Qué aplicación real nos sorprendió más?
:::

:::pregunta id="g12-b2"
¿Cómo funciona nuestro reto programado? Explíquenlo con sus palabras.
:::

:::foto id="g12-video"
Video del reto funcionando.
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay internet, entregar imágenes impresas de brazos robóticos en industria, medicina y rescate.
- Revisar que al sacar el modo manual a una función no quede duplicado en el `loop()`.
- Tiempo total: 10 + 20 + 25 + 50 + 5 + 10 = 120 minutos.
:::

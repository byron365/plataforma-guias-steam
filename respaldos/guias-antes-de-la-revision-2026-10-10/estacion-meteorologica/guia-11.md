---
titulo: Una estación más inteligente
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Una estación más inteligente

## Objetivo del día

Aplicar las mejoras elegidas el sábado 10. Todos los equipos hacen la mejora A (máxima y mínima del día) y eligen una mejora B (alarma con buzzer o carcasa versión 2).

**Al terminar tendremos:** la estación versión 2, que recuerda la temperatura máxima y mínima y tiene una mejora extra.

## Materiales del equipo

- Estación completa
- Buzzer activo o pasivo (mejora B1)
- Computadora con Blender (mejora B2)

## Parte 1 · Mejora A: máxima y mínima (40 min)

La estación debe **recordar** la temperatura más alta y la más baja desde que se encendió. Para eso usamos dos variables nuevas que **no se borran** en cada vuelta del `loop`: se declaran fuera, arriba del `setup()`.

```cpp
float maxima = -100;   // empieza muy baja para que la primera lectura la supere
float minima = 100;    // empieza muy alta
```

Dentro del `loop`, después de leer `temp`:

```cpp
if (temp > maxima) {
  maxima = temp;
}
if (temp < minima) {
  minima = temp;
}
```

Y en la pantalla, después de la luz:

```cpp
pantalla.print("Max: ");
pantalla.print(maxima, 1);
pantalla.print("  Min: ");
pantalla.println(minima, 1);
```

:::animacion tipo="max-min"
:::

Prueba: calienta el sensor con la mano y suelta.

| Momento | Temp. actual | Máx. en pantalla | Mín. en pantalla |
| --- | --- | --- | --- |
| Al encender | | | |
| Calentando con la mano | | | |
| 2 minutos después de soltar | | | |

:::pregunta id="g11-p1"
¿Por qué `maxima` empieza en −100 y no en 0? ¿Qué pasaría en un lugar muy frío si empezara en 0?
:::

[IMAGEN 11.1: pantalla OLED mostrando temperatura actual, humedad, luz y la línea Max / Min]

## Parte 2 · Mejora B (elijan una) (50 min)

:::opciones id="g11-mejora"
¿Qué mejora B eligió el equipo?
- B1 · Alarma con buzzer
- B2 · Carcasa versión 2
:::

### B1 · Alarma con buzzer

Conecta el buzzer: **+ → D6**, **− → GND**. Agrega arriba `const int BUZZER = 6;` y en `setup()` `pinMode(BUZZER, OUTPUT);`. En el `loop`, dentro del caso de calor:

```cpp
} else if (temp > CALOR) {
  ponerColor(255, 0, 0);
  tone(BUZZER, 1500, 200);   // pitido corto de aviso
}
```

**Mejoren la alarma:** que suene solo **la primera vez** que pasa de CALOR, usando una variable `bool avisado = false;`.

[IMAGEN 11.2: buzzer conectado al pin D6 y GND en la protoboard de la estación]

### B2 · Carcasa versión 2

Elijan uno o más cambios basados en la evaluación:

- Platos inclinados para que escurra la lluvia.
- Espacio para guardar el Arduino dentro de una caja en la base.
- Agujero o ventana para la LDR en la tapa.
- Nombre del equipo grabado en la base (texto 3D + Booleano).

Exporten **equipo_NOMBRE_carcasa_v2.stl**.

[IMAGEN 11.3: carcasa versión 2 en Blender con platos inclinados y caja para el Arduino en la base]

:::pregunta id="g11-p2"
Describe la mejora B que hicieron y qué problema resuelve.
:::

## Parte 3 · Prueba de la versión 2 (10 min)

:::checklist id="g11-pruebas"
- [ ] La máxima y la mínima cambian correctamente.
- [ ] La mejora B funciona.
- [ ] Lo que ya funcionaba sigue funcionando (pantalla, LED, calibración).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Hicimos la mejora A.
- [ ] Hicimos la mejora B.
- [ ] Probamos toda la estación otra vez.
:::

## Reto extra

Agrega un **botón** en D7 (con `INPUT_PULLUP`) que reinicie la máxima y la mínima al presionarlo, como en las estaciones comerciales.

## Bitácora (15 min)

:::foto id="g11-foto"
Foto o video de la estación versión 2.
:::

:::pregunta id="g11-b1"
¿Qué diferencia hay entre una variable declarada dentro del `loop` y una declarada fuera?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Error frecuente en A: declarar `maxima` dentro del loop; se reinicia en cada vuelta y siempre es igual a la temperatura actual.
- B1: con buzzer activo, `tone()` funciona igual pero sin cambiar de tono; también sirve `digitalWrite`.
- B1 avanzada: `if (temp > CALOR && !avisado) { tone(...); avisado = true; }` y `avisado = false;` cuando vuelve a normal.
- B2: las carcasas v2 se pueden imprimir durante la semana para el cierre.
- Reto: `if (digitalRead(7) == LOW) { maxima = temp; minima = temp; }`.
- Tiempo total: 40 + 50 + 10 + 5 + 15 = 120 minutos.
:::

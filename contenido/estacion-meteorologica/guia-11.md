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

Abran su programa calibrado (`equipo_NOMBRE_calibrada`, Guía 6) y guárdenlo como `equipo_NOMBRE_v2` (**Archivo → Guardar como**). Si en la Guía 7 cambiaron `ESPERA` a 10000, regrésenla a 2000.

## Parte 1 · Mejora A: máxima y mínima (40 min)

La estación debe **recordar** la temperatura más alta y la más baja desde que se encendió. Para eso usamos dos variables nuevas que **no se borran** en cada vuelta del `loop`: se declaran fuera, arriba del `setup()`.

1. Escriban estas dos líneas arriba del programa, debajo de `Adafruit_SSD1306 pantalla(…);` y antes de `void setup()`:

```cpp
float maxima = -100;   // empieza muy baja para que la primera lectura la supere
float minima = 100;    // empieza muy alta
```

Dentro del `loop`, después de leer `temp`:

2. Escriban estas líneas dentro del `loop()`, **después** del bloque `if (isnan(temp) || isnan(hum)) { … }` (así no se guarda una lectura con error):

```cpp
if (temp > maxima) {
  maxima = temp;
}
if (temp < minima) {
  minima = temp;
}
```

Y en la pantalla, después de la luz:

3. Escriban estas líneas después de `pantalla.println(luz);` y antes de `pantalla.display();`:

```cpp
pantalla.print("Max: ");
pantalla.print(maxima, 1);
pantalla.print("  Min: ");
pantalla.println(minima, 1);
```

4. Verifiquen (✓) y suban (→).

Miren en la animación cómo se van guardando la máxima y la mínima:

:::animacion tipo="max-min"
:::

Prueba: calienta el sensor con la mano y suelta.

Anoten los tres números de la pantalla en cada momento. Para "2 minutos después", usen el cronómetro del celular.

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

- **Conectar** (con el USB desconectado): la pata **+** del buzzer (marcada con + o la más larga) → pin **6**; la otra → fila **−**.
- `const int BUZZER = 6;` va con los demás pines, en la sección **Pines**.
- `pinMode(BUZZER, OUTPUT);` va dentro del `setup()`, junto a los otros `pinMode`.
- En el `loop()`, busquen el bloque `} else if (temp > CALOR) {`. Debajo de `ponerColor(255, 0, 0);` agreguen la línea del `tone`. Queda así:

```cpp
} else if (temp > CALOR) {
  ponerColor(255, 0, 0);
  tone(BUZZER, 1500, 200);   // pitido corto de aviso
}
```

Prueben calentando el sensor con la mano (si no llega a CALOR, bajen CALOR un momento, como en la Guía 5).

**Mejoren la alarma:** que suene solo **la primera vez** que pasa de CALOR, usando una variable `bool avisado = false;`.

Pistas: declaren `avisado` arriba, fuera de las funciones (como `maxima`). En el caso de calor, solo suenen si todavía no han avisado, y después pongan `avisado = true;`. Cuando la temperatura vuelva a ser normal, regrésenla a `false`.

[IMAGEN 11.2: buzzer conectado al pin D6 y GND en la protoboard de la estación]

### B2 · Carcasa versión 2

Elijan uno o más cambios basados en la evaluación:

- Platos inclinados para que escurra la lluvia.
- Espacio para guardar el Arduino dentro de una caja en la base.
- Agujero o ventana para la LDR en la tapa.
- Nombre del equipo grabado en la base (texto 3D + modificador Booleana).

Antes de cambiar nada, abran `equipo_NOMBRE_estacion.blend` y guárdenlo como `equipo_NOMBRE_estacion_v2.blend`. Pistas para cada cambio:

- **Platos inclinados:** se hace mejor en la versión de la Guía 2 (antes de unir todo): en Modo Edición, **Alt + clic** sobre el borde de afuera del plato y **G**, **Z**, **−3**.
- **Caja para el Arduino:** un cubo hueco (cubo grande menos cubo pequeño con el modificador Booleana) pegado a la base; midan el Arduino primero (unos 69 × 54 mm) y dejen holgura.
- **Ventana para la LDR:** un cilindro restado con el modificador Booleana en la tapa, del tamaño de la cabeza de la LDR más 1 mm.
- **Nombre grabado:** texto 3D (como en la Guía 8) con Tamaño pequeño y Extruir = 1, hundido en la base, y modificador Booleana en modo Diferencia.

Exporten **equipo_NOMBRE_carcasa_v2.stl**.

- Clic en la carcasa → **Archivo → Exportar → STL (.stl)** → **Sólo lo seleccionado** → nombre → **Exportar STL**.

[IMAGEN 11.3: carcasa versión 2 en Blender con platos inclinados y caja para el Arduino en la base]

:::pregunta id="g11-p2"
Describe la mejora B que hicieron y qué problema resuelve.
:::

## Parte 3 · Prueba de la versión 2 (10 min)

Prueben toda la estación otra vez, no solo lo nuevo:

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

Pistas: el botón va sobre la canaleta del centro de la protoboard, con dos patas en diagonal: una al pin 7 y la otra a GND. En el `setup()`, su `pinMode`. En el `loop()`, si el botón está presionado (`LOW`), la máxima y la mínima vuelven a ser la temperatura actual.

## Bitácora (15 min)

:::foto id="g11-foto"
Foto o video de la estación versión 2.
:::

:::pregunta id="g11-b1"
¿Qué diferencia hay entre una variable declarada dentro del `loop` y una declarada fuera?
:::

Antes de irse, suban `equipo_NOMBRE_v2` (y, si hicieron B2, el `.blend` y el `.stl` nuevos; todo junto en un `.zip`).

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

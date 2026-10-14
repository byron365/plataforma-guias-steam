---
titulo: Suave y eficiente
guia: 8
sabado: 8
sesion: Optimización del sistema
duracion: 120
---

# Guía 8 · Suave y eficiente

## Objetivo del día

Hacer que el elevador arranque y frene suave y que atienda las llamadas en un orden más eficiente, midiendo el tiempo de espera.

**Al terminar tendremos:** arranque y frenado con rampa, el algoritmo de "seguir en la misma dirección" y la comparación de tiempos de espera.

## Materiales del equipo

- Elevador completo
- Cronómetro, hoja de cálculo

## Parte 1 · Rampa de subida y de bajada (35 min)

El código base ya tiene **rampa de arranque** (`vel += 5`). Ahora agregamos la **rampa de frenado**: cuando la cabina pasa por el piso anterior al destino, empieza a bajar la velocidad.

Miren en la animación cómo sube y baja la velocidad durante un viaje:

:::animacion tipo="rampa" sistema="elevador"
:::

```cpp
const int VEL_LLEGADA = 90;   // velocidad al acercarse

// en loop(), antes de mover el motor:
bool cerca = (p >= 0 && abs(p - destino) == 1) || abs(pisoActual - destino) == 1;
int velMeta = cerca ? VEL_LLEGADA : VEL_MAX;
if (vel < velMeta) vel += 5;
if (vel > velMeta) vel -= 5;
motor(dir * vel);
```

**Dónde va cada parte** (en el programa de la central con el freno y el rearme de la Guía 7):

1. Guarden una copia con **Archivo → Guardar como** → `equipo_NOMBRE_central_rampa`.
2. La línea `const int VEL_LLEGADA = 90;` va en `// --- Ajustes del equipo ---`, debajo de `VEL_MAX`.
3. Al final del `loop()` busquen estas dos líneas: `if (vel < VEL_MAX) vel += 5;  // rampa` y `motor(dir * vel);`. Bórrenlas y escriban en su lugar las cinco líneas del recuadro, desde `bool cerca` hasta `motor(dir * vel);`. La línea `delay(20);` se queda.
4. Suban y prueben.

**Cómo llenar la tabla:** en cada fila cambien el número de `VEL_LLEGADA` y suban de nuevo. Midan el error de parada como en la Guía 6 y el tiempo de un viaje del piso 1 al 3 con el cronómetro. Con 200 la cabina no frena antes de llegar, porque es igual a `VEL_MAX`.

:::tabla id="g8-rampa"
| VEL_LLEGADA | Error de parada (mm) | Tiempo de 1 a 3 (s) | ¿Se siente suave? |
| --- | --- | --- | --- |
| 200 (sin frenado) | | | |
| 120 | | | |
| 90 | | | |
| 60 | | | |
:::

:::pregunta id="g8-p1"
¿Qué compromiso hay entre precisión y tiempo de viaje? ¿Qué valor elegimos?
:::

## Parte 2 · ¿En qué orden atender? (40 min)

El código base va siempre a la **llamada más cercana**. Eso puede dejar esperando mucho a un piso lejano. Los elevadores reales usan el algoritmo **"del ascensor"**: siguen en la misma dirección mientras haya llamadas en esa dirección, y luego cambian.

En la animación pueden comparar en qué orden atiende las llamadas cada algoritmo:

:::animacion tipo="algoritmo-ascensor"
:::

```cpp
int direccion = 1;   // 1 sube, -1 baja

int elegirDestino() {
  // 1. Buscar llamadas en la dirección actual
  for (int i = pisoActual; i >= 0 && i < 3; i += direccion) {
    if (llamada[i]) return i;
  }
  // 2. Si no hay, cambiar de dirección y buscar
  direccion = -direccion;
  for (int i = pisoActual; i >= 0 && i < 3; i += direccion) {
    if (llamada[i]) return i;
  }
  return -1;
}
```

**Cambiar el algoritmo:**

1. Guarden el programa actual (todavía con "más cercana"). Luego **Archivo → Guardar como** → `equipo_NOMBRE_central_ascensor`. Así tienen los dos programas para comparar.
2. En la copia, borren la función `elegirDestino()` completa, desde el comentario `// Elige la llamada más cercana` hasta su llave `}` de cierre.
3. En su lugar escriban todo el recuadro, desde `int direccion = 1;` hasta la última llave.
4. Verifiquen (✓). Todavía no lo suban: primero hagan la prueba de la Parte 3 con el programa de "más cercana".

## Parte 3 · Comparar los dos algoritmos (30 min)

Hagan la misma **secuencia de llamadas** con cada algoritmo y midan cuánto espera cada llamada:

> Secuencia: cabina en 1 → llamar 2 → (2 s) llamar 3 → (2 s) llamar 1 → (2 s) llamar 2

**Cómo medir:**

1. Una persona lee la secuencia en voz alta y arranca el cronómetro en la primera llamada. **No lo detiene** hasta el final.
2. Otras personas presionan los botones cuando les toca.
3. Una persona anota en una hoja la hora del cronómetro de cada llamada y de cada llegada de la cabina a ese piso.
4. **Espera** de cada llamada = hora de llegada − hora de la llamada.
5. Suban el programa "más cercana" y hagan la secuencia; luego suban el "del ascensor" y repítanla igual.
6. Para el **promedio** y la **espera máxima** pueden usar la hoja de cálculo: `=PROMEDIO(B2:B5)` y `=MAX(B2:B5)`.

:::tabla id="g8-algoritmos"
| Llamada | Espera con "más cercana" (s) | Espera con "del ascensor" (s) |
| --- | --- | --- |
| Piso 2 | | |
| Piso 3 | | |
| Piso 1 | | |
| Piso 2 | | |
| Promedio | | |
| Espera máxima | | |
:::

:::pregunta id="g8-p2"
¿Cuál algoritmo tiene menor espera **máxima**? ¿Por qué eso importa más que el promedio para las personas?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] El elevador frena con rampa al llegar.
- [ ] Probamos el algoritmo del ascensor.
- [ ] Comparamos los tiempos de espera.
:::

## Bitácora (10 min)

:::tabla id="g8-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Con solo 3 pisos las diferencias son pequeñas; aun así el ejercicio muestra la idea. Se puede simular un edificio de 10 pisos en papel para que se note.
- El orden de llamadas debe ser idéntico en ambas pruebas: que una persona lea la secuencia en voz alta con cronómetro.
- Tiempo total: 35 + 40 + 30 + 5 + 10 = 120 minutos.
:::

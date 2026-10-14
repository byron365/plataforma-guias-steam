---
titulo: ¿Qué tan buena es nuestra estación?
guia: 10
sabado: 10
sesion: Evaluación del proyecto
duracion: 120
---

# Guía 10 · ¿Qué tan buena es nuestra estación?

## Objetivo del día

Evaluar el proyecto con la rúbrica y analizar los datos que la estación registró durante varios días para comprobar si sigue midiendo bien.

**Al terminar tendremos:** la rúbrica del equipo completada y una gráfica comparando varios días de mediciones.

## Materiales del equipo

- Estación completa
- Computadora con hoja de cálculo
- Datos registrados durante la semana (o los del sábado 7)
- Termómetro comercial

## Parte 1 · Validación de varios días (35 min)

Un buen instrumento mide bien **siempre**, no solo un día. Durante la semana el docente dejó las estaciones midiendo en distintos momentos (o usamos los registros que tengamos).

1. Pega los datos de cada día en una hoja distinta de la hoja de cálculo.
   - Abajo de la hoja de cálculo hay pestañas (Hoja1, Hoja2…). Con el botón **+** se agrega una nueva. Pongan cada día en su propia hoja y cámbienle el nombre (doble clic en la pestaña), por ejemplo "Lunes mañana".
   - Separen las columnas como en la Guía 7 (**Datos → Texto en columnas**, separador coma).
2. Completa la tabla:
   - En cada hoja, calculen máxima, mínima y promedio con `=MAX(A:A)`, `=MIN(A:A)` y `=PROMEDIO(A:A)` (como en la Guía 7) y cópienlos a la tabla.
   - "Termómetro en ese momento": la lectura del termómetro comercial que anotó el docente en ese registro. Para **Hoy**, pongan el termómetro junto a la estación 5 minutos y lean los dos al mismo tiempo.
   - **Diferencia** = termómetro − estación (como en la Guía 6).

:::tabla id="g10-dias"
| Día / momento | Temp. máxima | Temp. mínima | Promedio | Termómetro en ese momento | Diferencia |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |
| Hoy | | | | | |
:::

3. Haz una gráfica de **columnas** con el promedio de cada día.
   - En una hoja nueva, columna A el nombre de cada día y columna B su promedio. Seleccionen las dos columnas → **Insertar → Gráfico → Columnas**.

[IMAGEN 10.1: gráfica de columnas comparando la temperatura promedio de varios días]

:::pregunta id="g10-p1"
¿La diferencia con el termómetro se mantuvo dentro de ±1 °C todos los días? Si no, ¿qué creen que pasó?
:::

## Parte 2 · Rúbrica del equipo (30 min)

Califiquen su proyecto con honestidad (1 = falta mucho, 4 = excelente):

Para cada criterio (fila), lean las cuatro descripciones, elijan la que más se parece a lo que hicieron y escriban su número en **Nuestra nota**. En **¿Por qué?** escriban la evidencia (por ejemplo, "la gráfica de la Guía 7"). Al final sumen las siete notas.

:::tabla id="g10-rubrica"
| Criterio | 1 | 2 | 3 | 4 | Nuestra nota | ¿Por qué? |
| --- | --- | --- | --- | --- | --- | --- |
| Diseño 3D de la carcasa | No terminada | Incompleta | Completa | Completa y bien impresa | | |
| Circuito | No funciona | Funciona en parte | Funciona | Funciona y está ordenado | | |
| Programación | No compila | Algunas partes | Todo funciona | Todo funciona y está personalizado | | |
| Calibración y datos | Sin datos | Datos sin análisis | Gráfica y calibración | Gráfica, calibración y conclusiones | | |
| Gemelo digital | No hay | Solo modelo | Modelo con colores | Renders con datos reales | | |
| Trabajo en equipo | Uno hizo todo | Algunos participaron | Todos participaron | Todos cumplieron su rol | | |
| Presentación | No presentó | Incompleta | Completa | Clara y con demostración | | |
:::

Nota total del equipo: ______ de 28

## Parte 3 · Autoevaluación individual (15 min)

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g10-p2" individual="si"
¿Qué aporté yo al proyecto con mi rol?
:::

:::pregunta id="g10-p3" individual="si"
¿Qué aprendí que no sabía antes de empezar?
:::

:::opciones id="g10-p4"
¿Qué parte del proyecto disfruté más?
- Diseñar en Blender
- Armar el circuito
- Programar
- Analizar los datos
- Presentar
:::

## Parte 4 · Lista de mejoras (20 min)

Con la rúbrica y la retroalimentación del sábado 9, elijan qué mejorar el próximo sábado:

Para cada mejora: qué tan importante es (1 = poco, 3 = mucho), qué tan difícil (1 = fácil, 3 = difícil) y si la harán (Sí o No). En la última fila pueden escribir una mejora propia. La retroalimentación de los otros equipos está en la Guía 9.

:::tabla id="g10-mejoras"
| Mejora posible | ¿Qué tan importante? (1-3) | ¿Qué tan difícil? (1-3) | ¿La hacemos? |
| --- | --- | --- | --- |
| Mostrar máxima y mínima del día en la pantalla | | | |
| Alarma con buzzer cuando hace mucho calor | | | |
| Carcasa versión 2 | | | |
| | | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g10-logramos"
- [ ] Comparamos varios días de datos.
- [ ] Completamos la rúbrica del equipo.
- [ ] Cada integrante hizo su autoevaluación.
- [ ] Elegimos las mejoras para el sábado 11.
:::

## Reto extra

Calcula el **error promedio** de todos los días juntos (promedio de la columna Diferencia). ¿Tu estación es más precisa o menos que lo que dice el fabricante del DHT22 (±0,5 °C)?

## Bitácora (15 min)

:::pregunta id="g10-b1"
¿En qué criterio de la rúbrica estamos más fuertes? ¿En cuál más débiles?
:::

Antes de irse, guarden la hoja de cálculo (**Archivo → Guardar como**, formato `.xlsx`) y súbanla aquí.

:::archivo id="g10-archivo"
**Archivo de trabajo:** antes de irse, suban su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Durante la semana: dejar al menos 2 estaciones registrando en la computadora del aula (una lectura por minuto: cambiar la línea a `const unsigned long ESPERA = 60000;`, porque en un `int` del Arduino no cabe un número mayor que 32 767) en mañana y tarde, y compartir los archivos.
- Si no hubo registros, usar los datos del sábado 7 y hacer un registro corto hoy al sol y a la sombra.
- Comparar la rúbrica del equipo con la del docente y conversar las diferencias.
- Tiempo total: 35 + 30 + 15 + 20 + 5 + 15 = 120 minutos.
:::

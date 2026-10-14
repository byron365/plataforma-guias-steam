---
titulo: Predecir la porción
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · Predecir la porción

## Objetivo del día

Hacer la gráfica de tiempo contra gramos, usarla para predecir cuánto tiempo abrir para servir una porción exacta y escribir la ficha técnica.

**Al terminar tendremos:** la gráfica del experimento, nuestro valor de "milisegundos por gramo" comprobado y la ficha técnica.

## Materiales del equipo

- Tabla del experimento (sábado 6)
- Computadora con hoja de cálculo
- Dispensador y báscula

## Parte 1 · La gráfica (30 min)

Abran la Guía 6 en la plataforma para ver su tabla de gramos.

1. Pasa a la hoja de cálculo los **promedios** del sábado 6: columna A = tiempo (ms), columna B = gramos.
   - Abran Excel, Google Sheets o LibreOffice Calc con una hoja en blanco.
   - En la celda A1 escriban `Tiempo (ms)` y en B1 `Gramos`.
   - Debajo, una fila por cada tiempo: en A2 escriban 500 y en B2 su promedio; en A3, 1000 y su promedio; y así hasta 2000.
   - Usen el mismo signo decimal que use la computadora (punto o coma).
2. **Insertar → Gráfico → Dispersión.**
   - Seleccionen con el mouse las celdas de A1 a B5 (los títulos y los cuatro datos).
   - Vayan a **Insertar → Gráfico** y elijan **Dispersión** (solo puntos, sin líneas).
3. Agrega una **línea de tendencia** (clic derecho sobre los puntos).
   - En Excel y LibreOffice: clic derecho sobre uno de los puntos → **Agregar línea de tendencia** (o **Insertar línea de tendencia**) → **Lineal**.
   - En Google Sheets: en el panel del gráfico, **Personalizar → Serie** → activa **Línea de tendencia**.
4. Pónganle título al gráfico y nombre a los ejes: "Tiempo abierta (ms)" abajo y "Gramos" a la izquierda.

[IMAGEN 7.1: gráfica de dispersión de tiempo contra gramos con línea de tendencia]

Esta animación toma los datos de su tabla de la Guía 6. Compárenla con su gráfica:

:::animacion tipo="tiempo-gramos" tabla="g6-gramos"
:::

Tomen una captura de la gráfica: **Windows + Shift + S**, arrastren un rectángulo sobre ella, péguenla en Paint (Ctrl + V) y guárdenla; o tómenle foto a la pantalla con el celular.

:::foto id="g7-grafica"
Captura de la gráfica.
:::

:::pregunta id="g7-p1"
¿Los puntos forman casi una línea recta? ¿Qué significa eso?
:::

## Parte 2 · Milisegundos por gramo (25 min)

Si la relación es casi recta, podemos calcular cuántos milisegundos hacen falta para cada gramo:

> ms por gramo = tiempo ÷ gramos

1. En la fila de 1000 ms, copien su promedio de gramos y dividan 1000 entre ese promedio.
2. Hagan lo mismo con la fila de 2000 ms.
3. En la última fila, sumen los dos resultados y divídanlos entre 2.

Ejemplo con números inventados: si con 1000 ms cayeron 40 g, entonces 1000 ÷ 40 = 25 ms por gramo.

:::tabla id="g7-msg"
| Tiempo (ms) | Promedio (g) | ms por gramo |
| --- | --- | --- |
| 1000 | | |
| 2000 | | |
| Promedio de los dos | | |
:::

Redondeen el resultado a un número entero (sin decimales): el código lo necesita así.

Nuestro valor: MS_POR_GRAMO = ______

## Parte 3 · ¡A predecir! (30 min)

Para servir **30 g**: tiempo = 30 × MS_POR_GRAMO. Cambia el código:

1. Abran su programa (`equipo_NOMBRE_servir`) y guárdenlo como `equipo_NOMBRE_gramos`.
2. Escriban la línea `const int MS_POR_GRAMO = 20;` debajo de las otras constantes (después de `TIEMPO_ABIERTA`), y cambien el 20 por **su** valor.
3. Escriban la función `servirGramos` completa debajo de la función `servir()` (después de su llave de cierre `}`).
4. En el `loop`, cambien `servir();` por `servirGramos(30);`. El `loop` queda como el de abajo.

```cpp
const int MS_POR_GRAMO = 20;   // escribe tu valor

void servirGramos(int gramos) {
  tone(BUZZER, 1500, 300);
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(gramos * MS_POR_GRAMO);   // tiempo según los gramos
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
}

// en el loop:
if (digitalRead(BOTON) == LOW) {
  servirGramos(30);
  delay(500);
}
```

5. Sube el código. Para cada fila de la tabla:
   - Calcula el tiempo: gramos pedidos × su MS_POR_GRAMO, y anótalo.
   - Sirve con el botón y pesa en la báscula (con tara). Anota los gramos reales.
   - Diferencia = gramos reales − gramos pedidos (puede salir negativa si sirvió de menos).
   - Para las filas de 60 g, cambien `servirGramos(30)` por `servirGramos(60)` y vuelvan a subir el código.

:::tabla id="g7-prediccion"
| Gramos pedidos | Tiempo calculado (ms) | Gramos reales (báscula) | Diferencia (g) |
| --- | --- | --- | --- |
| 30 | | | |
| 30 | | | |
| 60 | | | |
| 60 | | | |
:::

:::pregunta id="g7-p2"
¿La predicción fue buena? ¿Cuántos gramos de diferencia hubo en promedio?
:::

## Parte 4 · Ficha técnica (15 min)

Una ficha técnica resume los datos importantes del aparato, como la etiqueta de un producto. Llénenla con sus datos:

- **Capacidad del depósito:** cuántos gramos caben en la botella llena (pésenla llena y vacía y resten).
- **Ángulo de apertura:** el valor de `ABIERTA` en su código.
- **Precisión (± g):** la diferencia más grande que tuvieron en la tabla de predicción (sin el signo).
- **Componentes:** la lista de piezas electrónicas (servo, botón, LED…).

:::tabla id="g7-ficha"
| Característica | Valor |
| --- | --- |
| Nombre del dispensador | |
| Mecanismo | |
| Capacidad del depósito (g) | |
| Ángulo de apertura | |
| ms por gramo | |
| Precisión (± g) | |
| Componentes | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Hicimos la gráfica con línea de tendencia.
- [ ] Calculamos MS_POR_GRAMO.
- [ ] Probamos la predicción con la báscula.
- [ ] Completamos la ficha técnica.
:::

## Bitácora (15 min)

:::pregunta id="g7-b1"
¿Para qué sirve una gráfica además de verse bonita?
:::

Antes de irse, guarden la hoja de cálculo (**Archivo → Guardar como**, formato `.xlsx`) y el programa `equipo_NOMBRE_gramos`. Pónganlos juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) o súbanlos uno por uno aquí:

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La relación no siempre es perfectamente recta (al inicio la compuerta tarda en abrir): si la gráfica no pasa por cero, usar el valor de 2000 ms, que es más estable.
- Capacidad: llenar la botella y pesar todo lo que cabe.
- Tiempo total: 30 + 25 + 30 + 15 + 5 + 15 = 120 minutos.
:::

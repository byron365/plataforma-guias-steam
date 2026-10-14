---
titulo: Los datos cuentan una historia
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · Los datos cuentan una historia

## Objetivo del día

Registrar los datos de la estación durante un tiempo, llevarlos a una hoja de cálculo, hacer nuestra primera gráfica y escribir la ficha técnica del proyecto.

**Al terminar tendremos:** una gráfica de temperatura con datos reales y la ficha técnica de la estación.

## Materiales del equipo

- Estación calibrada (sábado 6)
- Computadora con Arduino IDE y una hoja de cálculo (Excel, Google Sheets o LibreOffice Calc)

## Parte 1 · ¿Por qué el formato con comas? (10 min)

Al final del `loop` la estación envía los datos así:

```
24.6,63.0,78
24.7,62.8,77
```

Este formato se llama **CSV** (valores separados por comas). Cualquier hoja de cálculo lo entiende: cada coma separa una columna.

:::pregunta id="g7-p1"
En la línea `24.6,63.0,78`, ¿qué significa cada número?
:::

## Parte 2 · Ver la gráfica en vivo (15 min)

1. Comenta (con `//`) las líneas que imprimen texto como "Error del sensor", para que solo salgan números.
2. Abre **Herramientas → Serial Plotter** (Trazador serie).
3. Calienta el sensor con la mano y tapa la LDR. Observa las líneas.

[IMAGEN 7.1: Serial Plotter del Arduino IDE mostrando tres líneas de temperatura, humedad y luz]

## Parte 3 · Registrar datos (30 min)

1. Cambia `ESPERA` a **10000** (una lectura cada 10 segundos).
2. Abre el **Monitor serie**, borra lo que haya y deja la estación midiendo **20 minutos** sin tocarla.
3. Mientras tanto, cada 5 minutos anoten lo que pasa en el salón:

| Minuto | ¿Qué pasó en el salón? (puerta abierta, sol, ventilador...) |
| --- | --- |
| 0 | |
| 5 | |
| 10 | |
| 15 | |
| 20 | |

4. Al terminar, selecciona todo el texto del monitor (Ctrl + A), cópialo (Ctrl + C) y pégalo en la hoja de cálculo.
5. Usa **Datos → Texto en columnas** (separador: coma) para separar las columnas. Ponles títulos: Temperatura, Humedad, Luz.

[IMAGEN 7.2: hoja de cálculo con los datos separados en columnas de temperatura, humedad y luz]

## Parte 4 · Nuestra primera gráfica (20 min)

1. Selecciona la columna de temperatura.
2. **Insertar → Gráfico → Línea.**
3. Título: "Temperatura del salón". Eje vertical: °C. Eje horizontal: lectura (cada 10 s).

[IMAGEN 7.3: gráfica de línea de la temperatura del salón durante 20 minutos]

Con la hoja de cálculo calcula:

| Dato | Fórmula | Resultado |
| --- | --- | --- |
| Temperatura máxima | `=MAX(A:A)` | |
| Temperatura mínima | `=MIN(A:A)` | |
| Temperatura promedio | `=PROMEDIO(A:A)` | |

:::pregunta id="g7-p2"
¿En qué momento subió o bajó la temperatura? ¿Coincide con algo que anotaron en la tabla del salón?
:::

:::foto id="g7-grafica"
Captura de la gráfica del equipo.
:::

## Parte 5 · Ficha técnica (20 min)

La ficha técnica describe el aparato para que cualquiera lo entienda. Complétenla:

:::tabla id="g7-ficha"
| Característica | Valor |
| --- | --- |
| Nombre de la estación | |
| Qué mide | |
| Sensores usados | |
| Rango de temperatura del sensor | |
| Precisión después de calibrar | |
| Tiempo entre lecturas | |
| Alimentación | |
| Medidas de la carcasa | |
| Colores del LED y su significado | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Vimos los datos en el Serial Plotter.
- [ ] Registramos 20 minutos de datos.
- [ ] Hicimos la gráfica de temperatura.
- [ ] Calculamos máxima, mínima y promedio.
- [ ] Completamos la ficha técnica.
:::

## Reto extra

Haz una segunda gráfica con **dos líneas**: temperatura y humedad. ¿Cuando una sube, la otra baja? Escribe tu observación.

## Bitácora (15 min)

:::pregunta id="g7-b1"
¿Qué aprendimos del salón gracias a los datos?
:::

:::pregunta id="g7-b2"
¿Para qué sirve una ficha técnica?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- 20 minutos a 10 s = 120 lecturas: suficiente para ver tendencias.
- Si "Texto en columnas" no aparece en Google Sheets: Datos → Dividir texto en columnas.
- Configuración regional: si la hoja usa coma decimal, los puntos pueden dar problemas; usar Buscar y reemplazar "." por ",".
- Rango del DHT22: −40 a 80 °C, ±0,5 °C; humedad 0–100 %.
- Usar los 20 minutos de registro para avanzar la Parte 5 mientras se mide.
- Tiempo total: 10 + 15 + 30 + 20 + 20 + 5 + 15 = 115 minutos (5 de margen).
:::

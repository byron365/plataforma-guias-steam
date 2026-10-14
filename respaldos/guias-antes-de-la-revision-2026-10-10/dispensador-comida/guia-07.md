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

1. Pasa a la hoja de cálculo los **promedios** del sábado 6: columna A = tiempo (ms), columna B = gramos.
2. **Insertar → Gráfico → Dispersión.**
3. Agrega una **línea de tendencia** (clic derecho sobre los puntos).

[IMAGEN 7.1: gráfica de dispersión de tiempo contra gramos con línea de tendencia]

:::animacion tipo="tiempo-gramos" tabla="g6-gramos"
:::

:::foto id="g7-grafica"
Captura de la gráfica.
:::

:::pregunta id="g7-p1"
¿Los puntos forman casi una línea recta? ¿Qué significa eso?
:::

## Parte 2 · Milisegundos por gramo (25 min)

Si la relación es casi recta, podemos calcular cuántos milisegundos hacen falta para cada gramo:

> ms por gramo = tiempo ÷ gramos

:::tabla id="g7-msg"
| Tiempo (ms) | Promedio (g) | ms por gramo |
| --- | --- | --- |
| 1000 | | |
| 2000 | | |
| Promedio de los dos | | |
:::

Nuestro valor: MS_POR_GRAMO = ______

## Parte 3 · ¡A predecir! (30 min)

Para servir **30 g**: tiempo = 30 × MS_POR_GRAMO. Cambia el código:

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

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- La relación no siempre es perfectamente recta (al inicio la compuerta tarda en abrir): si la gráfica no pasa por cero, usar el valor de 2000 ms, que es más estable.
- Capacidad: llenar la botella y pesar todo lo que cabe.
- Tiempo total: 30 + 25 + 30 + 15 + 5 + 15 = 120 minutos.
:::

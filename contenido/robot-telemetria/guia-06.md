---
titulo: Probar con datos
guia: 6
sabado: 6
sesion: Pruebas funcionales
duracion: 120
---

# Guía 6 · Probar con datos

## Objetivo del día

Comprobar los requisitos con pruebas medibles: alcance del Bluetooth, respuesta del joystick, tiempo de parada sin señal y precisión de la batería.

**Al terminar tendremos:** la matriz de pruebas con resultados medidos y el factor de batería calibrado.

## Materiales del equipo

- Robot y mando funcionando
- Cinta métrica, cronómetro (celular), multímetro
- Requisitos del sábado 1

## Parte 1 · Plan de pruebas (15 min)

Cada requisito necesita una prueba con **criterio de aceptación** (qué resultado la aprueba):

Las cuatro primeras filas ya tienen la prueba y el criterio. En la última fila agreguen una prueba para uno de sus requisitos R4 a R6. Las columnas **Resultado** y **¿Aprueba?** se llenan al hacer las pruebas de hoy.

:::tabla id="g6-plan"
| Requisito | Prueba | Criterio de aceptación | Resultado | ¿Aprueba? |
| --- | --- | --- | --- | --- |
| R1 Movimiento | Recorrer un cuadrado de 1 m | Termina dentro de un círculo de 20 cm | | |
| R2 Parada sin señal | Apagar el mando con el robot avanzando | Se detiene en menos de 1 s | | |
| R3 Batería en el mando | Comparar con multímetro | Error menor a 0,2 V | | |
| Alcance | Alejarse hasta perder control | Mayor a 8 m | | |
| | | | | |
:::

## Parte 2 · Alcance del Bluetooth (25 min)

Alejen el mando del robot de 2 en 2 metros. En cada distancia, muevan el joystick 10 veces y cuenten cuántas respondió el robot:

Háganlo en un pasillo, con el docente. Midan la distancia con la cinta métrica y marquen cada 2 m con cinta en el piso. Una persona se queda junto al robot para detenerlo si hace falta. Para el mando lejos de la computadora, aliméntenlo con un cargador portátil (batería de celular) por USB.

:::tabla id="g6-alcance"
| Distancia (m) | Respuestas de 10 | ¿Con obstáculos (pared, personas)? |
| --- | --- | --- |
| 2 | | |
| 4 | | |
| 6 | | |
| 8 | | |
| 10 | | |
| 12 | | |
:::

La gráfica se dibuja sola con los datos de la tabla:

:::animacion tipo="grafica-datos" tabla="g6-alcance"
:::

## Parte 3 · Tiempo de parada (20 min)

Con el robot avanzando, apaguen el mando y midan con un video en cámara lenta cuánto tarda en detenerse:

1. Peguen una línea de cinta en el piso. El robot avanza despacio hacia ella y, justo cuando la cruza, una persona desconecta el USB del mando.
2. Graben con el celular en cámara lenta. En el video cuenten el tiempo desde que se desconecta el mando hasta que el robot se queda quieto.
3. Midan con la cinta métrica la distancia desde la línea hasta donde se detuvo.
4. **Para cambiar el TIMEOUT:** en el código del robot, en `// --- Ajustes del equipo ---`, cambien el `500` de `TIMEOUT` por el valor de la tabla y suban de nuevo. Al terminar, déjenlo en 500.

:::tabla id="g6-parada"
| Intento | TIMEOUT (ms) | Tiempo hasta detenerse (s) | Distancia recorrida sin señal (cm) |
| --- | --- | --- | --- |
| 1 | 500 | | |
| 2 | 500 | | |
| 3 | 200 | | |
| 4 | 1000 | | |
:::

:::pregunta id="g6-p1"
¿Qué pasa si el TIMEOUT es muy corto (por ejemplo 50 ms)? ¿Y si es muy largo?
:::

## Parte 4 · Calibrar la batería (25 min)

El divisor real nunca es exactamente 1:2 (las resistencias tienen tolerancia). Calibramos el factor:

> FACTOR_BAT = Voltaje del multímetro ÷ (lectura × 5 ÷ 1023)

**lectura × 5 ÷ 1023** es el voltaje que llega a A0. Como el mando muestra ese voltaje multiplicado por 2 (el FACTOR_BAT actual), pueden calcularlo así: voltaje del mando ÷ 2.

1. Midan la batería con el multímetro y anoten lo que muestra el mando al mismo tiempo.
2. Calculen el nuevo FACTOR_BAT con la fórmula.
3. En el código del robot cambien `2.0` en `FACTOR_BAT` por su número (con punto decimal, por ejemplo `2.06`) y suban de nuevo.
4. Vuelvan a comparar y llenen la última fila.

:::tabla id="g6-bateria"
| Momento | Multímetro (V) | Mando muestra (V) | Error (V) |
| --- | --- | --- | --- |
| Batería llena | | | |
| Después de 10 min de uso | | | |
| Con FACTOR_BAT calibrado | | | |
:::

Nuestro FACTOR_BAT: ______

## Parte 5 · Respuesta del joystick (20 min)

Prueben cada punto con el robot en el piso y escriban lo que observaron:

:::tabla id="g6-respuesta"
| Prueba | Observación |
| --- | --- |
| ¿Se nota retraso entre mover el joystick y el robot? | |
| ¿El robot avanza recto con el joystick al frente? | |
| ¿Tiembla con el joystick suelto? | |
| ¿La velocidad mínima mueve el robot? | |
:::

:::pregunta id="g6-p2"
Si el robot no avanza recto, ¿la causa puede estar en el código, en los motores o en ambos? ¿Cómo lo averiguarías?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6-logramos"
- [ ] Cada requisito tiene una prueba con criterio.
- [ ] Medimos el alcance.
- [ ] Medimos el tiempo de parada.
- [ ] Calibramos el factor de batería.
:::

## Bitácora (10 min)

Anoten aquí todo lo que falló hoy. **No hace falta corregirlo hoy:** en la Guía 7 lo arreglarán.

:::tabla id="g6-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Las pruebas que fallan hoy son la entrada de la guía 7 (corrección de fallos): no corregir todo hoy, solo registrar.
- g6-p1: muy corto → el robot se detiene a tirones porque algún mensaje llega tarde; muy largo → recorre demasiado sin control.
- Hacer la prueba de alcance en un pasillo y con supervisión.
- Tiempo total: 15 + 25 + 20 + 25 + 20 + 5 + 10 = 120 minutos.
:::

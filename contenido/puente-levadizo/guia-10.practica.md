---
titulo: Ajustamos el puente y lo presentamos
guia: 10
sabado: 10
sesion: Pruebas y presentación
duracion: 120
---

# Guía 10 · Ajustamos el puente y lo presentamos

## Objetivo del día

Ajustar el puente con el barco hasta que funcione siempre y hacer la demostración final.

**Al terminar tendremos:** el puente automático funcionando con 5 pasadas seguidas sin fallar y la demostración presentada.

## Materiales del equipo

- Puente armado con su circuito y el programa subido (guías 8 y 9)
- Un "barco" para probar: una caja pequeña, un bloque o un vaso
- Regla, cinta adhesiva, pistola de silicona
- Computadora con Arduino IDE y el circuito simulado en Tinkercad

## Parte 1 · Ajustes con el barco (40 min)

Conecten el USB y abran el **Monitor serie** a **9600 baudios**, como en la Guía 9.

1. Midan con la regla: pongan el barco en el río, en la línea que miran los ojos del sensor, y comparen lo que muestra el Monitor.

:::tabla id="g10p-sensor"
| Distancia real con regla (cm) | Lo que mide el sensor (cm) | Diferencia |
| --- | --- | --- |
| 5 | | |
| 10 | | |
| 15 | | |
:::

2. Si hace falta, cambien los **Ajustes del equipo** del código, súbanlo y prueben otra vez:
   - El puente se abre muy tarde o muy pronto → `DISTANCIA_BARCO`.
   - Las hojas suben poco o demasiado → `ANGULO_ARRIBA`.
   - Las hojas no quedan planas al bajar → avisen al docente (se ajusta el brazo del servo).
3. Con los valores finales, hagan **5 pasadas** de barco seguidas sin cambiar nada:

:::tabla id="g10p-pasadas"
| Pasada | ¿Se abrió a tiempo? | ¿El barco pasó sin chocar? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
:::

## Parte 2 · Pegar las torres (10 min)

Cuando las 5 pasadas salgan bien:

1. Desconecten el USB.
2. Levanten cada torre, pongan silicona en el borde de abajo y péguenla en su lugar, sin aplastar los cables.
3. Ordenen los cables con cinta sobre la base, sin que pasen por el medio del río.
4. Conecten el USB y hagan una pasada más.

## Parte 3 · Demostración final (55 min)

Cada equipo presenta su puente en **3 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas para cada una:

:::tabla id="g10p-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| ¿Qué es un puente levadizo y para qué sirve? | | |
| Cómo diseñamos las piezas en Tinkercad | | |
| Cómo lo simulamos antes de armarlo | | |
| Demostración en vivo con el barco | | |
:::

1. Ensayen una vez (15 min).
2. Presenten por turnos. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

[IMAGEN 9.1: equipo presentando el puente levadizo mientras el barco pasa con las hojas levantadas]

## ¿Lo logramos? (5 min)

:::checklist id="g10p-logramos"
- [ ] Logramos 5 pasadas seguidas sin fallar.
- [ ] Las torres están pegadas.
- [ ] Presentamos el puente.
:::

## Reto extra

Haz que el puente cuente cuántos barcos han pasado y lo escriba en el Monitor serie.

Pista: una variable `int barcos = 0;` arriba, fuera de las funciones; al final de `secuenciaPuente()`, `barcos++;` y un `Serial.println(barcos);`.

## Bitácora (10 min)

:::foto id="g10p-foto"
Video del puente abriéndose solo al pasar el barco.
:::

:::pregunta id="g10p-b1"
Si tuvieran que hacer otro proyecto, ¿lo simularían primero? ¿Por qué?
:::

:::archivo id="g10-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) con los ajustes del puente real. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica (10 sábados):** último sábado; antes era la Guía 8. La comparación con el simulador (antes Parte 1) pasó a la Guía 9. Sin diseño ni impresión del barco: cualquier objeto sirve (decisión de Bairon). Sin prueba de carga, ficha técnica ni cartel. Campos propios (g10p-…).
- Si un objeto no se detecta bien, usar uno con una cara plana hacia el sensor (una caja): el ultrasonido rebota mejor en superficies planas.
- Con DISTANCIA_BARCO = 20, el sensor puede alcanzar la esquina de la orilla B y abrir el puente sin barco.
- Si el Arduino se reinicia cuando se mueven los servos, conectar el eliminador de 9 V al jack del Arduino.
- Hojas que no quedan planas: sacar el brazo del eje con la hoja y ponerlo un diente más allá.
- Invitar a las familias a la demostración si es posible.
- Tiempo total: 40 + 10 + 55 + 5 + 10 = 120 minutos.
:::

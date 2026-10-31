---
titulo: Probamos el puente y lo presentamos
guia: 8
sabado: 8
sesion: Pruebas y presentación
duracion: 120
---

# Guía 8 · Probamos el puente y lo presentamos

## Objetivo del día

Comparar el puente real con el simulado, ajustarlo hasta que funcione siempre y hacer la demostración final.

**Al terminar tendremos:** el puente automático funcionando con 5 pasadas seguidas sin fallar y la demostración presentada.

## Materiales del equipo

- Puente armado con su circuito (sábado 7)
- Un "barco" para probar: una caja pequeña, un bloque o un vaso
- Regla, cinta adhesiva, pistola de silicona
- Computadora con Arduino IDE y el circuito simulado en Tinkercad

## Parte 1 · ¿Funciona igual que en el simulador? (25 min)

1. Conecten el USB. Debe estar el programa `equipo_NOMBRE_automatico` del sábado 7 (si no, súbanlo otra vez).
2. Abran el **Monitor serie** (lupa arriba a la derecha) a **9600 baudios**.
3. Con el río **vacío**, el sensor debe mostrar un número grande (más de 20) o 0. Si muestra un número pequeño, está viendo la orilla B o una torre: avisen al docente.
4. Pasen el barco frente al sensor y marquen la tabla:

:::tabla id="g8p-comparar"
| Prueba | ¿En el simulador funcionaba? | ¿En el puente real funciona? | Si no, ¿qué revisamos? |
| --- | --- | --- | --- |
| Se enciende el verde al empezar | | | |
| Al llegar el barco: amarillo y alarma | | | |
| Luego el rojo | | | |
| Las dos hojas suben juntas, en espejo | | | |
| Esperan arriba y bajan hasta quedar planas | | | |
| Vuelve el verde | | | |
:::

Si algo falla en el real pero funcionaba en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con el simulador.

:::pregunta id="g8p-p1"
¿Qué cosa funcionó distinto en el puente real que en el simulador? ¿Por qué creen que pasó?
:::

## Parte 2 · Ajustes con el barco (30 min)

1. Midan con la regla: pongan el barco en el río, en la línea que miran los ojos del sensor, y comparen lo que muestra el Monitor.

:::tabla id="g8p-sensor"
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

:::tabla id="g8p-pasadas"
| Pasada | ¿Se abrió a tiempo? | ¿El barco pasó sin chocar? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
:::

## Parte 3 · Pegar las torres (10 min)

Cuando las 5 pasadas salgan bien:

1. Desconecten el USB.
2. Levanten cada torre, pongan silicona en el borde de abajo y péguenla en su lugar, sin aplastar los cables.
3. Ordenen los cables con cinta sobre la base, sin que pasen por el medio del río.
4. Conecten el USB y hagan una pasada más.

## Parte 4 · Demostración final (40 min)

Cada equipo presenta su puente en **3 minutos**. Repartan las partes (una persona puede tener dos) y escriban 2 o 3 ideas cortas para cada una:

:::tabla id="g8p-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| ¿Qué es un puente levadizo y para qué sirve? | | |
| Cómo diseñamos las piezas en Tinkercad | | |
| Cómo lo simulamos antes de armarlo | | |
| Demostración en vivo con el barco | | |
:::

1. Ensayen una vez (10 min).
2. Presenten por turnos. Mientras los demás equipos presentan, escuchen y hagan al menos una pregunta.

[IMAGEN 9.1: equipo presentando el puente levadizo mientras el barco pasa con las hojas levantadas]

## ¿Lo logramos? (5 min)

:::checklist id="g8p-logramos"
- [ ] Comparamos el puente real con el simulado.
- [ ] Logramos 5 pasadas seguidas sin fallar.
- [ ] Las torres están pegadas.
- [ ] Presentamos el puente.
:::

## Reto extra

Haz que el puente cuente cuántos barcos han pasado y lo escriba en el Monitor serie.

Pista: una variable `int barcos = 0;` arriba, fuera de las funciones; al final de `secuenciaPuente()`, `barcos++;` y un `Serial.println(barcos);`.

## Bitácora (10 min)

:::foto id="g8p-foto"
Video del puente abriéndose solo al pasar el barco.
:::

:::pregunta id="g8p-b1"
Si tuvieran que hacer otro proyecto, ¿lo simularían primero? ¿Por qué?
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) con los ajustes del puente real. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica (8 sábados):** último sábado. Sin diseño ni impresión del barco: cualquier objeto sirve (decisión de Bairon). Sin prueba de carga, ficha técnica ni cartel. Campos propios (g8p-…).
- Si un objeto no se detecta bien, usar uno con una cara plana hacia el sensor (una caja): el ultrasonido rebota mejor en superficies planas.
- Con DISTANCIA_BARCO = 20, el sensor puede alcanzar la esquina de la orilla B y abrir el puente sin barco.
- Si el Arduino se reinicia cuando se mueven los servos, conectar el eliminador de 9 V al jack del Arduino.
- Hojas que no quedan planas: sacar el brazo del eje con la hoja y ponerlo un diente más allá.
- Invitar a las familias a la demostración si es posible.
- Tiempo total: 25 + 30 + 10 + 40 + 5 + 10 = 120 minutos.
:::

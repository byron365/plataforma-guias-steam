---
titulo: Prueba final y ¡gran torneo!
guia: 9
sabado: 9
sesion: Presentación del proyecto
duracion: 120
---

# Guía 9 · Prueba final y ¡gran torneo!

## Objetivo del día

Comprobar con 20 goles que el marcador es confiable, votar las reglas del torneo, presentar el proyecto y jugar el torneo con los marcadores de todos los equipos.

**Al terminar tendremos:** la precisión de nuestro marcador, la tabla de posiciones final y un campeón.

## Materiales del equipo

- Cancha con marcador y el programa `equipo_NOMBRE_marcador` (sábado 8)
- Pelota y jugadores o paletas para empujarla
- Computadora con Arduino IDE

## Parte 1 · Prueba de 20 goles (20 min)

1. Conecten el marcador e inicien un partido.
2. Metan **10 goles** en cada portería, uno por uno, de forma parecida (no muy rápido ni muy lento). Una persona cuenta los goles reales.
3. Anoten cuántos goles sumó el marcador (azul + rojo). Si contó de más o de menos, cambien `PAUSA_GOL`, suban el código y repitan.

:::tabla id="g9p-goles"
| PAUSA_GOL (ms) | Goles reales | Goles en el marcador | ¿Contó de más o de menos? |
| --- | --- | --- | --- |
| 1500 | 20 | | |
| | 20 | | |
:::

> Precisión (%) = Goles en el marcador ÷ Goles reales × 100

Ejemplo con números inventados: si el marcador sumó 19 de 20 goles, la precisión es 19 ÷ 20 × 100 = 95 %. Si contó de más (por ejemplo 22), la precisión pasa de 100 %: también es un error.

Nuestra pausa elegida: ______ ms · Precisión: ______ %

## Parte 2 · Reglas del torneo (15 min)

1. En equipo, escriban su propuesta para cada tema.
2. Cada equipo lee sus propuestas al grupo y el docente modera la votación: para cada tema gana la propuesta con más votos.

:::tabla id="g9p-reglas"
| Tema | Nuestra propuesta |
| --- | --- |
| Duración de cada partido | |
| ¿Cuántos jugadores por lado? | |
| ¿Cómo se mueve la pelota? (paletas, dedos, soplando...) | |
| ¿Qué pasa si hay empate? | |
:::

3. Pongan en `DURACION` el tiempo que votaron (en milisegundos) y suban el código.

## Parte 3 · Presentaciones (20 min)

Cada equipo presenta en **3 minutos**, con la cancha y el marcador funcionando. Repartan las partes:

:::tabla id="g9p-guion"
| Parte | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- |
| La cancha a escala y las piezas en Tinkercad | | |
| La simulación en Wokwi | | |
| Sensores, antirrebote y precisión del marcador (demostración de un gol) | | |
:::

## Parte 4 · El torneo (50 min)

En los torneos de fútbol se dan **3 puntos** por ganar, **1** por empatar y **0** por perder. Sigan el calendario del docente y las reglas votadas.

[IMAGEN 9.1: partido del torneo de mini fútbol con el marcador electrónico mostrando el resultado]

Anoten los partidos de su equipo. En **Cancha** escriban de qué equipo era la cancha. En **Resultado**: Ganado, Empatado o Perdido.

:::tabla id="g9p-partidos"
| Partido | Rival | Cancha | Goles a favor | Goles en contra | Resultado |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
:::

Al final, el docente lee la tabla de posiciones. Escriban una fila por equipo (PG = partidos ganados, PE = empatados, PP = perdidos; Puntos = PG × 3 + PE):

:::tabla id="g9p-posiciones"
| Equipo | PG | PE | PP | Puntos |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
:::

Posición final del equipo: ______

## ¿Lo logramos? (5 min)

:::checklist id="g9p-logramos"
- [ ] Hicimos la prueba de 20 goles y sabemos la precisión.
- [ ] Votamos las reglas del torneo.
- [ ] Presentamos el proyecto.
- [ ] Jugamos el torneo y completamos la tabla.
:::

## Bitácora (10 min)

:::foto id="g9p-foto"
Foto del equipo en el torneo.
:::

:::pregunta id="g9p-b1"
¿Qué marcador de otro equipo funcionó mejor y qué tenía de especial?
:::

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g9p-b2" individual="si"
¿Cómo me sentí presentando y jugando?
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) y, si llevan la bitácora en el bloc de notas o en Word, también (.txt o .docx).
:::

:::docente
- **Versión Práctica con Wokwi (9 sábados):** último sábado. Junta la prueba de 20 goles de la Guía 6 normal, las reglas de la Guía 8 Tinkercad (sin hoja de cálculo ni cartel) y el torneo de la Guía 9 normal, con presentaciones de 3 minutos. Campos propios (g9p-…).
- Si la precisión no llega a 95 %, revisar primero la calibración de los sensores (Guía 8) y después la pausa.
- Preparar el calendario de partidos según el número de equipos: "todos contra todos" si hay 4 equipos o menos; con más, grupos y final.
- Si un marcador falla en un partido, se juega en otra cancha y se anota a mano; dar 5 minutos de reparación.
- Reconocer al campeón, la mejor presentación y el marcador más preciso.
- Tiempo total: 20 + 15 + 20 + 50 + 5 + 10 = 120 minutos.
:::

---
titulo: Rumbo al torneo
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · Rumbo al torneo

## Objetivo del día

Organizar el torneo con su tabla de posiciones, practicar y preparar el guion y el cartel de la presentación.

**Al terminar tendremos:** las reglas y el calendario del torneo, la tabla de posiciones lista y el guion con responsables.

## Materiales del equipo

- Cancha con marcador
- Ficha técnica y estadísticas (sábado 7)
- Cartulina y marcadores
- Computadora con hoja de cálculo

## Parte 1 · Reglas del torneo (20 min)

1. En equipo, escriban su propuesta para cada tema.
2. Cada equipo lee sus propuestas al grupo.
3. El docente modera la votación: para cada tema gana la propuesta con más votos.

:::tabla id="g8-reglas"
| Tema | Nuestra propuesta |
| --- | --- |
| Duración de cada partido | |
| ¿Cuántos jugadores por lado? | |
| ¿Cómo se mueve la pelota? (paletas, dedos, soplando...) | |
| ¿Qué es falta? | |
| ¿Qué pasa si hay empate? | |
| ¿Se juega en la cancha propia o en la de otro equipo? | |
:::

:::pregunta id="g8-p1"
Escribe las reglas finales que votó el grupo.
:::

## Parte 2 · La tabla de posiciones (25 min)

En los torneos de fútbol se dan **3 puntos** por ganar, **1** por empatar y **0** por perder. Preparen la tabla en la hoja de cálculo:

Lean primero qué significa cada sigla (tabla de abajo). Escriban en la tabla los nombres de los equipos del grupo; los números se llenan durante el torneo.

:::tabla id="g8-posiciones"
| Equipo | PJ | PG | PE | PP | GF | GC | DG | Puntos |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
:::

| Sigla | Significa | Fórmula |
| --- | --- | --- |
| PJ | Partidos jugados | PG + PE + PP |
| DG | Diferencia de goles | GF − GC |
| Puntos | | PG × 3 + PE × 1 |

(PG = partidos ganados, PE = empatados, PP = perdidos, GF = goles a favor, GC = goles en contra.)

**En la hoja de cálculo:**

1. En la fila 1 escriban los títulos: A1 `Equipo`, B1 `PJ`, C1 `PG`, D1 `PE`, E1 `PP`, F1 `GF`, G1 `GC`, H1 `DG`, I1 `Puntos`.
2. Desde la fila 2, un equipo por fila.
3. En la fila 2 escriban las fórmulas: en B2 `=C2+D2+E2`, en H2 `=F2-G2` y en I2 `=C2*3+D2`.
4. Copien esas tres celdas hacia abajo para los demás equipos (arrastren el cuadrito de la esquina de la celda).
5. Prueben escribiendo números inventados en PG, PE, PP, GF y GC: PJ, DG y Puntos se calculan solos. Después bórrenlos.

[IMAGEN 8.1: hoja de cálculo con la tabla de posiciones y las fórmulas de puntos y diferencia de goles]

:::pregunta id="g8-p2"
Un equipo ganó 2, empató 1 y perdió 1, con 7 goles a favor y 4 en contra. ¿Cuántos puntos y qué diferencia de goles tiene?
:::

## Parte 3 · Práctica (25 min)

Jueguen partidos de práctica con las reglas nuevas y revisen que el marcador funcione siempre.

Pongan en `DURACION` el tiempo que votaron (en milisegundos) y suban el código antes de jugar.

| Partido de práctica | Resultado | ¿Hubo algún error del marcador? |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |

## Parte 4 · Guion y cartel (30 min)

La presentación dura 5 minutos. Repartan las partes (alguien puede tener dos) y escriban 2 o 3 ideas cortas para cada una. Ensayen con cronómetro.

:::tabla id="g8-guion"
| Parte | Tiempo | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- | --- |
| La idea y la escala de la cancha | 1 min | | |
| Porterías, simetría y escaneo 3D | 1 min | | |
| Sensores y circuito | 1 min | | |
| Código: antirrebote y tiempo | 1 min | | |
| Estadísticas y demostración en vivo | 1 min | | |
:::

El cartel lleva: nombre del equipo, foto o render de la cancha, el cálculo de la escala, la ficha técnica y la precisión del marcador.

Primero repartan el espacio a lápiz y luego pasen a marcador; título grande y frases cortas. Los datos están en las Guías 2, 6 y 7.

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] Votamos las reglas del torneo.
- [ ] La tabla de posiciones tiene fórmulas.
- [ ] Practicamos con las reglas nuevas.
- [ ] El guion tiene responsables.
- [ ] Empezamos el cartel.
:::

## Reto extra

Diseñen en Blender una **medalla** con el nombre del torneo (cilindro + texto 3D) para imprimir.

Pistas: archivo nuevo en milímetros; un disco (cilindro) de unos 40 mm de diámetro y 3 mm de alto; encima, el texto 3D de 1 mm de grosor; unir y exportar en STL.

1. **Archivo nuevo en mm:** **Archivo → Nuevo → General**, borren el cubo (clic en él, mouse sobre la vista 3D, **X → Borrar**). Propiedades → icono de **Escena** → **Unidades** → Escala de unidades 0.001, Longitud Milímetros.
2. **Disco:** mouse sobre la vista 3D → **Shift + A → Malla → Cilindro**. Panel N (tecla **N**) → **Elemento** → Dimensiones X = 40, Y = 40, Z = 3; Posición X = 0, Y = 0, Z = 1.5.
3. **Texto:** **Shift + A → Texto**. Aparece la palabra "Text" acostada y muy pequeña (1 mm).
   - Con el mouse sobre la vista 3D presionen **Tab**: ahora se puede escribir. Borren "Text" con la tecla de retroceso, escriban el nombre del torneo y presionen **Tab** otra vez para salir.
   - **Darle grosor:** en Propiedades, clic en el icono de la letra **a** verde (datos del texto) → **Geometría** → **Extruir** = 0.2. (El grosor final lo ajustan en el paso 4.)
   - **Agrandarlo:** con el texto seleccionado presionen **S**, escriban 6 y **Enter** (seis veces más grande). Debe caber dentro del disco de 40 mm: si se sale, **S**, 0.8, **Enter** hasta que quepa.
4. **Convertir el texto en malla:** Blender no une un texto con un cilindro. Con el texto seleccionado: menú **Objeto → Convertir → Malla**. Después, en el Panel N: **Dimensiones Z** = 1 (grosor de las letras) y **Posición Z** = 3.5 (así queda apoyado sobre el disco, que mide 3 mm).
5. **Centrarlo:** miren desde arriba (tecla **7** del teclado numérico o clic en el círculo azul **Z** de los ejes de colores, arriba a la derecha de la vista 3D). Presionen **G**, muevan el texto hasta el centro del disco y hagan clic.
6. **Unir:** clic en el disco, **Shift + clic** en el texto y, con el mouse sobre la vista 3D, **Ctrl + J**.
7. **Exportar:** **Archivo → Exportar → STL (.stl)** → activen **Sólo lo seleccionado** → nombre `equipo_NOMBRE_medalla.stl` → **Exportar STL**.

## Bitácora (15 min)

:::pregunta id="g8-b1"
¿Por qué se usa la diferencia de goles cuando dos equipos tienen los mismos puntos?
:::

Antes de irse, guarden la hoja de cálculo con la tabla de posiciones (formato `.xlsx`) y súbanla aquí (si hicieron la medalla, también su `.blend`).

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g8-p2: 2 × 3 + 1 = 7 puntos; DG = 7 − 4 = +3.
- Proponer un formato de "todos contra todos" si hay 4 equipos o menos; con más, grupos y final.
- Preparar el calendario de partidos del sábado 9 con base en el número de equipos.
- Tiempo total: 20 + 25 + 25 + 30 + 5 + 15 = 120 minutos.
:::

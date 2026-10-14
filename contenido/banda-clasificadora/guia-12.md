---
titulo: ¿Qué tan precisa es nuestra fábrica?
guia: 12
sabado: 12
sesion: Evaluación del proyecto
duracion: 120
---

# Guía 12 · ¿Qué tan precisa es nuestra fábrica?

## Objetivo del día

Evaluar el proyecto con la rúbrica, analizar la precisión alcanzada y comparar los resultados con los requisitos.

**Al terminar tendremos:** la rúbrica, el análisis de precisión con su matriz de confusión y la autoevaluación individual.

## Materiales del equipo

- Resultados oficiales y coevaluaciones del sábado 11
- Documento técnico, banda

## Parte 1 · Matriz de confusión (30 min)

Una **matriz de confusión** muestra qué color se detectó para cada color real. La diagonal son los aciertos.

Cómo llenarla con su lote oficial (Guía 11) o con un lote nuevo de 30 piezas:

- Cada **fila** es el color **real** de la pieza; cada **columna**, lo que **detectó** la banda.
- Por cada pieza, sumen 1 en la casilla de su fila (color real) y su columna (color detectado). Por ejemplo, una pieza roja que la banda detectó como verde suma 1 en la fila Rojo, columna Verde.
- "Desconocido" es cuando `leerColor()` devolvió −1.
- Al final, la suma de cada fila debe ser el número de piezas de ese color.

:::tabla id="g12-confusion"
| Color real ↓ / Detectado → | Rojo | Verde | Azul | Desconocido |
| --- | --- | --- | --- | --- |
| Rojo | | | | |
| Verde | | | | |
| Azul | | | | |
:::

Esta animación pinta su matriz con los números que escribieron: los colores más fuertes muestran dónde se juntan más piezas.

:::animacion tipo="matriz-confusion" tabla="g12-confusion"
:::

:::pregunta id="g12-p1"
¿Qué dos colores se confunden más? ¿Qué cambiarías para separarlos mejor?
:::

## Parte 2 · Requisitos (20 min)

Copien sus requisitos R4 y R5 de la Guía 1. Para cada uno: ¿se cumplió (Sí, No o En parte)? y la evidencia que lo demuestra (por ejemplo, "lote oficial: 93 %").

:::tabla id="g12-requisitos"
| Requisito | ¿Se cumplió? | Evidencia |
| --- | --- | --- |
| R1 · 90 % de aciertos | | |
| R2 · Velocidad estable | | |
| R3 · Paro de emergencia | | |
| R4 | | |
| R5 | | |
:::

## Parte 3 · Rúbrica (30 min)

Lean cada criterio (fila), decidan cuál descripción se parece más a lo que hicieron y escriban la nota: 1 si está en proceso, 2 o 3 si es suficiente, 4 si es excelente. En **Evidencia**, qué lo demuestra. Al final sumen las cinco notas.

:::tabla id="g12-rubrica"
| Criterio | En proceso (1) | Suficiente (2-3) | Excelente (4) | Nuestra nota | Evidencia |
| --- | --- | --- | --- | --- | --- |
| Arquitectura | Sin diagrama | Diagrama incompleto o con diferencias | Diagrama completo que coincide con lo construido | | |
| Potencia | Reinicios, fallas o riesgo eléctrico | Funciona con calentamiento o sin alguna protección | Cargas controladas, protegidas y sin sobrecalentamiento | | |
| Comunicación | No se comunica de forma confiable | Funciona con fallos ocasionales | Protocolo documentado, sin pérdidas y con manejo de errores | | |
| Pruebas y corrección | Sin evidencia | Registro parcial | Registro de fallos con causa y solución | | |
| Documentación y presentación | Sin documentación | Documento parcial o participación desigual | Documento claro y todos explican su parte | | |
:::

Nota total del equipo: ______ de 20

## Parte 4 · Autoevaluación (25 min)

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g12-p2" individual="si"
¿Qué aporté desde mi rol? Da un ejemplo concreto.
:::

:::pregunta id="g12-p3" individual="si"
¿Qué aprendí de electrónica de potencia que no sabía?
:::

:::opciones id="g12-p4"
¿Qué fue lo más difícil del proyecto?
- La etapa de potencia
- La comunicación I2C
- Calibrar los colores
- Sincronizar el desviador
- Coordinar el equipo
:::

## Parte 5 · Comparación del grupo (10 min)

Copien los resultados de cada equipo (los dirá el docente o están en la coevaluación de la Guía 11).

:::tabla id="g12-grupo"
| Equipo | Aciertos del lote (%) | Piezas por minuto | Mayor fallo resuelto |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Hicimos la matriz de confusión.
- [ ] Revisamos los requisitos con evidencia.
- [ ] Completamos la rúbrica.
- [ ] Cada integrante hizo su autoevaluación.
:::

:::docente
- La matriz de confusión se usa en control de calidad e inteligencia artificial: buena conexión para la conversación.
- Tiempo total: 30 + 20 + 30 + 25 + 10 + 5 = 120 minutos.
:::

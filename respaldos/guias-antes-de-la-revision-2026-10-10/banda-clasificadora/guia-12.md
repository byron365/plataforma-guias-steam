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

:::tabla id="g12-confusion"
| Color real ↓ / Detectado → | Rojo | Verde | Azul | Desconocido |
| --- | --- | --- | --- | --- |
| Rojo | | | | |
| Verde | | | | |
| Azul | | | | |
:::

:::animacion tipo="matriz-confusion" tabla="g12-confusion"
:::

:::pregunta id="g12-p1"
¿Qué dos colores se confunden más? ¿Qué cambiarías para separarlos mejor?
:::

## Parte 2 · Requisitos (20 min)

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

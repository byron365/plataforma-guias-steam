---
titulo: La prueba de seguridad
guia: 12
sabado: 12
sesion: Evaluación del proyecto
duracion: 120
---

# Guía 12 · La prueba de seguridad

## Objetivo del día

Pasar una prueba de seguridad hecha por otro equipo, evaluar el proyecto con la rúbrica y hacer la autoevaluación.

**Al terminar tendremos:** el resultado de la prueba de seguridad, la rúbrica y la autoevaluación individual.

## Materiales del equipo

- Elevador completo
- Documento técnico, coevaluaciones

## Parte 1 · Prueba de seguridad cruzada (40 min)

Otro equipo prueba **nuestro** elevador (y nosotros el suyo) con esta lista. El inspector anota:

El equipo inspector se sienta en **nuestra** computadora y llena esta tabla: Sí o No en cada prueba y una observación. Nosotros solo miramos y respondemos sus preguntas. Al terminar, cambiamos de lugar e inspeccionamos su elevador en su computadora.

:::tabla id="g12-inspeccion"
| Prueba | ¿Aprueba? | Observación del inspector |
| --- | --- | --- |
| Hay fusible en la entrada de la fuente | | |
| La lógica y la potencia tienen GND común y están separadas | | |
| El paro detiene al instante, subiendo y bajando | | |
| Después del paro exige rearme | | |
| El final de carrera de arriba detiene el motor | | |
| El final de carrera de abajo detiene el motor | | |
| Si se desconecta un nodo, el resto sigue | | |
| Ningún cable suelto toca partes móviles | | |
| El puente H no se calienta en exceso tras 5 viajes | | |
:::

Equipo inspector: ______

## Parte 2 · Requisitos (15 min)

Copien sus requisitos R1 a R6 de la Guía 1. Para cada uno: ¿se cumplió (Sí, No o En parte)? y la evidencia (por ejemplo, "tabla de seguridad de la Guía 6").

:::tabla id="g12-requisitos"
| Requisito | ¿Se cumplió? | Evidencia |
| --- | --- | --- |
| R1 | | |
| R2 | | |
| R3 | | |
| R4 | | |
| R5 | | |
| R6 | | |
:::

## Parte 3 · Rúbrica (30 min)

Lean cada criterio (fila), decidan cuál descripción se parece más a lo que hizo su equipo y escriban la nota: 1 si está en proceso, 2 o 3 si es suficiente, 4 si es excelente. En **Evidencia**, qué lo demuestra. Al final sumen las cinco notas.

:::tabla id="g12-rubrica"
| Criterio | En proceso (1) | Suficiente (2-3) | Excelente (4) | Nuestra nota | Evidencia |
| --- | --- | --- | --- | --- | --- |
| Arquitectura | Sin diagrama | Diagrama incompleto o con diferencias | Diagramas completos y comparación con argumentos | | |
| Potencia | Reinicios, fallas o riesgo eléctrico | Funciona con calentamiento o sin alguna protección | Cargas controladas, protegidas y sin sobrecalentamiento | | |
| Comunicación | No se comunica de forma confiable | Funciona con fallos ocasionales | Sin pérdida de llamadas y con manejo de nodos caídos | | |
| Pruebas y corrección | Sin evidencia | Registro parcial | Registro de fallos con causa y solución | | |
| Documentación y presentación | Sin documentación | Documento parcial o participación desigual | Documento claro y todos explican su parte | | |
:::

Nota total del equipo: ______ de 20

## Parte 4 · Autoevaluación (25 min)

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g12-p1" individual="si"
¿Qué aporté desde mi rol? Da un ejemplo concreto.
:::

:::pregunta id="g12-p2" individual="si"
¿Qué aprendí sobre diseñar sistemas seguros?
:::

:::opciones id="g12-p3"
¿Qué fue lo más difícil del proyecto?
- La mecánica de la torre y la cabina
- El puente H y el frenado
- El bus I2C con varios nodos
- La seguridad
- Coordinar el equipo
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Pasamos la prueba de seguridad cruzada.
- [ ] Revisamos los requisitos.
- [ ] Completamos la rúbrica.
- [ ] Cada integrante hizo su autoevaluación.
:::

## Bitácora (5 min)

:::pregunta id="g12-b1"
¿Qué encontró el inspector que nosotros no habíamos visto?
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- La prueba cruzada imita una inspección real: pedir que los inspectores sean exigentes y respetuosos.
- Tiempo total: 40 + 15 + 30 + 25 + 5 + 5 = 120 minutos.
:::

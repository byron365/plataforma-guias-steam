---
titulo: La fábrica en marcha
guia: 11
sabado: 11
sesion: Presentación del proyecto
duracion: 120
---

# Guía 11 · La fábrica en marcha

## Objetivo del día

Presentar la banda clasificadora y hacer la demostración oficial con el lote de 30 piezas.

**Al terminar tendremos:** la presentación hecha, el resultado oficial del lote y la coevaluación de los demás equipos.

## Materiales del equipo

- Banda completa, lote de 30 piezas mezclado por otro equipo
- Cartel o diapositivas, documento técnico

## Parte 1 · Revisión final (20 min)

Revisen cada punto con la fuente desenchufada y, después, con todo encendido:

1. Fusible puesto y GND común unido (el GND de la fuente con el de los dos Arduino).
2. Enciendan: el display no debe mostrar **E**.
3. Prueben una pieza de cada color: debe llegar a su contenedor.
4. Presionen el paro: la banda se detiene; al soltarlo, sigue.
5. Vacíen los contenedores y presionen reset en el clasificador (display en cero).

:::checklist id="g11-revision"
- [ ] Fuente con fusible y GND común revisados.
- [ ] El I2C responde (no aparece "E" en el display).
- [ ] El desviador llega a los tres contenedores.
- [ ] El paro de emergencia funciona.
- [ ] Contenedores vacíos y display en cero.
:::

## Parte 2 · Presentaciones y demostraciones (60 min)

Cada equipo: **6 minutos** de presentación + **3 minutos** de demostración con el lote + **2 minutos** de preguntas.

El docente cronometra y cuenta las piezas de la demostración oficial; copien los resultados aquí:

:::tabla id="g11-oficial"
| Resultado oficial | Valor |
| --- | --- |
| Tiempo para las 30 piezas (s) | |
| Piezas en el contenedor correcto | |
| Aciertos (%) | |
| ¿Coincidió el display? | |
| ¿Se usó el paro de emergencia? | |
:::

Mientras los otros equipos presentan, evalúenlos de 1 (muy poco) a 5 (excelente) en cada columna. Una fila por equipo.

:::tabla id="g11-coevaluacion"
| Equipo | Arquitectura clara (1-5) | Potencia (1-5) | Comunicación (1-5) | Aciertos del lote (%) | Comentario |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |
:::

[IMAGEN 11.1: banda clasificadora en la demostración con las piezas cayendo en los tres contenedores de colores]

## Parte 3 · Preguntas (15 min)

Escriban las preguntas tal como se las hicieron y lo que respondieron. Si alguna no la supieron responder, escriban qué responderían ahora.

:::pregunta id="g11-p1"
¿Qué preguntas técnicas nos hicieron y cómo las respondimos?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Presentamos todas las partes.
- [ ] Hicimos la demostración oficial.
- [ ] Evaluamos a los demás equipos.
:::

## Bitácora (20 min)

:::foto id="g11-foto"
Foto o video de la demostración.
:::

:::pregunta id="g11-b1"
¿Qué falló durante la demostración y qué haríamos distinto?
:::

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g11-b2" individual="si"
¿Cómo me fue explicando mi parte técnica?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- Preguntas sugeridas: ¿por qué un IRLZ44N? ¿qué hace el diodo? ¿cómo comparte el bus I2C el sensor y el Arduino? ¿qué pasa si el nodo banda deja de responder?
- Tiempo total: 20 + 60 + 15 + 5 + 20 = 120 minutos.
:::

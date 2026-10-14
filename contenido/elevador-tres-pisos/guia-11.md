---
titulo: El elevador en servicio
guia: 11
sabado: 11
sesion: Presentación del proyecto
duracion: 120
---

# Guía 11 · El elevador en servicio

## Objetivo del día

Presentar el elevador y hacer la demostración completa, incluyendo el paro de emergencia y la falla de un nodo.

**Al terminar tendremos:** la presentación hecha, la demostración registrada y la coevaluación de los demás equipos.

## Materiales del equipo

- Elevador completo, guion de la demostración
- Cartel o diapositivas, documento técnico

## Parte 1 · Revisión final (20 min)

Revisen cada punto antes de que llegue el público:

1. Con la fuente desenchufada: fusible puesto y el GND de la fuente, del L298N y de la central unidos.
2. Enciendan: los tres displays deben mostrar un número y la cabina debe bajar sola al piso 1.
3. Presionen el paro con la cabina en movimiento, suéltenlo y presionen el rearme.
4. Con un palito, presionen cada final de carrera mientras la cabina va hacia él.

:::checklist id="g11-revision"
- [ ] Fusible y GND común revisados.
- [ ] Los tres nodos responden (displays encendidos).
- [ ] *Homing* al encender funciona.
- [ ] Paro y rearme funcionan.
- [ ] Los finales de carrera detienen el motor.
:::

## Parte 2 · Presentaciones y demostraciones (60 min)

Cada equipo: **6 minutos** de presentación + **3 minutos** de demostración + **2 minutos** de preguntas.

Durante su demostración, una persona del equipo anota si cada paso salió bien (Sí o No):

:::tabla id="g11-demo"
| Paso de la demostración | ¿Salió bien? |
| --- | --- |
| Homing | |
| Llamada simple | |
| Llamadas simultáneas | |
| Paro de emergencia | |
| Rearme | |
| Nodo desconectado | |
:::

Mientras los otros equipos presentan, pongan de 1 (muy poco) a 5 (excelente) en cada columna y un comentario concreto (algo que les gustó o algo que se puede mejorar):

:::tabla id="g11-coevaluacion"
| Equipo | Arquitectura y comparación (1-5) | Potencia y seguridad (1-5) | Comunicación (1-5) | Demostración (1-5) | Comentario |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |
:::

[IMAGEN 11.1: demostración del elevador con un estudiante presionando el paro de emergencia mientras la cabina viaja]

## Parte 3 · Preguntas (15 min)

Escriban las preguntas tal como se las hicieron y lo que respondieron. Si alguna no la supieron responder, escriban qué responderían ahora.

:::pregunta id="g11-p1"
¿Qué preguntas técnicas nos hicieron y cómo las respondimos?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Presentamos todas las partes.
- [ ] La demostración incluyó paro y falla de nodo.
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
- Preguntas sugeridas: ¿qué pasa si se corta el hilo? ¿por qué NC en los finales de carrera? ¿cómo sabe la central que un nodo no responde?
- Tiempo total: 20 + 60 + 15 + 5 + 20 = 120 minutos.
:::

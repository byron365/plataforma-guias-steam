---
titulo: Pensar en sistemas distribuidos
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Pensar en sistemas distribuidos

## Objetivo del día

Reflexionar sobre la arquitectura distribuida, completar la bitácora y dejar el código final documentado. Los equipos que quieran pueden agregar el modo automático.

**Al terminar tendremos:** la reflexión del equipo, el código final de los dos nodos comentado y la bitácora completa.

## Materiales del equipo

- Robot y mando
- Bitácora de fallos completa
- Computadora

## Parte 1 · Sistemas distribuidos en el mundo (25 min)

:::tabla id="g13-mundo"
| Sistema | ¿Qué nodos tiene? | ¿Cómo se comunican? | ¿Qué pasa si se pierde la comunicación? |
| --- | --- | --- | --- |
| Dron con control remoto | | | |
| Carro moderno (red CAN) | | | |
| Rover en Marte | | | |
| Brazo de cirugía remota | | | |
:::

:::pregunta id="g13-p1"
Un rover en Marte tarda varios minutos en recibir cada orden. ¿Qué tendría que hacer distinto a nuestro robot?
:::

## Parte 2 · Reflexión de arquitectura (25 min)

:::pregunta id="g13-p2"
¿Qué ventajas tuvo separar el sistema en mando y robot? ¿Qué problemas nuevos trajo?
:::

:::pregunta id="g13-p3"
¿Qué decisión de potencia (batería, regulador, puente H, capacitor) fue la más importante para que el robot funcionara bien?
:::

:::pregunta id="g13-p4"
De todos los fallos de la bitácora, ¿cuál nos enseñó más?
:::

## Parte 3 · Código final (30 min)

:::checklist id="g13-codigo"
- [ ] Los dos programas tienen encabezado con proyecto, nodo, equipo y docente.
- [ ] Cada función tiene un comentario.
- [ ] Los ajustes (TIMEOUT, PASO, DIST_FRENO, FACTOR_BAT) están juntos y explicados.
- [ ] Están guardados como **equipo_NOMBRE_robot.ino** y **equipo_NOMBRE_mando.ino**.
:::

## Parte 4 · Reto opcional: modo automático (30 min)

Si el equipo aún no lo hizo, agreguen el modo automático (reto del sábado 8): el robot avanza solo, y al detectar un obstáculo retrocede, gira y continúa. El mando cambia de modo con el botón del joystick y lo muestra en la OLED.

:::tabla id="g13-auto"
| Prueba | ¿Funciona? |
| --- | --- |
| El botón cambia a modo automático | |
| Esquiva un obstáculo | |
| Vuelve al modo manual | |
| Si se pierde la señal, se detiene incluso en automático | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Completamos la tabla de sistemas distribuidos.
- [ ] Escribimos la reflexión.
- [ ] El código final está documentado.
:::

## Bitácora (5 min)

:::pregunta id="g13-b1" individual="si"
En una frase: ¿qué aprendí sobre diseñar sistemas con varias partes?
:::

:::archivo id="g13-archivo"
**Archivo de trabajo:** si llevan la bitácora en el bloc de notas o en Word, o tienen otro archivo del proyecto, súbanlo aquí (.txt, .docx, .zip…) para tenerlo en cualquier computadora de la academia.
:::

:::docente
- g13-p1: debe ser autónomo (decidir solo ante obstáculos) y recibir objetivos, no órdenes de joystick.
- La última fila del reto es clave: la seguridad no se negocia aunque cambie el modo; si el modo automático no requiere mando, discutir qué debería pasar.
- Tiempo total: 25 + 25 + 30 + 30 + 5 + 5 = 120 minutos.
:::

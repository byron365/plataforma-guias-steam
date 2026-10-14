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

Para cada sistema, piensen (o busquen) qué partes con su propio controlador tiene, por dónde se comunican y qué pasa si se corta la comunicación:

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

Abran los dos programas (robot y mando) y revisen punto por punto. Un **comentario** empieza con `//`: el Arduino no lo lee, es una nota para las personas. El **encabezado** son las primeras líneas de comentario del programa. Para el último punto, usen **Archivo → Guardar como** y verifiquen (✓) que siguen sin errores.

:::checklist id="g13-codigo"
- [ ] Los dos programas tienen encabezado con proyecto, nodo, equipo y docente.
- [ ] Cada función tiene un comentario.
- [ ] Los ajustes (TIMEOUT, PASO, DIST_FRENO, FACTOR_BAT) están juntos y explicados.
- [ ] Están guardados como **equipo_NOMBRE_robot.ino** y **equipo_NOMBRE_mando.ino**.
:::

## Parte 4 · Reto opcional: modo automático (30 min)

Si el equipo aún no lo hizo, agreguen el modo automático (reto del sábado 8): el robot avanza solo, y al detectar un obstáculo retrocede, gira y continúa. El mando cambia de modo con el botón del joystick y lo muestra en la OLED.

Pistas:

- **Botón del joystick:** el pin **SW** del joystick va a **D2** del mando (D2 está libre). En el `setup()` del mando: `pinMode(2, INPUT_PULLUP);`. Al presionarlo se lee LOW.
- **Mando:** cuando se presione el botón, envíen la línea `A` con `bt.println("A");` y esperen a que se suelte, para que no se envíe muchas veces. Guarden en una variable si está en automático para mostrarlo en la OLED.
- **Robot:** al inicio de `procesar()` (antes de la línea de la Guía 7 que descarta mensajes cortos, porque `A` es muy corto), si `m[0]` es `'A'`, cambien una variable `bool automatico` (de `false` a `true` o al revés). En automático, el robot ignora los números del joystick pero **sigue actualizando** `ultimoMensaje`, porque el mando sigue enviando mensajes `M`.
- **Movimiento automático:** en el `loop()`, si está en automático, pidan avanzar (por ejemplo 150 en los dos motores). Si `distancia()` es menor que `DIST_FRENO`, retrocedan un momento y giren antes de seguir.

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

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g13-b1" individual="si"
En una frase: ¿qué aprendí sobre diseñar sistemas con varias partes?
:::

Suban los dos programas finales juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g13-p1: debe ser autónomo (decidir solo ante obstáculos) y recibir objetivos, no órdenes de joystick.
- La última fila del reto es clave: la seguridad no se negocia aunque cambie el modo; si el modo automático no requiere mando, discutir qué debería pasar.
- Tiempo total: 25 + 25 + 30 + 30 + 5 + 5 = 120 minutos.
:::

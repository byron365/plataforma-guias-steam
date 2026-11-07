---
titulo: Ajustes y ¡día del reto!
guia: 9
sabado: 9
sesion: Presentación del proyecto
duracion: 120
---

# Guía 9 · Ajustes y ¡día del reto!

## Objetivo del día

Encontrar los límites seguros de la garra real, probar qué objetos agarra, corregir la rutina automática y competir en el reto de los 5 objetos.

**Al terminar tendremos:** la garra terminada, nuestro tiempo oficial del reto y la tabla de resultados del grupo.

## Materiales del equipo

- Garra armada con su circuito, la fuente de 5 V y el programa `equipo_NOMBRE_rutina` (sábado 8)
- 5 objetos ligeros (pelota de esponja, dado, tapa de botella, borrador y vaso de papel) y un vaso
- Ligas o cinta de goma, cinta para marcar lugares, cronómetro (celular)
- Computadora con Arduino IDE

## Parte 1 · Los límites seguros (20 min)

Cada garra es distinta: hay que descubrir hasta dónde puede girar cada articulación sin chocar.

1. Conecten el circuito (revisen el GND común), el USB y la fuente. Abran el **Monitor Serie** (lupa) a **9600 baudios**: cuatro columnas, en orden **base, hombro, codo y pinza**.
2. Muevan **una perilla a la vez, muy despacio**. Cuando una pieza esté a punto de chocar o el servo zumbe, anoten el número de su columna. En la pinza: mínimo = **cerrada** (sin apretar fuerte), máximo = **abierta**.

[IMAGEN 6.2: Monitor Serie mostrando las cuatro columnas de ángulos]

:::tabla id="g9p-limites"
| Articulación | Mínimo seguro | Máximo seguro |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
| Pinza (cerrada / abierta) | | |
:::

3. **Escriban sus límites en el código**, en las cuatro líneas de `leer()` que dicen `<- tus límites`. Ejemplo: si la base va de 10 a 170, `pB = leer(A0, 0, 180);` queda `pB = leer(A0, 10, 170);`. Súbanlo y comprueben que ninguna articulación choca.

## Parte 2 · Pruebas de agarre (15 min)

Intenten mover cada objeto de la mesa al vaso con las perillas. Marquen ✓ si lo lograron o ✗ si falló.

:::tabla id="g9p-agarre"
| Objeto | Intento 1 | Intento 2 | ¿Qué falló? |
| --- | --- | --- | --- |
| Pelota de esponja | | | |
| Dado | | | |
| Tapa de botella | | | |
| Borrador | | | |
| Vaso de papel | | | |
:::

**Ajustes:** si los objetos resbalan, pongan ligas o cinta de goma en las mandíbulas; si la garra se vuelca, agreguen peso en el plato de apoyo; si el hombro no levanta, acorten el movimiento o usen un servo MG90S.

## Parte 3 · La rutina con la garra real (25 min)

Las posiciones de la Guía 6 eran un plan hecho en el simulador. Ahora se corrigen con objetos de verdad.

1. Marquen con cinta dónde va el objeto y dónde va el vaso.
2. Con las perillas y el Monitor Serie, lleven la garra a cada posición, **un paso a la vez y en orden**, y copien los cuatro números en esa fila. En cada paso solo cambia una articulación.

:::tabla id="g9p-posiciones"
| Paso | Base | Hombro | Codo | Pinza |
| --- | --- | --- | --- | --- |
| 1. Pinza abierta | | | | |
| 2. Girar hacia el objeto | | | | |
| 3. Bajar el brazo | | | | |
| 4. Acercar el codo | | | | |
| 5. Cerrar la pinza | | | | |
| 6. Levantar | | | | |
| 7. Girar hacia el vaso | | | | |
| 8. Abrir la pinza | | | | |
| 9. Volver al centro | | | | |
:::

3. Cambien los números de `rutina()` por los de esta tabla y súbanlo.
4. **Prueba:** dejen las perillas cerca del centro, pongan el objeto en su lugar y presionen el botón una vez. La garra debe hacer los 9 pasos.
5. **Ajusta:** si falla un paso, busquen su línea en `rutina()`, cambien el número de 5 en 5 grados, súbanlo y prueben otra vez.

:::opciones id="g9p-rutina"
¿La rutina automática deja el objeto en el vaso?
- Sí
- A veces
- Todavía no
:::

## Parte 4 · ¡El reto! (50 min)

> **Reto final:** mover 5 objetos de la mesa al vaso en el menor tiempo posible, usando las perillas. Si un objeto cae fuera del vaso, se vuelve a colocar y el reloj sigue. Después se muestra la rutina automática con el botón.

Primero, en 5 minutos, repartan qué va a contar cada quien (no hace falta memorizar) y elijan al piloto:

:::tabla id="g9p-guion"
| Parte | Ideas | Quién |
| --- | --- | --- |
| 1. Qué construimos (las 4 articulaciones y la pinza de engranes) | | |
| 2. Cómo la simulamos, la diseñamos en Blender y la armamos | | |
| 3. Piloto del reto | | |
:::

Cada equipo tiene unos 6 minutos:

| Momento | Tiempo |
| --- | --- |
| Presentación | 1 min |
| Reto de los 5 objetos (modo manual) | hasta 3 min |
| Rutina automática con el botón | 1 min |
| Preguntas del público | 1 min |

Cuando les toque: lleven la garra y los objetos a la mesa, cuenten su parte, el piloto hace el reto mientras el docente cronometra (empieza cuando toca la primera perilla y para cuando cae el quinto objeto en el vaso) y luego muestran la rutina.

**Resultados:** escriban una fila por equipo, incluido el suyo.

:::tabla id="g9p-resultados"
| Equipo | Tiempo del reto (s) | ¿Funcionó la rutina automática? | Lo que más me gustó |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
:::

:::pregunta id="g9p-p1"
Si volvieran a hacer la garra, ¿qué mejorarían primero: el diseño en Blender, el armado o el código? ¿Por qué?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g9p-logramos"
- [ ] Programamos los límites seguros de la garra real.
- [ ] Corregimos la rutina con la garra real.
- [ ] Hicimos el reto y tenemos nuestro tiempo oficial.
- [ ] Completamos la tabla de resultados del grupo.
:::

## Bitácora (5 min)

:::foto id="g9p-foto"
Foto o video de la garra en el reto.
:::

:::pregunta id="g9p-b1"
¿Qué fue lo que más aprendimos en este proyecto?
:::

:::archivo id="g9-archivo"
**Archivo de trabajo:** suban aquí el código final (.ino) y, si llevan la bitácora en el bloc de notas o en Word, también (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (9 sábados), desde el 31 de octubre:** último sábado. Junta los límites de la Guía 5 práctica anterior, las pruebas de agarre y la rutina de la Guía 6 práctica anterior y el reto de la Guía 7 práctica anterior, con una presentación más corta. Campos propios (g9p-…).
- El programa final de la Guía 6 ya muestra los ángulos en el Monitor Serie en modo manual: sirve para los límites y para las posiciones sin cambiar de programa.
- Al terminar la rutina, los servos vuelven a la posición de las perillas: por eso conviene dejarlas cerca del centro.
- Si un equipo tiene la rutina automática inestable, puede presentar solo el modo manual y explicar el problema: también es aprendizaje.
- Con 6 equipos, el reto dura unos 36 minutos; el tiempo que sobre se usa para repetir el reto de quien quiera mejorar su marca.
- Tiempo total: 20 + 15 + 25 + 50 + 5 + 5 = 120 minutos.
:::

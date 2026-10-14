---
titulo: La secuencia del puente
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · La secuencia del puente

## Objetivo del día

Planificar la secuencia del puente con un diagrama de flujo, mover un servo despacio con código y modelar la hoja del puente en Blender.

**Al terminar tendremos:** el diagrama de flujo, un servo que sube y baja suave, la hoja del puente exportada en STL y el cronograma del equipo.

## Materiales del equipo

- Arduino UNO, 1 servo SG90, protoboard y cables
- Computadora con Arduino IDE y Blender
- Bitácora

## Parte 1 · El diagrama de flujo (20 min)

Un **diagrama de flujo** muestra los pasos de un programa en orden. Usa figuras:

| Figura | Significa |
| --- | --- |
| Óvalo | Inicio |
| Rectángulo | Una acción (encender, mover, esperar) |
| Rombo | Una pregunta con respuesta Sí / No |

Ordena la secuencia del puente:

Completen los espacios con lo que pasa en cada paso (los colores del semáforo y lo que hace el puente).

:::tabla id="g3-secuencia"
| Paso | ¿Qué hace el puente? |
| --- | --- |
| 1 | Medir la distancia |
| 2 | ¿Hay un barco a menos de 10 cm? Si no, volver al paso 1 |
| 3 | Luz ______ y alarma |
| 4 | Luz ______ |
| 5 | ______ el puente |
| 6 | Esperar 4 segundos |
| 7 | ______ el puente |
| 8 | Luz ______ |
:::

:::animacion tipo="diagrama-flujo" programa="puente" ocultar="si"
:::

Dibuja el diagrama completo en la bitácora: óvalo de Inicio, un rombo para la pregunta del paso 2 (con su flecha "No" que regresa al paso 1) y rectángulos para las acciones, unidos con flechas. Del paso 8, una flecha de regreso al paso 1.

## Parte 2 · Mover el servo despacio (30 min)

Conecta un servo: **café → GND**, **rojo → 5V**, **naranja → D9**.

- Con el Arduino **desconectado**. Mete tres cables macho–macho en el conector del servo y llévalos a los pines GND, 5V y 9 del Arduino.
- Encaja un brazo (horn) en el eje del servo para ver mejor el giro.

Si escribimos `servo.write(75)` el servo salta de golpe y el puente se golpearía. Para que suba **despacio**, lo movemos de un grado en un grado con un `for`:

1. Conecta el USB, elige **Arduino Uno** y su puerto en **Seleccionar placa**, crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y escribe:

```cpp
#include <Servo.h>
Servo izq;

void setup() {
  izq.attach(9);
  izq.write(0);       // puente abajo
}

void loop() {
  for (int a = 0; a <= 75; a++) {   // subir de 0 a 75 grados
    izq.write(a);
    delay(25);                      // 25 ms por grado
  }
  delay(4000);
  for (int a = 75; a >= 0; a--) {   // bajar
    izq.write(a);
    delay(25);
  }
  delay(2000);
}
```

2. Verifica (✓) y sube (→). El servo debe subir despacio, esperar 4 segundos, bajar y repetir.

El `for` repite lo que está entre sus llaves: empieza con `a = 0`, suma 1 cada vez (`a++`) y se detiene al pasar 75.

Muevan el servo de la animación para ver el ángulo de una hoja:

:::animacion tipo="servo" variable="izq" max="75" inicial="0"
:::

3. **Prueba tres velocidades.** Cambia el `25` de los dos `delay(25);` (el del `for` que sube y el del que baja) por el número de la fila, sube el código y cronometra con el celular cuánto tarda en subir de 0 a 75.

:::tabla id="g3-velocidad"
| delay en el for | ¿Cuánto tarda en subir? (s) | ¿Cómo se ve? |
| --- | --- | --- |
| 5 | | |
| 25 | | |
| 50 | | |
:::

:::pregunta id="g3-p1"
Con `delay(25)` y 75 grados, ¿cuántos milisegundos tarda en subir? ¿Cuántos segundos son?
:::

Al terminar, regresen los dos números a 25 y guarden el programa: **Archivo → Guardar como** → `equipo_NOMBRE_servo_lento`.

## Parte 3 · Modelar la hoja del puente (35 min)

Abre `equipo_NOMBRE_puente.blend`.

- Si están en otra computadora, descárguenlo del recuadro de la Guía 2 (o de "Archivos del equipo"); si es `.zip`, clic derecho → **Extraer todo**.
- Mueve el soporte a un lado para que no estorbe: selecciónalo y en el Panel N escribe Posición X = **150**.

Las medidas van en el **Panel N → Elemento**. Pon nombre a cada objeto en el Listado (doble clic sobre su nombre).

1. **Tablero:** cubo de X = 150, Y = 60, Z = 4 (una hoja mide 15 cm).
   - Déjalo en Posición 0, 0, 0. Llámalo `hoja`.
2. **Barandas:** dos cubos de X = 150, Y = 3, Z = 10 en los bordes (Y = 28,5 y Y = −28,5).
   - En el Panel N escribe 28.5 (con punto). Posición Z = **7**, para que queden paradas encima del tablero.
   - Haz una, y la otra con **Shift + D**, clic derecho, cambiando Y a −28.5.
3. **Encastre del servo:** en un extremo, un cubo de X = 12, Y = 10, Z = 10 debajo del tablero. Hazle un agujero de 5 mm (cilindro + modificador Booleana) donde entrará el brazo del servo.
   - Posición X = **−69**, Y = 0, Z = **−7** (en una punta, colgando debajo del tablero). Llámalo `encastre`.
   - Agujero: cilindro de X = 5, Y = 5, Z = 20, acostado con Rotación X = **90**, en la misma Posición del encastre. Así atraviesa el encastre de lado a lado.
   - Réstalo al `encastre`: llave inglesa → **Agregar modificador → Generar → Booleana** → **Diferencia** → Objeto: el cilindro → **Aplicar** → borra el cilindro.
4. Une todo con **Ctrl + J**.
   - Clic en una baranda, **Shift + clic** en la otra, **Shift + clic** en el `encastre` y por último **Shift + clic** en la `hoja`. Luego **Ctrl + J**. La pieza se llama `hoja`.

[IMAGEN 3.1: hoja del puente en Blender con tablero, barandas y encastre para el servo]

5. Exporta `equipo_NOMBRE_hoja.stl`. Se imprimen **dos**.
   - Clic solo en la `hoja` → **Archivo → Exportar → STL (.stl)** → **Sólo lo seleccionado** → nombre → **Exportar STL**. Guarda el `.blend` con **Ctrl + S**.

:::pregunta id="g3-p2"
¿Para qué sirven las barandas además de verse bien?
:::

## Parte 4 · Cronograma (15 min)

Escriban un responsable principal para cada meta: quien se asegura de que salga (el equipo ayuda).

:::tabla id="g3-cronograma"
| Sábado | Meta | Responsable principal |
| --- | --- | --- |
| 4 | Base y torres | |
| 5 | Servos, hojas y semáforo con botón | |
| 6 | Sensor automático y ajustes | |
| 7 | Prueba de carga y documentación | |
| 8 | Barco 3D y presentación | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3-logramos"
- [ ] Ordenamos la secuencia y dibujamos el diagrama.
- [ ] El servo sube y baja despacio.
- [ ] Probamos tres velocidades.
- [ ] La hoja está exportada en STL.
- [ ] Tenemos cronograma.
:::

## Reto extra

Haz que el servo suba despacio pero baje **más despacio todavía** (como los puentes reales, que bajan con cuidado).

Pista: los dos `for` tienen su propio `delay`. ¿Cuál cambiarías?

## Bitácora (15 min)

:::pregunta id="g3-b1"
¿Qué hace el `for` en nuestro código?
:::

:::pregunta id="g3-b2"
¿Para qué sirve hacer el diagrama de flujo antes de programar?
:::

Antes de irse, suban el `.blend`, el `.stl` de la hoja y el programa `equipo_NOMBRE_servo_lento` juntos en un `.zip` (clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g3-p1: 75 × 25 = 1875 ms ≈ 1,9 s.
- Paso 3: amarillo; 4: rojo; 5: subir; 7: bajar; 8: verde.
- Imprimir las dos hojas esta semana (≈1,5 h cada una). Si no hay tiempo, se pueden hacer de cartón grueso o balsa.
- Tiempo total: 20 + 30 + 35 + 15 + 5 + 15 = 120 minutos.
:::

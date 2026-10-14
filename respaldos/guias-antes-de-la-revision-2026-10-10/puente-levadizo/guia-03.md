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

Dibuja el diagrama completo en la bitácora.

## Parte 2 · Mover el servo despacio (30 min)

Conecta un servo: **café → GND**, **rojo → 5V**, **naranja → D9**.

Si escribimos `servo.write(75)` el servo salta de golpe y el puente se golpearía. Para que suba **despacio**, lo movemos de un grado en un grado con un `for`:

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

:::animacion tipo="servo" variable="izq" max="75" inicial="0"
:::

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

## Parte 3 · Modelar la hoja del puente (35 min)

Abre `equipo_NOMBRE_puente.blend`.

1. **Tablero:** cubo de X = 150, Y = 60, Z = 4 (una hoja mide 15 cm).
2. **Barandas:** dos cubos de X = 150, Y = 3, Z = 10 en los bordes (Y = 28,5 y Y = −28,5).
3. **Encastre del servo:** en un extremo, un cubo de X = 12, Y = 10, Z = 10 debajo del tablero. Hazle un agujero de 5 mm (cilindro + Booleano) donde entrará el brazo del servo.
4. Une todo con **Ctrl + J**.

[IMAGEN 3.1: hoja del puente en Blender con tablero, barandas y encastre para el servo]

5. Exporta `equipo_NOMBRE_hoja.stl`. Se imprimen **dos**.

:::pregunta id="g3-p2"
¿Para qué sirven las barandas además de verse bien?
:::

## Parte 4 · Cronograma (15 min)

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

## Bitácora (15 min)

:::pregunta id="g3-b1"
¿Qué hace el `for` en nuestro código?
:::

:::pregunta id="g3-b2"
¿Para qué sirve hacer el diagrama de flujo antes de programar?
:::

:::archivo id="g3-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g3-p1: 75 × 25 = 1875 ms ≈ 1,9 s.
- Paso 3: amarillo; 4: rojo; 5: subir; 7: bajar; 8: verde.
- Imprimir las dos hojas esta semana (≈1,5 h cada una). Si no hay tiempo, se pueden hacer de cartón grueso o balsa.
- Tiempo total: 20 + 30 + 35 + 15 + 5 + 15 = 120 minutos.
:::

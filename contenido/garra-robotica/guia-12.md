---
titulo: Garras en el mundo real
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Garras en el mundo real

## Objetivo del día

Montar la pinza versión 2, descubrir dónde se usan brazos robóticos en la vida real y programar una función nueva para nuestra garra.

**Al terminar tendremos:** la pinza v2 probada, una ficha de aplicaciones reales y un reto extra funcionando en la garra.

## Materiales del equipo

- Pinza versión 2 impresa
- Garra completa con su circuito
- Para el reto: un buzzer (opción A) o un botón extra (opción B)
- Computadora con internet (o el material que entregue el docente)

## Parte 1 · Repaso rápido (10 min)

¿Qué mejoras hicimos el sábado pasado? Revisen la tabla de antes y después.

La encuentran en la Guía 11 (Parte 4), en la plataforma.

## Parte 2 · Montar y probar la pinza v2 (20 min)

1. Cambien la pinza vieja por la nueva, igual que en la guía 6 (servo en 60° antes de atornillar).
   - Desatornillen la pinza vieja del eslabón del codo y saquen el servo de la pinza de su placa.
   - Pongan el servo de la pinza en 60°: programa nuevo con el código de centrar (Guía 4, Parte 2, paso 1), cambiando `miServo.write(90);` por `miServo.write(60);`. Con las pilas conectadas, súbanlo y esperen a que el servo se quede quieto.
   - Atornillen el servo en la ventana de la placa nueva.
   - Engrane motriz: con el brazo (horn) del servo atornillado debajo, encájenlo en el eje con las mandíbulas medio abiertas y pongan el tornillo central.
   - Engrane seguidor: tornillo M3 y tuerca, en espejo con el otro, apretado solo hasta que no se tambalee (debe girar libre).
   - Atornillen la placa al eslabón del codo.
   - Suban otra vez su programa de la garra (`equipo_NOMBRE_v2` o `equipo_NOMBRE_rutina`) y prueben la perilla de la pinza.
2. Repitan el reto de los 5 objetos.
   - Objetos y vaso en los mismos lugares que en la Guía 8; cronómetro desde que el piloto toca la primera perilla hasta que cae el quinto objeto.

Tiempo con la pinza v2: ______ s

Comparen con su mejor tiempo de la Guía 8 o 9:

:::opciones id="g12-mejoro"
¿Mejoró el tiempo?
- Sí
- Igual
- Empeoró
:::

## Parte 3 · Investigación: brazos robóticos reales (25 min)

Busquen tres usos distintos de los brazos robóticos y completen:

1. En el buscador, prueben palabras como: *brazo robótico fábrica de autos*, *robot cirujano*, *brazo robótico rescate* o *brazo robótico estación espacial*. Si no hay internet, usen el material que entregue el docente.
2. Para cada aplicación, miren un video corto o lean un párrafo y respondan las tres preguntas de la tabla con sus palabras (no copien textos completos).

| Aplicación | ¿Qué hace? | ¿En qué se parece a nuestra garra? | ¿Qué tiene diferente? |
| --- | --- | --- | --- |
| En una fábrica | | | |
| En medicina | | | |
| Otra (rescate, espacio, máquinas de juego…) | | | |

[IMAGEN 12.1: collage de brazos robóticos en una fábrica, en un quirófano y en una máquina de peluches]

:::pregunta id="g12-p1"
Si nuestra garra trabajara en una fábrica, ¿qué tarea le pondrían?
:::

## Parte 4 · Reto programado (50 min)

Elijan una opción. Antes de empezar, abran su programa más reciente de la garra y guárdenlo con otro nombre (**Archivo → Guardar como** → `equipo_NOMBRE_reto`), para no perder el que ya funciona.

### Opción A · Modo máquina de peluches

Al presionar el botón empieza un juego de 30 segundos para atrapar un objeto. Al terminar, suena el buzzer y la pinza suelta lo que tenga.

1. Conecten el buzzer: pata + al pin 8 y pata − a GND.
   - El buzzer tiene un **+** marcado en su parte de arriba, o una pata más larga: esa es la pata +.
   - Pata + → pin **8** del Arduino. Pata − → fila **−** (GND) de la protoboard.
2. Saquen el modo manual del `loop()` a una función propia, así:
   - Una **función** es un grupo de instrucciones con nombre. Al escribir su nombre, el Arduino hace todas esas instrucciones.
   - Escriban esta función **después** de la llave `}` que cierra el `loop()` (por ejemplo, al final del programa). Usen sus propios límites, como en el `loop()`.

```cpp
void modoManual() {
  pB = leer(A0, 0, 180);   // <- tus límites
  pH = leer(A1, 15, 165);
  pC = leer(A2, 15, 165);
  pP = leer(A3, 30, 90);
  base.write(pB);
  hombro.write(pH);
  codo.write(pC);
  pinza.write(pP);
  delay(20);
}
```

   (Si en la Guía 11 hicieron la Opción A de movimiento suave, copien dentro de `modoManual()` sus líneas suaves en lugar de estas.)

3. Agreguen la función del juego (también al final del programa):

```cpp
void juego() {
  tone(8, 1000, 300);                  // inicio
  unsigned long inicio = millis();
  while (millis() - inicio < 30000) {  // 30 segundos
    modoManual();
  }
  tone(8, 400, 1000);                  // fin del juego
  mover(pinza, pP, 90);                // suelta el objeto
}
```

4. En el `loop()`, cuando se presiona el botón, llamen a `juego()` en lugar de `rutina()`; si no, llamen a `modoManual()`.
   - Dentro del `if`, cambien `rutina();` por `juego();`.
   - Dentro del `else`, borren todas las líneas del modo manual (desde `pB = leer(...` hasta `delay(20);`) y escriban en su lugar una sola línea: `modoManual();`.
   - Así el modo manual no queda repetido: vive solo en su función.
5. Suban el código, presionen el botón y jueguen. ¿Lograron atrapar algo en 30 segundos?

### Opción B · Grabar y repetir una posición

Un botón nuevo graba la posición actual; el botón de siempre hace que la garra vuelva a ella sola.

1. Conecten un segundo botón entre el pin D4 y GND.
   - Igual que el primero: sobre la canaleta del centro de la protoboard, usando dos patas en diagonal.
   - Una pata → pin **D4**; la otra → fila **−** (GND).
2. Agreguen arriba del programa:
   - Escríbanlas debajo de la línea `const int BOTON = 2;`.

```cpp
const int GRABAR = 4;
int gB = 90, gH = 90, gC = 90, gP = 60;  // posición grabada
```

3. En el `setup()`: `pinMode(GRABAR, INPUT_PULLUP);`
   - Escríbanlo en una línea nueva, debajo de `pinMode(BOTON, INPUT_PULLUP);`.
4. Dentro del modo manual, agreguen:
   - El modo manual es lo que está dentro de `} else {` en el `loop()` (o dentro de `modoManual()` si hicieron la Opción A). Escriban estas líneas justo antes del `delay(20);`.

```cpp
  if (digitalRead(GRABAR) == LOW) {
    gB = pB;  gH = pH;  gC = pC;  gP = pP;
    delay(300);
  }
```

5. Agreguen esta función y llámenla con el botón de D2 en lugar de `rutina()`:
   - Escriban la función al final del programa.
   - En el `loop()`, dentro del `if`, cambien `rutina();` por `repetir();`.

```cpp
void repetir() {
  mover(base, pB, gB);
  mover(hombro, pH, gH);
  mover(codo, pC, gC);
  mover(pinza, pP, gP);
}
```

6. Prueben: con las perillas lleven la garra a una posición y presionen el botón de **D4** (graba). Muevan las perillas a otro lado, déjenlas quietas y presionen el botón de **D2**: la garra debe volver sola a la posición grabada.

:::opciones id="g12-opcion"
Opción elegida
- A · Máquina de peluches
- B · Grabar y repetir
:::

:::opciones id="g12-funciono"
¿Funcionó?
- Sí
- Con ajustes
- No
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Montamos y probamos la pinza v2.
- [ ] Completamos la ficha de tres aplicaciones reales.
- [ ] Programamos y probamos un reto (A o B).
:::

## Reto extra

¡Hagan las dos opciones! O inventen un juego propio con la garra y escriban sus reglas.

## Bitácora (10 min)

:::pregunta id="g12-b1"
¿Qué aplicación real nos sorprendió más?
:::

:::pregunta id="g12-b2"
¿Cómo funciona nuestro reto programado? Explíquenlo con sus palabras.
:::

:::foto id="g12-video"
Video del reto funcionando.
:::

Antes de irse, guarden `equipo_NOMBRE_reto` (**Ctrl + S**) y súbanlo aquí:

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay internet, entregar imágenes impresas de brazos robóticos en industria, medicina y rescate.
- Revisar que al sacar el modo manual a una función no quede duplicado en el `loop()`.
- Tiempo total: 10 + 20 + 25 + 50 + 5 + 10 = 120 minutos.
:::

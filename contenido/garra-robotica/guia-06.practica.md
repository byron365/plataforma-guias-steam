---
titulo: Simulamos la rutina automática
guia: 6
sabado: 6
sesion: Simulación (3)
duracion: 120
---

# Guía 6 · Simulamos la rutina automática

## Objetivo del día

Agregar el **botón** al circuito simulado, planear las **posiciones** de una rutina y escribir el **programa final** de la garra: modo manual con las perillas y rutina automática con el botón.

**Al terminar tendremos:** la garra simulada haciendo sola los 9 pasos de la rutina al presionar el botón, y el programa final guardado para la garra real.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Diseño `equipo_NOMBRE_garra_sim` (sábado 5)
- Bitácora y lápiz

## Parte 1 · El botón (15 min)

Abran `equipo_NOMBRE_garra_sim` en Tinkercad (**Diseños → Circuitos**).

1. Arrastra un **Pulsador** sobre la canaleta del centro de la protoboard.
2. Usa dos patas **en diagonal**: una → pin **D2**, la otra → fila **−** de **abajo** (GND del Arduino).

[IMAGEN 6.1S: garra simulada en Tinkercad Circuits con el pulsador sobre la canaleta, una pata en D2 y la pata en diagonal en la fila − de abajo]

En el código, el botón usa `INPUT_PULLUP`: sin presionar, el pin lee **HIGH**; al presionarlo, la pata se une a GND y lee **LOW**. Por eso no necesita resistencia.

## Parte 2 · Planear las posiciones (30 min)

Para que la garra trabaje sola necesita saber **a qué ángulo ir en cada paso**. Usen el modo manual de la semana pasada: **Iniciar simulación** y abran el **Monitor en serie** (columnas **base, hombro, codo, pinza**).

1. Imaginen el objeto a un lado de la garra y el vaso al otro.
2. Con las perillas, lleven los servos a cada posición, **un paso a la vez y en orden**. Cuando esté en la posición, dejen las perillas quietas y copien los cuatro números en esa fila.
3. Pasen al siguiente paso **desde donde quedó**. En cada paso solo cambia una articulación.

:::tabla id="g6p-posiciones"
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

En el simulador los servos no tienen brazo: para ver cómo se movería la garra, la animación toma los números de su tabla. Si la garra de la animación no llega al objeto o al vaso, cambien esos números.

:::animacion tipo="rutina" tabla="g6p-posiciones"
:::

En la Guía 9 corregirán estos números con la garra real y objetos de verdad.

## Parte 3 · El programa final (45 min)

1. Toca **Código**, borra todo y escribe el programa final (`equipo_NOMBRE_rutina`) con cuidado:

```cpp
#include <Servo.h>
Servo base, hombro, codo, pinza;
void mover(Servo &s, int &actual, int meta);  // aviso: mover() está más abajo
const int BOTON = 2;
const int VELOCIDAD = 15;  // ms por grado
int pB = 90, pH = 90, pC = 90, pP = 60;  // posición actual

int leer(int pin, int minimo, int maximo) {
  return map(analogRead(pin), 0, 1023, minimo, maximo);
}

// Mueve un servo grado a grado hasta la meta
void mover(Servo &s, int &actual, int meta) {
  while (actual != meta) {
    actual += (meta > actual) ? 1 : -1;
    s.write(actual);
    delay(VELOCIDAD);
  }
}

void rutina() {
  mover(pinza, pP, 90);    // 1. abrir         <- tu tabla
  mover(base, pB, 30);     // 2. ir al objeto
  mover(hombro, pH, 120);  // 3. bajar
  mover(codo, pC, 85);     // 4. acercar
  mover(pinza, pP, 30);    // 5. agarrar
  mover(hombro, pH, 80);   // 6. levantar
  mover(base, pB, 150);    // 7. ir al vaso
  mover(pinza, pP, 90);    // 8. soltar
  mover(base, pB, 90);     // 9. volver
}

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  base.attach(3);
  hombro.attach(5);
  codo.attach(6);
  pinza.attach(9);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(BOTON) == LOW) {
    rutina();
  } else {
    pB = leer(A0, 0, 180);   // <- tus límites
    pH = leer(A1, 15, 165);
    pC = leer(A2, 15, 165);
    pP = leer(A3, 30, 90);
    base.write(pB);
    hombro.write(pH);
    codo.write(pC);
    pinza.write(pP);
    // Ángulos en el Monitor: base, hombro, codo y pinza
    Serial.print(pB);  Serial.print("  ");
    Serial.print(pH);  Serial.print("  ");
    Serial.print(pC);  Serial.print("  ");
    Serial.println(pP);
    delay(50);
  }
}
```

2. **Pon tus números en `rutina()`:** cada línea mueve **una** articulación; su último número es el ángulo de **tu** tabla de posiciones, en la fila del paso y la columna de esa articulación.
3. **Prueba:** **Iniciar simulación**, deja las perillas cerca del centro y haz clic en el pulsador una vez. Los servos deben hacer los 9 pasos, uno por uno. Al terminar, vuelven a la posición de las perillas.

:::tabla id="g6p-prueba"
| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Sin presionar, las perillas mueven los servos (modo manual) | | |
| El Monitor muestra los cuatro ángulos | | |
| Un clic al pulsador: los servos hacen los 9 pasos en orden | | |
| Al terminar, vuelven a seguir a las perillas | | |
:::

4. **Ajusta:** si un paso no queda como en tu tabla, busca su línea en `rutina()`, revisa el número y prueba otra vez.

:::pregunta id="g6p-p1"
¿Qué pasa con el movimiento si cambias `VELOCIDAD` de 15 a 5? ¿Y a 30?
:::

## Parte 4 · Guardar el programa final (10 min)

Este código es el que van a subir a la garra real en la Guía 8.

1. Al terminar las pruebas, dejen `VELOCIDAD = 15`.
2. Cópienlo del panel Código (**Ctrl + A**, **Ctrl + C**) a un bloc de notas y guárdenlo como `equipo_NOMBRE_rutina.txt`.
3. Súbanlo en el recuadro de abajo.

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] El pulsador está en D2 y GND.
- [ ] Anotamos las 9 posiciones de la rutina.
- [ ] El pulsador activa la rutina automática en el simulador.
- [ ] Guardamos `equipo_NOMBRE_rutina.txt`.
:::

## Bitácora (15 min)

:::foto id="g6p-video"
Captura o video de la pantalla con la rutina en el simulador.
:::

:::pregunta id="g6p-b1"
¿Qué diferencia hay entre el modo manual y el automático?
:::

:::archivo id="g6-archivo"
**Archivo de trabajo:** suban aquí `equipo_NOMBRE_rutina.txt`: es el programa final de la garra. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (9 sábados), desde el 31 de octubre:** el botón, las posiciones y la rutina de la Guía 6 práctica anterior, ahora en Tinkercad Circuits. El programa final suma al modo manual el Monitor en serie, para que en las guías 8 y 9 sirva un solo programa para todo. Campos propios (g6p-…).
- `rutina()` va antes del `loop()` para que el simulador no tenga problemas con el orden de las funciones.
- **La línea `void mover(Servo &s, int &actual, int meta);` (debajo de `Servo base…`) es obligatoria.** Sin ella, Tinkercad pone su propio aviso de `mover()` antes de `#include <Servo.h>` y el programa no compila: `variable or field 'mover' declared void` y `'Servo' was not declared in this scope` en la línea 2 (comprobado el 7 de noviembre). Con esa línea compila, el pulsador hace la rutina y vuelve a las perillas. Si un equipo ya escribió el programa sin ella, basta con agregarla.
- El pulsador del simulador se presiona con un clic. Si no responde, revisar que cruce la canaleta y que el cable vaya a la pata en diagonal.
- El símbolo `&` en `mover()` se explica como "la función recuerda dónde quedó el servo".
- Las posiciones del simulador son un plan: en la Guía 9 se corrigen con la garra real. Los límites de `leer()` también se cambian en la Guía 9.
- g6p-p1: con 5 va más rápido (y en la garra real puede soltar el objeto); con 30, más lento y suave.
- g6p-b1: en manual el piloto mueve cada articulación con su perilla; en automático la garra repite sola los pasos guardados en el código.
- Tiempo total: 15 + 30 + 45 + 10 + 5 + 15 = 120 minutos.
:::

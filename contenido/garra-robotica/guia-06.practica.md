---
titulo: La garra trabaja sola
guia: 6
sabado: 6
sesion: Pruebas y programación
duracion: 120
---

# Guía 6 · La garra trabaja sola

## Objetivo del día

Probar qué objetos agarra la garra, enseñarle una rutina automática que se activa con un botón y practicar el reto final.

**Al terminar tendremos:** la garra moviendo un objeto sola al presionar un botón y nuestros primeros tiempos del reto.

## Materiales del equipo

- Garra completa con su circuito (sábado 5) y el programa `equipo_NOMBRE_limites`
- 1 botón pulsador y 2 cables
- 5 objetos ligeros (pelota de esponja, dado, tapa de botella, borrador y vaso de papel) y un vaso
- Ligas o cinta de goma, cronómetro (celular)

## Parte 1 · Pruebas de agarre (20 min)

Conecten el circuito (revisen el GND común), suban `equipo_NOMBRE_limites` y conecten las pilas. Intenten mover cada objeto de la mesa al vaso, dos veces. Marquen ✓ si lo lograron o ✗ si falló.

:::tabla id="g6p-agarre"
| Objeto | Intento 1 | Intento 2 | ¿Qué falló? |
| --- | --- | --- | --- |
| Pelota de esponja | | | |
| Dado | | | |
| Tapa de botella | | | |
| Borrador | | | |
| Vaso de papel | | | |
:::

**Ajustes:** si los objetos resbalan, pongan ligas o cinta de goma en las mandíbulas; si la garra se vuelca, agreguen peso en el plato de apoyo; si el hombro no levanta, acorten el movimiento o usen un servo MG90S.

## Parte 2 · Grabar las posiciones (25 min)

Para que la garra trabaje sola necesita saber **a qué ángulo ir en cada paso**. Con `equipo_NOMBRE_limites` abierto, abran el **Monitor Serie** (9600 baudios): columnas **base, hombro, codo, pinza**.

1. Coloquen el objeto a un lado de la garra y el vaso al otro.
2. Con las perillas, lleven la garra a cada posición, **un paso a la vez y en orden**. Cuando esté en la posición, dejen las perillas quietas y copien los cuatro números en esa fila.
3. Pasen al siguiente paso **desde donde quedó la garra**. En cada paso solo cambia una articulación.

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

## Parte 3 · Botón y rutina automática (40 min)

1. **Conecta el botón** (con el USB y las pilas desconectados): clávalo sobre la canaleta del centro de la protoboard y usa dos patas **en diagonal**: una → pin **D2**, la otra → fila **−** (GND) de abajo.

[IMAGEN 7.1: diagrama del botón conectado entre el pin D2 y GND]

2. **Programa nuevo** (`equipo_NOMBRE_rutina`). Escribe todo el código con cuidado:

```cpp
#include <Servo.h>
Servo base, hombro, codo, pinza;
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

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  base.attach(3);
  hombro.attach(5);
  codo.attach(6);
  pinza.attach(9);
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
    delay(20);
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
```

3. **Pon tus números:**
   - En las cuatro líneas de `leer()` (las que dicen `<- tus límites`), el mínimo y el máximo seguros de la Guía 5.
   - En `rutina()`, cada línea mueve **una** articulación; su último número es el ángulo de **tu** tabla de posiciones, en la fila del paso y la columna de esa articulación.

Para ver tu rutina antes de probarla, la animación toma los números de tu tabla de posiciones:

:::animacion tipo="rutina" tabla="g6p-posiciones"
:::

4. **Prueba:** sube el código, conecta las pilas, deja las perillas cerca del centro y presiona el botón una vez. La garra debe hacer los 9 pasos.
5. **Ajusta:** si falla un paso, busca su línea en `rutina()`, cambia el número de 5 en 5 grados, súbelo y prueba otra vez.

:::pregunta id="g6p-p1"
¿Qué pasa con el movimiento si cambias `VELOCIDAD` de 15 a 5? ¿Y a 30?
:::

## Parte 4 · Practicar el reto (20 min)

> **Reto final:** mover 5 objetos de la mesa al vaso en el menor tiempo posible, usando las perillas. Si un objeto cae fuera del vaso, se vuelve a colocar y el reloj sigue. Después se muestra la rutina automática con el botón.

Marquen con cinta dónde van los objetos y el vaso. El reloj empieza cuando el piloto toca la primera perilla y para cuando cae el quinto objeto en el vaso.

:::tabla id="g6p-tiempos"
| Integrante | Intento 1 (s) | Intento 2 (s) | Mejor tiempo |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
:::

:::pregunta id="g6p-piloto"
¿Quién será nuestro piloto en el reto final y por qué?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g6p-logramos"
- [ ] Probamos los 5 objetos.
- [ ] Anotamos las 9 posiciones de la rutina.
- [ ] El botón activa la rutina automática.
- [ ] Practicamos el reto y elegimos piloto.
:::

## Bitácora (10 min)

:::foto id="g6p-video"
Video de la rutina automática.
:::

:::pregunta id="g6p-b1"
¿Qué diferencia hay entre el modo manual y el automático?
:::

Antes de irse, guarden `equipo_NOMBRE_rutina` y súbanlo aquí: es el programa del reto final.

:::archivo id="g6-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (7 sábados), nueva el 24 de octubre:** las pruebas de agarre de la Guía 6 normal, la rutina de la Guía 7 normal (sin la ficha técnica) y la práctica del reto de la Guía 8 normal. Campos propios (g6p-…).
- Al terminar la rutina, los servos vuelven a la posición de las perillas: por eso conviene dejarlas cerca del centro.
- El símbolo `&` en `mover()` se explica como "la función recuerda dónde quedó el servo".
- g6p-p1: con 5 va más rápido (y puede soltar el objeto); con 30, más lento y suave.
- Tiempo total: 20 + 25 + 40 + 20 + 5 + 10 = 120 minutos.
:::

---
titulo: La garra trabaja sola
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · La garra trabaja sola

## Objetivo del día

Enseñarle a la garra una rutina automática que se activa con un botón, y documentar técnicamente nuestro proyecto: conexiones, ángulos y código.

**Al terminar tendremos:** la garra moviendo un objeto sola al presionar un botón y la ficha técnica del equipo completa.

## Materiales del equipo

- Garra completa con su circuito
- 1 botón pulsador y 2 cables
- Tabla de límites del sábado 6
- Un objeto fácil de agarrar (pelota de esponja) y un vaso

## Parte 1 · Repaso rápido (10 min)

Para que la garra trabaje sola necesita saber **a qué ángulo ir en cada paso**. Hoy los descubriremos moviendo las perillas y leyendo el Monitor Serie.

Busquen su tabla de límites de la Guía 6 (pueden abrir esa guía en la plataforma): la van a necesitar en la Parte 3.

## Parte 2 · Grabar las posiciones (25 min)

1. Sube el código del sábado 6 (el que muestra los ángulos en el Monitor Serie).
   - Es `equipo_NOMBRE_limites`. Si están en otra computadora, descárguenlo del recuadro "Archivo de trabajo" de la Guía 6.
   - Ábrelo, conecta el USB y las pilas, súbelo (→) y abre el **Monitor Serie** (lupa) con **9600 baudios**.
   - Recuerda el orden de las columnas: **base, hombro, codo, pinza**.
2. Coloca el objeto a un lado de la garra y el vaso al otro.
3. Con las perillas, lleva la garra a cada posición y anota los cuatro números:
   - Haz un paso a la vez, en orden, empezando por "1. Pinza abierta".
   - Cuando la garra esté en la posición del paso, deja de mover las perillas y copia los cuatro números del Monitor Serie en esa fila.
   - Luego pasa al siguiente paso **desde donde quedó la garra** (no la regreses al inicio).

:::tabla id="g7-posiciones"
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

**Consejo:** en cada paso solo cambia una articulación. Así la rutina es más fácil de programar.

## Parte 3 · Botón y rutina automática (35 min)

1. **Conecta el botón:** una pata al pin D2 y la otra a GND.
   - Desconecta el USB y las pilas.
   - Clava el botón sobre la canaleta del centro de la protoboard (dos patas de cada lado).
   - Usa dos patas **en diagonal** (una de un lado de la canaleta y otra del otro lado, en esquinas opuestas): así seguro quedan en lados distintos del interruptor.
   - Una de esas patas → pin **D2** del Arduino. La otra → fila **−** (GND) de abajo de la protoboard.

[IMAGEN 7.1: diagrama del botón conectado entre el pin D2 y GND]

2. **Escribe el programa completo.** En las líneas marcadas, cambia los números por los de **tu** tabla:
   - Crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y guárdalo como `equipo_NOMBRE_rutina`.
   - Escribe todo el código de abajo con cuidado.

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

   **Cómo poner tus números:**
   - En las cuatro líneas de `leer()` (las que dicen `<- tus límites`), pon el mínimo y el máximo seguros de tu tabla de la Guía 6, como hicieron la semana pasada.
   - En `rutina()`, cada línea mueve **una** articulación y su último número es el ángulo al que va. Cámbialo por el número de **tu** tabla de posiciones, en la fila del paso y la columna de esa articulación. Por ejemplo, la línea `// 2. ir al objeto` mueve la `base`: su número sale de la fila "2. Girar hacia el objeto", columna **Base**.

   Para ver tu rutina antes de probarla en la garra, usa la animación: toma los números que escribiste en la tabla de posiciones.

:::animacion tipo="rutina" tabla="g7-posiciones"
:::

3. **Prueba:**
   - Sube el código (→) con el USB y conecta las pilas.
   - Deja las perillas cerca del centro y presiona el botón una vez (no lo dejes presionado).
   - Observa cada paso: la garra debe hacer los 9 pasos, uno tras otro.
4. **Ajusta:** si la pinza no alcanza el objeto o lo suelta fuera del vaso, corrige ese número y vuelve a probar.
   - Descubre en qué paso falló y busca su línea en `rutina()`.
   - Cambia el número poco a poco (de 5 en 5 grados), sube el código otra vez y prueba.

:::pregunta id="g7-p1"
¿Qué pasa con el movimiento si cambias `VELOCIDAD` de 15 a 5? ¿Y a 30?
:::

Para responder: cambia el `15` de la línea `const int VELOCIDAD = 15;`, sube, presiona el botón y observa. Después regrésalo a 15.

## Parte 4 · Ficha técnica del equipo (35 min)

La documentación permite que cualquier persona entienda y repita nuestro proyecto. Completen:

1. **Tabla de conexiones:** escriban a qué pin del Arduino va cada componente y de dónde saca su energía (**pilas** o **5V del Arduino**). Pueden revisarlo en su circuito y en la Guía 5.

| Componente | Pin del Arduino | Alimentación |
| --- | --- | --- |
| Servo base | | |
| Servo hombro | | |
| Servo codo | | |
| Servo pinza | | |
| Perillas (4) | | |
| Botón | | |

2. **Esquema del circuito** dibujado a mano, con colores de cables.
   - Dibujen el Arduino como un rectángulo con sus pines, la protoboard con sus filas + y −, el portapilas, los servos y las perillas.
   - Usen el mismo color de cada cable real (rojo para +, negro o café para GND…).

:::foto id="g7-esquema"
Foto del esquema dibujado a mano.
:::

3. **Tabla de límites** (sábado 6) y **tabla de posiciones** (hoy). Cópienlas en la bitácora.
4. **Código comentado:** expliquen con sus palabras qué hacen estas funciones.

:::pregunta id="g7-leer"
¿Qué hace `leer()`?
:::

:::pregunta id="g7-mover"
¿Qué hace `mover()`?
:::

:::pregunta id="g7-rutina"
¿Qué hace `rutina()`?
:::

5. **Fotos:** garra completa de frente y de lado, y detalle de la pinza.

:::foto id="g7-fotos"
Fotos de la garra: frente, lado y detalle de la pinza.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Anotamos las 9 posiciones de la rutina.
- [ ] El botón activa la rutina automática.
- [ ] La garra mueve el objeto al vaso sola.
- [ ] La ficha técnica tiene conexiones, esquema, tablas, código y fotos.
:::

## Reto extra

Hagan que la rutina mueva **dos** objetos seguidos: agreguen los pasos para el segundo objeto al final de `rutina()`.

Pista: pongan el segundo objeto en otro lugar, anoten sus posiciones con el Monitor Serie (como en la Parte 2) y escriban nuevas líneas `mover(...)` antes de la llave `}` que cierra `rutina()`.

## Bitácora (10 min)

:::foto id="g7-video"
Video de la rutina automática.
:::

:::pregunta id="g7-b1"
¿Qué diferencia hay entre el modo manual y el automático?
:::

:::pregunta id="g7-b2"
¿Qué paso de la rutina fue el más difícil de ajustar?
:::

Antes de irse, guarden `equipo_NOMBRE_rutina` (**Ctrl + S**) y súbanlo aquí. Es el programa que usarán en la presentación.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Al terminar la rutina, los servos vuelven a la posición de las perillas: por eso conviene dejarlas cerca del centro.
- El símbolo `&` en `mover()` permite que la función actualice la posición guardada; basta con explicarlo como "la función recuerda dónde quedó el servo".
- La animación de la rutina usa los valores que el equipo escribió en la tabla de posiciones (id g7-posiciones).
- Tiempo total: 10 + 25 + 35 + 35 + 5 + 10 = 120 minutos.
:::

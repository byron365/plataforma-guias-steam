---
titulo: Cuatro perillas y la pinza
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Cuatro perillas y la pinza

## Objetivo del día

Conectar el circuito completo (cuatro perillas, cuatro servos y pilas aparte), programar el modo manual, montar la pinza y encontrar los límites seguros de cada articulación.

**Al terminar tendremos:** la garra completa moviéndose con perillas, sin chocar.

## Materiales del equipo

- Brazo armado hasta el codo (sábado 4) y piezas de la pinza impresas
- Servo de la pinza, tornillo M3 con tuerca, lija fina
- 4 potenciómetros de 10 kΩ, portapilas de 4 pilas AA con pilas
- Arduino UNO, protoboard grande, cables, destornillador
- Computadora con Arduino IDE

## Parte 1 · El circuito por etapas (30 min)

Cuatro servos piden más corriente de la que da el Arduino: si los conectamos al Arduino, se reinicia y la garra tiembla. Por eso los servos usan **pilas aparte**, con una regla de oro:

> **Todas las tierras (GND) deben estar unidas.** Sin GND común, los servos no entienden la señal del Arduino.

:::animacion tipo="gnd-comun"
:::

Arma el circuito con el **USB desconectado** y las **pilas fuera del portapilas**. En la protoboard, todos los agujeros de una misma fila larga (+ o −) están conectados.

**Etapa A · Energía**

1. Cable rojo del portapilas → fila **+** de **arriba**; cable negro → fila **−** de arriba.
2. Pin **5V** del Arduino → fila **+** de **abajo**; un pin **GND** → fila **−** de abajo.
3. Un cable de la fila **−** de arriba a la fila **−** de abajo (**GND común**). **Nunca unas las dos filas +.**

**Etapa B · Servos:** rojo → fila **+** de **arriba** (pilas), café → fila **−** de arriba, naranja → su pin:

| Servo | Pin de señal |
| --- | --- |
| Base | D3 |
| Hombro | D5 |
| Codo | D6 |
| Pinza (suelto por ahora) | D9 |

**Etapa C · Perillas:** clávalas separadas en el centro de la protoboard. Mirándolas de frente: pata izquierda → fila **+** de **abajo** (5V del Arduino), pata derecha → fila **−** de abajo, pata del centro → su pin:

| Perilla | Pin |
| --- | --- |
| Base | A0 |
| Hombro | A1 |
| Codo | A2 |
| Pinza | A3 |

Pongan las perillas en el mismo orden que la garra y márquenlas con cinta.

[IMAGEN 5.2: diagrama del circuito completo con los dos rieles, las 4 perillas, los 4 servos y la unión de GND]

:::animacion tipo="conexiones" circuito="garra-completa"
:::

:::checklist id="g5p-revision"
- [ ] GND común unido
- [ ] Ningún servo en el 5V del Arduino
- [ ] Cada cable naranja en su pin
:::

## Parte 2 · El modo manual (20 min)

Crea un programa nuevo, escribe este código y guárdalo como `equipo_NOMBRE_manual`:

```cpp
#include <Servo.h>
Servo base, hombro, codo, pinza;

// Convierte una perilla en grados
int leer(int pin, int minimo, int maximo) {
  return map(analogRead(pin), 0, 1023, minimo, maximo);
}

void setup() {
  base.attach(3);
  hombro.attach(5);
  codo.attach(6);
  pinza.attach(9);
}

void loop() {
  base.write(leer(A0, 0, 180));
  hombro.write(leer(A1, 15, 165));
  codo.write(leer(A2, 15, 165));
  pinza.write(leer(A3, 30, 90));
  delay(20);
}
```

1. Súbelo con las pilas desconectadas; después conecta las pilas.
2. **Prueba una perilla a la vez, despacio.** Si una pieza va a chocar, suelta la perilla. Si algo hace ruido raro o se calienta, desconecta las pilas.

:::tabla id="g5p-respuesta"
| Articulación | ¿Se mueve? | ¿Gira al lado correcto? |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
:::

> Si una articulación gira al revés de la perilla, intercambia los dos últimos números de su `leer()`. Ejemplo: `leer(A1, 165, 15)`.

## Parte 3 · Montar la pinza (30 min)

1. **Lija un poco los dientes de los engranes** si no giran suave al juntarlos con la mano.
2. **Servo de la pinza:** colócalo en la ventana de la placa de la pinza y atornilla las pestañas.
3. **Pon el servo en 60°** (pinza a medio abrir): programa nuevo con el código de centrar de la **Guía 4** cambiando `miServo.write(90);` por `miServo.write(60);`. El servo de la pinza ya está en el pin 9 del circuito: conecta las pilas y súbelo.
4. **Engrane motriz:** atornilla un brazo del servo debajo de su agujero central y encájalo en el eje con las mandíbulas **medio abiertas**. Pon el tornillo central.
5. **Engrane seguidor:** pasa el tornillo M3 por su agujero y por el de la placa, con la tuerca por debajo. Antes de apretar, gíralo para que su mandíbula quede en espejo con la otra. Debe girar libre con el dedo.
6. **Une la placa de la pinza** al extremo del eslabón del codo, con los tornillos que indique el docente.

[IMAGEN 6.1: pinza montada en el eslabón del codo, señalando engrane motriz, seguidor y tornillo M3]

7. Vuelvan a subir `equipo_NOMBRE_manual` y prueben la perilla de la pinza: debe abrir y cerrar.

## Parte 4 · Los límites seguros (30 min)

Cada garra es distinta: hay que descubrir hasta dónde puede girar cada articulación sin chocar.

1. Guarda `equipo_NOMBRE_manual` como `equipo_NOMBRE_limites`.
2. En el `setup()`, después de `pinza.attach(9);`, agrega `Serial.begin(9600);`.
3. Borra todo el `loop()` (desde `void loop() {` hasta su `}`) y escribe este:

```cpp
void loop() {
  int b = leer(A0, 0, 180);
  int h = leer(A1, 15, 165);
  int c = leer(A2, 15, 165);
  int p = leer(A3, 30, 90);
  base.write(b);
  hombro.write(h);
  codo.write(c);
  pinza.write(p);
  Serial.print(b);  Serial.print("  ");
  Serial.print(h);  Serial.print("  ");
  Serial.print(c);  Serial.print("  ");
  Serial.println(p);
  delay(50);
}
```

4. Súbelo y abre el **Monitor Serie** (lupa) a **9600 baudios**: cuatro columnas, en orden **base, hombro, codo y pinza**.
5. Mueve **una perilla a la vez, muy despacio**. Cuando una pieza esté a punto de chocar o el servo zumbe, anota el número de su columna. En la pinza: mínimo = **cerrada** (sin apretar fuerte), máximo = **abierta**.

[IMAGEN 6.2: Monitor Serie mostrando las cuatro columnas de ángulos]

:::tabla id="g5p-limites"
| Articulación | Mínimo seguro | Máximo seguro |
| --- | --- | --- |
| Base | | |
| Hombro | | |
| Codo | | |
| Pinza (cerrada / abierta) | | |
:::

6. **Escribe tus límites en el código**, en los números de cada `leer()`. Ejemplo: si la base va de 10 a 170, `int b = leer(A0, 0, 180);` queda `int b = leer(A0, 10, 170);`. Guarda, súbelo y comprueba que ninguna articulación choca.

## ¿Lo logramos? (5 min)

:::checklist id="g5p-logramos"
- [ ] El circuito tiene GND común y los servos usan las pilas.
- [ ] Las cuatro perillas mueven su servo.
- [ ] La pinza abre y cierra.
- [ ] Programamos los límites seguros.
:::

## Bitácora (5 min)

Antes de irse: guarden `equipo_NOMBRE_limites`, súbanlo aquí (la próxima semana lo usan) y desconecten las pilas y el USB.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Blender práctica (7 sábados), nueva el 24 de octubre:** el circuito y el modo manual de la Guía 5 normal, y el montaje de la pinza y los límites de la Guía 6 normal. Campos propios (g5p-…).
- Revisar el GND común de cada equipo antes de que conecten las pilas: es el error más frecuente.
- Si el Arduino se reinicia al mover varias perillas, revisar que ningún servo esté en el 5V del Arduino.
- Revisar que el engrane seguidor gire libre; si el tornillo M3 está muy apretado, el servo de la pinza se fuerza.
- Guardar la tabla de límites: se usa el sábado 6 para la rutina automática.
- Tiempo total: 30 + 20 + 30 + 30 + 5 + 5 = 120 minutos.
:::

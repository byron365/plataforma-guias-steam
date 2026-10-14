---
titulo: ¡Nuestra primera articulación!
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · ¡Nuestra primera articulación!

## Objetivo del día

Conocer el proyecto de la garra robótica, organizar nuestro equipo y lograr que un servomotor se mueva con Arduino, primero solo y después con una perilla.

**Al terminar tendremos:** equipo con roles, bitácora iniciada y un servo que obedece a una perilla. ¡La primera articulación de nuestra garra!

## Materiales del equipo

- Arduino UNO y cable USB
- 1 servomotor SG90
- 1 potenciómetro (perilla) de 10 kΩ
- Protoboard y cables macho–macho
- Computadora con Arduino IDE
- Bitácora del equipo (cuaderno o carpeta)

## Parte 1 · ¿Qué vamos a construir? (10 min)

Durante las próximas semanas construiremos un brazo robótico con pinza. Tendrá cuatro articulaciones, cada una movida por un servomotor: **base** (gira a los lados), **hombro** (sube y baja el brazo), **codo** (dobla el antebrazo) y **pinza** (abre y cierra). Primero lo controlaremos con perillas y al final trabajará solo.

[IMAGEN 1.1: render de la garra robótica terminada, con las 4 articulaciones señaladas]

## Parte 2 · Nuestro equipo (15 min)

Cada integrante tendrá un rol. Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos y modelo 3D en Blender | |
| Constructor | Arma las piezas y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Lleva la bitácora, fotos y datos | |

Nombre de nuestro equipo: ______

## Parte 3 · Conociendo al servomotor (15 min)

Un servomotor es un motor que gira al **ángulo exacto** que le pedimos, entre 0° y 180°. Tiene tres cables:

| Color del cable | Va conectado a | Para qué sirve |
| --- | --- | --- |
| Café | GND | Tierra (negativo) |
| Rojo | 5V | Energía |
| Naranja | Pin 9 | Señal: le dice a qué ángulo ir |

[IMAGEN 1.2: foto del servo SG90 con sus partes señaladas: cuerpo, eje, brazo (horn) y cables]

:::animacion tipo="servo"
:::

:::pregunta id="g1-p1"
¿Qué articulación de tu propio brazo se parece más a un servo?
:::

## Parte 4 · ¡Primer movimiento! (25 min)

1. **Conecta el servo al Arduino** como indica la tabla de la Parte 3. Hazlo con el Arduino desconectado de la computadora.

[IMAGEN 1.3: diagrama de conexión del servo al Arduino UNO: café a GND, rojo a 5V, naranja a pin 9]

:::animacion tipo="conexiones" circuito="servo"
:::

2. **Abre Arduino IDE** y elige la placa y el puerto: Herramientas → Placa → Arduino Uno, y Herramientas → Puerto → el que aparece con Arduino.

[IMAGEN 1.4: captura de Arduino IDE mostrando la selección de placa Arduino Uno y del puerto]

3. **Escribe este código** (con cuidado: cada punto y coma cuenta):

```cpp
#include <Servo.h>
Servo miServo;

void setup() {
  miServo.attach(9);  // el servo está en el pin 9
}

void loop() {
  miServo.write(0);    // ir a 0 grados
  delay(1000);         // esperar 1 segundo
  miServo.write(90);   // ir a 90 grados
  delay(1000);
  miServo.write(180);  // ir a 180 grados
  delay(1000);
}
```

4. **Súbelo al Arduino** con el botón de la flecha (→). Espera el mensaje "Subido".

[IMAGEN 1.5: captura de Arduino IDE señalando el botón Subir y el mensaje de subida correcta]

5. **Observa:** el servo debe ir a tres posiciones y repetir. Pega una tira de cinta en el brazo del servo para ver mejor el giro.

:::pregunta id="g1-p2"
¿Qué pasa si cambias `delay(1000)` por `delay(300)`?
:::

## Parte 5 · Control con perilla (25 min)

Ahora el servo obedecerá a una perilla, igual que en la garra terminada.

1. **Agrega el potenciómetro:** pata izquierda a 5V, pata derecha a GND y pata del centro al pin A0.

[IMAGEN 1.6: diagrama de conexión del servo y el potenciómetro al Arduino]

:::animacion tipo="conexiones" circuito="servo-perilla"
:::

2. **Escribe y sube este código:**

```cpp
#include <Servo.h>
Servo miServo;

void setup() {
  miServo.attach(9);
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(A0);                // de 0 a 1023
  int angulo = map(lectura, 0, 1023, 0, 180);  // a grados
  miServo.write(angulo);
  Serial.println(angulo);
  delay(15);
}
```

:::animacion tipo="perilla"
:::

3. **Abre el Monitor Serie** (lupa arriba a la derecha) y gira la perilla. Verás el ángulo cambiar.

[IMAGEN 1.7: captura del Monitor Serie mostrando los ángulos mientras se gira la perilla]

4. **Completa la tabla:**

| Posición de la perilla | Lectura que esperamos | Ángulo que vemos |
| --- | --- | --- |
| Todo a la izquierda | 0 | |
| En el centro | 512 | |
| Todo a la derecha | 1023 | |

## Parte 6 · Mini reto: limitar el giro (10 min)

En la garra, algunas piezas chocarían si el servo gira de 0° a 180°. Cambia la línea del `map` para que el servo solo se mueva entre **30° y 150°**.

Nuestra línea quedó así: `int angulo = map(lectura, 0, 1023, ____, ____);`

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Nuestro equipo tiene nombre y roles.
- [ ] El servo se movió solo a 0°, 90° y 180°.
- [ ] El servo sigue a la perilla.
- [ ] Completamos la tabla de lecturas.
- [ ] Limitamos el giro entre 30° y 150°.
:::

## Reto extra (para quienes terminen antes)

Agrega un segundo servo en el pin 10 y una segunda perilla en A1. ¡Ya tendrían dos articulaciones de la garra!

## Bitácora (15 min)

:::pregunta id="g1-b1"
¿Qué logramos hoy?
:::

:::pregunta id="g1-b2"
¿Qué problema tuvimos y cómo lo resolvimos?
:::

:::pregunta id="g1-b3"
¿Qué haremos el próximo sábado? (pista: Blender)
:::

:::foto id="g1-foto"
Foto del montaje para la bitácora.
:::

Antes de irse: desconecten el Arduino y guarden los componentes en su caja.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Un solo servo puede alimentarse desde el 5V del Arduino. A partir del sábado 5 (cuatro servos) se usará fuente externa.
- Errores comunes: puerto mal seleccionado, cable de señal en otro pin, olvidar el punto y coma.
- Si el servo vibra en los extremos, es normal en el SG90: el límite de 30° a 150° lo evita.
- Tiempo total: 10 + 15 + 15 + 25 + 25 + 10 + 5 + 15 = 120 minutos.
:::

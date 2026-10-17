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

Antes de empezar, revisen que tienen todo sobre la mesa. Si falta algo, pídanlo ahora al docente.

## Parte 1 · ¿Qué vamos a construir? (10 min)

Durante las próximas semanas construiremos un brazo robótico con pinza. Tendrá cuatro articulaciones, cada una movida por un servomotor:

- **Base:** gira todo el brazo hacia los lados.
- **Hombro:** sube y baja el brazo.
- **Codo:** dobla el antebrazo.
- **Pinza:** abre y cierra para agarrar objetos.

Primero lo controlaremos con perillas (una perilla por articulación) y al final trabajará solo.

[IMAGEN 1.1: render de la garra robótica terminada, con las 4 articulaciones señaladas]

## Parte 2 · Nuestro equipo (15 min)

Cada integrante tendrá un rol. Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

1. Lean juntos qué hace cada rol en la tabla.
2. Pónganse de acuerdo en quién empieza con cada rol. Si son menos de cuatro, una persona puede tener dos roles.
3. Escriban el nombre de cada integrante en la columna **Nombre**.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos y modelo 3D en Tinkercad (Codeblocks) | |
| Constructor | Arma las piezas y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Lleva la bitácora, fotos y datos | |

4. Elijan un nombre para el equipo y escríbanlo aquí y en la portada de su bitácora.

Nombre de nuestro equipo: ______

## Parte 3 · Conociendo al servomotor (15 min)

Un servomotor es un motor que gira al **ángulo exacto** que le pedimos, entre 0° y 180°. No da vueltas completas como un ventilador: va a una posición y se queda ahí.

Tomen su servo y busquen sus partes:

- **Cuerpo:** la cajita de plástico (casi siempre azul).
- **Eje:** el piquito blanco con dientes que sale arriba. Es lo que gira.
- **Brazo (horn):** la pieza de plástico blanca que se encaja en el eje. Viene en una bolsita con el servo.
- **Cables:** tres cables de colores que terminan en un conector.

Tiene tres cables y cada uno tiene un trabajo:

| Color del cable | Va conectado a | Para qué sirve |
| --- | --- | --- |
| Café | GND | Tierra (negativo) |
| Rojo | 5V | Energía |
| Naranja | Pin 9 | Señal: le dice a qué ángulo ir |

[IMAGEN 1.2: foto del servo SG90 con sus partes señaladas: cuerpo, eje, brazo (horn) y cables]

Muevan el control de la animación y miren cómo el servo cambia de ángulo:

:::animacion tipo="servo"
:::

:::pregunta id="g1-p1"
¿Qué articulación de tu propio brazo se parece más a un servo?
:::

## Parte 4 · ¡Primer movimiento! (25 min)

1. **Encaja un brazo (horn) en el eje del servo.** Solo empújalo hacia abajo; no hace falta tornillo hoy. Así verás mejor hacia dónde gira.

2. **Conecta el servo al Arduino** con el Arduino **desconectado** de la computadora (nunca se conecta nada con el Arduino encendido):
   - Toma tres cables macho–macho. Si puedes, usa los mismos colores del servo (o negro para GND y rojo para 5V).
   - Mete un cable en cada agujero del conector del servo.
   - Cable que sale del **café** → agujero **GND** del Arduino (en la fila de pines que dice POWER).
   - Cable que sale del **rojo** → agujero **5V** del Arduino (en la misma fila).
   - Cable que sale del **naranja** → agujero **9** del Arduino (en la fila de pines que dice DIGITAL).

[IMAGEN 1.3: diagrama de conexión del servo al Arduino UNO: café a GND, rojo a 5V, naranja a pin 9]

Toquen cada cable en la animación para comprobar a dónde va:

:::animacion tipo="conexiones" circuito="servo"
:::

   **✔ Revisa:** sigue cada cable con el dedo, desde el servo hasta el Arduino. Si un cable quedó en otro agujero, el servo no se moverá.

3. **Conecta el Arduino a la computadora** con el cable USB. Se enciende una lucecita verde (ON) en la placa.

4. **Abre Arduino IDE** (el icono azul con el símbolo ∞ en el escritorio o en el menú Inicio).

5. **Elige la placa y el puerto.** Arriba, junto a los botones, hay una lista que dice **Seleccionar placa**:
   - Haz clic en ella. Si aparece **Arduino Uno** con un nombre como COM3 o COM4, elígelo y listo.
   - Si no aparece, usa el menú: **Herramientas → Placa → Arduino AVR Boards → Arduino Uno**, y después **Herramientas → Puerto →** el COM que diga "Arduino Uno".
   - Si no aparece ningún puerto, desconecta y vuelve a conectar el cable USB, y revisa otra vez.

[IMAGEN 1.4: captura de Arduino IDE mostrando la selección de placa Arduino Uno y del puerto]

6. **Prepara un programa nuevo:** menú **Archivo → Nuevo boceto**. Aparece una ventana con algo de código ya escrito: bórralo todo (Ctrl + A y luego Suprimir).

7. **Escribe este código** con cuidado. Cada punto y coma `;`, cada paréntesis y cada llave `{ }` cuentan. Las mayúsculas también: `Servo` no es lo mismo que `servo`.

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

   Lo que va después de `//` es un comentario: una nota para las personas. El Arduino no lo lee, así que si quieres puedes no escribirlo.

8. **Revisa el código** con el botón de la palomita **✓ (Verificar)**, arriba a la izquierda. Abajo debe aparecer "Compilación terminada" (o "Done compiling"). Si sale un mensaje rojo, lee la línea que indica: casi siempre falta un `;` o una llave.

9. **Súbelo al Arduino** con el botón de la flecha **→ (Subir)**, al lado de la palomita. Espera el mensaje **"Carga completada"** (o "Done uploading") abajo.

[IMAGEN 1.5: captura de Arduino IDE señalando el botón Subir y el mensaje de subida correcta]

   Si aparece un error que menciona el puerto o "avrdude", revisa el paso 5: casi siempre es que no está elegido el puerto correcto.

10. **Observa:** el servo debe ir a tres posiciones (0°, 90° y 180°) y repetir sin parar. Pega una tira de cinta en el brazo del servo para ver mejor el giro.

:::pregunta id="g1-p2"
¿Qué pasa si cambias `delay(1000)` por `delay(300)`?
:::

Para probarlo: cambia el número en las tres líneas de `delay`, vuelve a presionar **→ (Subir)** y observa el servo. Después, regresa los números a 1000.

## Parte 5 · Control con perilla (25 min)

Ahora el servo obedecerá a una perilla, igual que en la garra terminada.

1. **Desconecta el cable USB** antes de cambiar el circuito.

2. **Usa la protoboard para compartir 5V y GND.** El Arduino tiene pocos agujeros de 5V y GND, y ahora los necesitan el servo y la perilla:
   - Saca los cables del rojo y del café del Arduino.
   - Busca en la protoboard las dos filas largas de los bordes, marcadas con **+** (línea roja) y **−** (línea azul o negra). Todos los agujeros de una misma fila larga están conectados entre sí.
   - Pon un cable del **5V** del Arduino a la fila **+**, y otro del **GND** del Arduino a la fila **−**.
   - Conecta el cable del **rojo** del servo a la fila **+**, y el del **café** a la fila **−**. El naranja se queda en el pin 9.

3. **Agrega el potenciómetro:**
   - Clávalo en la parte central de la protoboard, con sus tres patas en tres filas diferentes (cada pata en su propia fila de cinco agujeros).
   - Míralo de frente, con la perilla hacia ti y las patas hacia abajo.
   - **Pata izquierda** → un cable a la fila **+** (5V).
   - **Pata derecha** → un cable a la fila **−** (GND).
   - **Pata del centro** → un cable al pin **A0** del Arduino (en la fila de pines que dice ANALOG IN).

[IMAGEN 1.6: diagrama de conexión del servo y el potenciómetro al Arduino]

:::animacion tipo="conexiones" circuito="servo-perilla"
:::

4. **Conecta el USB** y crea otro programa nuevo (**Archivo → Nuevo boceto**, borra lo que trae).

5. **Escribe y sube este código** (✓ para verificar y → para subir, como en la Parte 4):

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

   ¿Qué hace? El Arduino lee la perilla como un número de 0 a 1023, lo convierte (`map`) a grados de 0 a 180 y se lo manda al servo.

Mueve la perilla de la animación y mira cómo cambian la lectura y el ángulo:

:::animacion tipo="perilla"
:::

6. **Abre el Monitor Serie:** es el botón de la **lupa**, arriba a la derecha de Arduino IDE. Se abre una ventana abajo.
   - Abajo a la derecha de esa ventana hay una lista con un número: elige **9600 baudios** (tiene que ser el mismo número de `Serial.begin(9600)`). Si no coincide, verás símbolos raros.
   - Gira la perilla despacio: verás el ángulo cambiar y el servo moverse.

[IMAGEN 1.7: captura del Monitor Serie mostrando los ángulos mientras se gira la perilla]

7. **¿El servo gira al revés que la perilla?** Si al girar la perilla hacia la izquierda el número sube en vez de bajar, desconecta el USB e intercambia los dos cables de las patas de los lados (el de 5V y el de GND). Vuelve a conectar y prueba. Así "todo a la izquierda" dará 0.

8. **Completa la tabla.** Gira la perilla a cada posición y anota el ángulo que ves en el Monitor Serie:

| Posición de la perilla | Lectura que esperamos | Ángulo que vemos |
| --- | --- | --- |
| Todo a la izquierda | 0 | |
| En el centro | 512 | |
| Todo a la derecha | 1023 | |

## Parte 6 · Mini reto: limitar el giro (10 min)

En la garra, algunas piezas chocarían si el servo gira de 0° a 180°. Cambia la línea del `map` para que el servo solo se mueva entre **30° y 150°**.

1. Busca en el código la línea que empieza con `int angulo = map(`.
2. Los dos últimos números de esa línea dicen entre qué ángulos se mueve el servo. Piensa cuáles tienes que cambiar.
3. Cámbialos, sube el código (→) y gira la perilla de un extremo al otro.
4. **✔ Revisa** en el Monitor Serie: el número más pequeño debe ser 30 y el más grande 150.

Nuestra línea quedó así: `int angulo = map(lectura, 0, 1023, ____, ____);`

## ¿Lo logramos? (5 min)

Marquen cada casilla solo si de verdad lo lograron:

:::checklist id="g1-logramos"
- [ ] Nuestro equipo tiene nombre y roles.
- [ ] El servo se movió solo a 0°, 90° y 180°.
- [ ] El servo sigue a la perilla.
- [ ] Completamos la tabla de lecturas.
- [ ] Limitamos el giro entre 30° y 150°.
:::

## Reto extra (para quienes terminen antes)

Agrega un segundo servo en el pin 10 y una segunda perilla en A1. ¡Ya tendrían dos articulaciones de la garra!

Pistas: conecta el segundo servo y la segunda perilla igual que los primeros, usando las filas + y − de la protoboard. En el código necesitarás un segundo `Servo` (por ejemplo `Servo otroServo;`), su `attach(10)` en el `setup()` y, en el `loop()`, otra lectura de `A1` con su propio `map` y su `write`.

## Bitácora (15 min)

:::pregunta id="g1-b1"
¿Qué logramos hoy?
:::

:::pregunta id="g1-b2"
¿Qué problema tuvimos y cómo lo resolvimos?
:::

:::pregunta id="g1-b3"
¿Qué haremos el próximo sábado? (pista: Tinkercad)
:::

:::foto id="g1-foto"
Foto del montaje para la bitácora.
:::

Antes de irse:

1. Guarden el programa de la perilla: **Archivo → Guardar como**, con el nombre `equipo_NOMBRE_perilla` (cambien NOMBRE por el de su equipo). Arduino IDE crea una carpeta con un archivo `.ino` adentro.
2. Súbanlo en el recuadro de abajo para tenerlo la próxima vez, aunque les toque otra computadora.
3. Desconecten el Arduino y guarden los componentes en su caja.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Un solo servo puede alimentarse desde el 5V del Arduino. A partir del sábado 5 (cuatro servos) se usará fuente externa.
- Errores comunes: puerto mal seleccionado, cable de señal en otro pin, olvidar el punto y coma.
- Si el servo vibra en los extremos, es normal en el SG90: el límite de 30° a 150° lo evita.
- Tiempo total: 10 + 15 + 15 + 25 + 25 + 10 + 5 + 15 = 120 minutos.
:::

---
titulo: El puente en 3D (2): torres y sensor
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El puente en 3D (2): torres y sensor

## Objetivo del día

Terminar el diseño del puente: la **torre del semáforo**, la **torre del buzzer** y el **soporte del sensor ultrasónico**, y dejar listas todas las piezas para imprimir.

**Al terminar tendremos:** las 7 piezas del puente exportadas en STL y sabremos dónde va cada una.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del sábado 2
- 1 LED, 1 buzzer y 1 sensor ultrasónico HC-SR04 (para medirlos)
- Regla en milímetros
- Bitácora

## Parte 1 · Repaso (5 min)

1. Entren a Tinkercad → **Diseños → Codeblocks** y revisen que estén `equipo_NOMBRE_orilla` y `equipo_NOMBRE_hoja`.
2. Recuerden las tres reglas de la Guía 2:
   - Las medidas van en **milímetros**.
   - Cada forma nace con su centro en el plano; con **Mover** la llevamos a su lugar.
   - Los **huecos** se restan al final con **Seleccionar todo** y **Group Selection**.

Las dos torres son **cajas huecas, abiertas por abajo**. Se pegan encima de cada orilla, tapando el servo, y los cables pasan por adentro.

## Parte 2 · La torre del semáforo (40 min)

Diseño nuevo: **+ Crear → Codeblocks** y nómbrenlo `equipo_NOMBRE_torre_semaforo`.

1. **La caja:** un Cubo de 38 × 26 × 45 mm.
   - De **Formas**, un **Cubo** con primer A = **38**, L = **26**, segundo A = **45**, arista = **0**.
   - Debajo, **Mover: X 0, Y 0, Z 22.5** (la mitad de 45, para que quede apoyada).
2. **Vaciarla (hueco):** un Cubo de 34 × 22 × 44 mm.
   - Un **Cubo** con primer A = **34**, L = **22**, segundo A = **44**, marcado como **hueco** (círculo rayado).
   - Debajo, **Mover: X 0, Y 0, Z 21**. Así la caja queda con paredes de 2 mm, un techo arriba y abierta por abajo.
3. **Salida de los cables (hueco):** un Cubo de 12 × 4 × 8 mm en la pared de atrás, abajo.
   - Un **Cubo** con primer A = **12**, L = **4**, segundo A = **8**, marcado como **hueco**.
   - Debajo, **Mover: X 0, Y 12, Z 4**.
4. **Agujero de la luz roja:** un cilindro hueco de 5,2 mm de diámetro, acostado, que atraviesa una pared.
   - De **Formas**, arrastra un **Cilindro**. Toca su **›** y escribe **Radio = 2.6** (la mitad de 5.2), **A = 10**, **Lados = 32**. Márcalo como **hueco**.
   - **Acostarlo:** de **Modificar**, arrastra **Girar alrededor** debajo del cilindro. Cambia el eje a **y** y escribe **90** en los grados.
   - Debajo, **Mover: X 18, Y 0, Z 34**. Queda en la pared angosta, arriba.
5. **Agujero de la luz amarilla:** otro cilindro igual (Radio 2.6, A 10, Lados 32, hueco), con **Girar alrededor** (eje y, 90) y **Mover: X 18, Y 0, Z 26**.
6. **Agujero de la luz verde:** otro igual con **Mover: X 18, Y 0, Z 18**.
   - Entre agujero y agujero hay 8 mm: el semáforo queda pequeño, como un semáforo de verdad a escala.
7. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** gira la vista. En una de las paredes angostas deben verse **tres agujeros redondos**, uno encima del otro.
   - Si los agujeros salen parados (hacia arriba) en vez de atravesar la pared, revisa que **Girar alrededor** diga eje **y** y **90**.

[IMAGEN 3.1T: torre del semáforo en Tinkercad Codeblocks, hueca, con los tres agujeros de los LEDs en una pared]

8. Exporta `equipo_NOMBRE_torre_semaforo.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).

Midan el LED con la regla: la cabecita mide unos 5 mm. El agujero es de 5,2 mm, así que el LED entra por dentro de la torre y se pega con una gota de silicona.

:::pregunta id="g3t-p1"
¿Por qué la torre es hueca y está abierta por abajo?
:::

## Parte 3 · La torre del buzzer (20 min)

Es la misma caja, pero con un agujero arriba para el buzzer en lugar de los tres de los LEDs.

1. Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_torre_buzzer`.
2. Repitan los pasos **1, 2 y 3** de la torre del semáforo: la caja, el hueco de adentro y la salida de los cables, con los mismos números.
3. **Agujero del buzzer:** un **Cilindro** con **Radio = 6.2**, **A = 10**, **Lados = 32**, marcado como **hueco**. Esta vez **no** se gira: va parado.
   - Debajo, **Mover: X 0, Y 0, Z 44**. Atraviesa el techo de la torre.
4. **Agrupar** (Seleccionar todo y Group Selection) y ejecuta.
   - **✔ Revisa:** arriba de la torre debe verse un agujero redondo grande.

[IMAGEN 3.2T: torre del buzzer en Tinkercad Codeblocks con el agujero redondo en el techo]

5. Exporta `equipo_NOMBRE_torre_buzzer.stl`.

## Parte 4 · El soporte del sensor (25 min)

El sensor ultrasónico tiene dos "ojos" redondos. El soporte es una placa parada con dos agujeros por donde asoman los ojos, y un pie para pegarlo a la base.

**Primero, midan el sensor** con la regla y anoten:

:::tabla id="g3t-sensor"
| Medida del sensor | En el sensor real (mm) | En nuestro diseño (mm) |
| --- | --- | --- |
| Ancho de cada ojo (diámetro) | | 16.6 |
| Distancia entre el centro de un ojo y el centro del otro | | 26 |
:::

Si sus medidas son distintas, avisen al docente antes de seguir.

Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_soporte_sensor`.

1. **La placa:** un Cubo de 4 × 48 × 28 mm.
   - Un **Cubo** con primer A = **4**, L = **48**, segundo A = **28**. Debajo, **Mover: X 0, Y 0, Z 14**.
2. **El pie:** un Cubo de 20 × 48 × 3 mm.
   - Un **Cubo** con primer A = **20**, L = **48**, segundo A = **3**. Debajo, **Mover: X 12, Y 0, Z 1.5**.
3. **Primer ojo (hueco):** un cilindro acostado que atraviesa la placa.
   - Un **Cilindro** con **Radio = 8.3**, **A = 10**, **Lados = 32**, marcado como **hueco**.
   - Debajo, **Girar alrededor** con eje **y** y **90**, igual que los agujeros de los LEDs.
   - Debajo, **Mover: X 0, Y 13, Z 15**.
4. **Segundo ojo (hueco):** otro cilindro igual, con **Girar alrededor** (eje y, 90) y **Mover: X 0, Y −13, Z 15**.
5. **Agrupar** y ejecuta.
   - **✔ Revisa:** debe verse una pieza en forma de **L** con dos agujeros grandes en la parte parada.

[IMAGEN 3.3T: soporte del sensor ultrasónico en Tinkercad Codeblocks: placa con dos agujeros y pie]

6. Exporta `equipo_NOMBRE_soporte_sensor.stl`.

## Parte 5 · ¿Dónde va cada pieza? (15 min)

Miren otra vez el puente completo y ubiquen cada pieza:

[IMAGEN 2.1T: puente completo diseñado en Tinkercad: dos orillas con su camino, una hoja bajada y otra levantada, la torre del semáforo, la torre del buzzer y el soporte del sensor]

- **Orillas:** la A a la derecha y la B a la izquierda, con el río en medio (16,4 cm entre una y otra). Las ranuras miran al río.
- **Hojas:** cada una con su orilla (la A con la A). Su oreja entra en la ranura.
- **Torre del semáforo:** encima de la orilla A, tapando el servo. Los agujeros de los LEDs miran hacia afuera, hacia los carros que llegan.
- **Torre del buzzer:** encima de la orilla B, tapando el otro servo.
- **Soporte del sensor:** pegado a la base, delante de la orilla A, con los ojos mirando al otro lado del río. Cuando un barco pase entre el sensor y la otra orilla, el sensor lo detecta.

Revisen que tienen todos los archivos:

:::checklist id="g3t-piezas"
- [ ] equipo_NOMBRE_orilla_A.stl
- [ ] equipo_NOMBRE_orilla_B.stl
- [ ] equipo_NOMBRE_hoja_A.stl
- [ ] equipo_NOMBRE_hoja_B.stl
- [ ] equipo_NOMBRE_torre_semaforo.stl
- [ ] equipo_NOMBRE_torre_buzzer.stl
- [ ] equipo_NOMBRE_soporte_sensor.stl
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3t-logramos"
- [ ] La torre del semáforo tiene sus tres agujeros.
- [ ] La torre del buzzer tiene su agujero arriba.
- [ ] El soporte del sensor tiene sus dos ojos.
- [ ] Tenemos las 7 piezas del puente en STL.
:::

## Reto extra

Ponle una **visera** al semáforo, como la de los semáforos de verdad: una tira delgada encima de cada agujero, que sobresalga 3 mm de la pared.

Pista: en la torre del semáforo, antes de **Seleccionar todo**, agrega un **Cubo** con primer **A = 4**, **L = 14** y segundo **A = 1**, y muévelo con **Mover: X 20, Y 0, Z 38** (justo arriba del agujero rojo). Para las otras dos luces, cubos iguales con **Z = 30** y **Z = 22**.

## Bitácora (10 min)

:::pregunta id="g3t-b1"
¿Qué pieza del puente fue la más difícil de diseñar? ¿Por qué?
:::

:::pregunta id="g3t-b2"
Si tuvieran que agregar otra pieza al puente (por ejemplo, un poste de luz o una caseta), ¿qué formas de Tinkercad usarían?
:::

Antes de irse, junten los 3 `.stl` de hoy en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. Los diseños de bloques quedan guardados en Tinkercad.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Guía reestructurada (versión Tinkercad):** termina el diseño del puente. Se quitaron de esta versión el diagrama de flujo, el servo que sube despacio con `for` y el cronograma (campos g3t-… propios). La Guía 7 compara el diagrama de flujo con el código: conviene hacer el diagrama antes, en la guía de programación (5 o 6).
- Diseños de referencia en la cuenta del docente: "Puente - modelo torre semaforo", "Puente - modelo torre buzzer" y "Puente - modelo soporte sensor".
- Medidas usadas: LED de 5 mm (agujero de 5,2), buzzer de 12 mm (agujero de 12,4) y HC-SR04 con ojos de unos 16 mm, a 26 mm entre centros (agujeros de 16,6). Si el sensor de la academia mide distinto, se cambian el Radio o la Y de los ojos.
- El sensor mira de una orilla a la otra, como una barrera, unos 3 cm antes de las hojas. Con el río de 16,4 cm, un barco en el centro queda a unos 8 cm, así que DISTANCIA_BARCO = 10 de la Guía 6 sirve. El texto de la Guía 6 (que el sensor mire "hacia donde vienen los barcos") se ajusta cuando se adapte esa guía.
- Impresión: las torres se imprimen **boca abajo** (con el techo sobre la cama) para que no necesiten soportes. El soporte del sensor se imprime tal como sale.
- g3t-p1: para que los cables de los LEDs, el buzzer y el servo pasen por adentro y salgan por atrás, y para tapar el servo; además gasta menos material.
- Tiempo total: 5 + 40 + 20 + 25 + 15 + 5 + 10 = 120 minutos.
:::

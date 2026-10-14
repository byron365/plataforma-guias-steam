---
titulo: Cuatro perillas, cuatro servos
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Cuatro perillas, cuatro servos

## Objetivo del día

Montar el brazo (hombro y codo) y conectar el circuito completo: cuatro perillas, cuatro servos y una fuente externa para los motores.

**Al terminar tendremos:** el brazo moviéndose con perillas, articulación por articulación.

## Materiales del equipo

- Base con plato (sábado 4), eslabón del hombro y eslabón del codo impresos
- 4 servos SG90 o MG90S (el hombro, de preferencia MG90S)
- 4 potenciómetros de 10 kΩ
- Portapilas de 4 pilas AA con pilas
- Arduino UNO, protoboard grande y cables
- Tornillos y destornillador

## Parte 1 · Seguridad y repaso (10 min)

Cuatro servos piden más corriente de la que da el Arduino. Si los conectamos todos al Arduino, se reinicia y la garra tiembla. Por eso los servos usarán **pilas aparte**, con una regla de oro:

> **Todas las tierras (GND) deben estar unidas.** Sin GND común, los servos no entienden la señal del Arduino.

¿Por qué? La señal del Arduino es un voltaje que se mide **comparado con su GND**. Si el servo tiene otro GND que no está unido, no tiene con qué comparar y no entiende la señal. Miren la animación:

:::animacion tipo="gnd-comun"
:::

## Parte 2 · Montar el brazo (30 min)

1. **Centra los servos del hombro y del codo**, uno a la vez:
   - Con el Arduino desconectado, conecta un servo directo al Arduino: **café → GND**, **rojo → 5V**, **naranja → pin 9**.
   - Sube el código de centrar (`write(90)`). Lo encuentras en la **Guía 4, Parte 2, paso 1** de esta plataforma: cópialo de ahí a un programa nuevo.
   - Cuando el servo quede quieto, desconecta el USB y cambia al otro servo. Vuelve a conectar el USB: el código ya está en el Arduino y centra el segundo servo.
   - Ponles una etiqueta de cinta a cada servo (H = hombro, C = codo) para no confundirlos.
2. **Servo del hombro:** colócalo en la ventana de la pared del plato, con el eje hacia afuera, y atornilla sus pestañas en los dos agujeros de los lados.
3. **Eslabón del hombro:**
   - Atornilla un brazo (horn) del servo al agujero del extremo del eslabón (el agujero redondo pequeño, no la ventana).
   - Encaja ese brazo en el eje del servo del hombro, con el eslabón **apuntando hacia arriba** (de pie).
   - Pon el tornillo central del eje.
4. **Servo del codo:** colócalo en la ventana del eslabón del hombro (la ventana rectangular de la otra punta) y atornilla sus pestañas.
5. **Eslabón del codo:** igual que el paso 3, en el eje del servo del codo, pero **apuntando al frente** (acostado hacia adelante).

[IMAGEN 5.1: brazo montado con base, hombro y codo, señalando cada servo]

**✔ Revisa:** sin conectar nada, el brazo debe quedar como una L: el eslabón del hombro de pie y el del codo hacia adelante.

## Parte 3 · El circuito por etapas (30 min)

Construye el circuito en este orden y revisa cada etapa antes de seguir. Hazlo con el **USB desconectado** y las **pilas fuera del portapilas** (o con su interruptor apagado).

Recuerda cómo es la protoboard: tiene dos pares de filas largas, uno arriba y otro abajo, marcadas con **+** (línea roja) y **−** (línea azul o negra). Todos los agujeros de una misma fila larga están conectados.

**Etapa A · Energía**

1. Riel superior de la protoboard: **+ de las pilas** (rojo) y **− de las pilas** (negro).
   - Cable rojo del portapilas → fila **+** de arriba.
   - Cable negro del portapilas → fila **−** de arriba.
2. Riel inferior: **5V del Arduino** y **GND del Arduino**.
   - Un cable del pin **5V** del Arduino → fila **+** de abajo.
   - Un cable de un pin **GND** del Arduino → fila **−** de abajo.
3. Une con un cable los dos rieles negativos (GND común): un cable de la fila **−** de arriba a la fila **−** de abajo.

**¡Cuidado!** Nunca unas las dos filas **+**: las pilas y el Arduino tienen voltajes distintos.

**Etapa B · Servos** (rojo y café al riel de las pilas; naranja al Arduino)

Para cada servo usa tres cables macho–macho metidos en su conector:

- **Rojo** del servo → fila **+** de **arriba** (pilas).
- **Café** del servo → fila **−** de **arriba**.
- **Naranja** del servo → el pin del Arduino de esta tabla:

| Servo | Pin de señal |
| --- | --- |
| Base | D3 |
| Hombro | D5 |
| Codo | D6 |
| Pinza (suelto por ahora) | D9 |

"D3" es el pin con el número 3 en la fila DIGITAL del Arduino.

**Etapa C · Perillas** (patas de los lados al riel del Arduino; centro a su pin)

Clava las cuatro perillas en la parte central de la protoboard, separadas, cada pata en su propia fila. Para cada una, mirándola de frente:

- **Pata izquierda** → fila **+** de **abajo** (5V del Arduino).
- **Pata derecha** → fila **−** de **abajo**.
- **Pata del centro** → su pin de esta tabla (en la fila ANALOG IN del Arduino):

| Perilla | Pin |
| --- | --- |
| Base | A0 |
| Hombro | A1 |
| Codo | A2 |
| Pinza | A3 |

**Consejo:** pongan las perillas en el mismo orden que la garra (base, hombro, codo, pinza) y márquenlas con cinta.

[IMAGEN 5.2: diagrama del circuito completo con los dos rieles, las 4 perillas, los 4 servos y la unión de GND]

Toquen cada cable de la animación para comparar con su circuito:

:::animacion tipo="conexiones" circuito="garra-completa"
:::

Antes de conectar nada, revisen y marquen:

:::checklist id="g5-revision"
- [ ] GND común unido
- [ ] Ningún servo en el 5V del Arduino
- [ ] Cada cable naranja en su pin
:::

## Parte 4 · El código del modo manual (30 min)

Crea un programa nuevo en Arduino IDE (**Archivo → Nuevo boceto**), borra lo que trae y escribe este código:

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

Fíjate en la función `leer()`: recibe el pin de la perilla y los ángulos mínimo y máximo de esa articulación. Por eso cada servo tiene sus propios límites (la pinza solo va de 30 a 90).

1. Sube el código con las pilas desconectadas:
   - Conecta el USB, elige la placa **Arduino Uno** y su puerto en **Seleccionar placa**.
   - Presiona **→ (Subir)** y espera "Carga completada".
   - Ahora sí, conecta las pilas (o enciende el portapilas).
2. **Prueba una perilla a la vez,** despacio. Si una pieza va a chocar, suelta la perilla. Si algo hace ruido raro o se calienta, desconecta las pilas.
3. Anota cómo responde cada articulación. En "¿Gira al lado correcto?" piensen: si giro la perilla hacia un lado, ¿la articulación se mueve hacia el lado que esperaba?

| Articulación | ¿Se mueve? | ¿Gira al lado correcto? | Observaciones |
| --- | --- | --- | --- |
| Base | | | |
| Hombro | | | |
| Codo | | | |
| Pinza (suelta) | | | |

:::pregunta id="g5-p1"
La función `leer()` se usa 4 veces. ¿Qué ventaja tiene escribirla una sola vez?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] Hombro y codo están montados.
- [ ] El circuito tiene GND común y los servos usan las pilas.
- [ ] Las cuatro perillas mueven su servo.
- [ ] Llenamos la tabla de respuesta.
:::

## Reto extra

Si una articulación gira al revés de la perilla, arréglalo sin tocar cables: intercambia los dos últimos números de su `leer()`. Ejemplo: `leer(A1, 165, 15)`.

Después de cambiar el número, vuelve a subir el código (→) y prueba esa perilla otra vez.

## Bitácora (15 min)

:::foto id="g5-foto"
Video corto o foto del brazo moviéndose.
:::

:::pregunta id="g5-b1"
¿Por qué los servos usan pilas aparte?
:::

:::pregunta id="g5-b2"
¿Qué articulación necesita ajustes?
:::

Antes de irse:

1. Guarden el programa: **Archivo → Guardar como** → `equipo_NOMBRE_manual`. Súbanlo en el recuadro de abajo: la próxima semana lo van a necesitar.
2. Desconecten las pilas (o apaguen el portapilas) y el USB.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Revisar el GND común de cada equipo antes de que conecten las pilas: es el error más frecuente.
- Si el Arduino se reinicia al mover varias perillas, revisar que ningún servo esté en el 5V del Arduino.
- La pinza se monta el sábado 6: hoy solo se comprueba que su servo responde.
- Tiempo total: 10 + 30 + 30 + 30 + 5 + 15 = 120 minutos.
:::

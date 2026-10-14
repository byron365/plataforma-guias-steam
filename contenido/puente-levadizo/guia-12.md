---
titulo: La misma lógica en otros lugares
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · La misma lógica en otros lugares

## Objetivo del día

Descubrir dónde más se usa la lógica "detectar → avisar → mover → esperar → regresar" y construir una barrera para los carros que baja antes de que suba el puente.

**Al terminar tendremos:** la ficha de aplicaciones y la barrera de carros funcionando junto al puente.

## Materiales del equipo

- Puente completo
- 1 servo SG90 extra
- Palito de paleta (la barrera), cinta roja y blanca

## Parte 1 · ¿Dónde más se usa? (25 min)

Para cada lugar, piensen (o busquen en internet) qué detecta el sistema, cómo avisa a las personas y qué parte se mueve. Por ejemplo, en el puente: detecta un barco, avisa con el semáforo y la alarma, y se mueven las hojas.

:::tabla id="g12-aplicaciones"
| Lugar | ¿Qué detecta? | ¿Cómo avisa? | ¿Qué se mueve? |
| --- | --- | --- | --- |
| Barrera de un parqueo | | | |
| Cruce de tren | | | |
| Puerta automática de un supermercado | | | |
| Esclusas de un canal (como el de Panamá) | | | |
:::

[IMAGEN 12.1: barrera de un cruce de tren bajando con luces rojas encendidas]

:::pregunta id="g12-p1"
¿Qué tienen en común todos estos sistemas con nuestro puente?
:::

## Parte 2 · Construir la barrera (35 min)

Los puentes reales tienen **barreras** que impiden que los carros entren al puente cuando se va a abrir.

1. Pega el palito de paleta al brazo del servo extra (con cinta roja y blanca).
   - Encaja un brazo (horn) en el eje del servo. Forren el palito con franjas de cinta roja y blanca y péguenlo sobre el brazo con silicona o cinta.
2. Coloca el servo a la entrada del puente, del lado de los carros.
   - Péguenlo a un lado del camino (sobre la base o una torre), con el palito apuntando hacia arriba cuando la barrera está abierta. Antes de pegar, prueben la Parte 3 para ver hacia dónde gira.
3. Conecta: **naranja → D11**, **rojo → 5V**, **café → GND**.
   - Con el USB desconectado, con cables largos. Rojo a la fila **+** de la protoboard y café a la fila **−**.
   - Con tres servos, si el Arduino se reinicia cuando se mueven, avisen al docente: hay que darles pilas aparte.

[IMAGEN 12.2: servo con un palito pintado de rojo y blanco como barrera a la entrada del puente]

## Parte 3 · Programar la barrera (40 min)

Abran su programa más reciente del puente y guárdenlo como `equipo_NOMBRE_barrera`. Agreguen cada pieza en su lugar:

Agrega arriba:

- Debajo de las líneas `Servo izq;` y `Servo der;`:

```cpp
Servo barrera;
```

En `setup()`:

- Escríbanlas dentro del `setup()`, después de `der.attach(SERVO_DER);`:

```cpp
barrera.attach(11);
barrera.write(90);   // barrera levantada
```

Y en `secuenciaPuente()`, después de encender el rojo y **antes** de subir el puente:

- Es decir, después de la línea `digitalWrite(ROJO, HIGH);` y antes de `moverPuente(0, ANGULO_ARRIBA);`:

```cpp
barrera.write(0);    // bajar barrera
delay(1000);
```

Y al final, después de bajar el puente:

- Es decir, después de `moverPuente(ANGULO_ARRIBA, 0);` y antes de encender el verde:

```cpp
barrera.write(90);   // subir barrera
delay(500);
```

Suban el código, pasen el barco y marquen en la tabla si cada evento pasa en ese orden. Si la barrera gira hacia el lado equivocado, cambien de lugar el 0 y el 90 (en los tres sitios donde aparecen para la barrera).

:::tabla id="g12-orden"
| Orden | Evento | ¿Funciona? |
| --- | --- | --- |
| 1 | Amarillo + alarma | |
| 2 | Rojo | |
| 3 | Barrera baja | |
| 4 | Puente sube, espera y baja | |
| 5 | Barrera sube | |
| 6 | Verde | |
:::

:::pregunta id="g12-p2"
¿Por qué la barrera debe bajar **antes** de que suba el puente y subir **después** de que baje?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Completamos la tabla de aplicaciones.
- [ ] La barrera está construida.
- [ ] La barrera baja antes del puente y sube después.
:::

## Reto extra

Haz que la barrera baje **despacio**, igual que las hojas del puente, usando un `for`.

Pista: igual que en la Guía 3, un `for` que vaya de 90 a 0 restando 1, con `barrera.write(a);` y un `delay` corto dentro.

## Bitácora (15 min)

:::foto id="g12-foto"
Foto o video de la barrera funcionando.
:::

:::pregunta id="g12-b1"
Propón otra aplicación de nuestro sistema que no esté en la tabla.
:::

Antes de irse, suban `equipo_NOMBRE_barrera` aquí.

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Con 3 servos conviene usar portapilas de 4 AA para los servos, uniendo su GND con el del Arduino.
- Hablar del Canal de Panamá como ejemplo cercano de esclusas.
- Tiempo total: 25 + 35 + 40 + 5 + 15 = 120 minutos.
:::

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
2. Coloca el servo a la entrada del puente, del lado de los carros.
3. Conecta: **naranja → D11**, **rojo → 5V**, **café → GND**.

[IMAGEN 12.2: servo con un palito pintado de rojo y blanco como barrera a la entrada del puente]

## Parte 3 · Programar la barrera (40 min)

Agrega arriba:

```cpp
Servo barrera;
```

En `setup()`:

```cpp
barrera.attach(11);
barrera.write(90);   // barrera levantada
```

Y en `secuenciaPuente()`, después de encender el rojo y **antes** de subir el puente:

```cpp
barrera.write(0);    // bajar barrera
delay(1000);
```

Y al final, después de bajar el puente:

```cpp
barrera.write(90);   // subir barrera
delay(500);
```

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

## Bitácora (15 min)

:::foto id="g12-foto"
Foto o video de la barrera funcionando.
:::

:::pregunta id="g12-b1"
Propón otra aplicación de nuestro sistema que no esté en la tabla.
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Con 3 servos conviene usar portapilas de 4 AA para los servos, uniendo su GND con el del Arduino.
- Hablar del Canal de Panamá como ejemplo cercano de esclusas.
- Tiempo total: 25 + 35 + 40 + 5 + 15 = 120 minutos.
:::

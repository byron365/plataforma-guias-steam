---
titulo: Sistemas críticos
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Sistemas críticos

## Objetivo del día

Reflexionar sobre los sistemas críticos y la seguridad, completar la bitácora y el código final, y (opcional) agregar la puerta automática de la cabina.

**Al terminar tendremos:** la reflexión del equipo, el código final documentado y la bitácora completa.

## Materiales del equipo

- Elevador completo
- Servo SG90 y cartón (puerta, opcional)

## Parte 1 · ¿Qué es un sistema crítico? (25 min)

Un **sistema crítico** es aquel en el que una falla puede causar daño a personas, al ambiente o grandes pérdidas.

:::tabla id="g13-criticos"
| Sistema | ¿Qué podría salir mal? | ¿Qué protección usa? |
| --- | --- | --- |
| Elevador real | | |
| Semáforo | | |
| Frenos ABS de un carro | | |
| Marcapasos | | |
| Avión con piloto automático | | |
:::

:::pregunta id="g13-p1"
¿Qué tienen en común las protecciones de todos estos sistemas con las de nuestro elevador?
:::

## Parte 2 · Reflexión (25 min)

:::pregunta id="g13-p2"
¿Qué decisión de seguridad tomamos que al principio no habíamos pensado?
:::

:::pregunta id="g13-p3"
De todos los fallos de la bitácora, ¿cuál habría sido el más peligroso en un elevador real?
:::

## Parte 3 · Reto opcional: puerta automática (40 min)

Un servo en la cabina abre una puerta de cartón al llegar y la cierra antes de moverse. **Regla de seguridad:** la cabina **nunca** se mueve con la puerta abierta.

```cpp
#include <Servo.h>
Servo puerta;            // en D6 (libre en la central)
const int ABIERTA = 90, CERRADA = 0;

// en setup():
puerta.attach(6);
puerta.write(CERRADA);

// al llegar al destino:
frenar();
puerta.write(ABIERTA);
delay(2000);
puerta.write(CERRADA);
delay(500);              // esperar a que cierre antes de moverse
```

:::tabla id="g13-puerta"
| Prueba | ¿Funciona? |
| --- | --- |
| Se abre al llegar | |
| Se cierra antes de moverse | |
| Nunca se mueve con la puerta abierta | |
:::

## Parte 4 · Código final (25 min)

:::checklist id="g13-codigo"
- [ ] Central y nodo tienen encabezado con proyecto, nodo, equipo y docente.
- [ ] Cada función tiene un comentario.
- [ ] Los ajustes (VEL_MAX, VEL_LLEGADA, direcciones) están juntos y explicados.
- [ ] Guardados como **equipo_NOMBRE_central.ino** y **equipo_NOMBRE_piso.ino**.
:::

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Completamos la tabla de sistemas críticos.
- [ ] Escribimos la reflexión.
- [ ] El código final está documentado.
:::

:::pregunta id="g13-b1" individual="si"
En una frase: ¿qué aprendí sobre la responsabilidad de diseñar un sistema que usan personas?
:::

:::docente
- El servo de la puerta va en la cabina: necesita cables que suban y bajen con ella; usar cable flexible y dejar holgura.
- Con Servo.h en uso, el PWM de los pines 9 y 10 no funciona con analogWrite; ENA está en D5, así que no hay conflicto.
- Tiempo total: 25 + 25 + 40 + 25 + 5 = 120 minutos.
:::

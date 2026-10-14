---
titulo: Automatización en el mundo real
guia: 13
sabado: 13
sesion: Cierre académico
duracion: 120
---

# Guía 13 · Automatización en el mundo real

## Objetivo del día

Reflexionar sobre la automatización industrial, completar la bitácora y el código final, y (opcional) agregar el contenedor de rechazo.

**Al terminar tendremos:** la reflexión del equipo, el código final de los dos nodos comentado y la bitácora completa.

## Materiales del equipo

- Banda completa, piezas de un color distinto (por ejemplo amarillo)
- Bitácora de fallos

## Parte 1 · Automatización industrial (25 min)

:::tabla id="g13-industria"
| Industria | ¿Qué se clasifica? | ¿Con qué sensor? |
| --- | --- | --- |
| Café | | |
| Reciclaje | | |
| Correo y paquetería | | |
| Frutas y verduras | | |
| Medicamentos | | |
:::

[IMAGEN 13.1: máquina clasificadora de granos de café por color en una planta procesadora]

:::pregunta id="g13-p1"
¿Qué ventajas y qué problemas trae automatizar un trabajo que antes hacían personas?
:::

## Parte 2 · Reflexión técnica (25 min)

:::pregunta id="g13-p2"
¿Qué decisión de arquitectura (dividir en dos nodos, compartir el bus I2C) ayudó más? ¿Cuál complicó el proyecto?
:::

:::pregunta id="g13-p3"
De todos los fallos de la bitácora, ¿cuál nos enseñó más y por qué?
:::

## Parte 3 · Reto opcional: contenedor de rechazo (40 min)

Las piezas de color desconocido (`leerColor()` devuelve −1) van a un **cuarto destino**: el desviador se queda en un ángulo que deja pasar la pieza al final de la banda.

```cpp
const int ANG_RECHAZO = 0;
int rechazos = 0;

// en clasificar():
int c = leerColor();
if (c < 0) {
  rechazos++;
  anguloPendiente = ANG_RECHAZO;
} else {
  cuenta[c]++;
  anguloPendiente = ANG[c];
}
```

:::tabla id="g13-rechazo"
| Pieza | ¿Fue al rechazo? |
| --- | --- |
| Amarilla | |
| Blanca | |
| Roja (control) | |
:::

## Parte 4 · Código final (25 min)

:::checklist id="g13-codigo"
- [ ] Los dos programas tienen encabezado con proyecto, nodo, equipo y docente.
- [ ] Cada función tiene un comentario.
- [ ] Los ajustes (ANG, K o RECORRIDO, límites de color) están juntos y explicados.
- [ ] Guardados como **equipo_NOMBRE_banda.ino** y **equipo_NOMBRE_clasificador.ino**.
:::

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Completamos la tabla de industrias.
- [ ] Escribimos la reflexión.
- [ ] El código final está documentado.
:::

:::pregunta id="g13-b1" individual="si"
En una frase: ¿qué aprendí sobre automatizar un proceso?
:::

:::docente
- Si el desviador no tiene un ángulo "neutro" que deje pasar, poner el contenedor de rechazo al final de la banda.
- La reflexión de g13-p1 puede conectarse con trabajos nuevos que crea la automatización (mantenimiento, programación).
- Tiempo total: 25 + 25 + 40 + 25 + 5 = 120 minutos.
:::

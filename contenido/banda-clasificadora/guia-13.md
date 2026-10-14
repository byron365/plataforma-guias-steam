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

Busquen en internet (por ejemplo, *"clasificadora de café por color"* o *"clasificación de residuos con sensores"*) y escriban con sus palabras qué se clasifica y con qué sensor.

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

En `equipo_NOMBRE_clasificador`:

1. Las dos primeras líneas (`ANG_RECHAZO` y `rechazos`) van arriba, en **Ajustes del equipo**.
2. En `clasificar()`, reemplacen estas líneas: `int c = leerColor();`, la línea `if (c < 0) return;` (si la agregaron en la Guía 7), `cuenta[c]++;` y `anguloPendiente = ANG[c];`, por el bloque de abajo. Las líneas `mostrarCuentas();`, `moverEn` y `ultimaPieza` se quedan.
3. Prueben qué ángulo deja pasar las piezas (por ejemplo 0) y pónganlo en `ANG_RECHAZO`. Si no hay ninguno, pongan el contenedor de rechazo al final de la banda.

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

Pasen cada pieza y anoten si fue al rechazo (la roja es de control: **no** debe ir al rechazo).

:::tabla id="g13-rechazo"
| Pieza | ¿Fue al rechazo? |
| --- | --- |
| Amarilla | |
| Blanca | |
| Roja (control) | |
:::

## Parte 4 · Código final (25 min)

Abran los dos programas y revisen punto por punto. Un **comentario** empieza con `//`: el Arduino no lo lee, es una nota para las personas. Para el último punto, usen **Archivo → Guardar como** con esos nombres y verifiquen (✓) que siguen sin errores.

:::checklist id="g13-codigo"
- [ ] Los dos programas tienen encabezado con proyecto, nodo, equipo y docente.
- [ ] Cada función tiene un comentario.
- [ ] Los ajustes (ANG, K o RECORRIDO, límites de color) están juntos y explicados.
- [ ] Guardados como **equipo_NOMBRE_banda.ino** y **equipo_NOMBRE_clasificador.ino**.
:::

Súbanlos aquí juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**).

:::archivo id="g13-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

## ¿Lo logramos? (5 min)

:::checklist id="g13-logramos"
- [ ] Completamos la tabla de industrias.
- [ ] Escribimos la reflexión.
- [ ] El código final está documentado.
:::

Cada integrante responde desde su propia sesión (entrando con su nombre):

:::pregunta id="g13-b1" individual="si"
En una frase: ¿qué aprendí sobre automatizar un proceso?
:::

:::docente
- Si el desviador no tiene un ángulo "neutro" que deje pasar, poner el contenedor de rechazo al final de la banda.
- La reflexión de g13-p1 puede conectarse con trabajos nuevos que crea la automatización (mantenimiento, programación).
- Tiempo total: 25 + 25 + 40 + 25 + 5 = 120 minutos.
:::

---
titulo: Luz, tiempo y errores
guia: 7
sabado: 7
sesion: Corrección de fallos
duracion: 120
---

# Guía 7 · Luz, tiempo y errores

## Objetivo del día

Corregir los errores de clasificación: lecturas falsas por luz ambiente, piezas que no se desvían a tiempo y piezas no detectadas o contadas dos veces.

**Al terminar tendremos:** una clasificación de color más robusta, el desviador sincronizado y un nuevo porcentaje de aciertos.

## Materiales del equipo

- Banda completa, piezas, tablas del sábado 6
- Cartulina negra, cinta

## Parte 1 · Método (10 min)

> **Síntoma → hipótesis → prueba → causa → solución → verificar.** Cambia una sola cosa a la vez.

Una **hipótesis** es lo que creemos que causa el error, antes de comprobarlo. Revisen su tabla de errores de la Guía 6 y, para los dos errores más frecuentes, escriban su hipótesis y qué prueba harían para comprobarla.

:::tabla id="g7-pendientes"
| Error del sábado 6 | Hipótesis de la causa | Prueba que haremos |
| --- | --- | --- |
| | | |
| | | |
:::

## Parte 2 · La luz ambiente (35 min)

Prueba el mismo color con luz distinta:

Usen el programa de prueba de color (Guía 5, Parte 2) con una misma pieza bajo el sensor. Cambien solo la luz en cada fila (cerrando o abriendo el túnel con la cartulina negra, o alumbrando con la linterna del celular).

:::tabla id="g7-luz"
| Condición | R | G | B | C | ¿Detecta bien? |
| --- | --- | --- | --- | --- | --- |
| Túnel cerrado | | | | | |
| Túnel abierto, luz del salón | | | | | |
| Linterna del celular encima | | | | | |
:::

Comparar R, G y B directamente falla cuando cambia la luz. Mejor usar **proporciones**: qué parte de la luz total es roja, verde o azul.

En su programa `equipo_NOMBRE_clasificador`, **reemplacen** toda la función `leerColor()` (desde `int leerColor() {` hasta su llave de cierre `}`) por esta:

```cpp
int leerColor() {
  uint16_t r, g, b, c;
  color.getRawData(&r, &g, &b, &c);
  if (c < 50) return -1;                 // muy oscuro: no hay pieza
  float pr = (float)r / c;               // proporción de rojo
  float pg = (float)g / c;
  float pb = (float)b / c;
  if (pr > 0.45) return 0;               // rojo  (calibrar)
  if (pg > 0.40) return 1;               // verde (calibrar)
  if (pb > 0.38) return 2;               // azul  (calibrar)
  return -1;                             // desconocido
}
```

Muevan la luz en la animación y comparen los valores crudos con las proporciones:

:::animacion tipo="proporcion-color"
:::

Calcula las proporciones con tu tabla de calibración y ajusta los límites:

1. Para cada medición de la Guía 6, dividan R ÷ C, G ÷ C y B ÷ C (en una hoja de cálculo es más rápido: por ejemplo `=B2/E2`).
2. Promedien las tres mediciones de cada color y escríbanlas en la tabla.
3. **Límite elegido:** un número un poco **menor** que el promedio del color de esa fila, pero **mayor** que lo que dan los otros colores en esa misma columna. Escríbanlo en la última columna.
4. Pongan sus tres límites en el código, en lugar de 0.45, 0.40 y 0.38.

:::tabla id="g7-proporciones"
| Pieza | Promedio R/C | Promedio G/C | Promedio B/C | Límite elegido |
| --- | --- | --- | --- | --- |
| Roja | | | | pr > ____ |
| Verde | | | | pg > ____ |
| Azul | | | | pb > ____ |
:::

> Si `leerColor()` puede devolver −1, en `clasificar()` hay que decidir qué hacer: no contarla y dejar el desviador en una posición de "rechazo".

**¡Importante!** Si `leerColor()` devuelve −1 y el programa hace `cuenta[c]++`, escribe fuera de la lista (no existe `cuenta[-1]`) y el Arduino puede hacer cosas raras. Por ahora, en `clasificar()`, justo después de la línea `int c = leerColor();`, agreguen la línea `if (c < 0) return;` (si el color es desconocido, no la cuenta ni mueve el desviador). En la Guía 13 harán el contenedor de rechazo.

Verifiquen (✓) y suban el programa.

:::pregunta id="g7-p1"
¿Por qué las proporciones funcionan mejor que los valores crudos cuando cambia la luz?
:::

## Parte 3 · Piezas que no se desvían bien (30 min)

:::tabla id="g7-desvio"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| El servo se mueve tarde: la pieza ya pasó | RECORRIDO muy largo | | |
| El servo empuja la pieza anterior | RECORRIDO muy corto | | |
| La paleta golpea pero la pieza no cambia de carril | Ángulos mal ajustados | | |
| Dos piezas muy juntas: la segunda va mal | El servo no alcanza a moverse | | |
:::

Ajusta los ángulos `ANG[3]` probando cada contenedor:

Cambien los números de la línea `const int ANG[3] = {30, 90, 150};` de 5 en 5, suban el código y pasen una pieza de cada color hasta que la paleta la mande bien a su contenedor. Anoten el ángulo final.

| Contenedor | Ángulo actual | Ángulo ajustado |
| --- | --- | --- |
| Rojo | 30 | |
| Verde | 90 | |
| Azul | 150 | |

## Parte 4 · Piezas no detectadas o dobles (20 min)

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Pieza no detectada | Sensor IR muy lejos o pieza oscura | Ajustar el tornillo del sensor |
| Pieza contada dos veces | La pieza "rebota" frente al IR | Ignorar nuevas llegadas por 300 ms en el nodo banda |

Pistas para el antirrebote (en el programa de la **banda**): una variable `unsigned long ultimoAviso = 0;` arriba; y en la línea `if (ahora && !antes) pieza = true;`, solo aceptar el aviso si `millis() - ultimoAviso > 300`, y en ese caso guardar `ultimoAviso = millis();`.

## Parte 5 · Volver a probar (20 min)

Repite el lote de 15 piezas:

Igual que en la Guía 6 (mezcladas, de una en una, a velocidad media). En la fila del sábado 6 copien sus resultados de ese día.

:::tabla id="g7-reprueba"
| Lote | Aciertos (%) | Errores de color | Errores de desvío | No detectadas |
| --- | --- | --- | --- | --- |
| Sábado 6 | | | | |
| Hoy | | | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Probamos el efecto de la luz ambiente.
- [ ] Clasificamos con proporciones.
- [ ] Ajustamos RECORRIDO y ángulos.
- [ ] Mejoramos el porcentaje de aciertos.
:::

## Bitácora

Anoten los fallos de hoy (síntoma, causa y solución).

:::tabla id="g7-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
| | | |
:::

Antes de irse: desenchufen la fuente y suban los dos programas (banda y clasificador) juntos en un `.zip`.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Los límites de proporción del código son ejemplos: cada equipo debe calcular los suyos con la tabla de calibración.
- Antirrebote en el nodo banda: guardar `millis()` del último aviso y no aceptar otro antes de 300 ms.
- Tiempo total: 10 + 35 + 30 + 20 + 20 + 5 = 120 minutos (la bitácora se llena durante el trabajo).
:::

---
titulo: Luz, ángulos y el lote final
guia: 7
sabado: 7
sesion: Corrección de fallos y prueba final
duracion: 120
---

# Guía 7 · Luz, ángulos y el lote final

## Objetivo del día

Hacer que el color se lea bien aunque cambie la luz, ajustar los ángulos de la canaleta, evitar piezas contadas dos veces y probar la banda con un lote de 30 piezas.

**Al terminar tendremos:** la banda clasificando mejor y el porcentaje de aciertos del lote final.

## Materiales del equipo

- Banda completa, 10 piezas de cada color, tablas del sábado 6
- Cartulina negra, cinta, linterna del celular
- Computadora con Arduino IDE (y hoja de cálculo, si quieren)

## Parte 1 · La luz ambiente (35 min)

Prueba el mismo color con luz distinta:

Usen el programa de prueba de color (Guía 5, Parte 2) con una misma pieza bajo el sensor. Cambien solo la luz en cada fila (cerrando o abriendo el túnel con la cartulina negra, o alumbrando con la linterna del celular).

:::tabla id="g7p-luz"
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

1. Para cada medición de la tabla de calibración de la Guía 6, dividan R ÷ C, G ÷ C y B ÷ C (en una hoja de cálculo es más rápido: por ejemplo `=B2/E2`).
2. Promedien las tres mediciones de cada color y escríbanlas en la tabla.
3. **Límite elegido:** un número un poco **menor** que el promedio del color de esa fila, pero **mayor** que lo que dan los otros colores en esa misma columna. Escríbanlo en la última columna.
4. Pongan sus tres límites en el código, en lugar de 0.45, 0.40 y 0.38.

:::tabla id="g7p-proporciones"
| Pieza | Promedio R/C | Promedio G/C | Promedio B/C | Límite elegido |
| --- | --- | --- | --- | --- |
| Roja | | | | pr > ____ |
| Verde | | | | pg > ____ |
| Azul | | | | pb > ____ |
:::

> Si `leerColor()` puede devolver −1, en `clasificar()` hay que decidir qué hacer: no contarla y no mover la canaleta.

**¡Importante!** Si `leerColor()` devuelve −1 y el programa hace `cuenta[c]++`, escribe fuera de la lista (no existe `cuenta[-1]`) y el Arduino puede hacer cosas raras. Por ahora, en `clasificar()`, justo después de la línea `int c = leerColor();`, agreguen la línea `if (c < 0) return;` (si el color es desconocido, no la cuenta ni mueve la canaleta).

Verifiquen (✓) y suban el programa.

:::pregunta id="g7p-p1"
¿Por qué las proporciones funcionan mejor que los valores crudos cuando cambia la luz?
:::

## Parte 2 · Los ángulos de la canaleta (20 min)

:::tabla id="g7p-desvio"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| La canaleta gira tarde: la pieza cae al contenedor anterior | RECORRIDO muy largo | | |
| La canaleta gira antes: la pieza anterior cae mal | RECORRIDO muy corto | | |
| La pieza cae al borde del contenedor | Ángulos mal ajustados | | |
| Dos piezas muy juntas: la segunda va mal | La canaleta no alcanza a girar | | |
:::

Ajusten los ángulos `ANG[3]` probando cada contenedor: cambien los números de la línea `const int ANG[3] = {30, 90, 150};` de 5 en 5, suban el código y pasen una pieza de cada color hasta que caiga en el centro de su contenedor.

:::tabla id="g7p-angulos"
| Contenedor | Ángulo inicial | Ángulo ajustado |
| --- | --- | --- |
| Rojo | 30 | |
| Verde | 90 | |
| Azul | 150 | |
:::

## Parte 3 · Piezas no detectadas o dobles (15 min)

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Pieza no detectada | Sensor IR muy lejos o pieza oscura | Ajustar el tornillo del sensor |
| Pieza contada dos veces | La pieza "rebota" frente al IR | Ignorar nuevas llegadas por 300 ms en el nodo banda |

Pistas para el antirrebote (en el programa de la **banda**): una variable `unsigned long ultimoAviso = 0;` arriba; y en la línea `if (ahora && !antes) pieza = true;`, solo aceptar el aviso si `millis() - ultimoAviso > 300`, y en ese caso guardar `ultimoAviso = millis();`.

## Parte 4 · El lote final de 30 piezas (35 min)

- 10 piezas rojas, 10 verdes y 10 azules, mezcladas al azar en una caja. Pidan a alguien de otro equipo que las mezcle.
- Se ponen en la banda **de una en una**, a ritmo constante (por ejemplo, una cada 3 segundos), sacándolas sin mirar.

Para cada ensayo:

1. Vacíen los contenedores y reinicien el display (botón de reset del Arduino clasificador: el conteo vuelve a cero).
2. Pongan la perilla en la velocidad media de la Guía 6 y anoten su valor.
3. Una persona pone las piezas, otra cronometra desde la primera pieza hasta que cae la última.
4. Al terminar, cuenten las piezas que quedaron en el contenedor correcto y anoten lo que dice el display (R-V-A).

:::tabla id="g7p-ensayos"
| Ensayo | Velocidad | Tiempo total (s) | Aciertos de 30 | Aciertos (%) | Display: R-V-A |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
:::

> Aciertos (%) = piezas en el contenedor correcto ÷ 30 × 100

:::pregunta id="g7p-p2"
¿Cumplimos el requisito R1 de la Guía 1 (al menos 90 % de aciertos)? Si no, ¿qué cambiaríamos primero?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] El color se lee con proporciones y nuestros límites.
- [ ] Ajustamos los ángulos de la canaleta.
- [ ] Probamos un lote de 30 piezas.
- [ ] Calculamos el porcentaje de aciertos.
:::

## Bitácora (10 min)

:::foto id="g7p-foto"
Video corto de la banda clasificando piezas.
:::

:::pregunta id="g7p-b1"
¿Qué parte de la banda les costó más: el diseño 3D, el armado, la electrónica o la programación? ¿Por qué?
:::

Antes de irse: desenchufen el cargador y suban los dos programas finales (`equipo_NOMBRE_banda` y `equipo_NOMBRE_clasificador`) juntos en un `.zip`.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (7 sábados), nueva el 23 de octubre:** la luz ambiente y las piezas dobles de la Guía 7 normal, el ajuste de ángulos (con la canaleta) y el lote de 30 piezas de la Guía 10 normal. Es la última guía de esta versión. Campos propios (g7p-…).
- Los límites de proporción del código son ejemplos: cada equipo debe calcular los suyos con la tabla de calibración.
- Antirrebote en el nodo banda: guardar `millis()` del último aviso y no aceptar otro antes de 300 ms.
- g7p-p2: si no llegan al 90 %, revisar primero el tipo de error más frecuente (tabla de errores de la Guía 6): color → límites; desvío → RECORRIDO o ángulos; detección → sensor IR.
- Tiempo total: 35 + 20 + 15 + 35 + 5 + 10 = 120 minutos.
:::

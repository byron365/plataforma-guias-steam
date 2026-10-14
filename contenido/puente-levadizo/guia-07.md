---
titulo: ¿Cuánto aguanta nuestro puente?
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · ¿Cuánto aguanta nuestro puente?

## Objetivo del día

Hacer la prueba de carga del puente, comparar el diagrama de flujo con el código y completar la ficha técnica.

**Al terminar tendremos:** la prueba de carga registrada, el código comentado y la ficha técnica del puente.

## Materiales del equipo

- Puente completo
- Pesas, monedas o bolsitas de arena (de 20 a 50 g cada una)
- Báscula de cocina, regla
- Computadora con Arduino IDE

## Parte 1 · Prueba de carga (40 min)

Un puente de verdad debe aguantar a los carros sin doblarse. El nuestro debe aguantar **200 g** sin deformarse.

**Preparar las pesas:** pesen en la báscula sus monedas o bolsitas y armen grupos de 50 g (pueden juntar monedas en bolsitas). Así sabrán cuánto peso agregan cada vez.

1. Con el puente cerrado, mide la altura del centro del tablero con la regla.
   - El "centro" es donde se juntan las dos hojas. Pongan la regla parada sobre la mesa, junto al puente, y lean a qué altura (en mm) está el tablero.
   - Anoten esa altura en la fila de 0 g.
2. Pon peso en el centro, poco a poco, y mide cuánto **baja** el tablero.
   - Agreguen 50 g a la vez, siempre en el mismo punto (el centro).
   - Después de cada peso, lean la nueva altura con la regla en el mismo lugar.
   - **Cuánto bajó** = altura con 0 g − altura con ese peso.
   - Si algo cruje o se despega, detengan la prueba y anótenlo en "¿Se ve dañado?".

:::tabla id="g7-carga"
| Peso total (g) | Altura del centro (mm) | Cuánto bajó (mm) | ¿Se ve dañado? |
| --- | --- | --- | --- |
| 0 | | 0 | |
| 50 | | | |
| 100 | | | |
| 150 | | | |
| 200 | | | |
:::

[IMAGEN 7.1: prueba de carga con monedas en el centro del puente y una regla midiendo cuánto baja]

Esta gráfica se dibuja con los datos de su tabla:

:::animacion tipo="grafica-carga" tabla="g7-carga"
:::

:::pregunta id="g7-p1"
¿El puente aguantó 200 g? Si se dobló mucho, ¿qué podríamos reforzar?
:::

## Parte 2 · Diagrama contra código (25 min)

Compara el diagrama de flujo del sábado 3 con el código final. Cada paso del diagrama debe estar en el código:

1. Abran el diagrama de la Guía 3 (en la bitácora o en la plataforma) y su programa `equipo_NOMBRE_automatico` (Guía 6).
2. Para cada paso de la tabla, busquen en el código la línea que lo hace y cópienla en la columna del medio. Por ejemplo, para "Esperar" busquen un `delay`.
3. En **¿Coinciden?** escriban Sí o No.

:::tabla id="g7-comparar"
| Paso del diagrama | Línea del código que lo hace | ¿Coinciden? |
| --- | --- | --- |
| Medir la distancia | | |
| ¿Barco cerca? | | |
| Amarillo + alarma | | |
| Rojo | | |
| Subir el puente | | |
| Esperar | | |
| Bajar el puente | | |
| Verde | | |
:::

:::pregunta id="g7-p2"
¿Encontramos algún paso que estaba en el código pero no en el diagrama, o al revés?
:::

## Parte 3 · Código comentado (20 min)

Agrega comentarios (`//`) a tu código para que cualquiera lo entienda. Al inicio pon:

Un **comentario** es una nota para las personas: todo lo que va después de `//` el Arduino no lo lee. Escriban estas tres líneas al principio del programa, poniendo el nombre de su equipo:

```cpp
// Puente levadizo automatizado
// Equipo: ______
// STEAM Robotics Academy · Básico · Docente: Bairon Alas
```

Y un comentario en cada bloque del `loop` y en cada función.

- Arriba de cada función (`medirDistancia`, `ponerAngulo`, `moverPuente`, `secuenciaPuente`), una línea que diga qué hace. Ejemplo: `// Mide la distancia al barco en cm`.
- Dentro del `loop`, un comentario antes de cada parte.
- Guarden con **Ctrl + S** y verifiquen (✓) que el programa sigue sin errores.

## Parte 4 · Ficha técnica (20 min)

Una ficha técnica resume los datos importantes del puente. Busquen cada dato en sus guías:

- **Escala, largo del tramo y altura de las torres:** Guía 2 (y lo que midieron en su maqueta).
- **Ángulo de apertura y distancia de detección:** los valores elegidos en la Guía 6.
- **Tiempo de subida:** cronométrenlo con el celular.
- **Carga máxima probada:** el mayor peso que aguantó sin dañarse (Parte 1).
- **Componentes:** la lista de piezas electrónicas.

:::tabla id="g7-ficha"
| Característica | Valor |
| --- | --- |
| Nombre del puente | |
| Escala | |
| Largo del tramo que se abre | |
| Altura de las torres | |
| Ángulo de apertura | |
| Tiempo de subida | |
| Distancia de detección | |
| Carga máxima probada | |
| Componentes | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Hicimos la prueba de carga hasta 200 g.
- [ ] Comparamos el diagrama con el código.
- [ ] El código tiene comentarios.
- [ ] Completamos la ficha técnica.
:::

## Reto extra

Sigue agregando peso hasta que el tablero baje **10 mm**. ¿Cuántos gramos fueron? Esa es la carga máxima de diseño.

## Bitácora (10 min)

:::pregunta id="g7-b1"
¿Para qué sirve una ficha técnica?
:::

Antes de irse, suban el programa comentado aquí.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Colocar el peso siempre en el mismo punto (el centro) para que las mediciones sean comparables.
- Si las hojas son de cartón y se doblan, sugerir una "costilla" de palito debajo.
- Rotar roles en esta guía si no se hizo en la 5.
- Tiempo total: 40 + 25 + 20 + 20 + 5 + 10 = 120 minutos.
:::

---
titulo: El laberinto en 3D (2): marco y torres
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El laberinto en 3D (2): marco y torres

## Objetivo del día

Terminar el tablero y diseñar el **marco** y las dos **torres** que lo sostienen.

**Al terminar tendremos:** el tablero, el marco, la torre del servo y la torre del eje exportados en STL y listos para imprimir.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del sábado 2
- El laberinto en papel del sábado 2
- Un servo SG90 (para mirarlo)

Si les toca otra computadora, no pasa nada: entren a Tinkercad con la misma cuenta y sus diseños estarán en **Diseños → Codeblocks**.

## Parte 1 · Terminar el tablero (25 min)

1. Abran **Diseños → Codeblocks** → `equipo_NOMBRE_laberinto` y terminen las paredes que falten.
   - Igual que el sábado 2: cada pared es un **Cubo** con su **Mover** (Z = 7.5). Revisen la tabla de la Guía 2 si no recuerdan dónde va cada una.
2. **El agujero de la meta (hueco):** un Cilindro de 8 mm de ancho en la casilla de la meta. Por ahí mirará el sensor desde abajo.
   - Un **Cilindro** con **Radio = 4** (8 ÷ 2), **A = 10**, **Lados = 32**.
   - Toca su **círculo rayado** para que sea hueco (el círculo de color se pone gris).
   - Debajo, **Mover** con la **X** y la **Y** de su meta (su respuesta de la Guía 2) y **Z = 0**.
3. **La bisagra:** un Cubo pegado por fuera del borde de atrás. Ahí entra el palito que hace de eje del tablero.
   - Un **Cubo** con primer **A = 12**, **L = 6**, segundo **A = 12**. Debajo, **Mover: X 0, Y 93, Z 7.5**.
4. **El agujero de la bisagra (hueco):** un Cilindro acostado que entra en la bisagra.
   - Un **Cilindro** con **Radio = 2**, **A = 14**, **Lados = 32**, marcado como **hueco**.
   - **Acostarlo:** de **Modificar**, arrastra **Girar alrededor** debajo del cilindro. Deja **Eje x** y escribe **90** en los grados.
   - Debajo, **Mover: X 0, Y 98, Z 7.5**.
5. **Agrupar** para que los huecos se resten: de **Modificar**, **Seleccionar todo** y debajo **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección").
   - Ejecuta con **▷**. **✔ Revisa:** se ve el agujero en la meta y, atrás, la bisagra con su agujero. Si el agujero de la bisagra sale parado (hacia arriba), revisa que **Girar alrededor** diga **Eje x** y **90**.
6. **Exporta** `equipo_NOMBRE_tablero.stl`.
   - Arriba a la derecha, **Compartir** → en **Descargar un archivo**, toca **.STL**. Queda en la carpeta **Descargas**.
   - Cámbiale el nombre: clic derecho → **Cambiar nombre** → `equipo_NOMBRE_tablero.stl`.

[IMAGEN 3.1T: tablero terminado en Tinkercad Codeblocks, con etiquetas: agujero de la meta y bisagra con su agujero]

## Parte 2 · El marco (35 min)

El marco es un cuadro que rodea el tablero. Tiene tres cosas importantes:

- Adelante, una **ventana** donde entra el servo que inclina el tablero.
- Atrás, un **agujero** donde entra el palito de la bisagra del tablero.
- En el lado izquierdo, otro **agujero** para el palito de la torre del eje. En el lado derecho se pega el brazo del servo de la otra torre.

Muevan los controles de la animación y miren qué parte gira con cada servo:

:::animacion tipo="cardan"
:::

Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_marco`.

1. **Lado de adelante:** un **Cubo** con primer **A = 198**, **L = 6**, segundo **A = 19**. Debajo, **Mover: X 0, Y −100, Z 9.5**.
2. **Lado de atrás:** otro **Cubo** igual y **Mover: X 0, Y 100, Z 9.5**.
3. **Lado derecho:** un **Cubo** con primer **A = 6**, **L = 194**, segundo **A = 19**. Debajo, **Mover: X 96, Y 0, Z 9.5**.
4. **Lado izquierdo:** otro igual y **Mover: X −96, Y 0, Z 9.5**.
   - Ejecuta con **▷**. **✔ Revisa:** un cuadro cerrado, sin huecos en las esquinas.
5. **La ventana del servo (hueco):** un **Cubo** con primer **A = 23.4**, **L = 10**, segundo **A = 12.8**, marcado como **hueco**. Debajo, **Mover: X −5.4, Y −100, Z 9.5**.
6. **El agujero de atrás (hueco):** un **Cilindro** con **Radio = 2**, **A = 10**, **Lados = 32**, hueco. Debajo, **Girar alrededor** con **Eje x** y **90**, y **Mover: X 0, Y 100, Z 9.5**.
7. **El agujero izquierdo (hueco):** otro **Cilindro** igual, hueco. Debajo, **Girar alrededor** con **Eje y** y **90**, y **Mover: X −96, Y 0, Z 9.5**.
8. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** gira la vista. Adelante, la ventana rectangular atraviesa el lado; atrás y a la izquierda, un agujero redondo en el centro de cada lado.
9. **Exporta** `equipo_NOMBRE_marco.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).

[IMAGEN 3.2T: marco en Tinkercad Codeblocks, con etiquetas: ventana del servo del tablero, agujero del eje del tablero, agujero del eje del marco y lado donde se pega el brazo del otro servo]

:::pregunta id="g3t-p1"
El servo mide 22,8 × 12,2 mm, pero la ventana mide 23,4 × 12,8 mm. ¿Por qué la hacemos un poco más grande?
:::

## Parte 3 · Las torres (35 min)

Las dos torres son iguales por fuera: una **placa** alta, dos **aletas** atrás para que no se doble y un **pie** con dos agujeros para atornillarla a la base. La **torre del servo** tiene una ventana; la **torre del eje**, un agujero.

Diseño nuevo: `equipo_NOMBRE_torre`.

1. **La placa:** un **Cubo** con primer **A = 6**, **L = 40**, segundo **A = 134**. Debajo, **Mover: X 0, Y 0, Z 67**.
2. **Las aletas:** dos **Cubos** con primer **A = 15**, **L = 5**, segundo **A = 134**.
   - El primero con **Mover: X 10.5, Y 17.5, Z 67**; el segundo con **Mover: X 10.5, Y −17.5, Z 67**.
3. **El pie:** un **Cubo** con primer **A = 30**, **L = 70**, segundo **A = 4**. Debajo, **Mover: X 12, Y 0, Z 2**.
4. **Los agujeros del pie (huecos):** dos **Cilindros** con **Radio = 2**, **A = 10**, huecos.
   - El primero con **Mover: X 12, Y 28, Z 2**; el segundo con **Mover: X 12, Y −28, Z 2**.
5. **La ventana del servo (hueco):** un **Cubo** con primer **A = 10**, **L = 12.8**, segundo **A = 23.4**, hueco. Debajo, **Mover: X 0, Y 0, Z 114.6**. (El servo va **parado**, con el eje arriba.)
6. **Agrupar:** **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** la ventana atraviesa la placa, cerca de arriba, y las aletas y el pie quedan del mismo lado.
7. **Exporta** `equipo_NOMBRE_torre_servo.stl`.
8. **La torre del eje:** cambien la ventana por un agujero y exporten otra vez.
   - Arrastren el **Cubo** de la ventana y su **Mover** de vuelta a la columna de bloques (se borran).
   - En su lugar, antes de **Seleccionar todo**: un **Cilindro** con **Radio = 2**, **A = 10**, hueco; debajo **Girar alrededor** con **Eje y** y **90**, y **Mover: X 0, Y 0, Z 120**.
   - Ejecuta con **▷**: en vez de la ventana aparece un agujero pequeño. Exporta `equipo_NOMBRE_torre_eje.stl`.

[IMAGEN 3.3T: torres en Tinkercad Codeblocks, con etiquetas: torre del servo con su ventana, torre del eje con su agujero y pie con agujeros para tornillos]

## Parte 4 · Revisar y ubicar las piezas (15 min)

1. **Si les falta alguna pieza**, termínenla ahora: tablero (Parte 1), marco (Parte 2) o torres (Parte 3).
2. Abran cada diseño, ejecútenlo con **▷**, gírenlo y marquen:

:::checklist id="g3t-revision"
- [ ] Tablero: todas las paredes, el agujero de la meta y la bisagra con su agujero.
- [ ] Marco: la ventana adelante y los dos agujeros (atrás y a la izquierda).
- [ ] Torre del servo con su ventana y torre del eje con su agujero.
- [ ] Los 4 `.stl` están en Descargas con su nombre correcto.
:::

3. Miren de nuevo la imagen del laberinto completo (Guía 2) y ubiquen cada pieza:
   - Las **torres** se atornillan en la base, una frente a la otra. El **marco** queda entre ellas.
   - El **servo del marco** va en la torre del servo; su brazo se pega al lado derecho del marco. En el otro lado, un **palito de pincho** pasa por la torre del eje y entra en el agujero izquierdo del marco.
   - El **servo del tablero** va en la ventana del marco; su brazo se pega al borde de adelante del tablero. Atrás, otro palito pasa por el marco y entra en la bisagra.
   - El **sensor de la meta** va debajo del tablero, mirando hacia arriba por el agujero.

:::pregunta id="g3t-p2"
El tablero queda a unos 11 cm de la base. ¿Qué pasaría si lo ponemos más bajo, sabiendo que el sensor de la meta cuelga debajo del tablero?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3t-logramos"
- [ ] El tablero está terminado y exportado.
- [ ] El marco está exportado.
- [ ] Las dos torres están exportadas.
- [ ] Sabemos dónde va cada pieza.
:::

## Reto extra

Marca la **salida** del laberinto con una letra **S** en relieve.

Pista: en el tablero, antes del último **Seleccionar todo**, agrega de **Formas** el bloque **Texto** y escribe **S** en su casilla. Debajo, de **Modificar**, **Definir tamaño** con **X = 12**, **Y = 12**, **Z = 1**, y **Mover: X −75, Y −75, Z 2** (queda apoyada sobre la placa en la casilla A1). Exporta otra vez el tablero.

## Bitácora (5 min)

:::pregunta id="g3t-b1"
¿Qué pieza fue la más difícil de diseñar? ¿Por qué?
:::

Antes de irse, junten los 4 `.stl` en un `.zip` (selecciónenlos, clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. El docente los imprimirá para el próximo sábado.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, reestructurada el 21 de octubre:** el pseudocódigo, el juego en Wokwi, la pieza de prueba y el cronograma salen de esta versión; el código del juego se escribe directamente en la Guía 6. El soporte cardán de antes (base de 240 mm y marco de 220 mm) no se podía hacer: el **Cubo de Codeblocks llega como máximo a 200 mm**. Campos propios (g3t-…).
- **Medidas** (probadas en Tinkercad el 21 de octubre): marco de 198 × 206 × 19 mm con lados de 6 mm, y torres de 134 mm de alto. Cabe en una cama de 220 × 220. Los ejes de giro del marco y del tablero quedan a **120 mm** de la base: así, aunque la meta esté en una esquina y se incline 15° (o 20°) en diagonal, el sensor que cuelga del tablero no choca con la base (quedan unos 13 mm a 15° y 5 mm a 20°).
- **Servo usado:** SG90 de 22,8 × 12,2 mm, con pestañas de 32,2 mm y el eje a unos 6 mm de un extremo. Por eso la ventana del marco está corrida 5,4 mm: el eje del servo cae justo en el centro del marco (X = 0) si el servo entra con el eje hacia la derecha. En la torre, el servo va parado con el eje arriba, a 120 mm. **Antes de imprimir para todos, conviene probar un marco y una torre con un servo de la academia.**
- Los agujeros de 4 mm son para **palitos de pincho** de unos 3 mm (o un clavo): giran libres en el marco y en la torre, y se pegan con silicona en la bisagra y en el lado izquierdo del marco.
- Impresión: el tablero y el marco tal como salen (planos); las torres **acostadas sobre la placa** (la cara sin aletas en la cama), sin soportes. Tiempos aproximados: tablero 3-4 h, marco 3 h, cada torre 1,5 h.
- g3t-p1: holgura; la impresora no es perfecta y el servo no entraría o quedaría muy apretado.
- g3t-p2: el sensor chocaría con la base cuando el tablero se inclina hacia la meta, y el tablero no podría inclinarse del todo.
- Tiempo total: 25 + 35 + 35 + 15 + 5 + 5 = 120 minutos.
:::

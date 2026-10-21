---
titulo: El dispensador doble en 3D (2): embudo y torre del líquido
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El dispensador doble en 3D (2): embudo y torre del líquido

## Objetivo del día

Terminar el diseño del dispensador doble: el **embudo con cuello** para el cereal y la **torre del líquido**, y saber dónde va cada pieza.

**Al terminar tendremos:** las 4 piezas del dispensador exportadas en STL.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del sábado 2
- La botella del cereal (pequeña, de unos 600 ml) y la manguera de la bomba (para medirlas)
- Regla o calibrador en milímetros
- Bitácora

## Parte 1 · Repaso (5 min)

1. Entren a Tinkercad → **Diseños → Codeblocks** y revisen que estén `equipo_NOMBRE_torre_cereal` y `equipo_NOMBRE_compuerta`.
2. Recuerden las tres reglas de la Guía 2:
   - Las medidas van en **milímetros**.
   - Cada forma nace con su centro en el plano; con **Mover** la llevamos a su lugar.
   - Los **huecos** se restan al final con **Seleccionar todo** y **Group Selection**.

## Parte 2 · El embudo con cuello (45 min)

El embudo lleva el cereal de la botella a la compuerta. Arriba tiene una **tapa** ancha que se apoya en la repisa de la torre, y un **cuello** donde entra la botella boca abajo.

**Primero, midan la botella:** con la regla o el calibrador, el ancho **de afuera** de la boca (la parte con rosca). En el ejemplo mide 28 mm.

- **Hueco del cuello** = boca + 1 mm (en el ejemplo, 29 mm). **Cuello** = hueco + 4 mm (en el ejemplo, 33 mm: paredes de 2 mm).
- Como Tinkercad pide **radios**, dividan entre 2: en el ejemplo, radio del hueco **14.5** y radio del cuello **16.5**.

:::tabla id="g3d-botella"
| Medida | Ejemplo (mm) | Nuestra botella (mm) |
| --- | --- | --- |
| Boca de la botella (afuera) | 28 | |
| Radio del hueco del cuello | 14.5 | |
| Radio del cuello | 16.5 | |
:::

Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_embudo`.

1. **El cono de afuera:** un Cono que abajo mide 25 mm (la salida) y arriba 80 mm (la entrada), de 50 mm de alto.
   - De **Formas**, arrastra el bloque **Cono** y toca su flecha **›**.
   - El cono pide **radios** (la mitad del ancho): **Radio superior = 40**, **Radio inferior = 12.5**, **A = 50**, **Lados = 32**.
2. **El hueco del cono:** otro Cono un poco más chico, marcado como hueco, para que las paredes queden de unos 2 mm.
   - Debajo, otro **Cono** con **Radio superior = 38.5**, **Radio inferior = 10**, **A = 52**, **Lados = 32**, marcado como **hueco** (círculo rayado).
   - Es 2 mm más alto que el de afuera: le sobra 1 mm arriba y 1 mm abajo, así atraviesa el embudo completo. No hace falta moverlo.
3. **Agrupar** para que el hueco se reste: **Seleccionar todo** y **Group Selection**.
   - Ejecuta con **▷**. **✔ Revisa:** mirando desde arriba, el embudo es hueco, con agujero arriba y abajo.

Estos bloques van **debajo** de Group Selection, en este orden:

4. **Tapa:** **Cilindro** con **Radio = 45**, **A = 3**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 26.5**.
   - Mide 90 mm de ancho: más que el agujero de la repisa (82 mm). Por eso el embudo **se apoya** en la repisa y no se cae.
5. **Cuello:** **Cilindro** con el radio del cuello (en el ejemplo **16.5**), **A = 15**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 35.5** (queda parado sobre la tapa).
6. **Hueco del cuello:** **Cilindro** con el radio del hueco (en el ejemplo **14.5**), **A = 40**, **Lados = 32**, marcado como **hueco**. Debajo, **Mover: X 0, Y 0, Z 30** (atraviesa la tapa y el cuello).
7. Al final, otra vez **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** de lado se ve el cono hacia abajo, la tapa ancha y el cuello encima; el cuello es un anillo (hueco por dentro).

[IMAGEN 3.1D: embudo con tapa ancha y cuello en Tinkercad Codeblocks]

8. **Exporta** `equipo_NOMBRE_embudo.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).

:::pregunta id="g3d-p1"
¿Por qué la salida del embudo (25 mm) tiene que ser más grande que un pedazo de cereal?
:::

## Parte 3 · La torre del líquido (35 min)

La torre del líquido tiene un pie (donde va el vaso), una pared y un **brazo** arriba con un agujero. La manguera de la bomba entra por ese agujero y apunta al vaso.

**Primero, midan la manguera:** su ancho **por fuera**, con el calibrador o con la regla (con cuidado). El agujero será de ese ancho **+ 0,5 mm**, para que la manguera entre a presión.

- Por ejemplo, si la manguera mide 7 mm: 7 + 0,5 = 7,5 mm, y el radio es la mitad: **3.75**.

:::tabla id="g3d-manguera"
| Medida | Ejemplo (mm) | Nuestra manguera (mm) |
| --- | --- | --- |
| Ancho de la manguera (afuera) | 7 | |
| Radio del agujero | 3.75 | |
:::

Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_torre_liquido`.

1. **El pie:** un Cubo de 60 × 110 × 4 mm. Debajo, **Mover: X 0, Y 55, Z 2**.
2. **La pared:** un Cubo de 60 × 5 × 110 mm. Debajo, **Mover: X 0, Y 2.5, Z 55**.
3. **El brazo:** un Cubo de 20 × 75 × 6 mm, arriba de la pared y hacia adelante.
   - Un **Cubo** con primer A = **20**, L = **75**, segundo A = **6**. Debajo, **Mover: X 0, Y 42.5, Z 107**.
4. **El agujero de la manguera (hueco):** un cilindro parado que atraviesa la punta del brazo.
   - Un **Cilindro** con el **Radio** que calcularon (en el ejemplo **3.75**), **A = 20**, **Lados = 32**, marcado como **hueco**.
   - Debajo, **Mover: X 0, Y 70, Z 107**.
5. **Agrupar** (Seleccionar todo y Group Selection) y ejecuta.
   - **✔ Revisa:** debe verse una pieza como una "C": el pie abajo, la pared atrás y el brazo arriba, con un agujerito en la punta del brazo.

[IMAGEN 3.2D: torre del líquido en Tinkercad Codeblocks: pie, pared y brazo con el agujero de la manguera]

6. **Exporta** `equipo_NOMBRE_torre_liquido.stl`.

## Parte 4 · ¿Dónde va cada pieza? (20 min)

Miren otra vez el dispensador completo y ubiquen cada pieza:

[IMAGEN 2.1D: dispensador doble diseñado en Tinkercad: torre del cereal con botella, embudo y compuerta; torre del líquido con su brazo y la manguera; recipiente del líquido; Arduino y protoboard del otro lado]

- **Torre del cereal**, en el centro:
  - El **embudo** dentro del agujero de arriba, apoyado con su tapa.
  - La **botella** boca abajo en el cuello.
  - El **servo** parado en el hueco de la repisa de en medio, con el eje hacia arriba, colgando de sus pestañas.
  - La **compuerta** boca abajo, con el encastre en el brazo del servo y la paleta tapando la salida del embudo.
  - El **plato** sobre el pie, debajo de la salida.
- **Torre del líquido**, a un lado:
  - El **vaso** sobre el pie, debajo del agujero del brazo.
  - El **recipiente** del líquido junto a la torre, con la **bomba** sumergida adentro.
  - La **manguera** sube desde la bomba y entra por el agujero del brazo.
- **Arduino y protoboard**: al otro lado de la torre del cereal, **lejos del líquido**.

Revisen que tienen todos los archivos:

:::checklist id="g3d-piezas"
- [ ] equipo_NOMBRE_torre_cereal.stl
- [ ] equipo_NOMBRE_compuerta.stl
- [ ] equipo_NOMBRE_embudo.stl
- [ ] equipo_NOMBRE_torre_liquido.stl
:::

:::pregunta id="g3d-p2"
¿Por qué ponemos el Arduino y la protoboard del lado del cereal y no junto al líquido?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3d-logramos"
- [ ] El embudo es hueco, tiene su tapa ancha y su cuello.
- [ ] El cuello tiene la medida de nuestra botella.
- [ ] La torre del líquido tiene el agujero de la medida de la manguera.
- [ ] Tenemos las 4 piezas en STL.
:::

## Reto extra

Ponle al pie de la torre del líquido un **anillo** que no deje que el vaso se mueva.

Pista: midan el ancho de la base del vaso. En la torre del líquido, antes de **Seleccionar todo**, agreguen un **Cilindro** con **Radio** = (ancho del vaso ÷ 2) + 3 y **A = 3**, y otro **Cilindro** marcado como **hueco** con **Radio** = (ancho del vaso ÷ 2) + 1 y **A = 5**. Muevan el anillo con **Mover: X 0, Y 70, Z 5.5** y el hueco con **Mover: X 0, Y 70, Z 6.5** (así el hueco no se come el pie).

## Bitácora (10 min)

:::pregunta id="g3d-b1"
¿Qué pieza del dispensador fue la más difícil de diseñar? ¿Por qué?
:::

Antes de irse, junten los 2 `.stl` de hoy en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. Los diseños de bloques quedan guardados en Tinkercad.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión "Doble: cereal y líquido (Tinkercad)":** termina el diseño del dispensador doble. Se quitaron de esta versión el diagrama de flujo y el cronograma de la versión Tinkercad (campos g3d-… propios).
- El embudo es el mismo de la versión Tinkercad, con la **tapa más ancha** (radio 45 en vez de 40) para que se apoye en la repisa de la torre (agujero de 82 mm).
- Botella del cereal: conviene una pequeña (unos 600 ml); una de 2 L con cereal pesa mucho para la torre y la puede volcar.
- El recipiente del líquido no se imprime (el plástico impreso puede filtrar): un vaso o una botella cortada de unos 7 cm de ancho y 9 cm de alto, con la bomba sumergida.
- La manguera de la bomba suele medir unos 7 mm por fuera (agujero de radio 3,75), igual que en el Mini invernadero.
- Impresión: la torre del líquido se imprime **acostada sobre la pared**; el embudo, con el cono hacia abajo y **soportes** debajo de la tapa.
- g3d-p1: si la salida fuera muy chica, los pedazos de cereal se trabarían y la salida se taparía.
- g3d-p2: si el líquido se derrama y moja el Arduino o la protoboard, se puede hacer un cortocircuito y dañarlos.
- Tiempo total: 5 + 45 + 35 + 20 + 5 + 10 = 120 minutos.
:::

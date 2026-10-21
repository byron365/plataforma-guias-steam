---
titulo: El dispensador en 3D (2): el embudo
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El dispensador en 3D (2): el embudo

## Objetivo del día

Terminar el diseño del dispensador: el **embudo con cuello**, revisar las tres piezas y saber dónde va cada una.

**Al terminar tendremos:** las 3 piezas del dispensador exportadas en STL y listas para imprimir.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del sábado 2
- La botella del depósito (pequeña, de unos 600 ml) y el plato
- 1 servo SG90 (para medirlo)
- Regla o calibrador en milímetros
- Bitácora

Si les toca otra computadora, no pasa nada: entren a Tinkercad con la misma cuenta y sus diseños estarán en **Diseños → Codeblocks**.

## Parte 1 · Repaso (5 min)

1. Entren a Tinkercad → **Diseños → Codeblocks** y revisen que estén `equipo_NOMBRE_torre` y `equipo_NOMBRE_compuerta`.
2. Recuerden las tres reglas de la Guía 2:
   - Las medidas van en **milímetros**.
   - Cada forma nace con su centro en el plano; con **Mover** la llevamos a su lugar.
   - Los **huecos** se restan al final con **Seleccionar todo** y **Group Selection**.

## Parte 2 · El embudo con cuello (45 min)

El embudo lleva las croquetas de la botella a la compuerta. Arriba tiene una **tapa** ancha que se apoya en la repisa de la torre, y un **cuello** donde entra la botella boca abajo.

Un embudo con paredes **empinadas** deja caer la comida; uno muy plano se atasca. Muevan la animación para verlo:

:::animacion tipo="embudo-angulo"
:::

**Primero, midan la botella:** con la regla o el calibrador, el ancho **de afuera** de la boca (la parte con rosca). En el ejemplo mide 28 mm.

- **Hueco del cuello** = boca + 1 mm (en el ejemplo, 29 mm). **Cuello** = hueco + 4 mm (en el ejemplo, 33 mm: paredes de 2 mm).
- Como Tinkercad pide **radios**, dividan entre 2: en el ejemplo, radio del hueco **14.5** y radio del cuello **16.5**.

:::tabla id="g3t-botella"
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

:::pregunta id="g3t-p1"
¿Por qué la salida del embudo (25 mm) tiene que ser más grande que una croqueta?
:::

## Parte 3 · Terminar y revisar las piezas (35 min)

1. **Si les falta una pieza de la Guía 2** (la torre o la compuerta), termínenla ahora: los pasos están en la Guía 2.
2. **Midan el servo** con el calibrador o la regla: el largo y el ancho del **cuerpo** (sin las pestañas).
   - El hueco de la torre debe medir **0,6 mm más** que el servo en cada medida. Si su servo mide distinto al del ejemplo, cambien los números del **hueco del servo** en `equipo_NOMBRE_torre` y exporten la torre otra vez.

:::tabla id="g3t-servo"
| Medida del cuerpo del servo | Ejemplo (mm) | Nuestro servo (mm) | Hueco = servo + 0,6 (mm) |
| --- | --- | --- | --- |
| Largo | 22.8 | | |
| Ancho | 12.2 | | |
:::

3. **Midan el plato:** debe medir **menos de 9 cm de ancho** y **menos de 5 cm de alto**, para que quepa en el pie de la torre, debajo del servo. Si es más grande, busquen otro.
4. Abran cada diseño, ejecútenlo con **▷**, gírenlo y marquen:

:::checklist id="g3t-revision"
- [ ] Torre: el agujero redondo atraviesa la repisa de arriba.
- [ ] Torre: el hueco del servo atraviesa la repisa de en medio.
- [ ] Compuerta: el encastre es hueco y la paleta no tiene agujero.
- [ ] Embudo: es hueco de arriba a abajo y el cuello es un anillo.
- [ ] Los tres `.stl` están en Descargas con su nombre correcto.
:::

Si terminan antes, hagan el **reto extra** de la Guía 2 (el refuerzo de la repisa del servo) o el de esta guía.

## Parte 4 · ¿Dónde va cada pieza? (20 min)

Miren el dispensador completo y ubiquen cada pieza:

[IMAGEN 2.1T: dispensador diseñado en Tinkercad, con etiquetas: botella, embudo con cuello, torre, compuerta, servo, plato, Arduino y protoboard con el botón, el LED y el buzzer]

- El **embudo**, dentro del agujero de la repisa de arriba, apoyado con su tapa.
- La **botella**, boca abajo en el cuello del embudo.
- El **servo**, parado en el hueco de la repisa de en medio, con el eje hacia arriba, colgando de sus pestañas.
- La **compuerta**, boca abajo: el encastre en el brazo del servo y la paleta tapando la salida del embudo.
- El **plato**, sobre el pie, debajo de la salida.
- El **Arduino** y la **protoboard** con el botón, el LED y el buzzer, al lado de la torre, en el frente, donde se vean.

Revisen que tienen todos los archivos:

:::checklist id="g3t-piezas"
- [ ] equipo_NOMBRE_torre.stl
- [ ] equipo_NOMBRE_compuerta.stl
- [ ] equipo_NOMBRE_embudo.stl
:::

:::pregunta id="g3t-p2"
La compuerta queda solo 1 mm debajo de la salida del embudo. ¿Qué pasaría si quedara mucho más abajo?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3t-logramos"
- [ ] El embudo es hueco, tiene su tapa ancha y su cuello.
- [ ] El cuello tiene la medida de nuestra botella.
- [ ] El hueco del servo tiene la medida de nuestro servo.
- [ ] Tenemos las 3 piezas en STL.
:::

## Reto extra

Ponle al pie de la torre un **anillo** que no deje que el plato se mueva.

Pista: midan el ancho de la base del plato. En la torre, antes de **Seleccionar todo**, agreguen un **Cilindro** con **Radio** = (ancho del plato ÷ 2) + 3 y **A = 3**, y otro **Cilindro** marcado como **hueco** con **Radio** = (ancho del plato ÷ 2) + 1 y **A = 5**. Muevan el anillo con **Mover: X 0, Y 55, Z 5.5** y el hueco con **Mover: X 0, Y 55, Z 6.5** (así el hueco no se come el pie). Exporten la torre otra vez.

## Bitácora (10 min)

:::pregunta id="g3t-b1"
¿Qué pieza del dispensador fue la más difícil de diseñar? ¿Por qué?
:::

Antes de irse, junten los 3 `.stl` en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. El docente los imprimirá para el próximo sábado.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, reestructurada el 21 de octubre:** termina el diseño. Se quitaron el diagrama de flujo y el cronograma; la Parte 3 da tiempo a los equipos que van más lento para terminar la Guía 2. Campos propios (g3t-…).
- El embudo es el mismo de antes con la **tapa más ancha** (radio 45 en vez de 40) para que se apoye en la repisa de la torre (agujero de 82 mm). Con esas medidas la pared del embudo tiene unos 62° respecto a la horizontal: suficiente para croquetas.
- Botella: conviene una pequeña (unos 600 ml); una de 2 L llena de croquetas pesa mucho para la torre y la puede volcar.
- Si la boca de la botella es muy variable, hacer el hueco del cuello de 30 mm y ajustar con cinta.
- Imprimir esta semana: torre (acostada sobre la pared), compuerta (con la paleta en la cama) y embudo (con el cono hacia abajo; la tapa sobresale 5 mm y puede pedir soportes). STL de referencia en `Dispensador doble - STL para imprimir\` (torre_cereal, compuerta y embudo).
- Reto: con un plato de más de 9 cm el anillo se sale del pie. El hueco del anillo empieza en Z 4 (encima del pie).
- g3t-p1: si la salida fuera muy chica, las croquetas se trabarían y la salida se taparía.
- g3t-p2: por el espacio entre la salida y la paleta se escaparían croquetas aunque la compuerta esté cerrada.
- Tiempo total: 5 + 45 + 35 + 20 + 5 + 10 = 120 minutos.
:::

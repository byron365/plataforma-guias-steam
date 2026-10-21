---
titulo: El mini fútbol en 3D (2): el soporte del marcador
guia: 3
sabado: 3
sesion: Planificación del proyecto
duracion: 120
---

# Guía 3 · El mini fútbol en 3D (2): el soporte del marcador

## Objetivo del día

Diseñar el **soporte del marcador**, donde van la pantalla y el buzzer, revisar las piezas y saber dónde va cada una.

**Al terminar tendremos:** la portería y el soporte del marcador exportados en STL y listos para imprimir.

## Materiales del equipo

- Computadora con internet, mouse y la cuenta de Tinkercad del sábado 2
- Pantalla OLED y buzzer (para medirlos)
- Regla o calibrador en milímetros
- Bitácora

Si les toca otra computadora, no pasa nada: entren a Tinkercad con la misma cuenta y sus diseños estarán en **Diseños → Codeblocks**.

## Parte 1 · Repaso (5 min)

1. Entren a Tinkercad → **Diseños → Codeblocks** y revisen que esté `equipo_NOMBRE_porteria`.
2. Recuerden las tres reglas de la Guía 2:
   - Las medidas van en **milímetros**.
   - Cada forma nace con su centro en el plano; con **Mover** la llevamos a su lugar.
   - Los **huecos** se restan al final con **Seleccionar todo** y **Group Selection**.

## Parte 2 · Medir la pantalla y el buzzer (10 min)

El soporte es un **panel inclinado** sobre una base. El panel tiene una **ventana** por donde se ve la pantalla y un **agujero** donde se mete el buzzer. Los dos se ponen por detrás.

[IMAGEN 3.1T: soporte del marcador en Tinkercad Codeblocks, con etiquetas: panel inclinado, ventana de la pantalla, agujero del buzzer y base]

1. **La pantalla:** midan el **vidrio** (la parte oscura y brillante), sin la placa. La ventana mide 25 × 14 mm: el vidrio debe ser **más grande** que la ventana, para que tape la ventana por detrás.
2. **El buzzer:** midan lo ancho de su parte redonda. El radio del agujero es **la mitad + 0,2 mm**, para que entre justo.

:::tabla id="g3t-medidas"
| Medida | Ejemplo (mm) | Nuestra medida (mm) |
| --- | --- | --- |
| Vidrio de la pantalla (ancho × alto) | 26.7 × 19.3 | |
| Buzzer (lo ancho) | 12 | |
| Radio del agujero del buzzer | 6.2 | |
:::

## Parte 3 · El soporte del marcador (45 min)

Diseño nuevo: **+ Crear → Codeblocks**, nombre `equipo_NOMBRE_soporte_marcador`.

1. **El panel:** un Cubo de 70 × 4 × 50 mm. No se mueve: queda en el centro.
   - De **Formas**, un **Cubo** con primer **A = 70**, **L = 4**, segundo **A = 50**, **arista = 0**.
2. **La ventana de la pantalla (hueco):** un Cubo de 25 × 10 × 14 mm, arriba del centro del panel.
   - Un **Cubo** con primer **A = 25**, **L = 10**, segundo **A = 14**, marcado como **hueco** (círculo rayado).
   - Debajo, **Mover: X 0, Y 0, Z 8**.
3. **El agujero del buzzer (hueco):** un cilindro acostado que atraviesa el panel, debajo de la ventana.
   - Un **Cilindro** con el **Radio** de su tabla (en el ejemplo **6.2**), **A = 10**, **Lados = 32**, marcado como **hueco**.
   - **Acostarlo:** de **Modificar**, arrastra **Girar alrededor** debajo del cilindro. Deja **Eje x** y escribe **90** en los grados.
   - Debajo, **Mover: X 0, Y 0, Z −14** (con el signo menos).
4. **Agrupar** para que los huecos se resten: **Seleccionar todo** y **Group Selection**.
   - Ejecuta con **▷**. **✔ Revisa:** el panel tiene una ventana rectangular arriba y un agujero redondo abajo, los dos de lado a lado. Si el agujero sale parado (hacia arriba), revisa que **Girar alrededor** diga **Eje x** y **90**.
5. **Inclinar el panel:** así se ve mejor la pantalla desde la cancha.
   - Debajo de Group Selection, **Girar alrededor** con **Eje x** y **−15** grados (con el signo menos: el panel se echa hacia atrás).
   - Debajo, **Mover: X 0, Y 0, Z 27.5** (sube el panel para que quede parado sobre la base).
6. **La base:** un Cubo de 70 × 45 × 4 mm.
   - Un **Cubo** con primer **A = 70**, **L = 45**, segundo **A = 4**. Debajo, **Mover: X 0, Y 2.5, Z 2**.
7. **Unir todo:** otra vez **Seleccionar todo** y **Group Selection**. Ejecuta con **▷**.
   - **✔ Revisa:** gira la vista y míralo de lado: el panel está un poco echado hacia atrás y la base sale por delante y por detrás. Si el panel se va hacia adelante, cambia el **−15** por **15**.

8. **Exporta** `equipo_NOMBRE_soporte_marcador.stl` (**Compartir** → **.STL**, y cambia el nombre en **Descargas**).

:::pregunta id="g3t-p1"
La placa de la pantalla mide unos 27 × 27 mm, pero la ventana solo mide 25 × 14 mm. ¿Por qué no hacemos la ventana del tamaño de toda la placa?
:::

## Parte 4 · Terminar y revisar las piezas (30 min)

1. **Si les falta la portería de la Guía 2**, termínenla ahora: los pasos están en la Guía 2.
2. Abran cada diseño, ejecútenlo con **▷**, gírenlo y marquen:

:::checklist id="g3t-revision"
- [ ] Portería: las dos mitades están unidas y la ventana del fondo está abierta.
- [ ] Soporte: la ventana y el agujero del buzzer atraviesan el panel.
- [ ] Soporte: el panel está inclinado hacia atrás y apoyado en la base.
- [ ] Los dos `.stl` están en Descargas con su nombre correcto.
:::

Si terminan antes, hagan el **reto extra** de la Guía 2 (la red de la portería) o el de esta guía.

## Parte 5 · ¿Dónde va cada pieza? (15 min)

Miren el mini fútbol completo y ubiquen cada pieza:

[IMAGEN 2.1T: mini fútbol diseñado en Tinkercad, con etiquetas: portería azul, portería roja, cancha a escala, bandas laterales, pelota, soporte del marcador, Arduino y protoboard con el botón]

- Las **porterías**, una en el centro de cada lado corto, con la boca hacia la cancha y la **ventana del sensor mirando hacia la cancha**. Detrás de cada ventana va su sensor.
- La **cancha** y las **bandas laterales** se arman con cartón el sábado 4, con un hueco de 10 cm en cada lado corto para la portería.
- El **soporte del marcador**, a un lado de la cancha, mirando hacia los jugadores. La pantalla va por detrás de la ventana y el buzzer por detrás de su agujero.
- El **Arduino** y la **protoboard** con el botón de inicio, junto al soporte.

:::pregunta id="g3t-p2"
¿Qué pasaría si pegamos una portería con la ventana del sensor mirando hacia afuera de la cancha?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g3t-logramos"
- [ ] El soporte tiene la ventana de la pantalla y el agujero del buzzer.
- [ ] El agujero del buzzer tiene la medida de nuestro buzzer.
- [ ] El panel está inclinado y apoyado en la base.
- [ ] Tenemos las 2 piezas en STL: portería y soporte del marcador.
:::

## Reto extra

Escribe el **nombre del equipo** en la base del soporte, delante del panel.

Pista: en el soporte, antes del último **Seleccionar todo**, agrega de **Formas** el bloque **Texto** y escribe el nombre en su casilla. Debajo, de **Modificar**, **Definir tamaño** con **X = 60**, **Y = 8**, **Z = 1** y **Mover: X 0, Y −14, Z 4.5** (queda apoyado sobre la base, que mide 4 mm). Si el nombre es largo y las letras se ven aplastadas, escriban uno más corto.

## Bitácora (10 min)

:::pregunta id="g3t-b1"
¿Qué pieza del mini fútbol fue la más difícil de diseñar? ¿Por qué?
:::

Antes de irse, junten los 2 `.stl` en un `.zip` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí. El docente los imprimirá para el próximo sábado.

:::archivo id="g3-archivo"
**Archivo de trabajo:** suban aquí el .zip con los .stl que exportaron. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, reestructurada el 21 de octubre:** el pseudocódigo, el diagrama de flujo y el cronograma salen de esta versión; el marcador completo en Wokwi pasa a la Guía 4. La Parte 4 da tiempo a los equipos que van más lento para terminar la portería. Campos propios (g3t-…).
- El soporte del marcador es una pieza nueva de esta versión, probada en Tinkercad el 21 de octubre ("Mini futbol - modelo soporte marcador" en la cuenta del docente). Mide 70 × 45 mm de base y unos 52 mm de alto; el panel queda echado 15° hacia atrás.
- Medidas: ventana de 25 × 14 mm para la pantalla OLED de 0,96" (el vidrio mide unos 26,7 × 19,3 mm y tapa la ventana por detrás; la parte que se ilumina mide unos 22 × 11 mm). Agujero de 12,4 mm para el buzzer de 12 mm. La pantalla y el buzzer se pegan por detrás con cinta doble cara o silicona (solo en la placa, no en el vidrio).
- Imprimir esta semana: el soporte con la base sobre la cama (≈1 h); no necesita soportes.
- g3t-p1: solo debe verse la parte de la pantalla que se ilumina; la placa queda escondida detrás del panel y de ella se pega la pantalla.
- g3t-p2: el sensor quedaría mirando hacia afuera y no vería la pelota que entra en la portería: no se contarían los goles.
- Tiempo total: 5 + 10 + 45 + 30 + 15 + 5 + 10 = 120 minutos.
:::

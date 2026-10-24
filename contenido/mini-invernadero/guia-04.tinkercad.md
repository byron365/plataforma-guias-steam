---
titulo: Montar la ventana
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Montar la ventana

## Objetivo del día

Montar la bisagra y el servo impresos en el techo del invernadero y ajustar cuánto se abre la ventana.

**Al terminar tendremos:** el invernadero con una ventana que se abre y se cierra con un botón, sin forzar el servo.

## Materiales del equipo

- El invernadero del sábado 3 y el pedazo cortado del techo (la ventana)
- Piezas impresas: 2 hojas de bisagra y el soporte del servo; palito de pincho
- Servo SG90 con su brazo, un palito de paleta, botón, Arduino, protoboard, cables
- Silicona (con el docente), cinta, tijeras
- Computadora con Arduino IDE y el programa `equipo_NOMBRE_ventana` del sábado 3

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g4-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · La bisagra (25 min)

[IMAGEN 4.1T: techo del invernadero en Tinkercad con etiquetas: ventana, bisagra con sus dos hojas y el palito, palito pegado al brazo del servo, servo en su soporte bajo el techo y borde del corte]

1. Pongan las dos hojas de la bisagra una al lado de la otra, en el borde donde la ventana debe girar, con los nudillos alineados.
2. Pasen el palito de pincho por los dos nudillos y corten lo que sobre.
3. Peguen una hoja al techo y la otra a la ventana (silicona con el docente, o cinta fuerte).
   - La bisagra va en el lado de la ventana **contrario** al servo.
4. Comprueben que la ventana abre y cierra sin trabarse.
   - Ábranla con un dedo varias veces. Si se traba, revisen que el palito esté derecho y que no haya silicona en los nudillos.

:::checklist id="g4t-bisagra"
- [ ] La ventana gira sobre la bisagra sin trabarse.
- [ ] Al cerrarla, tapa el corte del techo.
:::

## Parte 3 · El servo que empuja (30 min)

1. Pega el **soporte del servo** debajo del techo, junto al corte, del lado contrario a la bisagra (el que se abre).
2. Pega un palito de paleta al brazo del servo: será la "mano" que empuja la ventana hacia arriba.
   - Encaja el brazo en el eje del servo y pega el palito encima con silicona o cinta.
   - Mete el servo en el soporte, con el eje del lado del corte.
3. Conecten el servo y el botón como el sábado 3 y suban `equipo_NOMBRE_ventana`. Al encender, el servo va a **0°**: pongan el palito acostado, justo debajo de la ventana cerrada.
4. Presionen el botón: el palito sube por el corte y empuja la ventana.
   - Si el palito no alcanza la ventana, alárguenlo o acerquen el soporte.

Muevan el servo en la animación: en 0° la ventana está cerrada.

:::animacion tipo="servo" variable="ventana" inicial="0"
:::

## Parte 4 · Ajustar la apertura (35 min)

Cambien el `60` de `ventana.write(60);` por cada número de la tabla, suban el código, abran la ventana con el botón y observen. Si el servo zumba o empuja contra algo, eso es "forzar".

:::tabla id="g4t-angulos"
| Ángulo de "abierta" | ¿Cuánto se abre la ventana? | ¿El servo fuerza o choca? |
| --- | --- | --- |
| 30 | | |
| 60 | | |
| 90 | | |
:::

Elijan el ángulo que abre bien la ventana sin forzar, déjenlo en el código y anótenlo:

:::tabla id="g4t-elegido"
| Nuestro ángulo de ventana abierta | ¿Por qué lo elegimos? |
| --- | --- |
| | |
:::

:::pregunta id="g4t-p1"
¿Qué le pasa al servo si el ángulo es demasiado grande y la ventana ya no puede abrirse más?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4t-logramos"
- [ ] La ventana tiene bisagra y abre sin trabarse.
- [ ] El servo abre y cierra la ventana con el botón.
- [ ] Elegimos el ángulo de apertura.
:::

## Reto extra

Haz que la ventana se abra **despacio**, grado por grado, con un `for`.

Pista: en vez de `ventana.write(60);`, un `for` que vaya de 0 a tu ángulo, sumando 1 cada vez, con `ventana.write(i);` y un `delay(15);` adentro.

## Bitácora (15 min)

:::foto id="g4-foto"
Foto del invernadero con la ventana abierta.
:::

:::pregunta id="g4-b1"
¿Qué problemas tuvimos con la ventana y cómo los resolvimos?
:::

Antes de irse, guarden el programa con su ángulo (**Archivo → Guardar**) y súbanlo aquí.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, nueva el 23 de octubre:** la Guía 4 normal con el cuerpo y el programa adelantados a la 3T; aquí solo se monta lo impreso y se ajusta el ángulo. Campos propios (g4t-…); la tabla de plantas, la foto y la bitácora mantienen los suyos.
- Si la caja es muy delgada y se dobla, reforzar el borde de la ventana con un marco de palitos.
- g4t-p1: el servo se queda empujando, zumba y se calienta; puede romper sus engranes o despegar la bisagra.
- La Guía 7 usa el ángulo elegido aquí (`ventana.write(…)`).
- Recordar rotar roles a partir de la guía 5.
- Tiempo total: 10 + 25 + 30 + 35 + 5 + 15 = 120 minutos.
:::

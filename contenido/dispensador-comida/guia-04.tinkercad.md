---
titulo: Armar el dispensador impreso
guia: 4
sabado: 4
sesion: Construcción del prototipo
duracion: 120
---

# Guía 4 · Armar el dispensador impreso

## Objetivo del día

Armar el dispensador con las piezas impresas, montar el servo con la compuerta y probarlo con croquetas usando el programa de la Guía 1.

**Al terminar tendremos:** el dispensador armado, soltando croquetas al presionar el botón, listo para el circuito completo de la Guía 5.

## Materiales del equipo

- Piezas impresas: torre, compuerta y embudo
- Botella pequeña (unos 600 ml), sin tapa
- Servo SG90 con sus brazos y su tornillo pequeño
- Destornillador pequeño, lija
- Arduino UNO, cable USB, protoboard, botón, LED con resistencia de 220 Ω y cables
- Croquetas, plato y una bandeja o caja (las croquetas ruedan)

## Parte 1 · Revisar las piezas impresas (15 min)

1. Quiten los restos de plástico y los soportes de impresión (pidan ayuda al docente). Lijen los bordes que raspen.
2. Prueben que cada pieza encaje, **sin pegar nada todavía**, y marquen:

:::checklist id="g4t-piezas"
- [ ] El embudo entra en el agujero de arriba y se apoya con su tapa sin tambalearse.
- [ ] La boca de la botella entra en el cuello del embudo.
- [ ] El servo entra en el hueco de la repisa hasta que sus pestañas se apoyan.
- [ ] Un brazo del servo entra en el encastre de la compuerta.
:::

- **Si algo entra muy apretado:** lijen por dentro, poco a poco, y prueben otra vez.
- **Si algo queda flojo:** una vuelta de cinta lo ajusta.

## Parte 2 · El circuito de la Guía 1 y el servo en 0° (20 min)

Antes de montar la compuerta, el servo debe estar en **0°** (compuerta cerrada). Para eso usamos el circuito y el programa de la Guía 1.

1. Con el USB **desconectado**, armen el circuito de la Guía 1:

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → D9 · Rojo → 5V · Café → GND |
| Botón | Una pata → D2 · la otra → GND |
| LED | Pata larga → 220 Ω → D4 · pata corta → GND |

2. Conecten el USB y suban el programa `equipo_NOMBRE_compuerta` de la Guía 1. Si están en otra computadora, descárguenlo del recuadro de la Guía 1.
   - En su `setup` tiene `compuerta.write(0);`: al encender, el servo va a 0°.
3. Presionen el botón una vez: el servo debe girar a 70°, esperar 1 segundo y volver a 0°.
4. Cuando el servo se quede quieto en 0°, **desconecten el USB**. Desde aquí, no giren el eje con la mano.

## Parte 3 · Montar el servo y la compuerta (30 min)

[IMAGEN 4.1T: acercamiento del dispensador en Tinkercad: salida del embudo, compuerta boca abajo, servo colgando de sus pestañas en su repisa y plato abajo]

1. **El servo:** métanlo desde arriba en el hueco de la repisa de en medio, con el **eje hacia arriba** y del lado que queda **debajo del embudo**. Bájenlo hasta que cuelgue de sus pestañas.
   - Los cables salen hacia abajo; llévenlos por detrás de la torre hacia la protoboard.
2. **El embudo:** pónganlo en el agujero de arriba, apoyado con su tapa.
3. **La compuerta:** va **boca abajo**, con la paleta arriba y el encastre abajo.
   - Metan un brazo del servo en el encastre de la compuerta.
   - Encajen el brazo en el eje del servo, con la paleta justo **debajo de la salida del embudo, tapándola**.
   - Pongan el tornillo pequeño en el centro del brazo para que no se salga.
4. **Revisen la abertura:** conecten el USB y presionen el botón. La compuerta debe correrse y **destapar** la salida sin chocar con la torre, y después volver a taparla.
   - Si la compuerta no tapa la salida en 0°: desconecten el USB, saquen el brazo del eje, gírenlo un poquito y vuelvan a encajarlo.
   - Si choca con la torre al abrir: saquen la compuerta, gírenla media vuelta en el brazo y vuelvan a montarla.

:::checklist id="g4t-revision"
- [ ] En 0° la compuerta tapa toda la salida.
- [ ] Al abrir, la salida queda libre y la compuerta no choca.
- [ ] La compuerta no roza con el embudo.
- [ ] La torre no se tambalea.
:::

## Parte 4 · La botella (10 min)

1. Marquen con plumón una línea alrededor de la botella, cerca del fondo. El docente la corta.
2. Métanla **boca abajo**, sin tapa, en el cuello del embudo. La parte cortada queda arriba: por ahí se rellena.
3. Pongan el plato sobre el pie de la torre, debajo de la salida.

## Parte 5 · Primera prueba con croquetas (30 min)

Pongan la bandeja debajo de todo. Llenen la botella hasta la mitad con croquetas.

1. Presionen el botón 5 veces, esperando entre una y otra, y anoten. Después de cada prueba, vacíen el plato.

:::tabla id="g4t-pruebas"
| Prueba | ¿Cayó comida? | ¿Se atascó? | ¿Se escapó comida con la compuerta cerrada? |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
:::

2. **Si se atasca:** en el programa, cambien `compuerta.write(70);` por `compuerta.write(90);` y súbanlo otra vez. Revisen que con 90 la compuerta no choque; si choca, regresen a 70 y avisen al docente.
3. **Si cae muy poquita comida:** cambien `delay(1000);` por `delay(2000);` y súbanlo otra vez.

:::pregunta id="g4t-p1"
¿Qué ajuste tuvieron que hacer para que el dispensador soltara bien las croquetas?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4t-logramos"
- [ ] Todas las piezas encajan.
- [ ] El servo cuelga de su repisa y la compuerta tapa la salida.
- [ ] Al presionar el botón caen croquetas al plato.
:::

## Bitácora (10 min)

:::foto id="g4t-foto"
Video corto del dispensador soltando croquetas al presionar el botón.
:::

:::pregunta id="g4t-b1"
¿Qué problema tuvieron hoy al armar el dispensador y cómo lo resolvieron?
:::

Antes de irse, guarden el programa (**Ctrl + S**) y súbanlo aquí. Dejen el dispensador armado; desconecten solo el circuito y guarden los componentes en su caja.

:::archivo id="g4-archivo"
**Archivo de trabajo:** suban aquí su código de Arduino (.ino) si lo cambiaron hoy. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad, nueva el 21 de octubre:** reemplaza la estructura de cartón y el experimento del ángulo de la versión normal. Las piezas se imprimen entre el sábado 3 y el 4 (torre ≈ 3 a 4 h, embudo ≈ 2 h, compuerta ≈ 15 min, según la impresora). Campos propios (g4t-…).
- El docente corta la botella; los estudiantes marcan la línea.
- La altura entre el brazo del servo y la compuerta depende del brazo que usen: si la paleta queda lejos de la salida, suplementar con una arandela o una gota de silicona en el encastre.
- Si el servo baila en su hueco, una gota de silicona caliente en las pestañas lo fija (con ayuda del docente).
- Si se escapa comida con la compuerta cerrada, acercar la compuerta a la salida o pegarle un pedazo de fomi.
- La versión doble también usa esta guía para el lado del cereal; la torre del líquido solo se coloca al lado (la bomba se conecta en la Guía 5 doble).
- En la Guía 5 la protoboard y el Arduino van al lado de la torre: la torre no tiene base aparte.
- Recordar rotar roles a partir del sábado 5.
- Tiempo total: 15 + 20 + 30 + 10 + 30 + 5 + 10 = 120 minutos.
:::

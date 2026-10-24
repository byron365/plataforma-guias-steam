---
titulo: La banda en 3D (1): rodillos y soportes
guia: 2
sabado: 2
sesion: Diseño 3D
duracion: 120
---

# Guía 2 · La banda en 3D (1): rodillos y soportes

## Objetivo del día

Conocer las piezas de nuestra banda y diseñar en Tinkercad Codeblocks los **rodillos** y los **soportes** del rodillo, del motor y del servo.

**Al terminar tendremos:** los dos rodillos y los tres soportes exportados en STL y listos para imprimir.

## Materiales del equipo

- Un motor TT, un servo y una regla o calibrador (para comprobar medidas)
- Computadora con internet y mouse con rueda
- Cuenta de Tinkercad (la del equipo o la que indique el docente)

## Parte 1 · Nuestra banda (10 min)

La banda va sobre una **base** de MDF o cartón grueso. Dos **rodillos** sostienen la banda de tela o goma: el del final lo mueve un **motor TT**. Las piezas pasan por un **túnel** oscuro donde el sensor IR las detecta y el sensor de color las identifica. Al final caen por el agujero del **puente de salida** a una **canaleta** que el servo gira hacia el contenedor de su color.

[IMAGEN 2.1P: banda clasificadora diseñada en Tinkercad, con etiquetas: banda, pieza, rodillo libre, soporte del rodillo, base de MDF o cartón, puente de salida, túnel del sensor, sensor de color, canaleta giratoria, motor TT, contenedores, sensor IR de llegada y soporte del motor]

Las piezas que diseñamos e imprimimos:

| Pieza | ¿Para qué sirve? | ¿Cuántas? | ¿Cuándo? |
| --- | --- | --- | --- |
| Rodillo del motor | Va en el eje del motor TT y mueve la banda | 1 | Hoy |
| Rodillo libre | Al otro extremo; gira sobre un palito de pincho | 1 | Hoy |
| Soporte del rodillo | Sostiene los palitos de los rodillos | 3 | Hoy |
| Soporte del motor | Sostiene el motor TT a la altura del rodillo | 1 | Hoy |
| Soporte del servo | Deja el servo parado en la base | 1 | Hoy |
| Túnel, puente de salida y canaleta | Sensores, caída de la pieza y desvío | 1 de cada una | Sábado 3 |

Lo que **no** se imprime: la base, la banda (tela, liga ancha o goma de 6 cm de ancho), los palitos de pincho, el motor, el servo, los sensores, los Arduino y los contenedores (vasos o cajitas de menos de 3 cm de alto).

## Parte 2 · Conociendo Tinkercad Codeblocks (15 min)

En **Codeblocks** no se dibuja con el mouse: se arma un programa con bloques (como en Scratch) y Tinkercad construye la pieza en 3D. Tinkercad funciona en internet: necesitan conexión mientras diseñan.

1. Entra a Tinkercad.
   - Abre el navegador, entra a **tinkercad.com** e inicia sesión con la cuenta que indique el docente.
   - Si la página está en inglés: baja hasta el final y en la lista de idiomas elige **Español**.
2. Crea el primer diseño.
   - Arriba a la derecha: **+ Crear → Codeblocks**. Si aparece un tutorial, ciérralo.
   - Haz clic en el nombre de arriba a la izquierda (un nombre inventado), bórralo y escribe `equipo_NOMBRE_rodillo_motor`. **Enter**. El diseño se guarda solo; lo encuentras en **Diseños → Codeblocks**.

Conoce el editor:

| Parte | Para qué sirve |
| --- | --- |
| Categorías (círculos de colores a la izquierda) | **Formas** trae las piezas (Cubo, Cilindro…); **Modificar** trae Mover, Girar, Escala, Seleccionar todo… |
| Área de programa (centro) | Ahí se arrastran y se unen los bloques, uno debajo de otro |
| Vista 3D (derecha) | Ahí aparece la pieza al ejecutar |
| Botón **▷** (abajo) | Ejecuta el programa |

| Acción | Cómo se hace |
| --- | --- |
| Agregar un bloque | Arrástralo desde la izquierda al área de programa |
| Unir bloques | Suelta un bloque justo debajo de otro, hasta que encaje |
| Borrar un bloque | Arrástralo de vuelta a la columna de bloques |
| Ver las medidas de una forma | Toca la flecha **›** del bloque |
| Cambiar un número | Clic en el número, escribe el nuevo y clic afuera. Decimales con **punto** (3.4) |
| Hacer una forma **hueca** | Toca su **círculo rayado** (el círculo de color se pone gris). Al agrupar, lo hueco se resta |
| Mirar la pieza | En la vista 3D, arrastra con el mouse para girarla (si no gira, con el botón derecho) y usa la rueda para acercar. La casita 🏠 vuelve a la vista inicial |

[IMAGEN 2.2P: editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones]

Tres reglas que vamos a usar siempre:

- **Las medidas están en milímetros.**
- Cada forma nace con su **centro** en X = 0, Y = 0, Z = 0. El bloque **Mover** (de Modificar) mueve la **última forma** que agregaste: con él la ponen en su lugar.
- El **Cubo** pide **A** (ancho, X), **L** (largo, Y), **A** (alto, Z) y **arista** (déjenla en 0). El **Cilindro** pide **Radio**, **A** (alto) y **Lados** (pongan 32 para que salga redondo).

## Parte 3 · Los rodillos (30 min)

[IMAGEN 2.3P: rodillos y soportes en Tinkercad Codeblocks, con etiquetas: agujero para el palito, rodillo del motor con el hueco del eje del TT abajo, rodillo libre, soporte del rodillo, ranura para los tornillos, soporte del motor, hueco del servo, soporte del servo y pie con agujeros para tornillos]

Los rodillos se diseñan **parados**, como se imprimen. Miden 30 mm de diámetro y 70 de largo (la banda de 6 cm y 5 mm de sobra a cada lado).

**1. Rodillo del motor** (el diseño `equipo_NOMBRE_rodillo_motor`):

1. **El rodillo:** un **Cilindro** con **Radio = 15**, **A = 70**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 35**.
2. **El hueco del eje del motor:** un **Cubo** hueco con primer **A = 3.9**, **L = 5.6**, segundo **A = 20**. Debajo, **Mover: X 0, Y 0, Z 0**.
   - Como la mitad queda bajo la mesa, el hueco solo entra 10 mm en el rodillo. El eje del TT tiene dos lados planos (3,7 mm) y 5,4 mm de diámetro: entra justo y no patina.
3. **El agujero del palito:** un **Cilindro** hueco con **Radio = 1.8**, **A = 30**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 70**.
4. **Seleccionar todo** y **Group Selection** (este bloque aparece en inglés: quiere decir "agrupar la selección"). Ejecuta con **▷**.
5. **Exporta** `equipo_NOMBRE_rodillo_motor.stl`: **Compartir** → **.STL**, y cambia el nombre en **Descargas**.

**2. Rodillo libre** (diseño nuevo, `equipo_NOMBRE_rodillo_libre`):

1. El mismo **Cilindro** con **Radio = 15**, **A = 70**, **Lados = 32** y **Mover: X 0, Y 0, Z 35**.
2. **El agujero de punta a punta:** un **Cilindro** hueco con **Radio = 2**, **A = 80**, **Lados = 32**. Debajo, **Mover: X 0, Y 0, Z 35**.
   - Es un poco más ancho que el palito de pincho (3 mm): así el rodillo gira libre sobre él.
3. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_rodillo_libre.stl`.

## Parte 4 · Los soportes (35 min)

Los soportes tienen forma de **L**: una placa parada con el agujero del eje y un pie con dos agujeros para atornillarlos (o pegarlos) a la base. El eje de los rodillos queda a **55 mm** de la base.

**3. Soporte del rodillo** (diseño `equipo_NOMBRE_soporte_rodillo`; el docente imprime **tres**):

1. **La placa:** un **Cubo** con primer **A = 30**, **L = 4**, segundo **A = 65**. Debajo, **Mover: X 0, Y 0, Z 32.5**.
2. **El pie:** un **Cubo** con primer **A = 30**, **L = 20**, segundo **A = 4**. Debajo, **Mover: X 0, Y −10, Z 2**.
3. **El agujero del palito (hueco):** un **Cilindro** con **Radio = 1.6**, **A = 10**, **Lados = 32**, hueco. Debajo, **Girar alrededor** con **Eje x** y **90** (para acostarlo), y **Mover: X 0, Y 0, Z 55**.
   - El palito entra apretado: así queda fijo y el rodillo gira sobre él.
4. **Los agujeros del pie (huecos):** dos **Cilindros** con **Radio = 2**, **A = 10**, **Lados = 32**, huecos. Uno con **Mover: X −9, Y −13, Z 2** y el otro con **Mover: X 9, Y −13, Z 2**.
5. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_soporte_rodillo.stl`.

**4. Soporte del motor** (diseño `equipo_NOMBRE_soporte_motor`):

El motor TT se atornilla a esta pieza por sus dos agujeros (están uno encima del otro, separados 17,6 mm), y su eje entra en el rodillo del motor.

1. **La oreja:** un **Cubo** con primer **A = 30**, **L = 3**, segundo **A = 70**. Debajo, **Mover: X 0, Y 0, Z 35**.
2. **El pie:** igual que el del soporte del rodillo: **Cubo** de **30 × 20 × 4** con **Mover: X 0, Y −10, Z 2**.
3. **La ranura de los tornillos (hueco):** un **Cubo** hueco con primer **A = 3.4**, **L = 10**, segundo **A = 22**. Debajo, **Mover: X 0, Y 0, Z 55**.
   - La ranura está a la altura del eje (55 mm): los dos tornillos del motor pasan por ella.
4. **Los agujeros del pie:** los mismos dos Cilindros huecos del soporte del rodillo.
5. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_soporte_motor.stl`.

:::checklist id="g2p-soportes"
- [ ] El agujero del soporte del rodillo está a 55 mm, en la placa parada.
- [ ] La ranura del soporte del motor está a la misma altura (55 mm).
- [ ] Los dos pies tienen sus dos agujeros.
:::

## Parte 5 · El soporte del servo (15 min)

El servo va **parado** en la base, con el eje hacia arriba, debajo de la canaleta. Este bloque lo rodea y lo sostiene por sus pestañas.

Diseño nuevo: `equipo_NOMBRE_soporte_servo`.

1. **El bloque:** un **Cubo** con primer **A = 32**, **L = 22**, segundo **A = 16**. Debajo, **Mover: X 0, Y 0, Z 8**.
2. **El hueco del servo:** un **Cubo** hueco con primer **A = 23.4**, **L = 12.8**, segundo **A = 20**. Debajo, **Mover: X 0, Y 0, Z 10**.
   - Atraviesa el bloque: el servo entra desde arriba y se apoya en la base. Sus pestañas quedan sobre el bloque.
3. **La salida del cable:** un **Cubo** hueco con primer **A = 8**, **L = 6**, segundo **A = 6**. Debajo, **Mover: X 14, Y 0, Z 3**.
4. **Seleccionar todo**, **Group Selection** y **exporta** `equipo_NOMBRE_soporte_servo.stl`.

:::pregunta id="g2p-p1"
¿Por qué el agujero del rodillo libre es más ancho que el palito, pero el del soporte es más angosto?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g2p-logramos"
- [ ] Exportamos los dos rodillos.
- [ ] Exportamos el soporte del rodillo y el soporte del motor.
- [ ] Exportamos el soporte del servo.
:::

## Bitácora (10 min)

:::pregunta id="g2p-b1"
¿Qué bloque de Codeblocks les costó más usar y cómo lo resolvieron?
:::

Antes de irse: suban los cinco `.stl` juntos en un `.zip` (selecciónenlos → clic derecho → **Comprimir en archivo ZIP**). El docente los imprimirá para el sábado 4.

:::archivo id="g2-archivo"
**Archivo de trabajo:** antes de irse, suban el .zip con sus .stl. Sus diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Práctica (7 sábados), nueva el 23 de octubre:** reemplaza la arquitectura (flujo, diagrama de bloques, protocolo y simulación en Wokwi) por el diseño 3D de la mecánica de la banda. Campos propios (g2p-…).
- Diseños de referencia en la cuenta del docente: "Banda clasificadora - propuesta completa", "Banda - modelo rodillos y soportes" y "Banda - modelo tunel, puente y canaleta". STL: `herramientas/banda_stl.py`.
- Medidas del motor TT tomadas del plano de Adafruit (producto 3777): eje de 5,4 mm con planos de 3,7 mm que sale 9,3 mm del cuerpo; agujeros de 3 mm separados 17,6 mm, a 22,5 mm del eje; cuerpo de 22,4 mm de alto.
- Imprimir: rodillo del motor y rodillo libre (≈ 3 h cada uno con relleno del 15 %), 3 soportes del rodillo, 1 soporte del motor y 1 soporte del servo, todos sin soportes de impresión.
- g2p-p1: el rodillo debe girar sobre el palito (holgura); el palito debe quedar fijo en el soporte (apretado).
- Medidas de la banda de la Guía 3 normal: 40 cm entre rodillos, 6 cm de ancho, rodillos de 3 cm.
- Tiempo total: 10 + 15 + 30 + 35 + 15 + 5 + 10 = 120 minutos.
:::

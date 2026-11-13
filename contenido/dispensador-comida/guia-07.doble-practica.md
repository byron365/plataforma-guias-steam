---
titulo: Armamos el dispensador doble de verdad
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Armamos el dispensador doble de verdad

## Objetivo del día

Armar el dispensador doble con las piezas impresas y los componentes reales, copiando el circuito que ya funciona en el simulador.

**Al terminar tendremos:** el dispensador doble armado, con la compuerta, la bomba y el circuito conectados, y el programa final subido al Arduino.

## Materiales del equipo

- Piezas impresas: torre del cereal, compuerta, embudo y torre del líquido
- Botella pequeña (unos 600 ml), sin tapa
- Servo SG90 con sus brazos y su tornillo pequeño
- 2 botones, LED, resistencia de 220 Ω, buzzer
- Mini bomba de agua de 5 V con su manguera, módulo relé de 5 V
- Fuente (cargador) de 5 V con plug de 5,5 × 2,1 mm y un conector jack hembra con tornillos
- Arduino UNO con su cable USB, protoboard, cables y destornillador pequeño
- Recipiente para el líquido, agua, vaso y plato, bandeja o trapo (para derrames)
- El circuito simulado abierto en Tinkercad y `equipo_NOMBRE_final.txt` (Guía 6)

> **Seguridad:** el líquido y la electrónica no se llevan bien. El Arduino, la protoboard y el relé van **del lado del cereal**, lejos del líquido. Desconecta todo antes de mover cables.

## Parte 1 · Revisar las piezas impresas (10 min)

1. Quiten los restos de plástico y los soportes de impresión (pidan ayuda al docente). Lijen los bordes que raspen.
2. Prueben que cada pieza encaje, **sin pegar nada todavía**, y marquen:

:::checklist id="g7dp-piezas"
- [ ] El embudo entra en el agujero de arriba de la torre del cereal y se apoya con su tapa.
- [ ] La boca de la botella entra en el cuello del embudo.
- [ ] El servo entra en el hueco de la repisa hasta que sus pestañas se apoyan.
- [ ] El brazo de un solo lado del servo entra en el hueco del encastre de la compuerta.
- [ ] La manguera entra a presión en el agujero del brazo de la torre del líquido.
:::

## Parte 2 · El circuito real (30 min)

Abran su circuito simulado en Tinkercad y cópienlo, con el USB desconectado y la fuente de 5 V **desenchufada**. Lo único distinto es el relé: el real es un **módulo** con pines y tornillos.

| Componente | Conexión |
| --- | --- |
| Filas de la protoboard | 5V → fila + · GND → fila − |
| Servo de la compuerta | Naranja → D9 · Rojo → fila + · Café → fila − |
| Botón del cereal | Una pata → D2 · la pata en diagonal → fila − |
| Botón del líquido | Una pata → D3 · la pata en diagonal → fila − |
| LED | Pata larga → 220 Ω → D4 · pata corta → fila − |
| Buzzer | + → D5 · − → fila − |
| Módulo relé VCC / GND / IN | fila + / fila − / **D8** |
| Jack hembra + | Relé **COM** |
| Relé **NO** | Bomba + (cable rojo) |
| Bomba − (cable negro) | Jack hembra − |

1. Marquen cada botón con un papelito o cinta: **C** (cereal) y **L** (líquido).
2. **Módulo relé:** de un lado tiene **tres pines** (VCC, GND e IN) y del otro **tres tornillos** (COM, NO y NC). Para meter un cable en un tornillo: aflójenlo con el destornillador, metan la punta pelada del cable y aprieten. **NC** no se usa.
3. **Fuente y bomba:** la fuente de 5 V se enchufa en el **jack hembra**, que tiene dos tornillos marcados **+** y **−**.
   - Un cable del tornillo **+** del jack al tornillo **COM** del relé.
   - Un cable del tornillo **NO** del relé al cable **rojo** de la bomba.
   - El cable **negro** de la bomba al tornillo **−** del jack.
   - Donde se unan dos cables pelados (por ejemplo, en los cables de la bomba), tuérzanlos juntos y cúbranlos con cinta aislante.

[IMAGEN 5.1D: circuito del dispensador doble: servo, dos botones, LED, buzzer y relé con la bomba y la fuente de 5 V en su jack hembra]

## Parte 3 · El servo en 0° (10 min)

1. Conecten el USB y suban el programa `equipo_NOMBRE_compuerta` de la Guía 1 (si están en otra computadora, descárguenlo del recuadro de la Guía 1). En su `setup` tiene `compuerta.write(0);`.
2. Cuando el servo se quede quieto en 0°, **desconecten el USB**. Desde aquí, no giren el eje con la mano.

## Parte 4 · Montar el lado del cereal (25 min)

[IMAGEN 4.1T: acercamiento del dispensador en Tinkercad: salida del embudo, compuerta boca abajo, servo colgando de sus pestañas en su repisa y plato abajo]

1. **El servo:** métanlo desde arriba en el hueco de la repisa de en medio, con el **eje hacia arriba** y del lado que queda **debajo del embudo**. Bájenlo hasta que cuelgue de sus pestañas.
2. **El embudo:** pónganlo en el agujero de arriba, apoyado con su tapa.
3. **La compuerta:** va **boca abajo**. Metan el **brazo de un solo lado** en el hueco del encastre (si queda flojo, una gota de silicona por los lados), encajen el centro del brazo en el eje con la paleta **tapando la salida del embudo** y pongan el tornillo pequeño por el **agujerito de la paleta**.
4. **La botella:** el docente la corta cerca del fondo. Métanla **boca abajo**, sin tapa, en el cuello del embudo.
5. **Revisen la abertura:** conecten el USB y presionen el botón. La compuerta debe destapar la salida sin chocar y volver a taparla.
   - Si no tapa en 0°: saquen el brazo del eje, gírenlo un poquito y vuelvan a encajarlo.
   - Si la paleta roza el embudo: avisen al docente.

## Parte 5 · Montar el lado del líquido (10 min)

1. Pongan la torre del líquido al lado de la torre del cereal, **del lado contrario** al Arduino.
2. Llenen el recipiente con agua hasta la mitad y metan la bomba **sumergida**, acostada en el fondo. Nunca la enciendan fuera del agua: se daña.
3. Pasen la manguera desde la bomba hasta el agujero del brazo y métanla a presión, apuntando al vaso.
4. Pongan el vaso en el pie de la torre del líquido y el plato en el pie de la torre del cereal.

:::checklist id="g7dp-revision"
- [ ] El Arduino, la protoboard y el relé están lejos del líquido.
- [ ] La bomba está sumergida y la manguera apunta al vaso.
- [ ] En 0° la compuerta tapa la salida del embudo.
- [ ] Los botones están marcados: C y L.
:::

## Parte 6 · El programa final (15 min)

1. Abran `equipo_NOMBRE_final.txt`, copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_final`.
2. Verifiquen (✓) y súbanlo (→).
3. Enchufen la fuente de 5 V al tomacorriente y a su jack hembra. El tomacorriente y el cargador van **lejos del agua**.
   - **Si la bomba se enciende sola sin presionar nada**, desenchufen la fuente y avisen al docente: algunos relés funcionan "al revés".
4. Presionen el botón **C** (sin cereal todavía): la compuerta se abre y se cierra. Presionen el botón **L**: la bomba echa agua al vaso.

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad.

## ¿Lo logramos? (5 min)

:::checklist id="g7dp-logramos"
- [ ] Las 4 piezas están armadas en su lugar.
- [ ] El circuito real es igual al simulado (con el módulo relé).
- [ ] La compuerta y la bomba funcionan con sus botones.
- [ ] El programa final está en el Arduino.
:::

## Bitácora (15 min)

:::foto id="g7dp-foto"
Foto del dispensador doble armado con su circuito.
:::

:::pregunta id="g7dp-b1"
¿En qué fue distinto el relé real del relé del simulador?
:::

Antes de irse, **desenchufen la fuente**, vacíen el vaso y dejen el dispensador armado.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión doble práctica:** junta el armado de la Guía 4 Tinkercad (lado del cereal) y el circuito de la Guía 5 doble en un solo sábado. Conviene tener las piezas impresas revisadas y la botella cortada antes de empezar. Campos propios (g7dp-…).
- g7dp-b1: el del simulador es un relé suelto (bobina en el pin 8); el real es un módulo con pines VCC, GND e IN y tornillos COM, NO y NC, que trae adentro lo necesario para que el pin del Arduino lo pueda encender.
- Algunos módulos relé se activan con LOW (la bomba se enciende al arrancar): en ese caso invertir HIGH y LOW en las líneas de la bomba, o usar el pin "activo alto" si el módulo lo tiene.
- Con el programa final, el dispensador sirve solo cada minuto (cereal y líquido): tener la bomba siempre sumergida mientras esté conectado.
- Compuerta nueva (12 de noviembre, ver Guía 2): la paleta queda 0,8 mm debajo de la salida y no choca con la torre al abrir. Si el brazo de la academia es más alto que el del plano y la paleta roza el embudo, poner un anillo de cartón debajo de la tapa del embudo. Las compuertas impresas antes (encastre de 5 mm) no reciben el brazo, y las torres del líquido con agujero de 7,5 mm no reciben una manguera de 8: hay que reimprimirlas.
- Si no alcanza el tiempo, la Parte 6 se hace al inicio de la Guía 8.
- Tiempo total: 10 + 30 + 10 + 25 + 10 + 15 + 5 + 15 = 120 minutos.
:::

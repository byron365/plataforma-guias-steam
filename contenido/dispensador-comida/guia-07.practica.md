---
titulo: Armamos el dispensador de verdad
guia: 7
sabado: 7
sesion: Construcción del prototipo
duracion: 120
---

# Guía 7 · Armamos el dispensador de verdad

## Objetivo del día

Armar el dispensador con las piezas impresas y los componentes reales, copiando el circuito que ya funciona en el simulador.

**Al terminar tendremos:** el dispensador armado, con el servo y la compuerta montados, el circuito conectado y el programa final subido al Arduino.

## Materiales del equipo

- Piezas impresas: torre, compuerta y embudo
- Botella pequeña (unos 600 ml), sin tapa
- Servo SG90 con sus brazos y su tornillo pequeño
- Arduino UNO con su cable USB, protoboard, botón, LED, resistencia de 220 Ω, buzzer y cables
- Destornillador pequeño, lija, plato
- El circuito simulado abierto en Tinkercad y `equipo_NOMBRE_final.txt` (Guía 6)

## Parte 1 · Revisar las piezas impresas (10 min)

1. Quiten los restos de plástico y los soportes de impresión (pidan ayuda al docente). Lijen los bordes que raspen.
2. Prueben que cada pieza encaje, **sin pegar nada todavía**, y marquen:

:::checklist id="g7p-piezas"
- [ ] El embudo entra en el agujero de arriba y se apoya con su tapa sin tambalearse.
- [ ] La boca de la botella entra en el cuello del embudo.
- [ ] El servo entra en el hueco de la repisa hasta que sus pestañas se apoyan.
- [ ] El brazo de un solo lado del servo entra en el hueco del encastre de la compuerta.
:::

- **Si algo entra muy apretado:** lijen por dentro, poco a poco, y prueben otra vez.
- **Si algo queda flojo:** una vuelta de cinta lo ajusta.

## Parte 2 · El circuito real (30 min)

Abran su circuito simulado en Tinkercad y cópienlo cable por cable, con el USB **desconectado**. Las conexiones son las mismas:

| Componente | Conexión |
| --- | --- |
| Servo | Naranja → D9 · Rojo → fila + · Café → fila − |
| Botón | Una pata → D2 · la pata en diagonal → fila − |
| LED | Pata larga → 220 Ω → D4 · pata corta → fila − |
| Buzzer | + → D5 · − → fila − |
| Filas de la protoboard | 5V → fila + · GND → fila − |

- En el servo real, los colores dicen qué es cada cable: **naranja** es la señal, **rojo** la potencia y **café** la tierra. Metan cables macho–macho en su conector.
- La pata **+** del buzzer está marcada con + o es la más larga.
- Pongan la protoboard y el Arduino al lado de la torre, en el frente, donde se vean el botón y el LED.

[IMAGEN 1.3: circuito con el servo, el botón y el LED en la protoboard]

## Parte 3 · El servo en 0° (10 min)

Antes de montar la compuerta, el servo debe estar en **0°** (compuerta cerrada).

1. Conecten el USB, abran Arduino IDE y suban el programa `equipo_NOMBRE_compuerta` de la Guía 1 (si están en otra computadora, descárguenlo del recuadro de la Guía 1). En su `setup` tiene `compuerta.write(0);`.
2. Presionen el botón una vez: el servo debe girar y volver a 0°.
3. Cuando se quede quieto en 0°, **desconecten el USB**. Desde aquí, no giren el eje con la mano.

## Parte 4 · Montar el servo y la compuerta (30 min)

[IMAGEN 4.1T: acercamiento del dispensador en Tinkercad: salida del embudo, compuerta boca abajo, servo colgando de sus pestañas en su repisa y plato abajo]

1. **El servo:** métanlo desde arriba en el hueco de la repisa de en medio, con el **eje hacia arriba** y del lado que queda **debajo del embudo**. Bájenlo hasta que cuelgue de sus pestañas. Los cables salen hacia abajo; llévenlos por detrás de la torre hacia la protoboard.
2. **El embudo:** pónganlo en el agujero de arriba, apoyado con su tapa.
3. **La compuerta:** va **boca abajo**, con la paleta arriba y el encastre abajo.
   - Metan el **brazo de un solo lado** (el más largo) en el hueco del encastre. Debe entrar justo; si queda flojo, una gota de silicona por los lados (nunca en el centro del brazo).
   - Encajen el centro del brazo en el eje del servo, con la paleta justo **debajo de la salida del embudo, tapándola**.
   - Pongan el tornillo pequeño por el **agujerito de la paleta**, con el destornillador, hasta el centro del brazo.
4. **Revisen la abertura:** conecten el USB y presionen el botón. La compuerta debe destapar la salida sin chocar con la torre y después volver a taparla.
   - Si no tapa la salida en 0°: desconecten el USB, saquen el brazo del eje, gírenlo un poquito y vuelvan a encajarlo.
   - Si la paleta roza el embudo: avisen al docente.

:::checklist id="g7p-revision"
- [ ] En 0° la compuerta tapa toda la salida.
- [ ] Al abrir, la salida queda libre y la compuerta no choca.
- [ ] La compuerta no roza con el embudo.
:::

## Parte 5 · La botella (10 min)

1. Marquen con plumón una línea alrededor de la botella, cerca del fondo. El docente la corta.
2. Métanla **boca abajo**, sin tapa, en el cuello del embudo. La parte cortada queda arriba: por ahí se rellena.
3. Pongan el plato sobre el pie de la torre, debajo de la salida.

## Parte 6 · El programa final (15 min)

1. Abran `equipo_NOMBRE_final.txt`, copien todo, péguenlo en un programa nuevo de Arduino IDE y guárdenlo como `equipo_NOMBRE_final`.
2. Verifiquen (✓) y súbanlo (→). La compuerta queda cerrada.
3. Presionen el botón una vez, **sin comida**: debe sonar el aviso, encenderse el LED y abrirse la compuerta el tiempo de su mascota.
4. Esperen un minuto sin tocar nada: debe servir sola.

Si algo no funciona igual que en el simulador, el código está bien: revisen el **cable** de ese componente comparándolo con Tinkercad.

## ¿Lo logramos? (5 min)

:::checklist id="g7p-logramos"
- [ ] Todas las piezas encajan.
- [ ] El circuito real es igual al simulado.
- [ ] El servo cuelga de su repisa y la compuerta tapa la salida.
- [ ] El programa final está en el Arduino.
:::

## Bitácora (10 min)

:::foto id="g7p-foto"
Foto del dispensador armado con su circuito.
:::

:::pregunta id="g7p-b1"
¿En qué les ayudó tener el circuito simulado al conectar el circuito real?
:::

Dejen el dispensador armado. Desconecten el USB y guarden la botella vacía.

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad práctica:** junta el armado de la Guía 4 Tinkercad y el circuito completo en un solo sábado. Conviene tener las piezas impresas revisadas (soportes quitados) y la botella cortada antes de empezar. Campos propios (g7p-…).
- Compuerta nueva (12 de noviembre, ver Guía 2): la paleta queda 0,8 mm debajo de la salida y no choca con la torre al abrir. Si el brazo de la academia es más alto que el del plano y la paleta roza el embudo, poner un anillo de cartón debajo de la tapa del embudo. Las compuertas impresas antes (encastre de 5 mm) no reciben el brazo: hay que reimprimirlas.
- Si el servo baila en su hueco, una gota de silicona caliente en las pestañas lo fija (con ayuda del docente).
- Con el programa final, el dispensador sirve solo cada minuto: avisar al equipo para que no se asusten mientras arman. Si molesta, desconectar el USB.
- Si no alcanza el tiempo, la Parte 6 se hace al inicio de la Guía 8.
- Tiempo total: 10 + 30 + 10 + 30 + 10 + 15 + 5 + 10 = 120 minutos.
:::

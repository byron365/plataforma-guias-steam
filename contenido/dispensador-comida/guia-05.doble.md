---
titulo: Cereal o líquido con dos botones
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Cereal o líquido con dos botones

## Objetivo del día

Conectar el servo, la bomba con su relé, los dos botones, el LED y el buzzer, y programar el dispensador doble: un botón sirve cereal y el otro sirve líquido.

**Al terminar tendremos:** el dispensador doble sirviendo cereal o líquido según el botón, con sonido y luz de aviso.

## Materiales del equipo

- Dispensador doble armado con las piezas impresas (torre del cereal con embudo, compuerta y servo; torre del líquido)
- 2 botones, LED con resistencia de 220 Ω, buzzer
- Mini bomba de agua de 5 V con su manguera, módulo relé de 5 V, portapilas de 4 pilas AA
- Recipiente para el líquido, vaso y plato
- Arduino UNO, protoboard, cables largos y destornillador pequeño
- Cereal y agua
- Bandeja o trapo (para derrames)

## Parte 1 · ¿Qué es un relé? (10 min)

El Arduino da muy poca corriente: no puede mover una bomba él solo. El **relé** es un **interruptor** que el Arduino enciende con una señal pequeña, y ese interruptor deja pasar la corriente de las pilas a la bomba.

Prueben la animación: enciendan y apaguen la señal del Arduino y miren qué pasa con el interruptor y la bomba.

:::animacion tipo="rele"
:::

> **Seguridad:** el líquido y la electrónica no se llevan bien. El Arduino, la protoboard y el relé van **del lado del cereal**, lejos del líquido. Desconecta todo antes de mover cables.

## Parte 2 · El circuito completo (35 min)

Hagan todo con el USB desconectado y **sin pilas** en el portapilas. Usen cables largos para que el servo y la bomba alcancen.

| Componente | Conexión |
| --- | --- |
| Servo de la compuerta | Naranja → D9 · Rojo → 5V · Café → GND |
| Botón del cereal | D2 y GND |
| Botón del líquido | D3 y GND |
| LED | 220 Ω → D4 · pata corta → GND |
| Buzzer | + → D5 · − → GND |
| Relé VCC / GND / IN | 5V / GND / **D8** |
| Pilas + | Relé **COM** |
| Relé **NO** | Bomba + (cable rojo) |
| Bomba − (cable negro) | Pilas − |

1. **Energía en la protoboard:** cable del **5V** del Arduino a la fila **+**, y de un **GND** a la fila **−**.
2. **Servo:** naranja → **D9**, rojo → fila **+**, café → fila **−**.
3. **Botones:** los dos sobre la canaleta del centro de la protoboard, separados. En cada uno, dos patas en diagonal: el del **cereal**, una → **D2** y la otra → fila **−**; el del **líquido**, una → **D3** y la otra → fila **−**.
   - Marquen cada botón con un papelito o cinta: **C** (cereal) y **L** (líquido).
4. **LED:** pata larga → resistencia de 220 Ω → **D4**; pata corta → fila **−**.
5. **Buzzer:** pata **+** (marcada con + o la más larga) → **D5**; pata **−** → fila **−**.
6. **Relé:** conozcan el módulo antes de conectar.
   - De un lado tiene **tres pines**: **VCC**, **GND** e **IN** (la señal del Arduino). VCC → fila **+**, GND → fila **−**, IN → pin **8**.
   - Del otro lado tiene **tres tornillos**: **COM**, **NO** y **NC**. Para meter un cable: aflojen el tornillo con el destornillador, metan la punta pelada del cable y aprieten. **NC** no se usa.
7. **Pilas y bomba:** el cable **rojo** del portapilas al tornillo **COM**; un cable del tornillo **NO** al cable **rojo** de la bomba; el cable **negro** de la bomba directo al cable **negro** del portapilas (tuérzanlos juntos y cúbranlos con cinta, o usen un conector).

[IMAGEN 5.1D: circuito del dispensador doble: servo, dos botones, LED, buzzer y relé con la bomba y las pilas]

Ahora el líquido:

1. Llenen el recipiente con agua hasta la mitad y metan la bomba **sumergida**, acostada en el fondo. Nunca la enciendan fuera del agua: se daña.
2. Pasen la manguera desde la bomba hasta el agujero del brazo de la torre del líquido, y métanla a presión, apuntando al vaso.
3. Pongan el vaso en el pie de la torre del líquido y el plato en el pie de la torre del cereal.

Revisen y marquen antes de poner las pilas:

:::checklist id="g5d-revision"
- [ ] El Arduino, la protoboard y el relé están lejos del líquido.
- [ ] La bomba está sumergida.
- [ ] La manguera apunta al vaso.
- [ ] Los botones están marcados: C y L.
:::

## Parte 3 · El programa (35 min)

El programa tiene **dos funciones**: `servirCereal()` mueve la compuerta y `servirLiquido()` enciende la bomba. El `loop` revisa los dos botones y llama a la función que toca.

1. Conecta el USB, abre Arduino IDE y elige **Arduino Uno** y su puerto en **Seleccionar placa**.
2. **Archivo → Nuevo boceto**, borra lo que trae y escribe este programa completo:

```cpp
#include <Servo.h>
Servo compuerta;

const int BOTON_CEREAL = 2;
const int BOTON_LIQUIDO = 3;
const int LED = 4;
const int BUZZER = 5;
const int BOMBA = 8;               // relé de la bomba
const int CERRADA = 0;
const int ABIERTA = 70;
const int TIEMPO_ABIERTA = 1000;   // ms con la compuerta abierta
const int TIEMPO_BOMBA = 2000;     // ms con la bomba encendida

void setup() {
  pinMode(BOTON_CEREAL, INPUT_PULLUP);
  pinMode(BOTON_LIQUIDO, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);        // bomba apagada
  compuerta.attach(9);
  compuerta.write(CERRADA);
}

// Sirve una porción de cereal
void servirCereal() {
  tone(BUZZER, 1500, 300);         // aviso
  digitalWrite(LED, HIGH);
  compuerta.write(ABIERTA);
  delay(TIEMPO_ABIERTA);
  compuerta.write(CERRADA);
  digitalWrite(LED, LOW);
}

// Sirve una porción de líquido
void servirLiquido() {
  tone(BUZZER, 1000, 300);         // aviso más grave
  digitalWrite(LED, HIGH);
  digitalWrite(BOMBA, HIGH);       // encender bomba
  delay(TIEMPO_BOMBA);
  digitalWrite(BOMBA, LOW);        // apagar bomba
  digitalWrite(LED, LOW);
}

void loop() {
  if (digitalRead(BOTON_CEREAL) == LOW) {
    servirCereal();
    delay(500);                    // evitar doble toque
  }
  if (digitalRead(BOTON_LIQUIDO) == LOW) {
    servirLiquido();
    delay(500);
  }
}
```

3. Guárdalo como `equipo_NOMBRE_doble` (**Archivo → Guardar como**), verifica (✓) y súbelo (→).
4. Pon las pilas en el portapilas.
   - **Si la bomba se enciende sola sin presionar nada**, desconecten las pilas y avisen al docente: algunos relés funcionan "al revés".

Fíjate en las líneas `const int …` del principio: son **constantes**, números con nombre. Para que salga más líquido, solo cambiamos `TIEMPO_BOMBA` en un lugar.

:::pregunta id="g5d-p1"
¿Qué pasaría si presionan los dos botones al mismo tiempo? Mira el `loop` y explica qué se sirve primero.
:::

## Parte 4 · Probar y ajustar (25 min)

Pongan una bandeja o un trapo debajo de todo. Llenen la botella del cereal hasta la mitad.

1. Presionen cada botón dos veces y anoten. Después de cada prueba, vacíen el plato o el vaso.

:::tabla id="g5d-pruebas"
| Prueba | Botón | ¿Sonó y se encendió el LED? | ¿Salió cereal o líquido? | ¿Se atascó o se derramó? |
| --- | --- | --- | --- | --- |
| 1 | Cereal | | | |
| 2 | Cereal | | | |
| 3 | Líquido | | | |
| 4 | Líquido | | | |
:::

2. **¿Cuánto líquido sale?** Cambien `TIEMPO_BOMBA` por el número de la fila, suban el código, presionen el botón del líquido y midan con un vaso medidor o una jeringa.

:::tabla id="g5d-bomba"
| TIEMPO_BOMBA (ms) | Mililitros en el vaso |
| --- | --- |
| 1000 | |
| 2000 | |
| 3000 | |
:::

3. Elijan el tiempo para una porción que **no rebalse** el vaso, escríbanlo en `TIEMPO_BOMBA` y suban el código otra vez.
   - Si el cereal se atasca: en la línea `const int ABIERTA = 70;` cambien el 70 por 90. Revisen que con 90 la compuerta no choque con la pared de la torre. Si choca, regresen a 70 y avisen al docente.

:::pregunta id="g5d-p2"
¿Qué tiempo eligieron para el líquido y por qué?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5d-logramos"
- [ ] El circuito está completo y el líquido está lejos de la electrónica.
- [ ] El botón C sirve cereal.
- [ ] El botón L sirve líquido.
- [ ] Elegimos el tiempo de la bomba para no rebalsar el vaso.
:::

## Reto extra

Agrega un segundo LED (verde) para el líquido, así cada lado tiene su propia luz.

Pista: conecten el LED verde con su resistencia de 220 Ω al pin **6**. En el programa agreguen `const int LED_LIQUIDO = 6;` arriba, `pinMode(LED_LIQUIDO, OUTPUT);` en el `setup()` y, en `servirLiquido()`, cambien `LED` por `LED_LIQUIDO` en las dos líneas de `digitalWrite`.

## Bitácora (10 min)

:::foto id="g5d-foto"
Video corto del dispensador sirviendo cereal y después líquido.
:::

:::pregunta id="g5d-b1"
¿Para qué sirve el relé? Explícalo con tus palabras.
:::

Antes de irse, **saquen las pilas**, guarden `equipo_NOMBRE_doble` (**Ctrl + S**) y súbanlo aquí: lo usarán el próximo sábado.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión "Doble: cereal y líquido (Tinkercad)":** mismos pines que el dispensador normal (servo D9, botón del cereal D2, LED D4, buzzer D5) más el botón del líquido en **D3** y el relé en **D8**, igual que la bomba del Mini invernadero. El programa compila (comprobado con Arduino UNO).
- La animación `conexiones` del dispensador normal tiene un solo botón y no tiene relé: por eso esta guía no la usa.
- Algunos módulos relé se activan con LOW (la bomba se enciende al arrancar): en ese caso invertir HIGH y LOW en las líneas de la bomba, o usar el pin "activo alto" si el módulo lo tiene.
- Nunca encender la bomba en seco por mucho tiempo: se daña. Si gira débil, revisar las pilas (4 AA nuevas dan unos 6 V).
- g5d-p1: el `loop` revisa primero el botón del cereal: sirve cereal, espera y en la siguiente vuelta sirve líquido si el botón sigue presionado. Nunca hace las dos cosas a la vez.
- Si la compuerta choca con la pared al abrir, el servo está girando hacia la pared: sacar la compuerta, girarla media vuelta en el brazo y volver a montarla, o probar ABIERTA más chico.
- Tiempo total: 10 + 35 + 35 + 25 + 5 + 10 = 120 minutos.
:::

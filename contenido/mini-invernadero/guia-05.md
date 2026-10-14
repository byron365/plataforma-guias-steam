---
titulo: Agua con un botón
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Agua con un botón

## Objetivo del día

Instalar la bomba de agua con su relé y regar la planta al presionar un botón, mientras el sensor nos muestra la humedad de la tierra.

**Al terminar tendremos:** riego manual funcionando y el sensor de humedad instalado en la maceta.

## Materiales del equipo

- Invernadero con ventana (sábado 4)
- Mini bomba de agua de 5 V, manguera y clip impreso
- Módulo relé de 5 V
- Portapilas de 4 pilas AA (para la bomba)
- Depósito (botella o vaso grande con agua)
- Sensor de humedad, Arduino, protoboard, cables

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g5-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · ¿Qué es un relé? (15 min)

El Arduino da muy poca corriente: no puede mover una bomba él solo. El **relé** es un **interruptor** que el Arduino enciende con una señal pequeña, y ese interruptor deja pasar la corriente de las pilas a la bomba.

Prueben la animación: enciendan y apaguen la señal del Arduino y miren qué pasa con el interruptor y la bomba.

:::animacion tipo="rele"
:::

> **Seguridad:** el agua y la electrónica no se llevan bien. El Arduino, la protoboard y el relé van **siempre** en el compartimento seco. Desconecta todo antes de mover cables.

## Parte 3 · Conectar la bomba (35 min)

Conozcan el módulo relé antes de conectar:

- De un lado tiene **tres pines**: **VCC**, **GND** e **IN** (la señal del Arduino).
- Del otro lado tiene **tres tornillos** marcados **COM**, **NO** y **NC**. Para meter un cable: aflojen el tornillo con el destornillador, metan la punta pelada del cable en el agujero y aprieten.
- **COM** es la entrada del interruptor y **NO** ("normalmente abierto") es la salida que se conecta cuando el Arduino lo enciende. **NC** no se usa.

Hagan las conexiones con el USB desconectado y **sin pilas** en el portapilas:

| Componente | Conexión |
| --- | --- |
| Relé VCC / GND / IN | 5V / GND / **D8** |
| Pilas + | Relé **COM** |
| Relé **NO** | Bomba + (cable rojo) |
| Bomba − (cable negro) | Pilas − |
| Sensor de humedad | VCC → 5V · GND → GND · AOUT → **A0** |
| Botón | **D2** y GND (el mismo del sábado 4) |

- **Relé:** VCC → fila **+** de la protoboard (5V del Arduino), GND → fila **−**, IN → pin **8**.
- **Pilas y bomba:** el cable **rojo** del portapilas al tornillo **COM**; un cable del tornillo **NO** al cable **rojo** de la bomba; el cable **negro** de la bomba directo al cable **negro** del portapilas (tuérzanlos juntos y cúbranlos con cinta, o usen un conector).
- **Sensor:** VCC → fila **+**, GND → fila **−**, AOUT → pin **A0**.
- **Botón:** se queda como el sábado 4 (D2 y GND). El servo de la ventana también se queda conectado.

[IMAGEN 5.1: conexión del relé con el Arduino, el portapilas y la mini bomba de agua]

1. Mete la bomba en el depósito (debe quedar **sumergida**).
   - Toda la bomba bajo el agua, acostada en el fondo. Nunca la enciendan fuera del agua: se daña.
2. Pasa la manguera hasta la maceta y sujétala con el clip.
   - Conecten la manguera a la salida de la bomba. Peguen el clip en la pared del invernadero, encima de la maceta, y metan la manguera a presión en el anillo, apuntando a la tierra.
3. Clava el sensor en la tierra de la maceta "Con sistema", sin pasar la línea marcada.
   - Entre la planta y la orilla, sin tocar las raíces.

[IMAGEN 5.2: bomba en el depósito, manguera sujeta con el clip sobre la maceta y sensor clavado en la tierra]

Revisen y marquen antes de poner las pilas:

:::checklist id="g5-revision"
- [ ] El Arduino y el relé están en el compartimento seco.
- [ ] La bomba está sumergida.
- [ ] La manguera apunta a la tierra.
:::

## Parte 4 · Riego manual (25 min)

1. Conecta el USB, elige **Arduino Uno** y su puerto en **Seleccionar placa**, crea un programa nuevo y escribe:

```cpp
const int BOTON = 2;
const int BOMBA = 8;
const int TIEMPO_RIEGO = 3000;   // ms

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);       // bomba apagada
  Serial.begin(9600);
}

void regar() {
  digitalWrite(BOMBA, HIGH);      // encender bomba
  delay(TIEMPO_RIEGO);
  digitalWrite(BOMBA, LOW);       // apagar bomba
}

void loop() {
  int suelo = analogRead(A0);
  Serial.println(suelo);

  if (digitalRead(BOTON) == LOW) {
    regar();
  }
  delay(500);
}
```

2. Guárdalo como `equipo_NOMBRE_riego`, verifica (✓) y súbelo (→).
3. Pon las pilas en el portapilas.
   - **Si la bomba se enciende sola sin presionar nada**, desconecten las pilas y avisen al docente: algunos relés funcionan "al revés".
4. Presiona el botón: el relé hace "clic", la bomba riega 3 segundos y se apaga.

Observa el **Monitor serie** antes y después de regar:

- Ábrelo con la lupa (arriba a la derecha), a **9600 baudios**.
- Anota el número justo antes de regar, justo después, y luego al pasar 1 y 3 minutos (usen el cronómetro del celular).

:::tabla id="g5-riego"
| Momento | Valor del sensor |
| --- | --- |
| Antes de regar | |
| Justo después de regar | |
| 1 minuto después | |
| 3 minutos después | |
:::

:::pregunta id="g5-p1"
¿El sensor cambia de inmediato o tarda un poco? ¿Por qué crees que pasa?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] La bomba está conectada con el relé.
- [ ] El botón riega la planta.
- [ ] El sensor está en la maceta y vimos cómo cambia.
:::

## Reto extra

Haz que el LED de la luz (D6) se encienda **mientras** la bomba está regando, como aviso.

Pistas: conecten el LED como en la Guía 1 (pata larga → 220 Ω → D6; pata corta → GND). En el programa necesitan `pinMode(6, OUTPUT);` en el `setup()`, y dentro de `regar()` encender el LED junto con la bomba y apagarlo junto con ella.

## Bitácora (20 min)

:::foto id="g5-foto"
Video corto del riego con el botón.
:::

:::pregunta id="g5-b1"
Explica con tus palabras para qué sirve el relé.
:::

Antes de irse: saquen las pilas del portapilas y guarden `equipo_NOMBRE_riego` (**Ctrl + S**). Súbanlo aquí: lo usarán el próximo sábado.

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Algunos módulos relé se activan con LOW (la bomba se enciende al arrancar): en ese caso invertir HIGH y LOW en el código, o usar el pin "JD-VCC/activo alto" si el módulo lo tiene.
- Nunca encender la bomba en seco por mucho tiempo: se daña.
- Si la bomba gira débil, revisar las pilas; 4 AA nuevas dan unos 6 V, adecuado para bombas de 3–6 V.
- Tiempo total: 10 + 15 + 35 + 25 + 5 + 20 = 110 minutos (10 de margen para derrames).
:::

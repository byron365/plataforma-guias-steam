---
titulo: Simulamos el riego automático
guia: 4
sabado: 4
sesion: Simulación (2)
duracion: 120
---

# Guía 4 · Simulamos el riego automático

## Objetivo del día

Simular en **Tinkercad Circuits** el riego del invernadero: el sensor de humedad de la tierra y la bomba con su relé. El invernadero riega solo cuando la tierra está seca, y también con el botón.

**Al terminar tendremos:** el riego automático funcionando en el simulador, con nuestro umbral de tierra seca elegido.

## Materiales del equipo

- Computadora con internet y la cuenta de Tinkercad del equipo
- Regla para medir las plantas
- Bitácora

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g4p-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · ¿Qué es un relé? (10 min)

El Arduino da muy poca corriente: no puede mover una bomba él solo. El **relé** es un **interruptor** que el Arduino enciende con una señal pequeña, y ese interruptor deja pasar la corriente de la fuente de 5 V a la bomba.

Prueben la animación: enciendan y apaguen la señal del Arduino y miren qué pasa con el interruptor y la bomba.

:::animacion tipo="rele"
:::

El relé tiene dos lados que **no se tocan**:

- **La bobina:** un pequeño imán que el Arduino enciende con el pin 8.
- **El interruptor:** tres contactos, **COM** (común), **NO** (abierto cuando el relé está apagado) y **NC** (cerrado cuando está apagado). Cuando la bobina se enciende, el COM se une con el NO y pasa la corriente a la bomba.

## Parte 3 · El riego en Tinkercad (35 min)

Hoy usamos **Tinkercad Circuits**, porque tiene el sensor de humedad de la tierra y el relé. El sábado 5 volvemos a Wokwi para juntar todo.

1. Entren a **tinkercad.com** con la cuenta del equipo → **+ Crear → Circuitos**. Pónganle de nombre `equipo_NOMBRE_riego_sim` (clic en el nombre de arriba a la izquierda).
2. Arrastren un **Arduino Uno R3** y una **Placa de pruebas pequeña**. Un cable del **5V** a la fila **+** y otro del **GND** a la fila **−**.
3. **El sensor:** arrastren un **Sensor de humedad del suelo** (está en **Básico**). Pasen el mouse por sus tres patas para ver su nombre: la de **potencia** va a la fila **+**, la de **tierra** a la fila **−** y la de **señal** a **A0**.
4. **El botón:** un **Pulsador** sobre la canaleta de la protoboard; dos patas en diagonal: una → **D2**, la otra → fila **−**.
5. **El relé:** en **Buscar** escriban `relé` y arrastren el **Relé SPDT** (está en **Otros componentes**). Pasen el mouse por sus patas: dos son de la **bobina** y las otras son **COM**, **NO** y **NC**.
6. **La bomba y su fuente:** en el simulador no hay bomba de agua; usamos un **Motor de CC**, que también gira con corriente. Para su energía, busquen `fuente` y arrastren la **Fuente de alimentación**; hagan clic en ella y pongan **5 V**: es la fuente de 5 V del invernadero real.
7. Conecten, como en la tabla:

| Pieza | Conexión |
| --- | --- |
| Bobina del relé | Una pata → D8 · la otra → fila − |
| Fuente: + | COM del relé |
| NO del relé | Una pata del Motor de CC |
| La otra pata del Motor de CC | Fuente: − |

- El NC no se usa.
- La fuente y el motor **no** se conectan a las filas + y − de la protoboard: van por su lado, solo a través del relé.

[IMAGEN 4.1P: riego simulado en Tinkercad Circuits: sensor de humedad del suelo en A0, pulsador en D2, relé en D8 y el motor de la bomba con la fuente de 5 V]

## Parte 4 · El programa del riego (35 min)

1. Toquen **Código**. Arriba dice **Bloques**: ábranlo y elijan **Texto**. Aparece la pregunta "¿Está seguro?": toquen **Continuar**. Borren todo (**Ctrl + A** y **Supr**) y escriban:

```cpp
const int SENSOR_SUELO = A0;
const int BOTON = 2;
const int BOMBA = 8;               // relé

// --- Ajustes del equipo ---
const int UMBRAL_SECO = 500;       // más alto = tierra más seca
const int TIEMPO_RIEGO = 3000;     // ms

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);        // bomba apagada
  Serial.begin(9600);
}

void regar() {
  digitalWrite(BOMBA, HIGH);       // encender bomba
  delay(TIEMPO_RIEGO);
  digitalWrite(BOMBA, LOW);        // apagar bomba
}

void loop() {
  // El sensor de Tinkercad sube con el agua; el nuestro sube con la tierra seca.
  // Restándolo de 1023, en el simulador también: más alto = más seco.
  int suelo = 1023 - analogRead(SENSOR_SUELO);
  Serial.println(suelo);

  bool manual = digitalRead(BOTON) == LOW;
  if (suelo > UMBRAL_SECO || manual) {
    regar();
    delay(5000);                   // el agua baja a la tierra
  }
  delay(500);
}
```

2. Toquen **Iniciar simulación** y abran el **Monitor en serie** (abajo del código).
3. Hagan clic en el sensor de humedad: aparece una barra para cambiar cuánta agua tiene la tierra. Muévanla y marquen la tabla. Cuando la bomba riega, el motor muestra sus vueltas por minuto (**RPM**).

:::tabla id="g4p-pruebas"
| Prueba | Número en el Monitor | ¿Giró el motor (la bomba)? |
| --- | --- | --- |
| Tierra muy mojada | | |
| Tierra a la mitad | | |
| Tierra muy seca | | |
| Tierra mojada y presionar el botón | | |
:::

- `||` quiere decir **o**: riega si la tierra está seca **o** si presionan el botón.

:::pregunta id="g4p-p1"
Si la tierra sigue seca después de regar, ¿qué hace el programa? ¿Para qué sirve el `delay(5000)` después de regar?
:::

## Parte 5 · Elegir el umbral (15 min)

El **umbral** es el número que separa "seca" de "húmeda". En el invernadero real lo calibraremos con tierra de verdad (Guía 8); hoy probamos cómo cambia el riego.

1. Cambien `UMBRAL_SECO` por cada número de la tabla y busquen, moviendo la barra del sensor, a partir de qué número riega.

:::tabla id="g4p-umbral"
| UMBRAL_SECO | ¿A partir de qué número del Monitor riega? | ¿Riega más seguido o menos? |
| --- | --- | --- |
| 300 | | |
| 500 | | |
| 700 | | |
:::

:::pregunta id="g4p-p2"
Si ponemos el umbral muy bajo, ¿qué le pasaría a la planta? ¿Y si lo ponemos muy alto?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4p-logramos"
- [ ] Revisamos las plantas.
- [ ] El sensor, el relé, el motor y la fuente están conectados en Tinkercad.
- [ ] Riega solo cuando la tierra está seca.
- [ ] Riega con el botón.
:::

## Reto extra

Haz que el Monitor serie escriba **"Regando..."** cuando la bomba se enciende y **"Listo"** cuando se apaga.

Pista: dos `Serial.println` dentro de `regar()`, uno al principio y otro al final.

## Bitácora (10 min)

:::pregunta id="g4p-b1"
¿Por qué la bomba lleva su propia fuente de energía y no se conecta al 5V del Arduino?
:::

El diseño queda guardado en Tinkercad (**Diseños → Circuitos**).

:::archivo id="g4-archivo"
**Archivo de trabajo:** si quieren, suban una copia del código (cópienlo del panel Código a un bloc de notas y guárdenlo como .txt) o la bitácora (.txt o .docx).
:::

:::docente
- **Versión práctica (8 sábados):** esta guía se simula en **Tinkercad Circuits** (decisión de Bairon: tiene el sensor de humedad del suelo y el relé); las guías 3 y 5 son en Wokwi. Campos propios (g4p-…).
- En Tinkercad se usan el **Sensor de humedad del suelo** (Básico), el **Relé SPDT** con la bobina directo al pin 8 (solo en el simulador; el módulo relé real trae el transistor y el diodo, por eso en la Guía 7 se conecta VCC, GND e IN), un **Motor de CC** como bomba y la **Fuente de alimentación** en 5 V.
- El sensor de Tinkercad es resistivo: su número **sube** con el agua (0 en seco, unos 850 mojado). El capacitivo real **baja** con el agua. Por eso el código usa `1023 - analogRead(SENSOR_SUELO)`: así "más alto = más seco" en los dos. En el programa final (Guía 5, Wokwi, y Guía 8, real) se lee directo con `analogRead`, porque allí el número ya sube con la tierra seca.
- g4p-p1: vuelve a regar después de 5 s, hasta que el número baje del umbral; el `delay(5000)` da tiempo a que el agua llegue a la tierra y el sensor lo note.
- g4p-p2: muy bajo → riega casi siempre y la tierra se encharca (las raíces se pudren); muy alto → la tierra se seca demasiado antes de regar.
- g4p-b1: la bomba necesita más corriente de la que da el Arduino; con su propia fuente, el Arduino no se reinicia ni se daña.
- Tiempo total: 10 + 10 + 35 + 35 + 15 + 5 + 10 = 120 minutos.
:::

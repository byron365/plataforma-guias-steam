---
titulo: Sembrar y medir
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · Sembrar y medir

## Objetivo del día

Conocer el proyecto del mini invernadero, organizar el equipo, sembrar nuestras plantas y hacer las primeras pruebas con Arduino: una luz y un sensor de humedad.

**Al terminar tendremos:** dos macetas sembradas, el equipo con roles y el Arduino diciéndonos si la tierra está seca o húmeda.

## Materiales del equipo

- 2 macetas pequeñas o vasos reciclados con agujero abajo
- Tierra y semillas de crecimiento rápido (rábano o frijol)
- Arduino UNO y cable USB
- 1 LED blanco y resistencia de 220 Ω
- Sensor de humedad de suelo (capacitivo)
- Protoboard, cables y computadora con Arduino IDE
- Etiquetas y marcador

Revisen que tienen todo. Si falta algo, pídanlo ahora al docente.

## Parte 1 · ¿Qué necesita una planta? (15 min)

Una planta necesita **agua**, **luz**, **temperatura adecuada** y **aire**. Un **invernadero** es una casa para plantas que las protege y les da lo que necesitan. El nuestro será inteligente: regará solo cuando la tierra esté seca, abrirá una ventana si hace calor y encenderá una luz.

[IMAGEN 1.1: render del mini invernadero terminado con la planta, la ventana abierta, la bomba y la luz]

Exploren la animación: cambien la humedad y la temperatura y miren qué hace el invernadero.

:::animacion tipo="invernadero"
:::

:::pregunta id="g1-p1"
¿Qué le pasa a una planta si recibe demasiada agua? ¿Y si recibe muy poca?
:::

## Parte 2 · Sembrar (20 min)

Sembraremos **dos macetas iguales**:

| Maceta | Etiqueta | ¿Cómo la cuidaremos? |
| --- | --- | --- |
| 1 | "Con sistema" | La regará el invernadero |
| 2 | "Control" | La regaremos a mano, sin sensores |

La maceta **control** sirve para comparar: al final veremos si el sistema ayudó a la planta. Por eso las dos deben ser lo más parecidas posible: misma maceta, misma tierra, mismas semillas.

Trabajen sobre papel periódico o una bandeja para no ensuciar la mesa.

1. Llena las dos macetas con tierra, sin apretar mucho.
   - Déjenles unos 2 cm libres arriba, para que el agua no se desborde al regar.
2. Haz 3 agujeros de 1 cm de profundidad y pon una semilla en cada uno.
   - Usen un lápiz: hundan la punta hasta la mitad de la uña (más o menos 1 cm). Separen los agujeros.
3. Tapa con tierra y riega un poco.
   - Medio vaso pequeño de agua en cada maceta, la misma cantidad en las dos.
4. Etiquétalas con el nombre del equipo.
   - Una etiqueta dice "Con sistema" y la otra "Control", las dos con el nombre del equipo.

[IMAGEN 1.2: dos macetas sembradas con las etiquetas "Con sistema" y "Control"]

## Parte 3 · Nuestro equipo (15 min)

Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

1. Lean qué hace cada rol y decidan quién empieza con cada uno (si son menos de cuatro, alguien tiene dos).
2. Escriban los nombres en la columna **Nombre**.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos y modelo 3D en Tinkercad (Codeblocks) | |
| Constructor | Arma el invernadero y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Bitácora, fotos, datos y cuidado de las plantas | |

3. Elijan el nombre del equipo:

Nombre de nuestro equipo: ______

## Parte 4 · La luz de crecimiento (25 min)

Conecta el LED: pata larga → resistencia 220 Ω → **D6**; pata corta → **GND**.

Hazlo con el Arduino **desconectado** de la computadora:

1. **Protoboard:** tiene en los bordes filas largas marcadas con **+** (roja) y **−** (azul o negra); todos los agujeros de una fila larga están conectados. En el centro, a cada lado de la canaleta, hay filas cortas de 5 agujeros conectados.
2. Un cable del **5V** del Arduino a la fila **+**, y otro de un **GND** a la fila **−** (los usaremos también para el sensor).
3. Clava el LED con cada pata en una fila corta distinta. La pata **larga** es la positiva.
4. Pon la resistencia de 220 Ω desde la fila de la pata larga hasta otra fila libre, y de esa fila un cable al pin **6** del Arduino (en la fila DIGITAL).
5. De la fila de la pata corta, un cable a la fila **−**.

Ahora el programa:

1. Conecta el USB y abre **Arduino IDE**. En la lista **Seleccionar placa** (arriba) elige **Arduino Uno** con su puerto (COM3, COM4…). Si no aparece: **Herramientas → Placa → Arduino AVR Boards → Arduino Uno** y **Herramientas → Puerto**.
2. **Archivo → Nuevo boceto**, borra lo que trae (Ctrl + A y Suprimir) y escribe este código (cada `;`, `{ }` y mayúscula cuentan):

```cpp
const int LUZ = 6;

void setup() {
  pinMode(LUZ, OUTPUT);
}

void loop() {
  digitalWrite(LUZ, HIGH);   // encender
  delay(3000);               // 3 segundos
  digitalWrite(LUZ, LOW);    // apagar
  delay(3000);
}
```

3. Presiona **✓ (Verificar)**. Si sale un error en rojo, revisa la línea que indica (casi siempre falta un `;`).
4. Presiona **→ (Subir)** y espera "Carga completada". El LED debe encenderse 3 segundos y apagarse 3 segundos, sin parar.

Así funciona cada instrucción:

| Instrucción | ¿Qué hace? |
| --- | --- |
| `pinMode(pin, OUTPUT)` | Prepara el pin para encender algo |
| `digitalWrite(pin, HIGH)` | Enciende |
| `digitalWrite(pin, LOW)` | Apaga |
| `delay(1000)` | Espera 1 segundo |

:::pregunta id="g1-p2"
En el invernadero real, la luz debería estar encendida muchas horas. ¿Cuántos milisegundos son 1 minuto?
:::

## Parte 5 · ¿Seca o húmeda? (25 min)

Conecta el sensor de humedad: **VCC → 5V**, **GND → GND**, **AOUT → A0**.

1. Desconecta el USB.
2. El sensor tiene tres pines con su nombre impreso. Usa tres cables: **VCC** → fila **+**; **GND** → fila **−**; **AOUT** → pin **A0** del Arduino (en la fila ANALOG IN).
3. **¡Cuidado!** El sensor tiene una línea marcada. Nunca lo metas en tierra ni en agua más arriba de esa línea: la parte de arriba tiene electrónica.

[IMAGEN 1.3: sensor de humedad de suelo capacitivo conectado a 5V, GND y A0]

4. Conecta el USB, crea un programa nuevo, borra lo que trae y escribe:

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int suelo = analogRead(A0);   // número de 0 a 1023
  Serial.println(suelo);
  delay(500);
}
```

5. Súbelo (→).

Abre el **Monitor serie** (lupa arriba a la derecha) y anota:

- Abajo a la derecha de la ventana del monitor, elige **9600 baudios** (igual que `Serial.begin(9600)`).
- Pon el sensor en cada lugar de la tabla, espera unos segundos a que el número se quede quieto y anótalo.
- Para "tierra seca", usen un poco de tierra seca en un vaso aparte. Para el vaso con agua, recuerden la línea marcada.

:::tabla id="g1-sensor"
| Dónde está el sensor | Valor |
| --- | --- |
| En el aire | |
| En tierra seca | |
| En la maceta recién regada | |
| En un vaso con agua | |
:::

:::pregunta id="g1-p3"
¿El número sube o baja cuando hay más agua?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Sembramos las dos macetas.
- [ ] Cada integrante tiene su rol.
- [ ] El LED se enciende y se apaga.
- [ ] Leímos el sensor en seco y en húmedo.
:::

## Reto extra

Haz que el LED se encienda **solo cuando la tierra está seca**, usando un `if` con el valor del sensor.

Pistas: necesitas el LED y el sensor conectados a la vez, y un programa con lo de los dos (`pinMode` del LED y `Serial.begin` en el `setup`). Mira tu tabla para elegir un número que separe "seca" de "húmeda", y usa ese número en el `if` para decidir si escribes `HIGH` o `LOW` en el LED.

## Bitácora (15 min)

:::foto id="g1-foto"
Foto de las dos macetas sembradas.
:::

:::pregunta id="g1-b1"
¿Para qué sirve la maceta control?
:::

:::pregunta id="g1-b2"
¿Qué fue lo más difícil de hoy?
:::

Antes de irse: guarden el programa del sensor (**Archivo → Guardar como** → `equipo_NOMBRE_sensor`) y súbanlo aquí. Dejen las macetas en el lugar que indique el docente.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Sembrar el primer día es clave: así habrá plantas que medir al final del proyecto.
- Las plantas se quedan en el aula: asignar un responsable de regar la maceta control (con medio vaso de agua) a mitad de semana si se puede.
- El sensor capacitivo da valores más altos en seco (≈500–600) y más bajos en húmedo (≈250–350). El resistivo da lo contrario; si usan resistivo, invertir la condición en todo el proyecto.
- g1-p2: 60 000 ms.
- No meter el sensor capacitivo en agua por encima de la línea marcada: la parte de arriba tiene electrónica.
- Tiempo total: 15 + 20 + 15 + 25 + 25 + 5 + 15 = 120 minutos.
:::

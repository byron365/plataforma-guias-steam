---
titulo: Un puente que se abre
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · Un puente que se abre

## Objetivo del día

Conocer el proyecto del puente levadizo, organizar el equipo y programar nuestro primer circuito: el semáforo de los carros.

**Al terminar tendremos:** equipo con roles, bitácora iniciada y un semáforo de tres luces funcionando con Arduino.

## Materiales del equipo

- Arduino UNO y cable USB
- LEDs verde, amarillo y rojo
- 3 resistencias de 220 Ω
- Protoboard y cables macho–macho
- Computadora con Arduino IDE
- Bitácora del equipo

Revisen que tienen todo sobre la mesa. Si falta algo, pídanlo ahora al docente.

## Parte 1 · ¿Qué vamos a construir? (15 min)

Algunos ríos tienen barcos altos que no caben debajo de los puentes. La solución: un **puente levadizo**, que se abre para que pase el barco. El más famoso es el **Tower Bridge** de Londres.

Nuestro puente será una maqueta con dos hojas que suben con servomotores. Cuando un sensor detecte un barco, sonará una alarma, el semáforo de los carros se pondrá en rojo, el puente subirá, esperará y volverá a bajar.

[IMAGEN 1.1: render del puente levadizo terminado con las dos hojas levantadas y un barco pasando]

Miren la animación de todo lo que hará nuestro puente:

:::animacion tipo="puente"
:::

:::pregunta id="g1-p1"
¿Por qué no construir el puente más alto para que pasen los barcos? Escribe una razón.
:::

## Parte 2 · Nuestro equipo (15 min)

Cada integrante tendrá un rol. Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

1. Lean qué hace cada rol y decidan quién empieza con cada uno (si son menos de cuatro, alguien tiene dos).
2. Escriban los nombres en la columna **Nombre**.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos, medidas a escala y modelo 3D en Tinkercad (Codeblocks) | |
| Constructor | Arma la estructura y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Lleva la bitácora, fotos y datos | |

3. Elijan un nombre para el equipo y escríbanlo aquí y en la portada de la bitácora.

Nombre de nuestro equipo: ______

## Parte 3 · Conociendo el LED (15 min)

Un **LED** es una luz pequeña que solo funciona en un sentido:

| Pata | Cómo reconocerla | Se conecta a |
| --- | --- | --- |
| Positiva (ánodo) | La más larga | Pin del Arduino (con resistencia) |
| Negativa (cátodo) | La más corta, lado plano | GND |

Tomen un LED y búsquenle las dos pistas: la pata más larga, y el borde plano en la orilla de la cabecita (del lado de la pata corta).

La **resistencia de 220 Ω** limita la corriente para que el LED no se queme.

[IMAGEN 1.2: LED con sus patas señaladas (larga positiva, corta negativa) y una resistencia de 220 Ω]

## Parte 4 · Armar el semáforo (25 min)

Desconecta el Arduino antes de poner cables.

**Primero, la protoboard.** En los bordes tiene filas largas marcadas con **+** (línea roja) y **−** (línea azul o negra): todos los agujeros de una fila larga están conectados. En el centro, a cada lado de la canaleta, hay filas cortas de 5 agujeros conectados entre sí.

| LED | Pin del Arduino |
| --- | --- |
| Verde | D2 |
| Amarillo | D3 |
| Rojo | D4 |

Cada LED: pata larga → resistencia → pin; pata corta → riel de GND → GND del Arduino.

1. Un cable de un pin **GND** del Arduino a la fila **−** de la protoboard (es el "riel de GND").
2. Para cada LED:
   - Clávalo con cada pata en una fila corta distinta.
   - Pon una resistencia desde la fila de la **pata larga** hasta otra fila libre.
   - De esa fila, un cable al pin del Arduino de la tabla (D2 es el pin 2 en la fila DIGITAL).
   - De la fila de la **pata corta**, un cable a la fila **−**.
3. Ordenen los LEDs como un semáforo: rojo arriba, amarillo en medio, verde abajo.

[IMAGEN 1.3: semáforo armado en la protoboard con los tres LEDs, resistencias y GND común]

Toquen cada cable de la animación para comparar con su circuito:

:::animacion tipo="conexiones" circuito="semaforo"
:::

**✔ Revisa:** sigue cada cable con el dedo. Un error muy común es que la resistencia quede en una fila distinta de la pata larga.

## Parte 5 · Programar el semáforo (30 min)

Abre Arduino IDE, copia el código y súbelo (botón de la flecha →).

1. Conecta el USB y abre **Arduino IDE**.
2. En la lista **Seleccionar placa** (arriba) elige **Arduino Uno** con su puerto (COM3, COM4…). Si no aparece: **Herramientas → Placa → Arduino AVR Boards → Arduino Uno** y **Herramientas → Puerto**.
3. **Archivo → Nuevo boceto**, borra lo que trae (Ctrl + A y Suprimir) y escribe el código con cuidado (cada `;`, `{ }` y mayúscula cuentan):

```cpp
const int VERDE = 2;
const int AMARILLO = 3;
const int ROJO = 4;

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(ROJO, OUTPUT);
}

void loop() {
  digitalWrite(VERDE, HIGH);     // verde encendido
  delay(3000);                   // espera 3 segundos
  digitalWrite(VERDE, LOW);

  digitalWrite(AMARILLO, HIGH);
  delay(1000);
  digitalWrite(AMARILLO, LOW);

  digitalWrite(ROJO, HIGH);
  delay(3000);
  digitalWrite(ROJO, LOW);
}
```

4. Presiona **✓ (Verificar)**. Si sale un error en rojo, revisa la línea que indica (casi siempre falta un `;`).
5. Presiona **→ (Subir)** y espera "Carga completada". El semáforo empieza a cambiar.

Esto hace cada instrucción:

| Instrucción | ¿Qué hace? |
| --- | --- |
| `pinMode(pin, OUTPUT)` | Prepara el pin para encender algo |
| `digitalWrite(pin, HIGH)` | Enciende |
| `digitalWrite(pin, LOW)` | Apaga |
| `delay(1000)` | Espera 1000 milisegundos (1 segundo) |

Comparen su semáforo con el de la animación:

:::animacion tipo="semaforo"
:::

:::pregunta id="g1-p2"
¿Cuántos segundos dura una vuelta completa del semáforo?
:::

**Mini reto:** cambia los tiempos para que el verde dure 5 segundos y el amarillo **parpadee** tres veces antes del rojo.

- Para el verde: cambia el número del `delay` que va después de encender el verde.
- Para el parpadeo: el amarillo tiene que encenderse y apagarse tres veces seguidas. Cada vez necesita `HIGH`, una espera corta, `LOW` y otra espera corta.
- Guarda una copia antes de cambiar: **Archivo → Guardar como** → `equipo_NOMBRE_semaforo`.

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Cada integrante tiene su rol.
- [ ] Los tres LEDs encienden.
- [ ] El semáforo cambia en el orden correcto.
- [ ] Hicimos el mini reto.
:::

## Reto extra

Agrega un segundo semáforo para los **barcos** (solo rojo y verde): cuando los carros tienen verde, los barcos tienen rojo, y al revés.

Pistas: dos LEDs más, cada uno con su resistencia, en dos pines que no estén usados. En el código, `pinMode` para cada uno, y enciendan o apaguen las luces de los barcos en los mismos momentos en que cambian las de los carros.

## Bitácora (15 min)

:::pregunta id="g1-b1"
¿Qué es un puente levadizo y para qué sirve?
:::

:::pregunta id="g1-b2"
¿Qué pasa si conectas el LED al revés?
:::

:::pregunta id="g1-b3"
¿Qué fue lo más difícil de hoy y cómo lo resolvimos?
:::

Antes de irse: guarden el programa (**Ctrl + S**), súbanlo en el recuadro de abajo y guarden los componentes en su caja.

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Mostrar un video corto del Tower Bridge abriéndose al inicio.
- Error frecuente: LED al revés o resistencia en una fila distinta de la protoboard. Revisar antes de conectar el USB.
- g1-p2: 3 + 1 + 3 = 7 segundos.
- Mini reto: dentro del amarillo, repetir 3 veces HIGH / delay(300) / LOW / delay(300).
- Tiempo total: 15 + 15 + 15 + 25 + 30 + 5 + 15 = 120 minutos.
:::

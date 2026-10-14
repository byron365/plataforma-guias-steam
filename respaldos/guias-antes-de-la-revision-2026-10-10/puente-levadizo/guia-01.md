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

## Parte 1 · ¿Qué vamos a construir? (15 min)

Algunos ríos tienen barcos altos que no caben debajo de los puentes. La solución: un **puente levadizo**, que se abre para que pase el barco. El más famoso es el **Tower Bridge** de Londres.

Nuestro puente será una maqueta con dos hojas que suben con servomotores. Cuando un sensor detecte un barco, sonará una alarma, el semáforo de los carros se pondrá en rojo, el puente subirá, esperará y volverá a bajar.

[IMAGEN 1.1: render del puente levadizo terminado con las dos hojas levantadas y un barco pasando]

:::animacion tipo="puente"
:::

:::pregunta id="g1-p1"
¿Por qué no construir el puente más alto para que pasen los barcos? Escribe una razón.
:::

## Parte 2 · Nuestro equipo (15 min)

Cada integrante tendrá un rol. Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos, medidas a escala y modelo 3D en Blender | |
| Constructor | Arma la estructura y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Lleva la bitácora, fotos y datos | |

Nombre de nuestro equipo: ______

## Parte 3 · Conociendo el LED (15 min)

Un **LED** es una luz pequeña que solo funciona en un sentido:

| Pata | Cómo reconocerla | Se conecta a |
| --- | --- | --- |
| Positiva (ánodo) | La más larga | Pin del Arduino (con resistencia) |
| Negativa (cátodo) | La más corta, lado plano | GND |

La **resistencia de 220 Ω** limita la corriente para que el LED no se queme.

[IMAGEN 1.2: LED con sus patas señaladas (larga positiva, corta negativa) y una resistencia de 220 Ω]

## Parte 4 · Armar el semáforo (25 min)

Desconecta el Arduino antes de poner cables.

| LED | Pin del Arduino |
| --- | --- |
| Verde | D2 |
| Amarillo | D3 |
| Rojo | D4 |

Cada LED: pata larga → resistencia → pin; pata corta → riel de GND → GND del Arduino.

[IMAGEN 1.3: semáforo armado en la protoboard con los tres LEDs, resistencias y GND común]

:::animacion tipo="conexiones" circuito="semaforo"
:::

## Parte 5 · Programar el semáforo (30 min)

Abre Arduino IDE, copia el código y súbelo (botón de la flecha →).

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

| Instrucción | ¿Qué hace? |
| --- | --- |
| `pinMode(pin, OUTPUT)` | Prepara el pin para encender algo |
| `digitalWrite(pin, HIGH)` | Enciende |
| `digitalWrite(pin, LOW)` | Apaga |
| `delay(1000)` | Espera 1000 milisegundos (1 segundo) |

:::animacion tipo="semaforo"
:::

:::pregunta id="g1-p2"
¿Cuántos segundos dura una vuelta completa del semáforo?
:::

**Mini reto:** cambia los tiempos para que el verde dure 5 segundos y el amarillo **parpadee** tres veces antes del rojo.

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Cada integrante tiene su rol.
- [ ] Los tres LEDs encienden.
- [ ] El semáforo cambia en el orden correcto.
- [ ] Hicimos el mini reto.
:::

## Reto extra

Agrega un segundo semáforo para los **barcos** (solo rojo y verde): cuando los carros tienen verde, los barcos tienen rojo, y al revés.

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

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Mostrar un video corto del Tower Bridge abriéndose al inicio.
- Error frecuente: LED al revés o resistencia en una fila distinta de la protoboard. Revisar antes de conectar el USB.
- g1-p2: 3 + 1 + 3 = 7 segundos.
- Mini reto: dentro del amarillo, repetir 3 veces HIGH / delay(300) / LOW / delay(300).
- Tiempo total: 15 + 15 + 15 + 25 + 30 + 5 + 15 = 120 minutos.
:::

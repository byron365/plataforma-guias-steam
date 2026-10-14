---
titulo: Inclinar el mundo
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Inclinar el mundo

## Objetivo del día

Investigar dónde se usan las plataformas que se inclinan en dos ejes y resolver un reto: trampas en el laberinto o un récord que no se borra al apagar.

**Al terminar tendremos:** la investigación completa y una nueva función en el laberinto.

## Materiales del equipo

- Laberinto completo
- Computadora con internet y Arduino IDE
- Para trampas: segundo sensor infrarrojo

## Parte 1 · Investigación (25 min)

:::tabla id="g12-investigacion"
| Aplicación | ¿Qué se inclina o estabiliza? | ¿Para qué sirve? |
| --- | --- | --- |
| Estabilizador de cámara (gimbal) | | |
| Simulador de vuelo o de carreras | | |
| Antena satelital o panel solar que sigue al sol | | |
| Telescopio | | |
| Barco o plataforma en el mar | | |
:::

:::pregunta id="g12-p1"
¿Cuál de estas aplicaciones se parece más a nuestro laberinto? Explica por qué.
:::

[IMAGEN 12.1: seguidor solar de dos ejes inclinando un panel solar hacia el sol]

## Parte 2 · Elijan un reto (75 min)

:::opciones id="g12-reto"
¿Qué reto eligió el equipo?
- Reto 1 · Trampas en el laberinto
- Reto 2 · Récord que no se borra (EEPROM)
:::

### Reto 1 · Trampas

Hagan un **agujero** en un pasillo del laberinto (en la v2 o perforando con cuidado) y pongan debajo un segundo sensor IR en **D4**. Si la canica pasa por ahí, la partida se pierde.

```cpp
const int TRAMPA = 4;
// en setup:
pinMode(TRAMPA, INPUT);
// en el loop, mientras se juega:
if (digitalRead(TRAMPA) == LOW) {
  jugando = false;
  tone(BUZZER, 200, 1000);      // sonido grave de derrota
  mostrar("Trampa!", "Perdiste");
  servoX.write(CENTRO);
  servoY.write(CENTRO);
  delay(3000);
}
```

[IMAGEN 12.2: agujero trampa en un pasillo del laberinto con el segundo sensor infrarrojo debajo]

### Reto 2 · Récord en la EEPROM

La **EEPROM** es una memoria del Arduino que **no se borra al apagarlo**. Guardaremos ahí el récord.

```cpp
#include <EEPROM.h>

// en setup, al final:
EEPROM.get(0, record);                     // leer el récord guardado
if (record == 0xFFFFFFFF) record = 0;      // EEPROM vacía

// cuando hay récord nuevo, después de record = t;
EEPROM.put(0, record);                     // guardarlo
```

:::animacion tipo="eeprom"
:::

Prueba: hagan un récord, desconecten el Arduino, vuelvan a conectarlo. ¿Sigue el récord?

:::pregunta id="g12-p2"
Describe cómo probaron el reto y si funcionó.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Completamos la investigación.
- [ ] El reto elegido funciona.
- [ ] Probamos que el resto del juego sigue funcionando.
:::

## Reto extra

Haz las dos cosas: trampas **y** récord en la EEPROM. Agrega una forma de **borrar** el récord: mantener presionado el botón del joystick 5 segundos al encender.

## Bitácora (15 min)

:::pregunta id="g12-b1"
¿Qué diferencia hay entre la memoria RAM y la EEPROM?
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- EEPROM: tiene un límite de unas 100 000 escrituras por posición; por eso solo se guarda cuando hay récord nuevo, no en cada vuelta.
- `record` es `unsigned long` (4 bytes): `EEPROM.get/put` lo maneja completo.
- Reto 1: la trampa debe estar en un pasillo que no sea el camino obligatorio, o el juego será imposible.
- Si no hay segundo sensor, la trampa se simula en Wokwi con un botón.
- Tiempo total: 25 + 75 + 5 + 15 = 120 minutos.
:::

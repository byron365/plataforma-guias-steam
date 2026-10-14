---
titulo: Más precisión y un contador
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Más precisión y un contador

## Objetivo del día

Mejorar la precisión de las porciones y agregar un contador de comidas del día con LEDs.

**Al terminar tendremos:** el dispensador más preciso y mostrando cuántas comidas ha servido.

## Materiales del equipo

- Dispensador completo, báscula
- 3 LEDs y 3 resistencias de 220 Ω

## Parte 1 · Porciones en pasos pequeños (45 min)

Abrir mucho tiempo de una sola vez deja caer la comida "a chorros" y varía mucho. Si en vez de eso abrimos en **pasos pequeños** de 200 ms, cada paso deja caer poquita comida y la porción es más pareja.

```cpp
void servirEnPasos(int gramos) {
  int pasos = (gramos * MS_POR_GRAMO) / 200;   // cuántos pasos de 200 ms
  tone(BUZZER, 1500, 300);
  digitalWrite(LED, HIGH);
  for (int i = 0; i < pasos; i++) {
    compuerta.write(ABIERTA);
    delay(200);
    compuerta.write(CERRADA);
    delay(150);                    // dejar que la comida se acomode
  }
  digitalWrite(LED, LOW);
}
```

:::animacion tipo="pasos-porcion"
:::

Compara los dos métodos con **50 g**:

:::tabla id="g11-precision"
| Intento | Una sola apertura (g) | En pasos (g) |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| Diferencia mayor con 50 g | | |
:::

:::pregunta id="g11-p1"
¿Cuál método fue más preciso? Si sirve de menos en pasos, ¿qué número cambiarías?
:::

## Parte 2 · Contador de comidas (40 min)

Tres LEDs muestran las comidas del día: 1 LED = 1 comida, 2 LEDs = 2 comidas, 3 LEDs = 3 comidas.

| LED | Pin |
| --- | --- |
| Comida 1 | D6 |
| Comida 2 | D7 |
| Comida 3 | D8 |

El código final ya cuenta las comidas en la variable `comidasHoy` (la suma dentro de `servir()`). Solo falta mostrarlas:

```cpp
void mostrarComidas() {
  digitalWrite(6, comidasHoy >= 1);
  digitalWrite(7, comidasHoy >= 2);
  digitalWrite(8, comidasHoy >= 3);
}

// al final de servir(), después de comidasHoy++:
mostrarComidas();
```

No olvides `pinMode(6, OUTPUT);` (y 7 y 8) en el `setup()`.

[IMAGEN 11.1: frente del dispensador con tres LEDs indicando las comidas del día]

:::pregunta id="g11-p2"
Después de 3 comidas, ¿qué debería pasar al día siguiente? ¿Cómo lo programarías?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Probamos servir en pasos.
- [ ] Comparamos la precisión de los dos métodos.
- [ ] El contador de comidas funciona.
:::

## Reto extra

Si `comidasHoy` llega a 3, el dispensador **no sirve más** aunque presionen el botón, y el buzzer da un pitido grave. Así la mascota no come de más.

## Bitácora (15 min)

:::foto id="g11-foto"
Foto del dispensador con el contador encendido.
:::

:::pregunta id="g11-b1"
¿Por qué la precisión es importante para la salud de una mascota?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g11-p2: reiniciar `comidasHoy = 0` cada 24 horas (en clase, cada 3 o 4 intervalos).
- Si los pasos son muy cortos, el servo no alcanza a abrir: no bajar de 150 ms.
- Reto: `if (comidasHoy >= 3) { tone(BUZZER, 300, 500); return; }` al inicio de `servir()`.
- Tiempo total: 45 + 40 + 5 + 15 = 105 minutos (15 de margen para pesar).
:::

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

Para comparar, usaremos el programa del reto de los 50 g (Guía 10), que sirve 50 g de una sola vez:

1. Abran `equipo_NOMBRE_gramos` y guárdenlo como `equipo_NOMBRE_pasos` (**Archivo → Guardar como**).
2. Escriban la función `servirEnPasos` completa (abajo) después de la llave `}` que cierra `servirGramos`.

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

¿Qué hace? Calcula cuántos pasos de 200 ms caben en el tiempo total. El `for` repite ese número de veces: abrir 200 ms, cerrar y esperar 150 ms.

Miren en la animación la diferencia entre abrir de una vez y abrir en pasos:

:::animacion tipo="pasos-porcion"
:::

Compara los dos métodos con **50 g**:

3. **Una sola apertura:** en el `loop` debe decir `servirGramos(50);`. Súbanlo, sirvan 5 veces y pesen cada porción (columna "Una sola apertura").
4. **En pasos:** en el `loop`, cambien `servirGramos(50);` por `servirEnPasos(50);`. Súbanlo, sirvan 5 veces y pesen (columna "En pasos").
5. En la última fila, escriban para cada método la diferencia más grande con 50 g (sin el signo menos).

Recuerden: botella siempre hasta la misma raya, tara antes de pesar, y devolver las croquetas después de cada intento.

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

**Conectar los LEDs** (con el USB desconectado). Para cada uno: pata larga → resistencia de 220 Ω → su pin; pata corta → fila **−** (GND) de la protoboard.

| LED | Pin |
| --- | --- |
| Comida 1 | D6 |
| Comida 2 | D7 |
| Comida 3 | D8 |

El código final ya cuenta las comidas en la variable `comidasHoy` (la suma dentro de `servir()`). Solo falta mostrarlas:

1. Abran el programa final (`equipo_NOMBRE_final`, Guía 8) y guárdenlo como `equipo_NOMBRE_contador`.
2. Escriban la función `mostrarComidas` (las primeras cinco líneas de abajo) después de la llave `}` que cierra `servir()`.
3. Dentro de `servir()`, busquen la línea `comidasHoy++;` y escriban justo debajo `mostrarComidas();`.

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

4. En el `setup()`, debajo de `pinMode(BUZZER, OUTPUT);`, escriban tres líneas: `pinMode(6, OUTPUT);`, `pinMode(7, OUTPUT);` y `pinMode(8, OUTPUT);`.
5. Suban el código y sirvan tres veces con el botón: en cada comida se enciende un LED más.

¿Qué hace `comidasHoy >= 1`? Es una pregunta que da **verdadero** (enciende el LED) o **falso** (lo apaga). Por eso cada LED se enciende cuando ya hubo esa cantidad de comidas.

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

Pista: al principio de `servir()` hay que preguntar si `comidasHoy` ya llegó a 3. Si es así, sonar un tono grave (un número pequeño en `tone`, como 300) y salir de la función sin servir. Para salir de una función se usa `return;`.

## Bitácora (15 min)

:::foto id="g11-foto"
Foto del dispensador con el contador encendido.
:::

:::pregunta id="g11-b1"
¿Por qué la precisión es importante para la salud de una mascota?
:::

Antes de irse, suban `equipo_NOMBRE_contador` (y, si quieren, `equipo_NOMBRE_pasos`) en el recuadro de abajo.

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g11-p2: reiniciar `comidasHoy = 0` cada 24 horas (en clase, cada 3 o 4 intervalos).
- Si los pasos son muy cortos, el servo no alcanza a abrir: no bajar de 150 ms.
- Reto: `if (comidasHoy >= 3) { tone(BUZZER, 300, 500); return; }` al inicio de `servir()`.
- Tiempo total: 45 + 40 + 5 + 15 = 105 minutos (15 de margen para pesar).
:::

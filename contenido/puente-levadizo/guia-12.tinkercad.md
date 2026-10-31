---
titulo: La misma lógica en otros lugares
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · La misma lógica en otros lugares

## Objetivo del día

Descubrir dónde más se usa la lógica "detectar → avisar → mover → esperar → regresar" y copiar dos ideas de esos sistemas en nuestro puente: las luces de un cruce de tren y la seguridad de una puerta automática.

**Al terminar tendremos:** la ficha de aplicaciones y el puente con luces intermitentes y que vuelve a subir si llega otro barco.

## Materiales del equipo

- Puente completo
- El barco y otro objeto que haga de "segundo barco" (una caja pequeña o la mano)
- Computadora con Arduino IDE

## Parte 1 · ¿Dónde más se usa? (25 min)

Para cada lugar, piensen (o busquen en internet) qué detecta el sistema, cómo avisa a las personas y qué parte se mueve. Por ejemplo, en el puente: detecta un barco, avisa con el semáforo y la alarma, y se mueven las hojas.

:::tabla id="g12-aplicaciones"
| Lugar | ¿Qué detecta? | ¿Cómo avisa? | ¿Qué se mueve? |
| --- | --- | --- | --- |
| Barrera de un parqueo | | | |
| Cruce de tren | | | |
| Puerta automática de un supermercado | | | |
| Esclusas de un canal (como el de Panamá) | | | |
:::

[IMAGEN 12.1: barrera de un cruce de tren bajando con luces rojas encendidas]

:::pregunta id="g12-p1"
¿Qué tienen en común todos estos sistemas con nuestro puente?
:::

## Parte 2 · Luces de cruce de tren (30 min)

En un cruce de tren, mientras pasa el tren, la luz roja **parpadea** y suena una alarma con pitidos. Vamos a hacer lo mismo mientras el puente está arriba.

Abran su programa más reciente del puente y guárdenlo como `equipo_NOMBRE_aplicaciones`.

1. En `secuenciaPuente()`, busquen la línea `delay(TIEMPO_ARRIBA);` (está entre la subida y la bajada del puente).
2. Bórrenla y escriban en su lugar:

```cpp
// Mientras el puente está arriba: rojo intermitente y pitidos, como un cruce de tren
for (int i = 0; i < TIEMPO_ARRIBA / 500; i++) {
  digitalWrite(ROJO, LOW);
  tone(BUZZER, 800, 100);
  delay(250);
  digitalWrite(ROJO, HIGH);
  delay(250);
}
```

3. Suban el código y pasen el barco. Con las hojas arriba, la luz roja debe parpadear y sonar un pitido en cada parpadeo.

:::pregunta id="g12t-p1"
Con `TIEMPO_ARRIBA = 4000`, ¿cuántas vueltas da el `for`? ¿Cuánto tiempo pasa el puente arriba?
:::

## Parte 3 · Como una puerta automática (45 min)

Si alguien se acerca mientras una puerta automática se está cerrando, la puerta **vuelve a abrirse**. Nuestro puente debería hacer lo mismo: si llega otro barco mientras las hojas bajan, tienen que subir otra vez.

1. Agreguen esta función nueva al final del programa, fuera de las demás funciones:

```cpp
// Baja las hojas, pero si llega otro barco las vuelve a subir (como una puerta automática)
void bajarConCuidado() {
  int a = ANGULO_ARRIBA;
  while (a > 0) {
    long d = medirDistancia();
    if (d > 0 && d < DISTANCIA_BARCO) {   // ¡otro barco!
      moverPuente(a, ANGULO_ARRIBA);       // volver a subir
      delay(TIEMPO_ARRIBA);
      a = ANGULO_ARRIBA;
    }
    a--;
    ponerAngulo(a);
    delay(VELOCIDAD);
  }
}
```

2. En `secuenciaPuente()`, cambien la línea `moverPuente(ANGULO_ARRIBA, 0);` por:

```cpp
bajarConCuidado();
```

3. Suban el código y hagan las pruebas de la tabla. Para la segunda y la tercera, pongan el "segundo barco" frente al sensor mientras las hojas van bajando.

:::tabla id="g12t-pruebas"
| Prueba | ¿Qué pasó? | ¿Funciona? |
| --- | --- | --- |
| Pasa un barco solo: sube, espera y baja | | |
| Llega otro barco mientras las hojas bajan: vuelven a subir | | |
| Después del segundo barco, las hojas bajan hasta el final y vuelve el verde | | |
:::

:::pregunta id="g12t-p2"
¿Por qué es más seguro que el puente vuelva a subir, en lugar de terminar de bajar?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g12t-logramos"
- [ ] Completamos la tabla de aplicaciones.
- [ ] La luz roja parpadea con pitidos mientras el puente está arriba.
- [ ] Si llega otro barco mientras bajan, las hojas vuelven a subir.
:::

## Reto extra

Haz que la luz **amarilla** también parpadee durante el aviso, antes de que se encienda el rojo.

Pista: igual que en la Parte 2, cambien el `delay(2000);` del aviso por un `for` que apague y encienda el amarillo. Hagan que el tiempo total siga siendo de unos 2 segundos.

## Bitácora (15 min)

:::foto id="g12t-foto"
Video del puente volviendo a subir cuando llega otro barco.
:::

:::pregunta id="g12-b1"
Propón otra aplicación de nuestro sistema que no esté en la tabla.
:::

Antes de irse, suban `equipo_NOMBRE_aplicaciones` aquí.

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- **Versión Tinkercad:** se quitó la barrera con un tercer servo para no comprar piezas (decisión de Bairon). Las dos mejoras salen de la tabla de aplicaciones (cruce de tren y puerta automática) y son solo de código. Campos propios: g12t-….
- g12t-p1: 4000 / 500 = 8 vueltas de 500 ms (250 + 250) = 4 segundos, igual que antes. Si hicieron el reto de la Guía 5 (alarma intermitente), ya tienen algo parecido.
- `bajarConCuidado()` mide la distancia en cada grado; cuando no hay eco, `pulseIn` espera hasta 30 ms, así que la bajada queda un poco más lenta. Es normal.
- El barco que ya pasó no vuelve a abrir el puente: el sensor está antes de las hojas, y el barco ya lo dejó atrás.
- g12t-p2: si el puente terminara de bajar, el barco que llega chocaría con las hojas; volver a subir lo protege (como la puerta automática protege a las personas).
- Si hicieron el botón de emergencia (Guía 11, opción B), no actúa durante `bajarConCuidado()` porque está dentro de `moverPuente()`; un equipo rápido puede copiar el mismo `if` dentro del `while`.
- Hablar del Canal de Panamá como ejemplo cercano de esclusas.
- Tiempo total: 25 + 30 + 45 + 5 + 15 = 120 minutos.
:::

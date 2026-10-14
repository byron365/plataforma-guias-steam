---
titulo: Puente versión 2.0
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Puente versión 2.0

## Objetivo del día

Corregir lo que falló en la presentación y agregar una mejora: un contador de barcos o un botón de emergencia.

**Al terminar tendremos:** el puente corregido y con una mejora nueva funcionando.

## Materiales del equipo

- Puente completo
- Lista de mejoras del sábado 10
- LEDs extra y resistencias (contador) o un botón (emergencia)

## Parte 1 · Corregir fallas (35 min)

Trabajen en las mejoras de la lista del sábado 10:

:::tabla id="g11-correcciones"
| Problema | ¿Qué hicimos? | ¿Quedó resuelto? |
| --- | --- | --- |
| | | |
| | | |
| | | |
:::

## Parte 2 · Una mejora nueva (60 min)

:::opciones id="g11-mejora"
¿Qué mejora eligió el equipo?
- A · Contador de barcos con LEDs
- B · Botón de emergencia
:::

### Opción A · Contador de barcos

Tres LEDs extra (en los pines A1, A2 y A3, que también funcionan como pines digitales) muestran cuántos barcos han pasado: 1 barco = 1 LED, 2 = 2 LEDs, 3 = 3 LEDs. Con el cuarto, se reinicia.

```cpp
int barcos = 0;   // arriba, fuera del loop

// al final de secuenciaPuente():
barcos++;
if (barcos > 3) barcos = 0;
digitalWrite(A1, barcos >= 1);
digitalWrite(A2, barcos >= 2);
digitalWrite(A3, barcos >= 3);
```

Recuerda poner `pinMode(A1, OUTPUT);` (y A2 y A3) en el `setup()`.

:::pregunta id="g11-p1"
¿Qué hace la línea `digitalWrite(A2, barcos >= 2);`?
:::

### Opción B · Botón de emergencia

Si algo sale mal (un barco atorado, un carro en el puente), un botón **rojo** detiene todo: semáforo en rojo, alarma y el puente se queda donde está hasta presionarlo otra vez.

Conecta el botón entre **D12** y **GND**, y pon `pinMode(12, INPUT_PULLUP);` en el `setup()`. Dentro del `for` de `moverPuente()`:

```cpp
if (digitalRead(12) == LOW) {        // emergencia
  digitalWrite(ROJO, HIGH);
  tone(BUZZER, 400);                  // alarma continua
  delay(500);
  while (digitalRead(12) == HIGH) {}  // esperar a que lo presionen otra vez
  noTone(BUZZER);
  delay(500);
}
```

[IMAGEN 11.1: botón rojo de emergencia colocado junto al puente]

:::pregunta id="g11-p2"
¿Por qué los puentes y máquinas reales tienen botón de emergencia?
:::

## Parte 3 · Prueba final (10 min)

:::checklist id="g11-pruebas"
- [ ] La mejora funciona.
- [ ] El puente sigue abriéndose con el barco.
- [ ] Hicimos 5 pasadas sin fallar.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Corregimos al menos una falla.
- [ ] Hicimos una mejora nueva.
- [ ] Probamos el puente completo.
:::

## Bitácora (10 min)

:::foto id="g11-foto"
Video del puente versión 2.0.
:::

:::pregunta id="g11-b1"
¿Qué aprendimos al corregir las fallas?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Opción A: `digitalWrite` acepta true/false; `barcos >= 2` es true cuando hay 2 o más barcos.
- Opción B: el `while` vacío es la primera vez que lo ven; explicarlo como "quedarse esperando".
- Equipos rápidos pueden hacer ambas opciones.
- Tiempo total: 35 + 60 + 10 + 5 + 10 = 120 minutos.
:::

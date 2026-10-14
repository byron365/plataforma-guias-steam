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

1. Abran su lista de mejoras (Guía 10, Parte 4) y empiecen por la de prioridad más alta.
2. Antes de cambiar el código, guárdenlo con otro nombre: **Archivo → Guardar como** → `equipo_NOMBRE_v2`.
3. Para cada problema, escriban qué hicieron (por ejemplo, "reforzamos la hoja con un palito" o "cambiamos DISTANCIA_BARCO a 15") y prueben con el barco si quedó resuelto.

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

**Conectar** (con el USB desconectado): cada LED con su pata larga → resistencia de 220 Ω → su pin (**A1**, **A2** o **A3**, en la fila ANALOG IN del Arduino); pata corta → fila **−** (GND).

**Código** (las piezas van en lugares distintos de `equipo_NOMBRE_v2`):

1. `int barcos = 0;` va arriba, debajo de las constantes (fuera de cualquier función).
2. Las líneas de "al final de secuenciaPuente()" van dentro de `secuenciaPuente()`, justo antes de su llave de cierre `}`.
3. Las tres líneas `pinMode(A1, OUTPUT);`, `pinMode(A2, OUTPUT);` y `pinMode(A3, OUTPUT);` van dentro del `setup()`.

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

4. Suban el código y pasen el barco cuatro veces: después de cada pasada debe encenderse un LED más, y con la cuarta se apagan todos.

:::pregunta id="g11-p1"
¿Qué hace la línea `digitalWrite(A2, barcos >= 2);`?
:::

### Opción B · Botón de emergencia

Si algo sale mal (un barco atorado, un carro en el puente), un botón **rojo** detiene todo: semáforo en rojo, alarma y el puente se queda donde está hasta presionarlo otra vez.

Conecta el botón entre **D12** y **GND**, y pon `pinMode(12, INPUT_PULLUP);` en el `setup()`. Dentro del `for` de `moverPuente()`:

- **Botón:** sobre la canaleta del centro de la protoboard, dos patas en diagonal: una → pin **12**, la otra → fila **−**.
- **Código:** en `moverPuente()`, el `for` tiene dentro dos líneas (`ponerAngulo(a);` y `delay(VELOCIDAD);`). Escriban el bloque de abajo justo después de `delay(VELOCIDAD);`, todavía dentro de las llaves del `for`.

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

- **Para usarlo:** mientras el puente sube o baja, den un toque corto al botón (presionar y soltar enseguida): el puente se detiene y suena la alarma. Para seguir, otro toque corto. Si lo dejan presionado, el programa lo cuenta otra vez.
- El botón solo actúa mientras las hojas se mueven (está dentro de `moverPuente()`).

[IMAGEN 11.1: botón rojo de emergencia colocado junto al puente]

:::pregunta id="g11-p2"
¿Por qué los puentes y máquinas reales tienen botón de emergencia?
:::

## Parte 3 · Prueba final (10 min)

Suban el código final y prueben: la mejora, el puente con el barco y cinco pasadas seguidas sin cambiar nada.

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

Antes de irse, guarden `equipo_NOMBRE_v2` (**Ctrl + S**) y súbanlo aquí.

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Opción A: `digitalWrite` acepta true/false; `barcos >= 2` es true cuando hay 2 o más barcos.
- Opción B: el `while` vacío es la primera vez que lo ven; explicarlo como "quedarse esperando".
- Equipos rápidos pueden hacer ambas opciones.
- Tiempo total: 35 + 60 + 10 + 5 + 10 = 120 minutos.
:::

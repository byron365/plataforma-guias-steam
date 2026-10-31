---
titulo: Puente versión 2.0
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Puente versión 2.0

## Objetivo del día

Corregir lo que falló en la presentación y agregar una mejora con las piezas que ya tiene el puente: un contador de barcos o un botón de emergencia.

**Al terminar tendremos:** el puente corregido y con una mejora nueva funcionando.

## Materiales del equipo

- Puente completo (con su botón del sábado 5)
- Lista de mejoras del sábado 10
- Computadora con Arduino IDE

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

Las dos mejoras se hacen solo con código: no hace falta conectar piezas nuevas.

:::opciones id="g11t-mejora"
¿Qué mejora eligió el equipo?
- A · Contador de barcos
- B · Botón de emergencia
:::

### Opción A · Contador de barcos

El puente cuenta cuántos barcos han pasado. Lo escribe en el **Monitor serie** y, después de cada barco, la luz **verde parpadea** una vez por cada barco: 1 barco = 1 parpadeo, 2 barcos = 2 parpadeos…

**Código** (las piezas van en lugares distintos de `equipo_NOMBRE_v2`):

1. `int barcos = 0;` va arriba, debajo de las constantes (fuera de cualquier función).
2. Las demás líneas van dentro de `secuenciaPuente()`, justo antes de su llave de cierre `}`.

```cpp
int barcos = 0;   // arriba, fuera de las funciones

// al final de secuenciaPuente():
barcos++;
Serial.print("Barcos que han pasado: ");
Serial.println(barcos);
for (int i = 0; i < barcos; i++) {   // un parpadeo del verde por cada barco
  digitalWrite(VERDE, LOW);
  delay(200);
  digitalWrite(VERDE, HIGH);
  delay(200);
}
```

3. En el `loop`, pongan `//` delante de `Serial.println(d);`. Así esa línea queda como comentario y el Monitor serie ya no se llena de distancias: solo muestra el contador.
4. Suban el código, abran el Monitor serie y pasen el barco tres veces. Después de cada pasada revisen el número del Monitor y cuenten los parpadeos del verde.

:::pregunta id="g11t-p1"
Después del tercer barco, ¿cuántas veces parpadea el verde? ¿Qué parte del `for` lo decide?
:::

### Opción B · Botón de emergencia

Si algo sale mal (un barco atorado, un carro en el puente), el **mismo botón** del sábado 5 detiene todo: semáforo en rojo, alarma y el puente se queda donde está hasta presionarlo otra vez.

- **Botón:** es el que ya está en la protoboard, en el pin **6**. Si su programa no tiene la constante `BOTON` (porque no hicieron el reto de la Guía 6), agreguen arriba `const int BOTON = 6;` y en el `setup()` `pinMode(BOTON, INPUT_PULLUP);`.
- **Código:** en `moverPuente()`, el `for` tiene dentro dos líneas (`ponerAngulo(a);` y `delay(VELOCIDAD);`). Escriban el bloque de abajo justo después de `delay(VELOCIDAD);`, todavía dentro de las llaves del `for`.

```cpp
if (digitalRead(BOTON) == LOW) {        // emergencia
  digitalWrite(ROJO, HIGH);
  tone(BUZZER, 400);                     // alarma continua
  delay(500);
  while (digitalRead(BOTON) == HIGH) {}  // esperar a que lo presionen otra vez
  noTone(BUZZER);
  delay(500);
}
```

- **Para usarlo:** mientras el puente sube o baja, den un toque corto al botón (presionar y soltar enseguida): el puente se detiene y suena la alarma. Para seguir, otro toque corto. Si lo dejan presionado, el programa lo cuenta otra vez.
- El botón solo actúa como emergencia mientras las hojas se mueven (está dentro de `moverPuente()`). Si hicieron el reto de la Guía 6, con el puente quieto el botón lo sigue abriendo como antes.

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
- **Versión Tinkercad:** las dos mejoras se hacen sin comprar piezas (decisión de Bairon). El contador usa el Monitor serie y el LED verde en vez de 3 LEDs extra; la emergencia usa el botón del pin 6 en vez de un botón rojo en el pin 12. Campos propios: g11t-mejora y g11t-p1.
- g11t-p1: 3 parpadeos; lo decide `i < barcos` (el `for` da tantas vueltas como barcos haya).
- Opción A: si el contador crece mucho, los parpadeos tardan; un equipo rápido puede reiniciarlo en 0 cuando pase de 5.
- Opción B: el `while` vacío es la primera vez que lo ven; explicarlo como "quedarse esperando".
- Equipos rápidos pueden hacer ambas opciones.
- Tiempo total: 35 + 60 + 10 + 5 + 10 = 120 minutos.
:::

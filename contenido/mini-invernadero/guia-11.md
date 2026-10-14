---
titulo: Un invernadero que avisa
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Un invernadero que avisa

## Objetivo del día

Aplicar las mejoras de la lista y agregar una alerta que avise cuando el depósito de agua está vacío.

**Al terminar tendremos:** el invernadero ajustado y con un LED de alerta de depósito vacío.

## Materiales del equipo

- Invernadero completo
- Sensor de nivel de agua (módulo de tiras) o dos cables pelados
- LED rojo y resistencia de 220 Ω

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g11-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Ajustes de la lista (30 min)

Hoy trabajamos sobre el programa final: abran `equipo_NOMBRE_final` (Guía 8) y guárdenlo como `equipo_NOMBRE_v2` (**Archivo → Guardar como**).

1. Revisen su lista de mejoras de la Guía 10 (Parte 4).
2. Para cada ajuste: escriban qué mejora es, el valor que tenía el código (**Valor anterior**), cámbienlo en **Ajustes del equipo**, súbanlo y pruébenlo.
3. Anoten el **Valor nuevo** y si funcionó mejor. Si funcionó peor, regresen al valor anterior.

Ejemplo: "Riego más corto | TIEMPO_RIEGO = 3000 | TIEMPO_RIEGO = 2000 | Sí, ya no se encharca".

:::tabla id="g11-ajustes"
| Mejora | Valor anterior | Valor nuevo | ¿Funcionó mejor? |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
:::

## Parte 3 · ¿Queda agua? (20 min)

Si el depósito se vacía, la bomba trabaja en seco y la planta no recibe agua. El **sensor de nivel** tiene tiras de metal: cuando el agua las cubre, deja pasar corriente y su número sube.

Muevan el nivel del agua en la animación y miren cómo cambia el número:

:::animacion tipo="nivel-agua"
:::

Conecta: **+ → 5V**, **− → GND**, **S → A1**. Pégalo dentro del depósito, con la parte de abajo cerca del fondo.

- Con el USB y las pilas desconectados. **+** a la fila **+** de la protoboard, **−** a la fila **−**, **S** al pin **A1**.
- Peguen el sensor con cinta en la pared del depósito, con las tiras hacia abajo. Solo las tiras van en el agua: la parte de arriba (con los pines) debe quedar seca.
- Si no tienen sensor de nivel, pidan ayuda al docente para usar dos cables pelados.

[IMAGEN 11.1: sensor de nivel de agua pegado dentro del depósito, cerca del fondo]

Para leer el sensor: en el `loop()` del programa, debajo de `int suelo = analogRead(SENSOR_SUELO);`, agreguen `Serial.println(analogRead(A1));`, súbanlo y abran el Monitor serie. Cambien la cantidad de agua del depósito y anoten el número en cada caso. Al terminar, borren esa línea.

:::tabla id="g11-nivel"
| Agua en el depósito | Valor en A1 |
| --- | --- |
| Lleno | |
| A la mitad | |
| Casi vacío | |
| Vacío | |
:::

Elijan un número entre el de "casi vacío" y el de "vacío": por debajo de él, el depósito cuenta como vacío.

Nuestro límite de "vacío": NIVEL_MINIMO = ______

## Parte 4 · El LED de alerta (35 min)

Conecta un LED rojo con resistencia a **D4**. Agrega al código:

- **LED rojo:** pata larga → resistencia de 220 Ω → pin **4**; pata corta → fila **−**. Pónganlo en el frente, donde se vea.
- **Código** (las piezas van en lugares distintos):
  1. Las dos líneas `const…` van con las demás constantes, en **Ajustes del equipo**. Cambien el 100 por su NIVEL_MINIMO.
  2. `pinMode(ALERTA, OUTPUT);` va dentro del `setup()`.
  3. Las tres líneas de "en loop()" van dentro del `loop()`, al principio, justo antes de la línea `if (suelo > UMBRAL_SECO || manual) {`.

```cpp
const int ALERTA = 4;
const int NIVEL_MINIMO = 100;   // escribe tu valor

// en setup():
pinMode(ALERTA, OUTPUT);

// en loop(), antes de regar:
int nivel = analogRead(A1);
bool hayAgua = nivel > NIVEL_MINIMO;
digitalWrite(ALERTA, !hayAgua);   // LED encendido si no hay agua
```

Y cambia la condición del riego para que **no riegue sin agua**:

- Reemplacen la línea `if (suelo > UMBRAL_SECO || manual) {` y su bloque por este:

```cpp
if ((suelo > UMBRAL_SECO || manual) && hayAgua) {
  regar();
  delay(5000);
}
```

:::pregunta id="g11-p1"
¿Qué significa `&&` en la condición del riego?
:::

Suban el código, pongan las pilas y prueben cada caso. Para "tierra seca" usen el vaso de tierra seca (con la manguera en otro vaso). Para "depósito vacío", saquen el sensor de nivel del agua (sin mojar los pines) en vez de vaciar el depósito: así la bomba no trabaja en seco si algo falla.

| Prueba | ¿LED rojo encendido? | ¿La bomba riega? |
| --- | --- | --- |
| Depósito lleno, tierra seca | | |
| Depósito vacío, tierra seca | | |
| Depósito vacío, botón presionado | | |

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Aplicamos los ajustes de la lista.
- [ ] Calibramos el sensor de nivel.
- [ ] El LED avisa cuando no hay agua.
- [ ] La bomba no trabaja en seco.
:::

## Reto extra

Conecta un buzzer en **D5** y haz que suene tres pitidos cuando el depósito se vacía (solo una vez, no sin parar).

Pista: necesitan una variable que recuerde si ya avisaron (por ejemplo `bool avisado = false;`). Si no hay agua y todavía no avisaron, suenan los tres pitidos y la ponen en `true`. Cuando vuelva a haber agua, la regresan a `false`.

## Bitácora (20 min)

:::foto id="g11-foto"
Foto del invernadero con el LED de alerta encendido.
:::

:::pregunta id="g11-b1"
¿Por qué es importante que una máquina avise cuando algo le falta?
:::

Antes de irse: saquen las pilas y suban `equipo_NOMBRE_v2` aquí.

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay sensor de nivel: dos cables pelados en el fondo del depósito, uno a 5V y otro a A1 con resistencia de 10 kΩ a GND; con agua el valor sube.
- El sensor de tiras se oxida con el tiempo; desconectar su VCC cuando no se use.
- g11-p1: `&&` significa "y": se deben cumplir las dos cosas.
- Tiempo total: 10 + 30 + 20 + 35 + 5 + 20 = 120 minutos.
:::

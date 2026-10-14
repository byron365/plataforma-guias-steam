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

:::tabla id="g11-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · Ajustes de la lista (30 min)

:::tabla id="g11-ajustes"
| Mejora | Valor anterior | Valor nuevo | ¿Funcionó mejor? |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
:::

## Parte 3 · ¿Queda agua? (20 min)

Si el depósito se vacía, la bomba trabaja en seco y la planta no recibe agua. El **sensor de nivel** tiene tiras de metal: cuando el agua las cubre, deja pasar corriente y su número sube.

:::animacion tipo="nivel-agua"
:::

Conecta: **+ → 5V**, **− → GND**, **S → A1**. Pégalo dentro del depósito, con la parte de abajo cerca del fondo.

[IMAGEN 11.1: sensor de nivel de agua pegado dentro del depósito, cerca del fondo]

:::tabla id="g11-nivel"
| Agua en el depósito | Valor en A1 |
| --- | --- |
| Lleno | |
| A la mitad | |
| Casi vacío | |
| Vacío | |
:::

Nuestro límite de "vacío": NIVEL_MINIMO = ______

## Parte 4 · El LED de alerta (35 min)

Conecta un LED rojo con resistencia a **D4**. Agrega al código:

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

```cpp
if ((suelo > UMBRAL_SECO || manual) && hayAgua) {
  regar();
  delay(5000);
}
```

:::pregunta id="g11-p1"
¿Qué significa `&&` en la condición del riego?
:::

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

## Bitácora (20 min)

:::foto id="g11-foto"
Foto del invernadero con el LED de alerta encendido.
:::

:::pregunta id="g11-b1"
¿Por qué es importante que una máquina avise cuando algo le falta?
:::

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si no hay sensor de nivel: dos cables pelados en el fondo del depósito, uno a 5V y otro a A1 con resistencia de 10 kΩ a GND; con agua el valor sube.
- El sensor de tiras se oxida con el tiempo; desconectar su VCC cuando no se use.
- g11-p1: `&&` significa "y": se deben cumplir las dos cosas.
- Tiempo total: 10 + 30 + 20 + 35 + 5 + 20 = 120 minutos.
:::

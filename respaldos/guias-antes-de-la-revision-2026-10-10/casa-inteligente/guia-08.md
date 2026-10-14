---
titulo: Escenas y modos automáticos
guia: 8
sabado: 8
sesion: Optimización del sistema
duracion: 120
---

# Guía 8 · Escenas y modos automáticos

## Objetivo del día

Mejorar los modos automáticos de cada nodo, crear una escena nueva diseñada por el grupo y agregar la alarma completa con aviso al celular.

**Al terminar tendremos:** automáticos ajustados, una escena nueva funcionando y la alarma del modo "fuera de casa" probada.

## Materiales del equipo

- Casa integrada
- Celular con la app

## Parte 1 · Automáticos más inteligentes (40 min) · cada equipo

### Sala: encendido suave y sin parpadeo

Si la luz ambiente está justo en el límite (30 %), la tira se enciende y apaga sin parar. Usa **histéresis**: enciende bajo 25 % y apaga sobre 35 %.

```cpp
if (pedido == 255) {
  if (luz < 25) brillo = 80;
  if (luz > 35) brillo = 0;
}
```

### Cuarto: velocidad proporcional

En lugar de 3 escalones, la velocidad crece con la temperatura:

```cpp
if (pedido == 255) {
  vel = constrain(map(temp, 24, 32, 0, 100), 0, 100);
  if (vel > 0 && vel < 30) vel = 30;   // mínimo para que arranque
}
```

### Entrada: retardo de la alarma

Al armar la alarma ("modo fuera"), da **10 segundos** para salir antes de que el PIR la active.

```cpp
unsigned long armadaDesde = 0;
// al recibir 'F' con valor 1: armadaDesde = millis();
if (armada && millis() - armadaDesde > 10000 && digitalRead(PIR) == HIGH)
  alarma = true;
```

:::tabla id="g8-automaticos"
| Nodo | Mejora | ¿Funciona? | Observación |
| --- | --- | --- | --- |
| Sala | Histéresis | | |
| Cuarto | Velocidad proporcional | | |
| Entrada | Retardo de 10 s | | |
:::

:::pregunta id="g8-p1"
¿Por qué el ventilador necesita una velocidad mínima de 30 % para arrancar?
:::

## Parte 2 · Una escena nueva (40 min) · todo el grupo

Una **escena** es un conjunto de órdenes con un solo botón. Ya existen "noche" (N), "fuera" (F) y "en casa" (C). Diseñen una nueva:

:::tabla id="g8-escena"
| Pregunta | Decisión del grupo |
| --- | --- |
| Nombre de la escena | |
| Letra del mensaje | |
| Sala | |
| Cuarto | |
| Entrada | |
:::

El equipo de la central la agrega en `procesar()`:

```cpp
if (c == 'P') {           // ejemplo: escena "película"
  enviar(SALA, 'L', 10);
  enviar(CUARTO, 'V', 40);
}
```

:::pregunta id="g8-p2"
¿Por qué conviene que las escenas estén en la central y no en cada nodo?
:::

## Parte 3 · Prueba de la alarma completa (25 min)

:::tabla id="g8-alarma"
| Paso | Resultado esperado | Resultado |
| --- | --- | --- |
| Enviar F | Luces y ventilador apagados, alarma armada | |
| Moverse frente al PIR antes de 10 s | No suena | |
| Moverse después de 10 s | Suena el buzzer | |
| ¿Llegó el mensaje al celular? | "ALERTA: movimiento en la entrada" | |
| Enviar C | Alarma desactivada | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] Cada nodo mejoró su modo automático.
- [ ] El grupo creó y probó una escena nueva.
- [ ] La alarma completa funciona con aviso al celular.
:::

## Bitácora (10 min)

:::tabla id="g8-fallos"
| Síntoma | Causa | Solución | Equipo |
| --- | --- | --- | --- |
| | | | |
:::

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Los cambios de cada nodo no deben romper el contrato: lo que se envía y recibe sigue igual.
- g8-p1: el motor necesita un mínimo de voltaje para vencer el rozamiento; con poco PWM solo zumba.
- g8-p2: la escena coordina varios nodos; ningún nodo conoce a los demás, solo la central.
- Tiempo total: 40 + 40 + 25 + 5 + 10 = 120 minutos.
:::

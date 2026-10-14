---
titulo: Cazar fallos
guia: 7
sabado: 7
sesion: Corrección de fallos
duracion: 120
---

# Guía 7 · Cazar fallos

## Objetivo del día

Diagnosticar y corregir los fallos típicos de un sistema distribuido: mensajes cortados, reinicios por caída de voltaje y motores que no responden como deben.

**Al terminar tendremos:** todos los requisitos aprobados o con plan de corrección, y la bitácora de fallos al día.

## Materiales del equipo

- Robot y mando
- Multímetro, capacitores electrolíticos de 470 µF (16 V o más)
- Resultados de las pruebas del sábado 6

## Parte 1 · Método para diagnosticar (15 min)

> **Síntoma → hipótesis → prueba → causa → solución → verificar**

Cambia **una sola cosa a la vez**. Si cambias tres y funciona, no sabrás cuál era el problema.

:::tabla id="g7-pendientes"
| Requisito o prueba que falló | Síntoma | Hipótesis |
| --- | --- | --- |
| | | |
| | | |
| | | |
:::

## Parte 2 · Mensajes cortados o con basura (30 min)

Para ver lo que realmente llega, haz que el robot repita por el **Monitor serie** cada mensaje recibido (con el USB conectado):

```cpp
// en setup():
Serial.begin(9600);

// al inicio de procesar():
Serial.println(m);
```

:::tabla id="g7-mensajes"
| Observación en el monitor | Posible causa | Solución |
| --- | --- | --- |
| Mensajes completos y limpios | — | — |
| Letras raras (basura) | Velocidad distinta o falta GND común | |
| Mensajes pegados (`M,100,1M,100,100`) | Falta el `\n` o se perdió | |
| Mensajes cortados | El mando envía demasiado rápido | |
:::

**Protección extra:** agrega una verificación del tamaño del mensaje:

```cpp
if (m.length() < 5 || m.length() > 12) return;   // descartar mensajes raros
```

:::pregunta id="g7-p1"
¿Por qué es mejor **descartar** un mensaje dudoso que intentar usarlo?
:::

## Parte 3 · Reinicios al acelerar (30 min)

Si el robot "se reinicia" al acelerar fuerte, el voltaje de la lógica está cayendo. Mídelo:

:::tabla id="g7-voltaje"
| Situación | Voltaje en el pin 5V del Arduino | Voltaje de la batería |
| --- | --- | --- |
| Robot quieto | | |
| Arrancando a fondo hacia adelante | | |
| Cambiando de adelante a atrás de golpe | | |
:::

:::animacion tipo="caida-voltaje" sistema="robot"
:::

Soluciones posibles (prueba una a la vez):

1. **Capacitor de 470 µF** entre VM y GND del puente H, cerca del driver (respetando la polaridad).
2. Revisar que el Arduino tome la energía del **LM2596**, no de la misma línea que los motores.
3. **Rampa** de aceleración (se programa en la guía 8).

:::pregunta id="g7-p2"
¿Qué solución funcionó y cómo lo comprobaste con mediciones?
:::

## Parte 4 · Motores que no hacen lo esperado (25 min)

:::tabla id="g7-motores"
| Síntoma | Causa probable | ¿Nos pasó? | Solución |
| --- | --- | --- | --- |
| Un motor gira al revés | Cables del motor invertidos | | |
| El robot gira cuando debería ir recto | Motores distintos o PWM igual a velocidades distintas | | |
| Un motor no gira | STBY en LOW, cable suelto o pin PWM equivocado | | |
| Los motores zumban pero no se mueven | PWM muy bajo para arrancar | | |
:::

Para un robot que se desvía, compensa en el código:

```cpp
const float AJUSTE_DER = 0.92;   // si el derecho es más rápido
motor(PWMB, BIN1, BIN2, der * AJUSTE_DER);
```

## Parte 5 · Volver a probar (10 min)

:::tabla id="g7-reprueba"
| Requisito | ¿Aprueba ahora? | ¿Qué cambiamos? |
| --- | --- | --- |
| | | |
| | | |
| | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] Usamos el método síntoma → causa → solución.
- [ ] Revisamos los mensajes en el monitor.
- [ ] Medimos el voltaje de la lógica al acelerar.
- [ ] Volvimos a probar los requisitos que fallaban.
:::

## Bitácora (5 min)

:::tabla id="g7-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
| | | |
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Para depurar el robot con USB conectado, levantarlo para que las ruedas giren en el aire.
- Si con USB funciona y con batería no, casi siempre es la alimentación de la lógica.
- Capacitores electrolíticos: la franja indica el negativo; conectarlo al revés puede reventarlo. Revisar antes de energizar.
- Tiempo total: 15 + 30 + 30 + 25 + 10 + 5 + 5 = 120 minutos.
:::

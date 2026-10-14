---
titulo: La etapa de potencia
guia: 4
sabado: 4
sesion: Implementación electrónica
duracion: 120
---

# Guía 4 · La etapa de potencia

## Objetivo del día

Armar la etapa de potencia del motor con el MOSFET (probando primero con un LED), montar la banda y los sensores.

**Al terminar tendremos:** la banda moviéndose con velocidad regulada por la perilla y los sensores instalados.

## Materiales del equipo

- MOSFET IRLZ44N, diodo 1N4007, resistencias de 220 Ω y 10 kΩ
- Fuente de 12 V con fusible, LM2596 ajustado a 5,0 V
- Motor DC 12 V, estructura de la banda, rodillos y banda
- Sensor IR, potenciómetro, LED de 12 V o LED con resistencia de 1 kΩ
- Arduino UNO, multímetro

## Parte 1 · Primero con un LED (25 min)

Antes de conectar el motor, probamos la etapa de potencia con una carga que no se daña: un LED con resistencia de 1 kΩ conectado a 12 V.

| Conexión | Destino |
| --- | --- |
| D9 del Arduino | 220 Ω → gate del MOSFET |
| Gate | 10 kΩ → GND |
| Source | GND (común entre Arduino y fuente de 12 V) |
| Drain | Cátodo del LED (pata corta) |
| +12 V | 1 kΩ → ánodo del LED |

[IMAGEN 4.1: MOSFET IRLZ44N en la protoboard con las resistencias de gate y un LED de prueba en el drain]

```cpp
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  int vel = analogRead(A0) / 4;   // perilla: 0 a 255
  analogWrite(9, vel);
}
```

:::tabla id="g4-led"
| Perilla | Brillo del LED | Voltaje entre drain y source (V) |
| --- | --- | --- |
| Mínimo | | |
| Mitad | | |
| Máximo | | |
:::

:::pregunta id="g4-p1"
Con la perilla al máximo, ¿qué voltaje hay entre drain y source? ¿Qué nos dice eso del MOSFET?
:::

## Parte 2 · Ahora el motor (25 min)

1. Desconecta la fuente. Cambia el LED por el **motor**: + del motor a +12 V, − del motor al drain.
2. Coloca el **diodo** en paralelo con el motor: **franja (cátodo) hacia +12 V**.
3. Revisa todo con el docente y conecta la fuente.

:::animacion tipo="conexiones" circuito="banda-potencia"
:::

:::checklist id="g4-revision"
- [ ] El diodo tiene la franja hacia +12 V.
- [ ] La resistencia de 10 kΩ está entre gate y GND.
- [ ] El GND del Arduino está unido al GND de la fuente.
- [ ] Los 12 V no tocan ningún pin del Arduino.
:::

:::tabla id="g4-motor"
| Perilla | ¿Gira el motor? | Temperatura del MOSFET al tacto después de 2 min |
| --- | --- | --- |
| 25 % | | |
| 50 % | | |
| 100 % | | |
:::

## Parte 3 · Montar la banda (45 min)

1. Arma la estructura con los dos rodillos separados 40 cm.
2. Une el eje del motor a un rodillo (directo o con un acople).
3. Coloca la banda **tensa**, sin que patine.
4. **Sensor IR de llegada:** a un lado de la banda, mirando a través de ella, al inicio. Conéctalo al nodo banda: OUT → **D2**.
5. **Túnel del sensor de color:** una caja pequeña negra sobre la banda, justo después del IR. El TCS34725 va dentro, mirando hacia abajo a 1 cm de las piezas.
6. **Desviador:** el servo al final, con una paleta que empuje la pieza hacia el contenedor.

[IMAGEN 4.2: banda montada con el sensor IR al inicio, el túnel negro del sensor de color y el servo desviador al final]

:::pregunta id="g4-p2"
¿Por qué el sensor de color va dentro de un túnel oscuro?
:::

## Parte 4 · Probar la banda (15 min)

:::tabla id="g4-pruebas"
| Prueba | ¿Funciona? | Observación |
| --- | --- | --- |
| La banda avanza sin patinar | | |
| La perilla cambia la velocidad | | |
| Con la perilla al mínimo la banda se detiene | | |
| El LED del sensor IR se enciende al pasar una pieza | | |
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] Probamos la etapa de potencia con un LED.
- [ ] El motor gira con velocidad regulada.
- [ ] La banda está montada y tensa.
- [ ] Los sensores y el servo están en su lugar.
:::

## Bitácora (5 min)

:::tabla id="g4-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
| | | |
:::

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Revisar cada etapa de potencia **antes** de conectar los 12 V: diodo al revés o drain/source invertidos son los errores más comunes.
- Pinout del IRLZ44N mirando el frente (letras): Gate, Drain, Source (izquierda a derecha).
- g4-p1: debe ser casi 0 V (≈0,1 V); el MOSFET está completamente encendido y casi no pierde energía.
- Si el motor arranca solo al encender el Arduino, falta la resistencia de 10 kΩ al GND.
- Tiempo total: 25 + 25 + 45 + 15 + 5 + 5 = 120 minutos.
:::

---
titulo: Dispensadores por todas partes
guia: 12
sabado: 12
sesion: Aplicaciones alternativas
duracion: 120
---

# Guía 12 · Dispensadores por todas partes

## Objetivo del día

Descubrir dónde más se usan dispensadores automáticos y agregar un sensor que avise cuando el depósito está casi vacío.

**Al terminar tendremos:** la ficha de aplicaciones y el dispensador avisando cuando se acaba la comida.

## Materiales del equipo

- Dispensador completo
- Sensor ultrasónico HC-SR04
- Regla

## Parte 1 · ¿Dónde más? (25 min)

:::tabla id="g12-aplicaciones"
| Dispensador | ¿Qué sirve? | ¿Cómo sabe cuánto? |
| --- | --- | --- |
| Máquina de dulces | | |
| Alimentador de peces | | |
| Comedero de aves | | |
| Dispensador de jabón | | |
| Máquina de café | | |
:::

[IMAGEN 12.1: alimentador automático de peces sobre una pecera]

:::pregunta id="g12-p1"
¿Qué cambiarías de nuestro dispensador para usarlo con peces?
:::

## Parte 2 · ¿Cuánta comida queda? (25 min)

Pondremos el sensor ultrasónico **arriba del depósito, mirando hacia abajo**. Mide la distancia hasta la comida: si la distancia es grande, queda poca comida.

:::animacion tipo="nivel-ultrasonico"
:::

| Sensor | Arduino |
| --- | --- |
| VCC | 5V |
| Trig | D10 |
| Echo | D11 |
| GND | GND |

[IMAGEN 12.2: sensor ultrasónico pegado en la boca de la botella mirando hacia la comida]

:::tabla id="g12-nivel"
| Comida en la botella | Distancia medida (cm) |
| --- | --- |
| Llena | |
| A la mitad | |
| Casi vacía | |
:::

Nuestro límite de "casi vacía": DISTANCIA_VACIO = ______ cm

## Parte 3 · Programar la alerta (45 min)

```cpp
const int TRIG = 10;
const int ECHO = 11;
const int DISTANCIA_VACIO = 15;   // escribe tu valor

long medirDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  return t * 0.034 / 2;
}

// en setup():
pinMode(TRIG, OUTPUT);
pinMode(ECHO, INPUT);

// en loop():
long d = medirDistancia();
if (d > DISTANCIA_VACIO) {
  digitalWrite(LED, HIGH);   // LED encendido = recargar
  delay(200);
  digitalWrite(LED, LOW);
  delay(200);
}
```

:::pregunta id="g12-p2"
¿Por qué una distancia **más grande** significa **menos** comida?
:::

| Prueba | ¿Parpadea el LED? |
| --- | --- |
| Botella llena | |
| Botella casi vacía | |

## ¿Lo logramos? (5 min)

:::checklist id="g12-logramos"
- [ ] Completamos la tabla de aplicaciones.
- [ ] El sensor mide la comida que queda.
- [ ] El LED avisa cuando hay que recargar.
:::

## Reto extra

Usa el sensor para calcular el **porcentaje** de comida que queda: 100 % llena, 0 % vacía, con `map()`.

## Bitácora (20 min)

:::pregunta id="g12-b1"
Propón otro dispensador automático que podría ayudar en tu casa o escuela.
:::

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si la botella es muy angosta, el ultrasonido rebota en las paredes: probar con la botella más ancha o usar un sensor IR de obstáculos a media altura.
- Reto: `int porcentaje = map(d, DISTANCIA_VACIO, distanciaLlena, 0, 100);` con `constrain` para que no se salga de 0–100.
- Tiempo total: 25 + 25 + 45 + 5 + 20 = 120 minutos.
:::

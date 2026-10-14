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

Para cada dispensador de la tabla, piensen (o busquen en internet, si hay) qué entrega y cómo sabe cuánto entregar: ¿por tiempo, por peso, por un botón, por un sensor…?

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

El sensor funciona como un murciélago: manda un sonido que no escuchamos, el sonido rebota en la comida y regresa. Mientras más tarda en regresar, más lejos está la comida.

Muevan el nivel de comida en la animación y miren cómo cambia la distancia:

:::animacion tipo="nivel-ultrasonico"
:::

**Conectar el sensor** (con el USB desconectado). El sensor tiene cuatro pines con su nombre impreso:

| Sensor | Arduino |
| --- | --- |
| VCC | 5V |
| Trig | D10 |
| Echo | D11 |
| GND | GND |

- **VCC** a la fila **+** de la protoboard y **GND** a la fila **−**.
- **Trig** al pin **D10** y **Echo** al pin **D11**. Usen cables largos: el sensor va arriba del depósito.
- Colóquenlo sobre la parte abierta de arriba de la botella (donde se cortó el fondo), con los dos "ojos" mirando hacia abajo, hacia la comida. Fíjenlo con cinta a un palito o cartón atravesado sobre la botella.

[IMAGEN 12.2: sensor ultrasónico sobre la parte abierta de arriba de la botella, mirando hacia la comida]

Para llenar esta tabla necesitan el programa de la Parte 3 con el Monitor serie (ver el paso 5 de la Parte 3). Si prefieren medir antes, pueden medir a mano con la regla, desde el sensor hasta la comida.

:::tabla id="g12-nivel"
| Comida en la botella | Distancia medida (cm) |
| --- | --- |
| Llena | |
| A la mitad | |
| Casi vacía | |
:::

Elijan un número entre la distancia de "a la mitad" y la de "casi vacía": desde ahí el dispensador avisará.

Nuestro límite de "casi vacía": DISTANCIA_VACIO = ______ cm

## Parte 3 · Programar la alerta (45 min)

Abran su programa más reciente (`equipo_NOMBRE_contador` o `equipo_NOMBRE_final`) y guárdenlo como `equipo_NOMBRE_nivel`. Las piezas de abajo van en lugares distintos del programa:

1. Las tres líneas `const …` van arriba, junto a las otras constantes. Cambien el 15 por su DISTANCIA_VACIO.
2. La función `medirDistancia` completa va después de la llave `}` que cierra `servir()`.
3. Las dos líneas `pinMode` van dentro del `setup()`.
4. Las líneas de "en loop()" van dentro del `loop()`, al final, antes de su llave de cierre `}`.

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

5. **Para ver la distancia** (y llenar la tabla de la Parte 2): agreguen dentro del `loop()`, justo debajo de `long d = medirDistancia();`, la línea `Serial.println(d);`. Suban el código y abran el Monitor serie (lupa, 9600 baudios): verán la distancia en centímetros.

:::pregunta id="g12-p2"
¿Por qué una distancia **más grande** significa **menos** comida?
:::

6. **Prueben:** con la botella llena y con la botella casi vacía, observen el LED.

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

Pista: `map()` convierte un rango de números en otro. Aquí, el rango va de la distancia de "casi vacía" a la de "llena" (de su tabla), y se convierte en 0 a 100. Muestren el resultado en el Monitor serie.

## Bitácora (20 min)

:::pregunta id="g12-b1"
Propón otro dispensador automático que podría ayudar en tu casa o escuela.
:::

Antes de irse, suban `equipo_NOMBRE_nivel` aquí.

:::archivo id="g12-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si la botella es muy angosta, el ultrasonido rebota en las paredes: probar con la botella más ancha o usar un sensor IR de obstáculos a media altura.
- Reto: `int porcentaje = map(d, DISTANCIA_VACIO, distanciaLlena, 0, 100);` con `constrain` para que no se salga de 0–100.
- Tiempo total: 25 + 25 + 45 + 5 + 20 = 120 minutos.
:::

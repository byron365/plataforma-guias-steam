---
titulo: Cada equipo arma su nodo
guia: 4
sabado: 4
sesion: Implementación electrónica
duracion: 120
---

# Guía 4 · Cada equipo arma su nodo

## Objetivo del día

Construir la electrónica de nuestro nodo (probando la potencia primero con un LED) y, entre todos, montar la maqueta y la distribución de energía.

**Al terminar tendremos:** nuestro nodo con su carga funcionando desde un código de prueba, y la maqueta con la energía distribuida.

## Materiales del equipo

- Componentes del nodo (sábado 3)
- Fuente 12 V con fusible, bornera, LM2596 ajustado a 5,0 V
- LED con resistencia de 1 kΩ (prueba de potencia)
- Maqueta de MDF o cartón

## Parte 1 · La maqueta (20 min) · todo el grupo

Repartan la maqueta: sala, cuarto, entrada y un espacio para la central y la fuente. Dejen canales para el cable del bus I2C (4 hilos: SDA, SCL, 5V, GND) y para los 12 V.

- Marquen a lápiz dónde va cada habitación y por dónde pasan los cables antes de cortar o pegar.
- Que el bus I2C y los 12 V vayan por caminos **separados** (el bus cerca de los 12 V puede recibir ruido).
- **Seguridad:** la fuente se conecta solo cuando el docente revisa; los cables se cambian siempre con todo desenchufado.

[IMAGEN 4.1: maqueta de la casa con las habitaciones, la bornera de energía y el recorrido del bus I2C]

## Parte 2 · Armar nuestro nodo (60 min)

**Primero prueba la potencia con un LED** (12 V → 1 kΩ → LED → drain del MOSFET, o en los contactos del relé). Cuando funcione, cambia el LED por la carga real.

- **IRLZ44N:** mirándolo de frente (letras hacia ustedes, patas abajo): **Gate**, **Drain**, **Source** de izquierda a derecha.
- **Diodo:** la franja (cátodo) siempre hacia el **+12 V**.
- **GND común:** el GND de la fuente de 12 V se une al GND del Arduino (excepto en el lado aislado del relé).

### Nodo sala

| Conexión | Destino |
| --- | --- |
| D9 | 220 Ω → gate del MOSFET · gate → 10 kΩ → GND |
| Drain | − de la tira LED |
| + de la tira LED | +12 V |
| Source | GND común |
| LDR | 5 V → LDR → A0 → 10 kΩ → GND |

### Nodo cuarto

| Conexión | Destino |
| --- | --- |
| D9 | 220 Ω → gate · gate → 10 kΩ → GND |
| Drain | − del ventilador · diodo 1N4007 en paralelo (franja a +12 V) |
| + del ventilador | +12 V |
| DHT11 | VCC 5 V · DATA → D2 · GND |

### Nodo entrada

| Conexión | Destino |
| --- | --- |
| Relé IN / VCC / GND | D7 / 5 V / GND |
| Relé COM / NO | +12 V / + del solenoide |
| − del solenoide | GND de 12 V · diodo 1N4007 en paralelo (franja a +) |
| PIR | VCC 5 V · OUT → D2 · GND |
| Buzzer | D5 y GND |

### Central

| Conexión | Destino |
| --- | --- |
| HC-05 TXD / RXD | D10 / D11 (divisor 1 kΩ / 2 kΩ en RXD) |
| OLED SDA / SCL | A4 / A5 (mismo bus que los nodos) |
| Configurar el HC-05 | Nombre de la casa con AT+NAME=CasaSTEAM y AT+UART=9600,0,0 |

La configuración del HC-05 con comandos AT la hace el docente (o el equipo de la central con su ayuda): el módulo se pone en "modo AT" manteniendo presionado su botoncito al darle energía, y los comandos se envían desde el Monitor serie con un programa puente.

Busquen su nodo en la animación y comparen cable por cable:

:::animacion tipo="conexiones" circuito="casa-nodos"
:::

## Parte 3 · Código de prueba del nodo (30 min)

Antes de I2C, comprueba la carga y el sensor con un código corto. Ejemplo para sala o cuarto:

- Conecten el Arduino del nodo por USB, elijan su puerto, creen un programa nuevo con este código y súbanlo. Abran el Monitor serie (9600 baudios) para ver el valor.
- **Nodo entrada:** prueben el relé con un programa que haga `digitalWrite(7, HIGH);`, espere 2 segundos, `digitalWrite(7, LOW);` y espere otros 2 (deben oír el "clic"). No olviden `pinMode(7, OUTPUT);` en el `setup()`.
- **Central:** prueben la pantalla con el ejemplo de la librería (**Archivo → Ejemplos → Adafruit SSD1306 → ssd1306_128x64_i2c**).

```cpp
void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  for (int v = 0; v <= 255; v += 51) {   // 0, 20, 40, 60, 80, 100 %
    analogWrite(9, v);
    Serial.println(v);
    delay(1500);
  }
}
```

Para el sensor: en la sala tapen y alumbren la LDR, en el cuarto calienten el DHT11 con la mano, en la entrada muévanse frente al PIR (tarda hasta un minuto en estar listo al encender). Pueden agregar `Serial.println(analogRead(A0));` (o la lectura de su sensor) al código de prueba.

:::tabla id="g4-prueba"
| Prueba | Resultado | ¿Bien? |
| --- | --- | --- |
| Carga con LED de prueba | | |
| Carga real a 50 % | | |
| Carga real a 100 % | | |
| Temperatura del MOSFET o relé tras 3 min | | |
| Sensor responde (luz, temperatura o movimiento) | | |
:::

Antes de dejar la fuente conectada, revisen y marquen:

:::checklist id="g4-seguridad"
- [ ] Fusible en la entrada de la fuente.
- [ ] Diodo en las cargas inductivas.
- [ ] GND común entre 12 V y lógica (excepto el lado aislado del relé).
- [ ] Ningún cable de 12 V cerca de los pines del Arduino.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g4-logramos"
- [ ] Probamos la potencia primero con un LED.
- [ ] La carga real funciona.
- [ ] El sensor del nodo funciona.
- [ ] La maqueta tiene la energía distribuida.
:::

## Bitácora (5 min)

Anoten los fallos de hoy (síntoma, causa y solución).

:::tabla id="g4-fallos"
| Síntoma | Causa | Solución |
| --- | --- | --- |
| | | |
:::

Antes de irse: desenchufen la fuente y suban su programa de prueba.

:::archivo id="g4-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Revisar cada nodo antes de conectar los 12 V: diodos al revés y drain/source invertidos son los errores más comunes.
- El PIR tarda unos 30–60 s en estabilizarse al encender; ajustar sus potenciómetros de sensibilidad y tiempo al mínimo para pruebas.
- Las tiras LED con PWM a baja frecuencia pueden parpadear en video: es normal.
- Tiempo total: 20 + 60 + 30 + 5 + 5 = 120 minutos.
:::

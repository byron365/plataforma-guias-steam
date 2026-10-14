---
titulo: Luz automática y presentación
guia: 8
sabado: 8
sesion: Preparación de presentación
duracion: 120
---

# Guía 8 · Luz automática y presentación

## Objetivo del día

Agregar la luz con temporizador, juntar todo en el código final del invernadero y preparar la presentación con nuestras gráficas.

**Al terminar tendremos:** el invernadero completo (riego, ventana y luz), las gráficas listas y el guion de la presentación.

## Materiales del equipo

- Invernadero completo
- LED blanco o tira LED (D6)
- Datos y gráficas del sábado 7
- Cartulina y marcadores

## Parte 1 · Revisar las plantas (10 min)

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g8-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · La luz con temporizador (20 min)

Las plantas necesitan horas de luz y horas de oscuridad. Con `millis()` (el tiempo desde que se encendió el Arduino) hacemos un ciclo: encendida un tiempo, apagada otro tiempo.

**Conectar la luz** (con el USB desconectado), igual que en la Guía 1: pata larga del LED → resistencia de 220 Ω → pin **6**; pata corta → fila **−** (GND). Colóquenla arriba, dentro del invernadero, apuntando a la planta.

Estas líneas son la idea del temporizador (en la Parte 3 ya vienen dentro del código final, no hace falta escribirlas aparte):

```cpp
unsigned long ciclo = LUZ_ON + LUZ_OFF;
unsigned long t = millis() % ciclo;    // % = el resto de la división
if (t < LUZ_ON) {
  digitalWrite(LUZ, HIGH);
} else {
  digitalWrite(LUZ, LOW);
}
```

Muevan el tiempo en la animación y miren cómo se repite el ciclo:

:::animacion tipo="temporizador"
:::

En clase usamos ciclos de **1 minuto** encendida y **1 minuto** apagada para verlo funcionar. En un invernadero real serían unas **12 horas** de cada una.

:::pregunta id="g8-p1"
¿Cuántos milisegundos son 12 horas?
:::

## Parte 3 · El código final (30 min)

Este es el código completo del invernadero. Escribe tus valores en la sección **Ajustes del equipo**:

1. Conecta el USB y crea un programa nuevo (**Archivo → Nuevo boceto**), borra lo que trae y escribe el programa completo de abajo. (Usa la librería DHT que instalaron en la Guía 7.)
2. En **Ajustes del equipo** pon sus valores: `UMBRAL_SECO` (Guía 6), `TIEMPO_RIEGO` (Guía 6) y, si los cambiaron, `TEMP_ABRIR` y `TEMP_CERRAR`.
3. Si su ángulo de ventana abierta no es 60 (Guía 4), cambien el `60` de `ventana.write(60);`.
4. Guárdalo como `equipo_NOMBRE_final`, verifica (✓) y súbelo (→).

```cpp
// Mini invernadero inteligente
// STEAM Robotics Academy · Básico · Docente: Bairon Alas
// Requiere la librería "DHT sensor library" de Adafruit

#include <Servo.h>
#include <DHT.h>  // librería DHT

// --- Pines ---
const int SENSOR_SUELO = A0;
const int BOTON = 2;
const int LUZ = 6;
const int DHT_PIN = 7;
const int BOMBA = 8;       // relé
const int SERVO_VENT = 9;

// --- Ajustes del equipo ---
const int UMBRAL_SECO = 500;     // calibrar
const int TIEMPO_RIEGO = 3000;   // ms
const float TEMP_ABRIR = 30.0;   // °C
const float TEMP_CERRAR = 27.0;  // °C
const unsigned long LUZ_ON = 60000;  // ms
const unsigned long LUZ_OFF = 60000; // ms

DHT dht(DHT_PIN, DHT11);
Servo ventana;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LUZ, OUTPUT);
  pinMode(BOMBA, OUTPUT);
  digitalWrite(BOMBA, LOW);  // apagada
  ventana.attach(SERVO_VENT);
  ventana.write(0);          // cerrada
  dht.begin();
  Serial.begin(9600);
}

void regar() {
  digitalWrite(BOMBA, HIGH);
  delay(TIEMPO_RIEGO);
  digitalWrite(BOMBA, LOW);
}

void loop() {
  // 1. Riego automático o manual
  int suelo = analogRead(SENSOR_SUELO);
  bool manual = digitalRead(BOTON) == LOW;
  if (suelo > UMBRAL_SECO || manual) {
    regar();
    delay(5000);  // el agua baja
  }

  // 2. Ventilación con histéresis
  float temp = dht.readTemperature();
  if (temp > TEMP_ABRIR) {
    ventana.write(60);
  }
  if (temp < TEMP_CERRAR) {
    ventana.write(0);
  }

  // 3. Luz con temporizador
  unsigned long ciclo = LUZ_ON + LUZ_OFF;
  unsigned long t = millis() % ciclo;
  if (t < LUZ_ON) {
    digitalWrite(LUZ, HIGH);
  } else {
    digitalWrite(LUZ, LOW);
  }

  // 4. Registro de datos
  Serial.print(suelo);
  Serial.print(",");
  Serial.println(temp);
  delay(1000);
}
```

Anoten los valores que quedaron en su código:

| Ajuste | Nuestro valor |
| --- | --- |
| UMBRAL_SECO | |
| TIEMPO_RIEGO | |
| TEMP_ABRIR / TEMP_CERRAR | |
| Ángulo de ventana abierta | |

Pongan las pilas y prueben cada función. Para "riega al secar la tierra", usen el vaso de tierra seca (con la manguera en un vaso); para el calor, la lámpara con el docente.

:::checklist id="g8-pruebas"
- [ ] Riega al secar la tierra.
- [ ] Riega con el botón.
- [ ] Abre la ventana con calor.
- [ ] La luz se enciende y apaga cada minuto.
:::

## Parte 4 · Gráficas para la presentación (20 min)

Prepara dos gráficas:

1. **Humedad del suelo** (sábado 7), señalando cuándo regó.
   - Abran la hoja de cálculo de la Guía 7. Pueden agregar un cuadro de texto o una flecha (**Insertar → Formas**) donde se ve el riego.
2. **Crecimiento de las plantas**: alturas de cada sábado, "Con sistema" contra "Control".
   - Columna A: número de sábado; B: altura "Con sistema"; C: altura "Control" (las alturas están en la Parte 1 de cada guía). Seleccionen las tres columnas → **Insertar → Gráfico → Línea**.

[IMAGEN 8.1: gráfica de crecimiento con dos líneas, planta con sistema y planta control]

## Parte 5 · Guion y cartel (25 min)

La presentación dura 5 minutos. Repartan las partes y escriban 2 o 3 ideas cortas de qué decir o mostrar en cada una. Ensayen con cronómetro.

:::tabla id="g8-guion"
| Parte | Tiempo | ¿Qué se dice o se muestra? | Quién |
| --- | --- | --- | --- |
| ¿Qué necesita una planta y qué hace un invernadero? | 1 min | | |
| El diseño 3D y la estructura | 1 min | | |
| Sensores, relé y bomba | 1 min | | |
| Los datos y las gráficas | 1 min | | |
| Demostración: secar la tierra y ver que riega | 1 min | | |
:::

El cartel lleva: nombre del equipo, foto del invernadero, el mapa de causa y efecto, las dos gráficas y la ficha de las plantas.

- Primero repartan el espacio a lápiz y después pasen a marcador.
- Título grande (que se lea a tres pasos) y frases cortas.
- El mapa de causa y efecto está en la Guía 3; las gráficas las pueden imprimir o dibujar.

## ¿Lo logramos? (5 min)

:::checklist id="g8-logramos"
- [ ] La luz funciona con temporizador.
- [ ] Cargamos el código final con nuestros ajustes.
- [ ] Tenemos las dos gráficas.
- [ ] El guion tiene responsables.
:::

## Reto extra

Preparen un vaso con tierra **seca** para la demostración: cambiar el sensor a ese vaso hará que el invernadero riegue frente al público.

## Bitácora (10 min)

:::pregunta id="g8-b1"
¿Qué hace el símbolo `%` en el código de la luz?
:::

Antes de irse: saquen las pilas y suban `equipo_NOMBRE_final` aquí. Es el programa de la presentación.

:::archivo id="g8-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- g8-p1: 12 × 60 × 60 × 1000 = 43 200 000 ms.
- `millis() % ciclo` da un número que va de 0 a ciclo − 1 y vuelve a empezar: explicarlo con un reloj.
- La demostración con el vaso de tierra seca es la más vistosa; ensayarla.
- Tiempo total: 10 + 20 + 30 + 20 + 25 + 5 + 10 = 120 minutos.
:::

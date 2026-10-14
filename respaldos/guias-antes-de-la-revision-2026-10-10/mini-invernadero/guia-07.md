---
titulo: Temperatura y datos
guia: 7
sabado: 7
sesion: Documentación técnica
duracion: 120
---

# Guía 7 · Temperatura y datos

## Objetivo del día

Agregar el sensor de temperatura para que la ventana se abra sola cuando hace calor y registrar los datos del invernadero en una tabla y una gráfica.

**Al terminar tendremos:** la ventana automática y nuestra primera gráfica con datos del invernadero.

## Materiales del equipo

- Invernadero con riego automático
- Sensor DHT11
- Computadora con Arduino IDE y hoja de cálculo
- Lámpara o secadora (para simular calor, con el docente)

## Parte 1 · Revisar las plantas (10 min)

:::tabla id="g7-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El sensor de temperatura (20 min)

Conecta el **DHT11**: **VCC → 5V**, **GND → GND**, **DATA → D7**. Colócalo dentro del invernadero, lejos del agua.

En Arduino IDE instala la librería **DHT sensor library** (Herramientas → Administrar bibliotecas).

[IMAGEN 7.1: sensor DHT11 dentro del invernadero conectado a 5V, GND y D7]

## Parte 3 · La ventana con histéresis (35 min)

Si la ventana se abriera a 30 °C y se cerrara a 30 °C, con 29,9 – 30,0 – 29,9 se abriría y cerraría sin parar. Por eso usamos **dos límites**: se abre a 30 °C y se cierra a 27 °C. Esto se llama **histéresis**.

:::animacion tipo="histeresis"
:::

Agrega al código:

```cpp
#include <Servo.h>
#include <DHT.h>

DHT dht(7, DHT11);
Servo ventana;
const float TEMP_ABRIR = 30.0;
const float TEMP_CERRAR = 27.0;

// en setup():
ventana.attach(9);
ventana.write(0);
dht.begin();

// en loop():
float temp = dht.readTemperature();
if (temp > TEMP_ABRIR) {
  ventana.write(60);
}
if (temp < TEMP_CERRAR) {
  ventana.write(0);
}
```

**Prueba:** acerca la lámpara (con el docente) y luego aléjala.

| Temperatura | Estado de la ventana |
| --- | --- |
| Al empezar | |
| Subiendo, a 29 °C | |
| Al pasar 30 °C | |
| Bajando, a 28 °C | |
| Al bajar de 27 °C | |

:::pregunta id="g7-p1"
¿Por qué a 28 °C la ventana sigue abierta cuando va bajando, pero cerrada cuando va subiendo?
:::

## Parte 4 · Registrar datos (35 min)

Al final del `loop` envía los datos separados por coma:

```cpp
Serial.print(suelo);
Serial.print(",");
Serial.println(temp);
delay(1000);
```

1. Abre el **Monitor serie** y deja el invernadero funcionando **15 minutos**.
2. Copia todo el texto (Ctrl + A, Ctrl + C) y pégalo en la hoja de cálculo.
3. Sepáralo en columnas: **Datos → Texto en columnas**, separador: coma.
4. Haz una **gráfica de línea** de la humedad del suelo.

[IMAGEN 7.2: gráfica de la humedad del suelo durante 15 minutos con un riego marcado]

:::foto id="g7-grafica"
Captura de la gráfica.
:::

:::pregunta id="g7-p2"
¿Se ve en la gráfica el momento en que regó? ¿Cómo lo reconoces?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g7-logramos"
- [ ] El DHT11 mide la temperatura.
- [ ] La ventana se abre y se cierra sola con histéresis.
- [ ] Registramos 15 minutos de datos.
- [ ] Hicimos la gráfica.
:::

## Reto extra

Haz una gráfica de las **alturas de las plantas** con las tablas de cada sábado: una línea para "Con sistema" y otra para "Control".

## Bitácora (15 min)

:::pregunta id="g7-b1"
¿Qué es la histéresis y por qué la necesita la ventana?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino) y su hoja de cálculo (.xlsx o .csv). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si el salón ya está a más de 30 °C, bajar los límites (por ejemplo 33/30) o usar un ventilador para la prueba.
- Secadora o lámpara: solo el docente, sin acercarla a menos de 30 cm del plástico.
- Si el DHT11 da `nan`, revisar el cable de datos y el tipo (`DHT11`).
- Guardar las hojas de cálculo: se usan en el sábado 8 y 10.
- Tiempo total: 10 + 20 + 35 + 35 + 5 + 15 = 120 minutos.
:::

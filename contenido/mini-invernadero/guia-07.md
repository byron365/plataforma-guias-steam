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

Midan la altura (regla parada en la tierra, hasta la punta más alta), cuenten las hojas y anoten lo que vean.

:::tabla id="g7-plantas"
| Maceta | Altura (cm) | Número de hojas | Observaciones |
| --- | --- | --- | --- |
| Con sistema | | | |
| Control | | | |
:::

## Parte 2 · El sensor de temperatura (20 min)

Conecta el **DHT11**: **VCC → 5V**, **GND → GND**, **DATA → D7**. Colócalo dentro del invernadero, lejos del agua.

- Con el USB desconectado. El DHT11 tiene sus pines marcados (a veces **+**, **−** y **S** u **OUT**: + es VCC, − es GND y S/OUT es DATA).
- VCC → fila **+** de la protoboard, GND → fila **−**, DATA → pin **7**. Usen cables largos.
- Péguenlo con cinta en una pared, a media altura, lejos de la manguera y del depósito.

En Arduino IDE instala la librería **DHT sensor library** (Herramientas → Administrar bibliotecas).

1. Abre el **Gestor de bibliotecas**: el icono de los libros en la barra de la izquierda de Arduino IDE (o **Herramientas → Administrar bibliotecas**).
2. En el buscador escribe **DHT sensor library**. Busca la que dice **by Adafruit** y presiona **Instalar**.
3. Si pregunta si quieres instalar también otras bibliotecas que necesita (dependencias), elige **Instalar todo**.

[IMAGEN 7.1: sensor DHT11 dentro del invernadero conectado a 5V, GND y D7]

## Parte 3 · La ventana con histéresis (35 min)

Si la ventana se abriera a 30 °C y se cerrara a 30 °C, con 29,9 – 30,0 – 29,9 se abriría y cerraría sin parar. Por eso usamos **dos límites**: se abre a 30 °C y se cierra a 27 °C. Esto se llama **histéresis**.

Suban y bajen la temperatura en la animación y fíjense en qué momento se abre y se cierra la ventana:

:::animacion tipo="histeresis"
:::

Agrega al código:

Abran `equipo_NOMBRE_automatico` (Guía 6) y guárdenlo como `equipo_NOMBRE_clima`. Las piezas de abajo van en lugares distintos del programa:

1. Las dos líneas `#include` van **al principio**, en las primeras líneas del programa.
2. Las líneas `DHT dht…`, `Servo ventana;` y las dos `const float…` van debajo de las otras constantes.
3. Las tres líneas de "en setup():" van dentro del `setup()`, antes de su llave de cierre `}`.
4. Las líneas de "en loop():" van dentro del `loop()`, después del bloque del riego (después de la llave `}` que cierra el `if` de regar).
5. Si en la Guía 4 eligieron otro ángulo de ventana abierta, cambien el `60` de `ventana.write(60);` por el suyo.

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

6. Verifica (✓). Si dice que no encuentra `DHT.h`, revisa que instalaste la librería (Parte 2). Luego sube (→).

**Prueba:** acerca la lámpara (con el docente) y luego aléjala.

Para ver la temperatura mientras prueban, agreguen dentro del `loop()`, debajo de `float temp = dht.readTemperature();`, la línea `Serial.println(temp);` y abran el Monitor serie. Anoten qué hace la ventana en cada momento de la tabla.

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

1. En el `loop()`, borren las líneas `Serial.println(suelo);` y `Serial.println(temp);` (si la agregaron) y también el último `delay(1000);`.
2. Escriban al final del `loop()`, antes de su llave de cierre `}`, estas cuatro líneas:

```cpp
Serial.print(suelo);
Serial.print(",");
Serial.println(temp);
delay(1000);
```

   Así, cada segundo sale una línea como `512,26.00`: primero la humedad del suelo y después la temperatura.

3. Sube el código.

Ahora registren:

1. Abre el **Monitor serie** y deja el invernadero funcionando **15 minutos**.
   - Con las pilas puestas, para que pueda regar. No toquen nada mientras tanto.
2. Copia todo el texto (Ctrl + A, Ctrl + C) y pégalo en la hoja de cálculo.
   - Haz clic dentro del texto del Monitor serie antes de presionar Ctrl + A.
   - En la hoja de cálculo, haz clic en la celda **A1** y pega (Ctrl + V).
3. Sepáralo en columnas: **Datos → Texto en columnas**, separador: coma.
   - Selecciona la columna A (clic en la letra A).
   - **Excel:** Datos → Texto en columnas → Delimitados → marca **Coma** → Finalizar.
   - **Google Sheets:** Datos → Dividir texto en columnas.
   - **LibreOffice Calc:** Datos → Texto a columnas → marca **Coma** → Aceptar.
   - Si las temperaturas salen como números raros (por ejemplo 2600), reemplacen el punto por coma: **Ctrl + H**, buscar `.`, reemplazar con `,`.
4. Haz una **gráfica de línea** de la humedad del suelo.
   - Selecciona la columna A (humedad) y ve a **Insertar → Gráfico → Línea**.
   - Pónganle título y nombre a los ejes ("Lectura" abajo y "Humedad del suelo" a la izquierda).

[IMAGEN 7.2: gráfica de la humedad del suelo durante 15 minutos con un riego marcado]

Tomen una captura: **Windows + Shift + S**, arrastren un rectángulo sobre la gráfica, péguenla en Paint (Ctrl + V) y guárdenla; o tomen una foto de la pantalla con el celular.

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

Pista: en una hoja nueva, columna A el número de sábado, columna B la altura "Con sistema" y columna C la altura "Control" (las encuentran en la Parte 1 de cada guía). Seleccionen las tres columnas e inserten una gráfica de línea.

## Bitácora (15 min)

:::pregunta id="g7-b1"
¿Qué es la histéresis y por qué la necesita la ventana?
:::

Antes de irse: guarden la hoja de cálculo como `.xlsx` y el programa `equipo_NOMBRE_clima`. Súbanlos aquí (juntos en un `.zip` o uno por uno). Saquen las pilas.

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

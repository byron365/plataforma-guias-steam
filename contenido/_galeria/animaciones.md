# Galería de animaciones

## Servo SG90

```markdown
:::animacion tipo="servo"
:::
```

:::animacion tipo="servo"
:::

Con el rango de la pinza de garra_robotica.ino:

```markdown
:::animacion tipo="servo" variable="pinza" min="30" max="90"
:::
```

:::animacion tipo="servo" variable="pinza" min="30" max="90"
:::

## Perilla → analogRead → map → ángulo

```markdown
:::animacion tipo="perilla" pin="A0"
:::
```

:::animacion tipo="perilla" pin="A0"
:::

## Diagrama de conexiones

Circuito listo con los pines de garra_robotica.ino (servos y pilas):

```markdown
:::animacion tipo="conexiones" circuito="garra-servos"
:::
```

:::animacion tipo="conexiones" circuito="garra-servos"
:::

También: `circuito="garra-control"` (perillas y botón) y `circuito="garra"` (todo).
O escribiendo los cables en una tabla:

```markdown
:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Servo: señal | D9 | naranja | Pin con ~ (PWM) |
| Servo: + | 5V | rojo | |
| Servo: − | GND | café | |
| Perilla: extremo | 5V | rojo | |
| Perilla: centro | A0 | amarillo | |
| Perilla: extremo 2 | GND | negro | |
:::
```

:::animacion tipo="conexiones"
| Desde | Hasta | Color | Nota |
| --- | --- | --- | --- |
| Servo: señal | D9 | naranja | Pin con ~ (PWM) |
| Servo: + | 5V | rojo | |
| Servo: − | GND | café | |
| Perilla: extremo | 5V | rojo | |
| Perilla: centro | A0 | amarillo | |
| Perilla: extremo 2 | GND | negro | |
:::

## Booleano en Blender (Diferencia)

```markdown
:::animacion tipo="booleano"
:::
```

:::animacion tipo="booleano"
:::

## Pinza de engranes

```markdown
:::animacion tipo="engranes" cerrada="30" abierta="90"
:::
```

:::animacion tipo="engranes" cerrada="30" abierta="90"
:::

## Fuente externa y GND común

```markdown
:::animacion tipo="fuente" pin="9"
:::
```

:::animacion tipo="fuente" pin="9"
:::

## Diagrama de flujo

Ejemplo con la lógica de loop() en garra_robotica.ino:

```markdown
:::animacion tipo="flujo"
1. [inicio] Encender el Arduino
2. [decision] ¿Botón presionado? → sí: 5, no: 3
3. [entrada] Leer las 4 perillas
4. [salida] Mover los 4 servos → 2
5. [proceso] Rutina automática → 2
:::
```

:::animacion tipo="flujo"
1. [inicio] Encender el Arduino
2. [decision] ¿Botón presionado? → sí: 5, no: 3
3. [entrada] Leer las 4 perillas
4. [salida] Mover los 4 servos → 2
5. [proceso] Rutina automática → 2
:::

## Rutina automática

Sin tabla, repite rutinaAutomatica() de garra_robotica.ino:

```markdown
:::animacion tipo="rutina"
:::
```

:::animacion tipo="rutina"
:::

Con la tabla del equipo: la garra usa los ángulos que escriban (pruébalo aquí, no se guarda):

```markdown
:::tabla id="g7-rutina"
| Paso | Servo | Ángulo | Acción |
| --- | --- | --- | --- |
| 1 | Pinza | | abrir |
| 2 | Base | | al objeto |
| 3 | Hombro | | bajar |
:::

:::animacion tipo="rutina" campo="g7-rutina"
:::
```

:::tabla id="demo-rutina"
| Paso | Servo | Ángulo | Acción |
| --- | --- | --- | --- |
| 1 | Pinza | | abrir |
| 2 | Base | | al objeto |
| 3 | Hombro | | bajar |
| 4 | Codo | | acercar |
| 5 | Pinza | | agarrar |
:::

:::animacion tipo="rutina" campo="demo-rutina"
:::

## Joystick: directo o paso a paso

```markdown
:::animacion tipo="joystick" ejex="Base" ejey="Hombro"
:::
```

:::animacion tipo="joystick" ejex="Base" ejey="Hombro"
:::

## Puente levadizo completo

Simula puente_levadizo.ino: arrastra el barco río arriba.

```markdown
:::animacion tipo="puente" distancia="10" angulo="75" arriba="4000" velocidad="25"
:::
```

:::animacion tipo="puente"
:::

## Semáforo paso a paso

```markdown
:::animacion tipo="semaforo" verde="3000" amarillo="1000" rojo="3000"
:::
```

:::animacion tipo="semaforo"
:::

## Conexiones del puente

También: `circuito="semaforo"` (solo los 3 LEDs de la guía 1).

```markdown
:::animacion tipo="conexiones" circuito="puente-boton"
:::
```

:::animacion tipo="conexiones" circuito="puente-boton"
:::

## Escala de una maqueta

```markdown
:::animacion tipo="escala" escala="200"
:::
```

:::animacion tipo="escala"
:::

## Cuadrado contra triángulo

```markdown
:::animacion tipo="triangulo"
:::
```

:::animacion tipo="triangulo"
:::

## Dos servos en espejo

```markdown
:::animacion tipo="espejo-servos" max="90"
:::
```

:::animacion tipo="espejo-servos"
:::

## Sensor ultrasónico

```markdown
:::animacion tipo="ultrasonico" objeto="Barco"
:::
```

:::animacion tipo="ultrasonico"
:::

## Diagrama de flujo del puente

Con `ocultar="si"` se esconde lo que va entre llaves (lo que el equipo completa):

```markdown
:::animacion tipo="diagrama-flujo" programa="puente" ocultar="si"
:::
```

:::animacion tipo="diagrama-flujo" programa="puente" ocultar="si"
:::

## Gráfica de la prueba de carga

Lee la tabla del equipo (pruébalo aquí, no se guarda):

```markdown
:::animacion tipo="grafica-carga" tabla="g7-carga"
:::
```

:::tabla id="demo-carga"
| Peso total (g) | Altura del centro (mm) | Cuánto bajó (mm) | ¿Se ve dañado? |
| --- | --- | --- | --- |
| 0 | | 0 | |
| 50 | | | |
| 100 | | | |
| 150 | | | |
| 200 | | | |
:::

:::animacion tipo="grafica-carga" tabla="demo-carga"
:::

## Mini invernadero completo

Simula mini_invernadero.ino: la tierra se seca, riega, abre la ventana y enciende la luz.

```markdown
:::animacion tipo="invernadero" umbral="500" riego="3000" abrir="30" cerrar="27"
:::
```

:::animacion tipo="invernadero"
:::

## Mapa de causa y efecto

Sin lista muestra el ciclo del riego; con una lista, cualquier ciclo:

```markdown
:::animacion tipo="causa-efecto"
- Tierra seca
- La bomba se enciende
- La tierra se moja
:::
```

:::animacion tipo="causa-efecto"
:::

## Diagrama de flujo del invernadero

```markdown
:::animacion tipo="diagrama-flujo" programa="invernadero" ocultar="si"
:::
```

:::animacion tipo="diagrama-flujo" programa="invernadero" ocultar="si"
:::

## El relé

```markdown
:::animacion tipo="rele" pin="8" carga="Bomba" variable="BOMBA"
:::
```

:::animacion tipo="rele"
:::

## Umbral de humedad

Lee los promedios de la tabla de calibración (pruébalo aquí, no se guarda):

```markdown
:::animacion tipo="umbral" tabla="g6-calibracion"
:::
```

:::tabla id="demo-calibracion"
| Tierra | Valor 1 | Valor 2 | Valor 3 | Promedio |
| --- | --- | --- | --- | --- |
| Muy seca (vaso aparte) | | | | |
| Un poco húmeda | | | | |
| Recién regada | | | | |
:::

:::animacion tipo="umbral" tabla="demo-calibracion"
:::

## Histéresis

```markdown
:::animacion tipo="histeresis" abrir="30" cerrar="27"
:::
```

:::animacion tipo="histeresis"
:::

## Temporizador con millis()

```markdown
:::animacion tipo="temporizador" luzon="60000" luzoff="60000"
:::
```

:::animacion tipo="temporizador"
:::

## Sensor de nivel de agua

```markdown
:::animacion tipo="nivel-agua" minimo="100"
:::
```

:::animacion tipo="nivel-agua"
:::

# Dispensador de comida

## Dispensador completo

```markdown
:::animacion tipo="dispensador" abierta="70" msporgramo="20" intervalo="60000"
:::
```

:::animacion tipo="dispensador"
:::

## Tres mecanismos para soltar comida

```markdown
:::animacion tipo="mecanismos"
:::
```

:::animacion tipo="mecanismos"
:::

## Ángulo del embudo

```markdown
:::animacion tipo="embudo-angulo"
:::
```

:::animacion tipo="embudo-angulo"
:::

## Tiempo contra gramos (lee la tabla de la Guía 6)

```markdown
:::animacion tipo="tiempo-gramos" tabla="g6-gramos"
:::
```

:::animacion tipo="tiempo-gramos" tabla="g6-gramos"
:::

## Selector de tamaño con perilla

```markdown
:::animacion tipo="selector" pin="A0"
:::
```

:::animacion tipo="selector"
:::

## Servir en pasos

```markdown
:::animacion tipo="pasos-porcion" gramos="50" msporgramo="20"
:::
```

:::animacion tipo="pasos-porcion"
:::

## Nivel de comida con ultrasónico

```markdown
:::animacion tipo="nivel-ultrasonico" vacio="15"
:::
```

:::animacion tipo="nivel-ultrasonico"
:::

## Diagrama de flujo del dispensador

```markdown
:::animacion tipo="diagrama-flujo" programa="dispensador" ocultar="si"
:::
```

:::animacion tipo="diagrama-flujo" programa="dispensador"
:::

## Conexiones del dispensador

```markdown
:::animacion tipo="conexiones" circuito="dispensador"
:::
```

:::animacion tipo="conexiones" circuito="dispensador"
:::

# Estación meteorológica

## Gemelo digital

```markdown
:::animacion tipo="gemelo-digital" frio="20" calor="28"
:::
```

:::animacion tipo="gemelo-digital"
:::

## Coordenadas en Blender (columnas o tablero)

```markdown
:::animacion tipo="coordenadas-3d" modo="columnas" radio="40"
:::
```

:::animacion tipo="coordenadas-3d" modo="columnas"
:::

```markdown
:::animacion tipo="coordenadas-3d" modo="tablero" casilla="25"
:::
```

:::animacion tipo="coordenadas-3d" modo="tablero"
:::

## Extrusión en Blender

```markdown
:::animacion tipo="extrusion" radio="50" grosor="2"
:::
```

:::animacion tipo="extrusion"
:::

## LED RGB

```markdown
:::animacion tipo="rgb"
:::
```

:::animacion tipo="rgb"
:::

## Fotorresistencia (divisor de voltaje)

```markdown
:::animacion tipo="ldr" fija="10"
:::
```

:::animacion tipo="ldr"
:::

## Pantalla OLED por I2C

```markdown
:::animacion tipo="oled" direccion="0x3C"
:::
```

:::animacion tipo="oled"
:::

## Calibración con un termómetro

```markdown
:::animacion tipo="calibracion" sesgo="1.3"
:::
```

:::animacion tipo="calibracion"
:::

## Máxima y mínima

```markdown
:::animacion tipo="max-min"
:::
```

:::animacion tipo="max-min"
:::

## Datos por cable o por WiFi

```markdown
:::animacion tipo="wifi-datos" red="Wokwi-GUEST"
:::
```

:::animacion tipo="wifi-datos"
:::

## Diagrama de flujo de la estación

```markdown
:::animacion tipo="diagrama-flujo" programa="estacion" ocultar="si"
:::
```

:::animacion tipo="diagrama-flujo" programa="estacion"
:::

## Conexiones de la estación (Wokwi y protoboard)

```markdown
:::animacion tipo="conexiones" circuito="estacion"
:::
```

:::animacion tipo="conexiones" circuito="estacion"
:::

```markdown
:::animacion tipo="conexiones" circuito="estacion-real"
:::
```

:::animacion tipo="conexiones" circuito="estacion-real"
:::

# Laberinto inclinable

## Laberinto completo

```markdown
:::animacion tipo="laberinto" centro="90" inclinacion="15" suave="0.2"
:::
```

:::animacion tipo="laberinto"
:::

## Joystick sin servos (solo la lectura de X)

```markdown
:::animacion tipo="joystick" servos="no"
:::
```

:::animacion tipo="joystick" servos="no"
:::

## Soporte cardán

```markdown
:::animacion tipo="cardan" inclinacion="15"
:::
```

:::animacion tipo="cardan"
:::

## Suavizado del servo

```markdown
:::animacion tipo="suavizado" suave="0.2"
:::
```

:::animacion tipo="suavizado"
:::

## Sensor infrarrojo de obstáculos

```markdown
:::animacion tipo="ir" objeto="Canica" pin="D3"
:::
```

:::animacion tipo="ir" objeto="Canica" pin="D3"
:::

## Récord en la EEPROM

```markdown
:::animacion tipo="eeprom"
:::
```

:::animacion tipo="eeprom"
:::

## Acelerómetro MPU6050

```markdown
:::animacion tipo="acelerometro"
:::
```

:::animacion tipo="acelerometro"
:::

## Diagrama de flujo del laberinto

```markdown
:::animacion tipo="diagrama-flujo" programa="laberinto" ocultar="si"
:::
```

:::animacion tipo="diagrama-flujo" programa="laberinto"
:::

## Conexiones del laberinto (Wokwi y protoboard)

```markdown
:::animacion tipo="conexiones" circuito="laberinto"
:::
```

:::animacion tipo="conexiones" circuito="laberinto"
:::

```markdown
:::animacion tipo="conexiones" circuito="laberinto-real"
:::
```

:::animacion tipo="conexiones" circuito="laberinto-real"
:::

# Mini fútbol

## Cancha con marcador electrónico

```markdown
:::animacion tipo="futbol" duracion="180000" pausa="1500"
:::
```

:::animacion tipo="futbol"
:::

## Escala fija (sin cambiar de escala)

```markdown
:::animacion tipo="escala" escala="200" fija="si" ejemplo="Largo de la cancha|105" objetos="Jugador (alto)|1.8; Autobús (largo)|12"
:::
```

:::animacion tipo="escala" escala="200" fija="si" ejemplo="Largo de la cancha|105" objetos="Jugador (alto)|1.8; Autobús (largo)|12"
:::

## Simetría en Blender

```markdown
:::animacion tipo="simetria" mitad="50" alto="50"
:::
```

:::animacion tipo="simetria"
:::

## Escaneo 3D (fotogrametría)

```markdown
:::animacion tipo="escaneo-3d" porvuelta="14"
:::
```

:::animacion tipo="escaneo-3d"
:::

## Calibrar el sensor de la portería

```markdown
:::animacion tipo="calibracion-ir" alcance="90" pin="D3"
:::
```

:::animacion tipo="calibracion-ir"
:::

## Antirrebote con PAUSA_GOL

```markdown
:::animacion tipo="antirrebote" pausa="1500"
:::
```

:::animacion tipo="antirrebote"
:::

## Animación de gol en la OLED

```markdown
:::animacion tipo="oled-animacion" texto="GOL"
:::
```

:::animacion tipo="oled-animacion"
:::

## Contador de personas

```markdown
:::animacion tipo="contador-personas"
:::
```

:::animacion tipo="contador-personas"
:::

## Marcador por Bluetooth

```markdown
:::animacion tipo="bluetooth" duracion="180"
:::
```

:::animacion tipo="bluetooth"
:::

## Diagrama de flujo del marcador

```markdown
:::animacion tipo="diagrama-flujo" programa="futbol" ocultar="si"
:::
```

:::animacion tipo="diagrama-flujo" programa="futbol"
:::

## Conexiones del mini fútbol (Wokwi y cancha real)

```markdown
:::animacion tipo="conexiones" circuito="futbol"
:::
```

:::animacion tipo="conexiones" circuito="futbol"
:::

```markdown
:::animacion tipo="conexiones" circuito="futbol-real"
:::
```

:::animacion tipo="conexiones" circuito="futbol-real"
:::

# Banda clasificadora

## Banda completa (dos nodos)

```markdown
:::animacion tipo="banda" recorrido="1200" rojo="30" verde="90" azul="150"
:::
```

:::animacion tipo="banda"
:::

## Bus I2C (maestro y esclavos)

```markdown
:::animacion tipo="i2c" esclavos="Esclavo|8"
:::
```

:::animacion tipo="i2c"
:::

## Diagrama de bloques

```markdown
:::animacion tipo="diagrama-bloques" sistema="banda" ocultar="si"
:::
```

:::animacion tipo="diagrama-bloques" sistema="banda"
:::

## MOSFET con PWM (o solo encender y apagar)

```markdown
:::animacion tipo="mosfet" carga="Motor"
:::
```

:::animacion tipo="mosfet"
:::

```markdown
:::animacion tipo="mosfet" carga="Tira LED" pwm="no"
:::
```

:::animacion tipo="mosfet" carga="Tira LED" pwm="no"
:::

## Diodo de rueda libre

```markdown
:::animacion tipo="rueda-libre"
:::
```

:::animacion tipo="rueda-libre"
:::

## Protocolo entre los nodos

```markdown
:::animacion tipo="protocolo" sistema="banda"
:::
```

:::animacion tipo="protocolo" sistema="banda"
:::

## Calibración de colores (lee la tabla del equipo)

```markdown
:::animacion tipo="calibracion-color" tabla="g6-calibracion"
:::
```

:::animacion tipo="calibracion-color" tabla="g6-calibracion"
:::

## Crudos contra proporciones

```markdown
:::animacion tipo="proporcion-color"
:::
```

:::animacion tipo="proporcion-color"
:::

## Gráfica de una tabla del equipo

```markdown
:::animacion tipo="grafica-datos" tabla="g8-velocidad" y="aciertos (%)"
:::
```

:::animacion tipo="grafica-datos" tabla="g8-velocidad"
:::

## Matriz de confusión

```markdown
:::animacion tipo="matriz-confusion" tabla="g12-confusion"
:::
```

:::animacion tipo="matriz-confusion" tabla="g12-confusion"
:::

## Conexiones de la etapa de potencia

```markdown
:::animacion tipo="conexiones" circuito="banda-potencia"
:::
```

:::animacion tipo="conexiones" circuito="banda-potencia"
:::

# Casa inteligente

## Casa completa (central, nodos y celular)

```markdown
:::animacion tipo="casa"
:::
```

:::animacion tipo="casa"
:::

## I2C con orden de 2 bytes (letra + valor)

```markdown
:::animacion tipo="i2c" orden="L"
:::
```

:::animacion tipo="i2c" orden="L"
:::

## Diagrama de bloques de la casa

```markdown
:::animacion tipo="diagrama-bloques" sistema="casa" ocultar="si"
:::
```

:::animacion tipo="diagrama-bloques" sistema="casa"
:::

## Optoacoplador y relé

```markdown
:::animacion tipo="optoacoplador" pin="7" carga="Cerradura"
:::
```

:::animacion tipo="optoacoplador"
:::

## Conexiones de cada nodo

```markdown
:::animacion tipo="conexiones" circuito="casa-nodos"
:::
```

:::animacion tipo="conexiones" circuito="casa-nodos"
:::

## Integración paso a paso

```markdown
:::animacion tipo="integracion"
:::
```

:::animacion tipo="integracion"
:::

## Caída de voltaje (casa o robot)

```markdown
:::animacion tipo="caida-voltaje" sistema="casa"
:::
```

:::animacion tipo="caida-voltaje" sistema="casa"
:::

```markdown
:::animacion tipo="caida-voltaje" sistema="robot"
:::
```

:::animacion tipo="caida-voltaje" sistema="robot"
:::

## Luz controlada desde una página web (IoT)

```markdown
:::animacion tipo="iot" pin="2" titulo="Casa STEAM"
:::
```

:::animacion tipo="iot"
:::

# Elevador de tres pisos

## Elevador completo (central y nodos de piso)

```markdown
:::animacion tipo="elevador" velmax="200"
:::
```

:::animacion tipo="elevador"
:::

## Puente H

```markdown
:::animacion tipo="puente-h" sentidos="Sube|Baja" pines="D5|D7|D8"
:::
```

:::animacion tipo="puente-h"
:::

## Diagrama de bloques del elevador

```markdown
:::animacion tipo="diagrama-bloques" sistema="elevador" ocultar="si"
:::
```

:::animacion tipo="diagrama-bloques" sistema="elevador"
:::

## Display de 7 segmentos (bits)

```markdown
:::animacion tipo="siete-segmentos"
:::
```

:::animacion tipo="siete-segmentos"
:::

## Contrapeso

```markdown
:::animacion tipo="contrapeso" cabina="200" contrapeso="100" radio="1.5"
:::
```

:::animacion tipo="contrapeso"
:::

## Conexiones de la central

```markdown
:::animacion tipo="conexiones" circuito="elevador-central"
:::
```

:::animacion tipo="conexiones" circuito="elevador-central"
:::

## Rampa (elevador o robot)

```markdown
:::animacion tipo="rampa" sistema="elevador" llegada="90"
:::
```

:::animacion tipo="rampa" sistema="elevador"
:::

```markdown
:::animacion tipo="rampa" sistema="robot" paso="15"
:::
```

:::animacion tipo="rampa" sistema="robot"
:::

## Algoritmo del ascensor

```markdown
:::animacion tipo="algoritmo-ascensor" pisos="3"
:::
```

:::animacion tipo="algoritmo-ascensor"
:::

## Lazo abierto y lazo cerrado (elevador o robot)

```markdown
:::animacion tipo="lazo-cerrado" sistema="elevador"
:::
```

:::animacion tipo="lazo-cerrado" sistema="elevador"
:::

```markdown
:::animacion tipo="lazo-cerrado" sistema="robot"
:::
```

:::animacion tipo="lazo-cerrado" sistema="robot"
:::

# Robot con telemetría

## Robot y mando

```markdown
:::animacion tipo="robot-mando" timeout="500"
:::
```

:::animacion tipo="robot-mando"
:::

## UART entre dos Arduino

```markdown
:::animacion tipo="uart"
:::
```

:::animacion tipo="uart"
:::

## Diagrama de bloques del robot

```markdown
:::animacion tipo="diagrama-bloques" sistema="robot" ocultar="si"
:::
```

:::animacion tipo="diagrama-bloques" sistema="robot"
:::

## PWM

```markdown
:::animacion tipo="pwm" valor="128" pin="D5"
:::
```

:::animacion tipo="pwm"
:::

## Divisor de batería

```markdown
:::animacion tipo="divisor" r1="10" r2="10" factor="2.0"
:::
```

:::animacion tipo="divisor"
:::

## Mezcla diferencial

```markdown
:::animacion tipo="mezcla-diferencial" zona="20"
:::
```

:::animacion tipo="mezcla-diferencial"
:::

## Protocolo del robot

```markdown
:::animacion tipo="protocolo" sistema="robot"
:::
```

:::animacion tipo="protocolo" sistema="robot"
:::

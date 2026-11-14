# Imágenes de Robot con mando y telemetría

Guarda cada imagen en esta carpeta con el nombre exacto. Si falta, la plataforma muestra un recuadro gris con la descripción.

| Archivo | Descripción |
| --- | --- |
| IMAGEN_1.1.png | render del robot con su mando, mostrando las flechas de órdenes y telemetría entre ambos |
| IMAGEN_1.2.png | dos Arduino UNO unidos con TX y RX cruzados y GND común |
| IMAGEN_2.1.png | diagrama de bloques del robot y el mando con flechas de potencia, lógica, control y datos en colores |
| IMAGEN_3.1.png | regulador LM2596 con el multímetro midiendo 5,0 V en la salida mientras se ajusta el tornillo |
| IMAGEN_4.1.png | distribución de energía del robot con batería, fusible, interruptor, LM2596, TB6612 y Arduino con GND común |
| IMAGEN_4.2.png | conexión del HC-05 con el divisor de 1 kΩ y 2 kΩ en su pin RXD |
| IMAGEN_5.1.png | mando armado con joystick, pantalla OLED y HC-05 sobre una protoboard pequeña |
| IMAGEN_9.1.png | esquemático del robot con la batería, el fusible, el LM2596, el TB6612FNG, el Arduino, el HC-05 y el HC-SR04 |
| IMAGEN_10.1.png | esquema de la pista de pruebas con salida, slalom, pasillo angosto, zona de freno y meta |
| IMAGEN_11.1.png | robot recorriendo el slalom de la pista mientras el piloto mira la telemetría en el mando |
| IMAGEN_14.1.png | app de terminal Bluetooth en un celular con botones configurados para enviar las órdenes M al robot |

**Versión Práctica (6 sábados)** de las guías 2 a 6 (archivos `guia-NN.practica.md`), hechas el 23 de octubre con los diseños de Tinkercad Codeblocks y etiquetas. También usan IMAGEN_4.2 de la versión completa.

| Archivo | Descripción |
| --- | --- |
| IMAGEN 2.1P.png ✅ | robot y mando diseñados en Tinkercad, con etiquetas: batería de los motores, bandeja, poste, pila de 9 V del Arduino, sensor HC-SR04 en su soporte, chasis, rueda loca, Arduino, puente H L298N, rueda y motor TT, joystick, pantalla OLED y caja del mando (también en la Guía 4P) |
| IMAGEN 2.2P.png ✅ | editor de Codeblocks con sus partes señaladas: categorías, bloques, área de programa, vista 3D y botones (la misma IMAGEN 2.3T del Dispensador) |
| IMAGEN 2.3P.png ✅ | chasis con etiquetas: placa, oreja del motor con su ranura, columna de la rueda loca, paso de los cables y agujero de un poste |
| IMAGEN 2.4P.png ✅ | soporte del HC-SR04 con etiquetas: agujeros de los ojos, panel y base |
| IMAGEN 3.1P.png ✅ | bandeja con etiquetas: cerco del portabaterías, paso de los cables, agujeros de los postes y lugar del Arduino, el L298N y la protoboard |
| IMAGEN_4.1P.png | las dos fuentes del robot: batería 2S con fusible e interruptor al L298N, pila de 9 V con interruptor al jack del Arduino y el cable de GND común entre el L298N y el Arduino |
| IMAGEN 3.2P.png ✅ | caja y tapa del mando con etiquetas: agujero del USB, cerco del joystick, salida de los cables y ventana de la pantalla |
| IMAGEN_5.1P.png | mando armado en su caja impresa, con el joystick encima de la tapa y la pantalla asomada por su ventana (foto real) |

**Versión Práctica de 9 sábados (30 de octubre):** simulaciones en Tinkercad Circuits (guías 4 a 6). La 3.2P muestra la caja del mando anterior (126 × 66, para la OLED): rehacerla con la caja de 150 × 66 × 45 y la ventana de la LCD.

| Archivo | Descripción |
| --- | --- |
| IMAGEN_4.1S.png | editor de Tinkercad Circuits con sus partes señaladas *(lista, copia de la del Dispensador)* |
| IMAGEN_4.2S.png | robot simulado en Tinkercad Circuits: Arduino, chip L293D en la protoboard, dos motores y la pila de 9 V *(lista)* |
| IMAGEN_4.3S.png | sensor HC-SR04 y divisor de la batería en Tinkercad Circuits: el sensor en D2 y D3, y las dos resistencias de 10 kΩ entre el + de la pila y GND, con su punto medio en A0 *(lista)* |
| IMAGEN_5.1S.png | robot y mando simulados: el mando con dos potenciómetros y la pantalla LCD 16 × 2 I2C, unido al robot por D10, D11 y GND |

**Versión Práctica con app (9 sábados, 6 de noviembre):** el mando físico se reemplaza por una app de Android hecha en MIT App Inventor (archivos `guia-NN.app.md`). Capturas del proyecto `equipo_robot_app` en la cuenta del docente, con App Inventor en español. Usa también las imágenes de la versión Práctica, salvo la 3.2P.

| Archivo | Descripción |
| --- | --- |
| IMAGEN 2.1A.png ✅ | la 2.1P sin el mando |
| IMAGEN 6.1A.png ✅ | menú Proyectos → Comenzar un proyecto nuevo |
| IMAGEN 6.2A.png ✅ | aviso para el nombre del proyecto y Aceptar |
| IMAGEN 6.3A.png ✅ | Diseñador con la pantalla de la app terminada y sus partes numeradas (Paleta, Visor, Componentes, Cambiar nombre, Propiedades, Diseñador y Bloques) |
| IMAGEN 6.4A.png ✅ | Screen1: DispHorizontal en Centro y Título |
| IMAGEN 6.5A.png ✅ | arrastrar el SelectorDeLista al Visor |
| IMAGEN 6.6A.png ✅ | Cambiar nombre: SelectorDeLista1 → Conectar |
| IMAGEN 6.7A.png ✅ | propiedad Texto del botón Conectar |
| IMAGEN 6.8A.png ✅ | Buscar Componentes "tabular" y arrastrar la DisposiciónTabular |
| IMAGEN 6.9A.png ✅ | Columnas 3 y Filas 3 |
| IMAGEN 6.10A.png ✅ | los cuatro botones en cruz y sus nombres en Componentes |
| IMAGEN 6.11A.png ✅ | deslizador Velocidad: ValorMax, ValorMin y PosiciónDelPulsador |
| IMAGEN 6.12A.png ✅ | Conectividad → ClienteBluetooth y Componentes no visibles |
| IMAGEN 6.13A.png ✅ | ClienteBluetooth1: ByteDelimitador 10 y DesconectarSiError |
| IMAGEN 6.14A.png ✅ | Reloj1: IntervaloDelTemporizador 100 |
| IMAGEN 6.15A.png ✅ | menú Conectar → AI Companion |
| IMAGEN 6.16A.png ✅ | aviso del Companion con el código QR y el código de 6 letras tapados |
| IMAGEN 6.17A.png ✅ | pantalla de Bloques con sus partes numeradas (correo tapado) |
| IMAGEN 6.18A.png ✅ | cajón Conectar y el bloque AntesDeSelección |
| IMAGEN 6.19A.png ✅ | cajón Control y el bloque si / entonces / else |
| IMAGEN 6.20A.png ✅ | el si encajado en ejecutar |
| IMAGEN 6.21A.png ✅ | bloques Conectar.AntesDeSelección y Conectar.DespuésDeSelección (antes 6.2A) |
| IMAGEN 6.22A.png ✅ | cajón Variables e inicializar global |
| IMAGEN 6.23A.png ✅ | globo del engranaje de mover con las entradas izquierdo y derecho |
| IMAGEN 6.24A.png ✅ | tomar izquierdo al pasar el mouse sobre la entrada |
| IMAGEN 6.25A.png ✅ | variables izq y der, procedimiento mover y Velocidad.PosiciónCambiada (antes 6.3A) |
| IMAGEN 6.26A.png ✅ | bloques Presionar y Soltar de los cuatro botones (antes 6.4A) |
| IMAGEN 7.1A.png ✅ | globo del engranaje de unir con cuatro cadenas |
| IMAGEN 7.2A.png ✅ | Reloj1.Temporizador que arma y envía la orden (antes 7.1A) |
| IMAGEN 7.3A.png ✅ | aviso de App Inventor al generar el APK, con el código QR tapado (antes 7.4A) |
| IMAGEN 7.4A.png ✅ | variables mensaje y datos y procedimiento leerTelemetria (antes 7.2A) |
| IMAGEN 7.5A.png ✅ | Reloj1.Temporizador final, con la lectura de la telemetría (antes 7.3A) |

Capturas paso a paso del 13 de noviembre (a pedido de Bairon): proyecto `equipo_ejemplo_robot` armado desde cero en la cuenta
del docente, recuadros morados numerados como en las capturas de Arduino IDE. Las imágenes de solo bloques (6.23A, 6.24A, 7.1A)
se sacaron del SVG de Blockly en la propia página. Se renumeraron en el orden en que aparecen en las guías.

**Guías de práctica de armado de la versión con app** (`tipo: armado`, 13 de noviembre). AR = "armado" (la A sola ya es "app"):

| Archivo | Descripción |
| --- | --- |
| IMAGEN_9.1AR.png … IMAGEN_9.9AR.png | Guía 9: diagrama de cada paso (1 batería de los motores, 2 GND común, 3 pila de 9 V, 4 motor izquierdo, 5 motor derecho, 6 5V y GND en la protoboard pequeña, 7 HC-SR04, 8 divisor de la batería, 9 HC-05) *(listas; `herramientas/diagramas_armado.py robot`; el L298N y la batería 2S son dibujos propios)* |
| IMAGEN_9.10AR.png | Guía 9: circuito completo del robot *(lista)* |
| IMAGEN_10.1AR.png … IMAGEN_10.4AR.png | Guía 10: Arduino IDE con sus partes, ventana de placa y puerto, programa final del robot verificado (ya con `SoftwareSerial`) y botón Subir *(listas; sin Arduino conectado, la 10.2AR no muestra el COM)* |

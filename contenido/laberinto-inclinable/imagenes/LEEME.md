# Imágenes de Laberinto inclinable

Guarda cada imagen en esta carpeta con el nombre exacto. Si falta, la plataforma muestra un recuadro gris con la descripción.

| Archivo | Descripción |
| --- | --- |
| IMAGEN_1.1.png | render del laberinto inclinable terminado con la canica, el joystick y la pantalla OLED |
| IMAGEN_1.2.png | joystick analógico conectado al Arduino Uno en Wokwi |
| IMAGEN_1.3.png | simulación en Wokwi con el joystick y el servo girando según su posición |
| IMAGEN 2.1.png ✅ | ejemplo de laberinto de 7 por 7 casillas en papel cuadriculado con letras, números, salida y meta |
| IMAGEN_2.2.png | tablero de 180 por 180 mm en Blender con sus cuatro bordes y las primeras paredes del laberinto |
| IMAGEN_3.1.png | circuito completo del laberinto en Wokwi con joystick, dos servos, botón de meta, OLED y buzzer |
| IMAGEN_3.2.png | pieza de prueba de holgura con tres pasillos de 18, 20 y 22 mm junto a una canica |
| IMAGEN_3.3.png | tablero completo del laberinto en Blender con todas las paredes y el agujero de la meta |
| IMAGEN_4.1.png | foto de un estabilizador de cámara (gimbal) mostrando sus ejes de giro |
| IMAGEN_4.2.png | soporte cardán en Blender con base, torres, marco exterior y ventanas para los servos |
| IMAGEN_4.3.png | circuito real con joystick, dos servos y portapilas con el GND común señalado |
| IMAGEN_5.1.png | mecanismo armado con la base, las torres, el marco, el tablero y los dos servos |
| IMAGEN_6.1.png | sensor infrarrojo pegado debajo del tablero apuntando hacia el agujero de la meta |
| IMAGEN_6.2.png | laberinto completo con la pantalla OLED mostrando el tiempo y el joystick al lado |
| IMAGEN_7.1.png | pantalla OLED mostrando el récord mientras el laberinto espera la siguiente partida |
| IMAGEN_7.2.png | hoja de cálculo con los tiempos de las partidas y el promedio calculado |
| IMAGEN_8.1.png | ejemplo de cartel de equipo con el mapa del laberinto, la ficha técnica y el récord |
| IMAGEN_9.1.png | estudiantes compitiendo en el torneo de laberintos inclinables |
| IMAGEN_10.1.png | gráfica de tiempos por intento con una línea de tendencia que baja, mostrando la curva de aprendizaje |
| IMAGEN_11.1.png | pantalla OLED mostrando "Nivel 2 Boton=jugar" antes de iniciar la partida |
| IMAGEN_11.2.png | laberinto versión 2 en Blender con paredes curvas y obstáculos |
| IMAGEN_12.1.png | seguidor solar de dos ejes inclinando un panel solar hacia el sol |
| IMAGEN_12.2.png | agujero trampa en un pasillo del laberinto con el segundo sensor infrarrojo debajo |
| IMAGEN_13.1.png | render final del laberinto inclinado con la canica brillante, el soporte cardán y la meta en verde |
| IMAGEN_14.1.png | simulación en Wokwi con el MPU6050 y dos servos que giran al cambiar la aceleración |

**Versión Tinkercad (bloques)** de las guías 2 a 6, 11 y 13 (archivos `guia-NN.tinkercad.md`). Las de las guías 2 a 5 están hechas (21 de octubre), con etiquetas:

| Archivo | Descripción |
| --- | --- |
| IMAGEN 2.1T.png ✅ | laberinto completo diseñado en Tinkercad, con etiquetas: tablero, canica, agujero de la meta, marco, servo del tablero, servo del marco, torres, base de MDF, soporte de la pantalla y base del joystick (también en la Guía 4T) |
| IMAGEN 2.2T.png ✅ | tablero en Tinkercad Codeblocks con etiquetas: placa, borde, pared horizontal y pared vertical |
| IMAGEN 3.1T.png ✅ | tablero terminado con etiquetas: agujero de la meta y bisagra con su agujero |
| IMAGEN 3.2T.png ✅ | marco con etiquetas: ventana del servo del tablero, agujeros de los ejes y lado donde se pega el brazo del servo del marco |
| IMAGEN 3.3T.png ✅ | torre del servo (con ventana) y torre del eje (con agujero), con el pie y sus agujeros |
| IMAGEN 5.1T.png ✅ | piezas pequeñas: base del joystick, soporte del sensor y soporte de la pantalla |
| IMAGEN_6.1T.png | sensor infrarrojo parado en su soporte impreso, pegado debajo del tablero bajo el agujero de la meta (foto real) |
| IMAGEN_11.2T.png | laberinto versión 2 en Tinkercad Codeblocks con paredes curvas y obstáculos |
| IMAGEN_13.1T.png | escena final del laberinto inclinado en Tinkercad con la canica, el soporte y el marco |

**Versión Práctica con Wokwi (7 sábados, 6 de noviembre):** solo los servos con el joystick, sin sensor de meta, pantalla ni buzzer. Archivos `guia-NN.practica.md` (guías 1 a 7). Usa también la 1.1, la 1.2, la 1.3, la 2.1, la 2.2T, la 3.1T, la 3.2T, la 3.3T y la 9.1.

| Archivo | Descripción |
| --- | --- |
| IMAGEN 2.1P.png ✅ | la 2.1T sin el soporte de la pantalla y sin la nota del sensor en la meta |
| IMAGEN 5.1P.png ✅ | recorte de la 5.1T: solo la base del joystick con la salida de los cables |
| IMAGEN_6.1P.png | circuito real del laberinto con la fuente de 5 V en su jack hembra, joystick, dos servos y el GND común señalado | *(ya no hace falta desde el 13 de noviembre: la reemplaza la 6.7A)*

**Guías de práctica de armado** (`tipo: armado`, versión Práctica con Wokwi de 8 sábados; 13 de noviembre). La A del final es de "armado".

| Archivo | Descripción |
| --- | --- |
| IMAGEN_6.1A.png … IMAGEN_6.6A.png | Guía 6: diagrama de cada paso (1 el Arduino a las filas de abajo, 2 la fuente de 5 V a las de arriba, 3 GND común, 4 el servo del marco D9, 5 el servo del tablero D10, 6 el joystick en A0 y A1) *(listas; `herramientas/diagramas_armado.py laberinto`; el joystick y el jack son dibujos propios)* |
| IMAGEN_6.7A.png | Guía 6: circuito completo del laberinto *(lista)* |
| IMAGEN_7.1A.png … IMAGEN_7.4A.png | Guía 7: Arduino IDE con sus partes, ventana de placa y puerto, programa del control verificado y botón Subir *(listas; sin Arduino conectado, la 7.2A no muestra el COM)* |

| Archivo | Descripción |
| --- | --- |
| IMAGEN 4.1P.png ✅ | Guía 4 práctica: circuito en Wokwi con el joystick y los dos servos (D10 tablero, D9 marco; HORZ → A0, VERT → A1, SEL → D2) *(13 de noviembre; `herramientas/wokwi/laberinto-guia-04.diagram.json`)* |

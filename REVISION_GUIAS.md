# Revisión de las guías (octubre 2026)

Bairon pidió revisar las 154 guías para que **ningún paso dé nada por sabido**: explicar cada paso con detalle
(aunque haya más pasos), corregir incoherencias y repetir completos los pasos que antes decían "como en la guía N".

**Datos de las PCs de la academia** (confirmados por Bairon): Blender 4.2 o más nuevo **en español**, Arduino IDE **2.x**.

**Qué NO se cambió** (lo revisa un verificador automático en cada guía): los ids de preguntas, opciones, fotos y
archivos; las líneas `____`; la forma de las tablas que se llenan (celdas vacías); la cantidad de casillas de cada
lista; el código; las animaciones; los títulos y tiempos de cada parte. Así las respuestas ya guardadas no se pierden.
Tampoco se agregaron ni quitaron imágenes `[IMAGEN …]`.

**Copia de las guías originales:** `respaldos/guias-antes-de-la-revision-2026-10-10/`.

Abajo, por proyecto: las **correcciones** (cosas que estaban mal o eran incoherentes) y lo que conviene que
**Bairon revise** (decisiones de diseño que no me corresponden). Las mejoras de redacción (pasos más detallados)
no se listan una por una.

## Garra robótica

**Correcciones**
- **G3 · Eslabón del codo:** decía "duplica el eslabón del hombro y cambia sus Dimensiones a X = 85, Y = 16". En Blender
  eso encoge también la ventana del servo (23,4 → unos 20 mm) y los agujeros, y el servo ya no entra. Ahora se hace con
  los mismos pasos que el hombro, con medidas calculadas con las mismas distancias a los bordes: agujero del eje en
  X = −34.5, ventana en X = 22.5, pestañas en X = 8.75 y 36.25. **Revisar** que esas medidas te parezcan bien.
- **G4 · Engranes:** en Blender 4.2+ "Extra Mesh Objects" ya no está en Complementos; se instala desde
  *Editar → Preferencias → Obtener extensiones* (necesita internet una vez por PC). Agregué una nota al docente.
- **G4 · Mandíbulas:** el orden de pasos hacía duplicar la mandíbula después de unirla al engrane (se duplicaba
  también el engrane). Ahora se duplica antes de unir.
- **G1 · Potenciómetro:** con "pata izquierda a 5V" la perilla girada a la izquierda da 1023, pero la tabla espera 0.
  Agregué un paso: si la lectura va al revés, intercambiar los cables de las patas de los lados. **Revisar:** en las
  demás guías (y en la animación `conexiones`) se mantiene "izquierda a 5V".
- **G2 y G3:** después de aplicar cada Booleano se borra el cortador (antes solo se ocultaba con H, y luego Alt + H
  lo volvía a mostrar).
- **G3:** cada pieza terminada se mueve a un lado (Ubicación Y = 80 / −80) para que no se enciman en el archivo.
- **G13 · Render:** el archivo de la base no tiene cámara ni luz; se explica cómo agregarlas. Se arma el render a
  partir del archivo de la base (que ya está en milímetros) para que las piezas no queden a otra escala.
- **G11 · Más holgura:** si se mueve el engrane seguidor, también hay que mover su agujero en la placa (se avisa).
- **G11 · Mandíbulas más largas:** ya unida al engrane, cambiar su Dimensión estiraría el engrane; se explica cómo
  alargar solo la punta en Modo Edición.
- **Recuadro de archivo:** G1 decía "Blender" (no se usa ese día), G8 decía "Blender" (solo lo menciona el guion) y
  G10 decía "Blender y hoja de cálculo" (solo hoja de cálculo). Corregido.

**Para revisar**
- **G4 · Ubicación de la placa de la pinza:** la guía original no da la posición; ahora se explica cómo colocarla
  (detrás de los engranes, debajo de ellos, con la ventana sobre el cuerpo del servo gris).
- **G3 · Pieza A:** la pared de soporte queda justo encima del agujero central del plato; puede estorbar para poner el
  tornillo del eje del servo de la base (G4, paso 4). No lo cambié porque es diseño.
- **G14 · Wokwi:** la opción para descargar el proyecto (*Download project zip*, junto a *Save*) conviene confirmarla.
- **G6 / G12:** "une la placa de la pinza al eslabón del codo" no dice con qué tornillos; dejé "los que indique el docente".

## Dispensador de comida

**Correcciones**
- **G3 · Cuello del embudo:** el cuello para la botella (unos 29 mm) quedaba flotando en medio de la entrada de 80 mm,
  sin unirse al embudo. Agregué una **tapa** (cilindro de 80 mm × 3 mm sobre la boca del embudo) con el hueco del
  cuello, y paredes de 2 mm para el cuello. **Revisar** que te parezca bien.
- **G3 · Compuerta:** faltaba dónde poner el encastre; ahora: X = −16 (a 4 mm del borde), parado sobre la paleta.
- **G4 · Centrar el servo:** decía "código corto" sin darlo; ahora se usa el programa de la Guía 1 (pone la compuerta en 0°).
- **G10 · Reto de 50 g:** el programa final sirve 30/60/120 g según la perilla; se explica usar el programa de la
  Guía 7 con `servirGramos(50)`.
- **G11:** se explica en qué programa va cada parte (comparación de precisión en el de la Guía 7; contador en el final).
- **G12 · Imagen 12.2:** decía "sensor en la boca de la botella", pero la boca está abajo, dentro del embudo. Ahora: en la
  parte abierta de arriba (donde se cortó el fondo). Se agregó cómo ver la distancia en el Monitor serie para llenar la tabla.
- **G13 · Render:** las piezas quedaron separadas a propósito en G3 (para modelar); ahora se explica volver a juntarlas.
  Si la botella transparente se ve oscura, se usa Alfa 0.3. **Nota:** en Blender 4.2 la opción de la nota docente
  ("Refracción de espacio de pantalla") cambió de nombre; conviene probarlo en una PC de la academia.
- **Recuadro de archivo:** G1 decía "Blender" (no se usa ese día) y G10 "hoja de cálculo" (ese día se usa el código).

**Para revisar**
- **G1 · Nota docente:** dice "Error frecuente: botón conectado en diagonal… usar patas opuestas". En todas las guías
  revisadas digo que se usen **dos patas en diagonal** del botón (así siempre quedan en lados distintos del interruptor).
  Si tu nota quería decir otra cosa, dime y lo ajusto en todas.
- **G13:** medidas del plato y la base del render son "por ejemplo" (solo decorativas).

## Mini invernadero

**Correcciones**
- **G12 · Ficha de cultivo:** la columna "Ajuste en el código" tenía textos como `UMBRAL_SECO =` y por eso **no se
  podía escribir** el valor (la plataforma solo deja escribir en celdas vacías). Agregué `____` en esas 5 celdas:
  son 5 campos nuevos (g12-linea-1 a 5); los campos que ya existían no cambiaron.
- **G7 · Registro de datos:** el código del sábado 6 ya imprimía `suelo` y tenía `delay(1000)`; al agregar el
  registro con comas se repetían. Ahora se indica borrar esas líneas antes de agregar las nuevas.
- **G7:** se explica dónde va cada pieza del código de la ventana (includes, constantes, setup, loop) y cómo instalar
  la librería DHT en Arduino IDE 2.x. Texto en columnas para Excel, Google Sheets y LibreOffice.
- **G11:** se explica cómo leer el sensor de nivel para llenar la tabla (antes no había código para verlo). Para
  probar "depósito vacío" se saca el sensor del agua en vez de vaciar el depósito (para no dañar la bomba).
- **G12:** se prueba la otra planta en una copia del programa y al final se vuelve a subir el de siempre
  (como pide la nota docente).
- **G8:** quité una explicación que yo había agregado sobre `%` porque respondía la pregunta de la bitácora.
- **Recuadro de archivo:** G1 decía "Blender" (no se usa ese día); G12 tenía texto general (ese día se cambia el código).

**Para revisar**
- **G2 · Bisagra:** cada hoja tiene un nudillo de 30 mm a lo largo de todo el borde, así que dos hojas no pueden
  intercalarse como una bisagra común. En G4 escribí que se pongan **una al lado de la otra** sobre el mismo palito.
  Si tu idea era otra (por ejemplo, nudillos más cortos e intercalados), dime y ajusto G2 y G4.
- **G3 · Clip:** agregué posiciones para la abertura (Y = 6) y la pestaña (Y = −10), que la guía no daba.
- **G1 · Reto:** la guía no tenía el código; dejé pistas.

## Puente levadizo

**Correcciones**
- **G5 · Centrar los servos:** decía "centra los servos con `izq.write(0); der.write(0);`", pero el programa pone el
  servo **derecho en 180°** con el puente cerrado (`180 - a`). Si se montaba la hoja derecha en 0°, al encender daba
  media vuelta. Ahora, antes de montar las hojas, se sube el programa de la Parte 3 (su `setup` deja izquierdo en 0° y
  derecho en 180°). La animación de espejo y su pregunta pasaron al principio de la Parte 1 para que se entienda por qué.
- **G3 · Hoja:** faltaban posiciones de las barandas (Z = 7) y del encastre (X = −69, Z = −7, agujero atravesado en Y).
- **G3 · Velocidades:** se aclara que hay que cambiar el `delay` de los dos `for`.
- **G8 · Barco:** se explica paso a paso la punta en Modo Edición y se dan posiciones para cabina, mástil y bandera.
- **G11 · Botón de emergencia:** se aclara dónde va el bloque (dentro del `for` de `moverPuente`) y que hay que dar
  toques cortos: si se deja presionado, el programa vuelve a detectarlo.
- **G12:** se indica dónde va cada pieza de código de la barrera.
- **Recuadro de archivo:** G1 decía "Blender" (no se usa ese día); G10 decía "hoja de cálculo" (no se usa);
  G14 no mencionaba el código de Arduino.

**Para revisar**
- **G4 · Orientación del soporte del servo:** el soporte es una caja con hueco hacia arriba; con el servo así, el eje
  queda vertical y la hoja giraría de lado, no hacia arriba. Escribí que el soporte se pegue **acostado**, con el eje
  horizontal a lo largo de la orilla. **Confirmar** que así lo armas tú.
- **G13 · Render:** posiciones de torres y río son orientativas (para la imagen).

## Estación meteorológica

**Correcciones**
- **G10 · Nota docente:** pedía `ESPERA = 60000` (un minuto), pero `ESPERA` es `const int` y en el Arduino un `int`
  llega solo a 32 767: el número se desborda. Ahora dice cambiar la línea a `const unsigned long ESPERA = 60000;`.
- **G8 · Texto 3D:** en un archivo en milímetros el texto sale de 1 mm; se agrega cambiar el **Tamaño** a 15 (sección
  Fuente → Transformación). Si el símbolo ° no se puede escribir, usar "24.6 C".
- **G4 · Carcasa:** faltaban posiciones; se agregaron (tapa Z = 81.5 sobre las columnas, base Z = −2, soporte Z = 15,
  ranura Z = 18 abierta arriba, agujero de cables en X = 15 junto al soporte).
- **G2:** columnas con Ubicación Z = 40 (de 0 a 80, como pedía la altura de 80 mm); cómo calcular cos/sen en la calculadora.
- **G6/G7/G11:** se indica en qué línea va cada pieza de código (calibración, registro, máxima/mínima, buzzer).
- **G7:** quité una frase mía que respondía la pregunta g7-p1.
- **G5:** aviso de que la pantalla no muestra tildes ni ñ (fuente por defecto de Adafruit GFX).
- **Recuadro de archivo:** G1 (Wokwi, no Blender), G5 (código, no Wokwi), G8 (Blender, no hoja de cálculo) y
  G10 (hoja de cálculo, no Blender).

**Para revisar**
- ~~**G8:** el menú exacto del Tamaño del texto en Blender 4.2 en español~~ **Resuelto (13 oct):** en Blender 5.2 es Tipografía → Transformación → Tamaño; ("Fuente → Transformación → Tamaño") conviene
  confirmarlo en una PC de la academia.

## Laberinto inclinable

**Correcciones**
- **G6 · Suavizado:** el código del suavizado usa `SUAVE`, pero esa constante no existía en el programa de prueba de
  la Guía 4 (daba error al verificar). Ahora se indica agregar `const float SUAVE = 0.2;` junto con las variables
  `float angX, angY`, y qué líneas borrar del `loop`.
- **G4 / G5 · Ejes del tablero:** G5 dice "pon los ejes del tablero en los agujeros del marco", pero el tablero (G2–G3)
  nunca se modeló con ejes. En G4 agregué cómo hacerlos (en el archivo del tablero si aún no está impreso, o
  impresos/palitos pegados si ya lo está). **Revisar** cuál prefieres.
- **G4 · Soporte cardán:** la guía no daba posiciones. Propuse: base Z = 2.5; torres de 10 × 20 × 70 en X = ±116
  (1 mm de holgura con el marco, que mide 220); marco en Z = 60; ejes del marco en X = ±117.5; agujeros del tablero en
  el marco en Y = ±105. Las **ventanas de los servos** quedaron explicadas sin números (dependen de dónde queda el eje
  del servo). **Revisar** todo este bloque: es diseño.
- **G12 · Trampa:** al caer en la trampa, la inclinación guardada (`angX`, `angY`) no volvía al centro; se agrega la
  misma línea que tiene el bloque de la meta.
- **G11 · Niveles:** si se deja el código del récord de la Guía 7, la pantalla alterna sin parar entre el récord y el
  nivel; se indica borrarlo.
- **G3:** se agregan posiciones de la pieza de prueba (paredes en X = −34.5, −13.5, 9.5, 34.5 → pasillos de 18, 20 y
  22 mm) y unir tablero + paredes antes de exportar.
- **G2:** se explica cómo ubicar paredes (líneas entre casillas en múltiplos de 12.5) y la fila 1 abajo.
- **Recuadro de archivo:** G1 decía "Blender" (ese día es solo Wokwi).

## Mini fútbol

**Correcciones**
- **G2–G3 · Portería:** la ventana del sensor se hacía con Booleano en una pieza que tiene Simetría sin aplicar; el
  orden importa. Ahora en G2 el Booleano queda **debajo** de la Simetría sin aplicar, y en G3 se aplican en orden
  (Simetría, luego Booleano) antes de exportar. Se agregaron las posiciones de poste, travesaño, fondo y piso.
- **G4 · Remallado del escaneo:** con el modelo en milímetros, el tamaño de vóxel por defecto puede dejar Blender
  "colgado" o el modelo como una bola. Ahora el Remallado se hace **antes** de escalar a 60 mm, con tamaño de vóxel =
  altura ÷ 100. **Revisar** con un escaneo real.
- **G11 · Modo a 3 goles:** la guía pedía elegir el modo manteniendo el botón 2 s pero no decía cómo, y el modo seguía
  terminando por tiempo. Se explican los pasos (variable `modo3`, condición en el fin por goles y en el fin por tiempo).
  La nota docente declaraba `bool modo3` dentro del loop (no se vería fuera); se corrigió.
- **G13 · Círculo central:** un círculo de Blender con Solidificar no da un anillo (no tiene caras); se cambió a un
  anillo hecho con dos cilindros y Booleano.
- **G14 · Mensaje de TIEMPO:** si se pone justo después de calcular `pasado`, al terminar el partido envía un número
  enorme (resta de `unsigned long`); ahora va después del bloque del fin del partido.
- **G3:** quité una frase mía que daba la respuesta de g3-p2.
- **Recuadro de archivo:** G1 decía "Blender" (ese día es solo Wokwi).

## Banda clasificadora

**Correcciones**
- **G7 · `leerColor()` con proporciones:** puede devolver −1, y entonces `cuenta[c]++` escribe fuera de la lista
  (`cuenta[-1]`) y el Arduino puede fallar de formas raras. Ahora se indica agregar `if (c < 0) return;` en
  `clasificar()` hasta hacer el contenedor de rechazo (G13, que ya lo maneja).
- **G7 · Tabla de proporciones:** las celdas `pr >`, `pg >`, `pb >` tenían texto y no se podía escribir el límite.
  Se agregó `____` (3 campos nuevos: g7-linea-1 a 3; los existentes no cambiaron).
- **G6:** el texto decía "pon cada pieza 5 veces" pero la tabla tiene 3 filas por color; ahora dice 3 veces.
- **G3:** la fórmula se llamaba "Potencia que toma el regulador…", pero lo que calcula es una **corriente**. Corregido.
- **G1:** faltaba cómo conectar el potenciómetro y el LED del esclavo, y cómo subir dos programas a dos Arduino
  (etiquetas M/E, un USB a la vez, puertos distintos).
- **G4:** se agregó cómo ajustar el LM2596 a 5,0 V con el multímetro y el orden de patas del IRLZ44N (estaba solo
  en la nota docente).
- **G8:** para probar a valores PWM concretos no había forma de leer el valor; se agrega imprimir `vel` en el
  Monitor serie. Se explica dónde va cada línea del RECORRIDO automático.
- **G14:** se explica el divisor de voltaje, cómo emparejar el HC-05 y pistas para los comandos S/G desde el celular.
- **G5:** se agregaron la instalación de librerías y qué hacer si el display muestra "E".
- **Recuadro de archivo:** G6 decía solo "hoja de cálculo" (ese día también se cambia el código).

**Para revisar**
- **G5:** se sugiere el ejemplo "i2c_scanner" de Wire; según la versión del IDE puede no venir incluido.

## Casa inteligente

**Correcciones**
- **G1 y G5 · Monitor serie con `parseInt()`:** el maestro de la G1 y la central de pruebas de la G5 leen órdenes
  con `parseInt()`. Si el Monitor serie está en "Nueva línea" (lo normal), el salto de línea se lee como otra orden:
  en la G1 el LED **se apagaba solo** un segundo después de cada orden. Ahora se indica poner el monitor en
  **"Sin ajuste de línea"**.
- **G4 · HC-05:** pedía configurarlo con `AT+NAME` y `AT+UART` sin explicar cómo entrar al modo AT; ahora dice que lo
  hace el docente (o con su ayuda) y cómo es el procedimiento a grandes rasgos. **Revisar** si prefieres dar el
  programa puente completo.
- **G4 · Prueba del nodo entrada:** el código de prueba era solo para sala y cuarto (PWM en D9); se agrega cómo probar
  el relé (D7) y la central (ejemplo de la OLED).
- **G5 · App del celular:** la central espera un salto de línea al final de cada mensaje; se indica configurarlo en la
  app y cómo asignar los botones M1, M2…
- **G7:** dónde va `Wire.setWireTimeout`, cómo poner las pull-ups y la polaridad del capacitor de 470 µF; dónde va el
  código de "sin conexión".
- **G8:** en el nodo entrada, `armadaDesde` se cambia dentro de `recibir()`; se sugiere declararla `volatile`.
  Se explica qué líneas reemplazar en cada nodo (histéresis, velocidad proporcional, retardo).
- **Recuadro de archivo:** G12 decía "hoja de cálculo" (no se usa); G13 no mencionaba el código final.


## Elevador de tres pisos

**Correcciones**
- **G1:** cómo quitar el jumper de ENA y a cuál de sus dos pines va D5, GND común, dónde va el fusible, cómo subir
  el programa y cómo hacer cada prueba (cambiar `frenar()` por `motor(0)`, buscar la velocidad mínima).
- **G2 · Wokwi:** el display de 7 segmentos de Wokwi es de **ánodo común** por defecto y el código es para cátodo
  común; se indica agregar `"common": "cathode"` en `diagram.json`. Pasos completos para armar el nodo.
- **G3:** pasos para el cálculo de torque, uso del multímetro (continuidad en el microswitch y corriente en serie con
  el borne de 10 A) y cómo medir la prueba de la torre.
- **G4:** montaje de reed, finales de carrera (C → GND, NO → pin, porque el código lee LOW = tocado), paro y ajuste del
  LM2596 a 5 V antes de conectarlo. Dónde pegar el código de *homing*.
- **G5 · Parte 1:** pedía usar "el código de la central (Parte 3)" antes de mostrarlo; ahora explica paso a paso qué
  copiar, qué línea agregar y qué función reemplazar. Cómo cargar los tres nodos cambiando `DIRECCION`.
- **G7, G8, G13, G14:** dónde va cada fragmento de código (freno, rearme, rampa, algoritmo del ascensor, puerta,
  Bluetooth). En la G14 se aclara que el aviso "Llego al piso" va **antes** de `destino = -1;` (si va después,
  imprime "piso 0").
- **G6 y G8:** cómo medir el error de parada con signo, el promedio y los tiempos de espera con un solo cronómetro.
- **Recuadro de archivo:** G5 hablaba de Wokwi (ese día no se usa); G12 de hoja de cálculo (no se usa).

**Para revisar**
- **G4/G5 · Llamada al piso 1 justo después del *homing*:** la cabina queda sobre el final de carrera, "un poco
  debajo del piso 1". Si ahí el reed del piso 1 no la detecta, una llamada al piso 1 deja la central atascada:
  `destino = 0`, intenta bajar, el tope de abajo la detiene y nunca se borra la llamada (tampoco atiende las demás).
  En la G4 se agregó ajustar la altura para que el reed marque X tocando el tope; otra opción es cambiar el código
  para que, tras el *homing*, suba despacio hasta el reed del piso 1.
- **G6 · Prueba "Llamar 3 y luego 2 rápido estando en 1 → Va al 2 primero":** con el código base el destino se
  elige una sola vez y no cambia hasta llegar, así que va primero al 3 (pasa por el 2 sin parar). El algoritmo del
  ascensor de la G8 tampoco lo cambia. Decidir si se corrige el resultado esperado o el código.
- **G3/G4 · Contacto NA o NC:** la G3 explica que NC es más seguro, pero el código (y la G4) usan NA (LOW = tocado).
  Para usar NC habría que invertir la lógica en el código.
- **G7 · Rearme:** el texto dice que se puede usar "el botón de llamada del piso 1 o un botón en A3", pero el código
  solo contempla A3.

## Robot con telemetría

**Correcciones**
- **G1 · Prueba sin GND común:** si los dos Arduino están en la misma computadora, las tierras siguen unidas por los
  USB y la prueba "no hace nada". Se indica conectar el B a un cargador o a otra computadora. También cómo usar dos
  ventanas del IDE con una sola computadora y poner el Monitor serie en "Nueva línea".
- **G3:** fórmulas para llenar la tabla L298N/TB6612, cómo usar el multímetro para ajustar el LM2596 y cómo armar el
  divisor.
- **G4 · Modo AT:** la tabla decía EN a 3,3 V y los pasos decían usar el botón; ahora se explica cuándo usar cada uno,
  cómo configurar los dos módulos con el mismo Arduino y cómo escribir la dirección en `AT+BIND`.
- **G5:** instalación de la librería SSD1306 (con GFX), alimentación del mando, qué hacer si el eje Y está invertido
  (estaba solo en la nota docente) y que el bloque de comandos AT del final es un comentario.
- **G6 · Calibrar la batería:** la fórmula usa "lectura", que el robot no muestra; se explica obtenerla como voltaje
  del mando ÷ 2. Cómo medir el tiempo y la distancia de parada.
- **G7, G8:** dónde va cada línea (monitor de depuración, verificación de largo, ajuste de motor, rampa, freno). La
  rampa decía "cada 20 ms" sin decir cómo: se explica con `millis()` igual que la telemetría. Cómo medir consumo con
  el programa de prueba de la G4. Pistas para la alerta de batería baja.
- **G13 · Modo automático:** el botón del joystick (SW) no estaba conectado en ningún lado; se sugiere D2 del mando.
  Se avisa que el mensaje `A` debe revisarse antes de la verificación de largo de la G7 (si no, se descarta).
- **G14:** la app debe enviar salto de línea al final (Newline), si no el robot nunca procesa el mensaje.
- **Recuadro de archivo:** G6 y G13 no mencionaban el código (ese día se cambia); G9 hablaba solo de Wokwi;
  G12 de hoja de cálculo (no se usa).

**Para revisar**
- **G8 · Tabla de la rampa:** la columna "Tiempo de 0 a 255 (ms)" no se puede medir a mano (son décimas de segundo) y
  sale con la misma cuenta que pide la pregunta g8-p1. Decidir si se calcula o se cambia por algo observable.
- **G13 · Modo automático:** las pistas (botón en D2, mensaje `A`, seguir actualizando `ultimoMensaje`) son una
  propuesta mía; revisa si coincide con cómo quieres que lo resuelvan.
- **G4 · Divisor de batería:** indiqué conectarlo después del interruptor para que no descargue la batería con el
  robot apagado; confirma que así lo arman en la academia.

## Mini fútbol · pasos de Blender (13 de octubre)

- **G2:** recordatorio de cómo se usa Blender al inicio de la portería (dónde funcionan los atajos, cómo
  agregar una pieza con Shift + A o con el menú **Agregar**, dónde está el Panel N, cómo escribir medidas,
  seleccionar, renombrar y mirar el modelo). Cada pieza repite completo: Shift + A → Malla → Cubo, medidas y
  nombre. Se explica dónde está la llave inglesa (Propiedades), cómo elegir el objeto del Booleano y cómo
  ocultar/mostrar (H / Alt + H). Pasos para el reto de la red con Matriz.
- **G3 y G4:** dónde están los modificadores y las opciones de exportar; cómo agregar y colocar el
  cilindro de la base del trofeo (G y luego Z), y cómo mirar de frente sin teclado numérico.
- **G8 · Reto de la medalla — corrección:** decía unir el texto con el disco con Ctrl + J, pero Blender no une
  un texto con una malla: ahora se convierte antes (**Objeto → Convertir → Malla**). Además, en milímetros un
  texto nuevo mide 1 mm, así que se agranda (S, 6) y el grosor se fija después de convertirlo (Dimensiones Z = 1).
- **G13:** recordatorio de Blender (duplicar con Shift + D, materiales y cómo reusarlos, vista Material) y medidas
  concretas de la línea de media cancha, los bordes, el círculo central (con el cilindro `hueco`), las
  porterías (ubicación y giro), la pelota y el trofeo.

**Para revisar**
- Para mirar de frente o desde arriba sin teclado numérico indiqué los círculos de colores de los ejes (arriba a
  la derecha de la vista 3D) en lugar de nombres de menú, porque no pude confirmar cómo se llama el menú
  "Punto de vista" en Blender 4.2 en español.

## Nombres de Blender en español (13 de octubre)

Los nombres de la interfaz se comprobaron en el archivo de traducción de **Blender 5.2** instalado en la PC
(`C:\Program Files\Blender Foundation\Blender 5.2\5.2\datafiles\locale\es\LC_MESSAGES\blender.mo`).
Varios nombres de las guías no coincidían:

| Decían las guías | Nombre real en Blender 5.2 |
| --- | --- |
| Matriz (Array) | **Repetir** |
| Simetría (Mirror) | **Simetrizar** |
| Booleano | **Booleana** |
| Remallado / Vóxel | **Rehacer malla** / **Vóxeles** |
| Añadir modificador | **Agregar modificador** |
| Esquema | **Listado** |
| Ubicación (Panel N) | **Posición** |
| Fijar origen | **Definir origen** |
| Escala de unidad | **Escala de unidades** |
| Solo selección (exportar) | **Sólo lo seleccionado** |
| X → Eliminar | **X → Borrar** |
| Esfera UV | **Esfera** |
| Extrusión (texto) | **Extruir** |
| Enmarcar seleccionado | **Encuadrar lo seleccionado** |
| Torno (Screw) | **Enroscar** |

- **Mini fútbol:** corregido en las guías 2, 3, 4, 8 y 13. El reto de la red (G2) ahora da posiciones exactas
  (barras en X = 12 a 44 con Repetir y el otro lado con Simetrizar) y cómo unirla a la portería para imprimir.
- **Tanda 1 · Garra (57 líneas) y Dispensador (33 líneas):** corregidos. Además: Bevel → **Biselar**,
  Motor de render → **Motor de procesamiento** (pestaña **Procesamiento**), Propiedades de escena → **Propiedades de la
  escena**, Obtener extensiones → **Administrar extensiones**. Los engranajes de la Garra (extensión Extra Mesh Objects)
  no vienen traducidos: la guía ahora da sus nombres en inglés (**Gears → Gear**, **Number of Teeth**, **Radius**, **Width**).
- **Tanda 2 · Invernadero (28 líneas) y Puente (33 líneas):** corregidos. También "Dimensión Z" → **Dimensiones Z**, y
  una pestaña **Render** que había quedado en el Mini fútbol (G13). Al anexar piezas (Archivo → Anexar), la carpeta
  **Object** puede verse como **Objeto**: se avisa en Garra G13 y Puente G13.
- **Tanda 3 · Estación (44 líneas) y Laberinto (35 líneas):** corregidos. Además: en el texto 3D la sección del tamaño
  es **Tipografía → Transformación → Tamaño** (decía "Fuente") y el grosor es **Extruir** (decía "Extrusión");
  "Abanico" → **Abanico de triángulos**; el título de la Parte 5 de Estación G2 pasa a "Seis platos con Repetir"
  (aprobado en el verificador: los títulos no guardan respuestas); en Laberinto G13, Rugosidad 0,1 → **0.1**
  (Blender no acepta la coma).
- **Revisión completa:** las 154 guías pasan el verificador. Lo que queda con "Matriz" o "Ubicación" no es de
  Blender ("Matriz de confusión", "Matriz de pruebas", tabla de sensores del Elevador).

---
titulo: 'La app (2): órdenes y telemetría'
guia: 7
sabado: 7
sesion: App Inventor (2)
duracion: 120
---

# Guía 7 · La app (2): órdenes y telemetría

## Objetivo del día

Hacer que la app envíe las órdenes al robot, instalarla en un celular Android, programar la telemetría y dejar la app terminada.

**Al terminar tendremos:** la app instalada en el celular, mostrando la orden de cada botón y lista para conectarse al robot.

## Materiales del equipo

- Computadora con internet y la cuenta de Google de la Guía 6
- Proyecto `equipo_NOMBRE_robot` en App Inventor (sábado 6)
- **Un celular o tablet con Android** (en iPhone no funciona)
- Bitácora

## Parte 1 · Enviar las órdenes (25 min)

El **Reloj1** se dispara 10 veces por segundo. En cada vuelta arma el mensaje `M,izq,der` con las variables y, si hay conexión, lo envía terminado en salto de línea (`\n`).

Abran el proyecto y toquen **Bloques**. Armen este bloque:

[IMAGEN 7.1A: bloque Reloj1.Temporizador que arma la orden en la etiqueta Orden y la envía con ClienteBluetooth1.EnviarTexto]

| Bloque | ¿Dónde está? |
| --- | --- |
| cuando Reloj1.Temporizador | Cajón **Reloj1** |
| poner Orden.Texto como / Orden.Texto | Cajón **Orden** |
| unir | Cajón **Texto**. Trae dos espacios: toquen su engranaje azul y arrastren más **cadena** hasta tener cuatro |
| tomar global izq | Cajón **Variables**, bloque **tomar** (elijan `global izq` en la lista) |
| si / entonces / else | Cajón **Control** |
| ClienteBluetooth1.Conectado | Cajón **ClienteBluetooth1** (verde claro) |
| llamar ClienteBluetooth1.EnviarTexto | Cajón **ClienteBluetooth1** (morado) |

Escriban `\n` tal cual, con la barra invertida: es el salto de línea que el robot espera.

:::pregunta id="g7a-p1"
Mientras presionamos **Adelante** con la velocidad en 150, ¿qué texto muestra la etiqueta `Orden`? ¿Qué texto muestra al soltar?
:::

## Parte 2 · Instalar la app en el celular (25 min)

1. En App Inventor: **Generar → App de Android (.apk)**. Esperen a que la barra llegue al 100 %.
2. Aparece un aviso con un **código QR**, que sirve por 2 horas.

[IMAGEN 7.4A: aviso de App Inventor con el botón de descarga y el código QR de la app]

3. Escaneen el código con la cámara del celular (o con una app de lector QR) y abran el enlace para descargar la app.
4. Abran el archivo descargado. Android pregunta si permite instalar apps de este origen: toquen **Ajustes**, activen **Permitir** y vuelvan a tocar **Instalar**.
5. Abran la app. Si pide permiso para **dispositivos cercanos** o Bluetooth, toquen **Permitir**.

Todavía no hay robot, pero la etiqueta `Orden` nos deja probar los botones:

:::tabla id="g7a-botones"
| Prueba | ¿Funciona? | Lo que muestra `Orden` |
| --- | --- | --- |
| Mantener presionado **Adelante** | | |
| Soltar | | |
| Mantener presionado **Atrás** | | |
| Mantener presionado **Izquierda** | | |
| Mantener presionado **Derecha** | | |
| Mover el deslizador y presionar **Adelante** | | |
:::

Si un botón no hace lo esperado, revisen sus dos números en los bloques (Guía 6, Parte 4).

## Parte 3 · La telemetría (40 min)

El robot envía `T,bat,dist` tres veces por segundo. La app tiene que recibirlo, **separarlo por las comas** y mostrar cada dato. Si el mensaje es `T,7.4,32`, separado queda una lista de tres elementos:

| Elemento | 1 | 2 | 3 |
| --- | --- | --- | --- |
| Valor | T | 7.4 | 32 |
| Significado | Es telemetría | Batería (V) | Distancia (cm) |

Armen estos bloques: dos variables nuevas y el procedimiento `leerTelemetria`.

[IMAGEN 7.2A: variables mensaje y datos y procedimiento leerTelemetria]

| Bloque | ¿Dónde está? |
| --- | --- |
| crear una lista vacía, longitud de la lista, seleccionar elemento de la lista | Cajón **Listas** |
| recortar (quita los espacios y saltos de línea de las orillas) | Cajón **Texto** |
| recorta texto en (separa el texto en una lista) | Cajón **Texto**. Ojo: es otro bloque, parecido al anterior |
| llamar ClienteBluetooth1.RecibirTexto | Cajón **ClienteBluetooth1** (morado). El **−1** significa "hasta el salto de línea" |
| comparar textos | Cajón **Texto** |
| y | Cajón **Lógica** |
| = y < | Cajón **Matemáticas** |
| poner Bateria.ColorDeTexto como | Cajón **Bateria** |
| El rojo y el negro | Cajón **Colores** |

Ahora agreguen la lectura en el **Reloj1.Temporizador**. Debajo de **llamar ClienteBluetooth1.EnviarTexto**, dentro del **entonces**, pongan un **si** nuevo:

[IMAGEN 7.3A: bloque Reloj1.Temporizador final, que llama a leerTelemetria cuando hay datos]

- **llamar ClienteBluetooth1.BytesDisponiblesParaRecibir** está en el cajón **ClienteBluetooth1**: dice cuántas letras llegaron y están esperando.
- **Llamar leerTelemetria** está en **Procedimientos**.

:::pregunta id="g7a-p2"
Si llega el mensaje `T,6.5,18`, ¿qué muestran las etiquetas `Bateria` y `Distancia`? ¿De qué color queda la batería?
:::

:::pregunta id="g7a-p3"
¿Para qué sirve revisar que la lista tenga 3 elementos y que el primero sea `T` antes de usarla?
:::

## Parte 4 · La app terminada (10 min)

1. **Generar → App de Android (.apk)** otra vez e instalen la app nueva sobre la anterior.
2. Guarden una copia: **Proyectos → Exportar a mi ordenador el proyecto (.aia) seleccionado**.

## ¿Lo logramos? (5 min)

:::checklist id="g7a-logramos"
- [ ] El Reloj1 arma y envía la orden.
- [ ] La app está instalada en un celular Android.
- [ ] Cada botón muestra su orden en la etiqueta `Orden`.
- [ ] Armamos `leerTelemetria` y la agregamos al Reloj1.
:::

## Bitácora (15 min)

:::foto id="g7a-foto"
Foto de la app abierta en el celular.
:::

:::pregunta id="g7a-b1"
¿Qué fue lo más difícil de programar con bloques? ¿Cómo lo resolvimos?
:::

:::archivo id="g7-archivo"
**Archivo de trabajo:** suban aquí el `.aia` de la app. Con ese archivo pueden volver a abrirla en cualquier cuenta: **Proyectos → Importar proyecto (.aia) desde mi ordenador**. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla.
:::

:::docente
- **Versión Práctica con app (9 sábados):** segunda guía de App Inventor. Proyecto de referencia en la cuenta del docente: `equipo_robot_app`. Campos propios (g7a-…).
- **Hace falta un celular o tablet Android por equipo** (el de un integrante, de la familia o de la academia). App Inventor no permite Bluetooth clásico en iPhone y el HC-05 usa Bluetooth clásico.
- La instalación pide permitir "apps de origen desconocido" en ese celular: pedir permiso a la familia si el celular no es del estudiante. Los nombres exactos cambian un poco según la marca de Android.
- Si la computadora no tiene internet, o el QR no abre, el botón **Descargar .apk** del mismo aviso baja el archivo a la computadora y se puede pasar al celular por cable.
- La telemetría no se puede probar hoy: se prueba con el robot en la Guía 9.
- `recortar` (trim) y `recorta` (split) tienen casi el mismo nombre en español: revisar que usen cada uno en su lugar.
- `RecibirTexto` con −1 lee hasta el `ByteDelimitador` (10), que se puso en la Guía 6. Si se les olvidó, la telemetría no aparece.
- g7a-p1: `M,150,150`; al soltar, `M,0,0`.
- g7a-p2: `¡BATERÍA BAJA! 6.5 V` en rojo y `Distancia: 18 cm`.
- g7a-p3: para no intentar leer datos de un mensaje incompleto o de otra cosa; la app se detendría con un error.
- Tiempo total: 25 + 25 + 40 + 10 + 5 + 15 = 120 minutos.
:::

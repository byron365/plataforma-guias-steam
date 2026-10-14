# Plataforma local de guías interactivas · STEAM Robotics Academy

Hola, Claude. Soy Bairon Alas, docente de robótica en STEAM Robotics Academy. Quiero que construyas
conmigo una **plataforma web que corra en mi computadora** y que mis estudiantes abran desde sus
dispositivos por la red local (Wi-Fi del aula). Lee todo este documento antes de empezar y
trabajemos por fases.

## 1. Contexto

- Doy clases los sábados, de 2 horas. Tengo varios grupos y cada equipo trabaja un proyecto
  distinto al mismo tiempo (por ejemplo: garra robótica, puente levadizo, estación meteorológica).
- Cada proyecto tiene **14 guías**, una por sábado. Cada guía tiene: objetivo, materiales, partes
  con tiempo sugerido, código de Arduino, preguntas, tablas para completar, espacios para imágenes,
  una lista de verificación "¿Lo logramos?", un reto extra, la bitácora y notas para el docente.
- El primer proyecto es la **Garra robótica** (nivel Básico, Arduino UNO, diseño 3D en Blender).
  Te pasaré sus 14 guías exportadas en Markdown en la carpeta `contenido/garra-robotica/`.
- Los estudiantes tienen entre 10 y 14 años aproximadamente. Todo debe estar en **español**.

## 2. Objetivo

1. Una **página de inicio** donde cada estudiante elige su proyecto y su equipo.
2. Las **guías interactivas** de ese proyecto: con animaciones, preguntas que se pueden responder
   y progreso que **se guarda** en mi computadora.
3. Un **panel del docente** para ver el avance y las respuestas de todos los equipos.

Todo centralizado en mi PC. Yo solo comparto un enlace local (por ejemplo `http://192.168.1.20:3000`).

## 3. Requisitos técnicos

- **Debe funcionar sin internet.** Nada de CDN ni fuentes externas: todas las librerías, fuentes
  e imágenes se guardan dentro del proyecto.
- Stack sugerido (puedes proponer otro si tienes una buena razón, pero explícamelo antes):
  Node.js + Express, base de datos **SQLite** (archivo local), frontend en HTML, CSS y JavaScript
  sin frameworks pesados.
- El servidor escucha en `0.0.0.0` y al arrancar muestra en la consola la dirección local para
  compartir (y si es fácil, un código QR en la consola o en el panel del docente).
- Un solo comando para arrancar: `npm start`. Instrucciones claras para Windows (incluido cómo
  permitir el puerto en el firewall) y cómo encontrar mi IP local.
- Diseño **responsive**: debe verse bien en computadoras, tabletas y celulares. Botones grandes,
  letra legible, contraste alto.
- Contraseña del docente en un archivo `.env`. Los datos de los estudiantes no salen de mi PC.
- Copia de seguridad automática de la base de datos (por ejemplo, una al día en `respaldos/`)
  y exportación de respuestas a CSV desde el panel.

## 4. Identidad visual

- Logo: `publico/img/logo.jpg` (fondo negro; te lo pongo en esa carpeta).
- Colores: oscuro `#0E1015`, claro `#F5F2EC`, acento naranja `#F06A35` (texto naranja sobre fondo
  claro: `#C2410C`), azul de apoyo `#3B82F6`.
- Fuentes (descárgalas y guárdalas localmente): Space Grotesk para títulos, Inter para texto,
  JetBrains Mono para código.
- Estilo limpio, moderno y amigable para niños, sin verse infantil.

## 5. Cómo entran los estudiantes

1. Página de inicio: tarjetas grandes con cada proyecto (imagen, nombre y nivel).
2. Eligen su **equipo** de una lista (los equipos los creo yo en el panel) e ingresan el
   **PIN de 4 dígitos** del equipo, que también defino yo. Sin correos ni contraseñas largas.
3. Escriben su nombre (para saber quién respondió qué dentro del equipo).
4. Llegan a la página del proyecto con la lista de las 14 guías y su estado:
   bloqueada, disponible, en progreso o completada. Yo decido desde el panel qué guías están
   desbloqueadas cada sábado.
5. La sesión se recuerda en el dispositivo para que no tengan que entrar cada vez.

## 6. La guía interactiva

Cada guía se muestra por partes (como pasos), con una barra de progreso arriba y el tiempo
sugerido de cada parte. Debe incluir:

- **Preguntas abiertas** (cuadro de texto) que se guardan solas mientras escriben
  (autoguardado con un pequeño indicador "Guardado ✓").
- **Tablas para completar** (como las de medidas, límites de servos, pruebas de agarre o tiempos
  del reto), editables celda por celda y guardadas.
- **Listas de verificación** "¿Lo logramos?" con casillas que se guardan.
- **Bloques de código** con resaltado de sintaxis y botón "Copiar".
- **Imágenes:** los espacios marcados como `[IMAGEN 4.3: descripción]` buscan el archivo
  `contenido/<proyecto>/imagenes/IMAGEN_4.3.png` (o .jpg). Si todavía no existe, muestran un
  recuadro gris con la descripción, para que la guía se pueda usar igual.
- **Bitácora:** respuestas de texto y, si es posible, **subida de fotos** desde el celular
  (se guardan en una carpeta del servidor, asociadas al equipo y a la guía).
- **Notas para el docente:** visibles solo en el panel del docente, nunca para los estudiantes.
- Al terminar todas las casillas de "¿Lo logramos?", el equipo puede marcar la guía como
  completada y ve una pequeña celebración.

## 7. Animaciones interactivas (proyecto Garra robótica)

Hechas con SVG, CSS y JavaScript propios (sin librerías externas), insertadas dentro de la guía
donde corresponde. Que el estudiante pueda tocar, arrastrar o mover algo, no solo mirar:

| Guía | Animación | Qué puede hacer el estudiante |
| --- | --- | --- |
| 1 | Servo SG90 | Un deslizador cambia el ángulo y el brazo del servo gira; muestra el valor de `write()` |
| 1 | Perilla → `analogRead` → `map` → ángulo | Girar una perilla virtual y ver los tres números cambiar |
| 1 y 5 | Diagrama de conexiones | Pasar el dedo o el mouse sobre cada cable y ver a qué pin va |
| 2 | Booleano en Blender | Ver un cubo al que se le resta otro cubo para formar el hueco de la base |
| 4 | Pinza de engranes | Mover un deslizador y ver cómo dos engranes giran en sentidos opuestos |
| 5 | Fuente externa y GND común | Activar o desactivar la unión de GND y ver qué pasa |
| 3 y 7 | Diagrama de flujo | Avanzar paso a paso y ver qué recuadro se ejecuta |
| 7 | Rutina automática | Una garra en 2D que repite los 9 pasos de la rutina con los ángulos que el equipo escribió en su tabla |
| 14 | Joystick | Mover un joystick virtual y ver la diferencia entre control directo y paso a paso |

Diseña el sistema de animaciones como **componentes reutilizables**, para poder usarlos después
en otros proyectos (puente, invernadero, estación, etc.).

## 8. Formato del contenido (para agregar más proyectos sin programar)

Las guías se guardan como archivos Markdown, uno por guía, en `contenido/<proyecto>/guia-01.md`,
etc., más un archivo `contenido/<proyecto>/proyecto.json` con el nombre, nivel, imagen y lista de
guías. Define bloques especiales fáciles de escribir para mí, por ejemplo:

```
:::pregunta id="g1-p1"
¿Qué articulación de tu brazo se parece más a un servo?
:::

:::animacion tipo="servo"
:::

:::checklist id="g1-logramos"
- Nuestro equipo tiene nombre y roles.
- El servo se movió solo a 0°, 90° y 180°.
:::

:::docente
Un solo servo puede alimentarse desde el 5V del Arduino.
:::
```

Las tablas de Markdown con celdas vacías se convierten automáticamente en tablas editables.
Las líneas con `______` se convierten en campos de respuesta. Las casillas `- [ ]` en
listas de verificación. Así puedo pegar las guías exportadas casi sin cambios.

Escribe un pequeño documento `COMO_AGREGAR_PROYECTOS.md` que me explique, en lenguaje sencillo,
cómo agregar un proyecto nuevo, sus guías y sus imágenes.

## 9. Panel del docente

- Entrar con la contraseña del `.env`.
- Crear proyectos, equipos y sus PIN.
- Desbloquear o bloquear guías por proyecto (o por equipo).
- Ver una tabla de avance: equipos en filas, guías en columnas, con colores por estado.
- Abrir las respuestas de un equipo en una guía (preguntas, tablas, fotos y casillas).
- Ver las notas del docente de cada guía.
- Reiniciar el progreso de un equipo y exportar todo a CSV.
- Mostrar la dirección local y el código QR para compartir.

## 10. Forma de trabajo

Trabajemos por fases. Al terminar cada una, dime cómo probarla y espera mi visto bueno:

1. **Fase 1:** estructura del proyecto, servidor, base de datos, página de inicio, entrada por
   equipo y PIN, y la **Guía 1 de la garra completa** con sus dos animaciones (servo y perilla).
2. **Fase 2:** las guías 2 a 14 de la garra con el resto de animaciones.
3. **Fase 3:** panel del docente completo.
4. **Fase 4:** subida de fotos, respaldos, exportación CSV y detalles finales.

Reglas:

- Antes de instalar cualquier cosa, dime qué vas a instalar y por qué.
- Código ordenado y comentado en español, para que yo pueda entenderlo.
- No inventes contenido pedagógico: usa el de mis guías. Si algo falta o no es claro, pregúntame.
- Al final de cada fase, prueba que el servidor arranque y que las páginas carguen sin errores.

## 11. Lo que te entregaré

- `contenido/garra-robotica/guia-01.md` a `guia-14.md` (exportadas de mi documento de guías).
- `publico/img/logo.jpg`.
- Las imágenes de las guías a medida que las tenga, con su código en el nombre
  (por ejemplo `IMAGEN_1.3.png`).

¡Empecemos por la Fase 1!

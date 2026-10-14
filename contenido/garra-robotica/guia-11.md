---
titulo: Versión 2.0
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Versión 2.0

## Objetivo del día

Aplicar las mejoras que elegimos el sábado 10: rediseñar la pinza en Blender y mejorar el código.

**Al terminar tendremos:** la pinza versión 2 exportada para imprimir y el código mejorado probado en la garra.

## Materiales del equipo

- Lista de mejoras (sábado 10)
- Computadora con Blender y el archivo de la pinza
- Garra completa con su circuito

## Parte 1 · Repaso rápido (10 min)

Los ingenieros casi nunca aciertan a la primera: prueban, encuentran fallas y mejoran. Esto se llama **iteración**.

Copien aquí las dos mejoras que eligieron al final de la Guía 10 (pueden abrirla en la plataforma):

Nuestra mejora de la pinza: ______

Nuestra mejora del código: ______

## Parte 2 · Rediseñar la pinza (50 min)

1. Abre el archivo de la pinza y guárdalo con otro nombre: `equipo_NOMBRE_pinza_v2.blend`. Así conservamos la versión 1.
   - El archivo de la versión 1 es `equipo_NOMBRE_pinza.blend` (Guía 4). Si están en otra computadora, descárguenlo del recuadro "Archivo de trabajo" de la Guía 4 y, si es un `.zip`, ábranlo con doble clic y saquen el `.blend` (clic derecho → **Extraer todo**).
   - En Blender: **Archivo → Abrir →** `equipo_NOMBRE_pinza.blend`, y enseguida **Archivo → Guardar como →** `equipo_NOMBRE_pinza_v2.blend`.
2. Aplica tu mejora. Algunas ideas y cómo hacerlas:

| Problema | Mejora | Cómo hacerla en Blender |
| --- | --- | --- |
| Los objetos resbalan | Puntas con agarre | Agregar cubos pequeños o una ranura en la cara interna y unir con Ctrl + J |
| No alcanza objetos grandes | Mandíbulas más largas | Seleccionar la mandíbula y aumentar su dimensión Y |
| Los engranes se traban | Más holgura | Separar 0,3 mm más los centros de los engranes |
| La placa se dobla | Placa más gruesa | Cambiar Z de 4 a 5 mm o agregar un refuerzo con el modificador Biselar |
| La pinza pesa mucho | Aligerar | Restar ventanas rectangulares donde no hay esfuerzo |

   Más detalle para las mejoras que tienen trucos:

   - **Mandíbulas más largas:** como la mandíbula ya está unida a su engrane, no se puede cambiar su Dimensión sin estirar también el engrane. Hazlo así: selecciona el engrane con su mandíbula y presiona **Tab** (Modo Edición). Mira desde arriba (tecla **7** o bolita **Z**) con rayos X (**Alt + Z**). Presiona **Alt + A** para no tener nada seleccionado y arrastra un rectángulo con el mouse **solo** alrededor de la punta de la mandíbula. Presiona **G**, luego **Y**, escribe cuántos milímetros quieres alargarla con signo menos (por ejemplo **−10**) y **Enter**. Sal con **Tab**. Repite en la otra mandíbula con el mismo número.
   - **Más holgura:** cambia la Posición X del engrane seguidor de 20.5 a **20.8**. ¡Ojo! El agujero del tornillo M3 en la placa debe moverse igual: haz un cilindro nuevo de 3.2 mm en X = 20.8 para restarlo, o la placa no coincidirá con el engrane.
   - **Placa más gruesa:** selecciona la `placa` y en el Panel N cambia su Dimensión Z de 4 a 5.
   - **Aligerar:** usa modificadores Booleana en modo Diferencia con cubos, lejos de los agujeros y de la ventana del servo (deja al menos 4 mm de material alrededor de cada hueco).

3. Comprueba con el servo de referencia que todo siga encajando.
   - Muestra todo con **Alt + H** y mira con rayos X (**Alt + Z**) desde arriba y de frente.
   - El eje del servo gris debe seguir debajo del centro del engrane motriz y el servo no debe atravesar la placa.
4. Exporta las piezas cambiadas con `_v2` en el nombre.
   - Exporta solo las que cambiaste. Por ejemplo, si alargaste las mandíbulas: `equipo_NOMBRE_pinza_motriz_v2.stl` y `equipo_NOMBRE_pinza_seguidor_v2.stl`.
   - Recuerda: clic solo en la pieza → **Archivo → Exportar → STL (.stl)** → **Sólo lo seleccionado** → nombre → **Exportar STL**.

[IMAGEN 11.1: comparación en Blender de la pinza versión 1 y versión 2, lado a lado]

5. Toma una captura de pantalla de tu pinza v2: presiona **Windows + Shift + S**, arrastra un rectángulo sobre la pinza y la imagen queda copiada. Pégala en Paint (Ctrl + V) y guárdala, o toma la foto de la pantalla con el celular.

:::foto id="g11-v2"
Captura de nuestra pinza versión 2 en Blender.
:::

## Parte 3 · Mejorar el código (35 min)

Primero abran el programa de la rutina (`equipo_NOMBRE_rutina`, Guía 7) y guárdenlo como `equipo_NOMBRE_v2` (**Archivo → Guardar como**). Así la versión 1 del código también se conserva.

Elige una de estas mejoras (o la que anotaron el sábado 10):

**Opción A · Movimiento suave en modo manual.** El servo persigue a la perilla poco a poco y la garra no da tirones.

1. Arriba del programa, debajo de las otras variables, agrega:
   - Busca la línea `int pB = 90, pH = 90, pC = 90, pP = 60;` y escribe esta línea nueva justo debajo:

```cpp
float sB = 90, sH = 90, sC = 90, sP = 60;  // posiciones suaves
```

2. En el modo manual del `loop()`, cambia las líneas de cada servo por estas (con tus límites):
   - El modo manual es lo que está dentro de `} else {` en el `loop()`.
   - Borra las ocho líneas que van desde `pB = leer(A0, ...` hasta `pinza.write(pP);` y escribe en su lugar las de abajo. Deja el `delay(20);`.
   - Cambia los números de cada `leer()` por tus límites, igual que estaban.

```cpp
    sB += (leer(A0, 0, 180) - sB) * 0.2;
    sH += (leer(A1, 15, 165) - sH) * 0.2;
    sC += (leer(A2, 15, 165) - sC) * 0.2;
    sP += (leer(A3, 30, 90) - sP) * 0.2;
    pB = sB;  pH = sH;  pC = sC;  pP = sP;
    base.write(pB);
    hombro.write(pH);
    codo.write(pC);
    pinza.write(pP);
```

   ¿Qué hace? En cada vuelta, el servo avanza solo una parte (0.2, o sea la quinta parte) de lo que le falta para llegar a la perilla. Por eso llega suave.

**Opción B · Rutina más rápida.** Bajen `VELOCIDAD` de 15 a 8 y revisen que la garra no suelte el objeto. Si lo suelta, prueben 10 o 12.

- La línea está arriba del programa: `const int VELOCIDAD = 15;`. Cambien solo el número, suban el código y presionen el botón.
- Cronometren la rutina antes y después del cambio para comparar.

**Opción C · Aviso de rutina.** Conecten un LED con resistencia de 220 Ω al pin 7 y enciéndanlo al inicio de `rutina()` con `digitalWrite(7, HIGH);` y apáguenlo al final. (No olviden `pinMode(7, OUTPUT);` en el `setup()`.)

1. **Conectar el LED** (con el USB y las pilas desconectados):
   - El LED tiene una pata larga (+) y una corta (−).
   - Pata larga → una punta de la resistencia de 220 Ω → la otra punta de la resistencia → pin **7** del Arduino.
   - Pata corta → fila **−** (GND) de la protoboard.
2. **En el `setup()`:** agrega una línea nueva con `pinMode(7, OUTPUT);` (por ejemplo, después de `pinza.attach(9);`).
3. **En `rutina()`:** justo después de `void rutina() {` agrega `digitalWrite(7, HIGH);`, y justo antes de la llave `}` que cierra `rutina()` agrega `digitalWrite(7, LOW);`.
4. Sube el código y presiona el botón: el LED debe encenderse mientras dura la rutina.

:::opciones id="g11-opcion"
Opción elegida
- A · Movimiento suave
- B · Rutina más rápida
- C · Aviso de rutina
:::

:::opciones id="g11-funciono"
¿Funcionó?
- Sí
- Con ajustes
- No
:::

## Parte 4 · Antes y después (10 min)

Comparen la versión 1 con la versión 2. Escriban frases cortas, por ejemplo: "mandíbulas de 45 mm" → "mandíbulas de 55 mm". El tiempo del reto con la pinza nueva lo llenarán la próxima semana, cuando esté impresa.

| Aspecto | Versión 1 | Versión 2 |
| --- | --- | --- |
| Pinza | | |
| Código | | |
| Tiempo del reto (cuando esté impresa la pinza) | | |

## ¿Lo logramos? (5 min)

:::checklist id="g11-logramos"
- [ ] Guardamos la versión 1 y creamos la versión 2.
- [ ] Aplicamos la mejora de la pinza y exportamos.
- [ ] Aplicamos y probamos una mejora del código.
- [ ] Completamos la tabla de antes y después.
:::

## Reto extra

Aplica una segunda mejora del código de la lista.

## Bitácora (10 min)

:::pregunta id="g11-b1"
¿Por qué guardamos la versión 1 en lugar de borrarla?
:::

:::pregunta id="g11-b2"
¿Qué mejora se notó más?
:::

:::pregunta id="g11-b3"
¿Qué otra mejora haríamos con más tiempo?
:::

Antes de irse, guarden en un `.zip` el archivo `equipo_NOMBRE_pinza_v2.blend`, los `.stl` nuevos y el programa `equipo_NOMBRE_v2` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí:

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las pinzas versión 2 esta semana para montarlas el sábado 12.
- La Opción A es la misma fórmula de suavizado del proyecto del laberinto en Básico II: buen adelanto.
- Tiempo total: 10 + 50 + 35 + 10 + 5 + 10 = 120 minutos.
:::

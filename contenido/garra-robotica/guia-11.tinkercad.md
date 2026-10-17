---
titulo: Versión 2.0
guia: 11
sabado: 11
sesion: Mejoras finales
duracion: 120
---

# Guía 11 · Versión 2.0

## Objetivo del día

Aplicar las mejoras que elegimos el sábado 10: rediseñar la pinza en Tinkercad y mejorar el código.

**Al terminar tendremos:** la pinza versión 2 exportada para imprimir y el código mejorado probado en la garra.

## Materiales del equipo

- Lista de mejoras (sábado 10)
- Computadora con internet y la cuenta de Tinkercad con los diseños de la pinza
- Garra completa con su circuito

## Parte 1 · Repaso rápido (10 min)

Los ingenieros casi nunca aciertan a la primera: prueban, encuentran fallas y mejoran. Esto se llama **iteración**.

Copien aquí las dos mejoras que eligieron al final de la Guía 10 (pueden abrirla en la plataforma):

Nuestra mejora de la pinza: ______

Nuestra mejora del código: ______

## Parte 2 · Rediseñar la pinza (50 min)

1. Abran en Tinkercad los diseños de la pinza (**Diseños → Codeblocks**): `equipo_NOMBRE_pinza_motriz`, `equipo_NOMBRE_pinza_seguidor` y `equipo_NOMBRE_pinza_placa` (Guía 4).
   - Pueden cambiarlos sin miedo: los `.stl` de la versión 1 ya los exportaron en la Guía 4 (están en el recuadro "Archivo de trabajo" de esa guía).
   - En cualquier computadora sirve: entren con la misma cuenta de Tinkercad.
2. Aplica tu mejora. Algunas ideas y cómo hacerlas:

| Problema | Mejora | Cómo hacerla en Tinkercad |
| --- | --- | --- |
| Los objetos resbalan | Puntas con agarre | Agregar cubos pequeños o una ranura hueca en la cara interna, antes de Seleccionar todo |
| No alcanza objetos grandes | Mandíbulas más largas | Aumentar la L del Cubo de la mandíbula y su Mover Y |
| Los engranes se traban | Más holgura | Separar 0,3 mm más los centros de los engranes |
| La placa se dobla | Placa más gruesa | Cambiar el alto de 4 a 5 mm o redondear sus aristas |
| La pinza pesa mucho | Aligerar | Agregar cubos huecos donde no hay esfuerzo |

   Más detalle para las mejoras que tienen trucos:

   - **Mandíbulas más largas:** en los dos diseños de engranes, cambia la **L** del Cubo de la mandíbula (por ejemplo de 45 a **55**) y su **Mover Y** a la mitad con signo menos (**−27.5**), para que siga saliendo desde el centro del engrane. Usa el mismo número en las dos mandíbulas. No uses **Definir tamaño**: estiraría también el engrane.
   - **Más holgura:** la distancia entre los engranes la marca la **placa**. En `equipo_NOMBRE_pinza_placa`, cambia el **Mover X** del agujero del seguidor de 20.5 a **20.8**.
   - **Placa más gruesa:** en el Cubo de la placa, cambia el segundo **A** de 4 a 5. Para redondear sus bordes, prueben **arista** = 1 o 2.
   - **Aligerar:** agrega **Cubos** huecos antes de **Seleccionar todo**, lejos de los agujeros y de la ventana del servo (deja al menos 4 mm de material alrededor de cada hueco).

3. Comprueba que todo siga encajando.
   - Ejecuta con **▷** y mira desde arriba (cara **SUPERIOR**): los agujeros y la ventana deben seguir dentro de la placa y con material alrededor.
   - El agujero del motriz debe seguir en el centro del engrane (X = 0, Y = 0): el eje del servo va justo debajo.
4. Exporta las piezas cambiadas con `_v2` en el nombre.
   - Exporta solo las que cambiaste. Por ejemplo, si alargaste las mandíbulas: `equipo_NOMBRE_pinza_motriz_v2.stl` y `equipo_NOMBRE_pinza_seguidor_v2.stl`.
   - Recuerda: **Compartir** → **.STL** → cámbiale el nombre.

[IMAGEN 11.1T: comparación en Tinkercad de la pinza versión 1 y versión 2, lado a lado]

5. Toma una imagen de tu pinza v2: **Compartir** → en **Descargar un archivo**, toca **Imagen o vídeo**, gira y acerca la pieza y presiona **Captura de pantalla**. La imagen queda en **Descargas**.

:::foto id="g11-v2"
Captura de nuestra pinza versión 2 en Tinkercad.
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

Antes de irse, guarden en un `.zip` los `.stl` nuevos y el programa `equipo_NOMBRE_v2` (clic derecho → **Comprimir en archivo ZIP**) y súbanlo aquí:

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban los .stl nuevos y su código de Arduino (.ino). Los diseños de bloques quedan guardados en Tinkercad (**Diseños → Codeblocks**). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las pinzas versión 2 esta semana para montarlas el sábado 12.
- La Opción A es la misma fórmula de suavizado del proyecto del laberinto en Básico II: buen adelanto.
- Tiempo total: 10 + 50 + 35 + 10 + 5 + 10 = 120 minutos.
:::

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

Nuestra mejora de la pinza: ______

Nuestra mejora del código: ______

## Parte 2 · Rediseñar la pinza (50 min)

1. Abre el archivo de la pinza y guárdalo con otro nombre: `equipo_NOMBRE_pinza_v2.blend`. Así conservamos la versión 1.
2. Aplica tu mejora. Algunas ideas y cómo hacerlas:

| Problema | Mejora | Cómo hacerla en Blender |
| --- | --- | --- |
| Los objetos resbalan | Puntas con agarre | Agregar cubos pequeños o una ranura en la cara interna y unir con Ctrl + J |
| No alcanza objetos grandes | Mandíbulas más largas | Seleccionar la mandíbula y aumentar su dimensión Y |
| Los engranes se traban | Más holgura | Separar 0,3 mm más los centros de los engranes |
| La placa se dobla | Placa más gruesa | Cambiar Z de 4 a 5 mm o agregar un refuerzo con Bevel |
| La pinza pesa mucho | Aligerar | Restar ventanas rectangulares donde no hay esfuerzo |

3. Comprueba con el servo de referencia que todo siga encajando.
4. Exporta las piezas cambiadas con `_v2` en el nombre.

[IMAGEN 11.1: comparación en Blender de la pinza versión 1 y versión 2, lado a lado]

:::foto id="g11-v2"
Captura de nuestra pinza versión 2 en Blender.
:::

## Parte 3 · Mejorar el código (35 min)

Elige una de estas mejoras (o la que anotaron el sábado 10):

**Opción A · Movimiento suave en modo manual.** El servo persigue a la perilla poco a poco y la garra no da tirones.

1. Arriba del programa, debajo de las otras variables, agrega:

```cpp
float sB = 90, sH = 90, sC = 90, sP = 60;  // posiciones suaves
```

2. En el modo manual del `loop()`, cambia las líneas de cada servo por estas (con tus límites):

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

**Opción B · Rutina más rápida.** Bajen `VELOCIDAD` de 15 a 8 y revisen que la garra no suelte el objeto. Si lo suelta, prueben 10 o 12.

**Opción C · Aviso de rutina.** Conecten un LED con resistencia de 220 Ω al pin 7 y enciéndanlo al inicio de `rutina()` con `digitalWrite(7, HIGH);` y apáguenlo al final. (No olviden `pinMode(7, OUTPUT);` en el `setup()`.)

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

:::archivo id="g11-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Imprimir las pinzas versión 2 esta semana para montarlas el sábado 12.
- La Opción A es la misma fórmula de suavizado del proyecto del laberinto en Básico II: buen adelanto.
- Tiempo total: 10 + 50 + 35 + 10 + 5 + 10 = 120 minutos.
:::

---
titulo: Sembrar y medir
guia: 1
sabado: 1
sesion: Introducción al proyecto STEAM
duracion: 120
---

# Guía 1 · Sembrar y medir

## Objetivo del día

Conocer el proyecto del mini invernadero, organizar el equipo, sembrar nuestras plantas y hacer las primeras pruebas con Arduino: una luz y un sensor de humedad.

**Al terminar tendremos:** dos macetas sembradas, el equipo con roles y el Arduino diciéndonos si la tierra está seca o húmeda.

## Materiales del equipo

- 2 macetas pequeñas o vasos reciclados con agujero abajo
- Tierra y semillas de crecimiento rápido (rábano o frijol)
- Arduino UNO y cable USB
- 1 LED blanco y resistencia de 220 Ω
- Sensor de humedad de suelo (capacitivo)
- Protoboard, cables y computadora con Arduino IDE
- Etiquetas y marcador

## Parte 1 · ¿Qué necesita una planta? (15 min)

Una planta necesita **agua**, **luz**, **temperatura adecuada** y **aire**. Un **invernadero** es una casa para plantas que las protege y les da lo que necesitan. El nuestro será inteligente: regará solo cuando la tierra esté seca, abrirá una ventana si hace calor y encenderá una luz.

[IMAGEN 1.1: render del mini invernadero terminado con la planta, la ventana abierta, la bomba y la luz]

:::animacion tipo="invernadero"
:::

:::pregunta id="g1-p1"
¿Qué le pasa a una planta si recibe demasiada agua? ¿Y si recibe muy poca?
:::

## Parte 2 · Sembrar (20 min)

Sembraremos **dos macetas iguales**:

| Maceta | Etiqueta | ¿Cómo la cuidaremos? |
| --- | --- | --- |
| 1 | "Con sistema" | La regará el invernadero |
| 2 | "Control" | La regaremos a mano, sin sensores |

La maceta **control** sirve para comparar: al final veremos si el sistema ayudó a la planta.

1. Llena las dos macetas con tierra, sin apretar mucho.
2. Haz 3 agujeros de 1 cm de profundidad y pon una semilla en cada uno.
3. Tapa con tierra y riega un poco.
4. Etiquétalas con el nombre del equipo.

[IMAGEN 1.2: dos macetas sembradas con las etiquetas "Con sistema" y "Control"]

## Parte 3 · Nuestro equipo (15 min)

Los roles rotan cada 3 o 4 sábados para que todos hagan de todo.

| Rol | ¿Qué hace? | Nombre |
| --- | --- | --- |
| Diseñador | Bocetos y modelo 3D en Blender | |
| Constructor | Arma el invernadero y el circuito | |
| Programador | Escribe y prueba el código | |
| Documentador | Bitácora, fotos, datos y cuidado de las plantas | |

Nombre de nuestro equipo: ______

## Parte 4 · La luz de crecimiento (25 min)

Conecta el LED: pata larga → resistencia 220 Ω → **D6**; pata corta → **GND**.

```cpp
const int LUZ = 6;

void setup() {
  pinMode(LUZ, OUTPUT);
}

void loop() {
  digitalWrite(LUZ, HIGH);   // encender
  delay(3000);               // 3 segundos
  digitalWrite(LUZ, LOW);    // apagar
  delay(3000);
}
```

| Instrucción | ¿Qué hace? |
| --- | --- |
| `pinMode(pin, OUTPUT)` | Prepara el pin para encender algo |
| `digitalWrite(pin, HIGH)` | Enciende |
| `digitalWrite(pin, LOW)` | Apaga |
| `delay(1000)` | Espera 1 segundo |

:::pregunta id="g1-p2"
En el invernadero real, la luz debería estar encendida muchas horas. ¿Cuántos milisegundos son 1 minuto?
:::

## Parte 5 · ¿Seca o húmeda? (25 min)

Conecta el sensor de humedad: **VCC → 5V**, **GND → GND**, **AOUT → A0**.

[IMAGEN 1.3: sensor de humedad de suelo capacitivo conectado a 5V, GND y A0]

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int suelo = analogRead(A0);   // número de 0 a 1023
  Serial.println(suelo);
  delay(500);
}
```

Abre el **Monitor serie** (lupa arriba a la derecha) y anota:

:::tabla id="g1-sensor"
| Dónde está el sensor | Valor |
| --- | --- |
| En el aire | |
| En tierra seca | |
| En la maceta recién regada | |
| En un vaso con agua | |
:::

:::pregunta id="g1-p3"
¿El número sube o baja cuando hay más agua?
:::

## ¿Lo logramos? (5 min)

:::checklist id="g1-logramos"
- [ ] Sembramos las dos macetas.
- [ ] Cada integrante tiene su rol.
- [ ] El LED se enciende y se apaga.
- [ ] Leímos el sensor en seco y en húmedo.
:::

## Reto extra

Haz que el LED se encienda **solo cuando la tierra está seca**, usando un `if` con el valor del sensor.

## Bitácora (15 min)

:::foto id="g1-foto"
Foto de las dos macetas sembradas.
:::

:::pregunta id="g1-b1"
¿Para qué sirve la maceta control?
:::

:::pregunta id="g1-b2"
¿Qué fue lo más difícil de hoy?
:::

:::archivo id="g1-archivo"
**Archivo de trabajo:** antes de irse, suban su archivo de Blender (.blend; si exportaron la pieza, también el .stl) y su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Sembrar el primer día es clave: así habrá plantas que medir al final del proyecto.
- Las plantas se quedan en el aula: asignar un responsable de regar la maceta control (con medio vaso de agua) a mitad de semana si se puede.
- El sensor capacitivo da valores más altos en seco (≈500–600) y más bajos en húmedo (≈250–350). El resistivo da lo contrario; si usan resistivo, invertir la condición en todo el proyecto.
- g1-p2: 60 000 ms.
- No meter el sensor capacitivo en agua por encima de la línea marcada: la parte de arriba tiene electrónica.
- Tiempo total: 15 + 20 + 15 + 25 + 25 + 5 + 15 = 120 minutos.
:::

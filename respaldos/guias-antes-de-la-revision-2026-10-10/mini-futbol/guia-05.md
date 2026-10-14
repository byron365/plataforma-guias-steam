---
titulo: Porterías que sienten el gol
guia: 5
sabado: 5
sesion: Integración de sistemas
duracion: 120
---

# Guía 5 · Porterías que sienten el gol

## Objetivo del día

Instalar los sensores infrarrojos en las porterías y armar el marcador real con la pantalla OLED y el buzzer.

**Al terminar tendremos:** la cancha con marcador electrónico real que detecta los goles y los celebra.

## Materiales del equipo

- Cancha con porterías (sábado 4)
- Arduino UNO + cable USB
- 2 sensores infrarrojos de obstáculos (FC-51 o similar)
- Pantalla OLED SSD1306, buzzer, botón
- Protoboard, cables largos (macho-hembra), pegamento caliente
- Caja pequeña o soporte para el marcador

## Parte 1 · ¿Cómo detecta el gol? (15 min)

El sensor infrarrojo tiene dos "ojitos": uno **emite** luz infrarroja (invisible) y otro la **recibe**. Si la pelota pasa frente a él, la luz rebota, el receptor la ve y el sensor pone su salida en **LOW**. Su LED se enciende.

:::animacion tipo="ir" objeto="Pelota" pin="D3"
:::

:::pregunta id="g5-p1"
¿Por qué crees que usamos luz infrarroja y no luz normal?
:::

## Parte 2 · Instalar los sensores (30 min)

1. Coloca cada sensor por detrás de la portería, con sus ojitos en la **ventana del fondo**, mirando hacia la cancha.
2. Fíjalo con pegamento caliente (solo en la placa, no en los ojitos).
3. Pasa los cables por el agujero detrás de la portería hasta el marcador.

[IMAGEN 5.1: sensor infrarrojo montado detrás de la portería con sus emisores en la ventana del fondo]

| Componente | Conexión |
| --- | --- |
| Sensor portería azul | VCC → 5V · GND → GND · OUT → D3 |
| Sensor portería roja | VCC → 5V · GND → GND · OUT → D4 |
| Botón de inicio | D2 y GND |
| Buzzer | + → D5 · − → GND |
| OLED | SDA → A4 · SCL → A5 · VCC → 5V · GND → GND |

:::animacion tipo="conexiones" circuito="futbol-real"
:::

[IMAGEN 5.2: circuito real del marcador con Arduino, OLED, buzzer, botón y los cables de los dos sensores]

## Parte 3 · Probar cada sensor (20 min)

Sube este código de prueba y abre el **Monitor serie**:

```cpp
void setup() {
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.print("Azul: ");
  Serial.print(digitalRead(3));
  Serial.print("   Rojo: ");
  Serial.println(digitalRead(4));
  delay(200);
}
```

| Prueba | Valor portería azul | Valor portería roja |
| --- | --- | --- |
| Sin pelota | | |
| Pelota dentro de la azul | | |
| Pelota dentro de la roja | | |
| Pelota pasando rápido por la azul | | |

## Parte 4 · El marcador real (30 min)

1. Carga el **código base del sábado 3**.
2. **Cambio importante:** en `setup()` cambia `INPUT_PULLUP` por `INPUT` en los dos sensores (el sensor real ya da su propia señal).
3. Coloca el marcador en su caja o soporte a un lado de la cancha.
4. Prueben metiendo goles con la mano.

[IMAGEN 5.3: marcador terminado a un lado de la cancha mostrando AZUL 1 - 0 ROJO]

| Prueba | ¿Funciona? | Observaciones |
| --- | --- | --- |
| Gol en la portería azul suma al ROJO | | |
| Gol en la portería roja suma al AZUL | | |
| Suena la celebración | | |
| El tiempo baja | | |

:::pregunta id="g5-p2"
¿Pasó que un gol se contó dos veces o que un gol no se contó? Describe qué pasó.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g5-logramos"
- [ ] Los dos sensores están instalados en las porterías.
- [ ] Los sensores cambian a 0 con la pelota.
- [ ] El marcador real cuenta los goles.
- [ ] El buzzer celebra los goles.
:::

## Reto extra

Cambia los sonidos de la celebración: que cada equipo tenga **su propio sonido** de gol.

## Bitácora (15 min)

:::foto id="g5-foto"
Video corto de un gol con el marcador sumando.
:::

:::pregunta id="g5-b1"
¿Qué problema tuvimos hoy y cómo lo resolvimos?
:::

:::archivo id="g5-archivo"
**Archivo de trabajo:** antes de irse, suban su código de Arduino (.ino). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Si un sensor marca siempre 0, está detectando algo cerca (la propia portería): girar su tornillo azul para bajar la sensibilidad. Se calibra a fondo el sábado 6.
- Si los cables son muy largos (más de 50 cm), trenzar señal y GND para reducir interferencias.
- Pelotas blancas se detectan mejor que las negras.
- g5-p2 abre la necesidad del antirrebote y la calibración del sábado 6.
- Tiempo total: 15 + 30 + 20 + 30 + 5 + 15 = 115 minutos (5 de margen).
:::

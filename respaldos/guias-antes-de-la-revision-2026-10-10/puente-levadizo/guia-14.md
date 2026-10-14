---
titulo: El puente del futuro
guia: 14
sabado: 14
sesion: Proyección a Básico II
duracion: 120
---

# Guía 14 · El puente del futuro

## Objetivo del día

Conocer el simulador Wokwi, que usaremos mucho en Básico II, simulando nuestro puente, e imaginar el puente 2.0.

**Al terminar tendremos:** nuestro puente simulado en Wokwi y el plan del puente 2.0.

## Materiales del equipo

- Computadora con internet
- Cuenta en wokwi.com
- Código final del puente

## Parte 1 · ¿Qué es un simulador? (10 min)

Un **simulador** es un programa que imita un circuito real. Con él podemos probar código sin cables y sin miedo a quemar nada. En **Wokwi** el Arduino, los LEDs y el sensor son virtuales, pero el código es el mismo.

:::pregunta id="g14-p1"
¿Qué ventajas tiene probar un circuito en un simulador antes de armarlo?
:::

## Parte 2 · Nuestro puente en Wokwi (50 min)

1. Entra a **wokwi.com** y crea un proyecto de **Arduino Uno**.
2. Con el botón **+** agrega: 3 LEDs (verde, amarillo, rojo), 3 resistencias, un **Buzzer**, un **HC-SR04** y dos **Servos**.
3. Conecta igual que en el puente real:

| Componente | Pin |
| --- | --- |
| LEDs verde / amarillo / rojo | D2 / D3 / D4 |
| Buzzer | D5 |
| HC-SR04 Trig / Echo | D7 / D8 |
| Servo izquierdo / derecho | D9 / D10 |

[IMAGEN 14.1: puente levadizo simulado en Wokwi con los LEDs, el buzzer, el sensor ultrasónico y los dos servos]

4. Copia el **código final** de tu puente y presiona **Play**.
5. Haz clic en el HC-SR04: aparece un control para cambiar la distancia. Bájala a menos de 10 cm.

| Prueba en Wokwi | ¿Funciona igual que el real? |
| --- | --- |
| El semáforo empieza en verde | |
| Al acercar el "barco" suena la alarma | |
| Los servos se mueven en espejo | |
| Vuelve a verde al terminar | |

:::pregunta id="g14-p2"
¿Qué diferencias encontraste entre el puente real y el simulado?
:::

## Parte 3 · El puente 2.0 (40 min)

:::checklist id="g14-ideas"
- [ ] Motor DC con engranes para levantar hojas más pesadas
- [ ] Control remoto o desde el celular
- [ ] Sensores a los dos lados del río
- [ ] Pantalla que muestra cuántos barcos pasaron
- [ ] Barreras automáticas a los dos lados
- [ ] Puente de otro tipo (giratorio o elevador)
:::

:::tabla id="g14-plan"
| Pregunta | Respuesta |
| --- | --- |
| Nombre del puente 2.0 | |
| ¿Qué mejoras tendría? | |
| ¿Qué componentes nuevos necesitaría? | |
| ¿Qué necesitamos aprender? | |
:::

:::foto id="g14-boceto"
Foto del boceto del puente 2.0.
:::

## ¿Lo logramos? (5 min)

:::checklist id="g14-logramos"
- [ ] Creamos el puente en Wokwi.
- [ ] El código funcionó en el simulador.
- [ ] Diseñamos el puente 2.0.
:::

## Reto extra

Comparte el enlace de tu simulación con tu familia para que prueben el puente desde casa.

## Bitácora (15 min)

:::pregunta id="g14-b1"
Enlace de nuestra simulación en Wokwi:
:::

:::pregunta id="g14-b2" individual="si"
¿Qué es lo que más quiero aprender en Básico II?
:::

:::archivo id="g14-archivo"
**Archivo de trabajo:** antes de irse, suban su proyecto de Wokwi (descárguenlo como .zip). La próxima sesión lo descargan en cualquier computadora y siguen donde se quedaron. Si llevan la bitácora en el bloc de notas o en Word, también pueden subirla aquí (.txt o .docx).
:::

:::docente
- Crear las cuentas de Wokwi al inicio; en Wokwi el LED necesita resistencia igual que en el real (es buena costumbre).
- Si el servo en Wokwi no se ve moverse, revisar que el pin PWM esté conectado a D9/D10.
- Mencionar que en Básico II se programa más con Wokwi, pantallas OLED y sensores nuevos.
- Tiempo total: 10 + 50 + 40 + 5 + 15 = 120 minutos.
:::

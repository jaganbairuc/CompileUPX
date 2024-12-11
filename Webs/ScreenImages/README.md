# 🖨️ Imágenes automáticas

El centro tiene un problema: en la entrada principal cuentan con una pantalla sin uso, que simplemente se encuentra apagada como si de decoración se tratase.<br>
Para no dejar la pantalla sin uso alguno, se pensó que podría programarse de alguna forma para que, de forma automática a una fecha y hora determinada, se ponga alguna imagen cualquiera.<br>

#

Buscamos alguna forma de encender de forma automática un pequeño dispositivo conectado a la pantalla en cuestión, ya sea por una configuración, script u objeto externo. Posteriormente, generaremos un script en `batch` para abrir Google Chrome en pantalla completa, cosa que fue sorprendentemente sencillo:
```batch
@echo off
start "" chrome.exe --start-fullscreen
```
Solo faltaría crear una página web para que, de una forma relativamente sencilla, puedas meter una fecha y hora para que se renderice una imagen cualquiera.

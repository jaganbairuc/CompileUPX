# 🖨️ Imágenes automáticas

El centro tiene un problema: en la entrada principal cuentan con una pantalla sin uso, que simplemente se encuentra apagada como si de decoración se tratase.<br>
Para no dejar la pantalla sin uso alguno, se pensó que podría programarse de alguna forma para que, de forma automática a una fecha y hora determinada, se ponga alguna imagen cualquiera.<br>

#

Buscamos alguna forma de encender de forma automática un pequeño dispositivo conectado a la pantalla en cuestión, ya sea por una configuración, script u objeto externo. Posteriormente, generaremos un script en `batch` para abrir Google Chrome en pantalla completa, cosa que fue sorprendentemente sencillo:
```batch
start "" chrome.exe --start-fullscreen
```
Solo faltaría crear una página web para que, de una forma relativamente sencilla, puedas meter una fecha y hora para que se renderice una imagen cualquiera.

## 🔨 Setup

Para montar el proyecto y poder utilizar este proyecto, primero y, como es evidente, se requiere guardar de forma local el código `index.html` junto a la carpeta de `Codes` y el código `OpenAutomaticallyWeb.bat` en el mismo directorio.<br>
A continuación, deberemos ejecutar un par de comandos que, lo que hará, es:
<ul>
  <li>Apagar el dispositivo a una hora específica unos días específicos.
  ```batch
    schtasks /create /tn "ApagadoAutomatico" /tr "shutdown /s" /sc daily /st 20:00 /d MON,TUE,WED,THU,FRI
  ```
  </li>
  <li>Ejecutar el fichero `.bat` a una hora específica unos días específicos.
  ```batch
    schtasks /create /tn "ApagadoAutomatico" /tr "start "" chrome.exe --start-fullscreen" /sc daily /st 20:00 /d MON,TUE,WED,THU,FRI
  ```
  </li>
</ul>
Estos comandos realmente no se requieres utilizar puesto que Windows te ofrece ya un pequeño menú para poder programar tareas y ejecutarlas de forma automática cuando se pida, pero para este caso, yo creo que viene bien los comandos.

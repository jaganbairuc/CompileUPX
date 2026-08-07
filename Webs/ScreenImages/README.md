# 🖨️ Imágenes automáticas

El centro tiene un problema: en la entrada principal cuentan con una pantalla sin uso, que simplemente se encuentra apagada como si de decoración se tratase.<br>
Para no dejar la pantalla sin uso alguno, se pensó que podría programarse de alguna forma para que, de forma automática a una fecha y hora determinada, se ponga alguna imagen cualquiera.<br>

# 🔨 Setup (Bash)

Para poder usar este sistema, primero se deberá descargar la carpeta `Codes` junto el `index.html` en el mismo directorio.
Posteriormente, escribiremos los siguientes comandos:

```sh
contrab -e
```

```sh
@reboot DISPLAY=:<Index de la pantalla> firefox <ubicación del index.html> --kiosk 
```

Con esto escrito, veremos que cada vez que encendemos nuestro dispositovo, automáticamente se abre firefox en nuestra página HTML. Aunque adicionalmente, nosotros también queremos que, una vez se encienda el dispositvo, se encienda una pantalla.<br>
En este caso, usaremos el comando xrandr para realizar esta tarea. Pero antes requerimos conocer los identificados de cada pantalla mediante el siguiente comando:

```sh
xrandr --listmonitors
```

![image](https://github.com/user-attachments/assets/3e903e5a-4082-4ac6-8e93-d4ea35991284)

Aquí nos interesa los identificadores que, en mi caso, me sale que para la primera pantalla es `XWAYLAND'` y, para la segunda, `XWAYLAND1`, por lo que usando el siguiente comando, podemos encender la pantalla con el mencionado identificador:

```sh
xrandr --output <identificador> --auto
```

Mezclándolo co n el comando anterior para que se ejecute una vez encedamos el ordenador, nos quedará la siguiente secuencia de comandos:

```sh
contrab -e
```

```sh
@reboot DISPLAY=:<Index de la pantalla> xrandr --output <identificador> --auto firefox <ubicación del index.html> --kiosk 
```

Y, en caso de querer apagarlo, el comando es muy similar:

```sh
xrandr --output <identificador> --off
```

#

Esto, a continuación, puede ser que no nos funcione según qué tipo de distribución de Linux estemos utilizando. Por ejemplo, en mi caso, tengo Zorin OS, que usa GNOME y me genera problemas. Para ver si nos permite utilizar este comando `xrandr` correctamente, podemos ver si la variable `XDG_SESSION_TYPE` me da x11: si me da x11 podemos usar el mencionado comando, de lo contrario, si su valor `wayland`, tendremos que buscar alguna alternativa ya que puede ser que nos genere algún problema.

# 🔨 Setup (Batch)

En el caso de batch, para ejecutar un comando a la hora de iniciar nuestro ordenador es el siguiente:

```bat
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "<Nombre de la tarea>" /t REG_SZ /d "<Comando>" /f
```

Esto ejecutará <Comando> cuando inicias el ordenador. En mi caso, esto quedará de la siguiente manera:

```bat
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "OpenBrowser" /t REG_SZ /d "start chrome.exe index.html --start-fullscreen" /f
```

# 

Cabe destacar adicionalmente que esto no funciona para encender y apagar un monitor como si se tratara del botón de encendido o apagado, sino que lo mete y saca del modo suspense.

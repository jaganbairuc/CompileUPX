# 🖨️ Imágenes automáticas

El centro tiene un problema: en la entrada principal cuentan con una pantalla sin uso, que simplemente se encuentra apagada como si de decoración se tratase.<br>
Para no dejar la pantalla sin uso alguno, se pensó que podría programarse de alguna forma para que, de forma automática a una fecha y hora determinada, se ponga alguna imagen cualquiera.<br>

# 🔨 Setup (Bash)

Para poder usar este sistema, primero se deberá descargar la carpeta `Codes` junto el `index.html` en el mismo directorio.
Primero, deberemos instalar las herramientas que necesitamos, por lo que:

```sh
sudo apt update
sudo apt install cron
sudo systemctl enable cron
sudo systemctl start cron
sudo systemctl status cron
```

Posteriormente, escribiremos los siguientes comandos:

```sh
contrab -e
```

```sh
@reboot DISPLAY=:<Index de la pantalla> firefox <ubicación del index.html> --kiosk 
```

En mi caso personal con mi distribución no me funcionó, por lo que creé una archivo en el directorio `/etc/systemd/system/` donde albergo la siguiente información:

```sh
[Unit]
Description=Runs once pc turns on
After=graphical.target

[Service]
ExecStart=/bin/bash /home/usuario/Command.sh
User=usuario
Restart=on-failure
RestartSec=5
Type=simple
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=graphical.target
```

Tras esto, debo ejecutar unos comandos para que me detecte el archivo y todo functione:

```sh
systemctl daemon-reload
systemctl enable <file>
systemctl start <file>
```

Esto me permitirá ejecutar el comando guardado en `/home/usuario/Command.sh` nada más el usuario encienda el ordenador.

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

En Windows esto puede cambiar. Primero debemos crear un archivo .bat con el comando que queremos ejecutar una vez el dispositivo se encienda. En mi caso, es el siguiente:

```bat
@echo off
start chrome.exe index.html --start-fullscreen
```

A continuación, debemos poner este archivo en un directorio específico. Para ello nos vamos a ejecutar un comando para irnos a la ruta (`Windows+R`) poniendo `shell:startup`.<br>
Ahora, si reiniciamos nuestra máquina, vamos a ver que de forma automática se ejecuta el comando que se desee que, en mi caso, es abrir el navegador en pantalla completa. Eso sí, este puede tardar un poco.

Ahora, solo falta ser capaces de encender y apagar en Windows por comandos un monitor, para ello primero debermos descargar [`NirCmd`](https://www.nirsoft.net/utils/nircmd.html), el cual nos ofrece comandos para gestionar todo esto. 
Algo a tener en cuenta es que estos comandos estarán donde nosotros extrajimos nuestros archivos previamente descargados.
Aquí, con un sencillo comando, podemos encender y apagar los monitores que nosotros queramos de la siguiente manera:

```bat
nircmd.exe monitor on <número_de_monitor> # Encender
nircmd.exe monitor off <número_de_monitor> # Apagar
```

# 

Cabe destacar adicionalmente que esto no funciona para encender y apagar un monitor como si se tratara del botón de encendido o apagado, sino que lo mete y saca del modo suspense.

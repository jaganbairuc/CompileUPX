#!/bin/bash

sleep 120
firefox /home/usuario/ImagesPage/index.html --kiosk
xrandr --output HDMI-1 --auto

sleep 60

while true; do
    xdotool click 1
    sleep 60
done

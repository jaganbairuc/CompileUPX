#!/bin/bash

sleep 120
firefox /home/usuario/ImagesPage/index.html --kiosk
xrandr --output HDMI-1 --auto

sleep 10

xset s off
xset -dpms

while true; do
    xdotool click 1
    sleep 5
done

@echo off

schtasks /create /tn "ApagadoAutomatico" /tr "shutdown /s" /sc daily /st 20:00 /d MON,TUE,WED,THU,FRI
schtasks /create /tn "AbrirAplicacion" /tr "start chrome.exe --start-fullscreen" /sc daily /st 20:00 /d MON,TUE,WED,THU,FRI

exit

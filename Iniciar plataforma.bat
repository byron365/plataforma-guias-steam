@echo off
rem ============================================================
rem  Doble clic aqui para arrancar la plataforma de guias.
rem  Para apagarla: cierra esta ventana o presiona Ctrl + C.
rem ============================================================
chcp 65001 > nul
title Plataforma de guias STEAM
cd /d "%~dp0"

where node > nul 2> nul
if errorlevel 1 (
  echo No se encontro Node.js. Instalalo desde el instalador que guardaste y vuelve a intentar.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Primera vez en esta computadora: instalando lo necesario...
  call npm install
)

call npm start
pause

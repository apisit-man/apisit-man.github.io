@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Jungle Science Run - local preview
echo  http://localhost:8787/
echo.
start "" http://localhost:8787/
python -m http.server 8787

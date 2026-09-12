@echo off
title Ferrari Circuit Racing 3D Mobile - Local Server
cd /d "%~dp0..\..\"

echo =========================================================================
echo   FERRARI CIRCUIT RACING 3D (MOBILE EDITION) - LOCAL SERVER
echo =========================================================================
echo.
echo [1/3] Starting local web server on port 8080...
start /B npx -y serve -p 8080 .

echo [2/3] Waiting for server initialization...
timeout /t 2 /nobreak >nul

echo [3/3] Opening mobile game in your default browser...
start http://localhost:8080/applications/circuit-racing-mobile/index.html

echo.
echo =========================================================================
echo   Server is active at: http://localhost:8080/applications/circuit-racing-mobile/
echo   Leave this window open while testing.
echo   To stop the server, simply close this window.
echo =========================================================================
echo.
cmd /k

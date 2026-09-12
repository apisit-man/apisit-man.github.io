@echo off
title Grand Prix Circuit Racing 3D - Local Server
cd /d "%~dp0"

echo =========================================================================
echo   GRAND PRIX CIRCUIT RACING 3D - HIGH FIDELITY LOCAL SERVER
echo =========================================================================
echo.
echo [1/3] Starting local web server on port 8080...
start /B npx -y serve -p 8080 .

echo [2/3] Waiting for server initialization...
timeout /t 2 /nobreak >nul

echo [3/3] Opening game in your default browser...
start http://localhost:8080/applications/circuit-racing/index.html?v=2.0.1

echo.
echo =========================================================================
echo   Server is active at: http://localhost:8080/applications/circuit-racing/
echo   Leave this window open while playing for 100%% graphic and audio fidelity!
echo   To stop the server, simply close this window.
echo =========================================================================
echo.
cmd /k

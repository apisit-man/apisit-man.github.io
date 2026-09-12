@echo off
echo ========================================================
echo   Launching Grand Prix Circuit Racing 3D
echo ========================================================
echo.
echo Opening in default browser at http://localhost:8080/applications/circuit-racing/index.html ...
start http://localhost:8080/applications/circuit-racing/index.html
npx -y serve -p 8080 .

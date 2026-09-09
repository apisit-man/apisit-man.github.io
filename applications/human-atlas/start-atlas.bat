@echo off
echo ========================================================
echo   Launching Human Atlas 3D Interactive Web Application
echo ========================================================
echo.
echo Opening in default browser at http://localhost:8080 ...
start http://localhost:8080/applications/human-atlas/index.html
npx -y serve -p 8080 ../..

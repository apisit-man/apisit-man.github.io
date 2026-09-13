@echo off
echo ========================================================
echo   Launching Brain Atlas 3D Interactive Web Application
echo ========================================================
echo.
echo Opening in default browser at http://localhost:8080/applications/brain-atlas/index.html ...
start http://localhost:8080/applications/brain-atlas/index.html
npx -y serve -p 8080 .

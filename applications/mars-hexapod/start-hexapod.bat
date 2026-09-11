@echo off
echo ========================================================
echo   Launching Mars Hexapod 3D: Chryse Planitia
echo ========================================================
echo.
echo Opening in default browser at http://localhost:8080/applications/mars-hexapod/index.html ...
start http://localhost:8080/applications/mars-hexapod/index.html
npx -y serve -p 8080 ../..

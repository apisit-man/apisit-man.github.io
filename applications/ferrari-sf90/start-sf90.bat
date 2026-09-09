@echo off
echo ========================================================
echo   Launching Ferrari SF90 Stradale 3D Showcase
echo ========================================================
echo.
echo Opening in default browser at http://localhost:8080/applications/ferrari-sf90/index.html ...
start http://localhost:8080/applications/ferrari-sf90/index.html
npx -y serve -p 8080 ../..

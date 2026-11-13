@echo off
title Video Downloader Local Server
cd /d "%~dp0"
echo ==========================================================
echo Video Downloader and Trimmer - Local Backend Server
echo ==========================================================
py -u server.py
if errorlevel 1 (
    python -u server.py
)
if errorlevel 1 (
    echo.
    echo [ERROR] Cannot start Python server.
    pause
)

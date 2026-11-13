@echo off
chcp 65001 >nul
title Video Downloader Local Server

echo ==========================================================
echo 🎬 Video Downloader & Trimmer - Local Backend Service
echo ==========================================================
echo กำลังเริ่มต้นเซิร์ฟเวอร์ดาวน์โหลด...
echo.

cd /d "%~dp0"
python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo เกิดข้อผิดพลาดในการรันเซิร์ฟเวอร์ กรุณาตรวจสอบว่าติดตั้ง Python แล้ว
    pause
)

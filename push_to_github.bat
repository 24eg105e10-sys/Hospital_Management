@echo off
setlocal enabledelayedexpansion

echo Configured Git user identity...
"C:\Program Files\Git\cmd\git.exe" config --global user.name "Dinesh"
"C:\Program Files\Git\cmd\git.exe" config --global user.email "dinesh@example.com"

cd /d "C:\Users\Dinesh\Hospital_Management"
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: complete Smart Hospital Management System (Frontend + Backend)"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" push -u origin main

echo.
echo ======================================================================
echo SUCCESS! Pushed to https://github.com/24eg105e10-sys/Hospital_Management.git
echo ======================================================================
pause

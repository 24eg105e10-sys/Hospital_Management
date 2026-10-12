@echo off
SET GIT="C:\Program Files\Git\cmd\git.exe"
SET REPO=C:\Users\Dinesh\Hospital_Management

cd /d "%REPO%"
echo =====================================================
echo  Committing Sign Up feature + Seed User fixes...
echo =====================================================

%GIT% add -A
%GIT% commit -m "feat: add user registration/sign-up, DataInitializer for working passwords, and CORS support"
%GIT% push origin main

echo.
echo =====================================================
echo  Pushed successfully to GitHub!
echo =====================================================
pause

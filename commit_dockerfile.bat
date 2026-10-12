@echo off
SET GIT="C:\Program Files\Git\cmd\git.exe"
SET REPO=C:\Users\Dinesh\Hospital_Management

echo =====================================================
echo  Committing Dockerfile and pushing to GitHub
echo =====================================================

cd /d "%REPO%"

%GIT% status
echo.

%GIT% add smart-hospital-backend/Dockerfile
%GIT% commit -m "feat(docker): add Dockerfile for Render deployment"

echo.
echo =====================================================
echo  Pushing to GitHub...
echo =====================================================
%GIT% push origin main

echo.
echo =====================================================
echo  Done! Check GitHub for your changes.
echo =====================================================
pause

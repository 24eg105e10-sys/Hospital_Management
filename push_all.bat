@echo off
SET GIT="C:\Program Files\Git\cmd\git.exe"
SET REPO=C:\Users\Dinesh\Hospital_Management

echo =====================================================
echo  Staging ALL changes and pushing to GitHub
echo =====================================================

cd /d "%REPO%"

echo.
echo [1] Staging all changes...
%GIT% add -A

echo.
echo [2] Committing...
%GIT% commit -m "fix: remove Lombok from User.java, add Dockerfile for Render"

echo.
echo [3] Pushing to GitHub...
%GIT% push origin main

echo.
echo =====================================================
echo  All done! Go to Render and click Deploy.
echo =====================================================
pause

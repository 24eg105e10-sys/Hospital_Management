@echo off
SET GIT="C:\Program Files\Git\cmd\git.exe"
SET REPO=C:\Users\Dinesh\Hospital_Management

echo =====================================================
echo  Fixing Lombok issue and pushing to GitHub
echo =====================================================

cd /d "%REPO%"

%GIT% add smart-hospital-backend/src/main/java/com/hospital/entity/User.java
%GIT% add smart-hospital-backend/Dockerfile
%GIT% commit -m "fix: remove all Lombok annotations from User.java for Docker build"

echo.
echo Pushing to GitHub...
%GIT% push origin main

echo.
echo =====================================================
echo  Done! Now redeploy on Render.
echo =====================================================
pause

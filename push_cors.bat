@echo off
SET GIT="C:\Program Files\Git\cmd\git.exe"
SET REPO=C:\Users\Dinesh\Hospital_Management

cd /d "%REPO%"
%GIT% add -A
%GIT% commit -m "fix(cors): allow Vercel origins in SecurityConfig"
%GIT% push origin main

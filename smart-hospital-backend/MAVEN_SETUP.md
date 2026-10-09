@echo off
set "DIR=%~dp0"
if "%1" == "wrapper" goto wrapper
echo Generating Maven Wrapper...
mvn -N io.takari:maven:wrapper

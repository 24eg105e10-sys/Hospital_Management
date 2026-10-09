@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files (x86)\Git\cmd;C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd;%PATH%"

where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo =======================================================
    echo ERROR: Git is not installed on this system.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo =======================================================
    echo.
    pause
    exit /b 1
)

echo Git found! Initializing repositories and making commits...

echo --- 1. Backend Repository ---
cd /d "C:\Users\Dinesh\Hospital_Management\smart-hospital-backend"
git init
git add pom.xml src/main/resources/application.properties .env.example .gitignore README.md
git commit -m "feat(backend): setup Spring Boot 3 dependencies and properties"

git add src/main/resources/db/migration/
git commit -m "feat(db): add Flyway relational schema and seed data"

git add src/main/java/com/hospital/entity/ src/main/java/com/hospital/dto/
git commit -m "feat(domain): implement core JPA entities and DTO models"

git add src/main/java/com/hospital/security/ src/main/java/com/hospital/config/ src/main/java/com/hospital/repository/ src/main/java/com/hospital/service/ src/main/java/com/hospital/controller/ src/main/java/com/hospital/exception/ src/main/java/com/hospital/SmartHospitalBackendApplication.java src/test/
git commit -m "feat(api): implement JWT security, role authorization, and REST endpoints"

echo --- 2. Frontend Repository ---
cd /d "C:\Users\Dinesh\Hospital_Management\smart-hospital-frontend"
git init
git add package.json vite.config.js tailwind.config.js postcss.config.js index.html .env.example .gitignore README.md
git commit -m "feat(frontend): setup React Vite Tailwind CSS project template"

git add src/index.css src/main.jsx src/App.jsx src/services/ src/context/ src/layouts/ src/components/
git commit -m "feat(core): implement Axios API client, AuthContext, and route guards"

git add src/pages/
git commit -m "feat(pages): implement Dashboard, Patient, Doctor, Appointment, and Billing UI"

echo.
echo SUCCESS: All local Git commits created!
pause

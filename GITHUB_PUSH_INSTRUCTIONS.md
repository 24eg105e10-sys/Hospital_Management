# Command Script to Push Smart Hospital Management Repositories to GitHub

Run these commands in PowerShell or Command Prompt.

## 1. Push Backend Repository (`smart-hospital-backend`)

```powershell
cd C:\Users\Dinesh\Hospital_Management\smart-hospital-backend

# Initialize Git
git init

# Commit 1: Project structure, dependencies & configurations
git add pom.xml application.properties .env.example .gitignore README.md MAVEN_SETUP.md
git commit -m "feat(backend): setup Spring Boot project configuration and dependencies"

# Commit 2: Flyway Database Schema & Seed Data
git add src/main/resources/db/migration/
git commit -m "feat(db): add Flyway schema migrations and initial seed data"

# Commit 3: Domain Entities & DTOs
git add src/main/java/com/hospital/entity/ src/main/java/com/hospital/dto/
git commit -m "feat(domain): implement core hospital entities, JPA mappings and DTOs"

# Commit 4: Security, Repositories, Services & REST Controllers
git add src/main/java/com/hospital/security/ src/main/java/com/hospital/config/ src/main/java/com/hospital/repository/ src/main/java/com/hospital/service/ src/main/java/com/hospital/controller/ src/main/java/com/hospital/exception/ src/main/java/com/hospital/SmartHospitalBackendApplication.java src/test/
git commit -m "feat(api): implement JWT authentication, Spring Security, services and REST controllers"

# Push to GitHub (Replace YOUR_GITHUB_USERNAME with your username)
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/smart-hospital-backend.git
git push -u origin main
```

---

## 2. Push Frontend Repository (`smart-hospital-frontend`)

```powershell
cd C:\Users\Dinesh\Hospital_Management\smart-hospital-frontend

# Initialize Git
git init

# Commit 1: Vite + React + Tailwind Setup
git add package.json vite.config.js tailwind.config.js postcss.config.js index.html .env.example .gitignore README.md
git commit -m "feat(frontend): setup Vite React Tailwind CSS project structure"

# Commit 2: Core Components, Services & Context
git add src/index.css src/main.jsx src/App.jsx src/services/ src/context/ src/layouts/ src/components/
git commit -m "feat(core): implement Axios client, AuthContext, Layout and ProtectedRoute guards"

# Commit 3: Hospital Management Pages & Dashboards
git add src/pages/
git commit -m "feat(pages): implement Dashboard, Patient, Doctor, Appointment, Medical Record, and Billing pages"

# Push to GitHub (Replace YOUR_GITHUB_USERNAME with your username)
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/smart-hospital-frontend.git
git push -u origin main
```

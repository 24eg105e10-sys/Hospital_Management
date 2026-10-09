# Initialize local git repositories with structured commits

# 1. Backend Repository
cd C:\Users\Dinesh\Hospital_Management\smart-hospital-backend
git init
git config user.name "Dinesh"
git config user.email "dinesh@hospital.com"

git add pom.xml src/main/resources/application.properties .env.example .gitignore README.md
git commit -m "feat(backend): setup Spring Boot 3 dependencies and properties"

git add src/main/resources/db/migration/
git commit -m "feat(db): add Flyway relational schema and seed data"

git add src/main/java/com/hospital/entity/ src/main/java/com/hospital/dto/
git commit -m "feat(domain): implement core JPA entities and DTO models"

git add src/main/java/com/hospital/security/ src/main/java/com/hospital/config/ src/main/java/com/hospital/repository/ src/main/java/com/hospital/service/ src/main/java/com/hospital/controller/ src/main/java/com/hospital/exception/ src/main/java/com/hospital/SmartHospitalBackendApplication.java src/test/
git commit -m "feat(api): implement JWT security, role authorization, and REST endpoints"

# 2. Frontend Repository
cd C:\Users\Dinesh\Hospital_Management\smart-hospital-frontend
git init
git config user.name "Dinesh"
git config user.email "dinesh@hospital.com"

git add package.json vite.config.js tailwind.config.js postcss.config.js index.html .env.example .gitignore README.md
git commit -m "feat(frontend): setup React Vite Tailwind CSS project template"

git add src/index.css src/main.jsx src/App.jsx src/services/ src/context/ src/layouts/ src/components/
git commit -m "feat(core): implement Axios API client, AuthContext, and route guards"

git add src/pages/
git commit -m "feat(pages): implement Dashboard, Patient, Doctor, Appointment, and Billing UI"

# Smart Hospital Backend

Full-stack Spring Boot REST API for Smart Hospital Management System.

## Stack
- Java 17+ / 21
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA
- Flyway Migration
- MySQL / Aiven Cloud Database

## Features
- User Auth (ADMIN, DOCTOR, RECEPTIONIST)
- Patient CRUD & Search
- Doctor & Department Management
- Appointment Scheduling & Concurrency Safety
- Medical Records & Prescriptions
- Billing & Payments
- Dashboard Analytics & Summaries

## Setup & Running
1. Copy `.env.example` to `.env` or set environment variables:
   - `DB_URL`
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `JWT_SECRET`
2. Run backend:
   ```bash
   mvnw spring-boot:run
   ```
3. Default Admin created on startup if database is fresh:
   - Username: `admin@hospital.com`
   - Password: `AdminPassword123!`

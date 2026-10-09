-- V2__seed_data.sql
-- Seed Initial Fictional Hospital Data

-- 1. Insert Default Users (Passwords hashed with BCrypt for 'AdminPassword123!', 'DoctorPassword123!', 'ReceptionPassword123!')
-- BCrypt for 'Password123!': $2a$10$7Q.y5B5Kj5mYg7M/6j.7euQ1Q1G9DkZ5F1G2H3I4J5K6L7M8N9O0P
-- BCrypt for 'AdminPassword123!': $2a$10$wO3b4/GjS7sM2wZ0V1Q1ee0zR3V6F8k5Q7g9H1i3j5k7l9m1n3o5p

INSERT INTO users (id, name, email, password, role, phone, active) VALUES
(1, 'System Administrator', 'admin@hospital.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bV.0E23JqG6', 'ADMIN', '+15550001111', TRUE),
(2, 'Dr. Sarah Connor', 'dr.sarah@hospital.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bV.0E23JqG6', 'DOCTOR', '+15550002222', TRUE),
(3, 'Dr. Robert Bruce', 'dr.robert@hospital.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bV.0E23JqG6', 'DOCTOR', '+15550003333', TRUE),
(4, 'Emily Watson (Reception)', 'reception@hospital.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD0m1bV.0E23JqG6', 'RECEPTIONIST', '+15550004444', TRUE);

-- 2. Insert Departments
INSERT INTO departments (id, name, description, code, active) VALUES
(1, 'Cardiology', 'Heart, vascular and circulatory system care', 'CARD-01', TRUE),
(2, 'Neurology', 'Brain, spinal cord and nervous system care', 'NEUR-01', TRUE),
(3, 'Pediatrics', 'Comprehensive medical care for infants, children and adolescents', 'PED-01', TRUE),
(4, 'Orthopedics', 'Treatment of bones, joints, ligaments and muscles', 'ORTH-01', TRUE),
(5, 'General Medicine', 'Primary health care and internal disease diagnosis', 'GEN-01', TRUE);

-- 3. Insert Doctors
INSERT INTO doctors (id, user_id, department_id, name, specialization, qualification, phone, email, consultation_fee, available_days, active) VALUES
(1, 2, 1, 'Dr. Sarah Connor', 'Cardiology & Heart Care', 'MD, FACC', '+15550002222', 'dr.sarah@hospital.com', 120.00, 'Monday,Wednesday,Friday', TRUE),
(2, 3, 2, 'Dr. Robert Bruce', 'Neurology Specialist', 'MD, DM Neurology', '+15550003333', 'dr.robert@hospital.com', 150.00, 'Tuesday,Thursday,Saturday', TRUE);

-- 4. Insert Patients
INSERT INTO patients (id, patient_id, name, date_of_birth, gender, phone, email, address, blood_group, emergency_contact, active) VALUES
(1, 'PAT-1001', 'John Doe', '1988-04-12', 'MALE', '+15551112233', 'john.doe@example.com', '123 Main Street, Suite 4', 'O+', 'Jane Doe (+15551112234)', TRUE),
(2, 'PAT-1002', 'Alice Smith', '1992-09-25', 'FEMALE', '+15552223344', 'alice.smith@example.com', '456 Oak Avenue', 'A+', 'Bob Smith (+15552223345)', TRUE),
(3, 'PAT-1003', 'Michael Brown', '1975-11-03', 'MALE', '+15553334455', 'michael.brown@example.com', '789 Pine Road', 'B-', 'Mary Brown (+15553334456)', TRUE);

-- 5. Insert Sample Appointments
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date_time, reason, status) VALUES
(1, 1, 1, '2026-10-10 10:00:00', 'Routine Cardiac Checkup', 'SCHEDULED'),
(2, 2, 2, '2026-10-10 11:30:00', 'Chronic Headaches and Migraine Evaluation', 'CONFIRMED'),
(3, 3, 1, '2026-10-08 14:00:00', 'Chest Discomfort Consultation', 'COMPLETED');

-- 6. Insert Medical Record for Completed Visit
INSERT INTO medical_records (id, patient_id, doctor_id, appointment_id, visit_date, diagnosis, symptoms, notes) VALUES
(1, 3, 1, 3, '2026-10-08 14:00:00', 'Mild Gastric Reflux and Stress Angina', 'Chest discomfort after meals, mild anxiety', 'Patient advised to modify diet and start prescribed medication. ECG results normal.');

-- 7. Insert Prescription
INSERT INTO prescriptions (id, medical_record_id, patient_id, doctor_id, notes) VALUES
(1, 1, 3, 1, 'Take medications after food. Drink plenty of water.');

INSERT INTO prescription_items (id, prescription_id, medicine_name, dosage, frequency, duration, instructions) VALUES
(1, 1, 'Omeprazole 20mg', '1 Capsule', 'Once Daily (Morning)', '14 Days', 'Take on empty stomach 30 mins before breakfast'),
(2, 1, 'Antacid Oral Suspension', '10 ml', 'Twice Daily', '7 Days', 'Take after lunch and dinner');

-- 8. Insert Bills
INSERT INTO bills (id, invoice_number, patient_id, appointment_id, subtotal, tax, discount, total_amount, paid_amount, payment_status, bill_date, due_date) VALUES
(1, 'INV-2026-0001', 3, 3, 120.00, 12.00, 0.00, 132.00, 132.00, 'PAID', '2026-10-08 15:00:00', '2026-10-08'),
(2, 'INV-2026-0002', 1, 1, 120.00, 12.00, 10.00, 122.00, 0.00, 'UNPAID', '2026-10-09 09:00:00', '2026-10-16');

INSERT INTO bill_items (id, bill_id, description, quantity, unit_price, total_price) VALUES
(1, 1, 'Cardiology Consultation Fee', 1, 120.00, 120.00),
(2, 2, 'Cardiology Consultation Fee', 1, 120.00, 120.00);

INSERT INTO payments (id, bill_id, amount, payment_method, transaction_reference, payment_date, notes) VALUES
(1, 1, 132.00, 'CREDIT_CARD', 'TXN-987654321', '2026-10-08 15:05:00', 'Full payment settled via card terminal');

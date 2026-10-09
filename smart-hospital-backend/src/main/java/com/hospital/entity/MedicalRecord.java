package com.hospital.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @Column(nullable = false)
    private LocalDateTime visitDate;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String symptoms;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MedicalRecord() {}

    public MedicalRecord(Long id, Patient patient, Doctor doctor, Appointment appointment, LocalDateTime visitDate, String diagnosis, String symptoms, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.appointment = appointment;
        this.visitDate = visitDate;
        this.diagnosis = diagnosis;
        this.symptoms = symptoms;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static MedicalRecordBuilder builder() {
        return new MedicalRecordBuilder();
    }

    public static class MedicalRecordBuilder {
        private Long id;
        private Patient patient;
        private Doctor doctor;
        private Appointment appointment;
        private LocalDateTime visitDate;
        private String diagnosis;
        private String symptoms;
        private String notes;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public MedicalRecordBuilder id(Long id) { this.id = id; return this; }
        public MedicalRecordBuilder patient(Patient patient) { this.patient = patient; return this; }
        public MedicalRecordBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }
        public MedicalRecordBuilder appointment(Appointment appointment) { this.appointment = appointment; return this; }
        public MedicalRecordBuilder visitDate(LocalDateTime visitDate) { this.visitDate = visitDate; return this; }
        public MedicalRecordBuilder diagnosis(String diagnosis) { this.diagnosis = diagnosis; return this; }
        public MedicalRecordBuilder symptoms(String symptoms) { this.symptoms = symptoms; return this; }
        public MedicalRecordBuilder notes(String notes) { this.notes = notes; return this; }
        public MedicalRecordBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public MedicalRecordBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public MedicalRecord build() {
            return new MedicalRecord(id, patient, doctor, appointment, visitDate, diagnosis, symptoms, notes, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public Appointment getAppointment() { return appointment; }
    public void setAppointment(Appointment appointment) { this.appointment = appointment; }
    public LocalDateTime getVisitDate() { return visitDate; }
    public void setVisitDate(LocalDateTime visitDate) { this.visitDate = visitDate; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

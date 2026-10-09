package com.hospital.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "prescription_items")
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    @JsonIgnore
    private Prescription prescription;

    @Column(nullable = false, length = 100)
    private String medicineName;

    @Column(nullable = false, length = 50)
    private String dosage;

    @Column(nullable = false, length = 50)
    private String frequency;

    @Column(nullable = false, length = 50)
    private String duration;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    public PrescriptionItem() {}

    public PrescriptionItem(Long id, Prescription prescription, String medicineName, String dosage, String frequency, String duration, String instructions) {
        this.id = id;
        this.prescription = prescription;
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.instructions = instructions;
    }

    public static PrescriptionItemBuilder builder() {
        return new PrescriptionItemBuilder();
    }

    public static class PrescriptionItemBuilder {
        private Long id;
        private Prescription prescription;
        private String medicineName;
        private String dosage;
        private String frequency;
        private String duration;
        private String instructions;

        public PrescriptionItemBuilder id(Long id) { this.id = id; return this; }
        public PrescriptionItemBuilder prescription(Prescription prescription) { this.prescription = prescription; return this; }
        public PrescriptionItemBuilder medicineName(String medicineName) { this.medicineName = medicineName; return this; }
        public PrescriptionItemBuilder dosage(String dosage) { this.dosage = dosage; return this; }
        public PrescriptionItemBuilder frequency(String frequency) { this.frequency = frequency; return this; }
        public PrescriptionItemBuilder duration(String duration) { this.duration = duration; return this; }
        public PrescriptionItemBuilder instructions(String instructions) { this.instructions = instructions; return this; }

        public PrescriptionItem build() {
            return new PrescriptionItem(id, prescription, medicineName, dosage, frequency, duration, instructions);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Prescription getPrescription() { return prescription; }
    public void setPrescription(Prescription prescription) { this.prescription = prescription; }
    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
}

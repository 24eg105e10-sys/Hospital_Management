package com.hospital.controller;

import com.hospital.entity.MedicalRecord;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.MedicalRecordRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @GetMapping
    public List<MedicalRecord> getAllRecords(@RequestParam(required = false) Long patientId,
                                            @RequestParam(required = false) Long doctorId) {
        if (patientId != null) return medicalRecordRepository.findByPatientId(patientId);
        if (doctorId != null) return medicalRecordRepository.findByDoctorId(doctorId);
        return medicalRecordRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getRecordById(@PathVariable Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical Record not found with id: " + id));
        return ResponseEntity.ok(record);
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> createRecord(@Valid @RequestBody MedicalRecord record) {
        return ResponseEntity.ok(medicalRecordRepository.save(record));
    }
}

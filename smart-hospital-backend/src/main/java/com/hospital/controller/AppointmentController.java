package com.hospital.controller;

import com.hospital.entity.Appointment;
import com.hospital.entity.Appointment.Status;
import com.hospital.exception.BadRequestException;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.AppointmentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllAppointments(@RequestParam(required = false) Long doctorId,
                                                @RequestParam(required = false) Long patientId,
                                                @RequestParam(required = false) Status status) {
        if (doctorId != null) return appointmentRepository.findByDoctorId(doctorId);
        if (patientId != null) return appointmentRepository.findByPatientId(patientId);
        if (status != null) return appointmentRepository.findByStatus(status);
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment app = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        return ResponseEntity.ok(app);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody Appointment appointment) {
        boolean conflict = appointmentRepository.existsConflictingAppointment(
                appointment.getDoctor().getId(),
                appointment.getAppointmentDateTime(),
                null
        );
        if (conflict) {
            throw new BadRequestException("Doctor is already booked at the selected time slot.");
        }

        if (appointment.getStatus() == null) {
            appointment.setStatus(Status.SCHEDULED);
        }

        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @Valid @RequestBody Appointment details) {
        Appointment app = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));

        boolean conflict = appointmentRepository.existsConflictingAppointment(
                details.getDoctor().getId(),
                details.getAppointmentDateTime(),
                id
        );
        if (conflict) {
            throw new BadRequestException("Doctor is already booked at the selected time slot.");
        }

        app.setPatient(details.getPatient());
        app.setDoctor(details.getDoctor());
        app.setAppointmentDateTime(details.getAppointmentDateTime());
        app.setReason(details.getReason());
        if (details.getStatus() != null) app.setStatus(details.getStatus());

        return ResponseEntity.ok(appointmentRepository.save(app));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        Appointment app = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));

        String statusStr = statusUpdate.get("status");
        if (statusStr != null) {
            app.setStatus(Status.valueOf(statusStr.toUpperCase()));
        }

        return ResponseEntity.ok(appointmentRepository.save(app));
    }
}

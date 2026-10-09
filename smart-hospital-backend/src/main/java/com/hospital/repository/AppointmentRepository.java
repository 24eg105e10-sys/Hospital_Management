package com.hospital.repository;

import com.hospital.entity.Appointment;
import com.hospital.entity.Appointment.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByStatus(Status status);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Appointment a " +
           "WHERE a.doctor.id = :doctorId AND a.appointmentDateTime = :dateTime " +
           "AND a.status != 'CANCELLED' AND (:excludeId IS NULL OR a.id != :excludeId)")
    boolean existsConflictingAppointment(@Param("doctorId") Long doctorId, 
                                        @Param("dateTime") LocalDateTime dateTime, 
                                        @Param("excludeId") Long excludeId);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.appointmentDateTime >= :startOfDay AND a.appointmentDateTime <= :endOfDay")
    Long countAppointmentsBetween(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.appointmentDateTime > :now AND a.status = 'SCHEDULED'")
    Long countUpcomingAppointments(@Param("now") LocalDateTime now);

    Long countByStatus(Status status);
}

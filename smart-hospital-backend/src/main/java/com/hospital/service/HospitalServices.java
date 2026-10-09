package com.hospital.service;

import com.hospital.dto.DashboardSummaryDto;
import com.hospital.entity.Appointment;
import com.hospital.entity.Bill;
import com.hospital.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class HospitalServices {

    @Autowired private PatientRepository patientRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private BillRepository billRepository;

    public DashboardSummaryDto getDashboardSummary() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        LocalDateTime now = LocalDateTime.now();

        Long activePatients = patientRepository.countByActiveTrue();
        Long activeDoctors = doctorRepository.countByActiveTrue();
        Long todayAppointments = appointmentRepository.countAppointmentsBetween(startOfDay, endOfDay);
        Long upcomingAppointments = appointmentRepository.countUpcomingAppointments(now);
        Long completedAppointments = appointmentRepository.countByStatus(Appointment.Status.COMPLETED);
        Long cancelledAppointments = appointmentRepository.countByStatus(Appointment.Status.CANCELLED);
        Long unpaidBills = billRepository.countByPaymentStatus(Bill.PaymentStatus.UNPAID);
        BigDecimal totalRevenue = billRepository.getTotalRevenue();

        if (totalRevenue == null) totalRevenue = BigDecimal.ZERO;

        Map<String, Long> statusMap = new HashMap<>();
        statusMap.put("SCHEDULED", appointmentRepository.countByStatus(Appointment.Status.SCHEDULED));
        statusMap.put("CONFIRMED", appointmentRepository.countByStatus(Appointment.Status.CONFIRMED));
        statusMap.put("COMPLETED", completedAppointments);
        statusMap.put("CANCELLED", cancelledAppointments);

        return DashboardSummaryDto.builder()
                .activePatients(activePatients)
                .activeDoctors(activeDoctors)
                .todayAppointments(todayAppointments)
                .upcomingAppointments(upcomingAppointments)
                .completedAppointments(completedAppointments)
                .cancelledAppointments(cancelledAppointments)
                .unpaidBills(unpaidBills)
                .totalRevenue(totalRevenue)
                .appointmentsByStatus(statusMap)
                .build();
    }
}

package com.hospital.dto;

import java.math.BigDecimal;
import java.util.Map;

public class DashboardSummaryDto {
    private Long activePatients;
    private Long activeDoctors;
    private Long todayAppointments;
    private Long upcomingAppointments;
    private Long completedAppointments;
    private Long cancelledAppointments;
    private Long unpaidBills;
    private BigDecimal totalRevenue;
    private Map<String, Long> appointmentsByStatus;

    public DashboardSummaryDto() {}

    public DashboardSummaryDto(Long activePatients, Long activeDoctors, Long todayAppointments, Long upcomingAppointments, Long completedAppointments, Long cancelledAppointments, Long unpaidBills, BigDecimal totalRevenue, Map<String, Long> appointmentsByStatus) {
        this.activePatients = activePatients;
        this.activeDoctors = activeDoctors;
        this.todayAppointments = todayAppointments;
        this.upcomingAppointments = upcomingAppointments;
        this.completedAppointments = completedAppointments;
        this.cancelledAppointments = cancelledAppointments;
        this.unpaidBills = unpaidBills;
        this.totalRevenue = totalRevenue;
        this.appointmentsByStatus = appointmentsByStatus;
    }

    public static DashboardSummaryDtoBuilder builder() {
        return new DashboardSummaryDtoBuilder();
    }

    public static class DashboardSummaryDtoBuilder {
        private Long activePatients;
        private Long activeDoctors;
        private Long todayAppointments;
        private Long upcomingAppointments;
        private Long completedAppointments;
        private Long cancelledAppointments;
        private Long unpaidBills;
        private BigDecimal totalRevenue;
        private Map<String, Long> appointmentsByStatus;

        public DashboardSummaryDtoBuilder activePatients(Long activePatients) { this.activePatients = activePatients; return this; }
        public DashboardSummaryDtoBuilder activeDoctors(Long activeDoctors) { this.activeDoctors = activeDoctors; return this; }
        public DashboardSummaryDtoBuilder todayAppointments(Long todayAppointments) { this.todayAppointments = todayAppointments; return this; }
        public DashboardSummaryDtoBuilder upcomingAppointments(Long upcomingAppointments) { this.upcomingAppointments = upcomingAppointments; return this; }
        public DashboardSummaryDtoBuilder completedAppointments(Long completedAppointments) { this.completedAppointments = completedAppointments; return this; }
        public DashboardSummaryDtoBuilder cancelledAppointments(Long cancelledAppointments) { this.cancelledAppointments = cancelledAppointments; return this; }
        public DashboardSummaryDtoBuilder unpaidBills(Long unpaidBills) { this.unpaidBills = unpaidBills; return this; }
        public DashboardSummaryDtoBuilder totalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; return this; }
        public DashboardSummaryDtoBuilder appointmentsByStatus(Map<String, Long> appointmentsByStatus) { this.appointmentsByStatus = appointmentsByStatus; return this; }

        public DashboardSummaryDto build() {
            return new DashboardSummaryDto(activePatients, activeDoctors, todayAppointments, upcomingAppointments, completedAppointments, cancelledAppointments, unpaidBills, totalRevenue, appointmentsByStatus);
        }
    }

    public Long getActivePatients() { return activePatients; }
    public void setActivePatients(Long activePatients) { this.activePatients = activePatients; }
    public Long getActiveDoctors() { return activeDoctors; }
    public void setActiveDoctors(Long activeDoctors) { this.activeDoctors = activeDoctors; }
    public Long getTodayAppointments() { return todayAppointments; }
    public void setTodayAppointments(Long todayAppointments) { this.todayAppointments = todayAppointments; }
    public Long getUpcomingAppointments() { return upcomingAppointments; }
    public void setUpcomingAppointments(Long upcomingAppointments) { this.upcomingAppointments = upcomingAppointments; }
    public Long getCompletedAppointments() { return completedAppointments; }
    public void setCompletedAppointments(Long completedAppointments) { this.completedAppointments = completedAppointments; }
    public Long getCancelledAppointments() { return cancelledAppointments; }
    public void setCancelledAppointments(Long cancelledAppointments) { this.cancelledAppointments = cancelledAppointments; }
    public Long getUnpaidBills() { return unpaidBills; }
    public void setUnpaidBills(Long unpaidBills) { this.unpaidBills = unpaidBills; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
    public Map<String, Long> getAppointmentsByStatus() { return appointmentsByStatus; }
    public void setAppointmentsByStatus(Map<String, Long> appointmentsByStatus) { this.appointmentsByStatus = appointmentsByStatus; }
}

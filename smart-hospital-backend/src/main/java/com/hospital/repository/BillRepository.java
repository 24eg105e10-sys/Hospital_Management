package com.hospital.repository;

import com.hospital.entity.Bill;
import com.hospital.entity.Bill.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Optional<Bill> findByInvoiceNumber(String invoiceNumber);
    List<Bill> findByPatientId(Long patientId);
    List<Bill> findByPaymentStatus(PaymentStatus paymentStatus);
    
    Long countByPaymentStatus(PaymentStatus paymentStatus);
    
    @Query("SELECT SUM(b.paidAmount) FROM Bill b")
    BigDecimal getTotalRevenue();
}

package com.hospital.controller;

import com.hospital.entity.Bill;
import com.hospital.entity.Bill.PaymentStatus;
import com.hospital.entity.Payment;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.BillRepository;
import com.hospital.repository.PaymentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    @Autowired private BillRepository billRepository;
    @Autowired private PaymentRepository paymentRepository;

    @GetMapping
    public List<Bill> getAllBills(@RequestParam(required = false) Long patientId,
                                  @RequestParam(required = false) PaymentStatus status) {
        if (patientId != null) return billRepository.findByPatientId(patientId);
        if (status != null) return billRepository.findByPaymentStatus(status);
        return billRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with id: " + id));
        return ResponseEntity.ok(bill);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Bill> createBill(@Valid @RequestBody Bill bill) {
        if (bill.getInvoiceNumber() == null || bill.getInvoiceNumber().isEmpty()) {
            bill.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (bill.getBillDate() == null) bill.setBillDate(LocalDateTime.now());
        if (bill.getPaidAmount() == null) bill.setPaidAmount(BigDecimal.ZERO);
        if (bill.getPaymentStatus() == null) bill.setPaymentStatus(PaymentStatus.UNPAID);

        if (bill.getItems() != null) {
            bill.getItems().forEach(item -> item.setBill(bill));
        }

        return ResponseEntity.ok(billRepository.save(bill));
    }

    @PostMapping("/{id}/payments")
    @Transactional
    public ResponseEntity<Payment> recordPayment(@PathVariable Long id, @Valid @RequestBody Payment payment) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with id: " + id));

        payment.setBill(bill);
        if (payment.getPaymentDate() == null) payment.setPaymentDate(LocalDateTime.now());

        Payment savedPayment = paymentRepository.save(payment);

        // Update bill payment status and amount
        BigDecimal newPaidTotal = bill.getPaidAmount().add(payment.getAmount());
        bill.setPaidAmount(newPaidTotal);

        if (newPaidTotal.compareTo(bill.getTotalAmount()) >= 0) {
            bill.setPaymentStatus(PaymentStatus.PAID);
        } else if (newPaidTotal.compareTo(BigDecimal.ZERO) > 0) {
            bill.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        }

        billRepository.save(bill);

        return ResponseEntity.ok(savedPayment);
    }
}

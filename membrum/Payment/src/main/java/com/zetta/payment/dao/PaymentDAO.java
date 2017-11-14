package com.zetta.payment.dao;

import java.util.List;
import java.util.Optional;

import com.zetta.payment.payment.Payment;

public interface PaymentDAO {

    List<Payment> findAllPayments();

    Optional<Payment> getPayment(String id);

    void savePayment(Payment payment);

    void deletePayment(String id);

    void deletePayment(Payment payment);
}

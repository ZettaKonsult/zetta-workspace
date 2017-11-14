package com.zetta.payment.dao;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.payment.Payment;

public class DynamoPaymentDAO implements PaymentDAO {

    private static final Logger log = Logger.getLogger(DynamoPaymentDAO.class);

    private static final DynamoDBMapper mapper = DynamoDBManager.mapper();

    private static volatile DynamoPaymentDAO instance;

    private DynamoPaymentDAO() {
    }

    public static DynamoPaymentDAO instance() {

        if (instance == null) {
            synchronized (DynamoPaymentDAO.class) {
                if (instance == null)
                    instance = new DynamoPaymentDAO();
            }
        }
        return instance;
    }

    @Override
    public void deletePayment(String id) {
        Optional<Payment> paymentToDelete = getPayment(id);

        if (!paymentToDelete.isPresent()) {
            log.error("Unable to delete payment " + id
                    + ", no such payment exists.");
            throw new IllegalArgumentException(
                    "Unable to delete non-existent payment.");
        }

        mapper.delete(paymentToDelete);
    }

    @Override
    public void deletePayment(Payment payment) {
        deletePayment(payment.getId());
    }

    @Override
    public List<Payment> findAllPayments() {
        return mapper.scan(Payment.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Payment> getPayment(String id) {
        Payment payment = mapper.load(Payment.class, id);
        return Optional.ofNullable(payment);
    }

    @Override
    public void savePayment(Payment payment) {
        mapper.save(payment);
    }

}

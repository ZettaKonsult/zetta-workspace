package com.zetta.payment.db.dynamo;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.PaymentDAO;
import com.zetta.payment.pojo.Payment;

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
    public void delete(String id) {
        Optional<Payment> paymentToDelete = get(id);

        if (!paymentToDelete.isPresent()) {
            log.error("Unable to delete payment " + id
                    + ", no such payment exists.");
            throw new IllegalArgumentException(
                    "Unable to delete non-existent payment.");
        }

        mapper.delete(paymentToDelete);
    }

    @Override
    public void delete(Payment payment) {
        delete(payment.getId());
    }

    @Override
    public List<Payment> getAll() {
        return mapper.scan(Payment.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Payment> get(String id) {
        Payment payment = mapper.load(Payment.class, id);
        return Optional.ofNullable(payment);
    }

    @Override
    public void save(Payment payment) {
        mapper.save(payment);
    }

    @Override
    public Optional<Payment> get(Payment t) {
        return get(t.getId());
    }

}

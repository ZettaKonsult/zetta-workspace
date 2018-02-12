package com.zetta.payment.db.dynamodb;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.PaymentDAO;
import com.zetta.payment.pojo.Payment;

/**
 * @date 2017-12-07
 */
public class DynamoPaymentDAO extends DynamoDB<Payment> implements PaymentDAO {

    private static final Logger log = Logger.getLogger(DynamoPaymentDAO.class);

    private static final DynamoDBMapper mapper = DynamoDBManager.mapper();

    private static volatile DynamoPaymentDAO instance;

    protected DynamoPaymentDAO() {}

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
        Optional<Payment> statusToDelete = get(id);

        if (!statusToDelete.isPresent()) {
            String message = "Unable to delete payment " + id
                    + ", it does not exist.";
            log.error(message);
            throw new IllegalArgumentException(message);
        }

        delete(statusToDelete.get());
    }

    @Override
    public void delete(Payment payment) {
        mapper.delete(payment);
    }

    @Override
    public List<Payment> getAll() {
        return mapper.scan(Payment.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Payment> get(String id) {
        return Optional.ofNullable(mapper.load(Payment.class, id));
    }

    @Override
    public Optional<Payment> get(String id, String memberId) {
        return Optional.ofNullable(mapper.load(Payment.class, id, memberId));
    }

    @Override
    public Optional<Payment> get(Payment payment) {
        return Optional.ofNullable(mapper.load(payment));
    }

    @Override
    public void save(Payment payment) {
        mapper.save(payment);
    }

    @Override
    public List<Payment> getAll(Collection<String> ids) {
        List<Payment> payments = new ArrayList<Payment>();
        for (String id : ids) {
            Optional<Payment> payment = get(id);

            if (!payment.isPresent()) {
                log.warn("Requested payment " + id + " which does not exist.");
                continue;
            }

            payments.add(payment.get());
        }
        return payments;
    }

}

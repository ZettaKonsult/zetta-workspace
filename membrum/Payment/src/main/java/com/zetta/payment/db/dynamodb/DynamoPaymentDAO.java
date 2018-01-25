package com.zetta.payment.db.dynamodb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.PaymentDAO;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.DateUtil;

/**
 * @date 2017-12-07
 */
public class DynamoPaymentDAO extends DynamoDB<Payment> implements PaymentDAO {

    private static final Logger log = Logger.getLogger(DynamoPaymentDAO.class);

    private static final DynamoDBMapper mapper = DynamoDBManager.mapper();

    private static volatile DynamoPaymentDAO instance;

    private DynamoPaymentDAO() {}

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
        Optional<Payment> orderToDelete = get(id);

        if (!orderToDelete.isPresent()) {
            String message = "Unable to delete payment " + id
                    + ", it does not exist.";
            log.error(message);
            throw new IllegalArgumentException(message);
        }

        delete(orderToDelete.get());
    }

    @Override
    public void delete(Payment order) {
        mapper.delete(order);
    }

    @Override
    public List<Payment> getAll() {
        return mapper.scan(Payment.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Payment> get(String orderId) {
        return Optional.ofNullable(mapper.load(Payment.class, orderId));
    }

    @Override
    public Optional<Payment> get(Payment order) {
        return get(order.getOrderId());
    }

    @Override
    public void save(Payment order) {
        mapper.save(order);
    }

    @Override
    public Optional<Payment> getLatest(User user) {
        List<Payment> orders = get(user)
                .stream().sorted((Payment payment1,
                        Payment payment2) -> payment1.compareCreated(payment2))
                .collect(Collectors.toList());

        return orders.isEmpty() ? Optional.empty()
                : Optional.of(orders.get(orders.size() - 1));
    }

    @Override
    public List<Payment> get(User user, long start, long end) {
        return get(user).stream()
                .filter((Payment payment) -> DateUtil
                        .isBetween(payment.getCreated(), start, end))
                .collect(Collectors.toList());
    }

    @Override
    public List<Payment> get(User user) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS(user.getUserId()));

        DynamoDBQueryExpression<Payment> query = new DynamoDBQueryExpression<Payment>()
                .withIndexName(Payment.USER_ID_INDEX).withConsistentRead(false)
                .withKeyConditionExpression("userId = :v1")
                .withExpressionAttributeValues(eav);

        return new ArrayList<Payment>(mapper.query(Payment.class, query));
    }

}

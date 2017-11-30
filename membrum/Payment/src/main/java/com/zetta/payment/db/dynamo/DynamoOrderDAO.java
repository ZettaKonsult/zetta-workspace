package com.zetta.payment.db.dynamo;

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
import com.zetta.payment.db.dao.OrderDAO;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.User;

public class DynamoOrderDAO implements OrderDAO {

    private static final Logger log = Logger.getLogger(DynamoOrderDAO.class);

    private static final DynamoDBMapper mapper = DynamoDBManager.mapper();

    private static volatile DynamoOrderDAO instance;

    private DynamoOrderDAO() {}

    public static DynamoOrderDAO instance() {

        if (instance == null) {
            synchronized (DynamoOrderDAO.class) {
                if (instance == null)
                    instance = new DynamoOrderDAO();
            }
        }
        return instance;
    }

    @Override
    public void delete(String id) {
        Optional<Order> orderToDelete = get(id);

        if (!orderToDelete.isPresent()) {
            log.error(
                    "Unable to delete order " + id + ", no such order exists.");
            throw new IllegalArgumentException(
                    "Unable to delete non-existent order.");
        }

        mapper.delete(orderToDelete);
    }

    @Override
    public void delete(Order order) {
        delete(order.getOrderId());
    }

    @Override
    public List<Order> getAll() {
        return mapper.scan(Order.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Order> get(String orderId) {
        return getByOrderId(orderId);
    }

    @Override
    public Optional<Order> getByOrderId(String orderId) {
        return Optional.ofNullable(mapper.load(Order.class, orderId));
    }

    @Override
    public List<Order> getByUserId(String userId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS(userId));

        DynamoDBQueryExpression<Order> query = new DynamoDBQueryExpression<Order>()
                .withIndexName(Order.USER_ID_INDEX).withConsistentRead(false)
                .withKeyConditionExpression("userId = :v1")
                .withExpressionAttributeValues(eav);

        return new ArrayList<Order>(mapper.query(Order.class, query));
    }

    @Override
    public void save(Order order) {
        mapper.save(order);
    }

    @Override
    public Optional<Order> get(Order order) {
        return get(order.getOrderId());
    }

    @Override
    public List<Order> getUnpaid(String userId) {

        List<Order> unpaid = getByUserId(userId);

        if (unpaid.isEmpty()) {
            return unpaid;
        }

        unpaid = unpaid.stream().filter((Order order) -> !order.getIsPaid())
                .sorted((Order order1,
                        Order order2) -> -(order1.getCreated()
                                .compareTo(order2.getCreated())))
                .collect(Collectors.toList());

        return unpaid;
    }

    @Override
    public Optional<Order> getLatestUnpaid(User user) {
        List<Order> unpaid = getUnpaid(user.getUserId());
        return unpaid.isEmpty() ? Optional.empty() : Optional.of(unpaid.get(0));
    }

}

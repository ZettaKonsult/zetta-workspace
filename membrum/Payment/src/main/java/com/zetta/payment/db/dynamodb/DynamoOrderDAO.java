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
import com.zetta.payment.db.dao.OrderDAO;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.User;
import com.zetta.payment.pojo.membrum.Order;
import com.zetta.payment.util.DateUtil;

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

        delete(orderToDelete.get());
    }

    @Override
    public void delete(Order order) {
        mapper.delete(order);
    }

    @Override
    public List<Order> getAll() {
        return mapper.scan(Order.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Order> get(String orderId) {
        return Optional.ofNullable(mapper.load(Order.class, orderId));
    }

    @Override
    public void save(Order order) {
        mapper.save(order);
    }

    @Override
    public List<Order> getByUser(User user) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS(user.getUserId()));

        DynamoDBQueryExpression<Order> query = new DynamoDBQueryExpression<Order>()
                .withIndexName(Order.USER_ID_INDEX).withConsistentRead(false)
                .withKeyConditionExpression("userId = :v1")
                .withExpressionAttributeValues(eav);

        return new ArrayList<Order>(mapper.query(Order.class, query));
    }

    @Override
    public Optional<Order> get(Order order) {
        return get(order.getOrderId());
    }

    @Override
    public List<Order> get(User user, String start, String end) {
        return getByUser(user)
                .stream().filter((Order order) -> DateUtil
                        .isBetween(order.getCreated(), start, end))
                .collect(Collectors.toList());
    }

}

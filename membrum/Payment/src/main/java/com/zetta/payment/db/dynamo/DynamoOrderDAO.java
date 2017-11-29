package com.zetta.payment.db.dynamo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.OrderDAO;
import com.zetta.payment.pojo.Order;

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
    public Optional<Order> get(String id) {
        Order order = mapper.load(Order.class, id);
        return Optional.ofNullable(order);
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
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":v1", new AttributeValue().withS(userId));
        eav.put(":v2", new AttributeValue().withBOOL(false));

        DynamoDBQueryExpression<Order> query = new DynamoDBQueryExpression<Order>()
                .withIndexName(Order.USER_INDEX).withConsistentRead(false)
                .withKeyConditionExpression("userId = :v1")
                .withIndexName(Order.IS_PAID_INDEX)
                .withKeyConditionExpression("isPaid = :v2")
                .withExpressionAttributeValues(eav);

        return new ArrayList<Order>(mapper.query(Order.class, query));
    }

    @Override
    public Optional<Order> getLatestUnpaid(String userId) {
        return Optional.ofNullable(getUnpaid(userId).get(0));
    }

}

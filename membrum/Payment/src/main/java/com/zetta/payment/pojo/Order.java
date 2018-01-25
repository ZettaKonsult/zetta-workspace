package com.zetta.payment.pojo;

import java.time.Instant;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import cool.graph.cuid.Cuid;

/**
 * @date 2018-01-24
 */
@DynamoDBTable(tableName = "MembrumOrders")
public class Order {

    public static final String ORDER_ID_INDEX = "orderId";
    public static final String USER_ID_INDEX = "userId";
    public static final String CREATED_INDEX = "created";

    private String orderId;
    private String userId;
    private long created;

    public Order() {}

    public Order(User user) {
        this(Cuid.createCuid(), user.getUserId());
    }

    public Order(String orderId, String userId) {
        this.orderId = orderId;
        this.userId = userId;
        this.created = Instant.now().getEpochSecond();
    }

    @DynamoDBHashKey(attributeName = ORDER_ID_INDEX)
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @DynamoDBIndexHashKey(globalSecondaryIndexName = USER_ID_INDEX)
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @DynamoDBAttribute(attributeName = CREATED_INDEX)
    public long getCreated() {
        return created;
    }

    public void setCreated(long created) {
        this.created = created;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Order " + orderId + ":");
        string.append("\nUser:   " + userId);
        string.append("\nCreated:  " + created);
        return string.toString();
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Order)) {
            return false;
        }

        return orderId.equals(((Order) other).getOrderId());
    }

}

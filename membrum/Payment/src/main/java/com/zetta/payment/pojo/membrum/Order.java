package com.zetta.payment.pojo.membrum;

import java.io.Serializable;
import java.util.UUID;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.util.DateUtil;

/**
 * @date 2017-11-15
 */
@DynamoDBTable(tableName = "MembrumOrders")
public class Order implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String ORDER_ID_INDEX = "orderId";
    public static final String AMOUNT_INDEX = "amount";
    public static final String USER_ID_INDEX = "userId";
    public static final String CREATED_INDEX = "created";

    private String orderId;
    private String userId;
    private String created;
    private String validUntil;
    private int amount;

    public Order() {}

    public Order(String userId, int amount) {
        this.orderId = UUID.randomUUID().toString();
        this.userId = userId;
        this.created = DateUtil.now();
        this.amount = amount;
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

    @DynamoDBAttribute(attributeName = AMOUNT_INDEX)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @DynamoDBAttribute(attributeName = CREATED_INDEX)
    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(String validUntil) {
        this.validUntil = validUntil;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Order " + orderId + ":");
        string.append("\nUser id:     " + userId);
        string.append("\nCreated:     " + created);
        string.append("\nAmount:      " + amount);
        string.append("\nValid until: " + validUntil);
        return string.toString();
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Order)) {
            return false;
        }

        return orderId.equals(((Order) other).getOrderId());
    }

    public int compareCreated(Order other) {
        return DateUtil.compare(created, other.getCreated());
    }

}

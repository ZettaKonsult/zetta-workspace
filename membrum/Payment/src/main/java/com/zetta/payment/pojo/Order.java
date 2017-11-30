package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.UUID;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.util.DateUtil;

@DynamoDBTable(tableName = "MembrumOrders")
public class Order implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String ID_INDEX = "orderId";
    public static final String AMOUNT_INDEX = "amount";
    public static final String IS_PAID_INDEX = "isPaid";
    public static final String USER_INDEX = "userId";
    public static final String CREATED_INDEX = "created";

    private String orderId;
    private String userId;
    private int amount;
    private boolean isPaid;
    private String created;

    public Order() {
        this("", "", 0, false, "");
    }

    public Order(User user, Plan plan) {
        this(user.getUserId(), plan.getAmount());
    }

    public Order(String userId, int amount) {
        this(UUID.randomUUID().toString(), userId, amount, false,
                DateUtil.now());
    }

    public Order(String orderId, String userId, int amount, boolean isPaid,
            String created) {

        this.orderId = orderId;
        this.userId = userId;
        this.amount = amount;
        this.isPaid = isPaid;
        this.created = created;
    }

    @DynamoDBHashKey(attributeName = ID_INDEX)
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @DynamoDBIndexHashKey(globalSecondaryIndexName = USER_INDEX)
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

    @DynamoDBAttribute(attributeName = IS_PAID_INDEX)
    public boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    @DynamoDBRangeKey(attributeName = CREATED_INDEX)
    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Order id: " + orderId);
        string.append("\nUser id: " + userId);
        string.append("\nAmount: " + amount);
        string.append("\nIs paid: " + (isPaid ? "yes" : "no") + ".");
        string.append("\nCreated: " + created);
        return string.toString();
    }
}

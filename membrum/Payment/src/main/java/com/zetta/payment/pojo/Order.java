package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.UUID;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.util.DateUtil;

@DynamoDBTable(tableName = "MembrumOrders")
public class Order implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String ORDER_ID_INDEX = "orderId";
    public static final String AMOUNT_INDEX = "amount";
    public static final String IS_PAID_INDEX = "isPaid";
    public static final String USER_ID_INDEX = "userId";
    public static final String CREATED_INDEX = "created";

    private String orderId;
    private String userId;
    private String planId;
    private int amount;
    private boolean isPaid;
    private String created;

    public Order() {}

    public Order(String orderId) {
        this.orderId = orderId;
    }

    public Order(User user, Plan plan) {
        this(UUID.randomUUID().toString(), user.getUserId(), plan.getPlanId(),
                plan.getAmount(), false, DateUtil.now());
    }

    public Order(String orderId, String userId, String planId, int amount,
            boolean isPaid, String created) {

        this.orderId = orderId;
        this.userId = userId;
        this.planId = planId;
        this.amount = amount;
        this.isPaid = isPaid;
        this.created = created;
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

    @DynamoDBAttribute(attributeName = IS_PAID_INDEX)
    public boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    @DynamoDBAttribute(attributeName = CREATED_INDEX)
    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    @DynamoDBAttribute(attributeName = Plan.ID_INDEX)
    public String getPlanId() {
        return planId;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Order id: " + orderId);
        string.append("\nPlan id: " + planId);
        string.append("\nUser id: " + userId);
        string.append("\nCreated: " + created);
        string.append("\nAmount: " + amount);
        string.append("\nIs paid: " + (isPaid ? "yes" : "no"));
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

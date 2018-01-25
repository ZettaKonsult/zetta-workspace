package com.zetta.payment.pojo;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.util.DateUtil;

import cool.graph.cuid.Cuid;

/**
 * @date 2017-12-07
 */
@DynamoDBTable(tableName = "MembrumPayments")
public class Payment implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String PAYMENT_ID_INDEX = "paymentId";
    public static final String AMOUNT_INDEX = "amount";
    public static final String CREATED_INDEX = "created";
    public static final String USER_ID_INDEX = "userId";

    private String paymentId;
    private String userId;
    private long created;
    private int amount;

    public Payment() {}

    public Payment(int amount) {
        this(Cuid.createCuid(), amount);
    }

    public Payment(String orderId, int amount) {
        this(orderId, "", amount);
    }

    public Payment(String paymentId, String userId, int amount) {
        this(paymentId, userId, DateUtil.epoch(), amount);
    }

    public Payment(String paymentId, String userId, long created, int amount) {
        this.paymentId = paymentId;
        this.userId = userId;
        this.created = created;
        this.amount = amount;
    }

    @DynamoDBHashKey(attributeName = PAYMENT_ID_INDEX)
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    @DynamoDBAttribute(attributeName = AMOUNT_INDEX)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
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
        string.append("Payment    " + paymentId + ":");
        string.append("\nUser id: " + userId);
        string.append("\nCreated: " + created);
        string.append("\nAmount:  " + amount);
        return string.toString();
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Payment)) {
            return false;
        }

        return paymentId.equals(((Payment) other).getPaymentId());
    }

    public int compareCreated(Payment other) {
        return ((Long) created).compareTo((Long) other.getCreated());
    }

}

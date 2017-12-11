package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.UUID;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.util.DateUtil;

/**
 * @date 2017-12-07
 */
@DynamoDBTable(tableName = "MembrumPayments")
public class Payment implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String PAYMENT_ID_INDEX = "paymentId";
    public static final String ORDER_ID_INDEX = "orderId";
    public static final String USER_ID_INDEX = "userId";
    public static final String AMOUNT_INDEX = "amount";
    public static final String CREATED_INDEX = "created";

    private String paymentId;
    private String orderId;
    private String userId;
    private String created;
    private int amount;

    public Payment() {}

    public Payment(String orderId, int amount) {
        this(UUID.randomUUID().toString(), orderId, "", DateUtil.now(), false,
                amount);
    }

    public Payment(String paymentId, String orderId, String userId,
            String created, boolean isPaid, int amount) {

        this.paymentId = paymentId;
        this.orderId = orderId;
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

    @DynamoDBIndexHashKey(globalSecondaryIndexName = ORDER_ID_INDEX)
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

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Payment " + paymentId + ":");
        string.append("\nOrder id: " + orderId);
        string.append("\nUser id:  " + userId);
        string.append("\nCreated:  " + created);
        string.append("\nAmount:   " + amount);
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
        return DateUtil.compare(created, other.getCreated());
    }

}

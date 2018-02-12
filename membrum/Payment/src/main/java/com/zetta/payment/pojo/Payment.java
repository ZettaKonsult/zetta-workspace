package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.zetta.payment.pojo.enumerations.Converter;
import com.zetta.payment.pojo.enumerations.PaymentType;
import com.zetta.payment.pojo.enumerations.Status;
import com.zetta.payment.util.DateUtil;

import cool.graph.cuid.Cuid;

/**
 * @date 2017-12-07
 */
@DynamoDBTable(tableName = "MembrumPayments")
public class Payment implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String MEMBER_ID_INDEX = "memberId";
    public static final String ID_INDEX = "id";
    public static final String STATUS_INDEX = "status";
    public static final String SPECIFICATION_INDEX = "specification";
    public static final String TYPE_INDEX = "type";
    public static final String CREATED_INDEX = "created";
    public static final String AMOUNT_INDEX = "amount";

    protected String memberId;
    protected String id;
    protected List<PaymentStatus> status;
    protected List<String> specification;
    protected PaymentType type;
    protected long created;
    protected int amount;

    public Payment() {
        this.status = new ArrayList<PaymentStatus>();
        this.specification = new ArrayList<String>();
    }

    public Payment(String id, Status status) {
        this();
        this.id = id;
        this.status.add(new PaymentStatus(id, created, status));
    }

    public Payment(String memberId, int amount) {
        this(Cuid.createCuid(), memberId, amount);
    }

    public Payment(String id, String memberId, int amount) {
        this(id, memberId, DateUtil.epoch(), amount, Status.PENDING);
    }

    public Payment(String id, String memberId, long created, int amount,
            Status status) {

        this.id = id;
        this.memberId = memberId;
        this.created = created;
        this.amount = amount;
        this.status = new ArrayList<PaymentStatus>();
        this.status.add(new PaymentStatus(id, created, status));
    }

    @DynamoDBIndexHashKey(globalSecondaryIndexName = MEMBER_ID_INDEX)
    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    @DynamoDBHashKey(attributeName = ID_INDEX)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    @DynamoDBAttribute(attributeName = STATUS_INDEX)
    @DynamoDBTypeConverted(converter = Converter.PaymentStatusConverter.class)
    public List<PaymentStatus> getStatus() {
        return status;
    }

    public void setStatus(List<PaymentStatus> status) {
        this.status = new ArrayList<PaymentStatus>(status);
    }

    public void addStatus(PaymentStatus status) {
        this.status.add(status);
    }

    public void addStatuses(List<PaymentStatus> statuses) {
        this.status.addAll(statuses);
    }

    @DynamoDBAttribute(attributeName = SPECIFICATION_INDEX)
    public List<String> getSpecification() {
        return specification;
    }

    public void setSpecification(List<String> specification) {
        this.specification = new ArrayList<String>(specification);
    }

    @DynamoDBAttribute(attributeName = TYPE_INDEX)
    @DynamoDBTypeConverted(converter = Converter.PaymentTypeConverter.class)
    public PaymentType getType() {
        return type;
    }

    public void setType(PaymentType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Payment          " + id + ":");
        string.append("\nStatuses:      " + status);
        string.append("\nSpecification: " + specification);
        string.append("\nType:          " + type);
        string.append("\nCreated:       " + created);
        string.append("\nAmount:        " + amount);
        return string.toString();
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Payment)) {
            return false;
        }

        return id.equals(((Payment) other).getId());
    }

    public int compareCreated(Payment other) {
        return ((Long) created).compareTo((Long) other.getCreated());
    }

}

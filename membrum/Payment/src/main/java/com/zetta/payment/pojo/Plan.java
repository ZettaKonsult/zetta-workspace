package com.zetta.payment.pojo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "MembrumPlan-Test")
public class Plan {

    public static final String ID_INDEX = "planId";
    public static final String AMOUNT_INDEX = "amount";

    private String planId;
    private int amount;

    public Plan() {
        this("", 0);
    }

    public Plan(String planId, int amount) {
        this.planId = planId;
        this.amount = amount;
    }

    @DynamoDBHashKey(attributeName = ID_INDEX)
    public String getPlanId() {
        return planId;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    @DynamoDBAttribute(attributeName = AMOUNT_INDEX)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Plan id: " + planId + "\nAmount: " + amount;
    }
}

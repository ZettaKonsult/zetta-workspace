package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "MembrumPlans")
public class Plan implements Serializable {

    private static final long serialVersionUID = 3568030818804839643L;

    public static final String PLAN_ID_INDEX = "planId";
    public static final String PLAN_NAME_INDEX = "planName";
    public static final String AMOUNT_INDEX = "amount";
    public static final String INTERVAL_INDEX = "interval";
    public static final String INTERVAL_COUNT_INDEX = "intervalCount";
    public static final String LABELS_INDEX = "labels";
    public static final String GROUPS_INDEX = "groups";
    public static final String TYPE_INDEX = "type";

    private String planId;
    private String planName;
    private int amount;
    private int intervalCount;
    private String interval;
    private List<String> labels;
    private List<String> groups;
    private String type;

    public Plan() {}

    @DynamoDBHashKey(attributeName = PLAN_ID_INDEX)
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

    @DynamoDBAttribute(attributeName = INTERVAL_COUNT_INDEX)
    public int getIntervalCount() {
        return intervalCount;
    }

    public void setIntervalCount(int intervalCount) {
        this.intervalCount = intervalCount;
    }

    @DynamoDBAttribute(attributeName = PLAN_NAME_INDEX)
    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    @DynamoDBAttribute(attributeName = TYPE_INDEX)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @DynamoDBAttribute(attributeName = INTERVAL_INDEX)
    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    @DynamoDBAttribute(attributeName = LABELS_INDEX)
    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    @DynamoDBAttribute(attributeName = GROUPS_INDEX)
    public List<String> getGroups() {
        return groups;
    }

    public void setGroups(List<String> groups) {
        this.groups = groups;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Plan              " + planId + ":");
        string.append("\nName:           " + planName);
        string.append("\nAmount:         " + amount);
        string.append("\nInterval:       " + interval);
        string.append("\nInterval count: " + intervalCount);
        string.append("\nLabels:         " + labels);
        string.append("\nGroups:         " + groups);
        string.append("\nType:           " + type);
        return string.toString();
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Plan)) {
            return false;
        }

        return planId.equals(((Plan) other).getPlanId());
    }

}

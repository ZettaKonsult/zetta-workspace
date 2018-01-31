package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "MembrumPlans")
public class Plan implements Serializable {

    private static final long serialVersionUID = 3568030818804839643L;

    public static final String PLAN_ID_INDEX = "id";
    public static final String PLAN_NAME_INDEX = "planName";
    public static final String AMOUNT_INDEX = "amount";
    public static final String INTERVAL_INDEX = "interval";
    public static final String INTERVAL_COUNT_INDEX = "intervalCount";
    public static final String LABELS_INDEX = "labels";
    public static final String GROUPS_INDEX = "group";
    public static final String TYPE_INDEX = "type";
    public static final String ORGANISATION_ID_INDEX = "organisationId";

    /*
    "organisationId": "cjd0k470n0000sscvzzm0njuc"
    }
     */

    private String id;
    private String name;
    private int amount;
    private int intervalCount;
    private String interval;
    private List<String> labels;
    private List<String> group;
    private String type;
    private String organisationId;

    public Plan() {}

    @DynamoDBHashKey(attributeName = PLAN_ID_INDEX)
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

    public void setOrganisationId(String organisationId) {
        this.organisationId = organisationId;
    }

    @DynamoDBAttribute(attributeName = ORGANISATION_ID_INDEX)
    public String getOrganisationId() {
        return organisationId;
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
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    public List<String> getGroup() {
        return group;
    }

    public void setGroup(List<String> group) {
        this.group = group;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Plan              " + id + ":");
        string.append("\nName:           " + name);
        string.append("\nAmount:         " + amount);
        string.append("\nOrganisation    " + organisationId);
        string.append("\nInterval:       " + interval);
        string.append("\nInterval count: " + intervalCount);
        string.append("\nLabels:         " + labels);
        string.append("\nGroups:         " + group);
        string.append("\nType:           " + type);
        return string.toString();
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Plan)) {
            return false;
        }

        return id.equals(((Plan) other).getId());
    }

}

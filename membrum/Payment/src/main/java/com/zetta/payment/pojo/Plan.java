package com.zetta.payment.pojo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "MembrumPlan-Test")
public class Plan {

    private String id;

    public Plan() {
        this("");
    }

    public Plan(String id) {
        this.id = id;
    }

    @DynamoDBHashKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAmount() {
        // TODO Auto-generated method stub
        return null;
    }
}

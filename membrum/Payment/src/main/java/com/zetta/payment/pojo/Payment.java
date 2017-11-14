package com.zetta.payment.pojo;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "TRFPayment-Test")
public class Payment implements Serializable {

    private static final long serialVersionUID = 5685764812092864593L;

    public static final String ID_INDEX = "id";

    private String id;

    public Payment() {
        this("");
    }

    public Payment(String id) {
        this.id = id;
    }

    @DynamoDBHashKey(attributeName=ID_INDEX)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Payment ID: " + id;
    }
}

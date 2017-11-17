package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "MembrumUser-Test")
public class User implements Serializable {

    private static final long serialVersionUID = 4172745746658050408L;

    private static final String EMAIL_INDEX = "email";
    private static final String ID_INDEX = "userId";
    private static final String NAME_INDEX = "name";
    private static final String POINTS_INDEX = "points";

    private String id;
    private String name;
    private String email;
    private Map<String, Double> points;

    public User() {
        this("", "", "", Collections.<String, Double>emptyMap());
    }

    public User(String id, String name, String email,
            Map<String, Double> points) {

        this.id = id;
        this.name = name;
        this.email = email;
        setPoints(points);
    }

    @DynamoDBHashKey(attributeName = ID_INDEX)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName = EMAIL_INDEX)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @DynamoDBAttribute(attributeName = NAME_INDEX)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @DynamoDBAttribute(attributeName = POINTS_INDEX)
    public Map<String, Double> getPoints() {
        return points;
    }

    public double getPoints(String key) {
        if (!points.containsKey(key)) {
            return -1.0;
        }
        return points.get(key);
    }

    public void setPoints(Map<String, Double> points) {
        this.points = new LinkedHashMap<String, Double>(points);
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder("Payment:");
        string.append("\n    Id:     " + id);
        string.append("\n    Name:   " + name);
        string.append("\n    Email:  " + email);
        string.append("\n    Points: {");

        String prefix = "\n";
        for (Map.Entry<String, Double> entry : points.entrySet()) {
            string.append(prefix + "        " + entry.getKey() + " = "
                    + entry.getValue());
            prefix = ",\n";
        }
        return string.append((prefix.equals("\n") ? "" : "\n    ") + "}")
                .toString();
    }
}
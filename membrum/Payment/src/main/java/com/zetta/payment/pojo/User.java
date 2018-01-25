package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.pojo.membrum.Plans;

/**
 * @date 2017-11-15
 */
@DynamoDBTable(tableName = "MembrumUsers")
public class User implements Serializable {

    private static final long serialVersionUID = 4172745746658050408L;

    private static final String ID_INDEX = "ssn";
    private static final String PAYMENT_INDEX = "payments";
    private static final String CREDTIS_INDEX = "credits";
    private static final String SUBSCRIPTION_INDEX = "subscription";

    private String userId;
    private List<String> subscription;
    private List<String> payments;
    private Map<String, Double> credits;

    public User() {
        this("", Collections.<String>emptyList(),
                Collections.<String>emptyList(),
                Collections.<String, Double>emptyMap());
    }

    public User(String userId, List<String> plans, List<String> payments,
            Map<String, Double> points) {

        this.userId = userId;
        this.payments = payments;
        setSubscription(plans);
        setCredits(points);
    }

    @DynamoDBHashKey(attributeName = ID_INDEX)
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @DynamoDBAttribute(attributeName = CREDTIS_INDEX)
    public Map<String, Double> getCredits() {
        return credits;
    }

    public boolean hasCredits(String key) {
        return credits.containsKey(key);
    }

    public double getCredits(String key) {
        return credits.get(key);
    }

    public void setCredits(Map<String, Double> points) {
        this.credits = new LinkedHashMap<String, Double>(points);
    }

    @DynamoDBAttribute(attributeName = SUBSCRIPTION_INDEX)
    public List<String> getSubscription() {
        return subscription;
    }

    public void setSubscription(List<String> subscription) {
        this.subscription = subscription;
    }

    @DynamoDBAttribute(attributeName = PAYMENT_INDEX)
    public List<String> getPayments() {
        return payments;
    }

    public void setPayments(List<String> payments) {
        this.payments = new ArrayList<String>(payments);
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder("Order:");
        string.append("\n    Id:     " + userId);
        string.append("\n    Points: {");
        string.append("\n    Subscription: " + subscription.toString());

        String prefix = "\n";
        for (Map.Entry<String, Double> entry : credits.entrySet()) {
            string.append(prefix + "        " + entry.getKey() + " = "
                    + entry.getValue());
            prefix = ",\n";
        }
        return string.append((prefix.equals("\n") ? "" : "\n    ") + "}")
                .toString();
    }

    public Plans getPlans() {
        return Plans.get(subscription);
    }

}
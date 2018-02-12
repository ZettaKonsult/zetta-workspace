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

    private String ssn;
    private List<String> subscription;
    private List<String> payments;
    private Map<String, Double> credits;

    public User() {
        this("", Collections.<String>emptyList(),
                Collections.<String>emptyList(),
                Collections.<String, Double>emptyMap());
        this.subscription = new ArrayList<String>();
    }

    public User(String ssn, List<String> plans, List<String> payments,
            Map<String, Double> points) {

        this.ssn = ssn;
        setPayments(payments);
        this.subscription = new ArrayList<String>(plans);
        setCredits(points);
    }

    @DynamoDBHashKey(attributeName = ID_INDEX)
    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
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
        this.subscription = new ArrayList<String>(subscription);
    }

    @DynamoDBAttribute(attributeName = PAYMENT_INDEX)
    public List<String> getPayments() {
        return payments;
    }

    public void setPayments(List<String> payments) {
        this.payments = new ArrayList<String>(payments);
    }

    public boolean addPayment(Payment payment) {
        String paymentId = payment.getId();
        if (payments.contains(paymentId)) {
            throw new IllegalArgumentException("Payment " + paymentId
                    + " already exists for user " + ssn + ".");
        }
        return this.payments.add(paymentId);
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder("User " + ssn + ":");
        string.append("\nSubscription: " + subscription.toString());
        string.append("\nPayments:     " + payments.toString());
        string.append("\nPoints: {");

        String prefix = "\n";
        for (Map.Entry<String, Double> entry : credits.entrySet()) {
            string.append(prefix + "        " + entry.getKey() + " = "
                    + entry.getValue());
            prefix = ",\n";
        }
        return string.append((prefix.equals("\n") ? "" : "\n    ") + "}")
                .toString();
    }

}
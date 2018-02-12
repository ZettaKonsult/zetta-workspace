package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @date 2017-12-01
 */
public class PaymentRequest implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String userId;
    private List<String> subscription;
    private String acceptUrl;
    private String cancelUrl;

    public PaymentRequest() {
        this.subscription = new ArrayList<String>();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String id) {
        this.userId = id;
    }

    public String getAcceptUrl() {
        return acceptUrl;
    }

    public void setAcceptUrl(String acceptUrl) {
        this.acceptUrl = acceptUrl == null ? "" : acceptUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl == null ? "" : cancelUrl;
    }

    public List<String> getSubscription() {
        return subscription;
    }

    public void setSubscription(List<String> subscription) {
        this.subscription = new ArrayList<String>(subscription);
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("PaymentRequest:");
        string.append("\nUser:         " + userId);
        string.append("\nSubscription: " + subscription);
        string.append("\nAccept-url:   " + acceptUrl);
        string.append("\nCancel-url:   " + cancelUrl);
        return string.toString();
    }

}

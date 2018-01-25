package com.zetta.payment.pojo;

import java.io.Serializable;

/**
 * @date 2017-12-01
 */
public class PaymentRequest implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String userId;
    private String acceptUrl;
    private String cancelUrl;
    private long start;
    private long end;

    public PaymentRequest() {}

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
        this.acceptUrl = acceptUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public long getEnd() {
        return end;
    }

    public void setEnd(long end) {
        this.end = end;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("PaymentRequest:");
        string.append("\nUser:       " + userId);
        string.append("\nAccept-url: " + acceptUrl);
        string.append("\nCancel-url: " + cancelUrl);
        string.append("\nStart:      " + start);
        string.append("\nEnd:        " + end);
        return string.toString();
    }

}

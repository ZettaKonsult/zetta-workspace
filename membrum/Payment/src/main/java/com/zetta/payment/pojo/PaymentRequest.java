package com.zetta.payment.pojo;

import java.io.Serializable;

/**
 * @date 2017-12-01
 */
public class PaymentRequest implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String userId;
    private String start;
    private String end;

    public PaymentRequest() {}

    public String getUserId() {
        return userId;
    }

    public void setUserId(String id) {
        this.userId = id;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("PaymentRequest:");
        string.append("\n    User:       " + userId);
        string.append("\n    Start:      " + start);
        string.append("\n    End:        " + end);
        return string.toString();
    }

}

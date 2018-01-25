package com.zetta.payment.pojo;

import java.io.Serializable;

/**
 * @date 2017-12-01
 */
public class PaymentRequest implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String userId;
    private long start;
    private long end;

    public PaymentRequest() {}

    public PaymentRequest(String userId, long start, long end) {
        this.userId = userId;
        this.start = start;
        this.end = end;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String id) {
        this.userId = id;
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
        string.append("\n    User:       " + userId);
        string.append("\n    Start:      " + start);
        string.append("\n    End:        " + end);
        return string.toString();
    }

}

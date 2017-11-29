package com.zetta.payment.pojo;

import java.io.Serializable;

public class FormData implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String userId;
    private String orderId;

    public FormData() {
        this("", "");
    }

    private FormData(String userId, String orderId) {
        this.orderId = orderId;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String id) {
        this.userId = id;
    }

    @Override
    public String toString() {
        return "User ID: " + (userId.equals("") ? "<undefined>" : userId);
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

}

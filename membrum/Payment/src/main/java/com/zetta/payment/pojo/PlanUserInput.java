package com.zetta.payment.pojo;

import java.io.Serializable;

public class PlanUserInput implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String userId;
    private String planId;

    public PlanUserInput() {
        this("", "");
    }

    private PlanUserInput(String userId, String planId) {
        this.planId = planId;
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

    public String getPlanId() {
        return planId;
    }

    public void setplanId(String planId) {
        this.planId = planId;
    }

}

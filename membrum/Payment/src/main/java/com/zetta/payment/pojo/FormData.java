package com.zetta.payment.pojo;

import java.io.Serializable;

public class FormData implements Serializable {
    private static final long serialVersionUID = 3150193213130779657L;

    private String id;

    public FormData() {
        this("");
    }

    private FormData(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "User ID: " + (id.equals("") ? "<undefined>" : id);
    }
}

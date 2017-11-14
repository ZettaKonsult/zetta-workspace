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

    public String getID() {
        return id;
    }

    public void setID(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "ID: " + id;
    }
}

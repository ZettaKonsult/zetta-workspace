package com.zetta.payment.pojo;

import java.io.Serializable;

public class Transferred implements Serializable {

    private static final long serialVersionUID = -4978951666828113754L;

    public String from;
    public String to;

    public Transferred() {
        this("", "");
    }

    public Transferred(String from, String to) {
        this.from = from;
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("{ from: " + from);
        string.append(", To:   " + to + "}");
        return string.toString();
    }
}
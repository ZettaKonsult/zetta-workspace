package com.zetta.payment.pojo;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.zetta.payment.pojo.enumerations.Converter;
import com.zetta.payment.pojo.enumerations.Status;
import com.zetta.payment.util.DateUtil;

import cool.graph.cuid.Cuid;

public class PaymentStatus implements Serializable {

    private static final long serialVersionUID = -5448060613621676426L;

    private String id;
    private String paymentId;
    private long created;
    private Status status;
    private Transferred transferred;

    public PaymentStatus() {}

    public PaymentStatus(String paymentId, long created) {
        this(paymentId, created, Status.PENDING);
    }

    public PaymentStatus(String paymentId, long created, Status status) {

        this(Cuid.createCuid(), paymentId, status, DateUtil.epoch());
    }

    public PaymentStatus(String id, String paymentId, Status status,
            long created) {

        this.id = id;
        this.paymentId = paymentId;
        this.status = status;
        this.created = created;
        this.transferred = new Transferred();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getCreated() {
        return created;
    }

    public void setCreated(long created) {
        this.created = created;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @DynamoDBTypeConverted(converter = Converter.TransferredConverter.class)
    public Transferred getTransferred() {
        return transferred;
    }

    public void setTransferred(Transferred transferred) {
        this.transferred = transferred;
    }

    public void setTransferred(String from, String to) {
        setTransferred(new Transferred(from, to));
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Payment:       " + id);
        string.append("\nPayment id:  " + paymentId);
        string.append("\nCreated:     " + created);
        string.append("\nStatus:      " + status);
        string.append("\nTransferred: " + transferred);
        return string.toString();
    }
}

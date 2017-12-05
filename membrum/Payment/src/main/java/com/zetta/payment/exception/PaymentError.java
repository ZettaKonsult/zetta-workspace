package com.zetta.payment.exception;

public abstract class PaymentError extends Exception {

    public PaymentError(String message) {
        super(message);
    }

    public PaymentError(Exception error) {
        super(error);
    }

    private static final long serialVersionUID = -5428597018465600722L;

}

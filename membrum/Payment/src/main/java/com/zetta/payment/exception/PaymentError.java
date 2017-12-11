package com.zetta.payment.exception;

/**
 * @date 2017-11-27
 */
public abstract class PaymentError extends Exception {

    public PaymentError(String message) {
        super(message);
    }

    public PaymentError(Throwable error) {
        super(error);
    }

    private static final long serialVersionUID = -5428597018465600722L;

}

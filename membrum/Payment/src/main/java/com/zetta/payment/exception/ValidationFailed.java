package com.zetta.payment.exception;

public class ValidationFailed extends Exception {

    private static final long serialVersionUID = -1971128733684451277L;

    public ValidationFailed(String message) {
        super(message);
    }
}

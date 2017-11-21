package com.zetta.payment.exception;

public class InvalidInput extends Exception {

    private static final long serialVersionUID = 715845704921077959L;

    public InvalidInput(String message) {
        super(message);
    }
}

package com.zetta.payment.exception;

public class JSONError extends RuntimeException {

    private static final long serialVersionUID = 5905125990144024704L;

    public JSONError(String message) {
        super(message);
    }

    public JSONError(Throwable error) {
        super(error);
    }

}

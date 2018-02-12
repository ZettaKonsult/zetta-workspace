package com.zetta.payment.exception;

import java.io.IOException;

/**
 * @date 2017-11-12
 */
public class InvalidInput extends PaymentError {

    private static final long serialVersionUID = 715845704921077959L;

    public InvalidInput(String message) {
        super(message);
    }

    public InvalidInput(IOException error) {
        this(error.getMessage());
    }
}

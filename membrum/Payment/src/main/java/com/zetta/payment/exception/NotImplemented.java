package com.zetta.payment.exception;

public class NotImplemented extends UnsupportedOperationException {

    private static final long serialVersionUID = 4980045297291306877L;

    protected NotImplemented(String type) {
        super(type + " is not implemented yet.");
    }

}

package com.zetta.payment.exception;

/**
 * @date 2017-11-09
 */
public class NotImplemented extends UnsupportedOperationException {

    private static final long serialVersionUID = 4980045297291306877L;

    protected NotImplemented(String type) {
        super(type + " is not implemented yet.");
    }

}

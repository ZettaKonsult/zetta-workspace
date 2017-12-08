package com.zetta.payment.exception;

/**
 * @date 2017-12-06
 */
public class JSONFormat extends RuntimeException {

    private static final long serialVersionUID = 5905125990144024704L;

    public JSONFormat(String message) {
        super(message);
    }

    public JSONFormat(Throwable error) {
        super(error);
    }

}

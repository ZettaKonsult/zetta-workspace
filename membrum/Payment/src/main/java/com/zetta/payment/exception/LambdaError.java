package com.zetta.payment.exception;

/**
 * @date 2017-12-01
 */
public class LambdaError extends PaymentError {

    public LambdaError(String message) {
        super(message);
    }

    public LambdaError(Throwable error) {
        super(error);
    }

    private static final long serialVersionUID = -939582048613929359L;

}

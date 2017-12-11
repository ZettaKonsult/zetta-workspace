package com.zetta.payment.exception;

/**
 * @date 2017-12-01
 */
public class LambdaCall extends PaymentError {

    public LambdaCall(String message) {
        super(message);
    }

    public LambdaCall(Throwable error) {
        super(error);
    }

    private static final long serialVersionUID = -939582048613929359L;

}

package com.zetta.payment.exception;

/**
 * @date 2017-11-12
 */
public class ValidationFailed extends PaymentError {

    private static final long serialVersionUID = -1971128733684451277L;

    public ValidationFailed(String message) {
        super(message);
    }
}

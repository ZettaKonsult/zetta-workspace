package com.zetta.payment.exception;

/**
 * @date 2017-11-27
 */
public class ProcessFail extends PaymentError {

    private static final long serialVersionUID = 1793204909265363699L;

    public ProcessFail(Exception error) {
        super(error);
    }
}

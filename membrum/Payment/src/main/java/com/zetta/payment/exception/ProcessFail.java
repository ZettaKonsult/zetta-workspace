package com.zetta.payment.exception;

/**
 * @date 2017-11-29
 */
public class ProcessFail extends Exception {

    private static final long serialVersionUID = 1793204909265363699L;

    public ProcessFail(Exception exception) {
        super(exception);
    }
}

package com.zetta.payment.exception;

/**
 * @date 2017-11-27
 */
public class ScriptError extends RuntimeException {

    public ScriptError(String message) {
        super(message);
    }

    public ScriptError(Throwable error) {
        super(error);
    }

    private static final long serialVersionUID = -5428597018465600722L;

}

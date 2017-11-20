package com.zetta.payment.form;

public class TRFForm extends BasicForm {

    private static final long serialVersionUID = 8418801285386062689L;

    @Override
    public String[] names() {
        return new String[] {
                "accepturl", "amount", "callbackurl", "cancelurl", "currency",
                "decorator", "ip", "lang", "merchant", "orderid", "test",
                "uniqueoid"
        };
    }

}
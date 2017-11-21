package com.zetta.payment.form;

import java.util.UUID;

public final class TRFForm extends DIBSForm {

    private static final long serialVersionUID = 1452321975763992435L;

    public TRFForm(String amount) {
        this(amount, generateOrderID());
    }

    public TRFForm(String amount, String orderID) {
        super();
        set("orderid", orderID);
        set("amount", amount);
    }

    public static String generateOrderID() {
        return UUID.randomUUID().toString();
    }
}

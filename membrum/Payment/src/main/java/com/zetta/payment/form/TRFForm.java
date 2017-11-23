package com.zetta.payment.form;

import java.util.UUID;

public final class TRFForm extends DIBSForm {

    private static final long serialVersionUID = 1452321975763992435L;

    public TRFForm(int amount) {
        this(generateOrderID(), amount);
    }

    public TRFForm(String orderID, int amount) {
        super();
        set("orderid", orderID);
        set("amount", Integer.toString(amount));
    }

    public static String generateOrderID() {
        return UUID.randomUUID().toString();
    }
}

package com.zetta.payment.form;

import cool.graph.cuid.Cuid;

/**
 * @date 2017-11-10
 */
public final class TRFForm extends DIBSForm {

    private static final long serialVersionUID = 1452321975763992435L;
    private static final String CALLBACK_URL = "https://4acs2nf77c.execute"
            + "-api.eu-central-1.amazonaws.com/prod/confirmPayment";

    public TRFForm(int amount) {
        this(Cuid.createCuid(), amount);
    }

    public TRFForm(String orderId, int amount) {
        this(orderId, amount, "", "");
    }

    public TRFForm(String orderID, int amount, String acceptUrl,
            String cancelUrl) {

        super();
        set("accepturl", acceptUrl);
        set("callbackurl", CALLBACK_URL);
        set("cancelurl", cancelUrl);
        set("merchant", "90234620");
        set("orderid", orderID);
        set("amount", Integer.toString(amount));
    }

}

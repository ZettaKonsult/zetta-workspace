package com.zetta.payment.form;

import com.zetta.payment.pojo.membrum.Order;

/**
 * @date 2017-11-10
 */
public final class TRFForm extends DIBSForm {

    private static final long serialVersionUID = 1452321975763992435L;
    private static final String CALLBACK_URL = "https://4acs2nf77c.execute"
            + "-api.eu-central-1.amazonaws.com/prod/confirmPayment";
    private static final String ACCEPT_URL = "";
    private static final String CANCEL_URL = "";

    public TRFForm(Order order) {
        this(order.getOrderId(), order.getAmount());
    }

    public TRFForm(String orderID, int amount) {
        super();
        set("accepturl", ACCEPT_URL);
        set("callbackurl", CALLBACK_URL);
        set("cancelurl", CANCEL_URL);
        set("merchant", "90234620");
        set("orderid", orderID);
        set("amount", Integer.toString(amount));
    }

}

package com.zetta.payment.form;

import com.zetta.payment.pojo.Order;

public final class TRFForm extends DIBSForm {

    private static final long serialVersionUID = 1452321975763992435L;

    public TRFForm(Order order) {
        this(order.getOrderId(), order.getAmount());
    }

    public TRFForm(String orderID, int amount) {
        super();
        set("orderid", orderID);
        set("amount", Integer.toString(amount));
    }

}

package com.zetta.payment.http;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import com.zetta.payment.form.BasicForm;
import com.zetta.payment.form.TRFForm;

public final class DIBSConnect extends AbstractConnect {

    private static final String CALLBACK_URL = "https://qe3bzqhdu8.execute-api"
            + ".eu-central-1.amazonaws.com/prod/confirm";
    private static final String ACCEPT_URL = "";
    private static final String CANCEL_URL = "";

    @Override
    public String url() {
        return "https://payment.architrade.com/paymentweb/start.action";
    }

    @Override
    public BasicForm constructForm() {
        Map<String, String> values = new LinkedHashMap<String, String>();

        values.put("accepturl", ACCEPT_URL);
        values.put("callbackurl", CALLBACK_URL);
        values.put("cancelurl", CANCEL_URL);
        values.put("lang", "sv");
        values.put("amount", "1");
        values.put("merchant", "90234620");
        values.put("cancelurl", "");
        values.put("currency", "SEK");
        values.put("orderid", generateOrderID());
        values.put("decorator", "responsive");
        values.put("test", "1");
        values.put("uniqueoid", "yes");

        BasicForm form = new TRFForm();
        form.fill(values);
        return form;
    }

    private String generateOrderID() {
        return UUID.randomUUID().toString();
    }
}

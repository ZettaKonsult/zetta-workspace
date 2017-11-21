package com.zetta.payment.form;

import java.util.LinkedHashMap;
import java.util.Map;

public class DIBSForm extends BasicForm {

    private static final long serialVersionUID = 8418801285386062689L;
    private static final String CALLBACK_URL = "https://qe3bzqhdu8.execute-api"
            + ".eu-central-1.amazonaws.com/prod/confirm";
    private static final String ACCEPT_URL = "";
    private static final String CANCEL_URL = "";

    @Override
    public String baseUrl() {
        return "https://payment.architrade.com/paymentweb/start.action";
    }

    @Override
    public Map<String, String> presetValues() {
        Map<String, String> values = new LinkedHashMap<String, String>();

        set("accepturl", ACCEPT_URL);
        set("callbackurl", CALLBACK_URL);
        set("cancelurl", CANCEL_URL);
        set("currency", "SEK");
        set("decorator", "responsive");
        set("lang", "sv");
        set("merchant", "90234620");
        set("test", "1");
        set("uniqueoid", "yes");

        return values;
    }

    @Override
    public String[] names() {
        return new String[] { "accepturl", "amount", "callbackurl", "cancelurl", "currency", "decorator", "ip", "lang",
                "merchant", "orderid", "test", "uniqueoid" };
    }

}
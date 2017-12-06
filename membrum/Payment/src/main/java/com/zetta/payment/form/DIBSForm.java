package com.zetta.payment.form;

import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.log4j.Logger;

/**
 * @date 2017-11-10
 */
public class DIBSForm extends BasicForm {

    private static final long serialVersionUID = 8418801285386062689L;
    private static final String CALLBACK_URL = "https://gjnhqznxmd.execute"
            + "-api.eu-central-1.amazonaws.com/prod/confirm";
    private static final String ACCEPT_URL = "";
    private static final String CANCEL_URL = "";

    @Override
    public final String baseUrl() {
        return "https://payment.architrade.com/paymentweb/start.action";
    }

    @Override
    public final Map<String, String> presetValues() {
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
    public final String[] names() {
        return new String[] { "accepturl", "amount", "callbackurl", "cancelurl",
                "currency", "decorator", "ip", "lang", "merchant", "orderid",
                "test", "uniqueoid" };
    }

    @Override
    public String invoiceUrl() {
        Logger.getLogger(DIBSForm.class)
                .warn("DIBSForm#invoiceUrl() is not implemented.");
        return "";
    }

}
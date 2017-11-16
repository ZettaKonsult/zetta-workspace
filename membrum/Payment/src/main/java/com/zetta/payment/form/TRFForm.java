package com.zetta.payment.form;

import java.util.LinkedHashMap;
import java.util.Map;

public class TRFForm extends Form {

    private static final long serialVersionUID = 8418801285386062689L;

    @Override
    protected Map<String, String> presetValues() {
        Map<String, String> values = new LinkedHashMap<String, String>();
        values.put("decorator", "responsive");
        values.put("test", "1");
        values.put("uniqueoid", "yes");
        return values;
    }

    @Override
    protected String[] formNames() {
        return new String[] {
                "accepturl", "amount", "callbackurl", "cancelurl", "currency",
                "decorator", "ip", "lang", "merchant", "orderid", "test",
                "uniqueoid"
        };
    }

    public static void main(String[] args) {
        System.out.println(new TRFForm().asJSon());
    }

}
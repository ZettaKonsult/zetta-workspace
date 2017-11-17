package com.zetta.payment.http;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;

public class DIBSConnect extends AbstractConnect {

    private static final String ACCEPT_URL = "https://9rwnktf427.execute-api.eu-central-1.amazonaws.com/prod/confirm";
    private static final String CANCEL_URL = "https://9rwnktf427.execute-api.eu-central-1.amazonaws.com/prod/confirm";
    private static final String CALLBACK_URL = "https://9rwnktf427.execute-api.eu-central-1.amazonaws.com/prod/confirm";
    private static final String DIBS_URL = "https://payment.architrade.com/paymentweb/start.action";

    public void doPost() throws IOException {
        HttpURLConnection http = constructRequest(DIBS_URL, "POST");
        Form form = constructForm();
        emit(http, form, true);
    }

    @Override
    protected Form constructForm() {
        Map<String, String> values = new LinkedHashMap<String, String>();
        values.put("accepturl", ACCEPT_URL);
        values.put("callbackurl", CALLBACK_URL);
        values.put("cancelurl", CANCEL_URL);
        values.put("amount", "1");
        values.put("merchant", "90234620");
        values.put("cancelurl", "");
        values.put("currency", "SEK");
        values.put("orderid", UUID.randomUUID().toString());

        Form form = new TRFForm();
        form.fillForm(values);
        return form;
    }

    public static void main(String[] args) throws IOException {

    }
}

package com.zetta.payment.http;

import java.io.IOException;
import java.io.OutputStream;

import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.Order;

public final class DIBSConnection extends HTTPConnection {
    private Form form;

    public DIBSConnection(String userId, int amount) {
        form = new TRFForm(new Order(userId, amount));
    }

    public void connect(OutputStream outStream) throws IOException {
        doRequest("POST", form.bytes(), outStream);
    }

    @Override
    public String url() {
        return form.url();
    }

}

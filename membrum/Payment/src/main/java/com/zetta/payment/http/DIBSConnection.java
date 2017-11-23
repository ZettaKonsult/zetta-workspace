package com.zetta.payment.http;

import java.io.IOException;
import java.io.OutputStream;

import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;

public final class DIBSConnection extends HTTPConnection {
    private Form form;

    public DIBSConnection() {
        form = new TRFForm(1);
    }

    public void connect(OutputStream outStream) throws IOException {
        doRequest("POST", form.bytes(), outStream);
    }

    @Override
    public String url() {
        return form.url();
    }

}

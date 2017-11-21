package com.zetta.payment.test.http;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.http.DIBSConnection;
import com.zetta.payment.test.util.TestUtil;

public class TestDIBSConnection {
    private DIBSConnection connection;

    @Before
    public void setUp() {
        connection = new DIBSConnection();
    }

    @Test
    public void url() {
        assertEquals(
                TestUtil.withoutOrderId(
                        "https://payment.architrade.com/paymentweb/start.action?accepturl=&amount=1&callbackurl="
                                + "https%3A%2F%2Fqe3bzqhdu8.execute-api.eu-central-1.amazonaws.com%2Fprod%2Fconfirm&"
                                + "cancelurl=&currency=SEK&decorator=responsive&ip=&lang=sv&merchant=90234620&orderid="
                                + "6cb4f9f8-82fb-4c64-9eaa-3bd75d93f3ed&test=1&uniqueoid=yes"),
                TestUtil.withoutOrderId(connection.url()));
    }

    @Test
    public void connect() throws IOException {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        connection.connect(outStream);

        assertTrue("Test failure indicates connection issues; check output stream (print expected string).",
                new String(outStream.toByteArray(), StandardCharsets.UTF_8).contains("3. Betalning godk&auml;nd"));
    }
}
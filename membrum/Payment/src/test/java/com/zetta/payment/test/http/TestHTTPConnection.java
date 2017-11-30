package com.zetta.payment.test.http;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;

import org.junit.Test;

import com.zetta.payment.form.TRFForm;
import com.zetta.payment.http.DIBSConnection;
import com.zetta.payment.http.HTTPConnection;
import com.zetta.payment.pojo.Order;

public class TestHTTPConnection {
    private HTTPConnection connection = new DIBSConnection("testId", 123);

    @Test
    public void constructRequest() throws IOException {
        HttpURLConnection conn = connection.constructRequest("POST");
        assertEquals(conn.getDoOutput(), true);
        assertEquals(conn.getDoInput(), true);
        assertEquals(conn.getRequestProperty("Content-Type"),
                "application/x-www-form-urlencoded; charset=UTF-8");
        assertEquals(conn.getRequestMethod(), "POST");
    }

    @Test
    public void doRequest() throws IOException {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        connection.doRequest("POST", new TRFForm(new Order()).bytes(),
                outStream);
        assertTrue(
                "Test failure indicates connection issues; check output "
                        + "stream (print expected string).",
                new String(outStream.toByteArray(), StandardCharsets.UTF_8)
                        .contains("3. Betalning godk&auml;nd"));
    }
}

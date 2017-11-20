package com.zetta.payment.test.connect;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.zetta.payment.form.Form;
import com.zetta.payment.http.AbstractConnect;
import com.zetta.payment.http.DIBSConnect;

/**
 * Tests for the DIBS connection class.
 * 
 * @date 2017-11-17
 */
public class TestDIBSConnect {
    private static Pattern pattern;
    private AbstractConnect dibs;

    @BeforeClass
    public static void beforeClass() {
        pattern = Pattern.compile("orderid=(.*)&");
    }

    @Before
    public void setUp() {
        dibs = new DIBSConnect();
    }

    @Test
    public void url() {
        assertEquals("https://payment.architrade.com/paymentweb/start.action",
                dibs.url());
    }

    @Test
    public void emptyValues() {
        Form form = dibs.constructForm();
        String[] names = {
                "accepturl", "cancelurl", "ip", "lang"
        };
        for (String name : names) {
            assertEquals("Invalid value for parameter '" + name + "'.", "",
                    form.get(name));
        }
    }

    @Test
    public void presetValues() {
        Form form = dibs.constructForm();
        String[] names = {
                "amount", "callbackurl", "currency", "decorator", "merchant",
                "test", "uniqueoid"
        };
        String[] values = {
                "1",
                "https://qe3bzqhdu8.execute-api.eu-central-1.amazonaws.com/"
                        + "prod/confirm",
                "SEK", "responsive", "90234620", "1", "yes"
        };
        for (int i = 0; i < Math.max(names.length, values.length); ++i) {
            assertEquals(values[i], form.get(names[i]));
        }
    }

    @Test
    public void fullUrl() {
        String url = "https://payment.architrade.com/paymentweb/start.action?"
                + "accepturl=&amount=1&callbackurl=https%3A%2F%2Fqe3bzqhdu8."
                + "execute-api.eu-central-1.amazonaws.com%2Fprod%2Fconfirm&"
                + "cancelurl=&currency=SEK&decorator=responsive&ip=&lang=&"
                + "merchant=90234620&orderid=27b98cd8-3940-4742-a059-"
                + "7f132a7f72c4&test=1&uniqueoid=yes";

        assertEquals(withoutOrderId(url), withoutOrderId(dibs.fullUrl()));
    }

    @Test
    public void constructRequest() throws IOException {
        HttpURLConnection conn = dibs.constructRequest(dibs.url(), "POST");
        assertEquals(conn.getDoOutput(), true);
        assertEquals(conn.getDoInput(), true);
        assertEquals(conn.getRequestProperty("Content-Type"),
                "application/x-www-form-urlencoded; charset=UTF-8");
        assertEquals(conn.getRequestMethod(), "POST");
    }

    @Test
    public void connect() throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        dibs.doRequest("POST", out);

        assertTrue(
                "Test failure indicates payment failure;"
                        + " check entire output stream.",
                new String(out.toByteArray(), StandardCharsets.UTF_8)
                        .contains("Betaling godkendt"));
    }

    /**
     * Orderids are randomly generated so they have to be disregarded when
     * checking URLs.
     */
    private String withoutOrderId(String string) {
        String toReplace = "";
        Matcher match = pattern.matcher(string);
        if (match.find()) {
            toReplace = match.group(1);
        }
        return string.replace(toReplace, "");
    }
}

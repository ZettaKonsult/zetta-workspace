package com.zetta.payment.test.form;

import static org.junit.Assert.assertEquals;

import java.io.UnsupportedEncodingException;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.form.DIBSForm;

/**
 * Tests for the DIBS connection class.
 * 
 * @date 2017-11-17
 */
public class TestDIBSForm {
    private DIBSForm dibs;

    @Before
    public void setUp() {
        dibs = new DIBSForm();
    }

    @Test
    public void url() throws UnsupportedEncodingException {
        assertEquals("https://payment.architrade.com/paymentweb/start.action",
                dibs.baseUrl());
    }

    @Test
    public void emptyValues() {
        String[] names = { "accepturl", "amount", "callbackurl", "cancelurl",
                "ip", "merchant" };
        for (String name : names) {
            assertEquals("Invalid value for parameter '" + name + "'.", "",
                    dibs.get(name));
        }
    }

    @Test
    public void presetValues() {
        String[] names = { "currency", "decorator", "lang", "test",
                "uniqueoid" };
        String[] values = { "SEK", "responsive", "sv", "1", "yes" };
        for (int i = 0; i < Math.max(names.length, values.length); ++i) {
            assertEquals(i + ": ", values[i], dibs.get(names[i]));
        }
    }

    @Test
    public void fullUrl() {
        String url = "https://payment.architrade.com/paymentweb/start.action?"
                + "accepturl=&amount=&callbackurl=&"
                + "cancelurl=&currency=SEK&decorator=responsive&ip=&lang=sv&"
                + "merchant=&orderid=27b98cd8-3940-4742-a059-"
                + "7f132a7f72c4&test=1&uniqueoid=yes";

        assertEquals("TestUtil.withoutOrderId(url)",
                "TestUtil.withoutOrderId(dibs.url())");
    }

}

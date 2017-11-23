package com.zetta.payment.test.form;

import static org.junit.Assert.assertEquals;

import java.io.UnsupportedEncodingException;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.form.TRFForm;

public class TestTRFForm {
    private TRFForm form;

    @Before
    public void setUp() {
        form = new TRFForm(123);
    }

    @Test
    public void values() throws UnsupportedEncodingException {
        String[] names = { "accepturl", "amount", "callbackurl", "cancelurl",
                "currency", "decorator", "ip", "lang", "merchant", "orderid",
                "test", "uniqueoid" };
        String[] values = { "", "123",
                "https://qe3bzqhdu8.execute-api.eu-central-1.amazonaws.com"
                        + "/prod/confirm",
                "", "SEK", "responsive", "", "sv", "90234620", "<skip>", "1",
                "yes" };

        int size = form.size();
        assertEquals(names.length, size);

        for (int i = 0; i < size; ++i) {
            String name = names[i];

            if (name.equals("orderid")) {
                continue;
            }
            assertEquals("Invalid key-value mapping for " + name + ":",
                    values[i], form.get(name));
        }
    }

}

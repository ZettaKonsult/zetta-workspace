package com.zetta.payment.test.form;

import static org.junit.Assert.assertEquals;

import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.form.BasicForm;
import com.zetta.payment.form.DIBSForm;
import com.zetta.payment.form.Form;

/**
 * Tests Form objects.
 * <p>
 * Uses a {@link DIBSForm} to test the abstract superclass' ({@link BasicForm})
 * methods.
 * 
 * @date 2017-11-14
 */
public class TestForm {

    private static final String[] names = { "accepturl", "amount",
            "callbackurl", "cancelurl", "currency", "decorator", "ip", "lang",
            "merchant", "orderid", "test", "uniqueoid" };
    private static final String[] values = { "a", "b", "c", "d", "e", "f", "g",
            "h", "i", "j", "k", "l" };

    private Form form;

    @Before
    public void setUp() {
        this.form = new DIBSForm();
    }

    @Test
    public void get() {
        assertEquals("", form.get("accepturl"));
    }

    @Test
    public void set() {
        form.set("accepturl", "a");
        assertEquals("a", form.get("accepturl"));
    }

    @Test
    public void formSize() {
        assertEquals(names.length, form.size());
    }

    @Test
    public void fillFormMap() {
        form.fill(filledMap());

        assertEquals(names.length, form.size());
        for (Map.Entry<String, String> entry : filledMap().entrySet()) {
            assertEquals(entry.getValue(), form.get(entry.getKey()));
        }
    }

    @Test
    public void fillFormStrings() {
        form.fill(names, values);

        assertEquals(names.length, form.size());
        for (Map.Entry<String, String> entry : filledMap().entrySet()) {
            assertEquals(entry.getValue(), form.get(entry.getKey()));
        }
    }

    @Test
    public void asJSON() {
        form.fill(names, values);
        assertEquals("{\r\n" + "  \"accepturl\" : \"a\",\r\n"
                + "  \"amount\" : \"b\",\r\n" + "  \"callbackurl\" : \"c\",\r\n"
                + "  \"cancelurl\" : \"d\",\r\n" + "  \"currency\" : \"e\",\r\n"
                + "  \"decorator\" : \"f\",\r\n" + "  \"ip\" : \"g\",\r\n"
                + "  \"lang\" : \"h\",\r\n" + "  \"merchant\" : \"i\",\r\n"
                + "  \"orderid\" : \"j\",\r\n" + "  \"test\" : \"k\",\r\n"
                + "  \"uniqueoid\" : \"l\"\r\n" + "}", form.asJSON());
    }

    @Test
    public void bytes() throws UnsupportedEncodingException {
        form.fill(names, values);

        Assert.assertArrayEquals(new byte[] { 104, 116, 116, 112, 115, 58, 47,
                47, 112, 97, 121, 109, 101, 110, 116, 46, 97, 114, 99, 104, 105,
                116, 114, 97, 100, 101, 46, 99, 111, 109, 47, 112, 97, 121, 109,
                101, 110, 116, 119, 101, 98, 47, 115, 116, 97, 114, 116, 46, 97,
                99, 116, 105, 111, 110, 63, 97, 99, 99, 101, 112, 116, 117, 114,
                108, 61, 97, 38, 97, 109, 111, 117, 110, 116, 61, 98, 38, 99,
                97, 108, 108, 98, 97, 99, 107, 117, 114, 108, 61, 99, 38, 99,
                97, 110, 99, 101, 108, 117, 114, 108, 61, 100, 38, 99, 117, 114,
                114, 101, 110, 99, 121, 61, 101, 38, 100, 101, 99, 111, 114, 97,
                116, 111, 114, 61, 102, 38, 105, 112, 61, 103, 38, 108, 97, 110,
                103, 61, 104, 38, 109, 101, 114, 99, 104, 97, 110, 116, 61, 105,
                38, 111, 114, 100, 101, 114, 105, 100, 61, 106, 38, 116, 101,
                115, 116, 61, 107, 38, 117, 110, 105, 113, 117, 101, 111, 105,
                100, 61, 108 }, form.url().getBytes());
    }

    @Test
    public void toStringFilled() {
        form.fill(filledMap());
        assertEquals("{\n" + "    accepturl: a,\n" + "    amount: b,\n"
                + "    callbackurl: c,\n" + "    cancelurl: d,\n"
                + "    currency: e,\n" + "    decorator: f,\n" + "    ip: g,\n"
                + "    lang: h,\n" + "    merchant: i,\n" + "    orderid: j,\n"
                + "    test: k,\n" + "    uniqueoid: l\n}", form.toString());
    }

    @Test
    public void toStringEmpty() {
        assertEquals("{\n" + "    accepturl: <empty>,\n"
                + "    amount: <empty>,\n" + "    callbackurl: <empty>,\n"
                + "    cancelurl: <empty>,\n" + "    currency: SEK,\n"
                + "    decorator: responsive,\n" + "    ip: <empty>,\n"
                + "    lang: sv,\n" + "    merchant: <empty>,\n"
                + "    orderid: <empty>,\n" + "    test: 1,\n"
                + "    uniqueoid: yes\n" + "}", form.toString());
    }

    @Test
    public void url() throws UnsupportedEncodingException {
        form.fill(names, values);
        assertEquals("accepturl=a&amount=b&"
                + "callbackurl=c&cancelurl=d&currency=e&decorator=f&ip=g&"
                + "lang=h&merchant=i&orderid=j&test=k&uniqueoid=l",
                form.urlParameters());
    }

    private Map<String, String> filledMap() {
        Map<String, String> map = new LinkedHashMap<String, String>();
        for (int i = 0; i < names.length; ++i) {
            map.put(names[i], values[i]);
        }
        return map;
    }

}

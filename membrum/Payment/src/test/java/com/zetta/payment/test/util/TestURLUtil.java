package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.URLUtil;

public class TestURLUtil {

    @Test
    public void decodeParameters() {
        assertEquals(
                CollectionUtil.newMap("name", "ferret", "colour", "purple"),
                URLUtil.decodeParameters("name=ferret&colour=purple"));
    }

    @Test
    public void getParameters() {
        assertEquals(
                CollectionUtil.newMap("name", "ferret", "colour", "purple"),
                URLUtil.getParameters(
                        "http://example.com/path/to/page?name=ferret&colour=purple"));
    }
}

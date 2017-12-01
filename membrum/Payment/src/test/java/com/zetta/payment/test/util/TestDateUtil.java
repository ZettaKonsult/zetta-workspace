package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.zetta.payment.util.DateUtil;

/**
 * @date 2017-12-01
 */
public class TestDateUtil {

    @Test
    public void same() {
        assertEquals(0, DateUtil.compare("2017-12-01T12:47:48.440Z",
                "2017-12-01T12:47:48.440Z"));
    }

    @Test
    public void lesser() {
        assertEquals(-1, DateUtil.compare("2016-12-01T12:47:48.440Z",
                "2017-12-01T12:47:48.440Z"));
    }

    @Test
    public void greater() {
        assertEquals(1, DateUtil.compare("2018-12-01T12:47:48.440Z",
                "2017-12-01T12:47:48.440Z"));
    }
}

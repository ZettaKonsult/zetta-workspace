package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.FormData;

/**
 * Tests FormData POJO.
 * 
 * @date 2017-11-17
 */
public class TestFormData {
    private FormData data;

    @Before
    public void setUp() {
        this.data = new FormData();
    }

    @Test
    public void emptyPayment() {
        assertEquals("", data.getUserId());
    }

    @Test
    public void id() {
        data.setUserId("ID");
        assertEquals("ID", data.getUserId());
    }

    @Test
    public void emptyString() {
        assertEquals("User ID: <undefined>", data.toString());
    }

    @Test
    public void string() {
        data.setUserId("ID");
        assertEquals("User ID: ID", data.toString());
    }
}

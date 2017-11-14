package com.zetta.payment.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.zetta.payment.pojo.FormData;

/**
 * Tests POJO objects.
 * 
 * @date 2017-11-14
 */
public class TestPOJO {

    @Test
    public void testFormData() {
        FormData data = new FormData();
        assertEquals("", data.getID());
        data.setID("Test");
        assertEquals("Test", data.getID());
    }
}

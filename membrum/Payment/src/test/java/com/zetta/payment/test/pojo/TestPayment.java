package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.Payment;

/**
 * Tests Payment POJO.
 * 
 * @date 2017-11-17
 */
public class TestPayment {
    private Payment payment;

    @Before
    public void setUp() {
        this.payment = new Payment();
    }

    @Test
    public void emptyPayment() {
        assertEquals("", payment.getId());
    }

    @Test
    public void id() {
        payment.setId("ID");
        assertEquals("ID", payment.getId());
    }

    @Test
    public void emptyString() {
        assertEquals("Payment ID: <undefined>", payment.toString());
    }

    @Test
    public void string() {
        payment.setId("ID");
        assertEquals("Payment ID: ID", payment.toString());
    }
}

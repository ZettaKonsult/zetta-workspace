package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.Payment;

public class TestPayment {
    private Payment payment;

    @Before
    public void setUp() {
        payment = new Payment("orderId", 123);
    }

    @Test
    public void equalsOnlyIdSame() {
        Payment other = new Payment("anotherOrder", 456);
        other.setPaymentId(payment.getPaymentId());

        assertTrue(payment.equals(other));
    }

    @Test
    public void equalsAllSameButId() {
        Payment other = new Payment(payment.getPaymentId(),
                payment.getAmount());
        other.setCreated(payment.getCreated());

        assertFalse(payment.equals(other));
    }
}

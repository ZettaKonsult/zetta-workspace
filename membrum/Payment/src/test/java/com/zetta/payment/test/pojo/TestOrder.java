package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.Order;

/**
 * Tests Order POJO.
 * 
 * @date 2017-11-17
 */
public class TestOrder {
    private Order order;

    @Before
    public void setUp() {
        this.order = new Order();
    }

    @Test
    public void emptyOrder() {
        assertEquals("", order.getOrderId());
    }

    @Test
    public void id() {
        order.setOrderId("ID");
        assertEquals("ID", order.getOrderId());
    }

    @Test
    public void emptyString() {
        assertEquals("Order id: \n" + "User id: \n" + "Amount: 0.0\n"
                + "Is paid: no.", order.toString());
    }

    @Test
    public void string() {
        order.setOrderId("ID");
        assertEquals("Order id: ID\n" + "User id: \n" + "Amount: 0.0\n"
                + "Is paid: no.", order.toString());
    }
}

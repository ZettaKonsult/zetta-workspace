package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

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
        assertEquals("", order.getUserId());
        assertEquals(0, order.getAmount());
        assertEquals(false, order.getIsPaid());
    }

    @Test
    public void orderId() {
        order.setOrderId("ID");
        assertEquals("ID", order.getOrderId());
    }

    @Test
    public void userId() {
        order.setUserId("ID");
        assertEquals("ID", order.getUserId());
    }

    @Test
    public void amount() {
        order.setAmount(10);
        assertEquals(10, order.getAmount());
    }

    @Test
    public void isPaid() {
        order.setIsPaid(true);
        assertTrue(order.getIsPaid());
    }

    @Test
    public void emptyString() {
        assertEquals(
                "Order id: \n" + "User id: \n" + "Amount: 0\n" + "Is paid: no.",
                order.toString());
    }

    @Test
    public void string() {
        order.setOrderId("ID");
        order.setAmount(10);
        order.setIsPaid(true);
        order.setUserId("USER");
        assertEquals("Order id: ID\n" + "User id: USER\n" + "Amount: 10\n"
                + "Is paid: yes.", order.toString());
    }
}

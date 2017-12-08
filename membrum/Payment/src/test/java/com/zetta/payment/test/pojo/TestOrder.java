package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.membrum.Order;

public class TestOrder {
    Order order;

    @Before
    public void setUp() {
        order = new Order("userId", 123);
        order.setOrderId("orderId");
        order.setValidUntil("2017-12-31T25:59:59.999Z");
        order.setCreated("2017-12-06T10:49:18.236Z");
    }

    @Test
    public void string() {
        assertEquals(
                "Order orderId:\n" + "User id:     userId\n"
                        + "Created:     2017-12-06T10:49:18.236Z\n"
                        + "Amount:      123\n"
                        + "Valid until: 2017-12-31T25:59:59.999Z",
                order.toString());
    }

    @Test
    public void equalsOnlyIdSame() {
        Order other = new Order("anotherUser", 456);
        other.setValidUntil("2018-12-31T25:59:59.999Z");
        other.setOrderId(order.getOrderId());

        assertTrue(order.equals(other));
    }

    @Test
    public void equalsAllSameButId() {
        Order other = new Order(order.getUserId(), order.getAmount());
        other.setCreated(order.getCreated());
        other.setValidUntil(order.getValidUntil());

        assertFalse(order.equals(other));
    }

}

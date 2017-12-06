package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;

public class TestOrder {
    Order order;

    @Before
    public void setUp() {
        Plan plan = new Plan("planId", 123);
        User user = new User("userId", "userName", "userEmail", createPoints());
        order = new Order(user, plan);
        order.setOrderId("orderId");
        order.setCreated("2017-12-06T10:49:18.236Z");
    }

    @Test
    public void string() {
        assertEquals("Order id: orderId\n" + "Plan id: planId\n"
                + "User id: userId\n" + "Created: 2017-12-06T10:49:18.236Z\n"
                + "Amount: 123\n" + "Is paid: no.", order.toString());
    }

    @Test
    public void compareOnlyIdSame() {
        Order other = new Order(
                new User("aUser", "aName", "anEmail", createPoints()),
                new Plan("otherPlan", 123));
        other.setOrderId(order.getOrderId());

        assertTrue(order.equals(other));
    }

    @Test
    public void compareAllSameButId() {
        Order other = new Order(
                new User("userId", "userName", "userEmail", createPoints()),
                new Plan("planId", 123));

        assertFalse(order.equals(other));
    }

    private Map<String, Double> createPoints() {
        Map<String, Double> points = new LinkedHashMap<String, Double>();
        points.put("ABC", 123.0);
        points.put("EFG", 456.0);
        points.put("HIJ", 789.0);
        return points;
    }
}

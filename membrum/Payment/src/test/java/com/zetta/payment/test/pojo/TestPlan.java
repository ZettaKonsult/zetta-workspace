package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.Plan;

/**
 * Tests Plan POJO.
 * 
 * @date 2017-11-17
 */
public class TestPlan {
    private Plan plan;

    @Before
    public void setUp() {
        this.plan = new Plan();
    }

    @Test
    public void emptyOrder() {
        assertEquals("", plan.getPlanId());
        assertEquals(0.0, plan.getAmount(), 0.0);
    }

    @Test
    public void planId() {
        plan.setPlanId("ID");
        assertEquals("ID", plan.getPlanId());
    }

    @Test
    public void amount() {
        plan.setAmount(10);
        assertEquals(10, plan.getAmount());
    }

    @Test
    public void emptyString() {
        assertEquals("Plan id: \nAmount: 0", plan.toString());
    }

    @Test
    public void string() {
        plan.setPlanId("ID");
        plan.setAmount(10);
        assertEquals("Plan id: ID\nAmount: 10", plan.toString());
    }
}

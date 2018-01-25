package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.pojo.User;

/**
 * Tests User POJO.
 * 
 * @date 2017-11-17
 */
public class TestUser {
    private User user;

    @Before
    public void setUp() {
        this.user = new User();
    }

    @Test
    public void points() {
        Map<String, Double> points = pointsMap();
        user.setCredits(points);
        assertEquals(pointsMap(), user.getCredits());
    }

    @Test
    public void pointsIndividual() {
        Map<String, Double> points = pointsMap();
        user.setCredits(points);
        assertEquals(123.0, user.getCredits("ABC"), 0.0);
        assertEquals(12.3, user.getCredits("EFG"), 0.0);
        assertEquals(1.23, user.getCredits("HIJ"), 0.0);
    }

    private Map<String, Double> pointsMap() {
        Map<String, Double> points = new LinkedHashMap<String, Double>();
        points.put("ABC", 123.0);
        points.put("EFG", 12.3);
        points.put("HIJ", 1.23);
        return points;
    }
}

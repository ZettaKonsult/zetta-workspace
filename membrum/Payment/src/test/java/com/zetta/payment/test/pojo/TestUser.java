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
        user.setPoints(points);
        assertEquals(pointsMap(), user.getPoints());
    }

    @Test
    public void pointsIndividual() {
        Map<String, Double> points = pointsMap();
        user.setPoints(points);
        assertEquals(123.0, user.getPoints("ABC"), 0.0);
        assertEquals(12.3, user.getPoints("EFG"), 0.0);
        assertEquals(1.23, user.getPoints("HIJ"), 0.0);
    }

    private Map<String, Double> pointsMap() {
        Map<String, Double> points = new LinkedHashMap<String, Double>();
        points.put("ABC", 123.0);
        points.put("EFG", 12.3);
        points.put("HIJ", 1.23);
        return points;
    }
}

package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import java.util.Collections;
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
    public void emptyUser() {
        assertEquals("", user.getId());
        assertEquals("", user.getName());
        assertEquals("", user.getEmail());
        assertEquals(Collections.<String, Double>emptyMap(), user.getPoints());
    }

    @Test
    public void id() {
        user.setId("ID");
        assertEquals("ID", user.getId());
    }

    @Test
    public void name() {
        user.setName("Name");
        assertEquals("Name", user.getName());
    }

    @Test
    public void email() {
        user.setEmail("e-mail");
        assertEquals("e-mail", user.getEmail());
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

    @Test
    public void emptyString() {
        assertEquals("Payment:\n" + "    Id:     \n" + "    Name:   \n"
                + "    Email:  \n" + "    Points: {}", user.toString());
    }

    @Test
    public void string() {
        user.setId("ID");
        user.setName("Name");
        user.setEmail("e-mail");
        user.setPoints(pointsMap());
        assertEquals("Payment:\n" + "    Id:     ID\n" + "    Name:   Name\n"
                + "    Email:  e-mail\n" + "    Points: {\n"
                + "        ABC = 123.0,\n" + "        EFG = 12.3,\n"
                + "        HIJ = 1.23\n" + "    }", user.toString());
    }

    private Map<String, Double> pointsMap() {
        Map<String, Double> points = new LinkedHashMap<String, Double>();
        points.put("ABC", 123.0);
        points.put("EFG", 12.3);
        points.put("HIJ", 1.23);
        return points;
    }
}

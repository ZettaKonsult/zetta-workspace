package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;

import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.JSONUtil;

public class TestJSONUtil {
    private static final Map<String, Object> MAP = Collections
            .unmodifiableMap(createTestMap());

    @Test
    public void toMap() {
        Order testOrder = new Order("orderId", "userId", 123, false,
                "dateStamp");
        assertEquals(MAP, JSONUtil.parseMap(testOrder, Order.class));
    }

    private static Map<String, Object> createTestMap() {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("orderId", "orderId");
        map.put("userId", "userId");
        map.put("amount", 123);
        map.put("isPaid", false);
        map.put("created", "dateStamp");
        return map;
    }
}

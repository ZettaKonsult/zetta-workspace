package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.zetta.payment.util.CollectionUtil;

public class TestCollectionUtil {
    private static final Map<String, Object> MAP = Collections
            .unmodifiableMap(createMap());

    @Test
    public void emptyMapString() {
        assertEquals("{}", CollectionUtil.mapString(new HashMap<>()));
    }

    @Test
    public void mapString() {
        assertEquals(
                "{\n" + "    bool = true,\n" + "    string = yay,\n"
                        + "    double = 123.4,\n" + "    int = 123\n" + "}",
                CollectionUtil.mapString(MAP));
    }

    @Test
    public void complementAddToEmpty() {
        Map<String, Object> map = createMap();
        Map<String, Object> empty = new HashMap<>();
        CollectionUtil.complement(empty, map);
        assertEquals(empty, map);
    }

    @Test
    public void complementAddNothing() {
        Map<String, Object> map = createMap();
        Map<String, Object> empty = new HashMap<>();
        CollectionUtil.complement(map, empty);

        assertEquals(0, empty.size());
        assertEquals(createMap(), map);
    }

    @Test
    public void complementSame() {
        Map<String, Object> map1 = createMap();
        Map<String, Object> map2 = createMap();
        CollectionUtil.complement(map1, map2);

        assertEquals(map1, createMap());
        assertEquals(map2, createMap());
    }

    @Test
    public void toStringEntries() {
        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put(123, 123.4);
        map.put("a string", true);

        Map<String, String> reference = new HashMap<String, String>();
        reference.put("123", "123.4");
        reference.put("a string", "true");

        assertEquals(reference, CollectionUtil.toStringEntries(map));
    }

    @Test
    public void toStringKeys() {
        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put(123, 123.4);
        map.put("a string", true);

        Map<String, Object> reference = new HashMap<String, Object>();
        reference.put("123", 123.4);
        reference.put("a string", true);

        assertEquals(reference, CollectionUtil.toStringKeys(map));
    }

    @Test
    public void toStringValues() {
        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put(123, 123.4);
        map.put("a string", true);

        Map<Object, String> reference = new HashMap<Object, String>();
        reference.put(123, "123.4");
        reference.put("a string", "true");

        assertEquals(reference, CollectionUtil.toStringValues(map));
    }

    @Test
    public void map() {
        assertEquals(createMap(), CollectionUtil.newMap("bool", true, "double",
                123.4, "int", 123, "string", "yay"));
    }

    private static Map<String, Object> createMap() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("bool", true);
        map.put("double", 123.4);
        map.put("int", 123);
        map.put("string", "yay");
        return map;
    }
}

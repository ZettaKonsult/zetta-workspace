package com.zetta.payment.util;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

public final class CollectionUtil {
    private CollectionUtil() {}

    public static String mapString(Map<?, ?> map) {
        StringBuilder string = new StringBuilder("{");

        String prefix = "\n";
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            string.append(prefix + "    " + entry.getKey() + " = "
                    + entry.getValue());
            prefix = ",\n";
        }

        return string.append((prefix.contains(",") ? "\n" : "") + "}")
                .toString();
    }

    public static void complement(JSON json, JSON... others) {
        for (JSON other : others) {
            json.complement(other);
        }
    }

    public static <K extends Comparable<K>, V> void complement(Map<K, V> map,
            Map<K, V> complement) {

        for (K key : complement.keySet()) {
            if (!map.containsKey(key)) {
                map.put(key, complement.get(key));
            }
        }
    }

    public static Map<String, String> toStringEntries(Map<?, ?> map) {
        return map.keySet().stream().collect(Collectors
                .toMap(key -> key.toString(), key -> map.get(key).toString()));
    }

    public static Map<String, Object> toStringKeys(Map<?, ?> map) {
        Map<String, Object> newMap = new LinkedHashMap<>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            newMap.put(entry.getKey().toString(), entry.getValue());
        }
        return newMap;
    }

    public static Map<Object, String> toStringValues(Map<?, ?> map) {
        Map<Object, String> newMap = new LinkedHashMap<>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            newMap.put(entry.getKey(), StringUtil.ofNullable(entry.getValue()));
        }
        return newMap;
    }

    public static Map<String, Object> newMap(Object... objects) {
        if (objects.length % 2 != 0) {
            throw new IllegalArgumentException(
                    "Can not build map without an equal number of "
                            + "keys and values: " + objects.length
                            + " elements.");
        }

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        for (int i = 0; i < objects.length; i += 2) {
            map.put(objects[i].toString(), objects[i + 1]);
        }
        return map;
    }

    public static Map<?, ?> removeNull(Map<?, ?> map) {
        return map.entrySet().stream().filter(entry -> entry.getValue() != null)
                .collect(Collectors.toMap(entry -> entry.getKey(),
                        entry -> entry.getValue()));
    }

}

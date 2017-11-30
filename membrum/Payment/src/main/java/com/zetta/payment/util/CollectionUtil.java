package com.zetta.payment.util;

import java.util.LinkedHashMap;
import java.util.Map;

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

    public static <K extends Comparable<K>, V> void complement(Map<K, V> map,
            Map<K, V> complement) {

        for (K key : complement.keySet()) {
            if (!map.containsKey(key)) {
                map.put(key, complement.get(key));
            }
        }
    }

    public static Map<String, String> toStringEntries(Map<?, ?> map) {
        Map<String, String> newMap = new LinkedHashMap<String, String>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            newMap.put(entry.getKey().toString(), entry.getValue().toString());
        }
        return newMap;
    }

    public static Map<String, Object> toStringKeys(Map<?, ?> map) {
        Map<String, Object> newMap = new LinkedHashMap<String, Object>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            newMap.put(entry.getKey().toString(), entry.getValue());
        }
        return newMap;
    }

}

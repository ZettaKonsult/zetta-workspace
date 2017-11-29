package com.zetta.payment.util;

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
}

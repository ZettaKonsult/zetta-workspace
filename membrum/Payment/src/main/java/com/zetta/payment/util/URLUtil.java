package com.zetta.payment.util;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class URLUtil {

    private URLUtil() {}

    public static Map<String, String> getParameters(String url) {
        String[] parts = url.split("\\?");
        if (parts.length == 0) {
            return Collections.emptyMap();
        }
        return decodeParameters(parts[1]);
    }

    public static Map<String, String> decodeParameters(String url) {
        Map<String, String> map = new LinkedHashMap<String, String>();
        String[] parts = url.split("&");

        for (String part : parts) {
            String[] pair = part.split("=");
            map.put(pair[0], pair[1]);
        }

        return map;
    }
}

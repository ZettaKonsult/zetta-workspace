package com.zetta.payment.util;

public final class StringUtil {

    private StringUtil() {}

    public static String ofNullable(Object object) {
        return object == null ? "null" : object.toString();
    }

    public static String ofNullable(String string) {
        return string == null ? "null" : string;
    }
}

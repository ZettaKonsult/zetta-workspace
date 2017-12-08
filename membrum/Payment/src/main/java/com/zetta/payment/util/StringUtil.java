package com.zetta.payment.util;

/**
 * @date 2017-11-18
 */
public final class StringUtil {

    private StringUtil() {}

    public static String ofNullable(Object object) {
        return object == null ? "null" : object.toString();
    }

    public static String ofNullable(String string) {
        return string == null ? "null" : string;
    }

    public static boolean isUnset(String userId) {
        return userId == null || userId.equals("");
    }
}

package com.zetta.payment.test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TestUtil {
    private static final Pattern orderIdPattern = Pattern
            .compile("orderid=(.*)&");

    public static String withoutOrderId(String string) {
        return replace(orderIdPattern, string);
    }

    private static final String replace(Pattern pattern, String string) {
        String toReplace = "";
        Matcher match = pattern.matcher(string);
        if (match.find()) {
            toReplace = match.group(1);
        }
        return string.replace(toReplace, "");
    }

}

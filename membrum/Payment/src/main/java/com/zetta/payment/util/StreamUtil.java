package com.zetta.payment.util;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

/**
 * @date 2018-02-12
 */
public final class StreamUtil {

    private StreamUtil() {}

    public static String asString(InputStream in) {
        return asString(in, StandardCharsets.UTF_8);
    }

    public static String asString(InputStream in, Charset charSet) {
        Scanner scanner = new Scanner(in, charSet.name());
        String result = scanner.useDelimiter("\\A").next();
        scanner.close();
        return result;
    }
}

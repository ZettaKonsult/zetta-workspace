package com.zetta.payment.util;

import org.joda.time.Instant;

/**
 * @date 2017-11-29
 */
public class DateUtil {

    private DateUtil() {}

    public static String now() {
        return Instant.now().toString();
    }

    public static int compare(String date1, String date2) {
        return Instant.parse(date1).compareTo(Instant.parse(date2));
    }

    public static boolean isBetween(long time, long start, long end) {
        long earlier = Math.min(start, end);
        long later = Math.max(start, end);

        return time > earlier && later > time;
    }

    public static long epoch() {
        return Instant.now().getMillis();
    }

}

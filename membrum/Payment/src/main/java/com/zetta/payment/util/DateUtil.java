package com.zetta.payment.util;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * @date 2017-11-29
 */
public class DateUtil {

    private DateUtil() {}

    public static String now() {
        return OffsetDateTime.now()
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

    public static int compare(String date1, String date2) {
        return new Date(date1).compareTo(new Date(date2));
    }

}

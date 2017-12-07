package com.zetta.payment.util;

public final class ArrayUtil {

    public static <T> int assertSameLength(T[] reference, T[] actual) {
        int referenceLength = reference.length;
        int actualLength = actual.length;

        if (referenceLength == actualLength) {
            return referenceLength;
        }
        throw new IllegalArgumentException(
                "Expected arrays to have the same length, they had "
                        + referenceLength + " and " + actualLength
                        + " respectively.");
    }
}

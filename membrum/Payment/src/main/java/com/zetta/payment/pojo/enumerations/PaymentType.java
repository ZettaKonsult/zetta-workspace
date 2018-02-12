package com.zetta.payment.pojo.enumerations;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum PaymentType {
    CARD, INVOICE;

    private static final Map<String, PaymentType> stringToEnum = Arrays
            .asList(values()).stream()
            .collect(Collectors.toMap(value -> value.name(), value -> value));

    public static PaymentType get(String name) {
        return stringToEnum.get(name);
    }
}

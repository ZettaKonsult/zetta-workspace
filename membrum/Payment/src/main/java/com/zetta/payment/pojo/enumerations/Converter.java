package com.zetta.payment.pojo.enumerations;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.zetta.payment.pojo.Transferred;
import com.zetta.payment.util.JSON;

public abstract class Converter<T> implements DynamoDBTypeConverter<String, T> {

    private Class<T> type;

    private Converter(Class<T> type) {
        this.type = type;
    }

    @Override
    public String convert(T object) {
        return new JSON(object).prettyPrint();
    }

    @Override
    public T unconvert(String string) {
        return new JSON(string).convertTo(type);
    }

    @SuppressWarnings("rawtypes")
    public static class PaymentStatusConverter extends Converter<List> {

        public PaymentStatusConverter() {
            super(List.class);
        }

    }

    public static class PaymentTypeConverter extends Converter<PaymentType> {
        public PaymentTypeConverter() {
            super(PaymentType.class);
        }
    }

    public static class TransferredConverter extends Converter<Transferred> {
        public TransferredConverter() {
            super(Transferred.class);
        }
    }
}

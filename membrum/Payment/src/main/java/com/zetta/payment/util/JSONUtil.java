package com.zetta.payment.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class JSONUtil {

    private JSONUtil() {}

    /*
     * As map.
     */

    public static Map<String, Object> asMap(InputStream is) throws IOException {

        return CollectionUtil.toStringKeys(asObject(is, Map.class));
    }

    public static <T> Map<String, Object> asMap(T object, Class<T> classType) {

        return CollectionUtil.toStringKeys(
                new ObjectMapper().convertValue(object, Map.class));
    }

    public static Map<String, Object> asMap(InvokeResult result)
            throws IOException {

        return CollectionUtil.toStringKeys(
                asMap(new ByteArrayInputStream(result.getPayload().array())));
    }

    /*
     * As instance.
     */

    public static <T> T asObject(Map<?, ?> map, Class<T> classType)
            throws IOException {

        return asObject(prettyPrint(map), classType);
    }

    public static <T> T asObject(String string, Class<T> classType)
            throws IOException {

        return asObject(new ByteArrayInputStream(string.getBytes()), classType);
    }

    public static <T> T asObject(InputStream input, Class<T> classType)
            throws IOException {

        return new ObjectMapper().readValue(input, classType);
    }

    /*
     * Pretty print.
     */

    public static String prettyPrint(Map<?, ?> json) throws IOException {

        return prettyPrint(json, Map.class);
    }

    public static <T> String prettyPrint(T object, Class<T> classType)
            throws IOException {

        return new ObjectMapper().writerWithDefaultPrettyPrinter()
                .writeValueAsString(object);
    }

}

package com.zetta.payment.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class JSONUtil {

    private JSONUtil() {}

    public static Map<String, Object> parseMap(InputStream is)
            throws IOException {

        return CollectionUtil.toStringKeys(parse(is, Map.class));
    }

    public static <T> T parse(InputStream input, Class<T> classType)
            throws IOException {

        return new ObjectMapper().readValue(input, classType);
    }

    public static String prettyPrint(Map<?, ?> json)
            throws JsonProcessingException {

        return toString(json, Map.class);
    }

    public static Map<String, Object> parse(InvokeResult result)
            throws IOException {

        return CollectionUtil.toStringKeys(
                parse(new ByteArrayInputStream(result.getPayload().array()),
                        Map.class));
    }

    public static <T> T parseMap(Map<?, ?> map, Class<T> classType)
            throws IOException {

        return new ObjectMapper().readValue(prettyPrint(map), classType);
    }

    public static <T> String toString(T object, Class<T> classType)
            throws JsonProcessingException {

        return new ObjectMapper().writerWithDefaultPrettyPrinter()
                .writeValueAsString(object);
    }

    public static <T> T parse(String string, Class<T> classType)
            throws IOException {

        return parse(new ByteArrayInputStream(string.getBytes()), classType);
    }

    public static <T> Map<String, Object> parseMap(T object,
            Class<T> classType) {

        return CollectionUtil.toStringKeys(
                new ObjectMapper().convertValue(object, Map.class));
    }

    public static Map<String, Object> atKey(String newKey, Object value) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(newKey, value);
        return map;
    }

}

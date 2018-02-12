package com.zetta.payment.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zetta.payment.exception.JSONFormat;

/**
 * @date 2017-12-06
 */
public class JSON {
    private static final JSON empty = new JSON();
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private Map<String, Object> map;

    public JSON() {
        this(Collections.emptyMap());
    }

    public JSON(InvokeResult result) {
        this(new ByteArrayInputStream(result.getPayload().array()));
    }

    public JSON(Object[] names, Object[] values) {
        this(IntStream.range(0, ArrayUtil.assertSameLength(names, values))
                .boxed().collect(Collectors.toMap(i -> names[i].toString(),
                        i -> values[i])));
    }

    public JSON(List<?> list) {
        this(CollectionUtil.asMap(list));
    }

    public JSON(Map<?, ?> map) {
        this.map = CollectionUtil.removeNull(map).entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().toString(),
                        entry -> entry.getValue()));
    }

    public JSON(InputStream inStream) {
        this(fromInstream(inStream));
    }

    @SuppressWarnings("unchecked")
    private static Map<?, ?> fromInstream(InputStream inStream) {

        String string = StreamUtil.asString(inStream);
        try {
            if (string.startsWith("[")) {
                return CollectionUtil
                        .asMap(MAPPER.readValue(string, List.class));
            }
            return MAPPER.readValue(string, Map.class);
        } catch (IOException error) {
            throw new JSONFormat(error);
        }
    }

    @SuppressWarnings("unchecked")
    public <T> JSON(T object) {
        this(ClassUtil.isSubClass(object.getClass(), List.class)
                ? CollectionUtil.asMap(MAPPER.convertValue(object, List.class))
                : MAPPER.convertValue(object, Map.class));
    }

    public JSON(String string) {
        this(new ByteArrayInputStream(string.getBytes()));
    }

    public List<String> keys() {
        return new ArrayList<String>(map.keySet());
    }

    public boolean has(String key) {
        return map.containsKey(key);
    }

    public Object get(String key) {
        if (!has(key)) {
            return null;
        }
        return map.get(key);
    }

    @Override
    public String toString() {
        return prettyPrint();
    }

    public <T> String prettyPrint() throws JSONFormat {

        try {
            return MAPPER.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(map);
        } catch (JsonProcessingException error) {
            throw new JSONFormat(error);
        }
    }

    public void complement(JSON other) {
        CollectionUtil.complement(map, other.map);
    }

    public <T> T convertTo(Class<T> classType) {
        try {
            return MAPPER.readValue(
                    new ByteArrayInputStream(prettyPrint().getBytes()),
                    classType);
        } catch (IOException error) {
            throw new JSONFormat(error);
        }
    }

    public static String prettyPrint(Object output) {

        try {
            return MAPPER.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(output);
        } catch (IOException error) {
            throw new JSONFormat(error);
        }
    }

    public void set(String key, Object value) {
        map.put(key, value);
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if (!(other instanceof JSON)) {
            return false;
        }
        return map.equals(((JSON) other).map);
    }

    public int size() {
        return map.size();
    }

    public static JSON empty() {
        return empty;
    }

    public void delete(String key) {
        remove(key);
    }

    public Object remove(String key) {
        return map.remove(key);
    }

    public void move(String srcKey, String destKey) {
        set(destKey, remove(srcKey));
    }

    public static <T> T convertTo(Object object, Class<T> type) {
        return new JSON(object).convertTo(type);
    }

}

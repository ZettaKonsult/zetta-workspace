package com.zetta.payment.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class JSONUtil {

    private JSONUtil() {}

    public static Map<?, ?> parse(InputStream input) throws IOException {

        return new ObjectMapper().readValue(input, Map.class);
    }

    public static String prettyPrint(Map<?, ?> json)
            throws JsonProcessingException {

        return new ObjectMapper().writerWithDefaultPrettyPrinter()
                .writeValueAsString(json);
    }

    public static Map<?, ?> parse(InvokeResult result) throws IOException {

        return parse(new ByteArrayInputStream(result.getPayload().array()));
    }

    public static <T> T parse(Map<?, ?> map, Class<T> classType)
            throws IOException {

        return new ObjectMapper().readValue(prettyPrint(map), classType);
    }
}

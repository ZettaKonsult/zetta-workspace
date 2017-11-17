package com.zetta.payment.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class JSONUtil {

    private JSONUtil() {}

    public static Map<?, ?> parse(InputStream input)
            throws JsonParseException, JsonMappingException, IOException {

        return new ObjectMapper().readValue(input, Map.class);
    }

    public static String prettyPrint(Map<?, ?> json, String string)
            throws JsonProcessingException {

        return new ObjectMapper().writerWithDefaultPrettyPrinter()
                .writeValueAsString(json);
    }
}

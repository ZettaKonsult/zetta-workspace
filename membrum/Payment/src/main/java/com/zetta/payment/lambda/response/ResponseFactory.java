package com.zetta.payment.lambda.response;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class ResponseFactory {

    private ResponseFactory() {}

    private static final Map<String, String> HEADERS = Collections
            .unmodifiableMap(buildHeaders());
    private static final Response UNKNOWN_ERROR = error("Unknown error.");

    public static Response empty() {
        return new Response(0, HEADERS);
    }

    public static Response unknownError() {
        return UNKNOWN_ERROR;
    }

    public static Response error(Exception error) {
        return error(error.getMessage());
    }

    public static Response error(String message) {
        Response response = new Response(500, HEADERS);
        response.addError(message);
        return response;
    }

    public static Response success(String message) {
        return new Response(200, HEADERS).succeed(message);
    }

    public static Response success(String key, Object value) {
        return new Response(200, HEADERS).succeed(key, value);
    }

    private static Map<String, String> buildHeaders() {
        Map<String, String> headers = new LinkedHashMap<String, String>();
        headers.put("content-type", "*/*");
        return headers;
    }

}

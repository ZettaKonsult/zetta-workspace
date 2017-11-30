package com.zetta.payment.lambda.response;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zetta.payment.util.JSONUtil;

public class Response {
    private static final Map<String, String> HEADERS = Collections
            .unmodifiableMap(buildHeaders());

    private List<String> errors;
    private Map<String, Object> values;

    public static Response unknownError() {
        return new Response(500, HEADERS, "Unknown error.");
    }

    public static Response error(String message) {
        return new Response(500, HEADERS,
                JSONUtil.atKey("errorMessage", message));
    }

    public static Response success(String message) {
        return new Response(200, HEADERS, message);
    }

    public Response() {
        this(500, HEADERS, "");
    }

    public Response(Exception exception) {
        this(500, HEADERS, exception.getMessage());
    }

    public Response(int code, Map<String, String> headers, Object body) {
        this.errors = new ArrayList<String>();
        this.values = new LinkedHashMap<String, Object>();

        setStatus(code);
        values.put("headers", headers);
        setBody(body);
    }

    public Response(int code, Object body) {
        this(code, HEADERS, body);
    }

    public String asJSON() {
        String json = "";
        try {
            json = new ObjectMapper().writeValueAsString(this.values);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

    public void setBody(Object body) {
        values.put("body", body);
    }

    public void setStatus(int code) {
        values.put("statusCode", Integer.toString(code));
    }

    @Override
    public String toString() {
        return asJSON();
    }

    private static Map<String, String> buildHeaders() {
        Map<String, String> headers = new LinkedHashMap<String, String>();
        headers.put("content-type", "*/*");
        return headers;
    }

    protected String errorString() {
        StringBuilder string = new StringBuilder();
        String prefix = "";

        for (String errorMessage : errors) {
            string.append(prefix + errorMessage);
            prefix = "\n";
        }

        return string.toString();
    }

    public String addError(String message) {
        errors.add(message);
        return message;
    }

    public String errorJSON() {
        String errorString = errorString();

        Map<String, String> json = new LinkedHashMap<String, String>();
        json.put("errorMessage", errorString);

        String response = "";
        try {
            response = JSONUtil.prettyPrint(json);
        } catch (JsonProcessingException e) {
            response = "{\"errorMessage\": \"" + errorString + "\n"
                    + e.getMessage() + "\"}";
        }
        return response;
    }

    public void emit(OutputStream outStream) {
        if (!errors.isEmpty()) {
            setBody(JSONUtil.atKey("errorMessage", errorString()));
        }

        String response = toString();
        Logger.getLogger(Response.class)
                .info("Sending response:\n    " + response);

        try {
            outStream.write(response.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
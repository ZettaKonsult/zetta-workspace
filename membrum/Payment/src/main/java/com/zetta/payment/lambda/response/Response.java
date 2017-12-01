package com.zetta.payment.lambda.response;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zetta.payment.util.JSONUtil;

public final class Response {

    private List<String> errors;
    private Map<String, Object> values;

    public Response(int code, Map<String, String> headers, Object body) {
        this.errors = new ArrayList<String>();
        this.values = new LinkedHashMap<String, Object>();

        setStatus(code);
        values.put("headers", headers);
        setBody(body);
    }

    public String asJSON() {
        String json = "";
        try {
            json = new ObjectMapper().writeValueAsString(this.values);
        } catch (IOException error) {
            error.printStackTrace();
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
        } catch (IOException error) {
            response = "{\"errorMessage\": \"" + errorString + "\n"
                    + error.getMessage() + "\"}";
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
        } catch (IOException error) {
            error.printStackTrace();
        }
    }

}
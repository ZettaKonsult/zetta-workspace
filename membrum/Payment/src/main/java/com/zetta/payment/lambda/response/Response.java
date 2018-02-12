package com.zetta.payment.lambda.response;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.zetta.payment.util.JSON;

public final class Response {

    private List<String> errors;
    private Map<String, Object> values;
    private Map<Object, Object> body;

    public Response(int code, Map<String, String> headers) {
        this.errors = new ArrayList<String>();
        this.values = new LinkedHashMap<String, Object>();
        this.body = new LinkedHashMap<Object, Object>();

        setStatus(code);
        values.put("headers", headers);
        values.put("body", this.body);
    }

    public String asJSON() {
        Map<String, Object> printValues = new LinkedHashMap<String, Object>(
                this.values);

        String bodyKey = "body";
        Object value = null;

        switch (body.size()) {
            case 0:
                break;
            case 1:
                value = body.get(body.keySet().iterator().next());
                break;
            default:
                value = values.get(bodyKey);
        }

        printValues.put(bodyKey, value);
        return JSON.prettyPrint(printValues);
    }

    public void addBody(Object key, Object value) {
        body.put(key, value);
    }

    public void setStatus(int code) {
        values.put("statusCode", Integer.toString(code));
    }

    public String getStatus() {
        return values.get("statusCode").toString();
    }

    @Override
    public String toString() {
        return asJSON();
    }

    public String addError(String message) {
        errors.add(message);
        addBody("errorMessages", errors);
        return message;
    }

    public Response addErrors(Collection<String> messages) {
        for (String message : messages) {
            addError(message);
        }
        return this;
    }

    public Response succeed(String key, Object body) {
        addBody(key, body);
        setStatus(200);
        return this;
    }

    public Response succeed(String message) {
        return succeed("message", message);
    }

    public void emit(OutputStream outStream) {
        String response = asJSON();
        Logger.getLogger(Response.class).info("Sending response:\n" + response);

        try {
            outStream.write(response.getBytes());
        } catch (IOException error) {
            error.printStackTrace();
        }
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Response)) {
            return false;
        }
        Response otherResponse = (Response) other;
        return otherResponse.values.equals(this.values)
                && otherResponse.errors.equals(this.errors);
    }

}
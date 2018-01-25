package com.zetta.payment.lambda.response;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSON;

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
        return JSON.prettyPrint(this.values);
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

    public String addError(String message) {
        errors.add(message);
        setBody(CollectionUtil.newMap("errorMessages", errors));
        return message;
    }

    public Response addErrors(Collection<String> messages) {
        for (String message : messages) {
            addError(message);
        }
        return this;
    }

    public Response succeed(String message) {
        Response response = ResponseFactory.success(message);
        return response.addErrors(this.errors);
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
package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambdaAsync;
import com.amazonaws.services.lambda.AWSLambdaAsyncClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zetta.payment.util.JSONUtil;

public abstract class Lambda {
    private static final Map<String, String> HEADERS = Collections
            .unmodifiableMap(buildHeaders());

    protected final List<String> errors = new ArrayList<String>();

    protected Lambda() {}

    private static Map<String, String> buildHeaders() {
        Map<String, String> headers = new LinkedHashMap<String, String>();
        headers.put("content-type", "*/*");
        return headers;
    }

    protected void error(Logger log, String errorMessage) {
        log.error(errorMessage);
        errors.add(errorMessage);
    }

    protected String errorJSON(Logger log) {
        String errorString = errorString();

        Map<String, String> json = new LinkedHashMap<String, String>();
        json.put("error", errorString);

        String response = "";
        try {
            response = JSONUtil.prettyPrint(json);
        } catch (JsonProcessingException e) {
            response = "{\"error\": \"" + errorString + "\n" + e.getMessage()
                    + "\"}";
        }
        return response;
    }

    protected boolean hasErrors() {
        return !errors.isEmpty();
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

    protected static class Response {
        private Map<String, Object> values;

        public Response(int code, Map<String, String> headers, Object body) {
            this.values = new LinkedHashMap<String, Object>();

            setStatus(code);
            values.put("headers", headers);
            setBody(body);
        }

        public Response(int code, Object body) {
            this(code, HEADERS, body);
        }

        public String asJson() {
            String json = "";
            try {
                json = new ObjectMapper().writeValueAsString(this.values);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            return json;
        }

        public void setBody(Object body) {
            values.put("body", body.toString());
        }

        public void setStatus(int code) {
            values.put("statusCode", Integer.toString(code));
        }

        @Override
        public String toString() {
            return asJson();
        }
    }

    protected void respond(OutputStream outStream, Response response,
            Logger log) {

        Response responseToSend = (hasErrors() || response == null)
                ? new Response(500, HEADERS, errorJSON(log))
                : response;

        log.info("Sending response:\n    " + responseToSend.toString());
        try {
            outStream.write(responseToSend.asJson().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Map<?, ?> callLambda(String functionName) throws IOException {

        return callLambda(functionName, null);
    }

    public Map<?, ?> callLambda(String functionName, String payload)
            throws IOException {

        AWSLambdaAsync client = AWSLambdaAsyncClientBuilder.standard()
                .withRegion(Regions.EU_CENTRAL_1).build();

        InvokeRequest request = new InvokeRequest();
        request.withFunctionName(functionName).withPayload(payload);

        InvokeResult result = client.invoke(request);

        return JSONUtil.parse(result);
    }
}

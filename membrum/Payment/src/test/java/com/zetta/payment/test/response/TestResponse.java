package com.zetta.payment.test.response;

import static org.junit.Assert.assertEquals;

import java.io.ByteArrayOutputStream;
import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.util.CollectionUtil;

public class TestResponse {
    private Map<String, String> headers;
    private Response response;

    @Before
    public void setUp() {
        this.headers = new LinkedHashMap<String, String>();
        headers.put("content-type", "*/*");
        this.response = new Response(0, headers, null);
    }

    @Test
    public void addError() {
        response.addError("An error.");
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : {\r\n"
                + "    \"errorMessages\" : [ \"An error.\" ]\r\n" + "  }\r\n"
                + "}", response.asJSON());
    }

    @Test
    public void emptyJSON() {
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : null\r\n" + "}",
                response.asJSON());
    }

    @Test
    public void errorJSON() {
        response.addError("An error.");
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : {\r\n"
                + "    \"errorMessages\" : [ \"An error.\" ]\r\n" + "  }\r\n"
                + "}", response.asJSON());
    }

    @Test
    public void emptyEmit() {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        response.emit(outStream);
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : null\r\n" + "}",
                new String(outStream.toByteArray()));
    }

    @Test
    public void errorEmit() {
        response.addError("An error.");
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        response.emit(outStream);
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : {\r\n"
                + "    \"errorMessages\" : [ \"An error.\" ]\r\n" + "  }\r\n"
                + "}", new String(outStream.toByteArray()));
    }

    @Test
    public void bodyString() {
        response.setBody("A body.");
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : \"A body.\"\r\n" + "}",
                response.asJSON());
    }

    @Test
    public void bodyMap() {
        response.setBody(CollectionUtil.newMap("derp", 1, 20.0, true));
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : {\r\n" + "    \"derp\" : 1,\r\n"
                + "    \"20.0\" : true\r\n" + "  }\r\n" + "}",
                response.asJSON());
    }

    @Test
    public void nullBody() {
        response.setBody(null);
        assertEquals("{\r\n" + "  \"statusCode\" : \"0\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : null\r\n" + "}",
                response.asJSON());
    }

    @Test
    public void status() {
        response.setStatus(123);
        assertEquals("{\r\n" + "  \"statusCode\" : \"123\",\r\n"
                + "  \"headers\" : {\r\n" + "    \"content-type\" : \"*/*\"\r\n"
                + "  },\r\n" + "  \"body\" : null\r\n" + "}",
                response.asJSON());
    }
}

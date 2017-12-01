package com.zetta.payment.test.response;

import static org.junit.Assert.assertEquals;

import java.util.Map;

import org.junit.Test;

import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.util.CollectionUtil;

public class TestResponseFactory {

    @Test
    public void exceptionError() {
        String message = "An exception.";
        Response reference = new Response(500, headers(), null);
        reference.addError(message);
        assertEquals(reference, ResponseFactory.error(new Exception(message)));
    }

    @Test
    public void stringError() {
        String message = "An error message.";
        Response reference = new Response(500, headers(), null);
        reference.addError(message);
        assertEquals(reference, ResponseFactory.error(message));
    }

    @Test
    public void success() {
        assertEquals(new Response(200, headers(), "A successful response."),
                ResponseFactory.success("A successful response."));
    }

    @Test
    public void unknownError() {
        String message = "Unknown error.";
        Response reference = new Response(500, headers(), null);
        reference.addError(message);
        assertEquals(reference, ResponseFactory.unknownError());
    }

    private Map<String, String> headers() {
        return CollectionUtil
                .toStringEntries(CollectionUtil.newMap("content-type", "*/*"));
    }
}

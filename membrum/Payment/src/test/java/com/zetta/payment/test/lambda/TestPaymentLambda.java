package com.zetta.payment.test.lambda;

import static org.junit.Assert.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.lambda.PaymentLambda;
import com.zetta.payment.test.util.TestUtil;
import com.zetta.payment.util.FileUtil;

public class TestPaymentLambda {
    private static final File approvedFile = new File("src/test/java/com/zetta/payment/mocks/DIBSResponseApproved.txt");
    private PaymentLambda lambda;

    @Before
    public void setUp() {
        lambda = new PaymentLambda();
    }

    @Test
    public void parseError() {
        InputStream in = new ByteArrayInputStream("{\"A: \"B\"}".getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);
        assertEquals(
                "{\"statusCode\":\"500\",\"headers\":{\"content-type\":\"*/*\"},\"body\":\"Error parsing JSON object:\\nUnexpected character ('B' (code 66)): was expecting a colon to separate field name and value.\"}",
                new String(out.toByteArray()));
    }

    @Test
    public void wrongInput() {
        InputStream in = new ByteArrayInputStream("{\"A\": \"B\"}".getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);
        assertEquals(
                "{\"statusCode\":\"500\",\"headers\":{\"content-type\":\"*/*\"},\"body\":\"No \\\"body\\\" key in object.\"}",
                new String(out.toByteArray()));
    }

    @Test
    public void approvedNullContext() throws IOException {
        String response = FileUtil.fileAsString(approvedFile);
        InputStream in = new ByteArrayInputStream(response.getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);
        assertEquals(TestUtil.withoutOrderId(
                "{\"statusCode\":\"200\",\"headers\":{\"content-type\":\"*/*\"},\"body\":\"Transaction completed.\"}"),
                TestUtil.withoutOrderId(new String(out.toByteArray())));
    }
}

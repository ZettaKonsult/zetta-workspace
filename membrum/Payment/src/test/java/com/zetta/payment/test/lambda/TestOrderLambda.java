package com.zetta.payment.test.lambda;

import static org.junit.Assert.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com.zetta.payment.lambda.OrderLambda;
import com.zetta.payment.test.util.TestUtil;
import com.zetta.payment.util.FileUtil;

public class TestOrderLambda {
    private static final File TEST_DIR = new File(
            "src/test/java/com/zetta/payment/mocks/");
    private static final File approvedFile = new File(TEST_DIR,
            "DIBSResponseApproved.txt");
    private static final File noStatusCodeFile = new File(TEST_DIR,
            "ResponseNoStatusCode.txt");
    private OrderLambda lambda;

    @Before
    public void setUp() {
        lambda = new OrderLambda();
    }

    @Test
    public void parseError() {
        InputStream in = new ByteArrayInputStream("{\"A: \"B\"}".getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);

        assertEquals(
                "{\"statusCode\":\"500\",\"headers\":{\"content-type\":\"*/*"
                        + "\"},\"body\":\"{  \\\"error\\\" : \\\"Error parsing"
                        + " JSON object:\\Unexpected character ('B' "
                        + "(code 66)): was expecting a colon to separate field"
                        + " name and value.\\\"}\"}",
                new String(out.toByteArray()).replaceAll("\\\\r|\\\\n", ""));
    }

    @Test
    public void wrongInput() {

        InputStream in = new ByteArrayInputStream(
                "{\"key\": \"value\"}".getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);
        assertEquals(
                "{\"statusCode\":\"500\",\"headers\":{\"content-type\":\"*/*"
                        + "\"},\"body\":\"{  \\\"error\\\" : \\\"No \\\\\\"
                        + "\"body\\\\\\\" key in object.\\\"}\"}",
                new String(out.toByteArray()).replaceAll("\\\\r|\\\\n", ""));
    }

    @Ignore("Relies on database state.")
    public void noStatusCode() throws IOException {
        String response = FileUtil.fileAsString(noStatusCodeFile);
        InputStream in = new ByteArrayInputStream(response.getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);
        assertEquals(TestUtil.withoutOrderId(
                "{\"statusCode\":\"500\",\"headers\":{\"content-type\":\"*/*"
                        + "\"},\"body\":\"Erroneous callback format, no "
                        + "'statuscode' parameter.\"}"),
                TestUtil.withoutOrderId(new String(out.toByteArray())));

    }

    @Ignore("Relies on database state.")
    public void approvedNullContext() throws IOException {
        String response = FileUtil.fileAsString(approvedFile);
        InputStream in = new ByteArrayInputStream(response.getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        lambda.dibsConfirmation(in, out, null);
        assertEquals(TestUtil.withoutOrderId(
                "{\"statusCode\":\"200\",\"headers\":{\"content-type\":\"*/*"
                        + "\"},\"body\":\"Transaction completed.\"}"),
                TestUtil.withoutOrderId(new String(out.toByteArray())));
    }
}

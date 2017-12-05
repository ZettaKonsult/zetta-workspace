package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;

import com.amazonaws.services.lambda.model.InvokeResult;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.FileUtil;
import com.zetta.payment.util.JSONUtil;

public class TestJSONUtil {
    private static final String JSON = "{\"key1\": \"value1\","
            + "\"key2\": \"value2\"}";

    private static final Map<String, ?> referenceMap = CollectionUtil
            .newMap("key1", "value1", "key2", "value2");

    @Test
    public void asMapStream() throws IOException {
        assertEquals(referenceMap,
                JSONUtil.asMap(new ByteArrayInputStream(JSON.getBytes())));
    }

    @Test
    public void asMapObject() {
        final TestPojo pojo = new TestPojo();
        assertEquals(referenceMap, JSONUtil.asMap(pojo, TestPojo.class));
    }

    @Test
    public void asMapInvokeResult() throws IOException {
        byte[] bytes = JSON.getBytes();
        ByteBuffer buffer = ByteBuffer.allocate(bytes.length);
        buffer.put(bytes);

        InvokeResult result = new InvokeResult();
        result.setPayload(buffer);

        assertEquals(referenceMap, JSONUtil.asMap(result));
    }

    private static final class TestPojo {
        private String key1;
        private String key2;

        private TestPojo() {
            this.key1 = "value1";
            this.key2 = "value2";
        }

        public String getKey1() {
            return key1;
        }

        public String getKey2() {
            return key2;
        }
    }

    @Test
    public void objectFromStream() throws IOException {
        TestPojo pojo = JSONUtil.asObject(
                new ByteArrayInputStream(JSON.getBytes()), TestPojo.class);

        assertEquals(pojo.getKey1(), "value1");
        assertEquals(pojo.getKey2(), "value2");
    }

    @Test
    public void objectFromMap() throws IOException {
        TestPojo pojo = JSONUtil.asObject(referenceMap, TestPojo.class);

        assertEquals(pojo.getKey1(), "value1");
        assertEquals(pojo.getKey2(), "value2");
    }

    @Test
    public void objectFromString() throws IOException {
        TestPojo pojo = JSONUtil.asObject(JSON, TestPojo.class);

        assertEquals(pojo.getKey1(), "value1");
        assertEquals(pojo.getKey2(), "value2");
    }

    @Test
    public void prettyPrintMap() throws IOException {
        assertEquals(
                "{\r\n" + "  \"key1\" : \"value1\",\r\n"
                        + "  \"key2\" : \"value2\"\r\n" + "}",
                JSONUtil.prettyPrint(referenceMap));
    }

    @Test
    public void prettyPrintObject() throws IOException {
        assertEquals(
                "{\r\n" + "  \"key1\" : \"value1\",\r\n"
                        + "  \"key2\" : \"value2\"\r\n" + "}",
                JSONUtil.prettyPrint(new TestPojo(), TestPojo.class));
    }

    /*
     * Exposes bug in DIBS parsing.
     */
    @Test
    public void testDIBSApproved() throws IOException {
        ByteArrayInputStream inStream = new ByteArrayInputStream(FileUtil
                .fileAsString(new File(
                        "src/test/resources/mocks/DIBSResponseApproved.txt"))
                .getBytes());

        assertEquals(JSONUtil.prettyPrint(createReferenceMap()),
                JSONUtil.prettyPrint(JSONUtil.asMap(inStream)));
    }

    private Map<String, Object> createReferenceMap() {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        Map<String, Object> subMap1 = new LinkedHashMap<String, Object>();
        Map<String, Object> subMap2 = new LinkedHashMap<String, Object>();
        Map<String, Object> subSubMap = new LinkedHashMap<String, Object>();

        map.put("resource", "/confirm");
        map.put("path", "/confirm");
        map.put("httpMethod", "POST");

        subSubMap.put("cognitoIdentityPoolId", null);
        subSubMap.put("accountId", null);
        subSubMap.put("cognitoIdentityId", null);
        subSubMap.put("caller", null);
        subSubMap.put("apiKey", "");
        subSubMap.put("sourceIp", "85.236.67.1");
        subSubMap.put("accessKey", null);
        subSubMap.put("cognitoAuthenticationType", null);
        subSubMap.put("cognitoAuthenticationProvider", null);
        subSubMap.put("userArn", null);
        subSubMap.put("userAgent", "DIBS");
        subSubMap.put("user", null);

        subMap1.put("Accept", "*/*");
        subMap1.put("CloudFront-Forwarded-Proto", "https");
        subMap1.put("CloudFront-Is-Desktop-Viewer", "true");
        subMap1.put("CloudFront-Is-Mobile-Viewer", "false");
        subMap1.put("CloudFront-Is-SmartTV-Viewer", "false");
        subMap1.put("CloudFront-Is-Tablet-Viewer", "false");
        subMap1.put("CloudFront-Viewer-Country", "DK");
        subMap1.put("Content-Type", "application/x-www-form-urlencoded");
        subMap1.put("Host",
                "kwd6t4w449.execute-api.eu-central-1.amazonaws.com");
        subMap1.put("User-Agent", "DIBS");
        subMap1.put("Via",
                "1.1 492376a657ddc8d381dbc676ab798325.cloudfront.net (CloudFront)");
        subMap1.put("X-Amz-Cf-Id",
                "iwU8Bw5J8s3mep6-WuwHY2Q0gs82UYgFGSdyKmP-1WOG-maIyMhHdw==");
        subMap1.put("X-Amzn-Trace-Id",
                "Root=1-5a17dcf5-74f5726f74ab85083c9e9d22");
        subMap1.put("X-Forwarded-For", "85.236.67.1, 54.182.243.94");
        subMap1.put("X-Forwarded-Port", "443");
        subMap1.put("X-Forwarded-Proto", "https");

        subMap2.put("requestTime", "24/Nov/2017:08:48:53 +0000");
        subMap2.put("path", "/prod/confirm");
        subMap2.put("accountId", "460056602695");
        subMap2.put("protocol", "HTTP/1.1");
        subMap2.put("resourceId", "toschq");
        subMap2.put("stage", "prod");
        subMap2.put("requestTimeEpoch", 1511513333808L);
        subMap2.put("requestId", "4cda93f9-d0f4-11e7-b165-39827437df4e");
        subMap2.put("identity", subSubMap);

        subMap2.put("resourcePath", "/confirm");
        subMap2.put("httpMethod", "POST");
        subMap2.put("apiId", "kwd6t4w449");

        map.put("headers", subMap1);
        map.put("queryStringParameters", null);
        map.put("pathParameters", null);
        map.put("stageVariables", null);
        map.put("requestContext", subMap2);
        map.put("body", "orderid=test&paytype=VISA&cardprefix=471110&accepturl="
                + "https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpayment"
                + "web%2Freply%2Eaction&agreement=5599863&amount=1&callbackurl="
                + "https%3A%2F%2Fkwd6t4w449%2Eexecute%2Dapi%2Eeu%2Dcentral"
                + "%2D1%2Eamazonaws%2Ecom%2Fprod%2Fconfirm&cancelurl=https%3A%"
                + "2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%"
                + "2Eaction&currency=SEK&declineurl=https%3A%2F%2Fpayment%2"
                + "Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&"
                + "decorator=responsive&dibsmd5=d520675fe2c3d8f16e353b6cd"
                + "2dcb7dd&flexwin_cardlogosize=1&fullreply=1&ip=90%2E230"
                + "%2E140%2E171&lang=sv&merchant=90234620&newDIBSTransactionID"
                + "=1977489376&newDIBSTransactionIDVerification=e8d02383137"
                + "bec47a79a047eb7801af312655082291888785ed5cf203fcb5917&"
                + "originalUserAgent=Mozilla%2F5%2E0%20%28Windows%20NT%20"
                + "6%2E1%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537%2E36%"
                + "20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F62%2E0%2E32"
                + "02%2E94%20Safari%2F537%2E36&postype=ssl&test=1&textreply"
                + "=1&token=EOYQ8JPSXQ2V8GIIV18AIUZ8LDP0W1Y9&uniqueoid=yes&"
                + "approvalcode=123456&statuscode=2&transact=1977489376");
        map.put("isBase64Encoded", false);

        return map;
    }
}

package com.zetta.payment.test.run;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import com.zetta.payment.lambda.membrum.MembrumDIBSConfirm;
import com.zetta.payment.lambda.membrum.MembrumNextPayment;
import com.zetta.payment.lambda.membrum.MembrumSavePayment;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.PaymentRequest;
import com.zetta.payment.pojo.enumerations.Status;
import com.zetta.payment.util.JSON;

/**
 * @date 2018-01-22
 * 
 * TODO: Move these to JUnit tests using dynamoDB local.
 */
@SuppressWarnings("unused")
public class LambdaTest {

    public static void main(String[] args) {
        NextPayment.basicTest();
    }

    private static class SavePayment {

        public static void basicTest() {
            String payment = new JSON(
                    new Payment("cjdk34p3000000118hz2jwkol", Status.SUCCEEDED))
                            .prettyPrint();
            new MembrumSavePayment().membrumSavePayment(
                    new ByteArrayInputStream(
                            payment.getBytes(StandardCharsets.UTF_8)),
                    System.out, null);
        }
    }

    private static class NextPayment {

        public static void basicTest() {
            PaymentRequest req = new PaymentRequest();
            req.setAcceptUrl("");
            req.setCancelUrl("");
            req.setUserId("9105040035");
            req.setSubscription(Arrays.asList(new String[] {
                    "cjd1fwht500022wcvx6k52tyt", "cjd1fwht500082wcv20wmq5kl",
                    "cjd1fwht5000j2wcvimbzapif",
                    "cjd1fwht5000k2wcvmo4xxfln" }));
            System.out.println(
                    new MembrumNextPayment().membrumNextPayment(req, null));
        }
    }

    private static class DIBSConfirm {

        public static void basicTest() {
            String string = "{\r\n" + "    \"path\": \"/confirmPayment\",\r\n"
                    + "    \"headers\": {\r\n"
                    + "        \"Accept\": \"*/*\",\r\n"
                    + "        \"CloudFront-Forwarded-Proto\": \"https\",\r\n"
                    + "        \"CloudFront-Is-Desktop-Viewer\": \"true\",\r\n"
                    + "        \"CloudFront-Is-Mobile-Viewer\": \"false\",\r\n"
                    + "        \"CloudFront-Is-SmartTV-Viewer\": \"false\",\r\n"
                    + "        \"CloudFront-Is-Tablet-Viewer\": \"false\",\r\n"
                    + "        \"CloudFront-Viewer-Country\": \"DK\",\r\n"
                    + "        \"Content-Type\": \"application/x-www-form-urlencoded\",\r\n"
                    + "        \"Host\": \"4acs2nf77c.execute-api.eu-central-1.amazonaws.com\",\r\n"
                    + "        \"User-Agent\": \"DIBS\",\r\n"
                    + "        \"Via\": \"1.1 208ed8b46a45d58d14b6e0be1aab3dad.cloudfront.net (CloudFront)\",\r\n"
                    + "        \"X-Amz-Cf-Id\": \"XFDFaAr9iUDxE2JMRzPKQjVfiPlq5cyrL4_-5xtOiPleJsk72ZxMQg==\",\r\n"
                    + "        \"X-Amzn-Trace-Id\": \"Root=1-5a816ea9-4ee200ec4b58abbb0cdc6d4e\",\r\n"
                    + "        \"X-Forwarded-For\": \"85.236.67.1, 205.251.218.161\",\r\n"
                    + "        \"X-Forwarded-Port\": \"443\",\r\n"
                    + "        \"X-Forwarded-Proto\": \"https\"\r\n"
                    + "    },\r\n" + "    \"isBase64Encoded\": false,\r\n"
                    + "    \"requestContext\": {\r\n"
                    + "        \"requestTime\": \"12/Feb/2018:10:38:33 +0000\",\r\n"
                    + "        \"path\": \"/prod/confirmPayment\",\r\n"
                    + "        \"accountId\": \"460056602695\",\r\n"
                    + "        \"protocol\": \"HTTP/1.1\",\r\n"
                    + "        \"resourceId\": \"mzc9az\",\r\n"
                    + "        \"stage\": \"prod\",\r\n"
                    + "        \"requestTimeEpoch\": 1518431913923,\r\n"
                    + "        \"requestId\": \"dff471f9-0fe0-11e8-ac11-43be20792bda\",\r\n"
                    + "        \"identity\": {\r\n"
                    + "            \"cognitoIdentityPoolId\": null,\r\n"
                    + "            \"accountId\": null,\r\n"
                    + "            \"cognitoIdentityId\": null,\r\n"
                    + "            \"caller\": null,\r\n"
                    + "            \"sourceIp\": \"85.236.67.1\",\r\n"
                    + "            \"accessKey\": null,\r\n"
                    + "            \"cognitoAuthenticationType\": null,\r\n"
                    + "            \"cognitoAuthenticationProvider\": null,\r\n"
                    + "            \"userArn\": null,\r\n"
                    + "            \"userAgent\": \"DIBS\",\r\n"
                    + "            \"user\": null\r\n" + "        },\r\n"
                    + "        \"resourcePath\": \"/confirmPayment\",\r\n"
                    + "        \"httpMethod\": \"POST\",\r\n"
                    + "        \"apiId\": \"4acs2nf77c\"\r\n" + "    },\r\n"
                    + "    \"resource\": \"/confirmPayment\",\r\n"
                    + "    \"httpMethod\": \"POST\",\r\n"
                    + "    \"body\": \"orderid=cjdk34p3000000118hz2jwkol&paytype=VISA&cardprefix=471110&accepturl=https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&agreement=5599863&amount=320&callbackurl=https%3A%2F%2F4acs2nf77c%2Eexecute%2Dapi%2Eeu%2Dcentral%2D1%2Eamazonaws%2Ecom%2Fprod%2FconfirmPayment&cancelurl=https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&currency=SEK&declineurl=https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&decorator=responsive&dibsmd5=f5c58195f087d7e033181f681f3d2a8b&flexwin_cardlogosize=1&fullreply=1&ip=155%2E4%2E107%2E30&lang=sv&merchant=90234620&newDIBSTransactionID=2066438681&newDIBSTransactionIDVerification=fba99192d8d56ef38bb6196c3113e48d8ae69f7b45a6862682808765054c129a&originalUserAgent=Mozilla%2F5%2E0%20%28Windows%20NT%2010%2E0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F64%2E0%2E3282%2E140%20Safari%2F537%2E36&postype=ssl&test=1&textreply=1&token=2CH8LD2W2B1D96BVQ33LPAG3DZ6UUQQM&uniqueoid=yes&approvalcode=123456&statuscode=2&transact=2066438681\"\r\n"
                    + "}";

            new MembrumDIBSConfirm().membrumDIBSConfirm(
                    new ByteArrayInputStream(
                            string.getBytes(StandardCharsets.UTF_8)),
                    System.out, null);
        }
    }

}

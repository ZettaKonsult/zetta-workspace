package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zetta.payment.db.dynamo.DynamoPaymentDAO;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.FormData;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;
import com.zetta.payment.util.URLUtil;

/**
 * The public functions in this class are Lambda handlers.
 * 
 * @date 2017-11-08
 */
public class PaymentLambda {

    private static Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoPaymentDAO paymentDAO = DynamoPaymentDAO.instance();

    public String getDIBSUrl(FormData data, Context context) {

        log.info("Received:\n" + data);

        boolean isPaid = false;

        // Get user (orderid)
        // Get merchant (merchId)
        // Get plan (amount)
        // Check if order is payed.

        String amount = "1";    // Fix.
        String orderid = "";    // Should be generated already.

        Form form = new TRFForm(orderid, amount);
        Map<String, Object> json = new LinkedHashMap<String, Object>();
        json.put("url", isPaid ? "" : form.url());
        json.put("status", isPaid);

        log.info("Using the following parameters:\n" + CollectionUtil.mapString(json));

        String response = "";
        try {
            response = JSONUtil.prettyPrint(json);
        } catch (JsonProcessingException e) {
            log.error("Error during JSON printing:\n" + e.getMessage());
            response = "{\"error\": \"" + e.getMessage() + "\"}";
        }

        log.info("Replying:\n" + response);

        return response;
    }

    public void dibsConfirmation(InputStream is, OutputStream os, Context context) {

        log.info("DIBS executed callback.");

        Map<String, String> headers = new LinkedHashMap<String, String>();
        headers.put("content-type", "*/*");
        Response response = new Response(500, headers, "Unexpected error.");

        try {
            Map<String, String> parameters = URLUtil.decode(getBody(is));
            String status = parameters.get("statuscode");

            if (status == null) {
                response.setBody("Erroneous callback format, no 'statuscode' parameter.");

            } else if (status.equals("2")) {
                response.setStatus(200);
                response.setBody("Transaction completed.");

            } else {
                response.setBody("Transaction not completed, status code: " + parameters.get(status) + ".");
            }
        } catch (InvalidInput e) {
            response.setBody(e.getMessage());
        }

        log.info("Sending response:\n    " + response.toString());
        try {
            os.write(response.asJson().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String getBody(InputStream is) throws InvalidInput {
        try {
            Map<?, ?> json = JSONUtil.parse(is);
            log.info("Received json with parameters:\n" + JSONUtil.prettyPrint(json));

            if (!json.containsKey("body")) {
                throw new InvalidInput("No \"body\" key in object.");
            }

            return json.get("body").toString();
        } catch (IOException e) {
            throw new InvalidInput("Error parsing JSON object:\n" + e.getMessage().split("\n at")[0] + ".");
        }
    }

    private static class Response {
        private Map<String, Object> values;

        public Response(int code, Map<String, String> headers, Object body) {
            this.values = new LinkedHashMap<String, Object>();

            setStatus(code);
            values.put("headers", headers);
            setBody(body);
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

    public List<Payment> getAllPayments() {

        log.info("Scanning table for all payments.");
        List<Payment> payments = paymentDAO.getAll();
        log.info("Found " + payments.size() + " payments:\n    " + payments);
        for (Payment payment : payments) {
            System.out.println("A payment: " + payment.toString());
        }
        return payments;
    }

    public Optional<Payment> getPayment(String id) {

        log.info("Querying table for payment " + id + ".");
        Optional<Payment> payment = paymentDAO.get(id);
        if (payment.isPresent()) {
            log.info("Payment existed.");
        } else {
            log.info("Payment could not be found.");
        }
        return payment;
    }

    public void savePayment(Payment payment) {

        if (payment == null) {
            log.error("Can not save null payment.");
            throw new IllegalArgumentException("Can not save null payment.");
        }

        log.info("Saving or updating payment " + payment.getId() + ".");
        paymentDAO.save(payment);
        log.info("Successfully saved payment.");
    }

    public void deletePayment(Payment payment) {

        if (payment == null) {
            log.error("Can not delete null payment.");
            throw new IllegalArgumentException("Cannot delete null payment.");
        }

        log.info("Deleting payment " + payment.getId() + ".");
        paymentDAO.delete(payment.getId());
        log.info("Successfully deleted event");
    }

}

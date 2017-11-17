package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zetta.payment.db.dynamo.DynamoPaymentDAO;
import com.zetta.payment.form.BasicForm;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.FormData;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.util.JSONUtil;

/**
 * The public functions in this class are Lambda handlers.
 * 
 * @date 2017-11-08
 */
public class PaymentLambda {

    private static final Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoPaymentDAO paymentDAO = DynamoPaymentDAO
            .instance();

    public String getForm(FormData data, Context context) {
        BasicForm form = new TRFForm();

        System.out.println(data);
        // Get user (orderid)
        // Get merchant (merchId)
        // Get plan (amount)

        return form.asJSon();
    }

    public void dibsConfirmation(InputStream is, OutputStream os,
            Context context) {

        log.info("DIBS executed callback.");

        Map<String, String> headers = new LinkedHashMap<String, String>();
        headers.put("content-type", "*/*");
        Response response = new Response(500, headers, "");

        Map<?, ?> json = Collections.<String, String>emptyMap();
        try {
            json = JSONUtil.parse(is);
            //log.info("Received json with parameters:\n"
            //        + JSONUtil.prettyPrint(json, "    "));
            log.info("{");
            for (Object key : json.keySet()) {
                log.info("[" + key.getClass().getSimpleName() + "]    "
                        + key.toString() + " = " + json.get(key));
            }
            log.info("}");

            response = new Response(200, headers, json.get("body"));

        } catch (IOException e) {
            log.error("Error receiving DIBS response:\n   " + e.getMessage());
        }

        log.info("Writing response:\n    " + response.toString());
        try {
            os.write(response.asJson().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        new PaymentLambda().dibsConfirmation(null, null, null);
    }

    private static class Response {
        private Map<String, Object> values;

        public Response(int code, Map<String, String> headers, Object body) {
            this.values = new LinkedHashMap<String, Object>();

            values.put("statusCode", Integer.toString(code));
            values.put("headers", headers);
            values.put("body", body.toString());
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

        @Override
        public String toString() {
            return asJson();
        }
    }

    public String dibsResponse(String response, Context context) {
        log.info("Received response:\n" + response);
        return response;
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

package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.ValidationFailed;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;
import com.zetta.payment.util.URLUtil;

public class URLLambda extends Lambda {
    private static Logger log = Logger.getLogger(URLLambda.class);

    public void dibsConfirmation(InputStream is, OutputStream os,
            Context context) {

        log.info("DIBS executed callback.");

        Response response = null;
        try {
            Order order = getOrderFromURL(is);
            log.info("Created order " + order);

            response = new Response(200, "Transaction completed.");
            order.setIsPaid(true);

            log.info("Saving order.");
            lambdaSaveOrder(order);

        } catch (InvalidInput | ValidationFailed e) {
            error(log, e.getMessage());
        }

        respond(os, response, log);
    }

    private Order getOrderFromURL(InputStream inStream)
            throws ValidationFailed, InvalidInput {

        Map<String, String> parameters = URLUtil.decode(getBody(inStream));
        log.info("The URL had parameters:\n"
                + CollectionUtil.mapString(parameters));

        String status = parameters.get("statuscode");
        String orderId = parameters.get("orderid");

        log.info("Retrieving order.");
        Optional<Order> maybeOrder = lambdaGetOrder(orderId);

        if (status == null) {
            error(log, "Erroneous callback format, no 'statuscode' parameter.");
        } else if (!status.equals("2")) {
            error(log,
                    "Transaction not completed, status code: " + status + ".");
        }

        if (!maybeOrder.isPresent()) {
            error(log,
                    "No order with the specified ID (" + orderId + ") exists:");
        }

        if (!hasErrors()) {
            return maybeOrder.get();
        }

        throw new ValidationFailed(errorString());
    }

    private String getBody(InputStream is) throws InvalidInput {
        try {
            Map<?, ?> json = JSONUtil.parseMap(is);
            log.info("Received json with parameters:\n"
                    + JSONUtil.prettyPrint(json));

            if (!json.containsKey("body")) {
                throw new InvalidInput("No \"body\" key in object.");
            }
            return json.get("body").toString();
        } catch (IOException e) {
            throw new InvalidInput("Error parsing JSON object:\n"
                    + e.getMessage().split("\n at")[0] + ".");
        }
    }

    private Optional<Order> lambdaGetOrder(String orderId) {
        log.info("Calling lambda to get order " + orderId + ".");
        Map<String, String> input = new LinkedHashMap<String, String>();
        input.put("orderId", orderId);

        Optional<Order> order = Optional.empty();
        try {
            Map<?, ?> result = callLambda("payment-prod-getOrder",
                    JSONUtil.prettyPrint(input));

            if (result.containsKey("errorMessage")) {
                log.error("Lambda call resulted in error: "
                        + result.get("errorMessage"));
            } else if (result.containsKey("body")) {
                order = Optional.of(JSONUtil
                        .parse(result.get("body").toString(), Order.class));
                log.info("Got order " + order + ".");
            }
        } catch (IOException e) {
            log.error("Error calling lambda: " + e.getMessage());
        }
        return order;
    }

    private void lambdaSaveOrder(Order order) {
        String orderId = order.getOrderId();

        log.info("Calling lambda to save order " + orderId + ".");
        Map<String, String> input = new LinkedHashMap<String, String>();
        input.put("orderId", orderId);

        try {
            Map<?, ?> result = callLambda("payment-prod-updateOrder",
                    JSONUtil.toString(order, Order.class));

            if (result.containsKey("errorMessage")) {
                error(log, "Lambda call resulted in error: "
                        + result.get("errorMessage"));
            } else {
                log.info("Successfully saved order " + orderId
                        + " with lambda call.");
            }
        } catch (IOException e) {
            error(log, "Error calling lambda: " + e.getMessage());
        }

    }
}

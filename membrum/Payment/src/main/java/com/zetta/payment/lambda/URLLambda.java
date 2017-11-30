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
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;
import com.zetta.payment.util.URLUtil;

public class URLLambda extends LambdaHandler {

    private final Logger log = Logger.getLogger(URLLambda.class);

    public void dibsConfirmation(InputStream is, OutputStream os,
            Context context) {

        log.info("DIBS executed callback.");

        Optional<Order> maybeOrder = Optional.empty();
        try {
            maybeOrder = getOrderFromURL(is);

            if (!maybeOrder.isPresent()) {
                Response.error("No such order.");
                return;
            }

        } catch (InvalidInput | ValidationFailed e) {
            Response.error(e.getMessage()).emit(os);
            return;
        }

        Order order = maybeOrder.get();
        String orderId = order.getOrderId();
        order.setIsPaid(true);
        lambdaSaveOrder(order);

        log.info("Saved order " + orderId + ".");
        Response.success("Transaction " + orderId + " completed.").emit(os);
    }

    private Optional<Order> getOrderFromURL(InputStream inStream)
            throws ValidationFailed, InvalidInput {

        Map<String, String> parameters = URLUtil.decode(getBody(inStream));
        log.info("The URL had parameters:\n"
                + CollectionUtil.mapString(parameters));

        String status = parameters.get("statuscode");
        String orderId = parameters.get("orderid");

        if (status == null) {
            throw new ValidationFailed(
                    "Erroneous callback format, no 'statuscode' parameter.");
        } else if (!status.equals("2")) {
            throw new ValidationFailed(
                    "Transaction not completed, status code: " + status + ".");
        }

        log.info("Retrieving order " + orderId + ".");
        return lambdaGetOrder(orderId);
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

        try {
            Map<?, ?> result = callLambda("payment-prod-updateOrder",
                    JSONUtil.toString(order, Order.class));

            if (result.containsKey("errorMessage")) {
                log.error("Lambda call resulted in error: "
                        + result.get("errorMessage"));
            } else {
                log.info("Successfully saved order " + orderId
                        + " with lambda call.");
            }
        } catch (IOException e) {
            log.error("Error calling lambda: " + e.getMessage());
        }

    }
}

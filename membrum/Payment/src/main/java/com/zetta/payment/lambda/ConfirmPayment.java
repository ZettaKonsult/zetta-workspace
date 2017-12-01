package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.LambdaError;
import com.zetta.payment.exception.PaymentError;
import com.zetta.payment.exception.ValidationFailed;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;
import com.zetta.payment.util.URLUtil;

/**
 * @date 2017-11-14
 */
public class ConfirmPayment extends LambdaHandler {

    private final Logger log = Logger.getLogger(ConfirmPayment.class);

    public void confirmPayment(InputStream inStream, OutputStream outStream,
            Context context) {

        log.info("DIBS executed callback.");

        Optional<Order> maybeOrder = Optional.empty();
        try {
            maybeOrder = getOrderFromURL(inStream);
        } catch (PaymentError error) {
            ResponseFactory.error(error.getMessage()).emit(outStream);
            return;
        }

        if (!maybeOrder.isPresent()) {
            ResponseFactory.error("No such order.").emit(outStream);
            return;
        }

        Order order = maybeOrder.get();
        String orderId = order.getOrderId();
        order.setIsPaid(true);

        try {
            lambdaSaveOrder(order);
        } catch (PaymentError error) {
            ResponseFactory.error(error.getMessage()).emit(outStream);
            return;
        }

        log.info("Saved order " + orderId + ".");
        ResponseFactory.success("Transaction " + orderId + " completed.")
                .emit(outStream);
    }

    private Optional<Order> getOrderFromURL(InputStream inStream)
            throws PaymentError {

        Map<String, String> parameters = URLUtil
                .decodeParameters(getBody(inStream));
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

    private String getBody(InputStream inStream) throws InvalidInput {
        try {
            Map<?, ?> json = JSONUtil.asMap(inStream);
            log.info("Received json with parameters:\n"
                    + JSONUtil.prettyPrint(json));

            if (!json.containsKey("body")) {
                throw new InvalidInput("No \"body\" key in object.");
            }
            return json.get("body").toString();
        } catch (IOException error) {
            throw new InvalidInput("Error parsing JSON object:\n"
                    + error.getMessage().split("\n at")[0] + ".");
        }
    }

    private Optional<Order> lambdaGetOrder(String orderId) throws PaymentError {

        log.info("Calling lambda to get order " + orderId + ".");
        Map<String, String> arguments = new LinkedHashMap<String, String>();
        arguments.put("orderId", orderId);

        Map<?, ?> result = Collections.emptyMap();
        Optional<Order> order = Optional.empty();
        try {
            result = callLambda("payment-prod-getOrder",
                    JSONUtil.prettyPrint(arguments));
        } catch (IOException error) {
            throw new LambdaError(
                    "Error calling lambda: " + error.getMessage());
        }

        if (result.containsKey("errorMessage")) {
            throw new LambdaError("Lambda call resulted in error: "
                    + result.get("errorMessage"));
        }

        if (!result.containsKey("body")) {
            throw new ValidationFailed(
                    "Lambda call resulted in error: " + "no 'body' field.");
        }

        try {
            order = Optional.of(
                    JSONUtil.asObject(result.get("body").toString(), Order.class));
        } catch (IOException error) {
            throw new InvalidInput("Error parsing JSON: " + error.getMessage());
        }
        log.info("Got order " + order + ".");
        return order;
    }

    private void lambdaSaveOrder(Order order) throws LambdaError {

        String orderId = order.getOrderId();
        log.info("Calling lambda to save order " + orderId + ".");

        Map<?, ?> result = Collections.emptyMap();
        try {
            result = callLambda("payment-prod-updateOrder",
                    JSONUtil.prettyPrint(order, Order.class));

        } catch (IOException error) {
            throw new LambdaError(
                    "Error calling lambda: " + error.getMessage());
        }

        if (result.containsKey("errorMessage")) {
            throw new LambdaError("Lambda call resulted in error: "
                    + result.get("errorMessage"));
        }

        log.info("Successfully saved order " + orderId + " with lambda call.");
    }
}

package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

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

        String orderId = "";
        try {
            orderId = getOrderId(inStream);
        } catch (PaymentError error) {
            ResponseFactory.error(error.getMessage()).emit(outStream);
            return;
        }

        Order order = new Order(orderId);

        try {
            order.setIsPaid(true);
            lambdaSaveOrder(order);
        } catch (PaymentError error) {
            ResponseFactory.error(error.getMessage()).emit(outStream);
            return;
        }

        log.info("Saved order " + orderId + ".");
        ResponseFactory.success("Transaction " + orderId + " completed.")
                .emit(outStream);
    }

    private String getOrderId(InputStream inStream) throws PaymentError {

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

        log.info("Found order " + orderId + ".");
        return orderId;
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

    private void lambdaSaveOrder(Order order) throws LambdaError {

        String orderId = order.getOrderId();
        log.info("Calling lambda to save order:\n" + order);

        Map<?, ?> result = Collections.emptyMap();
        try {
            result = callLambda("payment-prod-updateOrder", JSONUtil
                    .prettyPrint(inputMap(JSONUtil.asMap(order, Order.class))));

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

    private Map<String, Object> inputMap(Map<String, Object> map) {
        Map<String, Object> input = new LinkedHashMap<String, Object>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            Object value = entry.getValue();
            if (value != null && !value.toString().equals("")) {
                input.put(entry.getKey(), value);
            }
        }
        return input;
    }
}

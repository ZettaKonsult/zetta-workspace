package com.zetta.payment.lambda;

import java.io.InputStream;
import java.io.OutputStream;
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
import com.zetta.payment.util.JSON;
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

        JSON json = new JSON(inStream);
        log.info("Received:\n" + json);

        if (!json.has("body")) {
            throw new InvalidInput("No \"body\" key in object.");
        }

        Map<String, String> parameters = URLUtil
                .decodeParameters(json.get("body").toString());
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

    private void lambdaSaveOrder(Order order) throws LambdaError {

        String orderId = order.getOrderId();
        log.info("Calling lambda to save order:\n" + order);

        JSON result = callLambda("payment-prod-updateOrder",
                new JSON(order).toString());

        if (result.has("errorMessage")) {
            throw new LambdaError("Lambda call resulted in error: "
                    + result.get("errorMessage"));
        }

        log.info("Successfully saved order " + orderId + " with lambda call.");
    }

}

package com.zetta.payment.lambda;

import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.LambdaCall;
import com.zetta.payment.exception.PaymentError;
import com.zetta.payment.exception.ValidationFailed;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.util.JSON;
import com.zetta.payment.util.URLUtil;

/**
 * @date 2017-11-14
 */
public abstract class DIBSConfirm extends LambdaHandler {

    private final Logger log = Logger.getLogger(DIBSConfirm.class);

    protected void dibsConfirm(String lambdaSave, InputStream inStream,
            OutputStream outStream, Context context) {

        log.info("DIBS executed callback.");

        JSON parameters = JSON.empty();
        try {
            parameters = getBodyUrlParameters(inStream);
        } catch (PaymentError error) {
            ResponseFactory.error(error.getMessage()).emit(outStream);
            return;
        }

        String dibsOrderId = parameters.get("orderid").toString();
        String amount = parameters.get("amount").toString();

        if (dibsOrderId == null) {
            ResponseFactory.error("No 'orderid' in URL parameters!")
                    .emit(outStream);
            return;
        }
        if (amount == null) {
            ResponseFactory.error("No 'amount' in URL parameters!")
                    .emit(outStream);
            return;
        }

        Payment payment = new Payment(dibsOrderId, Integer.parseInt(amount));

        try {
            lambdaSavePayment(payment, lambdaSave);
        } catch (PaymentError error) {
            ResponseFactory.error(error.getMessage()).emit(outStream);
            return;
        }

        ResponseFactory.success("Transaction " + dibsOrderId + " completed.")
                .emit(outStream);
    }

    private JSON getBodyUrlParameters(InputStream inStream)
            throws PaymentError {

        JSON json = new JSON(inStream);
        log.info("Received:\n" + json);

        if (!json.has("body")) {
            throw new InvalidInput("No \"body\" key in object.");
        }

        JSON parameters = new JSON(
                URLUtil.decodeParameters(json.get("body").toString()));
        log.info("The URL had parameters:\n" + parameters);

        String status = parameters.get("statuscode").toString();

        if (status == null) {
            throw new ValidationFailed(
                    "Erroneous callback format, no 'statuscode' parameter.");
        } else if (!status.equals("2")) {
            throw new ValidationFailed(
                    "Transaction not completed, status code: " + status + ".");
        }

        return parameters;
    }

    private void lambdaSavePayment(Payment payment, String lambdaSave)
            throws LambdaCall {

        String paymentId = payment.getPaymentId();

        log.info("Calling lambda to save payment " + paymentId);

        JSON result = callLambda(lambdaSave, new JSON(payment).toString());

        if (result.has("errorMessage")) {
            throw new LambdaCall("Lambda call resulted in error: "
                    + result.get("errorMessage"));
        }

        log.info("Successfully saved payment " + paymentId
                + " with lambda call.");
    }

}

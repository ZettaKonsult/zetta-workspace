package com.zetta.payment.lambda;

import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoPaymentDAO;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.util.JSON;

/**
 * @date 2017-11-08
 */
public abstract class SavePayment extends LambdaHandler {

    private static final Logger log = Logger.getLogger(SavePayment.class);

    private static final DynamoPaymentDAO paymentDAO = DynamoPaymentDAO
            .instance();

    protected abstract void applyModifications(Payment payment)
            throws InvalidInput;

    protected void savePayment(InputStream inStream, OutputStream outStream,
            Context context) {

        Response response = null;
        Payment payment = new JSON(inStream).convertTo(Payment.class);

        try {
            applyModifications(payment);
        } catch (InvalidInput error) {
            response = ResponseFactory.error(error);
        }

        paymentDAO.save(payment);

        String message = "Saved payment " + payment + ".";
        log.info(message);

        if (response == null) {
            response = ResponseFactory.success(message);
        } else {
            response.succeed(message);
        }
        response.emit(outStream);
    }

}

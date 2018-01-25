package com.zetta.payment.lambda.membrum;

import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.lambda.SavePayment;
import com.zetta.payment.pojo.Payment;

/**
 * @date 2017-12-08
 */
public final class MembrumSavePayment extends SavePayment {

    private static final Logger log = Logger
            .getLogger(MembrumSavePayment.class);

    @SuppressWarnings("unused")
    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public final void membrumSavePayment(InputStream inStream,
            OutputStream outStream, Context context) {

        super.savePayment(inStream, outStream, context);
    }

    @Override
    protected void applyModifications(Payment payment) {
        log.info("Applying Membrum modifications to payment.");
    }

}

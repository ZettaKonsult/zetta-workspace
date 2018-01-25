package com.zetta.payment.lambda.membrum;

import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.lambda.SavePayment;
import com.zetta.payment.pojo.Payment;

public class MembrumRegisterFailedPayment extends SavePayment {

    private static final Logger log = Logger
            .getLogger(MembrumSavePayment.class);

    public final void membrumRegisterFailedPayment(InputStream inStream,
            OutputStream outStream, Context context) {

        saveFailedPayment(inStream, outStream, context);
    }

    @Override
    protected void applyModifications(Payment payment) throws InvalidInput {
        log.info("Applying Membrum modifications to rejected payment.");
    }

}

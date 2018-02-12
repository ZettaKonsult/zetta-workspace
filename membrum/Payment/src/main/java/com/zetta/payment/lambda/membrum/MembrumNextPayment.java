package com.zetta.payment.lambda.membrum;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.lambda.NextPayment;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.PaymentRequest;

public class MembrumNextPayment extends NextPayment {
    private static final Logger log = Logger
            .getLogger(MembrumNextPayment.class);

    public String membrumNextPayment(PaymentRequest data, Context context) {
        return super.nextPayment(data, context);
    }

    @Override
    protected Form getForm(Payment payment) {
        log.info("Generating TRF form.");
        return new TRFForm(payment.getId(), payment.getAmount());
    }
}

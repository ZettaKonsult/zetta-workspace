package com.zetta.payment.lambda;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamo.DynamoPaymentDAO;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.FormData;
import com.zetta.payment.pojo.Payment;

/**
 * The public functions in this class are Lambda handlers.
 * 
 * @date 2017-11-08
 */
public class PaymentLambda {

    private static final Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoPaymentDAO paymentDAO = DynamoPaymentDAO
            .instance();

    public String getForm(FormData data, Context context) {
        Form form = new TRFForm();

        System.out.println(data);
        // Get user (orderid)
        // Get merchant (merchId)
        // Get plan (amount)

        return form.asJSon();
    }

    public List<Payment> getAllPayments() {

        log.info("Scanning table for all payments.");
        List<Payment> payments = paymentDAO.getAll();
        log.info("Found " + payments.size() + " payments:\n    " + payments);
        for (Payment payment : payments) {
            System.out.println("A payment: " + payment.toString());
        }
        return payments;
    }

    public Optional<Payment> getPayment(String id) {

        log.info("Querying table for payment " + id + ".");
        Optional<Payment> payment = paymentDAO.get(id);
        if (payment.isPresent()) {
            log.info("Payment existed.");
        } else {
            log.info("Payment could not be found.");
        }
        return payment;
    }

    public void savePayment(Payment payment) {

        if (payment == null) {
            log.error("Can not save null payment.");
            throw new IllegalArgumentException("Can not save null payment.");
        }

        log.info("Saving or updating payment " + payment.getId() + ".");
        paymentDAO.save(payment);
        log.info("Successfully saved payment.");
    }

    public void deletePayment(Payment payment) {

        if (payment == null) {
            log.error("Can not delete null payment.");
            throw new IllegalArgumentException("Cannot delete null payment.");
        }

        log.info("Deleting payment " + payment.getId() + ".");
        paymentDAO.delete(payment.getId());
        log.info("Successfully deleted event");
    }

}

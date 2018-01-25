package com.zetta.payment.lambda.membrum;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.db.dynamodb.DynamoPaymentDAO;
import com.zetta.payment.db.dynamodb.DynamoUserDAO;
import com.zetta.payment.exception.JSONFormat;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.PaymentRequest;
import com.zetta.payment.pojo.Plans;
import com.zetta.payment.pojo.HttpResponse;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSON;

/**
 * @date 2017-11-14
 */
public class MembrumNextOrder {
    private static final Logger log = Logger.getLogger(MembrumNextOrder.class);

    private static final DynamoPaymentDAO paymentDAO = DynamoPaymentDAO
            .instance();
    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public String membrumNextOrder(PaymentRequest data, Context context) {

        Response response = ResponseFactory.unknownError();

        log.info("Received payment request:\n" + data);
        String userId = data.getUserId();
        long start = data.getStart();
        long end = data.getEnd();

        Optional<User> maybeUser = userDAO.get(userId);
        if (!maybeUser.isPresent()) {
            log.error(response.addError("No such user: " + userId));
            return response.toString();
        }
        User user = maybeUser.get();
        log.info("Found user.");

        List<Payment> payments = paymentDAO.get(user, start, end);

        log.info("Found user payments for the specified interval:\n"
                + CollectionUtil.verticalString(payments));

        HttpResponse output = new HttpResponse("", "", 0, true);

        int totalAmountPaid = payments.stream().mapToInt(Payment::getAmount)
                .sum();
        log.info("In total, " + totalAmountPaid
                + " has been paid for the specified time interval.");

        Plans subscription = Plans.get(user.getSubscription());
        int subscriptionAmount = subscription.getSum();
        int toPay = subscriptionAmount - totalAmountPaid;

        if (toPay <= 0) {
            log.info("No payment required; total amount (" + totalAmountPaid
                    + ") covers order amount(" + subscriptionAmount + ").");
            return tryReturn(response, output);
        }

        log.info("Amount to pay: " + toPay + ".");

        String orderId = registerOrder(user, start, end);

        Form form = new TRFForm(orderId, toPay, data.getAcceptUrl(),
                data.getCancelUrl());
        output.setProviderUrl(form.url());
        output.setInvoiceUrl(form.invoiceUrl());
        output.setValidUntil(subscription.getValidUntil());
        output.setIsPaid(false);

        log.info("Returning:\n" + output);
        return tryReturn(response, output);
    }

    private String registerOrder(User user, long start, long end) {
        List<Order> orders = orderDAO.get(user, start, end);
        Order order = null;

        for (Order candidate : orders) {
            if (!paymentDAO.exists(candidate.getOrderId())) {
                log.info("Found unpaid order " + candidate.getOrderId() + ".");
                order = candidate;
                break;
            }
        }

        if (order == null) {
            do {
                order = new Order(user);
            } while (paymentDAO.exists(order.getOrderId()));
            log.info("Created new order " + order.getOrderId() + ".");
        }

        String orderId = order.getOrderId();
        log.info("Saving order " + orderId + ".");
        orderDAO.save(order);
        return orderId;
    }

    private String tryReturn(Response response, Object output) {
        try {
            return new JSON(output).prettyPrint();
        } catch (IOException error) {
            throw new JSONFormat(error);
        }
    }
}

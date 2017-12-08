package com.zetta.payment.lambda.membrum;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.PaymentRequest;
import com.zetta.payment.pojo.URLResponse;
import com.zetta.payment.pojo.User;
import com.zetta.payment.pojo.membrum.Order;
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
        String start = data.getStart();
        String end = data.getEnd();

        Optional<User> maybeUser = userDAO.get(userId);
        if (!maybeUser.isPresent()) {
            log.error(response.addError("No such user: " + userId));
            return response.toString();
        }
        User user = maybeUser.get();
        log.info("Found user.");

        List<String> paidOrderIds = CollectionUtil.transform(
                paymentDAO.get(user, start, end),
                (Payment payment) -> payment.getOrderId());
        log.info("Found user payments for the specified interval:\n"
                + CollectionUtil.verticalString(paidOrderIds));

        List<Order> orders = orderDAO.get(user, start, end);
        log.info("Found orders for the specified interval:\n"
                + CollectionUtil.verticalString(paidOrderIds));

        URLResponse output = new URLResponse("", "", "", true);
        if (orders.isEmpty()) {
            log.info(
                    "No orders could be found for the specified time interval.");
            return tryReturn(response, output);
        }

        Map<Boolean, List<Order>> paidUnpaidSplit = orders.stream()
                .collect(Collectors.partitioningBy((Order order) -> paidOrderIds
                        .contains(order.getOrderId())));

        int totalAmountPaid = paidUnpaidSplit.get(true).stream()
                .mapToInt(Order::getAmount).sum();
        log.info("In total, " + totalAmountPaid
                + " has been paid for the specified time interval.");
        List<Order> unpaid = paidUnpaidSplit.get(false);

        if (unpaid.isEmpty()) {
            log.error(response.addError("No unpaid order could be found."));
            return response.toString();
        }

        Order latestUnpaid = unpaid.get(unpaid.size() - 1);
        log.info("Latest unpaid order is:\n" + latestUnpaid + ".");
        int orderAmount = latestUnpaid.getAmount();
        if (totalAmountPaid >= orderAmount) {
            log.info("No payment required; total amount (" + totalAmountPaid
                    + ") covers order amount (" + orderAmount + ").");
            return tryReturn(response, output);
        }

        Order order = latestUnpaid;
        if (totalAmountPaid != 0) {
            order.setAmount(orderAmount - totalAmountPaid);
            orderDAO.save(order); // Should this be done?
        }
        log.info("Amount to pay: " + order.getAmount() + ".");

        Form form = new TRFForm(order);
        output.setProviderUrl(form.url());
        output.setInvoiceUrl(form.invoiceUrl());
        output.setValidUntil(order.getValidUntil());
        output.setIsPaid(false);

        log.info("Returning:\n" + output);
        return tryReturn(response, output);
    }

    private String tryReturn(Response response, Object output) {
        try {
            return new JSON(output).prettyPrint();
        } catch (IOException error) {
            throw new JSONFormat(error);
        }
    }
}

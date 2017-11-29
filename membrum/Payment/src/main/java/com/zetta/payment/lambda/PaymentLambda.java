package com.zetta.payment.lambda;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.zetta.payment.db.dynamo.DynamoOrderDAO;
import com.zetta.payment.db.dynamo.DynamoUserDAO;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.FormData;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.JSONUtil;

/**
 * Handlers for payment management, e.g. generating URLs to payment hosts.
 * 
 * @date 2017-11-14
 */
public class PaymentLambda extends Lambda {

    private static final Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public String getDIBSUrl(FormData data, Context context) {

        String orderId = data.getOrderId();
        String userId = data.getUserId();

        Optional<Order> maybeOrder = orderDAO.get(orderId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybeOrder.isPresent()) {
            error(log, "No payment for user " + userId + ".");
        } else if (maybeOrder.get().getIsPaid()) {
            return orderIsPaidResponse();
        }

        if (!maybeUser.isPresent()) {
            error(log, "No such user: " + userId);
        }

        if (hasErrors()) {
            return errorJSON(log);
        }

        return createDIBSUrl(maybeOrder.get(), maybeUser.get());
    }

    private String orderIsPaidResponse() {
        Map<String, Object> json = new LinkedHashMap<String, Object>();
        json.put("url", "");
        json.put("status", true);

        String result = "";
        try {
            result = JSONUtil.prettyPrint(json);
        } catch (JsonProcessingException e) {
            log.error("Error during JSON printing:\n" + e.getMessage());
            result = errorJSON(log);
        }
        return result;
    }

    private String createDIBSUrl(Order order, User user) {
        int amount = order.getAmount();
        String orderid = order.getOrderId();

        Form form = new TRFForm(orderid, amount);
        Map<String, Object> json = new LinkedHashMap<String, Object>();

        json.put("url", form.url());
        json.put("status", false);

        String response = "";
        try {
            response = JSONUtil.prettyPrint(json);
        } catch (JsonProcessingException e) {
            log.error("Error during JSON printing:\n" + e.getMessage());
            response = "{\"error\": \"" + e.getMessage() + "\"}";
        }

        log.info("Replying:\n" + response);

        return response;
    }
}

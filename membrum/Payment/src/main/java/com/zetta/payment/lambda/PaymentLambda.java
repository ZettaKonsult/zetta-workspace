package com.zetta.payment.lambda;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.zetta.payment.db.dynamo.DynamoOrderDAO;
import com.zetta.payment.db.dynamo.DynamoPlanDAO;
import com.zetta.payment.db.dynamo.DynamoUserDAO;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.FormData;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.JSONUtil;

/**
 * Handlers for payment management, e.g. generating URLs to payment hosts.
 * 
 * @date 2017-11-14
 */
public abstract class PaymentLambda extends Lambda {

    private static final Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public String getDIBSUrl(FormData data, Context context) {

        String planId = data.getPlanId();
        String userId = data.getUserId();

        Optional<Plan> maybePlan = planDAO.get(planId);
        Optional<Order> maybeOrder = orderDAO.getLatest(userId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybeOrder.isPresent()) {
            error("No payment for user " + userId + ".");
        } else if (maybeOrder.get().getIsPaid()) {
            return orderIsPaid();
        }

        if (!maybeUser.isPresent()) {
            error("No such user: " + userId);
        }
        if (!maybePlan.isPresent()) {
            error("No such plan: " + planId);
        }

        if (hasErrors()) {
            return errorJSON(log);
        }

        return createDIBSUrl(maybeOrder.get(), maybePlan.get(),
                maybeUser.get());
    }

    private String orderIsPaid() {
        Map<String, Object> json = new LinkedHashMap<String, Object>();
        json.put("url", "");
        json.put("status", true);

        String response = "";
        try {
            response = JSONUtil.prettyPrint(json);
        } catch (JsonProcessingException e) {
            error("Error during JSON printing:\n" + e.getMessage());
            response = errorJSON(log);
        }
        return response;
    }

    private String createDIBSUrl(Order order, Plan plan, User user) {
        int amount = plan.getAmount();
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

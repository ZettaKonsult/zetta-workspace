package com.zetta.payment.lambda;

import java.io.File;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.zetta.payment.db.dynamo.DynamoOrderDAO;
import com.zetta.payment.db.dynamo.DynamoPlanDAO;
import com.zetta.payment.db.dynamo.DynamoUserDAO;
import com.zetta.payment.exception.ProcessFail;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.FormData;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.JSONUtil;
import com.zetta.payment.util.ProcessUtil;
import com.zetta.payment.util.ProcessUtil.Engine;

/**
 * @date 2017-11-14
 */
public class PaymentLambda extends Lambda {
    private static final File PLAN_FILE = new File(
            "src/main/resources/testScript.js");

    private static final Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public String getLatestUnpaidUrl(FormData data, Context context)
            throws ProcessFail {

        String planId = data.getPlanId();
        String userId = data.getUserId();

        Optional<Plan> maybePlan = planDAO.get(planId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybePlan.isPresent()) {
            error(log, "No such plan: " + planId);
        }
        if (!maybeUser.isPresent()) {
            error(log, "No such user: " + userId);
        }

        if (hasErrors()) {
            return errorJSON(log);
        }

        Plan plan = maybePlan.get();
        User user = maybeUser.get();

        Order order = null;
        if (shouldCreateNewOrder(plan)) {
            order = new Order(user, plan);
            orderDAO.save(order);
            log.info("Created new order: " + order.getOrderId() + ".");
        } else {
            Optional<Order> maybeOrder = orderDAO.getLatestUnpaid(user);
            if (maybeOrder.isPresent()) {
                order = maybeOrder.get();
                log.info("Found unpaid order: " + order.getOrderId() + ".");
            } else {
                log.info("No unpaid orders were found.");
                return createResult("", false);
            }
        }

        return createResult(new TRFForm(order).url(), true);
    }

    public String getUnpaidUrls(FormData data, Context context)
            throws ProcessFail {

        String planId = data.getPlanId();
        String userId = data.getUserId();

        log.info("Getting unpaid URLs for\n    " + data);

        Optional<Plan> maybePlan = planDAO.get(planId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybePlan.isPresent()) {
            error(log, "No such plan: " + planId);
        }
        if (!maybeUser.isPresent()) {
            error(log, "No such user: " + userId);
        }

        if (hasErrors()) {
            return errorJSON(log);
        }

        Plan plan = maybePlan.get();
        User user = maybeUser.get();

        List<Order> orders = orderDAO.getUnpaid(user.getUserId());
        if (shouldCreateNewOrder(maybePlan.get())) {
            Order order = new Order(user, plan);
            orderDAO.save(order);
            log.info("Created new order: " + order.getOrderId() + ".");
            orders.add(order);
        }

        return createResults(orders);
    }

    private String createResult(String url, boolean status) {
        String result = "";
        try {
            result = JSONUtil.prettyPrint(urlMap(url, status));
        } catch (JsonProcessingException e) {
            log.error("Error during JSON printing:\n" + e.getMessage());
            result = errorJSON(log);
        }
        return result;
    }

    private String createResults(List<Order> orders) {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        log.info("Found orders:\n");
        for (Order order : orders) {
            log.info("    " + order.getOrderId());
            list.add(urlMap(new TRFForm(order).url(), false));
        }

        String result = "";
        try {
            result = JSONUtil.toString(list, List.class);
        } catch (JsonProcessingException e) {
            log.error("Error during JSON printing:\n" + e.getMessage());
            result = errorJSON(log);
        }
        log.info("Returning JSON:\n\n" + result);
        return result;
    }

    private Map<String, Object> urlMap(String url, boolean status) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("url", url);
        map.put("status", status);
        return map;
    }

    // TODO: Fix.
    private boolean shouldCreateNewOrder(Plan plan) throws ProcessFail {
        if (plan.getPlanId().contains("stop")) {
            return false;
        } else if (1 == 1) {
            return true;
        }

        return Boolean.valueOf(ProcessUtil.execute(Engine.NASHORN, PLAN_FILE,
                "checkPlan", plan.getPlanId()).toString());

    }
}

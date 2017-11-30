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
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.ProcessFail;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.lambda.response.Response;
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
public class PaymentLambda extends LambdaHandler {
    private static final File PLAN_FILE = new File(
            "src/main/resources/testScript.js");

    private static final Logger log = Logger.getLogger(PaymentLambda.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    /**
     * Handler.
     */
    public String getLatestUnpaidUrl(FormData data, Context context) {

        Response response = new Response();

        String planId = data.getPlanId();
        String userId = data.getUserId();
        log.info("Received planId: " + planId + ", userId: " + userId);

        Optional<Plan> maybePlan = planDAO.get(planId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybePlan.isPresent()) {
            log.error(response.addError("No such plan: " + planId));
            return response.toString();
        }
        if (!maybeUser.isPresent()) {
            log.error(response.addError("No such user: " + userId));
            return response.toString();
        }

        Plan plan = maybePlan.get();
        User user = maybeUser.get();

        String url = "";
        boolean status = false;

        try {
            Optional<Order> orderToPay = getOrderToPay(user, plan);
            if (orderToPay.isPresent()) {
                url = new TRFForm(orderToPay.get()).url();
                status = true;
            }
            return createResult(url, status);
        } catch (InvalidInput | ProcessFail exception) {
            return new Response(exception).toString();
        }
    }

    private Optional<Order> getOrderToPay(User user, Plan plan)
            throws ProcessFail {

        Optional<Order> maybeOrder = Optional.empty();
        if (shouldCreateNewOrder(plan)) {
            Order order = new Order(user, plan);
            orderDAO.save(order);
            log.info("Created new order: " + order.getOrderId() + ".");
            maybeOrder = Optional.of(order);
        } else {
            maybeOrder = orderDAO.getLatestUnpaid(user);

            if (maybeOrder.isPresent()) {
                log.info("Found unpaid order.");
            }
        }

        return maybeOrder;
    }

    /**
     * Handler.
     */
    public String getUnpaidUrls(FormData data, Context context) {

        Response response = new Response();

        String planId = data.getPlanId();
        String userId = data.getUserId();
        log.info("Received planId: " + planId + ", userId: " + userId);

        Optional<Plan> maybePlan = planDAO.get(planId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybePlan.isPresent()) {
            log.error(response.addError("No such plan: " + planId));
            return response.errorJSON();
        }
        if (!maybeUser.isPresent()) {
            log.error(response.addError("No such user: " + userId));
            return response.errorJSON();
        }

        Plan plan = maybePlan.get();
        User user = maybeUser.get();

        List<Order> unpaid = orderDAO.getUnpaid(userId);
        try {
            if (shouldCreateNewOrder(plan)) {
                Order order = new Order(user, plan);
                orderDAO.save(order);
                log.info("Created new order: " + order.getOrderId() + ".");
                unpaid.add(order);
            }
            return createResults(unpaid);
        } catch (ProcessFail | InvalidInput exception) {
            return new Response(exception).toString();
        }
    }

    private String createResult(String url, boolean status)
            throws InvalidInput {

        try {
            return JSONUtil.prettyPrint(urlMap(url, status));
        } catch (JsonProcessingException exception) {
            throw new InvalidInput(
                    "Error during JSON printing:\n" + exception.getMessage());
        }
    }

    private String createResults(List<Order> orders) throws InvalidInput {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        for (Order order : orders) {
            log.info("    " + order.getOrderId());
            list.add(urlMap(new TRFForm(order).url(), false));
        }

        try {
            return JSONUtil.toString(list, List.class);
        } catch (JsonProcessingException exception) {
            throw new InvalidInput(
                    "Error during JSON printing:\n" + exception.getMessage());
        }
    }

    private Map<String, Object> urlMap(String url, boolean status) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("url", url);
        map.put("status", status);
        return map;
    }

    // TODO: Fix.
    private boolean shouldCreateNewOrder(Plan plan) throws ProcessFail {
        if (plan.getPlanId().equals("notNew")) {
            return false;
        } else if (1 == 1) {
            return true;
        }

        return Boolean.valueOf(ProcessUtil.execute(Engine.NASHORN, PLAN_FILE,
                "checkPlan", plan.getPlanId()).toString());

    }
}

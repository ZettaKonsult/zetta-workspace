package com.zetta.payment.lambda;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.db.dynamodb.DynamoPlanDAO;
import com.zetta.payment.db.dynamodb.DynamoUserDAO;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.PaymentError;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.PlanUserInput;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;

/**
 * @date 2017-11-14
 */
public class UnpaidUrls extends LambdaHandler {

    private static final Logger log = Logger.getLogger(UnpaidUrls.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public String getUnpaidUrls(PlanUserInput data, Context context) {

        Response response = ResponseFactory.unknownError();

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

        List<Order> unpaid = orderDAO.getAllUnpaid(userId);
        try {
            if (Plan.shouldCreateNewOrder(plan)) {
                Order order = new Order(user, plan);
                orderDAO.save(order);
                log.info("Created new order: " + order.getOrderId() + ".");
                unpaid.add(order);
            }
            return createResults(unpaid);
        } catch (PaymentError error) {
            return ResponseFactory.error(error).toString();
        }
    }

    private String createResults(List<Order> orders) throws InvalidInput {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        for (Order order : orders) {
            log.info("    " + order.getOrderId());
            list.add(CollectionUtil.map(new TRFForm(order).url(), false));
        }

        try {
            return JSONUtil.toString(list, List.class);
        } catch (IOException error) {
            throw new InvalidInput(
                    "Error during JSON printing:\n" + error.getMessage());
        }
    }

}

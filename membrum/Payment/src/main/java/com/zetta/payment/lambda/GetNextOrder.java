package com.zetta.payment.lambda;

import java.io.IOException;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.db.dynamodb.DynamoPlanDAO;
import com.zetta.payment.db.dynamodb.DynamoUserDAO;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.PaymentError;
import com.zetta.payment.exception.ProcessFail;
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
public class GetNextOrder extends LambdaHandler {
    private static final Logger log = Logger.getLogger(GetNextOrder.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public String getNextOrder(PlanUserInput data, Context context) {

        Response response = ResponseFactory.unknownError();

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
        } catch (PaymentError error) {
            return ResponseFactory.error(error).toString();
        }
    }

    private Optional<Order> getOrderToPay(User user, Plan plan)
            throws ProcessFail {

        Optional<Order> maybeOrder = Optional.empty();
        if (Plan.shouldCreateNewOrder(plan)) {
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

    private String createResult(String url, boolean status)
            throws InvalidInput {

        try {
            return JSONUtil.prettyPrint(
                    CollectionUtil.newMap("url", url, "status", status));
        } catch (IOException error) {
            throw new InvalidInput(
                    "Error during JSON printing:\n" + error.getMessage());
        }
    }

}

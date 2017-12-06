package com.zetta.payment.lambda;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.PaymentError;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.PlanUserInput;
import com.zetta.payment.pojo.URLResponse;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.JSONUtil;

/**
 * @date 2017-11-14
 */
public class GetUnpaidOrders extends OrderLambda {

    private static final Logger log = Logger.getLogger(GetUnpaidOrders.class);

    public String getUnpaidOrders(PlanUserInput data, Context context) {

        Response response = ResponseFactory.unknownError();

        String planId = data.getPlanId();
        String userId = data.getUserId();
        log.info("Received planId: " + planId + ", userId: " + userId);

        Optional<Plan> maybePlan = planDAO.get(planId);
        Optional<User> maybeUser = userDAO.get(userId);

        if (!maybePlan.isPresent()) {
            log.error(response.addError("No such plan: " + planId));
            return response.asJSON();
        }
        if (!maybeUser.isPresent()) {
            log.error(response.addError("No such user: " + userId));
            return response.asJSON();
        }

        Plan plan = maybePlan.get();
        User user = maybeUser.get();

        List<Order> unpaid = orderDAO.getAllUnpaid(plan, user);

        Optional<Order> orderToPay = getOrderToPay(plan, user);
        if (orderToPay.isPresent()) {
            Order order = orderToPay.get();

            if (!unpaid.contains(order)) {
                unpaid.add(order);
            }
        }

        try {
            return createResults(unpaid, plan);
        } catch (PaymentError error) {
            return ResponseFactory.error(error).toString();
        }
    }

    private String createResults(List<Order> orders, Plan plan)
            throws InvalidInput {

        List<URLResponse> output = new ArrayList<URLResponse>();
        for (Order order : orders) {
            Form form = new TRFForm(order);
            output.add(new URLResponse(form.url(), form.invoiceUrl(),
                    plan.getNextPaymentDate(), false));
        }

        try {
            return JSONUtil.prettyPrint(output, List.class);
        } catch (IOException error) {
            throw new InvalidInput(
                    "Error during JSON printing:\n" + error.getMessage());
        }
    }

}

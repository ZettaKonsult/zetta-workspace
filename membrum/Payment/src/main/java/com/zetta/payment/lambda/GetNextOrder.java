package com.zetta.payment.lambda;

import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.PlanUserInput;
import com.zetta.payment.pojo.URLResponse;
import com.zetta.payment.pojo.User;

/**
 * @date 2017-11-14
 */
public class GetNextOrder extends OrderLambda {
    private static final Logger log = Logger.getLogger(GetNextOrder.class); 

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

        URLResponse output = new URLResponse("", "", "", true);

        Optional<Order> order = getOrderToPay(plan, user);

        if (order.isPresent()) {
            Form form = new TRFForm(order.get());
            output.setProviderUrl(form.url());
            output.setInvoiceUrl(form.invoiceUrl());
            output.setValidUntil(plan.getNextPaymentDate());
            output.setIsPaid(false);
        }

        try {
            return output.toJSON();
        } catch (InvalidInput error) {
            log.error(response.addError(error.getMessage()));
            return response.toString();
        }
    }

}

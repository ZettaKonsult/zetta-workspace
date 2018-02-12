package com.zetta.payment.lambda;

import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoPaymentDAO;
import com.zetta.payment.db.dynamodb.DynamoUserDAO;
import com.zetta.payment.form.Form;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.PaymentRequest;
import com.zetta.payment.pojo.Plans;
import com.zetta.payment.pojo.User;

/**
 * @date 2017-11-14
 */
public abstract class NextPayment extends LambdaHandler {
    private static final Logger log = Logger.getLogger(NextPayment.class);

    private static final DynamoPaymentDAO paymentDAO = DynamoPaymentDAO
            .instance();

    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    protected abstract Form getForm(Payment payment);

    public String nextPayment(PaymentRequest data, Context context) {

        Response response = ResponseFactory.empty();

        log.info("Received payment request:\n" + data);
        String userId = data.getUserId();

        Optional<User> maybeUser = userDAO.get(userId);
        if (!maybeUser.isPresent()) {
            log.error(response.addError("No such user: " + userId));
            return response.toString();
        }
        User user = maybeUser.get();
        log.info("Found user.");

        Plans subscription = Plans.get(user.getSubscription());
        int subscriptionAmount = subscription.getSum();
        log.info("Subscription amount: " + subscriptionAmount);

        Form form = getForm(getNextPayment(user, subscriptionAmount));

        response = ResponseFactory.success("url", form.url());

        log.info("Returning:\n" + response);
        return response.asJSON();
    }

    private Payment getNextPayment(User user, int amount) {
        String memberId = user.getSsn();
        Payment payment = null;

        do {
            payment = new Payment(memberId, amount);
        } while (paymentDAO.exists(payment));
        log.info("Found next payment to be: " + payment.getId());

        user.addPayment(payment);
        paymentDAO.save(payment);
        userDAO.save(user);
        return payment;
    }

}

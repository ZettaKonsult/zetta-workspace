package com.zetta.payment.lambda.membrum;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.db.dynamodb.DynamoUserDAO;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.lambda.SavePayment;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.User;

/**
 * @date 2017-12-08
 */
public final class MembrumSavePayment extends SavePayment {

    private static final Logger log = Logger
            .getLogger(MembrumSavePayment.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public final void membrumSavePayment(InputStream inStream,
            OutputStream outStream, Context context) {

        savePayment(inStream, outStream, context);
    }

    @Override
    protected void applyModifications(Payment payment) throws InvalidInput {
        log.info("Applying Membrum modifications to payment.");
        savePaymentToUser(payment);
    }

    private void savePaymentToUser(Payment payment) throws InvalidInput {
        String id = payment.getPaymentId();
        Optional<Order> order = orderDAO.get(id);
        if (!order.isPresent()) {
            throw new InvalidInput("No order exists with the ID " + id
                    + ", unable to save payment to user.");
        }

        String userId = order.get().getUserId();
        Optional<User> maybeUser = userDAO.get(userId);
        if (!maybeUser.isPresent()) {
            throw new InvalidInput("No such user: " + userId);
        }

        User user = maybeUser.get();
        user.addPayment(id);
        userDAO.save(user);
    }
}

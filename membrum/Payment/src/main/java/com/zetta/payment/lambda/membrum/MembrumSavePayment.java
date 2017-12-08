package com.zetta.payment.lambda.membrum;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.lambda.SavePayment;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.membrum.Order;
import com.zetta.payment.util.StringUtil;

/**
 * @date 2017-12-08
 */
public final class MembrumSavePayment extends SavePayment {

    private static final Logger log = Logger
            .getLogger(MembrumSavePayment.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public final void membrumSavePayment(InputStream inStream,
            OutputStream outStream, Context context) {

        super.savePayment(inStream, outStream, context);
    }

    @Override
    protected void applyModifications(Payment payment) {
        String orderId = payment.getOrderId();
        Optional<Order> maybeOrder = orderDAO.get(orderId);
        if (!maybeOrder.isPresent()) {
            String message = "Order " + orderId + " does not exist!";
            log.error(message);
            ResponseFactory.error(message);
            return;
        }
        Order order = maybeOrder.get();

        log.info("Received payment:\n" + payment);

        if (StringUtil.isUnset(payment.getUserId())) {
            String userId = order.getUserId();
            payment.setUserId(userId);
            log.info("Set user id to " + userId + ".");
        }
    }

}

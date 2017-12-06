package com.zetta.payment.lambda;

import java.util.Optional;

import org.apache.log4j.Logger;

import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.db.dynamodb.DynamoPlanDAO;
import com.zetta.payment.db.dynamodb.DynamoUserDAO;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;
import com.zetta.payment.util.DateUtil;

/**
 * @date 2017-12-06
 */
public abstract class OrderLambda extends LambdaHandler {

    private static final Logger log = Logger.getLogger(OrderLambda.class);

    protected static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    protected static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    protected static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    protected Optional<Order> getOrderToPay(Plan plan, User user) {
        Optional<Order> orderToPay = orderDAO.getLatest(user);

        if (!orderToPay.isPresent()) {
            log.info("No latest order found.");
            return Optional.of(createNewOrder(user, plan));
        }

        Order order = orderToPay.get();
        log.info("Found latest order:\n" + order + ".");
        if (DateUtil.compare(order.getCreated(),
                plan.currentPaymentDate()) > 0) {
            log.info("It is the applicable order.");

            if (order.getIsPaid()) {
                log.info("The order was paid.");
                return Optional.empty();
            }
            log.info("The order is not paid.");
            return Optional.of(order);
        }

        log.info("The order was not applicable.");
        return Optional.of(createNewOrder(user, plan));

    }

    private Order createNewOrder(User user, Plan plan) {
        Order order = new Order(user, plan);
        log.info("Created new order:\n" + order + ".");
        orderDAO.save(order);
        return order;
    }
}

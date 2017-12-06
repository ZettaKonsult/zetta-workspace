package com.zetta.payment.lambda;

import java.util.Optional;

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

    protected static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();
    protected static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();
    protected static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    protected Optional<Order> getOrderToPay(Plan plan, User user) {
        Optional<Order> orderToPay = orderDAO.getLatest(user);

        if (!orderToPay.isPresent()) {
            return Optional.of(createNewOrder(user, plan));
        }

        Order order = orderToPay.get();
        if (DateUtil.compare(order.getCreated(),
                plan.currentPaymentDate()) > 0) {

            if (order.getIsPaid()) {
                return Optional.empty();
            }
            return Optional.of(order);
        }

        return Optional.of(createNewOrder(user, plan));

    }

    private Order createNewOrder(User user, Plan plan) {
        Order order = new Order(user, plan);
        orderDAO.save(order);
        return order;
    }
}

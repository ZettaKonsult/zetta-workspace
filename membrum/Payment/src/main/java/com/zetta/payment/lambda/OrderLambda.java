package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamo.DynamoOrderDAO;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.JSONUtil;

/**
 * Handlers for Order management.
 * 
 * @date 2017-11-08
 */
public class OrderLambda extends Lambda {

    private static Logger log = Logger.getLogger(OrderLambda.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public void getOrder(InputStream is, OutputStream os, Context context) {
        Response response = null;

        try {
            Map<?, ?> json = JSONUtil.parseMap(is);
            log.info("Received " + json);
            String id = json.get("orderId").toString();
            log.info("Querying table for order " + id + ".");

            Optional<Order> order = orderDAO.get(id);

            if (order.isPresent()) {
                log.info("Order existed.");
                response = new Response(200,
                        JSONUtil.toString(order.get(), Order.class));
            } else {
                error(log, "Order could not be found.");
            }
        } catch (IOException e) {
            log.error("Error retrieving order: " + e.getMessage());
        }

        respond(os, response, log);
    }

    public void saveOrder(InputStream is, OutputStream os, Context context) {
        Response response = null;

        try {
            Order order = JSONUtil.parse(is, Order.class);

            if (order == null) {
                error(log, "Can not save null order.");
            } else {
                orderDAO.save(order);
                String message = "Saved order " + order.getOrderId() + ".";
                log.info(message);
                response = new Response(200, message);
            }
        } catch (IOException e) {
            error(log, "Error saving order: " + e.getMessage());
        }

        respond(os, response, log);
    }

}

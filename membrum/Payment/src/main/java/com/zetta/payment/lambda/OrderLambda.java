package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamo.DynamoOrderDAO;
import com.zetta.payment.lambda.response.Response;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;

/**
 * Handlers for Order management.
 * 
 * @date 2017-11-08
 */
public class OrderLambda extends LambdaHandler {

    private static final Logger log = Logger.getLogger(OrderLambda.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public void getOrder(InputStream is, OutputStream os, Context context) {

        try {
            Map<?, ?> json = JSONUtil.parseMap(is);
            log.info("Received " + json);
            String orderId = json.get("orderId").toString();

            log.info("Querying table for order: " + orderId + ".");
            Optional<Order> maybeOrder = orderDAO.get(orderId);

            if (maybeOrder.isPresent()) {
                log.info("Order existed.");
                new Response(200,
                        JSONUtil.toString(maybeOrder.get(), Order.class))
                                .emit(os);
                return;
            }

            Response.error("Order could not be found.").emit(os);

        } catch (IOException exception) {
            Response.error("Error retrieving order: " + exception.getMessage())
                    .emit(os);
        }
    }

    public void updateOrder(InputStream is, OutputStream os, Context context) {

        try {
            String key = Order.ORDER_ID_INDEX;
            Map<String, Object> orderMap = JSONUtil.parseMap(is);

            if (!orderMap.containsKey(key)) {
                Response.error("Can not save order without key 'no " + key
                        + "' key present.").emit(os);
                return;
            }

            String orderId = orderMap.get(key).toString();
            Optional<Order> existing = orderDAO.get(orderId);

            if (existing.isPresent()) {
                Map<String, Object> setValues = JSONUtil
                        .parseMap(existing.get(), Order.class);

                CollectionUtil.complement(orderMap, setValues);
            }

            orderDAO.save(JSONUtil.parseMap(orderMap, Order.class));
            Response.success("Saved order " + orderId).emit(os);

        } catch (IOException e) {
            Response.error("Error saving order: " + e.getMessage()).emit(os);
        }

    }

}

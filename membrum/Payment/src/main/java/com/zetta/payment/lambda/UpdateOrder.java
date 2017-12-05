package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;

/**
 * @date 2017-11-08
 */
public class UpdateOrder extends LambdaHandler {

    private static final Logger log = Logger.getLogger(UpdateOrder.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public void updateOrder(InputStream inStream, OutputStream outStream,
            Context context) {

        String key = Order.ORDER_ID_INDEX;
        Map<String, Object> orderMap = Collections.emptyMap();
        try {
            orderMap = JSONUtil.asMap(inStream);
        } catch (IOException error) {
            ResponseFactory.error("Error parsing JSON: " + error.getMessage())
                    .emit(outStream);
            return;
        }
        log.info("Received data:\n" + CollectionUtil.mapString(orderMap));

        if (!orderMap.containsKey(key)) {
            ResponseFactory.error("Can not save order without key 'no " + key
                    + "' key present.").emit(outStream);
            return;
        }

        String orderId = orderMap.get(key).toString();
        Optional<Order> existing = orderDAO.get(orderId);

        if (existing.isPresent()) {
            log.info("Order existed.");
            Map<String, Object> setValues = JSONUtil.asMap(existing.get(),
                    Order.class);

            CollectionUtil.complement(orderMap, setValues);
        }

        try {
            orderDAO.save(JSONUtil.asObject(orderMap, Order.class));
        } catch (IOException error) {
            ResponseFactory.error("Error parsing JSON: " + error.getMessage())
                    .emit(outStream);
            return;
        }
        ResponseFactory.success("Saved order " + orderId).emit(outStream);

    }

}

package com.zetta.payment.lambda;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSON;

/**
 * @date 2017-11-08
 */
public class UpdateOrder extends LambdaHandler {

    private static final Logger log = Logger.getLogger(UpdateOrder.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public void updateOrder(InputStream inStream, OutputStream outStream,
            Context context) {

        String key = Order.ORDER_ID_INDEX;
        JSON json = new JSON(inStream);

        log.info("Received data:\n" + json);

        if (!json.has(key)) {
            ResponseFactory.error("Can not save order without key 'no " + key
                    + "' key present.").emit(outStream);
            return;
        }

        String orderId = json.get(key).toString();
        Optional<Order> existing = orderDAO.get(orderId);

        if (existing.isPresent()) {
            log.info("Order existed.");
            JSON setValues = new JSON(existing.get());

            CollectionUtil.complement(json, setValues);
        }

        orderDAO.save(json.convertTo(Order.class));
        ResponseFactory.success("Saved order " + orderId).emit(outStream);

    }

}

package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamodb.DynamoOrderDAO;
import com.zetta.payment.lambda.response.ResponseFactory;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.JSONUtil;

/**
 * @date 2017-11-08
 */
public class GetOrder extends LambdaHandler {

    private static final Logger log = Logger.getLogger(GetOrder.class);

    private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

    public void getOrder(InputStream inStream, OutputStream outStream,
            Context context) {

        try {
            Map<?, ?> json = JSONUtil.asMap(inStream);
            log.info("Received " + json);
            String orderId = json.get("orderId").toString();

            log.info("Querying table for order: " + orderId + ".");
            Optional<Order> maybeOrder = orderDAO.get(orderId);

            if (maybeOrder.isPresent()) {
                log.info("Order existed.");

                ResponseFactory.success(
                        JSONUtil.prettyPrint(maybeOrder.get(), Order.class))
                        .emit(outStream);
                return;
            }

            ResponseFactory.error("Order could not be found.").emit(outStream);

        } catch (IOException error) {
            ResponseFactory
                    .error("Error retrieving order: " + error.getMessage())
                    .emit(outStream);
        }
    }

}

package com.zetta.payment.lambda;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;

import org.apache.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.db.dynamo.DynamoOrderDAO;
import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.exception.ValidationFailed;
import com.zetta.payment.pojo.Order;
import com.zetta.payment.util.JSONUtil;
import com.zetta.payment.util.URLUtil;

/**
 * Handlers for Order management.
 * 
 * @date 2017-11-08
 */
public class OrderLambda extends Lambda {

	private static Logger log = Logger.getLogger(OrderLambda.class);

	private static final DynamoOrderDAO orderDAO = DynamoOrderDAO.instance();

	public void dibsConfirmation(InputStream is, OutputStream os, Context context) {

		log.info("DIBS executed callback.");

		Map<String, String> headers = new LinkedHashMap<String, String>();
		headers.put("content-type", "*/*");

		Response response = null;
		try {
			Order order = createNewOrder(is);
			response = new Response(200, headers, "Transaction completed.");
			order.setIsPaid(true);
			saveOrder(order);
		} catch (InvalidInput | ValidationFailed e) {
			error(e.getMessage());
			response = new Response(500, headers, errorJSON(log));
		}

		log.info("Sending response:\n    " + response.toString());
		try {
			os.write(response.asJson().getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Order createNewOrder(InputStream inStream) throws ValidationFailed, InvalidInput {

		Map<String, String> parameters = URLUtil.decode(getBody(inStream));
		String status = parameters.get("statuscode");
		String orderId = parameters.get("orderid");
		Optional<Order> maybeOrder = lambdaGetOrder(orderId);

		if (status == null) {
			error("Erroneous callback format, no 'statuscode' parameter.");
		} else if (!status.equals("2")) {
			error("Transaction not completed, status code: " + status + ".");
		}

		if (!maybeOrder.isPresent()) {
			error("No order with the specified ID (" + orderId + ") exists:");
		}

		if (!hasErrors()) {
			return maybeOrder.get();
		}

		throw new ValidationFailed(errorString());
	}

	private String getBody(InputStream is) throws InvalidInput {
		try {
			Map<?, ?> json = JSONUtil.parse(is);
			log.info("Received json with parameters:\n" + JSONUtil.prettyPrint(json));

			if (!json.containsKey("body")) {
				throw new InvalidInput("No \"body\" key in object.");
			}
			return json.get("body").toString();
		} catch (IOException e) {
			throw new InvalidInput("Error parsing JSON object:\n" + e.getMessage().split("\n at")[0] + ".");
		}
	}

	private Optional<Order> lambdaGetOrder(String orderId) {
		Map<String, String> input = new LinkedHashMap<String, String>();
		input.put("orderId", orderId);

		try {
			Map<?, ?> result = callLambda("payment-prod-getOrder", JSONUtil.prettyPrint(input));

			return Optional.of(JSONUtil.parse(result, Order.class));
		} catch (IOException e) {
			error(e.getMessage());
		}
		return Optional.empty();
	}

	public void getOrder(InputStream is, OutputStream os, Context context) {
		log.info("Received " + new Scanner(is).useDelimiter("\\A").next());
		String id = "test";

		log.info("Querying table for order " + id + ".");
		Optional<Order> order = orderDAO.get(id);
		if (order.isPresent()) {
			log.info("Order existed.");
		} else {
			log.info("Order could not be found.");
		}

		log.info(order);
	}

	public void saveOrder(Order order) {

		if (order == null) {
			log.error("Can not save null order.");
			throw new IllegalArgumentException("Can not save null order.");
		}

		log.info("Saving or updating order " + order.getOrderId() + ".");
		orderDAO.save(order);
		log.info("Successfully saved order.");
	}

}

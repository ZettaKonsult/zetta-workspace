package com.zetta.payment.db.dao;

import java.util.List;
import java.util.Optional;

import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.User;

public interface OrderDAO extends DAOInterface<Order> {

    List<Order> getUnpaid(String userId);

    Optional<Order> getLatestUnpaid(User user);

    Optional<Order> getByOrderId(String orderId);

    List<Order> getByUserId(String userId);
}

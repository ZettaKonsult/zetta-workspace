package com.zetta.payment.db.dao;

import java.util.List;
import java.util.Optional;

import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;

public interface OrderDAO extends DAOInterface<Order> {

    List<Order> getAllUnpaid(User user);

    List<Order> getAllUnpaid(Plan plan, User user);

    Optional<Order> getLatestUnpaid(User user);

    Optional<Order> getByOrder(Order order);

    Optional<Order> getLatest(User user);

    List<Order> getByUser(User user);

}

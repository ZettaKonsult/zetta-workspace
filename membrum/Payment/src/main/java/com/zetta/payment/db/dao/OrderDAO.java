package com.zetta.payment.db.dao;

import java.util.List;

import com.zetta.payment.pojo.User;
import com.zetta.payment.pojo.membrum.Order;

public interface OrderDAO extends DAOInterface<Order> {

    List<Order> get(User user, String start, String end);

    List<Order> getByUser(User user);
}

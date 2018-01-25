package com.zetta.payment.db.dao;

import java.util.List;

import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.User;

/**
 * @date 2018-01-24
 */
public interface OrderDAO extends DAOInterface<Order> {

    List<Order> get(User user);

    List<Order> get(User user, long start, long end);

}

package com.zetta.payment.db.dao;

import java.util.List;

<<<<<<< HEAD
import com.zetta.payment.pojo.User;
import com.zetta.payment.pojo.membrum.Order;

public interface OrderDAO extends DAOInterface<Order> {

    List<Order> get(User user, String start, String end);

    List<Order> getByUser(User user);
=======
import com.zetta.payment.pojo.Order;
import com.zetta.payment.pojo.User;

/**
 * @date 2018-01-24
 */
public interface OrderDAO extends DAOInterface<Order> {

    List<Order> get(User user);

    List<Order> get(User user, long start, long end);
>>>>>>> stash
}

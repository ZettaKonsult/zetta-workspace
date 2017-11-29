package com.zetta.payment.db.dao;

import java.util.List;
import java.util.Optional;

import com.zetta.payment.pojo.Order;

public interface OrderDAO extends DAOInterface<Order> {

    List<Order> getUnpaid(String userId);

    Optional<Order> getLatestUnpaid(String userId);
}

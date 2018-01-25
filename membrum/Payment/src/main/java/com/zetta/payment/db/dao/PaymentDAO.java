package com.zetta.payment.db.dao;

import java.util.List;
import java.util.Optional;

import com.zetta.payment.pojo.Payment;
import com.zetta.payment.pojo.User;

/**
 * @date 2017-12-07
 */
public interface PaymentDAO extends DAOInterface<Payment> {

    Optional<Payment> getLatest(User user);

    List<Payment> get(User user);

    List<Payment> get(User user, long start, long end);

}

package com.zetta.payment.db.dao;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.zetta.payment.pojo.Payment;

/**
 * @date 2017-12-07
 */
public interface PaymentDAO extends DAOInterface<Payment> {
    Optional<Payment> get(String id, String memberId);

    List<Payment> getAll(Collection<String> ids);
}

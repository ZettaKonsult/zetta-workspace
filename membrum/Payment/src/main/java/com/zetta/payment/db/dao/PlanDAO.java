package com.zetta.payment.db.dao;

import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;

/**
 * @date 2018-01-24
 */
public interface PlanDAO extends DAOInterface<Plan> {

    void delete(User user);
}

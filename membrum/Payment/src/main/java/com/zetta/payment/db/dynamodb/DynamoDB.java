package com.zetta.payment.db.dynamodb;

import com.zetta.payment.db.dao.DAOInterface;

public abstract class DynamoDB<T> implements DAOInterface<T> {

    public final boolean exists(T element) {
        return get(element).isPresent();
    }

    public final boolean exists(String id) {
        return get(id).isPresent();
    }

}

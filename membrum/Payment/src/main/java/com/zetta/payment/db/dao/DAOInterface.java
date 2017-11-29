package com.zetta.payment.db.dao;

import java.util.List;
import java.util.Optional;

public interface DAOInterface<T> {

    List<T> getAll();

    Optional<T> get(T t);

    Optional<T> get(String id);

    void save(T t);

    void delete(String id);

    void delete(T t);
}

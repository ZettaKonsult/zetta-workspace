package com.zetta.payment.db.dynamo;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.UserDAO;
import com.zetta.payment.pojo.User;

public class DynamoUserDAO implements UserDAO {

    private static final Logger log = Logger.getLogger(DynamoUserDAO.class);
    private static final DynamoDBMapper mapper = DynamoDBManager.mapper();
    private static volatile DynamoUserDAO instance;

    private DynamoUserDAO() {}

    public static DynamoUserDAO instance() {

        if (instance == null) {
            synchronized (DynamoUserDAO.class) {
                if (instance == null)
                    instance = new DynamoUserDAO();
            }
        }
        return instance;
    }

    @Override
    public void delete(String id) {
        Optional<User> paymentToDelete = get(id);

        if (!paymentToDelete.isPresent()) {
            log.error("Unable to delete payment " + id
                    + ", no such payment exists.");
            throw new IllegalArgumentException(
                    "Unable to delete non-existent payment.");
        }

        mapper.delete(paymentToDelete);
    }

    @Override
    public void delete(User payment) {
        delete(payment.getId());
    }

    @Override
    public List<User> getAll() {
        return mapper.scan(User.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<User> get(String id) {
        User payment = mapper.load(User.class, id);
        return Optional.ofNullable(payment);
    }

    @Override
    public void save(User payment) {
        mapper.save(payment);
    }

    @Override
    public Optional<User> get(User t) {
        return get(t.getId());
    }

}

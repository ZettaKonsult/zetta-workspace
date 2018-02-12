package com.zetta.payment.db.dynamodb;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.UserDAO;
import com.zetta.payment.pojo.User;

public class DynamoUserDAO extends DynamoDB<User> implements UserDAO {

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
        Optional<User> userToDelete = get(id);

        if (!userToDelete.isPresent()) {
            log.error("Unable to delete user " + id + ", no such user exists.");
            throw new IllegalArgumentException(
                    "Unable to delete non-existent payment.");
        }

        mapper.delete(userToDelete);
    }

    @Override
    public void delete(User user) {
        delete(user.getSsn());
    }

    @Override
    public List<User> getAll() {
        return mapper.scan(User.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<User> get(String id) {
        User user = mapper.load(User.class, id);
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> get(User user) {
        return get(user.getSsn());
    }

    @Override
    public void save(User user) {
        mapper.save(user);
    }
}

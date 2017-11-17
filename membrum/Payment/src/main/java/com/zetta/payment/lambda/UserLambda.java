package com.zetta.payment.lambda;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.zetta.payment.db.dynamo.DynamoUserDAO;
import com.zetta.payment.pojo.User;

/**
 * The public functions in this class are Lambda handlers.
 * 
 * @date 2017-11-14
 */
public class UserLambda {

    private static final Logger log = Logger.getLogger(UserLambda.class);

    private static final DynamoUserDAO userDAO = DynamoUserDAO.instance();

    public Optional<User> getUser(String ssn) {

        log.info("Querying table for payment " + ssn + ".");
        Optional<User> user = userDAO.get(ssn);

        log.info("Payment "
                + (user.isPresent() ? "existed" : "could not be found") + ".");

        return user;
    }

    public List<User> getAllUsers() {
        List<User> users = userDAO.getAll();
        log.info("Received " + users.size() + " users.");
        for (User user : users) {
            log.info(user);
        }
        return users;
    }

}

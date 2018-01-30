package com.zetta.payment.db.dynamodb;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.PlanDAO;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;

public class DynamoPlanDAO extends DynamoDB<Plan> implements PlanDAO {

    private static final Logger log = Logger.getLogger(DynamoPlanDAO.class);
    private static final DynamoDBMapper mapper = DynamoDBManager.mapper();
    private static volatile DynamoPlanDAO instance;

    private DynamoPlanDAO() {}

    public static DynamoPlanDAO instance() {

        if (instance == null) {
            synchronized (DynamoPlanDAO.class) {
                if (instance == null)
                    instance = new DynamoPlanDAO();
            }
        }
        return instance;
    }

    @Override
    public void delete(String id) {
        Optional<Plan> userToDelete = get(id);

        if (!userToDelete.isPresent()) {
            log.error("Unable to delete plan " + id + ", no such user exists.");
            throw new IllegalArgumentException(
                    "Unable to delete non-existent payment.");
        }

        mapper.delete(userToDelete);
    }

    @Override
    public void delete(User user) {
        delete(user.getUserId());
    }

    @Override
    public List<Plan> getAll() {
        return mapper.scan(Plan.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Plan> get(String id) {
        Plan user = mapper.load(Plan.class, id);
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<Plan> get(Plan plan) {
        return get(plan.getId());
    }

    @Override
    public void save(Plan user) {
        mapper.save(user);
    }

    @Override
    public void delete(Plan plan) {
        delete(plan.getId());
    }
}

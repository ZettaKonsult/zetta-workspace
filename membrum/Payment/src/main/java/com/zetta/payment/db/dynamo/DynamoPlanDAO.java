package com.zetta.payment.db.dynamo;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.zetta.payment.db.DynamoDBManager;
import com.zetta.payment.db.dao.PlanDAO;
import com.zetta.payment.exception.MethodNotImplemented;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.pojo.User;

public class DynamoPlanDAO implements PlanDAO {

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
        throw new MethodNotImplemented();
    }

    @Override
    public void delete(Plan plan) {
        throw new MethodNotImplemented();
    }

    @Override
    public List<Plan> getAll() {
        throw new MethodNotImplemented();
    }

    @Override
    public Optional<Plan> get(String id) {
        return Optional.<Plan>of(new Plan("trf-standard"));
    }

    @Override
    public void save(Plan payment) {
        throw new MethodNotImplemented();
    }

    @Override
    public Optional<Plan> get(Plan plan) {
        throw new MethodNotImplemented();
    }

}

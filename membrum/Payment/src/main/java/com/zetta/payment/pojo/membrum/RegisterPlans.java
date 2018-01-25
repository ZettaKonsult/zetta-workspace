package com.zetta.payment.pojo.membrum;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngineManager;

import org.joda.time.Instant;

import com.zetta.payment.db.dynamodb.DynamoPlanDAO;
import com.zetta.payment.exception.ScriptError;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.util.FileUtil;
import com.zetta.payment.util.JSON;

/**
 * @date 2018-01-24
 */
public class RegisterPlans implements Serializable {

    private static DynamoPlanDAO planDAO = DynamoPlanDAO.instance();

    public static void main(String[] args) {
        plans = readPlans();
    }

    private static Map<String, JSON> plans;

    private static final long serialVersionUID = 5685764812092864593L;

    private ArrayList<JSON> subscriptions;

    public RegisterPlans() {}

    public RegisterPlans(List<String> ids) {
        if (ids.isEmpty()) {
            throw new IllegalArgumentException(
                    "A subscription must have a plan! No plan IDs were supplied.");
        }
        subscriptions = new ArrayList<JSON>();
        for (String id : ids) {
            if (!plans.containsKey(id)) {
                throw new IllegalArgumentException(
                        "No such id among plans: " + id + ".");
            }
            subscriptions.add(plans.get(id));
        }
    }

    public long getValidUntil() {
        int next = Integer.MAX_VALUE;
        for (JSON plan : subscriptions) {
            int intervalSize = Integer
                    .parseInt(plan.get("intervalCount").toString());
            next = (Instant.now().toDateTime().getMonthOfYear() - 1)
                    / intervalSize * intervalSize + 1 % 12;
        }
        return next;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        return string.toString();
    }

    private static Map<String, JSON> readPlans() {

        Object result = null;
        try {
            String script = "[{"
                    + FileUtil
                            .fileAsString(new File(
                                    "../Membership/dist/plan/plans.js"))
                            .split("var plans = \\[\\{")[1].split("}\\];")[0]
                    + "}];";
            result = new ScriptEngineManager().getEngineByName("nashorn")
                    .eval(script);
        } catch (Exception error) {
            System.err.println(error);
            throw new ScriptError(error);
        }

        Map<String, JSON> resultMap = new LinkedHashMap<String, JSON>();
        JSON json = new JSON(result);
        for (String arrayKey : json.keys()) {
            JSON obj = new JSON(json.get(arrayKey));
            resultMap.put(obj.get("id").toString(), obj);
        }

        for (JSON value : resultMap.values()) {
            value.move("name", "planName");
            value.move("id", "planId");
            value.move("group", "groups");
            planDAO.save(value.convertTo(Plan.class));
        }
        return resultMap;
    }

    public int getSum() {
        return subscriptions.stream()
                .mapToInt(
                        json -> Integer.parseInt(json.get("amount").toString()))
                .sum();
    }

    public List<String> idList() {
        List<String> ids = new ArrayList<String>();
        for (JSON json : subscriptions) {
            ids.add(json.get("id").toString());
        }
        return ids;
    }

}

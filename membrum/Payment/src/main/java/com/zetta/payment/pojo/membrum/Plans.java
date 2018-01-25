package com.zetta.payment.pojo.membrum;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.joda.time.Instant;

import com.zetta.payment.db.dynamodb.DynamoPlanDAO;
import com.zetta.payment.pojo.Plan;
import com.zetta.payment.util.JSON;

public class Plans {

    public static void main(String[] args) {
        System.out.println(get());
    }

    private static final DynamoPlanDAO planDAO = DynamoPlanDAO.instance();

    private static Map<String, JSON> get() {
        if (plans == null) {
            plans = planDAO.getAll().stream().collect(
                    Collectors.toMap(Plan::getPlanId, plan -> new JSON(plan)));
        }
        return plans;
    }

    private static Map<String, JSON> plans = Plans.get();

    private ArrayList<JSON> subscriptions;

    @SuppressWarnings("unused")
    private Plans() {}

    public Plans(List<String> ids) {
        if (ids.isEmpty()) {
            throw new IllegalArgumentException(
                    "A subscription must have at least one plan!"
                            + " No plan IDs were supplied.");
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
            int currentMonth = Instant.now().toDateTime().getMonthOfYear();
            int end = (currentMonth / intervalSize + 1) * intervalSize % 12;
            next = Math.min(next, end);
        }
        return next;
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

    @Override
    public String toString() {
        return idList().toString() + ": " + getSum() + ", valid until month "
                + getValidUntil() + ".";
    }

    public static Plans get(List<String> subscription) {
        return new Plans(subscription);
    }
}

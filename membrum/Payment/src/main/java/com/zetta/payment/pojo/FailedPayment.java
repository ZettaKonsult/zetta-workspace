package com.zetta.payment.pojo;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.zetta.payment.pojo.enumerations.Status;

/**
 * @date 2017-12-07
 */
@DynamoDBTable(tableName = "MembrumFailedPayments")
public class FailedPayment extends Payment implements Serializable {

    private static final long serialVersionUID = -5906357042635784734L;

    private List<String> errors;

    public FailedPayment(Payment payment, Collection<String> errors) {
        super(payment.getId(), payment.getMemberId(), payment.getCreated(),
                payment.getAmount(), Status.FAILED);

        this.errors.addAll(errors);
    }

}

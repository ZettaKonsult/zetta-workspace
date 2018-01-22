package com.zetta.payment.test.run;

import com.zetta.payment.form.TRFForm;
import com.zetta.payment.pojo.membrum.Order;

public class GenerateDIBSURL {

    public static void main(String[] args) {
        System.out.println(new TRFForm(new Order("theUsers", 1)).url());
    }

}

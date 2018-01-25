package com.zetta.payment.test.run;

import com.zetta.payment.form.TRFForm;

/**
 * @date 2018-01-22
 */
public class GenerateDIBSURL {

    public static void main(String[] args) {
        System.out.println(new TRFForm("anOrder", 1).url());
    }

}

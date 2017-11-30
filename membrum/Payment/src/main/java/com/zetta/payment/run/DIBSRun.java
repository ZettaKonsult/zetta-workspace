package com.zetta.payment.run;

import java.io.IOException;

import com.zetta.payment.form.TRFForm;
import com.zetta.payment.http.DIBSConnection;
import com.zetta.payment.pojo.Order;

public class DIBSRun {

    private static void generateURL(String orderId, int amount) {
        System.out.println(new TRFForm(new Order(orderId, amount)).url());
    }

    private static void doPost() {
        try {
            new DIBSConnection("testId", 123).connect(System.out);
        } catch (IOException e) {
            System.err.println(
                    "Could not perform DIBS payment:\n    " + e.getMessage());
        }
    }

    public static void main(String[] args) throws IOException {
        String opt = "url";
        if (args.length > 0) {
            opt = args[0];
        }

        switch (opt) {
            case "url":
                generateURL("testId", 1);
                break;
            case "post":
                doPost();
                break;
            default:
                throw new IllegalArgumentException(
                        "Option " + opt + " is undefined.");
        }
    }

}

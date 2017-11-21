package com.zetta.payment.run;

import java.io.IOException;

import com.zetta.payment.form.TRFForm;
import com.zetta.payment.http.DIBSConnection;

public class DIBSRun {

    private static void generateURL(String amount) {
        System.out.println(new TRFForm(amount).url());
    }

    private static void doPost() {
        try {
            new DIBSConnection().connect(System.out);
        } catch (IOException e) {
            System.err.println("Could not perform DIBS payment:\n    " + e.getMessage());
        }
    }

    public static void main(String[] args) throws IOException {
        String opt = "url";
        if (args.length > 0) {
            opt = args[0];
        }

        switch (opt) {
        case "url":
            generateURL("1");
            break;
        case "post":
            doPost();
            break;
        default:
            throw new IllegalArgumentException("Option " + opt + " is undefined.");
        }
    }

}

package com.zetta.payment.test.run;

import java.io.IOException;

import com.zetta.payment.http.DIBSConnect;

public class DIBSTest {

    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            System.out.println(new DIBSConnect().fullUrl());
            System.exit(0);
        }
        try {
            new DIBSConnect().doRequest("POST", System.out);
        } catch (IOException e) {
            System.err.println(
                    "Could not perform DIBS payment:\n    " + e.getMessage());
        }
    }

}

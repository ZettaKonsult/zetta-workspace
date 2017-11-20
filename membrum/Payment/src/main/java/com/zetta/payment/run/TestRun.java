package com.zetta.payment.test.run;

/**
 * Quick tests.
 *
 * @date 2017-11-09
 */
public class TestRun {

    /**
     * Run to check that class-path is setup correctly and that the
     * log4j.properties file can be found.
     * 
     * @param args non expected.
     * @throws ClassNotFoundException
     */
    public static void main(String[] args) {
        String message = "Class loaded successfully.";
        try {
            ClassLoader.getSystemClassLoader().loadClass(
                    "com.zetta.trfpayment.functions.PaymentFunctions");
        } catch (ClassNotFoundException error) {
            message = "Class not loaded successfully.";
        }
        System.out.println(message);
    }
}

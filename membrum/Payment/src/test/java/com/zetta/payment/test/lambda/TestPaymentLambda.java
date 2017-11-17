package com.zetta.payment.test.lambda;

import org.junit.Before;
import org.junit.Test;

public class TestPaymentLambda {

    @Before
    public void setUp() {

    }

    @Test
    public void approved() {
        String response = "orderid=ab46c7af%2Df11c%2D49f1%2D9347%2D9bf8c41926e9&paytype=VISA&cardprefix=471110&accepturl=https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&agreement=5599863&amount=1&callbackurl=https%3A%2F%2Fqe3bzqhdu8%2Eexecute%2Dapi%2Eeu%2Dcentral%2D1%2Eamazonaws%2Ecom%2Fprod%2Fconfirm&cancelurl=https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&currency=SEK&declineurl=https%3A%2F%2Fpayment%2Earchitrade%2Ecom%3A443%2Fpaymentweb%2Freply%2Eaction&decorator=responsive&dibsmd5=3ddfd03fabe9fc5f303c386ced10b440&flexwin_cardlogosize=1&fullreply=1&ip=90%2E230%2E140%2E171&merchant=90234620&newDIBSTransactionID=1969302122&newDIBSTransactionIDVerification=f096d189cd154e2d8ae7a8fe4081b182a2bbb531167da9267995da6d8108fb0f&originalUserAgent=Mozilla%2F5%2E0%20%28Windows%20NT%206%2E1%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F62%2E0%2E3202%2E94%20Safari%2F537%2E36&postype=ssl&test=1&textreply=1&token=6CNREZF1Z7MBYUTE60CH7B4IZ9EAQETG&uniqueoid=yes&approvalcode=123456&statuscode=2&transact=1969302122";
    }

    @Test
    public void declinedAuthorization() {
        String response = "";
    }

    @Test
    public void declinedCapture() {
        String response = "";
    }
}

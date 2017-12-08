package com.zetta.payment.lambda.membrum;

import java.io.InputStream;
import java.io.OutputStream;

import com.amazonaws.services.lambda.runtime.Context;
import com.zetta.payment.lambda.DIBSConfirm;

/**
 * @date 2017-12-08
 */
public final class MembrumDIBSConfirm extends DIBSConfirm {

    public void membrumDIBSConfirm(InputStream inStream, OutputStream outStream,
            Context context) {

        dibsConfirm("payment-prod-membrumSavePayment", inStream, outStream,
                context);
    }
}

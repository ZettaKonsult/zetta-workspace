package com.zetta.payment.pojo;

import java.io.IOException;

import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.util.CollectionUtil;
import com.zetta.payment.util.JSONUtil;

/**
 * @date 2017-12-06
 */
public final class URLResponse {

    private String providerUrl;
    private String invoiceUrl;
    private String validUntil;
    private boolean isPaid;

    public URLResponse(String providerUrl, String invoiceUrl, String validUntil,
            boolean isPaid) {

        this.providerUrl = providerUrl;
        this.invoiceUrl = invoiceUrl;
        this.validUntil = validUntil;
        this.isPaid = isPaid;
    }

    public String toJSON() throws InvalidInput {

        try {
            return JSONUtil.prettyPrint(CollectionUtil.newMap("providerUrl",
                    providerUrl, "invoiceUrl", invoiceUrl, "validUntil",
                    validUntil, "isPaid", isPaid));
        } catch (IOException error) {
            throw new InvalidInput(
                    "Error during JSON printing:\n" + error.getMessage());
        }
    }

    public String getInvoiceUrl() {
        return invoiceUrl;
    }

    public void setInvoiceUrl(String invoiceUrl) {
        this.invoiceUrl = invoiceUrl;
    }

    public boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public String getProviderUrl() {
        return providerUrl;
    }

    public void setProviderUrl(String providerUrl) {
        this.providerUrl = providerUrl;
    }

    public String getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(String validUntil) {
        this.validUntil = validUntil;
    }
}

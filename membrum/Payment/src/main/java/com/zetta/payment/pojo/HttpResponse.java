package com.zetta.payment.pojo;

/**
 * @date 2017-12-06
 */
public final class HttpResponse {

    private String providerUrl;
    private String invoiceUrl;
    private long validUntil;
    private boolean isPaid;

    public HttpResponse(String providerUrl, String invoiceUrl, long validUntil,
            boolean isPaid) {

        this.providerUrl = providerUrl;
        this.invoiceUrl = invoiceUrl;
        this.validUntil = validUntil;
        this.isPaid = isPaid;
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

    public long getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(long validUntil) {
        this.validUntil = validUntil;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("Provider url: " + providerUrl);
        string.append("\nInvoice url:  " + invoiceUrl);
        string.append("\nValid until:  " + validUntil);
        string.append("\nPaid:         " + (isPaid ? "yes" : "no"));
        return string.toString();
    }
}

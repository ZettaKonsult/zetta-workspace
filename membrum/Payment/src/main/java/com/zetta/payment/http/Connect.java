package com.zetta.payment.http;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;

public interface Connect {

    String url();

    String fullUrl();

    HttpURLConnection constructRequest(String urlString, String method)
            throws IOException;

    void doRequest(String type, OutputStream outStream) throws IOException;

}

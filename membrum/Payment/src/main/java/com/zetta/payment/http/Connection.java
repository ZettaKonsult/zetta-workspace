package com.zetta.payment.http;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;

public interface Connection {

    HttpURLConnection constructRequest(String type) throws IOException;

    void doRequest(String method, byte[] data, OutputStream outStream) throws IOException;

    void doRequest(HttpURLConnection http, byte[] data, OutputStream outStream) throws IOException;

    String url();

}

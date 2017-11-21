package com.zetta.payment.http;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public abstract class HTTPConnection implements Connection {
    private static final String CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

    @Override
    public HttpURLConnection constructRequest(String method) throws IOException {
        HttpURLConnection http = (HttpURLConnection) new URL(url()).openConnection();

        http.setDoOutput(true);
        http.setRequestMethod(method);
        http.setRequestProperty("Content-Type", CONTENT_TYPE);

        return http;
    }

    @Override
    public void doRequest(String method, byte[] data, OutputStream outStream) throws IOException {
        doRequest(constructRequest(method), data, outStream);
    }

    @Override
    public final void doRequest(HttpURLConnection http, byte[] data, OutputStream outStream) throws IOException {
        int length = data.length;

        http.setFixedLengthStreamingMode(length);
        http.connect();
        http.getOutputStream().write(data);

        if (outStream != null) {
            printInput(outStream, http.getInputStream());
        }
    }

    protected final void printInput(OutputStream os, InputStream is) throws IOException {

        Scanner baseScanner = new Scanner(is);
        Scanner scanner = baseScanner.useDelimiter("\\r?\\n");

        while (scanner.hasNext()) {
            os.write((scanner.next() + "\n").getBytes());
        }

        is.close();
        scanner.close();
        baseScanner.close();
    }

    @Override
    public abstract String url();
}

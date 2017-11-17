package com.zetta.payment.http;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import com.zetta.payment.form.Form;

public abstract class AbstractConnect implements Connect {

    private static final String CONTENT_TYPE = "application/x-www-form-"
            + "urlencoded; charset=UTF-8";

    protected Form form = constructForm();

    public abstract Form constructForm();

    @Override
    public final HttpURLConnection constructRequest(String urlString,
            String method) throws IOException {

        HttpURLConnection http = (HttpURLConnection) new URL(urlString)
                .openConnection();

        http.setDoOutput(true);
        http.setRequestMethod(method);
        http.setRequestProperty("Content-Type", CONTENT_TYPE);

        return http;
    }

    @Override
    public String fullUrl() {
        try {
            return url() + "?" + form.url();
        } catch (UnsupportedEncodingException e) {
            throw new IllegalStateException(
                    "Incorrect form setup:\n    " + e.getMessage());
        }
    }

    @Override
    public void doRequest(String type, OutputStream outStream)
            throws IOException {

        HttpURLConnection http = constructRequest(url(), type);

        byte[] out = form.bytes();
        int length = out.length;

        http.setFixedLengthStreamingMode(length);
        http.connect();
        http.getOutputStream().write(out);

        if (outStream != null) {
            printInput(outStream, http.getInputStream());
        }
    }

    protected void printInput(OutputStream os, InputStream is)
            throws IOException {

        Scanner baseScanner = new Scanner(is);
        Scanner scanner = baseScanner.useDelimiter("\\r?\\n");

        while (scanner.hasNext()) {
            os.write((scanner.next() + "\n").getBytes());
        }

        is.close();
        scanner.close();
        baseScanner.close();
    }

}

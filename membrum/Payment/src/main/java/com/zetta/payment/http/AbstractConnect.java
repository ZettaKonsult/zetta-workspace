package com.zetta.payment.http;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import com.zetta.payment.form.Form;

public abstract class AbstractConnect implements Connect {

    protected abstract Form constructForm();

    protected void emit(HttpURLConnection http, Form form) throws IOException {
        emit(http, form, false);
    }

    protected void emit(HttpURLConnection http, Form form, boolean receiveInput)
            throws IOException {

        byte[] out = form.bytes();
        int length = out.length;

        http.setFixedLengthStreamingMode(length);
        http.setRequestProperty("Content-Type",
                "application/x-www-form-urlencoded; charset=UTF-8");
        http.connect();
        try (OutputStream os = http.getOutputStream()) {
            os.write(out);
        } catch (Exception ioe) {
            ioe.printStackTrace();
        }

        if (receiveInput) {
            printInput(System.out, http.getInputStream());
        }
    }

    protected void printInput(OutputStream os, InputStream is)
            throws IOException {

        Scanner baseScanner = new Scanner(is);
        Scanner scanner = baseScanner.useDelimiter("\\r?\\n");

        while (scanner.hasNext()) {
            os.write(scanner.next().getBytes());
        }

        is.close();
        scanner.close();
        baseScanner.close();
    }

    protected final HttpURLConnection constructRequest(String urlString,
            String method) throws IOException {

        HttpURLConnection http = (HttpURLConnection) new URL(urlString)
                .openConnection();

        http.setRequestMethod(method);
        http.setDoOutput(true);
        return http;
    }
}

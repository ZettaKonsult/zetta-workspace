package com.zetta.payment.test.run;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.UUID;

import com.zetta.payment.form.Form;
import com.zetta.payment.form.TRFForm;

public class DIBSConnect {
    public static void main(String[] args) throws IOException {
        URL url = new URL(
                "https://payment.architrade.com/paymentweb/start.action");
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection) con;
        http.setRequestMethod("POST");
        http.setDoOutput(true);

        Map<String, String> values = new LinkedHashMap<String, String>();
        values.put("accepturl",
                "https://9rwnktf427.execute-api.eu-central-1.amazonaws.com/prod/confirm");
        values.put("callbackurl",
                "https://90.230.140.171");
        values.put("cancelurl",
                "https://9rwnktf427.execute-api.eu-central-1.amazonaws.com/prod/confirm");
        values.put("amount", "1");
        values.put("merchant", "90234620");
        values.put("cancelurl", "");
        values.put("currency", "SEK");
        values.put("orderid", UUID.randomUUID().toString());

        Form form = new TRFForm();
        form.fillForm(values);

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

        InputStream is = http.getInputStream();
        Scanner scanner = new Scanner(is).useDelimiter("\\r?\\n");

        while (scanner.hasNext()) {
            System.out.println(scanner.next());
        }
        is.close();
        scanner.close();
    }
}

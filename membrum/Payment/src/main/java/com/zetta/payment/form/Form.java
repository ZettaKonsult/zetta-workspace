package com.zetta.payment.form;

import java.io.UnsupportedEncodingException;
import java.util.Map;

/**
 * @date 2017-11-10
 */
public interface Form {

    String[] names();

    String get(String name);

    void set(String name, String value);

    int size();

    void fill(Map<String, String> values);

    void fill(String[] names, String[] values);

    String asJSON();

    String baseUrl();

    String url();

    String urlParameters() throws UnsupportedEncodingException;

    Map<String, String> presetValues();

    boolean complete();

    String invoiceUrl();

}

package com.zetta.payment.form;

import java.io.UnsupportedEncodingException;
import java.util.Map;

public interface Form {

    String[] names();

    String get(String name);

    void set(String name, String value);

    int size();

    void fill(Map<String, String> values);

    void fill(String[] names, String[] values);

    String asJSon();

    byte[] bytes() throws UnsupportedEncodingException;

    String url() throws UnsupportedEncodingException;

}

package com.zetta.payment.form;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringJoiner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class BasicForm implements Form, Serializable {

    private static final long serialVersionUID = -2131454852375863135L;
    private Map<String, String> values;

    protected BasicForm(String... names) {
        this.values = new LinkedHashMap<String, String>();
        for (String name : names()) {
            values.put(name, "");
        }
        for (Map.Entry<String, String> entry : presetValues().entrySet()) {
            set(entry.getKey(), entry.getValue());
        }
    }

    @Override
    public abstract String[] names();

    @Override
    public abstract Map<String, String> presetValues();

    @Override
    public String get(String name) {
        return values.get(name);
    }

    @Override
    public void set(String name, String value) {
        if (!values.containsKey(name)) {
            throw new IllegalArgumentException("Could not set tag '" + name + "', it does not exist in the form.");
        }
        values.put(name, value);
    }

    @Override
    public void fill(Map<String, String> values) {
        for (Map.Entry<String, String> preset : values.entrySet()) {
            set(preset.getKey(), preset.getValue());
        }
    }

    @Override
    public void fill(String[] names, String[] values) {
        for (int i = 0; i < names.length; ++i) {
            set(names[i], values[i]);
        }
    }

    @Override
    public String asJSon() {
        String json = "";
        try {
            json = new ObjectMapper().writeValueAsString(this.values);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

    @Override
    public byte[] bytes() throws UnsupportedEncodingException {
        return url().getBytes();
    }

    @Override
    public String urlParameters() throws UnsupportedEncodingException {
        StringJoiner sj = new StringJoiner("&");
        for (Map.Entry<String, String> entry : values.entrySet()) {
            sj.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "=" + URLEncoder.encode(entry.getValue(), "UTF-8"));
        }
        return sj.toString();
    }

    @Override
    public String url() {
        try {
            return baseUrl() + "?" + urlParameters();
        } catch (UnsupportedEncodingException e) {
            throw new IllegalStateException("Incorrect form setup:\n    " + e.getMessage());
        }
    }

    @Override
    public int size() {
        return values.size();
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder("{");
        String prefix = "\n";

        for (Map.Entry<String, String> pair : values.entrySet()) {
            String value = pair.getValue();
            string.append(prefix + "    " + pair.getKey() + ": " + (value.equals("") ? "<empty>" : value));
            prefix = ",\n";
        }
        return string.append(prefix.replaceAll(",", "") + "}").toString();
    }
}

package com.zetta.payment.form;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringJoiner;

import com.zetta.payment.util.JSON;

/**
 * @date 2017-11-10
 */
public abstract class BasicForm implements Form, Serializable {

    private static final long serialVersionUID = -2131454852375863135L;
    private Map<String, String> fields;

    public final Map<String, String> asMap() {
        return new LinkedHashMap<String, String>(fields);
    }

    protected BasicForm(String... names) {
        this.fields = new LinkedHashMap<String, String>();
        for (String name : names()) {
            fields.put(name, "");
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
    public final String get(String name) {
        return fields.get(name);
    }

    @Override
    public final void set(String name, String value) {
        if (!fields.containsKey(name)) {
            throw new IllegalArgumentException("Could not set tag '" + name
                    + "', it does not exist in the form.");
        }
        fields.put(name, value);
    }

    @Override
    public final int size() {
        return fields.size();
    }

    @Override
    public final boolean complete() {
        for (String value : fields.values()) {
            if (value == null || value.equals("")) {
                return false;
            }
        }
        return true;
    }

    @Override
    public final void fill(Map<String, String> values) {
        for (Map.Entry<String, String> preset : values.entrySet()) {
            set(preset.getKey(), preset.getValue());
        }
    }

    @Override
    public final void fill(String[] names, String[] values) {
        for (int i = 0; i < names.length; ++i) {
            set(names[i], values[i]);
        }
    }

    @Override
    public final String urlParameters() throws UnsupportedEncodingException {
        StringJoiner sj = new StringJoiner("&");
        for (Map.Entry<String, String> entry : fields.entrySet()) {
            sj.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "="
                    + URLEncoder.encode(entry.getValue(), "UTF-8"));
        }
        return sj.toString();
    }

    @Override
    public final String url() {
        try {
            return baseUrl() + "?" + urlParameters();
        } catch (UnsupportedEncodingException error) {
            throw new IllegalStateException(
                    "Incorrect form setup:\n    " + error.getMessage());
        }
    }

    @Override
    public final String asJSON() {
        return JSON.prettyPrint(fields);

    }

    @Override
    public final String toString() {
        StringBuilder string = new StringBuilder("{");
        String prefix = "\n";

        for (Map.Entry<String, String> pair : fields.entrySet()) {
            String value = pair.getValue();
            string.append(prefix + "    " + pair.getKey() + ": "
                    + (value.equals("") ? "<empty>" : value));
            prefix = ",\n";
        }
        return string.append(prefix.replaceAll(",", "") + "}").toString();
    }
}

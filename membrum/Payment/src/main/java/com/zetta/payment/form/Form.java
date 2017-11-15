package com.zetta.payment.form;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class Form implements Serializable {

    private static final long serialVersionUID = -2131454852375863135L;
    private Map<String, String> values;

    protected Form(String... names) {
        this.values = new LinkedHashMap<String, String>();
        for (String name : formNames()) {
            values.put(name, "");
        }
        fillForm(presetValues());
    }

    protected abstract String[] formNames();

    protected abstract Map<String, String> presetValues();

    public void fillForm(Map<String, String> values) {
        for (Map.Entry<String, String> preset : values.entrySet()) {
            enterValue(preset.getKey(), preset.getValue());
        }
    }

    public void fillForm(String[] names, String[] values) {
        for (int i = 0; i < names.length; ++i) {
            enterValue(names[i], values[i]);
        }
    }

    public void enterValue(String name, String value) {
        if (!values.containsKey(name)) {
            throw new IllegalArgumentException("Could not set tag '" + name
                    + "', it does not exist in the form.");
        }
        values.put(name, value);
    }

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
    public String toString() {
        StringBuilder string = new StringBuilder("{");
        String prefix = "";

        for (Map.Entry<String, String> pair : values.entrySet()) {
            string.append(
                    prefix + "\n    " + pair.getKey() + ": " + pair.getValue());
            prefix = ",";
        }
        return string.append("}").toString();
    }

}

package com.zetta.payment.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import com.zetta.payment.exception.ProcessFail;

/**
 * @date 2017-11-29
 */
public class ProcessUtil {

    public enum Engine {
        JAVASCRIPT("JavaScript"), NASHORN("nashorn");

        private String name;

        private Engine(String name) {
            this.name = name;
        }

        public String scriptName() {
            return name;
        }
    }

    private ProcessUtil() {}

    public static Object execute(Engine engine, File file, String functionName,
            Object... args) throws ProcessFail {

        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine scriptEngine = manager
                .getEngineByName(engine.scriptName());

        try {
            scriptEngine.eval(Files.newBufferedReader(
                    Paths.get(file.getAbsolutePath()), StandardCharsets.UTF_8));

            return ((Invocable) scriptEngine).invokeFunction(functionName,
                    args);

        } catch (IOException | NoSuchMethodException | ScriptException e) {
            throw new ProcessFail(e);
        }

    }
}

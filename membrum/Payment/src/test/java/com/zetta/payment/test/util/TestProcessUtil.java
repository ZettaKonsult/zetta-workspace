package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import java.io.File;

import org.junit.Test;

import com.zetta.payment.exception.ProcessFail;
import com.zetta.payment.util.ProcessUtil;
import com.zetta.payment.util.ProcessUtil.Engine;

public class TestProcessUtil {

    @Test
    public void javascriptProcess() throws ProcessFail {
        assertEquals("true",
                ProcessUtil.execute(Engine.NASHORN,
                        new File("src/main/resources/testScript.js"),
                        "checkPlan", "testId").toString());
    }
}

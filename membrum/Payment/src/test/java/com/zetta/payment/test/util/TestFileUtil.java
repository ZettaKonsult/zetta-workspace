package com.zetta.payment.test.util;

import static org.junit.Assert.assertEquals;

import java.io.File;
import java.io.IOException;

import org.junit.Test;

import com.zetta.payment.util.FileUtil;

public class TestFileUtil {

    @Test
    public void fileAsString() throws IOException {
        assertEquals(
                "Some text.\r\n" + "Some more text.\r\n" + "\r\n"
                        + "Another piece of text.",
                FileUtil.fileAsString(
                        new File("src/test/resources/mocks/testFile.txt")));
    }
}

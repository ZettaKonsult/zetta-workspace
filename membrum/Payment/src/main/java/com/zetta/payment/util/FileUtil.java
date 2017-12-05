package com.zetta.payment.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.apache.commons.codec.Charsets;

/**
 * @date 2017-11-18
 */
public final class FileUtil {
    private static final Charset DEFAULT_CHAR_SET = Charsets.UTF_8;

    public static String fileAsString(File file) throws IOException {
        return new String(Files.readAllBytes(Paths.get(file.getAbsolutePath())),
                DEFAULT_CHAR_SET);
    }

}

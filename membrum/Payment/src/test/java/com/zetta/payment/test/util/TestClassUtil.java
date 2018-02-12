package com.zetta.payment.test.util;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.zetta.payment.util.ClassUtil;

public class TestClassUtil {

    private class Mock {}

    private class SubMock extends Mock {}

    @Test
    public void correctSub() {
        assertTrue(ClassUtil.isSubClass(SubMock.class, Mock.class));
    }

    @Test
    public void incorrectSub() {
        assertFalse(ClassUtil.isSubClass(Mock.class, SubMock.class));
    }

    @Test
    public void sameSub() {
        assertFalse(ClassUtil.isSubClass(Mock.class, Mock.class));
    }
}

package com.zetta.payment.util;

public final class ClassUtil {

    private ClassUtil() {}

    public static boolean isSubClass(Class<?> subClass, Class<?> superClass) {
        return !(subClass.equals(superClass))
                && superClass.isAssignableFrom(subClass);
    }

    public static boolean isSubClass(Object sub, Class<?> superClass) {
        return isSubClass(sub.getClass(), superClass);
    }
}

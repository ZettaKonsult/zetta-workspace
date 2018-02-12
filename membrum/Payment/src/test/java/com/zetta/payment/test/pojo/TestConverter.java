package com.zetta.payment.test.pojo;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.zetta.payment.exception.InvalidInput;
import com.zetta.payment.pojo.Transferred;
import com.zetta.payment.pojo.enumerations.Converter;
import com.zetta.payment.pojo.enumerations.Converter.TransferredConverter;

public class TestConverter {

    private Converter<Transferred> converter;

    @Before
    public void setUp() {
        this.converter = new TransferredConverter();
    }

    @Test
    public void transferredConvert() throws InvalidInput {
        assertEquals(
                "{\r\n" + "  \"from\" : \"here\",\r\n"
                        + "  \"to\" : \"there\"\r\n" + "}",
                converter.convert(new Transferred("here", "there")));
    }

    @Test
    public void transferredUnconvert() throws InvalidInput {
        Transferred reference = new Transferred("here", "there");
        Transferred value = converter
                .unconvert("{\r\n" + "  \"from\" : \"here\",\r\n"
                        + "  \"to\" : \"there\"\r\n" + "}");
        assertEquals(reference.getFrom(), value.getFrom());
        assertEquals(reference.getTo(), value.getTo());
    }
}

package com.cf.framework.pi.convertor.date;

import com.cf.framework.pi.api.AbstractConvertor;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateToStringConvertor extends AbstractConvertor {

    private String pattern = "yyyy-MM-dd HH:mm:ss";

    public DateToStringConvertor() {
    }

    public DateToStringConvertor(String pattern) {
        this.pattern = pattern;
    }

    @Override
    protected Object convert(Object record) throws Exception {
        Date date;
        if (record instanceof Date) {
            date = (Date) record;
        } else {
            throw new RuntimeException("record element Expected. Got - " + record.getClass());
        }
        return new SimpleDateFormat(pattern).format(date);
    }
}

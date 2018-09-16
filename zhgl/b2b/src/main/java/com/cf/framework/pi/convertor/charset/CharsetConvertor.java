package com.cf.framework.pi.convertor.charset;

import java.nio.charset.Charset;

import org.springframework.util.Base64Utils;

import com.cf.framework.pi.api.AbstractConvertor;
import com.cf.framework.pi.util.StringCoding;

public class CharsetConvertor extends AbstractConvertor {

    private String enc = "UTF-8";

    public CharsetConvertor() {
    }

    public CharsetConvertor(String enc) {
        this.enc = enc;
    }

    @Override
    protected Object convert(Object record) throws Exception {
        String data;
        if (record instanceof String) {
            data = (String) record;
        } else {
            throw new RuntimeException("record element Expected. Got - " + record.getClass());
        }
        return encode(data.toCharArray());
    }

    private Object encode(char[] data) throws Exception {
        return new String(data);//TODO:jdk1.7 new String(StringCoding.encode(enc, data, 0, data.length), enc);
    }
}

package com.cf.framework.pi.convertor.json;

import com.cf.framework.pi.api.AbstractConvertor;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JsonToStringConvertor extends AbstractConvertor {

    @Override
    protected Object convert(Object record) throws Exception {
        String result;
        if (record instanceof JSONObject) {
            result = ((JSONObject) record).toString();
        } else if (record instanceof JSONArray) {
            result = ((JSONArray) record).toString();
        } else {
            throw new RuntimeException("record element Expected. Got - " + record.getClass());
        }
        return result;
    }
}

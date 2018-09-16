package com.cf.framework.pi.convertor.list;

import com.cf.framework.dataset.XmlDataSetWrapper;
import com.cf.framework.pi.api.AbstractConvertor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ListToDataSetConvertor extends AbstractConvertor {

    private String configKey = null;

    public ListToDataSetConvertor(String key) {
        this.configKey = key;
    }

    @Override
    protected Object convert(Object record) throws Exception {
        List rows;
        if (record instanceof Map) {
            rows = new ArrayList();
            rows.add(record);
        } else if (record instanceof List) {
            rows = (List) record;
        } else {
            throw new RuntimeException("record element Expected. Got - " + record.getClass());
        }
        return new XmlDataSetWrapper(rows, configKey).convert();
    }
}

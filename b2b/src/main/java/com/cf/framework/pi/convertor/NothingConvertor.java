package com.cf.framework.pi.convertor;

import com.cf.framework.pi.api.AbstractConvertor;

public class NothingConvertor extends AbstractConvertor {

    @Override
    protected Object convert(Object record) throws Exception {
        return record;
    }
}

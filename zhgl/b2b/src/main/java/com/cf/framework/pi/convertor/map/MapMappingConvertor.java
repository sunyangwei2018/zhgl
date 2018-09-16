package com.cf.framework.pi.convertor.map;

import com.cf.framework.pi.api.AbstractConvertor;
import com.cf.framework.pi.util.Untils;
import com.cf.utils.config.Config;
import com.cf.utils.config.Field;
import com.cf.utils.config.JKConfig;

import java.util.*;

public class MapMappingConvertor extends AbstractConvertor {

    private String configKey = null;

    public MapMappingConvertor(String configKey) {
        this.configKey = configKey;
    }

    @Override
    protected Object convert(Object record) throws Exception {
        if (configKey == null) {
            throw new Exception("Null configKey not permitted.");
        }

        if (!(record instanceof Map)) {
            throw new RuntimeException("record element Expected. Got - " + record.getClass());
        }

        Config config = JKConfig.getConfig(configKey);
        return mapping((Map) record, config);
    }

    private Object mapping(Map record, Config config) throws Exception {
        Object o;
        Field field;
        Map row = new HashMap();
        List fields = config.getFields();
        for (Iterator it = fields.iterator(); it.hasNext();) {
            o = it.next();
            if (o instanceof Config) {
                Object value = record.get(((Config) o).getId());
                if (value instanceof Map) {
                    row.put(isNull(((Config) o).getTarget(), ((Config) o).getId()), mapping((Map) value, (Config) o));
                } else if (value instanceof List) {
                    List result = new ArrayList();
                    for (Object data : (List) value) {
                        result.add(mapping((Map) data, (Config) o));
                    }
                    row.put(isNull(((Config) o).getTarget(), ((Config) o).getId()), result);
                }
            } else if (o instanceof Field) {
                field = (Field) o;
                Object value = record.get(field.getAttrname());
                if (value != null) {
                    if (field.getConvertor() != null) {
                        value = field.getConvertor().process(value);
                    }
                    row.put(isNull(field.getTarget(), field.getAttrname()), value);
                }
            }
        }
        return row;
    }

    private Object isNull(Object value, Object defaultValue) {
        if (value instanceof String) {
            return !Untils.isEmpty(value.toString()) ? value : defaultValue;
        } else {
            return (value != null) ? value : defaultValue;
        }
    }
}

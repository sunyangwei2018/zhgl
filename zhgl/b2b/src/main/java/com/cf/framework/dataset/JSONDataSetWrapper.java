package com.cf.framework.dataset;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JSONDataSetWrapper implements IDataSetWrapper {

	private List rows;
	private String[] fields;
	private final String Type = "JSON";

	public JSONDataSetWrapper(List rows) {
		this(rows, null);
	}

	public JSONDataSetWrapper(List rows, String[] fields) {
		this.rows = rows;
		this.fields = fields;
	}

	public String convert() {
		return toJson();
	}

	private String toJson() {
		// 如果存在有效的 fields 对象，则进行字段过滤
		if (null != fields && 0 < fields.length) {
			List list = new ArrayList();
			Map map = null, row = null;
			for (Object obj : rows) {
				map = (Map) obj;
				row = null;
				for (String field : fields) {
					field = field.trim();
					if (map.containsKey(field)) {
						if (null == row) {
							row = new HashMap();
						}
						row.put(field, map.get(field));
					}
				}
				if (null != row) {
					list.add(row);
				}
			}
			if (null != list && 0 < list.size()) {
				return JSONArray.fromObject(list).toString();
			} else {
				return null;
			}
		} else {
			return JSONArray.fromObject(rows).toString();
		}
	}

	public String getType() {
		return Type;
	}
}

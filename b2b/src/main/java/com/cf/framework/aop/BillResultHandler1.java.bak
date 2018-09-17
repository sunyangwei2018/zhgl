package com.cf.framework.aop;

import com.cf.framework.dataset.JSONDataSetWrapper;
import com.cf.framework.dataset.XmlDataSetWrapper;

import java.io.PrintWriter;
import java.util.Map;

import org.apache.ibatis.session.ResultContext;

public class BillResultHandler extends JlResultHandler {

	private String[] fields;

	public BillResultHandler(PrintWriter pw, String configKey, boolean isJson) {
        this(pw, configKey, isJson, null);
    }

    public BillResultHandler(PrintWriter pw, String configKey, boolean isJson, String[] fields) {
        super(pw, configKey, isJson);
        this.fields = fields;
    }

    @Override
    public void handleResult(ResultContext context) {
        Map map = (Map) context.getResultObject();
        if (map != null) {
            map.put("JLID", jlid++);
            data.add(map);
        }
    }

    @Override
    public void Post() {
        String xmlorjson = null;
        if (isJson) {
            xmlorjson = new JSONDataSetWrapper(data, fields).convert();
            pw.print(toJson("json", xmlorjson, false, false, fileName));
        } else {
            xmlorjson = new XmlDataSetWrapper(data, configKey).convert();
            pw.print(toJson("xml", xmlorjson.getBytes().toString(), false, false, fileName));
        }
        pw.close();
    }

	@Override
	public void setPagesize(int pagesize) {
		// TODO Auto-generated method stub
		
	}
}

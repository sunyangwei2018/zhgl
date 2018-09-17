package com.cf.framework.aop;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cf.framework.dataset.JSONDataSetWrapper;
import com.cf.framework.dataset.XmlDataSetWrapper;
import com.cf.utils.JLTools;
import com.cf.utils.PropertiesReader;

import org.apache.ibatis.session.ResultContext;

public class MongoResultHandler extends JlResultHandler {

    private int pagesize = Integer.parseInt(PropertiesReader.getInstance().getProperty("PAGESIZE"));
    private int pagecount = 1;
	private String[] fields;

    public MongoResultHandler(PrintWriter pw, String configKey, boolean isJson, String[] fields) {
        super(pw, configKey, isJson);
        this.fields = fields;
    }

    @Override
    public void Post() {
        String xmlorjson = null;
        int dataLen= (int)Math.ceil(((double)data.size())/((double)pagesize));
        if(dataLen <= 0){
        	xmlorjson = new JSONDataSetWrapper(data ,fields).convert();
			pw.print(toJson("json", xmlorjson, false, false, fileName));
        }else {
        	try {
				JLTools.sendToSync(String.valueOf(dataLen), PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
								+ fileName + "-LASTPAGE.xml");
				JLTools.sendToSync(String.valueOf(data.size()), PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
								+ fileName + "-DATASIZE.xml");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	for(int i=0;i<dataLen;i++){
        		int min=pagesize*i;
        		int max=pagesize*(i+1)>=data.size()?data.size():pagesize*(i+1);
        		List pageList=data.subList(min, max);
        		if(pagecount == 1){
        			// 向客户端抛出第一页数据
        			if (isJson) {
        				xmlorjson = new JSONDataSetWrapper(pageList ,fields).convert();
        				pw.print(toJson("json", xmlorjson, false, false, fileName));
        			} else {
        				xmlorjson = new XmlDataSetWrapper(pageList, configKey, true).convert();
        				pw.print(toJson("xml", xmlorjson.getBytes().toString(), false, false, fileName));
        			}

        			try {
        				JLTools.sendToSync(xmlorjson,
        						PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
        								+ fileName + "-" + pagecount + ".xml");
        			} catch (Exception e) {
        				e.printStackTrace();
        			}

        			pw.close();
        		} else if (pagecount>1) {
        			if (isJson) {
        				xmlorjson = new JSONDataSetWrapper(pageList ,fields).convert();
        			} else {
        				xmlorjson = new XmlDataSetWrapper(pageList, configKey, true).convert();
        			}
        			try {
        				JLTools.sendToSync(xmlorjson,
        						PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
        								+ fileName + "-" + pagecount + ".xml");
        			} catch (Exception e) {
        				e.printStackTrace();
        			}
        		}
        		pagecount++;
        	}
		}
    }

	@Override
	public void handleResult(ResultContext arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setPagesize(int pagesize) {
		// TODO Auto-generated method stub
		
	}
}

package com.cf.framework.aop;

import java.io.PrintWriter;
import java.util.Map;

import com.cf.framework.dataset.JSONDataSetWrapper;
import com.cf.framework.dataset.XmlDataSetWrapper;
import com.cf.utils.JLTools;
import com.cf.utils.PropertiesReader;

import org.apache.ibatis.session.ResultContext;

public class ReportResultHandler extends JlResultHandler {

    private int pagesize = Integer.parseInt(PropertiesReader.getInstance().getProperty("PAGESIZE"));
    private int maxpage = Integer.parseInt(PropertiesReader.getInstance().getProperty("MAXPAGE"));
    private int pagecount = 1;

    private String[] fields;

    public ReportResultHandler(PrintWriter pw, String configKey, boolean isJson) {
        this(pw, configKey, isJson, null);
    }

    public ReportResultHandler(PrintWriter pw, String configKey, boolean isJson, String[] fields) {
        super(pw, configKey, isJson);
        this.fields = fields;
    }

    @Override
    public void handleResult(ResultContext context) {
        Map map = (Map) context.getResultObject();
        if (map != null && pagecount <= maxpage) {
            map.put("JLID", jlid++);
            data.add(map);
            try {
                xmlToFile();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void Post() {
        String xmlorjson = null;
        if (pagecount == 1) {
            // 向客户端抛出第一页数据
            if (isJson) {
                xmlorjson = new JSONDataSetWrapper(data, fields).convert();
                pw.print(toJson("json", xmlorjson, false, false, fileName));
            } else {
                xmlorjson = new XmlDataSetWrapper(data, configKey, true).convert();
                pw.print(toJson("xml", xmlorjson.getBytes().toString(), false, false, fileName));
            }
            try {
            	JLTools.sendToSync(xmlorjson,PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
            			+ fileName + "-" + pagecount + ".xml");
              	JLTools.sendToSync(String.valueOf(pagecount),PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
              			+ fileName + "-LASTPAGE.xml");
              	JLTools.sendToSync(String.valueOf(data.size()),PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
                		+ fileName + "-DATASIZE.xml");
            } catch (Exception e) {
            	e.printStackTrace();
	        }
            pw.close();
        } else if ((pagecount > 1)
                && ((data.size() > 0) && (data.size() < pagesize)) && (pagecount<=maxpage)) {
            if (isJson) {
                xmlorjson = new JSONDataSetWrapper(data, fields).convert();
            } else {
                xmlorjson = new XmlDataSetWrapper(data, configKey, true).convert();
            }
            // 向文件服务器存储最后一页数据
            try {
            	JLTools.sendToSync(xmlorjson,PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
                        + fileName + "-" + pagecount + ".xml");
                JLTools.sendToSync(String.valueOf(pagecount),PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
                		+ fileName + "-LASTPAGE.xml");
                JLTools.sendToSync(String.valueOf(data.size()+(pagecount-1)*pagesize),PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
                		+ fileName + "-DATASIZE.xml");
            } catch (Exception e) {
                e.printStackTrace();
            }
            data.clear();
        } else if (pagecount > 1 && data.size()==0){
        	try {
                JLTools.sendToSync(String.valueOf(pagecount-1),PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
                		+ fileName + "-LASTPAGE.xml");
                JLTools.sendToSync(String.valueOf(data.size()+(pagecount-1)*pagesize),PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP") + "?filename="
                		+ fileName + "-DATASIZE.xml");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void xmlToFile() throws Exception {
        if (data.size() == pagesize) {
            String xmlorjson = null;
            if (isJson) {
                xmlorjson = new JSONDataSetWrapper(data, fields).convert();
            } else {
                xmlorjson = new XmlDataSetWrapper(data, configKey, true).convert();
            }
            if (pagecount == 1) {
                // 向客户端抛出第一页数据
                if (isJson) {
                    pw.print(toJson("json", xmlorjson, false, true, fileName));
                } else {
                    pw.print(toJson("xml", xmlorjson.getBytes().toString(), false, true, fileName));
                }
                pw.close();
            }
            // 向文件服务器存储第一页数据
            JLTools.sendToSync(xmlorjson, PropertiesReader.getInstance().getProperty("REMOTE_ADD_PHP")
                    + "?filename=" + fileName + "-" + pagecount + ".xml");
            data.clear();
            pagecount++;
        }
    }

	@Override
	public void setPagesize(int pagesize) {
		// TODO Auto-generated method stub
		this.pagesize = pagesize;
	}
}

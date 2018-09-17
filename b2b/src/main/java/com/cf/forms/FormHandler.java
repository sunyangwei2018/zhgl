package com.cf.forms;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.cf.framework.pi.util.MemoryCache;
import com.cf.scm.masterdata.MongodbHandler;
import com.cf.utils.PropertiesReader;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.lang.Exception;
import java.lang.String;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JSONArray;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.support.WebApplicationContextUtils;

@Controller
@RequestMapping("/form")
public class FormHandler extends FormUtils {

    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/find.do")
    public Map find(String json) throws Exception {
        Map map = new ObjectMapper().readValue(json, JSONObject.class);

        DBCollection dbCollection = MongodbHandler.getDB().getCollection(map.get("collection").toString());
        BasicDBObject query = new BasicDBObject(JSONObject.fromObject(map.get("query")));
        DBCursor dbc = null;
        DBObject queryResult = null;
        if (map.get("queryResult") != null) {
            queryResult = new BasicDBObject(JSONObject.fromObject(map.get("queryResult")));
        } else {
            queryResult = new BasicDBObject("_id", 0);
        }
        dbc = dbCollection.find(query, queryResult);

        if (map.get("sort") != null && !map.get("sort").equals("")) {
            BasicDBObject sort = new BasicDBObject(JSONObject.fromObject(map.get("sort")));
            dbc.sort(sort);
        }

        Map returnMap = new HashMap();
        returnMap.put("returnList", dbc.toArray());
        return returnMap;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/distinct.do")
    public Map distinct(String XmlData) throws Exception {
        Map map = new ObjectMapper().readValue(XmlData, JSONObject.class);
        DBCollection dbCollection = MongodbHandler.getDB().getCollection(map.get("form").toString());
        List list = new ArrayList();
        if (map.get("queryEle") != null) {
            JSONObject queryEle = JSONObject.fromObject(map.get("queryEle").toString());
            BasicDBObject query = new BasicDBObject(queryEle);
            Iterator iter = queryEle.entrySet().iterator();
            Map.Entry entry = null;
            while (iter.hasNext()) {
                entry = (Map.Entry) iter.next();
                query.put(entry.getKey().toString(), entry.getValue().toString());
            }
            list = dbCollection.distinct(map.get("resultEle").toString(), query);
        } else {
            list = dbCollection.distinct(map.get("resultEle").toString());
        }

        //返回值
        Map resultMap = new HashMap();
        resultMap.put("resultList", list);
        return resultMap;
    }

    public FormPlugIn getFormPlugIn(String jyl, HttpServletRequest request, HttpServletResponse response) throws Exception {
        ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
        return (FormPlugIn) context.getBean(jyl);
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/getFormURL.do")
    public Map getFormURL(int bdbh) {
        DBCollection dbCollection = MongodbHandler.getDB().getCollection("formPath");
        BasicDBObject query = new BasicDBObject("bdbh", bdbh);
        DBObject one = dbCollection.findOne(query);
        if (one == null) {
            dbCollection = MongodbHandler.getDB().getCollection("form");
            one = dbCollection.findOne(query);
        }

        if (one.get("bdym") != null && !one.get("bdym").equals("")) {
            Map resultMap = JSONObject.fromObject(one);
            String url = "" + one.get("bdlj") + one.get("bdym") + ".html";
            if (url.indexOf("/") == 0) {
                url = url.substring(1);
            }
            resultMap.put("url", url);
            return resultMap;
        }

        return null;
    }


    

    @SuppressWarnings("rawtypes")
    @RequestMapping("/getRecord.do")
    public Map getRecord(int bdbh, int jlbh) {
        DBCollection dbCollection = MongodbHandler.getDB().getCollection("form_" + bdbh);
        DBObject query = new BasicDBObject("jlbh", jlbh);
        DBObject result = new BasicDBObject("_id", 0);
        DBObject record = dbCollection.findOne(query, result);
        return JSONObject.fromObject(record);
    }

    public int getBHZT(String tblName) {
        DBCollection dbCollection = MongodbHandler.getDB().getCollection("bhzt");
        BasicDBObject query = new BasicDBObject("tblName", tblName);
        DBObject change = new BasicDBObject("jlbh", 1);
        DBObject update = new BasicDBObject("$inc", change);
        DBObject jlbh = dbCollection.findAndModify(query, null, null, false, update, true, true);
        return ((Integer) jlbh.get("jlbh")).intValue();
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    @RequestMapping("/saveRecord.do")
    public Map saveRecord(String json, HttpServletRequest request, HttpServletResponse response) throws Exception { //String json, int bdbh, HttpServletRequest request) {
        Map map = new ObjectMapper().readValue(json, Map.class);
        int bdbh = Integer.parseInt(map.get("bdbh").toString());
        int jlbh = Integer.parseInt(map.get("jlbh").toString());

        DBCollection dbCollection = MongodbHandler.getDB().getCollection("form");
        BasicDBObject query = new BasicDBObject("bdbh", bdbh);
        DBObject one = dbCollection.findOne(query);
        String jyl = one.get("jyl") == null ? null : (String) one.get("jyl");
        String bdym = one.get("bdym") == null ? null : (String) one.get("bdym");

        String logmapping = one.get("logmapping") == null ? null : (String) one.get("logmapping");
        if(logmapping != null) {
            String key = "form_" + map.get("bdbh").toString() + "_mapper";
            Map mapper = null;
            try{
                mapper = JSONObject.fromObject(logmapping);
                MemoryCache.getInstance().put(key, mapper);
            } catch(Exception e){
            	e.printStackTrace();
            }
        }

        Map tmp = new HashMap();
        if (jlbh == 0) {
            jlbh = createRecord(map, bdbh, bdym, jyl, request, response);
        } else {
            modifyRecord(map, bdbh, jlbh, bdym, jyl, request, response);
        }
        return getRecord(bdbh, jlbh);

    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public int createRecord(Map json, int bdbh, String bdym, String jyl, HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.insertBefore(json, bdbh, request);
        }

        int jlbh = getBHZT("form_" + bdbh);
        json.put("jlbh", jlbh);
        json.put("JLBH", jlbh);

        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.saveBefore(json, bdbh, request, response);
        }

        DBCollection dbCollection = MongodbHandler.getDB().getCollection("form_" + bdbh);
        DBObject record = new BasicDBObject(json);
        dbCollection.insert(record);

        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.saveAfter(json, bdbh, request);
        }

        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.insertAfter(json, bdbh, request);
        }

        if (json.containsKey("loging")) {
            if (json.get("loging").equals("1")) {
                loging(bdbh, jlbh, "新增", null);
            }
        }

        return jlbh;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public int modifyRecord(Map json, int bdbh, int jlbh, String bdym, String jyl, HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.updateBefore(json, bdbh, request);
            Map w;
        }

        if (json.containsKey("loging")) {
            if (json.get("loging").equals("1")) {
                loging(bdbh, jlbh, "修改",json);
            }
        }

        json.put("jlbh", jlbh);
        json.put("JLBH", jlbh);

        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.saveBefore(json, bdbh, request, response);
        }

        DBObject query = new BasicDBObject("jlbh", jlbh);
        DBCollection dbCollection = MongodbHandler.getDB().getCollection("form_" + bdbh);
        dbCollection.update(query, new BasicDBObject("$set", json));

        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.saveAfter(json, bdbh, request);
        }

        if (jyl != null && !jyl.equals("")) {
            FormPlugIn fpi = (FormPlugIn) getApplicationContext().getBean(jyl);
            fpi.updateAfter(json, bdbh, request);
        }

        return jlbh;
    }

    @SuppressWarnings("rawtypes")
    @RequestMapping("/savePrintHtml.do")
    public void savePrintHtml(String XmlData, HttpServletRequest request, HttpServletResponse response) throws Exception {
        FileOutputStream fileoutputstream = null;
        OutputStream outStream = null;
        try {
            Map json = new ObjectMapper().readValue(XmlData, JSONObject.class);
            Document doc = Jsoup.parse(json.get("html").toString());

            String body = doc.body().children().toString();
            DBCollection dbCollection = MongodbHandler.getDB().getCollection("formPrint");
            DBObject query = new BasicDBObject("mbbh", json.get("mbbh"));

            DBObject update = new BasicDBObject(json);
            update.put("html", body);
            String PROJECT = PropertiesReader.getInstance().getProperty("pubJson.PROJECT");
            String dyym = "pro" + PROJECT + "/print/" + json.get("dyym") + ".html";
            update.put("dyym", dyym);
            dbCollection.update(query, update, true, false);

            String path = FormHandler.class.getResource("").getPath();
            path = path.substring(0, path.indexOf("WEB-INF/classes"));
            String file = path + dyym;

            byte html_byte[] = body.getBytes("UTF-8");
            //生成打印页面
            fileoutputstream = new FileOutputStream(file);// 建立文件输出流
            System.out.print("文件输出路径:" + file);
            fileoutputstream.write(html_byte);

            //生成备份html
            response.reset();
            response.setContentType("text/html; charset=utf-8");
            response.setHeader("Content-disposition", "attachment; filename=" +
                    java.net.URLEncoder.encode(json.get("dyym") + ".html", "utf-8"));
            outStream = response.getOutputStream();
            outStream.write(html_byte);
        } catch (Exception e) {
            // TODO: handle exception
        } finally {
            if (fileoutputstream != null) {
                fileoutputstream.flush();
                fileoutputstream.close();//关闭输出流
            }
            if (outStream != null) {
                outStream.flush();
                outStream.close();//关闭输出流
            }
        }
    }

    /**
     * 保存变更日志
     */
    public void loging(int bdbh, int jlbh, String action, Map json) throws Exception {
        Map result = new HashMap();
        if(json != null) {
            Map old = (Map) getRecord(bdbh, jlbh);
            try {
                Map o1 = JSONObject.fromObject(old);
                Map o2 = JSONObject.fromObject(json);
                String key = "form_" + String.valueOf(bdbh) + "_mapper";
                Map mapper = (Map) MemoryCache.getInstance().get(key);
                if (mapper != null) {
                    o1 = mapping(o1, mapper);
                    o2 = mapping(o2, mapper);
                }
                compare(o1, o2, "", result);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if ((!result.isEmpty()) || (json == null)) {
            Map row = new HashMap();
            row.put("ywsj", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
            row.put("bdbh", bdbh);
            row.put("jlbh", jlbh);
            row.put("action", action);
            row.put("data", result);
            DBCollection dbCollection = MongodbHandler.getDB().getCollection("loging");
            DBObject record = new BasicDBObject(row);
            dbCollection.insert(record);
        }
    }

    /*
     * 比对两个JSON对象的差异，并输出
    *  o1: 旧JSON对象
    *  02: 新JSON对象
     */
    public static void compare(Object o1, Object o2, String path, Map row) {
        String key, tpath;
        if (o2 instanceof Map) {
            Iterator<String> keys = ((Map) o2).keySet().iterator();
            while (keys.hasNext()) {
            	key = keys.next();
                Object value1 = null;
                if (o1 instanceof Map) {
                    if (((Map) o1).containsKey(key)) {
                        value1 = ((Map) o1).get(key);
                    }
                }
                Object value2 = ((Map) o2).get(key);
                tpath = (path.length() > 0 ? path + "•" : "") + key;
                compare(value1, value2, tpath, row);
            }
        } else if (o2 instanceof List) {
            int i = 0;
            Iterator i1 = null;
            if (o1 instanceof List) {
                i1 = ((List) o1).iterator();
            }
            Iterator i2 = ((List) o2).iterator();
            while (i2.hasNext()) {
                i++;
                Object value1 = null;
                if (i1 != null) {
                    if (i1.hasNext()) {
                        value1 = i1.next();
                    }
                }
                tpath = path.length() > 0 ? path + "•[" + i + "]" : "";
                compare(value1, i2.next(), tpath, row);
            }
        } else {
            if ((o1 == null) || String.valueOf(o1).equals("")) {
                o1 = String.valueOf("");
            }
            if ((o2 == null) || String.valueOf(o2).equals("")) {
                o2 = String.valueOf("");
            }
            if (!(o1.toString()).equals(o2.toString())) {
                String desc = String.format("%s: '%s' -> '%s'", path, o1.toString(), o2.toString());
                row.put(path, desc);
            }
        }
    }

    private static Map mapping(Map record, Map mapper) throws Exception {
        Map row = new HashMap();
        Object o;
        for (Object key : mapper.keySet()) {
            o = mapper.get(key);
            Object value = record.get(key);
            if (o instanceof Map) {
                if(mapper.containsKey(key + "_name")){
                    key = mapper.get(key + "_name");
                }
                if (value instanceof Map) {
                    row.put(key, mapping((Map) value, (Map) o));
                } else if (value instanceof List) {
                    List result = new ArrayList();
                    for (Object data : (List) value) {
                        result.add(mapping((Map) data, (Map) o));
                    }
                    row.put(key, result);
                }
            } else if (o instanceof String) {
                row.put(o, value == null ? "" : value);
            }
        }
        return row;
    }

    public static void main(String args[]) {
        try {
            MongoClient mc = new MongoClient("120.26.103.86", 27017);
            DB db = mc.getDB("dqfwy_b2b");
            db.authenticate("dqfwy_b2b", "P4F51gzn5yPQNL0E".toCharArray());
            DBCollection dc = db.getCollection("WLDW");

            System.out.println(dc.distinct("WLDW01").size());
            System.out.println(dc.distinct("WLDW02").size());
            System.out.println(dc.count());

            JSONArray ja = JSONArray.fromObject("[{'WLDW01':'904582','WLDW02':'新沂市爱迪家电商场','WLDW24':{'key':'0001040301','value':'徐州'},'DWQT56':{'key':'60015','value':'林鹏'}},"
                    + "{'WLDW01':'905870','WLDW02':'绍兴神州天乐电子商务有限公司','WLDW24':{'key':'0001040602','value':'宁波'},'DWQT56':{'key':'60035','value':'边志杰'}}]");
            for (int i = 0; i < ja.size(); i++) {
                DBObject dbo = new BasicDBObject(ja.getJSONObject(i));
                dc.insert(dbo);
            }
            System.out.println("-------------------------");
            System.out.println(dc.distinct("WLDW01").size());
            System.out.println(dc.distinct("WLDW02").size());
            System.out.println(dc.count());

        } catch (Exception e) {
            // TODO 自动生成的 catch 块
            e.printStackTrace();
        }

    }
}

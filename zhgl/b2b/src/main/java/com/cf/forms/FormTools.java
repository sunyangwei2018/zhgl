package com.cf.forms;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.ApplicationContext;

import com.cf.framework.JLBill;
import com.cf.framework.aop.SpringContextHolder;
import com.cf.utils.JLTools;
import com.cf.utils.PropertiesReader;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;


public class FormTools extends JLBill{
	//表单地址
	public static final String FORM_URL = PropertiesReader.getInstance().getProperty("FORM_URL");
	//V9地址
	public static final String SCM_URL = PropertiesReader.getInstance().getProperty("SCM_URL");
	//文件服务器地址
	public static final String FILE_URL = PropertiesReader.getInstance().getProperty("FILE_URL");
	//项目名称
	public static final String PROJECT = PropertiesReader.getInstance().getProperty("pubJson.PROJECT");
	
	
	/**
	 * 获取唯一JDK自带ID
	 * 
	 * @return
	 */
	public static String getrandomUUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 获取spring Context
	 * @return
	 */
	public static ApplicationContext getSpringContext(){
		return SpringContextHolder.getApplicationContext();
	}

	/**
	 * 获取spring bean文件
	 * @return
	 */
	public static ApplicationContext getApplicationContext(){
		return SpringContextHolder.getApplicationContext();
	}
	
	public static FormPlugIn getFormPlugIn(String jyl) throws Exception {
		if(getSpringContext().containsBean(jyl)){
			return (FormPlugIn) getSpringContext().getBean(jyl);
		}
		return null;
    }
	
	/**
	 * 比较数字大小
	 * @return
	 */
	public static boolean compareNumber(String str1,String str2){
		Double double1 = Double.parseDouble(str1);
		Double double2 = Double.parseDouble(str2);
		boolean bol = double1>double2 ? true : false;
		return bol;
	}
	
	/**
     * 比较JSON对象
     * o1: 旧JSON对象
     * o2: 新JSON对象
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static void compareJson(Object o1, Object o2, String path, Map row) {
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
                compareJson(value1, value2, tpath, row);
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
                compareJson(value1, i2.next(), tpath, row);
            }
        } else {
            if ((o1 == null) || String.valueOf(o1).equals("")) {
                o1 = String.valueOf("");
            }
            if ((o2 == null) || String.valueOf(o2).equals("")) {
                o2 = String.valueOf("");
            }
            if (!(o1.toString()).equals(o2.toString())) {
                //String desc = String.format("%s: '%s' -> '%s'", path, o1.toString(), o2.toString());
            	String desc = String.format("'%s' -> '%s'",  o1.toString(), o2.toString());
                row.put(path, desc);
            }
        }
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map mapping(Map record, Map mapper) throws Exception {
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

	/**
	 * 获取第一次执行的时间
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static Date getDate(int hour,int minute,int second){
		Calendar calendar = Calendar.getInstance();
		/*** 定制每日2:00执行方法 ***/
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND, second);
		Date date=calendar.getTime();
		if (date.before(new Date())) {
			calendar.add(Calendar.DAY_OF_MONTH, 1);
			date = calendar.getTime();
		}
		return date;
	}
	
	/**
	 * 获取系统时间
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static String getSysTime(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar calendar = Calendar.getInstance();
		String date = format.format(calendar.getTime());
		return date;
	}
	/**
	 * 获取系统日期
	 * @return
	 */
	public static String getSysDate(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		
		String date = format.format(calendar.getTime());
		calendar.getTime().compareTo(calendar.getTime());
		return date;
	}
	/**
	 * 获取时间自定义格式
	 * @return
	 */
	public static String getDate(String pattern){
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		Calendar calendar = Calendar.getInstance();
		String date = format.format(calendar.getTime());
		return date;
	}
	
	/**
	 * 检查是否为空
	 * @param obj
	 * @return true|false
	 */
	public static boolean isNull(Object obj){
		if(obj == null || obj.equals(null) || obj.toString().equals("")){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 检查为空 返回空字符串
	 * @return true|false
	 */
	public static String checkNull(String param){
		return isNull(param)? "": param;
	}
	
	/**
	 * 检查是否为空
	 * @return
	 */
	public static void isNullException(Object obj,String str) throws Exception{
		if(obj == null || obj.toString().equals("")){
			throw new Exception(str);
		}
	}
	/**
	 * 检查是否为空
	 * @return
	 */
	public static void isJsonNullException(Object obj,String str) throws Exception{
		JSONObject jo = JSONObject.fromObject(obj);
		if(jo.get("key") == null || jo.getString("key").equals("")){
			throw new Exception(str);
		}
	}
	/**
	 * 检查是否为空
	 * @return
	 */
	public static void isArrayNullException(Object obj,String str) throws Exception{
		if(obj == null || "".equals(obj)){
			throw new Exception(str);
		}
		JSONArray ja = JSONArray.fromObject(obj);
		if(ja.size() == 0){
			throw new Exception(str);
		}
	}
	/**
	 * 检查数组是否为空
	 * @return
	 */
	public static void isArrayKeyNullException(Object obj,String key,String str) throws Exception{
		JSONArray ja =JSONArray.fromObject(obj);
		for(int i=0; i<ja.size(); i++){
			JSONObject jo = ja.getJSONObject(i);
			isNullException(jo.get(key), str);
		}
	}
	/**
	 * 替换null为""
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map replaceMapNull(Map map) throws Exception{
		for(Iterator it = map.keySet().iterator();it.hasNext();){
			String key = it.next().toString();
			if(isNull(map.get(key))){
				map.put(key, "");
			}
		}
		return map;
	}

	/**
	 * 替换null为""
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static List replaceListNull(List<Map> list) throws Exception{
		for(int i=0;i<list.size();i++){
	        list.set(i, replaceMapNull(list.get(i)));
		}
		return list;
	}
	
	/**
	 * 将String读取成Map[]
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static Map[] mapperToMapArrayList(String XmlData) throws Exception{
		return new ObjectMapper().readValue(XmlData, Map[].class);
	}
	
	/**
	 * 将String读取成ListMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static List<Map> mapperToMapList(String XmlData) throws Exception{
		return new ObjectMapper().readValue(XmlData, List.class);
	}
	
	/**
	 * 将String读取成Map
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static Map mapperToMap(String XmlData) throws Exception{
		return new ObjectMapper().readValue(XmlData, Map.class);
	}

	/**
	 * 将String读取成Map
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static List mapperToList(String XmlData) throws Exception{
		return new ObjectMapper().readValue(XmlData, List.class);
	}

	/**
	 * 将String读取成Json
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static JSONObject mapperToJSONObject(String XmlData) throws Exception{
		return new ObjectMapper().readValue(XmlData, JSONObject.class);
	}
	
	/**
	 * 将String读取成JSONArray
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static JSONArray mapperToJSONArray(String XmlData) throws Exception{
		return new ObjectMapper().readValue(XmlData, JSONArray.class);
	}
	
	/**
	 * 将JavaBean转Map
	 */
	public static Map mapperBeanToMap(Object obj)throws Exception{
		String XmlData = new ObjectMapper().writeValueAsString(obj);
		return new ObjectMapper().readValue(XmlData, Map.class);
	}
	
	/**
	 * 将JavaBean转List<map>
	 */
	public static List mapperBeanToList(Object obj)throws Exception{
		String XmlData = new ObjectMapper().writeValueAsString(obj);
		return new ObjectMapper().readValue(XmlData, List.class);
	}
	
	/**
	 * 将Json转成JavaBean
	 * @param json
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public static <T> T mapperJsonToBean(String json,Class<T> type)throws Exception{
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return objectMapper.readValue(json, type);
	}
	
	/**
	 * 下拉框或者单选取key
	 * @return
	 */
	public static String getJsonKey(Object obj) throws Exception{
		return JSONObject.fromObject(obj).getString("key");
	}
	
	/**
	 * 下拉框或者单选取value
	 * @return
	 */
	public static String getJsonValue(Object obj) throws Exception{
		return JSONObject.fromObject(obj).getString("value");
	}
	/***
	 * syw_add 2016.3.1
	 * */
	public static int getJLBH(String tblName) {
        DBCollection dbCollection = null;//MongodbHandler.getDB().getCollection("bhzt");
        BasicDBObject query = new BasicDBObject("tblName", tblName);
        DBObject change = new BasicDBObject("jlbh", 1);
        DBObject update = new BasicDBObject("$inc", change);
        DBObject jlbh = dbCollection.findAndModify(query, null, null, false, update, true, true);
        return ((Integer) jlbh.get("jlbh")).intValue();
    }
	
	/**
	 * 获取单据编号
	 * @return
	 */
	public static String getDJBH(String character,String pattern) throws Exception{
		pattern = isNull(pattern)? "yyyyMMddHHmmss": pattern;
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String date = format.format(new Date());
		DecimalFormat def = new DecimalFormat("000000");
		int lsh = getJLBH("DJLSH");
		return character + date + def.format(lsh);
	}
	
	/**
	 * 获取随机单据编号
	 * @return
	 */
	public static String getRandomDJBH(String character,String pattern) throws Exception{
		pattern = isNull(pattern)? "yyyyMMddHHmmss": pattern;
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String date = format.format(new Date());
		DecimalFormat def = new DecimalFormat("000000");
		int b=(int)(Math.random()*1000000%1000000);//产生0-1000000的整数随机数
		return character + date + def.format(b);
	}
	
	/**
	 * 解析上传的Excel数据成Json
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static List<Map> getExcelData(int MBBM,JSONArray files) throws Exception{
		List<Map> list = new ArrayList<Map>();
		for (int i = 0; i < files.size(); i++) {
			JSONObject file = files.getJSONObject(i);
			JSONObject XmlData = new JSONObject();
			XmlData.put("jlbh", MBBM);
			String url = file.get("FILE_URL").toString().replace(PropertiesReader.getInstance().getProperty("DOWNLOAD_IPOLD"), PropertiesReader.getInstance().getProperty("DOWNLOAD_IPNEW"));
			String[] fileType = file.get("FILE_DESC").toString().split("\\.");
			XmlData.put("fileType", fileType[fileType.length - 1].toString());
			url+="."+XmlData.getString("fileType");
			XmlData.put("url", url);
			list.addAll(new ExcelHandler().readExcel(XmlData.toString()));
		}
		return list;
	}
	
	/**
	 * 获取返回值
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map getReturnValue(String resultData) throws Exception{
		Map result = new HashMap();
		try{
			result = JSONObject.fromObject(resultData);
			System.out.println(result);
			if(result.get("data")==null || result.get("data").toString().length() == 0){
				throw new Exception(resultData);
			}
			result = JSONObject.fromObject(result.get("data"));
			if(result.get("MSGID") == null){
				throw new Exception(resultData);
			}else if(result.get("MSGID").equals("E")){
				throw new Exception(resultData);
			}
		} catch (Exception e) {
			throw new Exception(resultData);
		}
		return result;
	}
	

	public static String getEncoding(String str) {
        String encode = "GB2312";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s = encode;
                return s;
            }
        } catch (Exception exception) {
		   return "";
        }
        encode = "ISO-8859-1";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s1 = encode;
                return s1;
            }
        } catch (Exception exception1) {
        	return "";
        }
        encode = "UTF-8";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s2 = encode;
                return s2;
            }
        } catch (Exception exception2) {
        	return "";
        }
        encode = "GBK";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s3 = encode;
                return s3;
            }
        } catch (Exception exception3) {
        	return "";
        }
        return "";
	}
	
	public static String sendToSync(byte[] file, String sendurl) throws Exception {
		DataOutputStream wr = null;
		DataInputStream dis = null;
		HttpURLConnection conn = null;
	    try {
	        URL url = new URL(sendurl);
	        conn = (HttpURLConnection) url.openConnection();
	        conn.setDoInput(true);
	        conn.setDoOutput(true);
	        conn.setRequestProperty("Content-Type", "application/octet-stream;charset=UTF-8");
	        conn.setRequestMethod("POST");
	        conn.connect();
	        
	        wr = new DataOutputStream(conn.getOutputStream());
	        if (file != null) {
	            wr.write(file);
	        }
	        
	        dis = new DataInputStream(conn.getInputStream());
	        byte[] result = JLTools.toByteArray(dis);
	        
	        return new String(result, "UTF-8");
	    } catch (Exception e) {
	        throw e;
	    } finally {
	        if (dis != null) {
	        	dis.close();
	        }
	        if (wr != null) {
	        	wr.flush();
	            wr.close();
	        }
	        if (conn != null) {
	            conn.disconnect();
	        }
	    }
	}
	
	/***
	 * oracle.sql.Clob类型转换成String类型
	 * @param clob
	 * @return
	 * @throws SQLException
	 * @throws IOException
	 */
	public static String ClobToString(Clob clob) throws SQLException, IOException {

	String reString = "";
	Reader is = clob.getCharacterStream();// 得到流
	BufferedReader br = new BufferedReader(is);
	String s = br.readLine();
	StringBuffer sb = new StringBuffer();
	while (s != null) {// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成STRING
	sb.append(s);
	s = br.readLine();
	}
	reString = sb.toString();
	return reString.trim();
	}
}

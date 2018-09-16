package com.cf.forms;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import com.cf.framework.JLBill;
import com.cf.framework.aop.SpringContextHolder;
import com.cf.utils.PropertiesReader;
import com.mongodb.DBCollection;

public class FormUtils extends JLBill{
	public DBCollection collection = null;
	//spring-bean
	public static ApplicationContext context = null;
	//表单地址
	public static final String FORM_URL = PropertiesReader.getInstance().getProperty("FORM_URL");
	//V9地址
	public static final String SCM_URL = PropertiesReader.getInstance().getProperty("SCM_URL");
	//文件服务器地址
	public static final String FILE_URL = PropertiesReader.getInstance().getProperty("FILE_URL");
	//项目名称
	public static final String PROJECT = PropertiesReader.getInstance().getProperty("pubJson.PROJECT");
	
	public void initJDBC() throws Exception {
		String[] url = new String[] { "spring-servlet-*.xml" };  
		ApplicationContext context =new ClassPathXmlApplicationContext(url);
		this.tms = (JdbcTemplate)context.getBean("tms");
	}

	/**
	 * 获取spring Context
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public ApplicationContext getSpringContext(){
		return SpringContextHolder.getApplicationContext();
	}

	/**
	 * 获取spring bean文件
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public ApplicationContext getApplicationContext(){
		return SpringContextHolder.getApplicationContext();
	}
	
	/**
	 * 获取第一次执行的时间
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public boolean compareNumber(String str1,String str2){
		Double double1 = Double.parseDouble(str1);
		Double double2 = Double.parseDouble(str2);
		boolean bol = double1>double2 ? true : false;
		
		return bol;
	}

	/**
	 * 获取第一次执行的时间
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public Date getDate(int hour,int minute,int second){
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
	public String getSysTime(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar calendar = Calendar.getInstance();
		String date = format.format(calendar.getTime());
		return date;
	}
	/**
	 * 获取系统日期
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public String getSysDate(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		String date = format.format(calendar.getTime());
		return date;
	}
	/**
	 * 获取时间自定义格式
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public String getDate(String pattern){
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
	 * @param obj
	 * @return true|false
	 */
	public static String checkNull(String param){
		return isNull(param)? "": param;
	}
	
	/**
	 * 检查是否为空
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public void isNullException(Object obj,String str) throws Exception{
		if(obj == null || obj.toString().equals("")){
			throw new Exception(str);
		}
	}
	/**
	 * 检查是否为空
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public void isJsonNullException(Object obj,String str) throws Exception{
		JSONObject jo = JSONObject.fromObject(obj);
		if(jo.get("key") == null || jo.getString("key").equals("")){
			throw new Exception(str);
		}
	}
	/**
	 * 检查是否为空
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public void isArrayNullException(Object obj,String str) throws Exception{
		if(obj == null || "".equals(obj)){
			throw new Exception(str);
		}
		JSONArray ja = JSONArray.fromObject(obj);
		if(ja.size() == 0){
			throw new Exception(str);
		}
	}
	/**
	 * 检查是否为空
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public void isArrayKeyNullException(Object obj,String key,String str) throws Exception{
		JSONArray ja =JSONArray.fromObject(obj);
		for(int i=0; i<ja.size(); i++){
			JSONObject jo = ja.getJSONObject(i);
			isNullException(jo.get(key), str);
		}
	}
	/**
	 * 替换null为""
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map replaceMapNull(Map map) throws Exception{
		for(Iterator it = map.keySet().iterator();it.hasNext();){
			String key = it.next().toString();
			if(isNull(map.get(key))){
				map.put(key, "");
			}
		}
		return map;
	}
	
	/**
	 * 获取单据编号
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public String getJsonKey(Object obj) throws Exception{
		return JSONObject.fromObject(obj).getString("key");
	}
	
	/**
	 * 获取单据编号
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public String getJsonValue(Object obj) throws Exception{
		return JSONObject.fromObject(obj).getString("key");
	}
	
	/**
	 * 获取单据编号
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public String getDJBH(String character,String pattern) throws Exception{
		pattern = isNull(pattern)? "yyyyMMddHHmmss": pattern;
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String date = format.format(new Date());
		DecimalFormat def = new DecimalFormat("000000");
		int lsh = new FormHandler().getBHZT("DJLSH");
		return character + date + def.format(lsh);
	}
	
	/**
	 * 获取随机单据编号
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public String getRandomDJBH(String character,String pattern) throws Exception{
		pattern = isNull(pattern)? "yyyyMMddHHmmss": pattern;
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String date = format.format(new Date());
		DecimalFormat def = new DecimalFormat("000000");
		int b=(int)(Math.random()*1000000%1000000);//产生0-1000000的整数随机数
		return character + date + def.format(b);
	}
	
	/**
	 * 解析上传的Excel数据成Json
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public List<Map> getExcelData(int MBBM,JSONArray files) throws Exception{
		List<Map> list = new ArrayList<Map>();
		for (int i = 0; i < files.size(); i++) {
			JSONObject file = files.getJSONObject(i);
			JSONObject XmlData = new JSONObject();
			XmlData.put("jlbh", MBBM);
			String url = file.get("FILE_URL").toString().replace(PropertiesReader.getInstance().getProperty("DOWNLOAD_IPOLD"), PropertiesReader.getInstance().getProperty("DOWNLOAD_IPNEW"));
			XmlData.put("url", url);
			String[] fileType = file.get("FILE_DESC").toString().split("\\.");
			XmlData.put("fileType", fileType[fileType.length - 1].toString());
			list.addAll(new ExcelHandler().readExcel(XmlData.toString()));
		}
		return list;
	}
	
	/**
	 * 获取返回值
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Map getReturnValue(String resultData) throws Exception{
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

}

package com.cf.forms;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;
import com.cf.tms.user.action.CX;
import com.cf.utils.MD5;
import com.cf.utils.PropertiesReader;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Controller
@RequestMapping("/user")
public class User extends JLBill{
	private Logger logger = LoggerFactory.getLogger(User.class);
	public static final String loginSQL = PropertiesReader.getInstance().getProperty("loginSQL");
	public static JSONObject pubJson = new JSONObject();
	
	public static void getConfig(){
		pubJson.put("PROJECT", PropertiesReader.getInstance().getProperty("pubJson.PROJECT"));
		pubJson.put("PcrmUrl", PropertiesReader.getInstance().getProperty("pubJson.PcrmUrl"));
		pubJson.put("FormUrl", PropertiesReader.getInstance().getProperty("pubJson.FormUrl"));
		pubJson.put("ScmUrl", PropertiesReader.getInstance().getProperty("pubJson.ScmUrl"));
		pubJson.put("PagingUrl", PropertiesReader.getInstance().getProperty("pubJson.PagingUrl"));
		pubJson.put("PAGESIZE", PropertiesReader.getInstance().getProperty("PAGESIZE"));
	}
	
	/***
	 * 空方法防止session失效
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/refSession.do")
	public void refSession(){
		logger.info("防止session失效");
	}
	
    
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/login.do")
	public Map login(String json,HttpServletRequest request) throws Exception {
		ServletContext application = request.getSession().getServletContext();
        Map map = FormTools.mapperToMap(json);
        List list = new ArrayList();
		Map returnMap = new HashMap();
		List<Map<String, Object>> czy_list = new ArrayList();
		int i = 0;
		String SQL = "";
		String passWord = MD5.getMD5(map.get("CZY02").toString()).toLowerCase(); 
		if( loginSQL.equals("tms") ){
				SQL = "SELECT COUNT(0) FROM user_info WHERE userid='"+map.get("CZY01")+"' AND passwd='"+passWord+"'";
				i = tms.queryForObject(SQL,Integer.class);
		}
		if(i == 1){
			returnMap.put("STATE", 1);
			String sessionId = FormTools.isNull(map.get("sessionId"))?request.getSession().getId():map.get("sessionId").toString();
			/*if(FormTools.isNull(map.get("sessionId"))){
				returnMap.put("STATE", 2);
				return returnMap;
			}*/
			logger.info("当前sessionID##："+sessionId);
			Map row = null;
			String sql ="update user_info set  login_sessionid='"+sessionId+"' where userid='"+map.get("CZY01")+"' AND passwd='"+passWord+"'";
			execSQL(tms, sql, row);
			request.getSession().setAttribute("isLogin", true);
			request.getSession().setAttribute("ip", request.getRemoteAddr());

			//获取登录权限
			Map GW = getGw(map);
			returnMap.put("userInfo",GW);
			returnMap.put("sessionId",sessionId);
			request.getSession().setAttribute("userInfo", GW);//获取岗位

			returnMap.put("pubJson", pubJson);
			
			//多数据源设置
			if(map.get("FB01") != null){
				request.getSession().setAttribute("FB01", map.get("FB01"));//获取岗位
			}

			//检查密码简单程度
			String CHECK_MM = PropertiesReader.getInstance().getProperty("CHECK.MMHMD");
			if( CHECK_MM != null ){
				returnMap.putAll(checkMMHMD(map.get("CZY02").toString()));
			}
		}else{
			returnMap.put("STATE", 0);
			request.getSession().removeAttribute("isLogin");
		}
		
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getMenu.do")
	public Map getMenu(String XmlData) throws Exception {
        Map jsonMap = FormTools.mapperToMap(XmlData);
        if(FormTools.isNull(jsonMap.get("CD06"))){
        	jsonMap.put("CD06",2);
        }
		List returnList = queryForListByXML("WORKFLOW", "JLMenu.selectMenu", jsonMap);
		Map map = new HashMap();
		map.put("resultList", returnList);
		return map;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/checkLogin.do")
	public Map checkLogin(HttpServletRequest request) throws Exception {
		Map returnMap = new HashMap();
	
		if(request.getSession().getAttribute("isLogin")!=null){
			returnMap.put("isLogin", true);
		}else{
			returnMap.put("isLogin", false);
		}
		return returnMap;
	}

	@RequestMapping("/logout.do")
	public void logout(HttpServletRequest request) throws Exception {
		request.getSession().invalidate();
		//request.getSession().removeAttribute("isLogin");
	}
	
	/****
	 * 判断其他地区登录
	 * @param json
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/checkLoginOut.do")
	public Map checkLoginOut(String json,HttpServletRequest request) throws Exception{
		Map returnMap = new HashMap();
		Map map = FormTools.mapperToMap(json);
		//String passWord = MD5.getMD5(map.get("CZY03").toString()).toLowerCase();
		String sql="select count(1) from user_info WHERE userid='"+map.get("CZY01")+"' AND login_sessionid='"+map.get("sessionId")+"'";
		int i=queryForInt(tms, sql);
		if(i==1){
			returnMap.put("status", true);
		}else{
			returnMap.put("status", false);
		}
		return returnMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/updateMM.do")
	public Map updateMM(String json,HttpServletRequest request) throws Exception {
        Map map = FormTools.mapperToMap(json);
		Map returnMap = new HashMap();
		Map userInfo = (Map) request.getSession().getAttribute("userInfo");
 
		//身份认证
		if( !map.get("CZY01").equals(userInfo.get("CZY01")) ){
			returnMap.put("MSGID", "E");
			returnMap.put("MESSAGE", "非法请求!");
			return returnMap;
		}
		
		//登录密码黑名单验证
		String CHECK_MM = PropertiesReader.getInstance().getProperty("CHECK.MMHMD");
		if( CHECK_MM!=null ){
			Map type = checkMMHMD(map.get("CZY02").toString());
			if(!type.get("MSGID").equals("S")){
				returnMap.putAll(type);
				return returnMap;
			}
		}

		String passWord = MD5.getMD5(map.get("CZY02").toString()).toLowerCase();   
		String SQL = "UPDATE user_info SET passwd='"+passWord+"' WHERE userid='"+map.get("CZY01")+"'";
		int i = tms.update(SQL);
		if(i==1){
			returnMap.put("STATE", 1);
		}else{
			returnMap.put("STATE", 0);
		}
		
		return returnMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map checkMMHMD(String password) throws Exception {
		Map returnMap = new HashMap();
		if(password.length() < 6){
			returnMap.put("MSGID", "E");
			returnMap.put("MESSAGE", "密码长度不能小于6位");
			return returnMap;
		}
		
		String regex=".*[a-zA-Z]+.*";
		Matcher str=Pattern.compile(regex).matcher(password);
		regex=".*[0-9]+.*";
		Matcher num=Pattern.compile(regex).matcher(password);
		/*if(!(str.matches() && num.matches())){
			returnMap.put("MSGID", "E");
			returnMap.put("MESSAGE", "密码必须同时包含数字和字母");
			return returnMap;
		}
		
		String SQL="SELECT COUNT(0) FROM MMHMD WHERE HMD01='"+password+"' ";
		int size = tms.queryForInt(SQL);
		if( size == 1 ){
			returnMap.put("MSGID", "E");
			returnMap.put("MESSAGE", "密码过于简单,请尽快修改!");
		} else {
			returnMap.put("MSGID", "S");
		}*/
		return returnMap;
	}

	//调用PCRM获取人员岗位
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getGw (Map map) throws Exception {
		Map temp = new HashMap();
		try {
			JSONObject XmlData = new JSONObject();
			XmlData.put("CFRY01", map.get("CZY01"));
			
			CX cx = new CX();
			temp = cx.selectGW(XmlData.toString());
			if(temp.containsKey("KHGSID")){
				/*TODO:String sql ="select sjkhgsid,khgsname,khnamejc from khgs where khgsid='"+temp.get("KHGSID").toString()+"'";
				Map sjkh = queryForMap(tms, sql);
				temp.putAll(sjkh);*/
				String sql = "select GREEBH from khgs_greebh where khgsid='"+temp.get("KHGSID").toString()+"'";
				List wd= queryForList(tms, sql);
				temp.put("WD", wd);
			}
			temp.put("GROUP", cx.selectGROUP(XmlData.toString()));
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return temp;
	}
	
	
	
	public String getMACAddress(String ip){
		String str = "";
		String macAddress = "";
		Process p;
			try {
				//p = Runtime.getRuntime().exec("nbtstat -A " + ip);
				p = Runtime.getRuntime().exec("arp -n");
				InputStreamReader ir = new InputStreamReader(p.getInputStream());
				LineNumberReader input = new LineNumberReader(ir);
				p.waitFor();
				boolean flag = true;
			    String ipStr = "(" + ip + ")";
			    while(flag) {
			        str = input.readLine();
			        if (str != null) {
			          if (str.indexOf(ipStr) > 1) {
			            int temp = str.indexOf("at");
			            macAddress = str.substring(
			            temp + 3, temp + 20);
			            break;
			          }
			        } else
			        flag = false;
			     }
//				for (int i = 1; i < 100; i++) {
//					str = input.readLine();
//					if (str != null) {
//						if (str.indexOf("MAC Address") > 1) {
//							macAddress = str.substring(str.indexOf("MAC Address") + 14, str.length());
//							break;
//							}
//						if (str.indexOf("MAC Address") > 1) {
//							macAddress = str.substring(str.indexOf("MAC 地址") + 14, str.length());
//							break;
//							} 
//					}
//				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				 e.printStackTrace(System.out); 
			}
			return macAddress;
	}
	
	public String getRemortIP(HttpServletRequest request) {
		if (request.getHeader("x-forwarded-for") == null) {
			return request.getRemoteAddr();
			}
		return request.getHeader("x-forwarded-for");
	} 
	
	public String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip = request.getHeader("Proxy-Client-IP");
		}
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip = request.getHeader("WL-Proxy-Client-IP");
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip = request.getRemoteAddr();
		}
		return ip;
	} 
	
	public static String getMacInWindows(final String ip){
		   String result = "";
		   String[] cmd = {"cmd","/c","ping " + ip};
		   String[] another = {"cmd","/c","arp -a"};
		   String cmdResult = callCmd(cmd,another);
		   result = filterMacAddress(ip,cmdResult,"-");
		   return result;
	}
	
	 public static String getMacInLinux(final String ip){  
	     String result = "";  
	     String[] cmd = {"/bin/sh","-c","ping " +  ip + " -c 2 && arp -a" };  
	     String cmdResult = callCmd(cmd);  
	     result = filterMacAddress(ip,cmdResult,":");  
	     return result;  
	 } 
	
	public static String callCmd(String[] cmd) {
		  String result = "";
		  String line = "";
		    try {
		        Process proc = Runtime.getRuntime().exec(cmd);
		        InputStreamReader is = new InputStreamReader(proc.getInputStream());
		        BufferedReader br = new BufferedReader (is);
		        while ((line = br.readLine ()) != null) {
		             result += line;
		        }
		   }catch(Exception e) {
		        e.printStackTrace();
		   }
		      return result;
		} 
	
	public static String callCmd(String[] cmd,String[] another) {
		   String result = "";
		   String line = "";
		   try {
		      Runtime rt = Runtime.getRuntime();
		      Process proc = rt.exec(cmd);
		      proc.waitFor(); // 已经执行完第一个命令，准备执行第二个命令
		      proc = rt.exec(another);
		      InputStreamReader is = new InputStreamReader(proc.getInputStream());
		      BufferedReader br = new BufferedReader (is);
		      while ((line = br.readLine ()) != null) {
		         result += line;
		      }
		   }catch(Exception e) {
		        e.printStackTrace();
		   }
		      return result;
		}
	
	public static String filterMacAddress(final String ip, final String sourceString,final String macSeparator) {
		   String result = "";
		   String regExp = "((([0-9,A-F,a-f]{1,2}" + macSeparator + "){1,5})[0-9,A-F,a-f]{1,2})";
		   Pattern pattern = Pattern.compile(regExp);
		   Matcher matcher = pattern.matcher(sourceString);
		   while(matcher.find()){
		     result = matcher.group(1);
		     if(sourceString.indexOf(ip) <= sourceString.lastIndexOf(matcher.group(1))) {
		        break; // 如果有多个IP,只匹配本IP对应的Mac.
		     }
		   }
		    return result;
	}
}


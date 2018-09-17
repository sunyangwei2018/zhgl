package com.cf.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

public class Urlutils {

	/**
	 * 
	 * 功能描述: 获得请求的值
	 * @author sun
	 * @date 2016年7月4日
	 * @param params
	 * @param url
	 * @return
	 */
	public static String getUrlResult(Map<String,String> params,String url){  
        URL connect;  
        StringBuffer data = new StringBuffer();  
        StringBuffer paramsStr = new StringBuffer();    //拼接Post 请求的参数  
        try {    
            for(Map.Entry s:params.entrySet()){  
         	   paramsStr.append(s.getKey()).append("=").append(URLEncoder.encode((String) s.getValue(),"utf-8")).append("&");  
            }   
         //组装成Map 进行参数的传递  
           connect = new URL(url);    
           HttpURLConnection connection = (HttpURLConnection)connect.openConnection();    
           connection.setRequestMethod("POST");  
           connection.setDoOutput(true);   
           connection.setDoInput(true);  
           connection.setUseCaches(false);//post不能使用缓存  
//           connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
           connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
           connection.connect();
           OutputStreamWriter paramout = new OutputStreamWriter(connection.getOutputStream(),"UTF-8");   
           //将参数通过输出流写入  
           paramout.write(paramsStr.deleteCharAt(paramsStr.toString().length()-1).toString());
           paramout.flush();    
           BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8"));  
           String line;                
           while ((line = reader.readLine())!=null) {            
               data.append(line);              
           }    
           paramout.close();    
           reader.close();   
           connection.disconnect();
       } catch (Exception e) {    
           // TODO Auto-generated catch block    
           e.printStackTrace();    
       } 
      return data.toString();  
   }  
	
	/**
     * 获取指定网站的日期时间
     * 
     * @param webUrl
     * @return
     * @author SHANHY
     * @date   2015年11月27日
     */
    public static String getWebsiteDatetime(String webUrl){
        try {
            URL url = new URL(webUrl);// 取得资源对象
            URLConnection uc = url.openConnection();// 生成连接对象
            uc.connect();// 发出连接
            long ld = uc.getDate();// 读取网站日期时间
            Date date = new Date(ld);// 转换为标准时间对象
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINA);// 输出北京时间
            return sdf.format(date);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String webUrl4 = "http://www.ntsc.ac.cn";//中国科学院国家授时中心
    public static String webUrl2 = "http://www.baidu.com";//百度
    public static String webUrl3 = "http://www.taobao.com";//淘宝
    public static String webUrl5 = "http://www.360.cn";//360
    public static String webUrl1 = "http://www.bjtime.cn";//bjTime
    public static String webUrl6 = "http://www.beijing-time.org";//beijing-time
	public static void main(String[] args) {
//		String url="http://192.168.0.11:81/data/weixin/WeChat/interface.php";
//		String s=Base64Utils.GetImageStr("E:\\yl201606121328.jpg");
//		Map<String,String> params=new HashMap<String, String>();
//		params.put("bill","yl201606121328.jpg");
//		params.put("file", s);
//		//params.put("file", ImageUtils.compressBase64Pic(in, 100, 100, true));
//		params.put("fuc", "PDA");
//		params.put("type", "scanSign");
//		getUrlResult(params, url);
		
		
	      System.out.println(getWebsiteDatetime(webUrl4) + " [中国科学院国家授时中心]");
	       System.out.println(getWebsiteDatetime(webUrl1) + " [bjtime]");
	        System.out.println(getWebsiteDatetime(webUrl2) + " [百度]");
	        System.out.println(getWebsiteDatetime(webUrl3) + " [淘宝]");
	        System.out.println(getWebsiteDatetime(webUrl5) + " [360安全卫士]");
	        System.out.println(getWebsiteDatetime(webUrl6) + " [beijing-time]");
	}
}

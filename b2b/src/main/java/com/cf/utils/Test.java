package com.cf.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.Reader;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URL;
import java.net.URLConnection;
import java.net.UnknownHostException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class Test {
	static int x,y;
   // public static void main(String[] args) throws Exception {
        
//        ObjectMapper mapper = new ObjectMapper();
//        Map<String, Object> userData = mapper.readValue("{\"METADATA\":{\"FIELDS\":[{\"FIELD\":{\"attrname\":\"DHD01\",\"fieldtype\":\"i4\"}},{\"FIELD\":{\"attrname\":\"DHD02\",\"fieldtype\":\"string\"}},{\"FIELD\":{\"attrname\":\"DHDIA\",\"fieldtype\":\"nested\",\"FIELDS\":[{\"FIELD\":{\"attrname\":\"DHDIA01\",\"fieldtype\":\"i4\"}},{\"FIELD\":{\"attrname\":\"DHDIA02\",\"fieldtype\":\"string\"}},{\"FIELD\":{\"attrname\":\"DHDIC\",\"fieldtype\":\"nested\",\"FIELDS\":[{\"FIELD\":{\"attrname\":\"DHDIC01\",\"fieldtype\":\"r8\"}},{\"FIELD\":{\"attrname\":\"DHDIC02\",\"fieldtype\":\"dateTime\"}}]}}]}}]},\"ROWDATA\":[{\"ROW\":{\"DHD01\":\"100\",\"DHD02\":\"aaa\"}},{\"ROW\":{\"DHD01\":\"222\",\"DHD02\":\"bbb\"}},{\"ROW\":{\"DHD01\":\"333\",\"DHD02\":\"ccc\",\"DHDIA\":[{\"ROWDHDIA\":{\"DHDIA01\":\"777\",\"DHDIA02\":\"uuu\"}},{\"ROWDHDIA\":{\"DHDIA01\":\"888\",\"DHDIA02\":\"vvv\",\"DHDIC\":[{\"ROWDHDIC\":{\"DHDIC01\":\"123.4567\",\"DHDIC02\":\"2013-07-07\"}},{\"ROWDHDIC\":{\"DHDIC01\":\"456.7899\",\"DHDIC02\":\"2013-07-07\"}}]}}]}}]}", Map.class);
//        System.out.println(userData);
//        ObjectMapper xmlMapper = new XmlMapper();
//        String xml2 = xmlMapper.writeValueAsString(userData);
//   
//        //System.out.println(xml2);
//
//        //writeOutterMap(userData);
//        //System.out.println(sb);
//        ByteArrayOutputStream baos = new ByteArrayOutputStream();
//        new ObjectMapper().writeValue(baos, userData);
//        System.out.println(baos);


   // }
    
    /** 
     * 测试函数。简单地将指定的字符串生成二维码图片。   
     *  
     * <br/><br/> 
     * 作者：wallimn<br/> 
     * 时间：2014年5月25日　　下午10:30:00<br/> 
     * 联系：54871876@qq.com<br/> 
     */  
    @SuppressWarnings("resource")
	public static void main(String[] args) throws Exception {    
//        String text = "http://wallimn.itey.com";    
//        String result;  
//        String format = "gif";    
//        //生成二维码    
//        File outputFile = new File("d:"+File.separator+"rqcode.gif");    
//        MatrixUtil.writeToFile(MatrixUtil.toQRCodeMatrix(text, null, null), format, outputFile);    
//        result = MatrixUtil.decode(outputFile);  
//        System.out.println(result);  
//          
//        outputFile = new File("d:"+File.separator+"barcode.gif");    
//        MatrixUtil.writeToFile(MatrixUtil.toBarCodeMatrix(text, null, null), format, outputFile);  
//    
//        result = MatrixUtil.decode(outputFile);  
//        System.out.println(result);
//    	File file=new File("D:\\Book1.xlsx");
//        InputStream in = null;
//            try {
//				//Workbook workbook=null;
//				//workbook = new HSSFWorkbook(file);
//				
//				Workbook workbook = WorkbookFactory.create(file);
//				Sheet sheet = workbook.getSheet("sheet1");
//				int numberOfRows = sheet.getLastRowNum();
//				System.out.println(numberOfRows);
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//    	Connection con = null;// 创建一个数据库连接
//        PreparedStatement pre = null;// 创建预编译语句对象，一般都是用这个而不用Statement
//        ResultSet result = null;// 创建一个结果集对象  
          try
          {
//              Class.forName("oracle.jdbc.driver.OracleDriver");// 加载Oracle驱动程序
//              System.out.println("开始尝试连接数据库！");
//              String url = "jdbc:oracle:thin:@192.168.0.102:1521:orcl";// 127.0.0.1是本机地址，XE是精简版Oracle的默认数据库名
//              String user = "tms";// 用户名,系统默认的账户名
//              String password = "tms";// 你安装时选设置的密码
              
//              Class.forName("com.mysql.jdbc.Driver");
//              
//        	  String url = "jdbc:mysql://117.74.136.100:22022/mysql";//"jdbc:mysql:thin:@192.168.126.133:3306:mysql";// 127.0.0.1是本机地址，XE是精简版Oracle的默认数据库名
//              String user = "tms";// 用户名,系统默认的账户名
//              String password = "tms";// 你安装时选设置的密码
//              con = DriverManager.getConnection(url, user, password);// 获取连接
//              if(con!=null){
//            	  System.out.println("连接成功！");
//              }else{
//            	  System.out.println("连接失败！");
//              }
        	  
        	  	//getMACAddr();
        	  	
//              String sql = "select * from student where name=?";// 预编译语句，“？”代表参数
//              pre = con.prepareStatement(sql);// 实例化预编译语句
//              pre.setString(1, "刘显安");// 设置参数，前面的1表示参数的索引，而不是表中列名的索引
//              result = pre.executeQuery();// 执行查询，注意括号中不需要再加参数
//              while (result.next())
//                  // 当结果集不为空时
//                  System.out.println("学号:" + result.getInt("id") + "姓名:"
//                          + result.getString("name"));
//        	  	String a =JLTools.sendToSync("", "http://imgscan.spring56.com/files/bills/data/weixin/WeChat/interface.php");
//        	  	System.out.println(a);
        	  /*JLTools.sendToSync(String.valueOf(1),"http://imgscan.spring56.com/files/bills/data/tms/upload_stream.php?filename="
              		+ 132 + "-LASTPAGE.xml");*/
        	// 要验证的字符串
//        	    //*运单号【T007~】 格式错误
        	    // 正则表达式规则
        	  
        	    //String regEx = "^(([1-9]+)|([0-9]+\\.[0-9]{1,3}))$";
        	    //String regEx="^(([0-9]+)|([0-9]+\\.[0-9]{1,3}))$";
        	    //String str="=0.0949*330";
        	    // 编译正则表达式
        	    //Pattern pattern = Pattern.compile(regEx);
//        	    // 忽略大小写的写法
//        	    // Pattern pat = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
        	    //Matcher matcher = pattern.matcher(str);
        	    // 查找字符串中是否有匹配正则表达式的字符/字符串
        	   // boolean rs = matcher.find();
        	   // System.out.println(rs);
//        	  	int a =3590%50;
//        	    System.out.println(a);
//        	    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//				Date beginDate = format.parse("2014-7-21");
//				Date endDate = new Date();  
//        	    int year = beginDate.getYear();
//        	    int year1 = endDate.getYear();
//        	    int moth =12*(year1-year)+(endDate.getMonth()-beginDate.getMonth());
//        	    if(moth>3||(moth<0||(moth==0&&beginDate.getDate()>endDate.getDate()))){
//        	    	System.out.println(beginDate.getDate()+"##"+"###"+endDate.getDate()+"###"+moth);
//        	    }
        	  
//        	    Date nowda = new Date(date3);
//        	    System.out.println(format.format(new Date(date3)));SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");\
//    		char han='永';
//    		
    		//System.out.format("%x", (short)han);
    		int a =5;
    		char han1=0x6c38;
    		System.out.println(((a<5)?10.9:9));
          }
          catch (Exception e)
          {
              e.printStackTrace();
          }
          
    }
      
    
    public static void myMethod(){
    	y=x++ + ++x;
    	System.out.println(y);
    	System.out.println(x);
    }

}

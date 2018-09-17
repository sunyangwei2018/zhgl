package com.cf.forms;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;
import com.cf.utils.JLTools;
import com.cf.utils.MatrixUtil;
import com.cf.utils.PropertiesReader;

@Controller
@RequestMapping("/Test")
public class Test extends JLBill {
 	private String sRemoteAddr; 
    private int iRemotePort = 137; 
    private byte[] buffer = new byte[1024]; 
    private DatagramSocket ds = null;
	@RequestMapping("/start.do")
	public Map start(String json,HttpServletRequest requs, HttpServletResponse response) throws Exception{
//		Map map=FormTools.mapperToMap(json);
//		map.put("rymc","张三");
//		testFace face = new testForm();
//		face.select(map.get("rymc").toString());
//		return map;
//		String text = json;    
//        String result;  
//        String format = "gif";    
//        OutputStream stream = response.getOutputStream();
        //生成二维码    
//        File outputFile = new File("d:"+File.separator+"rqcode.gif");    
//        MatrixUtil.writeToFile(MatrixUtil.toQRCodeMatrix(text, null, null), format, outputFile);    
//        result = MatrixUtil.decode(outputFile);  
//        System.out.println(result);  
//          
//        outputFile = new File("d:"+File.separator+"barcode.gif");    
//        MatrixUtil.writeToFile(MatrixUtil.toBarCodeMatrix(text, null, null), format, outputFile);  
//        MatrixUtil.writeToStream(MatrixUtil.toBarCodeMatrix(text, null, null), format, stream);
//        result = MatrixUtil.decode(outputFile);  
//        System.out.println(result); 
		Map map =new HashMap();
		Connection con = null;// 创建一个数据库连接
        PreparedStatement pre = null;// 创建预编译语句对象，一般都是用这个而不用Statement
        Class.forName("oracle.jdbc.driver.OracleDriver");// 加载Oracle驱动程序
        System.out.println("开始尝试连接数据库！");
        String url = "jdbc:oracle:thin:@192.168.0.102:1521:orcl";// 127.0.0.1是本机地址，XE是精简版Oracle的默认数据库名
        String user = "tms";// 用户名,系统默认的账户名
        String password = "tms";// 你安装时选设置的密码
        con = DriverManager.getConnection(url, user, password);// 获取连接
        if(con!=null){
    	  System.out.println("连接成功！");
    	  map.put("status", "连接成功");
        }else{
    	  System.out.println("连接失败！");
    	  map.put("status", "连接失败");
        }
        return map;
	
	}
	
	@RequestMapping("/down.do")
	public void down(String json,HttpServletRequest requs, HttpServletResponse response) throws Exception{
//		Map map=FormTools.mapperToMap(json);
		  Long longcurr_time=System.currentTimeMillis();
		  OutputStream os = null;
          int rowaccess=100;//内存中缓存记录行数
          /*keep 100 rowsin memory,exceeding rows will be flushed to disk*/
          try {
			  SXSSFWorkbook wb = new SXSSFWorkbook(rowaccess);
			  //Workbook wb = new SXSSFWorkbook(rowaccess);
			  int sheet_num=3;//生成3个SHEET
			  for(int i=0;i<sheet_num;i++){
				  org.apache.poi.ss.usermodel.Sheet sh = wb.createSheet(String.valueOf(i));
				  for(int rownum = 0; rownum < 60000; rownum++) {
					  Row row = sh.createRow(rownum);
					//每行有10个CELL
			        for(int cellnum = 0; cellnum < 10; cellnum++) {
			           Cell cell = row.createCell(cellnum);
			           String address = new CellReference(cell).formatAsString();
			           cell.setCellValue(address);
			        }
			    	//每当行数达到设置的值就刷新数据到硬盘,以清理内存
			        if(rownum%rowaccess==0){
			           ((SXSSFSheet)sh).flushRows();
			        }                
				  }
			  }
			  os = response.getOutputStream();//获取输出流
				response.reset();
				// 设定输出文件头
				response.setHeader("Content-disposition", "attachment; filename="+ 132 + ".xlsx");
				response.setContentType("application/msexcel");// 设定输出类型
				//response.setContentType("application/vnd.ms-excel;charset=gb2312");  // 设定输出类型
				wb.write(os);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
	  		if(os != null){
	  			os.flush();
	  			os.close();
	  		}
	  	}

	}
	

    
	
	public DatagramPacket send(byte[] b) throws IOException{ 
        DatagramPacket dp = new DatagramPacket(b, b.length, InetAddress.getByName(sRemoteAddr), iRemotePort); 
        ds.send(dp); 
        return dp; 
    }
	
	private DatagramPacket receive() throws Exception 
    { 
        DatagramPacket dp = new DatagramPacket(buffer, buffer.length); 
        ds.receive(dp); 
        return dp; 
    }
	
	// 询问包结构: 
    // Transaction ID 两字节（16位） 0x00 0x00 
    // Flags 两字节（16位） 0x00 0x10 
    // Questions 两字节（16位） 0x00 0x01 
    // AnswerRRs 两字节（16位） 0x00 0x00 
    // AuthorityRRs 两字节（16位） 0x00 0x00 
    // AdditionalRRs 两字节（16位） 0x00 0x00 
    // Name:array [1..34] 0x20 0x43 0x4B 0x41(30个) 0x00 ; 
    // Type:NBSTAT 两字节 0x00 0x21 
    // Class:INET 两字节（16位）0x00 0x01 
    private byte[] GetQueryCmd() throws Exception 
    { 
        byte[] t_ns = new byte[50]; 
        t_ns[0] = 0x00; 
        t_ns[1] = 0x00; 
        t_ns[2] = 0x00; 
        t_ns[3] = 0x10; 
        t_ns[4] = 0x00; 
        t_ns[5] = 0x01; 
        t_ns[6] = 0x00; 
        t_ns[7] = 0x00; 
        t_ns[8] = 0x00; 
        t_ns[9] = 0x00; 
        t_ns[10] = 0x00; 
        t_ns[11] = 0x00; 
        t_ns[12] = 0x20; 
        t_ns[13] = 0x43; 
        t_ns[14] = 0x4B; 
        for (int i = 15; i < 45; i++) 
        { 
            t_ns[i] = 0x41; 
        } 
        t_ns[45] = 0x00; 
        t_ns[46] = 0x00; 
        t_ns[47] = 0x21; 
        t_ns[48] = 0x00; 
        t_ns[49] = 0x01; 
        return t_ns; 
    } 
    
 // 表1 “UDP－NetBIOS－NS”应答包的结构及主要字段一览表 
    // 序号 字段名 长度 
    // 1 Transaction ID 两字节（16位） 
    // 2 Flags 两字节（16位） 
    // 3 Questions 两字节（16位） 
    // 4 AnswerRRs 两字节（16位） 
    // 5 AuthorityRRs 两字节（16位） 
    // 6 AdditionalRRs 两字节（16位） 
    // 7 Name<Workstation/Redirector> 34字节（272位） 
    // 8 Type:NBSTAT 两字节（16位） 
    // 9 Class:INET 两字节（16位） 
    // 10 Time To Live 四字节（32位） 
    // 11 Length 两字节（16位） 
    // 12 Number of name 一个字节（8位） 
    // NetBIOS Name Info 18×Number Of Name字节 
    // Unit ID 6字节（48位 
    private String GetMacAddr(byte[] b) throws Exception 
    { 
        // 获取计算机名 
        //System.out.println(new String(b, 57, 18)); 
        //System.out.println(new String(b, 75, 18)); 
        //System.out.println(new String(b, 93, 18)); 
        int i = b[56] * 18 + 56; 
        String sAddr = ""; 
        StringBuffer sb = new StringBuffer(17); 
        // 先从第56字节位置，读出Number Of Names（NetBIOS名字的个数，其中每个NetBIOS Names 
        // Info部分占18个字节） 
        // 然后可计算出“Unit ID”字段的位置＝56＋Number Of 
        // Names×18，最后从该位置起连续读取6个字节，就是目的主机的MAC地址。 
        for (int j = 1; j < 7; j++) 
        { 
            sAddr = Integer.toHexString(0xFF & b[i + j]); 
            if (sAddr.length() < 2) 
            { 
                sb.append(0); 
            } 
            sb.append(sAddr.toUpperCase()); 
            if (j < 6) 
                sb.append('-'); 
        } 
        return sb.toString(); 
    } 
    
    private void close() 
    { 
        try 
        { 
            ds.close(); 
        } 
        catch (Exception ex) 
        { 
            ex.printStackTrace(); 
        } 
    } 
 
    public String GetRemoteMacAddr() throws Exception 
    { 
        byte[] bqcmd = GetQueryCmd(); 
        this.send(bqcmd); 
        DatagramPacket dp = this.receive(); 
        String smac = GetMacAddr(dp.getData()); 
        this.close(); 
        return smac; 
    }
	
    @RequestMapping("/mac.do")
	public Map mac(String json,HttpServletRequest request, HttpServletResponse response) throws Exception{
    	Map map = new HashMap();
//    	this.sRemoteAddr="101.231.221.14";
//    	this.ds = new DatagramSocket();
//    	String mac = this.GetRemoteMacAddr();
//    	map.put("mac",mac);
//    	System.out.println(mac);//http://imgscan.spring56.com/files/bills/data/weixin/WeChat/interface.php
    	//String a =JLTools.sendToSync("", "http://imgscan.spring56.com/files/bills/data/weixin/WeChat/interface.php");
	  	//System.out.println("1111111111111111");
	  	//map.put("a",a);
    	String fileName = request.getParameter("fileName");
    	String url = "http://dev.spring56.com:81/partner/ext/lachapelle/interface.php?apikey=cfjskjdk5634.com&type=order.submit";
	  	//String url = "http://10.2.0.5:8888/querypages/download_stream.php?filename=_c7cb06e4-9923-40e7-a791-1b11c0076f1e-"+i+".xml";
    	String content ="WVBFPm9yZGVyLnN1Ym1pdDwvVFlQRT48U0VOREVSPjU2bGlua2VkPC9TRU5ERVI+PENPREU+NjA4"+
    			"MTAzPC9DT0RFPjxEQVRFPjIwMTYtMDgtMTEgMjM6MDc8L0RBVEU+PEJVU0lDT0RFPjIwMTYwODEx"+
    			"MjMwNzA1PC9CVVNJQ09ERT48L0hFQUQ+PFhNTF9EQVRBPjxFQ05PPjMwMDAwMTk1NDI8L0VDTk8+"+
    			"PExFR1M+PExFRz48TEVHX05PPjMwMDAxMzM1OTk0PC9MRUdfTk8+PE9XTkVSX0NPTVBBTllfQ09E"+
    			"RT42MDgxMDM8L09XTkVSX0NPTVBBTllfQ09ERT48U1RBVFVTPkFWQUlMQUJMRTwvU1RBVFVTPjxC"+
    			"VVNJX0dST1VQPum7mOiupDwvQlVTSV9HUk9VUD48T1JERVJfVFlQRT7pu5jorqQ8L09SREVSX1RZ"+
    			"UEU+PFBSSU9SSVRZPuaZrumAmjwvUFJJT1JJVFk+PE9SREVSX0RBVEU+MjAxNi0wOC0xMSAyMjox"+
    			"NzwvT1JERVJfREFURT48TE9BRElOR19NRVRIT0Q+5om/6L+Q5ZWGPC9MT0FESU5HX01FVEhPRD48"+
    			"U0hJUE1FTlRfTUVUSE9EPuaxvei/kDwvU0hJUE1FTlRfTUVUSE9EPjxTSElQTUVOVF9USU1FPjwv"+
    			"U0hJUE1FTlRfVElNRT48UExBTl9MRUFWRV9USU1FPjwvUExBTl9MRUFWRV9USU1FPjxMRUFWRV9U"+
    			"SU1FPjwvTEVBVkVfVElNRT48UExBTl9BUlJJVkVfVElNRT48L1BMQU5fQVJSSVZFX1RJTUU+PEZS"+
    			"T01fTE9DQVRJT05fTkFNRT7lpKrku5M8L0ZST01fTE9DQVRJT05fTkFNRT48VE9fTE9DQVRJT05f"+
    			"TkFNRT41MzNEPC9UT19MT0NBVElPTl9OQU1FPjxPV05FUl9OQU1FPjwvT1dORVJfTkFNRT48QVJS"+
    			"SVZFX1RJTUU+PC9BUlJJVkVfVElNRT48RkVFPjAuMDwvRkVFPjxRVUFOVElUWT4yLjA8L1FVQU5U"+
    			"SVRZPjxXRUlHSFQ+MC4wPC9XRUlHSFQ+PFZPTFVNRT4wLjI8L1ZPTFVNRT48REVTQ1JJUFRJT04+"+
    			"PC9ERVNDUklQVElPTj48RVhUQ09MMT4zMDAwMDE5NTQyPC9FWFRDT0wxPjxFWFRDT0wyPjwvRVhU"+
    			"Q09MMj48RVhUQ09MMz7lpKflhbTopb/nuqLpl6jplYfmrKPlroHooZcxNeWPt+iNn+iBmui0reeJ"+
    			"qeS4reW/g+S4gOWxguaLieWkj+i0neWwlDwvRVhUQ09MMz48RVhUQ09MND42MDgxMDM8L0VYVENP"+
    			"TDQ+PEVYVENPTDU+PC9FWFRDT0w1PjxFWFRDT0w2PjwvRVhUQ09MNj48RVhUQ09MNz48L0VYVENP"+
    			"TDc+PEVYVENPTDg+PC9FWFRDT0w4PjxFWFRDT0w5PjwvRVhUQ09MOT48RVhUQ09MMTA+PC9FWFRD"+
    			"T0wxMD48RlJPTU5BTUU+PC9GUk9NTkFNRT48RlJPTU1PQklMRT48L0ZST01NT0JJTEU+PEZST01U"+
    			"RUxFUEhPTkU+PC9GUk9NVEVMRVBIT05FPjxGUk9NRU1BSUw+PC9GUk9NRU1BSUw+PEZST01QT1NU"+
    			"Q09ERT48L0ZST01QT1NUQ09ERT48RlJPTVBST1ZJTkNFPuaxn+iLjzwvRlJPTVBST1ZJTkNFPjxG"+
    			"Uk9NQ0lUWT7oi4/lt548L0ZST01DSVRZPjxGUk9NRkFYPjwvRlJPTUZBWD48RlJPTUFERFJFU1M+"+
    			"5aSq5LuTPC9GUk9NQUREUkVTUz48RlJPTV9MT05HSVRVREU+MTIxLjE1ODk3NzY3MjQ4MzE4PC9G"+
    			"Uk9NX0xPTkdJVFVERT48RlJPTV9MQVRJVFVERT4zMS41NzE5MDQyOTY0MTUzNTQ8L0ZST01fTEFU"+
    			"SVRVREU+PFRPTkFNRT7njovkuLk8L1RPTkFNRT48VE9NT0JJTEU+MTUyMTAzMjkxNjY8L1RPTU9C"+
    			"SUxFPjxUT1RFTEVQSE9ORT48L1RPVEVMRVBIT05FPjxUT0VNQUlMPjwvVE9FTUFJTD48VE9QT1NU"+
    			"Q09ERT48L1RPUE9TVENPREU+PFRPUFJPVklOQ0U+5YyX5LqsPC9UT1BST1ZJTkNFPjxUT0NJVFk+"+
    			"5aSn5YW0PC9UT0NJVFk+PFRPRkFYPjwvVE9GQVg+PFRPQUREUkVTUz7ljJfkuqzluILlpKflhbTl"+
    			"jLrmrKPlroHlpKfooZflrpzlrrblub/lnLoxRjwvVE9BRERSRVNTPjxUT19MT05HSVRVREU+MTE2"+
    			"LjMyOTc5OTA2NDMzNjE5PC9UT19MT05HSVRVREU+PFRPX0xBVElUVURFPjM5Ljc5NjYwNTcxMDc1"+
    			"MTExNjwvVE9fTEFUSVRVREU+PERFVEFJTFM+PERFVEFJTD48TEVHX05PPjMwMDAxMzM1OTk0PC9M"+
    			"RUdfTk8+PFBST0RVQ1RfTkFNRT7mnI3oo4U8L1BST0RVQ1RfTkFNRT48UFJPRFVDVF9UWVBFPue6"+
    			"uOeusTwvUFJPRFVDVF9UWVBFPjxQUk9EVUNUX0NPREU+ODY5NDgzNTE8L1BST0RVQ1RfQ09ERT48"+
    			"UVVBTlRJVFk+MS4wPC9RVUFOVElUWT48V0VJR0hUPjAuMDwvV0VJR0hUPjxWT0xVTUU+MC4xPC9W"+
    			"T0xVTUU+PEJPWE5PPjg2OTQ4MzUxMDAwMkoxPC9CT1hOTz48REVTQ1JJUFRJT04+PC9ERVNDUklQ"+
    			"VElPTj48RVhURU5EX0ZJRUxEXzE+NDA8L0VYVEVORF9GSUVMRF8xPjxFWFRFTkRfRklFTERfMj5M"+
    			"SDwvRVhURU5EX0ZJRUxEXzI+PC9ERVRBSUw+PERFVEFJTD48TEVHX05PPjMwMDAxMzM1OTk0PC9M"+
    			"RUdfTk8+PFBST0RVQ1RfTkFNRT7mnI3oo4U8L1BST0RVQ1RfTkFNRT48UFJPRFVDVF9UWVBFPue6"+
    			"uOeusTwvUFJPRFVDVF9UWVBFPjxQUk9EVUNUX0NPREU+ODY5NDgzNTE8L1BST0RVQ1RfQ09ERT48"+
    			"UVVBTlRJVFk+MS4wPC9RVUFOVElUWT48V0VJR0hUPjAuMDwvV0VJR0hUPjxWT0xVTUU+MC4xPC9W"+
    			"T0xVTUU+PEJPWE5PPjg2OTQ4MzUxMDAwMUoxPC9CT1hOTz48REVTQ1JJUFRJT04+PC9ERVNDUklQ"+
    			"VElPTj48RVhURU5EX0ZJRUxEXzE+NDA8L0VYVEVORF9GSUVMRF8xPjxFWFRFTkRfRklFTERfMj5M"+
    			"SDwvRVhURU5EX0ZJRUxEXzI+PC9ERVRBSUw+PC9ERVRBSUxTPjwvTEVHPjwvTEVHUz48L1hNTF9E"+
    			"QVRBPjwvV0xMSU5LRUQ+";
		String result =JLTools.sendToSync(content, url);
		map.put("context", result);
		
    	return map;
    }
    
    @RequestMapping("/ma1.do")
	public Map ma1(String json,HttpServletRequest request, HttpServletResponse response) throws Exception{
    	Map map = new HashMap();
//    	this.sRemoteAddr="101.231.221.14";
//    	this.ds = new DatagramSocket();
//    	String mac = this.GetRemoteMacAddr();
//    	map.put("mac",mac);
//    	System.out.println(mac);//http://imgscan.spring56.com/files/bills/data/weixin/WeChat/interface.php
    	//String a =JLTools.sendToSync("", "http://imgscan.spring56.com/files/bills/data/weixin/WeChat/interface.php");
	  	//System.out.println("1111111111111111");
	  	//map.put("a",a);
    	String fileName = request.getParameter("fileName");
	  	String url = PropertiesReader.getInstance().getProperty("PAGING_URL")+"/download_stream.php?filename="+fileName+"-DATASIZE.xml";
	  	//String url = "http://10.2.0.5:8888/querypages/download_stream.php?filename=_c7cb06e4-9923-40e7-a791-1b11c0076f1e-"+i+".xml";
		String result = JLTools.sendToSync("{}", url);
		map.put("url", url);
		map.put("lastPage", result);
    	return map;
    }
}

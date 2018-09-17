package com.cf.report;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.utils.DateJsonValueProcessor;
import com.cf.utils.PropertiesReader;


@Controller
@RequestMapping("/report")
public abstract class BaseReport extends JLBill{
	protected String path = null;
	public static final String REPORT_PATH = PropertiesReader.getInstance().getProperty("REPORT_PATH");
	public static final String REPORT_URL = PropertiesReader.getInstance().getProperty("REPORT_URL");
	/***
	 *  打印
	 * @param json
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/print.do")
	protected void print(String json, HttpServletRequest request,
            HttpServletResponse response) throws Exception {
		path = request.getRealPath(REPORT_PATH)+File.separator;
		 Connection cn = null;
		 Map para = FormTools.mapperToMap(json);
		 para.put("REPORT_PATH", path);	     
        	try {
//        		String url="jdbc:mysql://dev.spring56.com:3306/tms";
//        		 Class.forName("com.mysql.jdbc.Driver");
//        		 //"SQLSTR"是报表中定义的一个参数名称,其类型为String 型
//        		Connection conn = DriverManager.getConnection(url,"tms", "tms");
				cn = tms.getDataSource().getConnection();
				String pfd = "";
				pfd = para.get("temple").toString();
//				File reportFile = new  File(path + pfd);  
//				ServletOutputStream outputStream = null;
//				InputStream inputStream = null; 
//		  
//				response.reset();     
//				response.setContentType("application/pdf");//FixCommonUti   
//				response.setHeader( "Content-Disposition", "attachment; filename=A4");    
//				outputStream = response.getOutputStream();      
//				inputStream = new FileInputStream(reportFile);      
//				JasperRunManager.runReportToPdfStream(inputStream, outputStream, para, conn); 
//				outputStream.flush();
//				outputStream.close();
				printBefore(para);
				byte[] bytes = JasperRunManager.runReportToPdf(path + pfd,para, cn);
				toPdf(bytes, response);
				printAfter(para);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw e;
			}finally{
				if(cn!=null){
					cn.close();
				}
			}
        
	}
	
	
	
private SimpleDateFormat dateFormat=new SimpleDateFormat("yyyyMMddHHmmss");
	
	
	public void writeJsonData(HttpServletResponse response,String encoding, Object data) {
		PrintWriter out=null;
        JsonConfig config = new JsonConfig();
        config.registerJsonValueProcessor(java.sql.Date.class, new DateJsonValueProcessor());
        config.registerJsonValueProcessor(Timestamp.class, new DateJsonValueProcessor());
        config.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor());
		try
		{
			response.setCharacterEncoding(encoding);
			out=response.getWriter();
			if (data instanceof List) {
                JSONArray array = JSONArray.fromObject(((List<?>) data).toArray(), config);
                System.out.println(array.toString());
                out.print(array.toString());
            } else {
                String result = JSONObject.fromObject(data, config).toString();
                System.out.println(result);
                out.print(result);
            }
        }
		catch (IOException e)
		{
			e.printStackTrace();
		}finally{
			closeOut(out);
		}
	}
	
	public void writeJsonData(HttpServletResponse response, Object data) {
		this.writeJsonData(response, "UTF-8", data);
	}
	
	private void closeOut(PrintWriter out){
		if(out!=null){
			out.flush();
			out.close();
		}
	}
	
	/***
	 * 输出PDF
	 * @param bytes
	 * @param response
	 * @throws IOException
	 */
	protected void toPdf(byte[] bytes, HttpServletResponse response) throws
    IOException{
		response.setContentType("application/pdf");
		response.setContentLength(bytes.length);
		response.setHeader("Content-Disposition", "inline; filename=\"A4.pdf\"");
		ServletOutputStream out = response.getOutputStream();
		//OutputStream out = response.getOutputStream();
		out.write(bytes, 0, bytes.length);
		out.flush();
		out.close();
	}
	
	private static SimpleDateFormat format =new SimpleDateFormat("yyyyMMddHHmmss");
	
	public static void downPdf(byte[] bytes,HttpServletResponse response) {
		response.setContentType("application/pdf");
		response.setContentLength(bytes.length);
		String filename=format.format(new Date());
		response.setHeader("content-disposition", "attachment;filename=" + filename+".zip");  
	    ZipOutputStream zipOut =null;
		try {
		    zipOut = new ZipOutputStream(response.getOutputStream());
            zipOut.putNextEntry(new ZipEntry(filename+".pdf"));
            zipOut.write(bytes);
            zipOut.close();
		} catch (Exception e) {
			// TODO: handle exception
		}finally{
			try {
				zipOut.close();
			} catch (IOException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		}
	}
	//打印之前
	protected abstract void printBefore(Map para)throws Exception;
	
	//打印之后 
	protected abstract void printAfter(Map para) throws Exception;
}

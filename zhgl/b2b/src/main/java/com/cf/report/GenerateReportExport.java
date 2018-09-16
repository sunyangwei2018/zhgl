package com.cf.report;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ConnectionCallback;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.JLConn;
import com.cf.utils.PropertiesReader;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;

@Controller
@RequestMapping("/generateReportExport")
public class GenerateReportExport extends JLConn {
	protected String path = null;
	public static final String REPORT_PATH = PropertiesReader.getInstance().getProperty("REPORT_PATH");
	public static final String REPORT_URL = PropertiesReader.getInstance().getProperty("REPORT_URL");
	
	@RequestMapping("/print.do")
	protected void print(String json, HttpServletRequest request,
            HttpServletResponse response) throws Exception {
		 try {
			 path = request.getRealPath(REPORT_PATH)+File.separator;
			 Connection cn = null;
			 final Map para = FormTools.mapperToMap(json);    
			 final String file = para.get("temple").toString();
			 final String GCBH = para.get("GCBH").toString();
			 File jasperFile=new File(path+file); 
			 JasperPrint print = tms.execute(new ConnectionCallback<JasperPrint>() {
					@Override
					public JasperPrint doInConnection(Connection con) throws SQLException, DataAccessException {
						try
						{
							return JasperFillManager.fillReport(path+file, para, con);
						}
						catch (JRException e)
						{
							throw new IllegalArgumentException(e);
						}
					}
				});
			 
			 JRXlsxExporter exporter = new JRXlsxExporter();
			 ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
			 exporter.setParameter(JRXlsExporterParameter.JASPER_PRINT, print);
			 exporter.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, byteStream);
			 exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, false);
			 exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, false);
			 exporter.exportReport();
			 byte[] bytes = byteStream.toByteArray();
			 toPdf(bytes,response,file,GCBH);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
	}
	
	/***
	 * 输出PDF
	 * @param bytes
	 * @param response
	 * @throws IOException
	 */
	protected void toPdf(byte[] bytes, HttpServletResponse response,String file,String GCBH) throws
    IOException{
		//response.setContentType("application/pdf");
		response.setContentType("application/octet-stream; charset=utf-8");
		response.setContentLength(bytes.length);
		String fileName = URLEncoder.encode(file.split("\\.")[0], "UTF-8");
	    fileName = new String((fileName+GCBH).getBytes(Charset.forName("GBK")), "ISO8859-1");
		//response.setHeader("Content-Disposition", "attachment;filename="+file.split("\\.")[0]+".xls");
		response.setHeader("Content-Disposition", "attachment;filename="+fileName+".xls");
		ServletOutputStream out = response.getOutputStream();
		//OutputStream out = response.getOutputStream();
		out.write(bytes, 0, bytes.length);
		out.flush();
		out.close();
	}

}

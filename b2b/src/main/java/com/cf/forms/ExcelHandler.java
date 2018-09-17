package com.cf.forms;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Clob;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


//import org.apache.lucene.search.QueryFilter;


import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;
import com.cf.scm.masterdata.MongodbHandler;
import com.cf.utils.JLTools;
import com.cf.utils.PropertiesReader;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

import java.io.IOException;

@Controller
@RequestMapping("/excelHandler")
public class ExcelHandler extends JLBill{
	private static Logger logger = LoggerFactory.getLogger(ExcelHandler.class);

	//自定义查询导出excel
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/getExcelData.do")
	public Map getExcelData(String XmlData) throws Exception{
		Map json = FormTools.mapperToMap(XmlData);
		JSONArray files = JSONArray.fromObject(json.get("FILE"));
		int MBBM = Integer.parseInt(json.get("MBBM").toString());
		List<Map> excelList = FormTools.getExcelData(MBBM, files);
		Map returnMap = new HashMap();
		returnMap.put("returnList", excelList);
		return returnMap;
	}
	
	@RequestMapping("/excelExport.do")
	public void excelExport(String json,HttpServletRequest request, HttpServletResponse response) throws Exception{
		  Long longcurr_time=System.currentTimeMillis();
		  OutputStream os = null;
          int rowaccess=1000;//内存中缓存记录行数
          /*keep 1000 rowsin memory,exceeding rows will be flushed to disk*/
          String fileName = request.getParameter("fileName");
	  	  JSONObject columnName = JSONObject.fromObject(request.getParameter("columnName"));
	  	  int lastPage = Integer.parseInt(request.getParameter("lastPage"));
	  	  SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  	  String t = df.format(new java.util.Date());
          try {
        	  SXSSFWorkbook XSSFWB = new SXSSFWorkbook(rowaccess);
			  //Workbook XSSFWB = new SXSSFWorkbook(rowaccess);
        	  /****************获取列头*******************/
        	 Sheet sheet = XSSFWB.createSheet("1");
  			 JSONArray columnIndexArr=new JSONArray();
  			 int columnInx = 0;
  			 Row firstRow = sheet.createRow(0);
  			 
  			 for(Iterator it=columnName.keys();it.hasNext();){
  				 String key = (String)it.next();
  				 Cell cell = firstRow.createCell(columnInx);
  				 cell.setCellValue(columnName.getString(key));
  				 columnIndexArr.add(key);
  				 columnInx++;
  			 }
  			 
  			/****************获取数据*******************/
  			int rowIndex=1;
  			int rownum=0;
  			for(int i=1;i<=lastPage;i++){
  				String url = PropertiesReader.getInstance().getProperty("PAGING_URL")+"/download_stream.php?filename="+fileName+"-"+i+".xml";
  				String result = JLTools.sendToSync("{}", url);
				JSONArray pageData=new JSONArray();
				if(result != null && !result.equals("")){
					pageData=JSONArray.fromObject(result);
				}
				for (int m = 0; m < pageData.size(); m++) {
					rowIndex ++;
					rownum++;
					Row row = sheet.createRow(rownum);
			  		JSONObject rowData=pageData.getJSONObject(m);
			  		for(Iterator it=rowData.keys();it.hasNext();){
						String key = (String)it.next();
						int columnIndex = columnIndexArr.indexOf(key);
						if(columnIndex>-1){
							Cell cell = row.createCell(columnIndex);
							cell.setCellValue(rowData.getString(key));
						}
					}
			  		//每当行数达到设置的值就刷新数据到硬盘,以清理内存
			        if(rowIndex%rowaccess==0){
			           ((SXSSFSheet)sheet).flushRows();
			           rowIndex = 0;
			        }
				}
  			}
			  os = response.getOutputStream();//获取输出流
			  response.reset();
			  // 设定输出文件头
			  response.setHeader("Content-disposition", "attachment; filename="+ t + ".xlsx");
			  response.setContentType("application/msexcel");// 设定输出类型
			  //response.setContentType("application/vnd.ms-excel;charset=gb2312");  // 设定输出类型
			  XSSFWB.write(os);
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
	
	//自定义查询导出excel
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/excelExportold.do")
	public void excelExportold(HttpServletRequest request,HttpServletResponse response) throws Exception{
		OutputStream os = null;
	  	try {
	  		String fileName = request.getParameter("fileName");
	  		JSONObject columnName = JSONObject.fromObject(request.getParameter("columnName"));
	  		int lastPage = Integer.parseInt(request.getParameter("lastPage"));
	  		System.out.println("导出########"+1);
	  		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  		System.out.println("导出########"+2);
	  		String t = df.format(new java.util.Date());
			//XSSFWorkbook XSSFWB = new XSSFWorkbook();
			Workbook XSSFWB = new SXSSFWorkbook(500);
			//SXSSFWorkbook XSSFWB = new SXSSFWorkbook(500);
			System.out.println("导出########"+3);
			Sheet sheet = XSSFWB.createSheet("1");
			Row firstRow = sheet.createRow(0);
			
			/****************获取列头*******************/
			JSONArray columnIndexArr=new JSONArray();
			int columnInx = 0;
			for(Iterator it=columnName.keys();it.hasNext();){
				String key = (String)it.next();
				Cell cell = firstRow.createCell(columnInx);
				cell.setCellValue(columnName.getString(key));
				columnIndexArr.add(key);
				columnInx++;
			}
			
			/****************获取数据*******************/
			for(int i=1;i<=lastPage;i++){
				String url = PropertiesReader.getInstance().getProperty("PAGING_URL")+"/download_stream.php?filename="+fileName+"-"+i+".xml";
				System.out.println(i+"导出URL########"+url);
		  		//String url = "http://10.2.0.5:8888/querypages/download_stream.php?filename=_c7cb06e4-9923-40e7-a791-1b11c0076f1e-"+i+".xml";
				String result = JLTools.sendToSync("{}", url);
				System.out.println(i+"导出DATA########"+result);
				JSONArray pageData=new JSONArray();
				if(result != null && !result.equals("")){
					pageData=JSONArray.fromObject(result);
				}


				for (int m = 0; m < pageData.size(); m++) {
					int rowIndex = sheet.getLastRowNum()+1;
					Row row = sheet.createRow(rowIndex);
			  		JSONObject rowData=pageData.getJSONObject(m);
					for(Iterator it=rowData.keys();it.hasNext();){
						String key = (String)it.next();
						int columnIndex = columnIndexArr.indexOf(key);
						if(columnIndex>-1){
							Cell cell = row.createCell(columnIndex);
							cell.setCellValue(rowData.getString(key));
						}
					}
				}
			}
			os = response.getOutputStream();//获取输出流
			response.reset();
			// 设定输出文件头
			response.setHeader("Content-disposition", "attachment; filename="+ t + ".xlsx");
			response.setContentType("application/msexcel");// 设定输出类型
			//response.setContentType("application/vnd.ms-excel;charset=gb2312");  // 设定输出类型
			XSSFWB.write(os);
	  	} catch (Exception e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	} finally {
	  		if(os != null){
	  			os.flush();
	  			os.close();
	  		}
	  	}
	}
	 
	@SuppressWarnings("rawtypes")
	@RequestMapping("/downloadTemplate.do")
	public void downloadTemplate(String XmlData,HttpServletRequest request,HttpServletResponse response) throws Exception{
        JSONObject json=JSONObject.fromObject(XmlData);
        OutputStream outStream = null;
		HSSFWorkbook HSSFWB = new HSSFWorkbook();
		try {
			HSSFSheet sheet = HSSFWB.createSheet("1");
			HSSFRow row = sheet.createRow(0);
			JSONObject keys=JSONObject.fromObject(json.get("keys"));
			int i=0;
			int showBracket=Integer.parseInt(json.getString("showBracket"));
			for(Iterator it=keys.keys();it.hasNext();){
				String key = (String)it.next();
				HSSFCell cell = row.createCell(i);
				if(cell!=null){
					cell.setCellType(1);
					sheet.setColumnWidth(i, ((keys.getString(key).getBytes().length)*256));// 设置单元格的长度为内容的长度
				}
				if(showBracket==0){
					cell.setCellValue(keys.getString(key));
				}else{
					cell.setCellValue(keys.getString(key)+"("+key+")");
				}
				i++;
			}
			outStream = response.getOutputStream();
        	response.reset();
            response.setContentType("application/octet-stream; charset=utf-8");
            response.setHeader("Content-disposition", "attachment; filename=" +
                               java.net.URLEncoder.encode(json.getString("filename")+".xls", "utf-8"));
			HSSFWB.write(outStream);
        }catch (Exception e) {
            throw e;
        }finally{
        	if (outStream != null) {
        		outStream.flush();
        		outStream.close();
        	}
        }
    }
	
	/***
	 * 验证整行空
	 * @param row
	 * @param clells
	 * @return
	 */
	public String getRowString(Row row,int clells){
		String cellValue="";
		for(int cellIndex=0;cellIndex<clells;cellIndex++){
			Cell cell = row.getCell(cellIndex);
			 cellValue+=cell==null?"":cell.toString();
		}
		
		return cellValue;
	}
	
	@SuppressWarnings("rawtypes")
	public List<Map> readExcel(String XmlData) throws Exception{
		// 下载网络文件
		List<Map> lio=new ArrayList<Map>();
		JSONObject json = JSONObject.fromObject(XmlData);
        URL url = new URL(json.getString("url"));
        //URL url = new URL("http://127.0.0.1:8080/usr/local/nginx/html/fs/18081/attachments/2016-05-24/K008/Book2.xls");
		//URL url = new URL("http://127.0.0.1:8080/usr/local/nginx/html/fs/18081/attachments/2016-05-24/K008/Book1.xlsx");
        InputStream in = null;
        try {
            URLConnection conn = url.openConnection();
            in = conn.getInputStream(); 
            //int a = in.read();
            Workbook workbook=null;
			if(json.getString("fileType").equals("xls")){
				workbook = new HSSFWorkbook(in);
			}else if(json.getString("fileType").equals("xlsx")){
				workbook = new XSSFWorkbook(in);
			}else{
				throw new Exception("文件后缀名不是.xls或.xlsx");
			}
			
//			String sql="select a.jlbh,a.key,a.mainkeys,a.detail,a.mainsheet,a.form from execl a where a.jlbh='"+json.get("jlbh")+"'";
//			Map template = queryForMap(tms, sql);
			Map parameter = new HashMap();
			parameter.put("jlbh", json.get("jlbh"));
			Map template = (Map) queryForObjectByXML("tms", "CX.queryEXECL", parameter);
			String mainSheet = template.get("mainsheet").toString();//主表
			Clob clob = (Clob)template.get("mainkeys");
			JSONArray mainKey = JSONArray.fromObject(FormTools.ClobToString((Clob)template.get("mainkeys")));//主表字段
			JSONObject detailObj = JSONObject.fromObject(template.get("detail"));//明细表及字段
			JSONArray regs = FormTools.isNull(template.get("reg"))?new JSONArray():FormTools.mapperToJSONArray(FormTools.ClobToString((Clob)template.get("reg")));
			
			String key = template.get("key").toString();//主表及明细表关联字段
            
			Sheet sheet = workbook.getSheet("1");
			int numberOfRows = sheet.getLastRowNum();
			if(numberOfRows>1000000){
				throw new Exception("不能大于1000000行");
			}
			for(int rowIndex=0;rowIndex<=numberOfRows;rowIndex++){
				Row row = sheet.getRow(rowIndex);
				if(rowIndex==0||FormTools.isNull(row)||FormTools.isNull(getRowString(row,mainKey.size()))){
					continue;
				}
				JSONObject dbo=new JSONObject();
				for(int cellIndex=0;cellIndex<mainKey.size();cellIndex++){
					Cell cell = row.getCell(cellIndex);
					String cellValue="";
					//System.out.println("字段类型:"+cell.getCellType()+"#日期否？"+HSSFDateUtil.isCellDateFormatted(cell));
					//cell.setCellType(1);
					cellValue = FormTools.isNull(cell)?"":parseExcel(cell);
					for(int e = 0;e<regs.size();e++){
						JSONObject obj = regs.getJSONObject(e);
						
						if(obj.containsKey(mainKey.getString(cellIndex))&&obj.containsKey("required")&&FormTools.isNull(cellValue)){//字段必填项And值为空
							throw new Exception(rowIndex+1+"行,"+sheet.getRow(0).getCell(cellIndex)+"【值："+cellValue+"】格式错误.格式类型:字段必填项。");
						}else if(obj.containsKey(mainKey.getString(cellIndex))&&!FormTools.isNull(cellValue)){//字段不为空包含正则
							Pattern pattern = Pattern.compile(obj.getString(mainKey.getString(cellIndex)));
				        	// 忽略大小写的写法
				        	// Pattern pat = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
				        	Matcher matcher = pattern.matcher(cellValue.trim());
				        	// 查找字符串中是否有匹配正则表达式的字符/字符串
				        	boolean rs = matcher.find();
				        	if(!rs){
				        	    throw new Exception(rowIndex+1+"行,"+sheet.getRow(0).getCell(cellIndex)+"【值："+cellValue+"】 格式错误.格式类型:"+obj.getString("tip"));
				        	}
						}
					}
					/*if(cell!=null){
						//System.out.println("字段类型:"+cell.getCellType()+"#日期否？"+HSSFDateUtil.isCellDateFormatted(cell));
						//cell.setCellType(1);
						cellValue = parseExcel(cell);
						if(!FormTools.isNull(cellValue.trim())){
							for(int e = 0;e<regs.size();e++){
								JSONObject obj = regs.getJSONObject(e);
								if(!FormTools.isNull(obj.get(mainKey.getString(cellIndex)))){
									Pattern pattern = Pattern.compile(obj.getString(mainKey.getString(cellIndex)));
					        	    // 忽略大小写的写法
					        	    // Pattern pat = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
					        	    Matcher matcher = pattern.matcher(cellValue.trim());
					        	    // 查找字符串中是否有匹配正则表达式的字符/字符串
					        	    boolean rs = matcher.find();
					        	    if(!rs){
					        	    	throw new Exception(sheet.getRow(0).getCell(cellIndex)+"【"+cellValue+"】 格式错误。格式类型:"+obj.getString("tip"));
					        	    }
								}
								
							}
						}
					}*/
					//String cellValue=cell==null?"":cell.toString();
					String keyName=mainKey.getString(cellIndex);
					if(!detailObj.containsKey(keyName)){
						dbo.put(keyName, cellValue);
					}else{
						Sheet sheetDetail = workbook.getSheet(keyName);
						List<DBObject> detailLIO=new ArrayList<DBObject>();
						int detailNumberOfRows = sheetDetail.getLastRowNum();
						JSONArray detailKeyArr = detailObj.getJSONArray(keyName);
						
						for(int detailRowIndex=0;detailRowIndex<detailNumberOfRows;detailRowIndex++){
							Row detailRow = sheet.getRow(detailRowIndex);
							if(row.getCell(mainKey.indexOf(key)).equals(detailRow.getCell(detailKeyArr.indexOf(key)))){
								DBObject detailDBO=new BasicDBObject();
								for(int detailCellIndex=0;detailCellIndex<detailKeyArr.size();detailCellIndex++){
									if(detailCellIndex==detailKeyArr.indexOf(key)){
										continue;
									}
									Cell detailCell = detailRow.getCell(detailCellIndex);
									String detailCellValue=detailCell==null?"":detailCell.toString();
									detailDBO.put(detailKeyArr.getString(detailCellIndex), detailCellValue);
								}
								detailLIO.add(detailDBO);
							}
						}
						dbo.put(keyName, detailLIO);
					}
				}
				lio.add(dbo);
			}
			logger.info("导入数据list:{}", lio);
        }catch (Exception e) {
        	//e.printStackTrace();
        	String regEx ="\\格式错误";
        	Pattern pattern = Pattern.compile(regEx);
        	Matcher matcher = pattern.matcher(e.getMessage());
			// 查找字符串中是否有匹配正则表达式的字符/字符串
        	boolean rs = matcher.find();
        	e.printStackTrace();
        	//e.getStackTrace();
		    if(rs){
		    	throw e;
		    }else{
		    	throw new Exception("表格数据读取错误");
		    }
        }finally{
        	if (in != null){
        		in.close();
        	}
        }
        return lio;
	}

	//自定义查询最后一页
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/excelExportMaxSize.do")
	public Map excelExportMaxSize(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String fileName = request.getParameter("fileName");
	  	String url = PropertiesReader.getInstance().getProperty("PAGING_URL")+"/download_stream.php?filename="+fileName+"-LASTPAGE.xml";
	  	//String url = "http://10.2.0.5:8888/querypages/download_stream.php?filename=_c7cb06e4-9923-40e7-a791-1b11c0076f1e-"+i+".xml";
		String result = JLTools.sendToSync("{}", url);
		Map map = new HashMap();
		map.put("lastPage", result);
		return  map;
	}
	
	//自定义查询当前页
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/excelPage.do")
	public Map excelPage(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String fileName = request.getParameter("fileName");
  		int currentPage = Integer.parseInt(request.getParameter("currentPage"));	  	
	    
	  	String url = PropertiesReader.getInstance().getProperty("PAGING_URL")+"/download_stream.php?filename="+fileName+"-"+currentPage+".xml";
	  	//String url = "http://10.2.0.5:8888/querypages/download_stream.php?filename=_c7cb06e4-9923-40e7-a791-1b11c0076f1e-"+i+".xml";
		String result = JLTools.sendToSync("{}", url);
		Map map = new HashMap();
		map.put("pageData", result);
		return  map;
	}
	
	//自定义查询Total
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping("/excelTotal.do")
	public Map excelTotal(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String fileName = request.getParameter("fileName");
	  	String url = PropertiesReader.getInstance().getProperty("PAGING_URL")+"/download_stream.php?filename="+fileName+"-DATASIZE.xml";
	  	//String url = "http://10.2.0.5:8888/querypages/download_stream.php?filename=_c7cb06e4-9923-40e7-a791-1b11c0076f1e-"+i+".xml";
		String result = JLTools.sendToSync("{}", url);
		Map map = new HashMap();
		map.put("datasize", result);
		return  map;
	}
	
	/***
	 * EXECL格式化
	 * @param cell
	 * @return
	 */
	private String parseExcel(Cell cell) {  
        String result = new String();  
        switch (cell.getCellType()) {  
        case HSSFCell.CELL_TYPE_NUMERIC:// 数字类型  0
            if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
                SimpleDateFormat sdf = null;  
                if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
                        .getBuiltinFormat("h:mm")) {  
                    sdf = new SimpleDateFormat("HH:mm");  
                } else {// 日期  
                    sdf = new SimpleDateFormat("yyyy-MM-dd");  
                }  
                Date date = cell.getDateCellValue();  
                result = sdf.format(date);  
            } /*else if (cell.getCellStyle().getDataFormat() == 58) {  
                // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
                double value = cell.getNumericCellValue();  
                Date date = org.apache.poi.ss.usermodel.DateUtil  
                        .getJavaDate(value);  
                result = sdf.format(date);  
            }*/ else { 
                double value = cell.getNumericCellValue();  
                CellStyle style = cell.getCellStyle();  
                DecimalFormat format = new DecimalFormat();  
                String temp = style.getDataFormatString();  
                // 单元格设置成常规  
                //if (temp.equals("General")) {  
                    format.applyPattern("###.###");  
                    
                //}  
                result = format.format(value);   
            }  
            break;
            /*case Cell.CELL_TYPE_BOOLEAN:  
        	result = String.valueOf(cell.getBooleanCellValue());   
            break;
        case HSSFCell.CELL_TYPE_FORMULA://公式2
        	//result = cell.getCellFormula();
        	 double value = cell.getNumericCellValue();  
        	result = String.valueOf(cell.getCellFormula().trim());  
             CellStyle style = cell.getCellStyle();  
             DecimalFormat format = new DecimalFormat();  
             String temp = style.getDataFormatString();  
             // 单元格设置成常规  
             //if (temp.equals("General")) {  
                 format.applyPattern("###.###");  
                 
             //}  
             result = format.format(value);   
        	break;*/
        case HSSFCell.CELL_TYPE_STRING:// String类型  1
            result = cell.getRichStringCellValue().toString();  
            break;  
        case HSSFCell.CELL_TYPE_BLANK://3
            result = "";  
        default:  
            result = "";  
            break;  
        }
        return result.trim();  
    }
}
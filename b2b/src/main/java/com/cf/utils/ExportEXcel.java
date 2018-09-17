package com.cf.utils;


import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.framework.JLBill;


@Controller
@RequestMapping("/excel")
public class ExportEXcel extends JLBill {
		 
	@SuppressWarnings({ "rawtypes", "static-access" })
	@RequestMapping("/exportKHData.do")
	public Map exportKH(String XmlData,HttpServletResponse response) throws Exception{
		Map map=new HashMap();
		String fileName="客户资料";
		String querySQL=" select cus_code,s_name from cust_tab ";
		List<Map> list = queryForList(tms, querySQL);
		String[] colums={"cus_code","s_name"};
		String[] headers={"客户代码","客户名称"};
	  	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  	String t = df.format(new java.util.Date());
	  	ExcelUtils util= new ExcelUtils();
	  	util.exportExcel(response, fileName,list,colums,headers,t);

		return null;				
	}
	
	@SuppressWarnings({ "rawtypes", "static-access" })
	@RequestMapping("/exportDQData.do")
	public Map exportDQ(String XmlData,HttpServletResponse response) throws Exception{

		String fileName="地区资料";
		String querySQL=" select code,name,kwbh,name3 from area_tab where (area_lv in(2,3) OR (area_lv = 4 and sjbj=1)) ";
		List<Map> list = queryForList(tms, querySQL);
		String[] colums={"code","name","kwbh","name3"};
		String[] headers={"地区代码","地区名称","库位号","三级地区名称"};
	  	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  	String t = df.format(new java.util.Date());
	  	ExcelUtils util= new ExcelUtils();
	  	util.exportExcel(response, fileName,list,colums,headers,t);

		return null;				
	}
	@SuppressWarnings({ "rawtypes", "static-access" })
	@RequestMapping("/exportWDData.do")
	public Map exportWD(String XmlData,HttpServletResponse response) throws Exception{

		String fileName="网点资料";
		String querySQL=" select net_code,net_name from net_tab where dqzt=0 and sjwd=0 ";
		List<Map> list = queryForList(tms, querySQL);
		String[] colums={"net_code","net_name"};
		String[] headers={"网点代码","网点名称"};
	  	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  	String t = df.format(new java.util.Date());
	  	ExcelUtils util= new ExcelUtils();
	  	util.exportExcel(response, fileName,list,colums,headers,t);

		return null;				
	}
	@SuppressWarnings({ "rawtypes", "static-access" })
	@RequestMapping("/exportHWLBData.do")
	public Map exportHWLB(String XmlData,HttpServletResponse response) throws Exception{

		String fileName="货物类别资料";
		String querySQL=" select code,name from hwlb_tab ";
		List<Map> list = queryForList(tms, querySQL);
		String[] colums={"code","name"};
		String[] headers={"类别代码","类别名称"};
	  	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  	String t = df.format(new java.util.Date());
	  	ExcelUtils util= new ExcelUtils();
	  	util.exportExcel(response, fileName,list,colums,headers,t);

		return null;				
	}
	@SuppressWarnings({ "rawtypes", "static-access" })
	@RequestMapping("/exportGGData.do")
	public Map exportGG(String XmlData,HttpServletResponse response) throws Exception{

		String fileName="规格资料";
		String querySQL=" select code,name from gg_tab ";
		List<Map> list = queryForList(tms, querySQL);
		String[] colums={"code","name"};
		String[] headers={"规格代码","规格名称"};
	  	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
	  	String t = df.format(new java.util.Date());
	  	ExcelUtils util= new ExcelUtils();
	  	util.exportExcel(response, fileName,list,colums,headers,t);

		return null;				
	}
}
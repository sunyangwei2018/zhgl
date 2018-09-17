package com.cf.tms.interfaces.server;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cf.forms.FormTools;
import com.cf.framework.JLBill;
import com.cf.framework.dataset.DataSet;

@Controller
@RequestMapping("/cflzqdsc")
public class LZQDSC extends JLBill {
	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(LZQDSC.class);
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/updateLZQDSC.do")
	public Map updateLZQDSC(String XmlData) throws Exception{
		Map resultMap = new HashMap();
		try {
			Map map_main =  FormTools.mapperToMap(XmlData);
			Map row = null;
			String sql =" call p_lzqdsc('"+map_main.get("czr")+"')";
			execSQL(tms, sql, row);
			resultMap.put("staus", "生成B清单成功，请重新查询");
						
		} catch (Exception e) {
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
			throw e;
		}

	return resultMap;
	
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/deleteLZQDSC.do")
	public Map deleteLZQDSC(String XmlData) throws Exception{
		Map resultMap = new HashMap();
		try {
			Map map_main =  FormTools.mapperToMap(XmlData);
			Map row = null;
			List list =(List)map_main.get("item");
			for(int i=0;i<list.size();i++){
				Map obj=(Map)list.get(i);
				if (! obj.get("cfqdh").toString().equals("")){
					String sql =" update lzthbill_tab "
							+ " set scbj=0,scr='',scrq=null,cfqdh=' ' "
							+ " where cfqdh = '"+obj.get("cfqdh").toString()+"'";
					execSQL(tms, sql, row);
					execSQL(tms, sql, row);
				}
			}
			resultMap.put("staus", "取消成功,请重新查询");
						
		} catch (Exception e) {
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
			throw e;
		}

	return resultMap;
	
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/deleteLZYD.do")
	public Map deleteLZYD(String XmlData) throws Exception{
		Map resultMap = new HashMap();
		try {
			Map map_main =  FormTools.mapperToMap(XmlData);
			Map row = null;
			List list =(List)map_main.get("item");
			for(int i=0;i<list.size();i++){
				Map obj=(Map)list.get(i);
				String sql =" delete from lzthbill_tab where billno = '"+obj.get("billno").toString()+"' and scbj=0 ";
				execSQL(tms, sql, row);
			}
			resultMap.put("staus", "删除成功");
						
		} catch (Exception e) {
			resultMap.put("staus", e.getMessage());
			e.printStackTrace();
			throw e;
		}

		return resultMap;
	
	}
}

